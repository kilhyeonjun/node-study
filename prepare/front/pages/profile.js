import React, {useEffect, useState, useCallback} from 'react';
import Head from 'next/head';
import {useSelector, useDispatch} from 'react-redux';
import Router from 'next/router';
import {END} from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from '../reducers/user';
import wrapper from '../store/configureStore';
import {backURL} from '../config/config';

const fetcher = (url) => axios.get(url, {withCredentials: true}).then((result) => result.data);

const Profile = () => {
  const dispatch = useDispatch();

  const {me} = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const {data: followersData, error: followerError} = useSWR(
    `${backURL}/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const {data: followingsData, error: followingError} = useSWR(
    `${backURL}/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  useEffect(() => {
    if (!(me && me.id)) Router.push('/');
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  if (!me) return '내 정보 로딩중...';

  if (followerError || followingError) {
    console.log(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉"
          data={followersData}
          onClickMore={loadMoreFollowings}
          loading={!followingError && !followingsData}
        />
        <FollowList
          header="팔로워"
          data={followingsData}
          onClickMore={loadMoreFollowers}
          loading={!followerError && !followingsData}
        />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Profile;
