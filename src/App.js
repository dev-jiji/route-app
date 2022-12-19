import React, { useEffect, useState } from "react";

// axios API
import instance from "./api/axios";
import requests from "./api/request";

import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import SongList from "./pages/SongList";
import Player from "./pages/Player";
import PlayerIndex from "./pages/PlayerIndex";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  // 멤버목록 데이터
  // useState 는 state 가 변경되면 실행되는 Hook 이다.
  // useState () 를 실행하면 [] 리턴이 된다.
  // 배열은 [state, state업데이트 함수] 돌려받는다.
  // 배열은 [getter, setter] 돌려받는다.
  // useState(초기값) : 초기값이라 함은 state 의 초기값
  const [members, setMembers] = useState([]);

  // 플레이 리스트 State
  // 화면을 Re-Render 할 수 있는 조건은 state / props 변경
  const [songs, setSongs] = useState([]);

  // 외부데이터 가져오기
  const fetchData = async () => {
    // http://localhost:3000?api_key:5000&a=hello
    // 멤버목록 가져오기
  
    const resultMember = await instance.get(requests.fetchMember);
    setMembers(resultMember.data);
    // SONG목록 가져오기
    const resultSong = await instance.get(requests.fetchSong);
    setSongs(resultSong.data);
  };
  useEffect(() => {
    // 데이터 가져올 때 사용하는 자리
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          {/* <Route path="개발자가 설정한 URL"/>  */}
          {/* <Route path="/ :도메인만 입력"/>  */}
          {/* <Route path= "보여줄 컴포넌트 엘리먼트"/> */}
          <Route path="/" element={<Navigate to="/home"/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About title="인디벤드" />} />
          <Route path="/members" element={<Members members={members} />} />
          <Route path="/songs" element={<SongList songs={songs} />}>
            <Route index element={<PlayerIndex />} />
            <Route path=":id" element={<Player songs={songs} />} />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
