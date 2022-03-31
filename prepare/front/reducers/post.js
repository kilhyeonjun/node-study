export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '길현준',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://avatars.githubusercontent.com/u/41348539?v=4',
        },
        {
          src: 'https://avatars.githubusercontent.com/u/41348539?v=4',
        },
        {
          src: 'https://avatars.githubusercontent.com/u/41348539?v=4',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'kbox1',
          },
          content: '테스트 1',
        },
        {
          User: {
            nickname: 'kbox2',
          },
          content: '테스트 2',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'kbox',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
