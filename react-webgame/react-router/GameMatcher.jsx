import React from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router';
import NumberBaseball from './../lecture/3.숫자야구/NumberBaseballClass';
import RSP from './../lecture/5.가위바위보/RSPClass';
import Lotto from './../lecture/6.로또/LottoClass';

const GameMatcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    console.log(navigate);
    return (
        <Routes>
            <Route path="number-baseball" element={<NumberBaseball />} />
            <Route path="rock-scissors-paper" element={<RSP />} />
            <Route path="lotto-generator" element={<Lotto />} />
            <Route path="*" element={<div>일치하는 게임이 없습니다.</div>} />
        </Routes>
    );
};

export default GameMatcher;
