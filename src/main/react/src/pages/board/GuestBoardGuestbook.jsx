import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import CandyImg from "../../img/mainImg/커플2.jpg";
import React, { useEffect, useState } from "react";
import Guestbook from "./Guestbook";
import BoardAxios from "../../axiosapi/BoardAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const BookTheme = styled.div`
  width: 53vw;
  height: 68.5vh;
  margin-top: 4vh;
  margin-left: 0.8vw;
  background-image: url(${boardBg});
  background-size: cover;
  opacity: 0.8;
  display: flex;
`;
const BoardSide = styled.div`
  width: 25.5vw;
  height: 68.5vh;
  position: relative;
`;
const BoardTitle = styled.div`
  margin-top: 2.5vh;
  width: 25.5vw;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoupleDiv = styled.div`
  width: 25.5vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardGrayBar = styled.div`
  margin-top: 1.5vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardPost = styled.div`
  margin-top: 2vh;
  margin-left: 18.5vw;
  width: 8vw;
  height: 1vh;
  font-size: 11px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const BoardTable = styled.table`
  margin-top: 1vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  table-layout: fixed;
  border-collapse: collapse;
`;

const BoardTh = styled.th`
  height: 3vh;
  background-color: gray;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  vertical-align: middle;
  &:nth-child(1) {
    width: 3vw;
  }
  &:nth-child(3) {
    width: 4vw;
  }
`;

const BoardTd = styled.td`
  height: 3.2vh;
  border: 1px solid black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

const NameHover = styled(BoardTd)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const BoardPaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 3vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardPaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const CenterArea = styled.div`
  width: 1.5vw;
  height: 68.5vh;
`;

const GuestbookSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;
const GuestbookTitle = styled.div`
  margin-top: 2.5vh;
  width: 25.5vw;
  height: 5vh;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookGrayBar = styled.div`
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookWriteArea = styled.div`
  margin-left: 1vw;
  margin-top: 2vh;
  width: 23.5vw;
  height: 9.6vh;
  border: 1px solid black;
`;
const GuestbookWriteMain = styled.div`
  margin-left: 1vw;
  width: 17.8vw;
  height: 10vh - 1px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;
const GuestbookInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 13px;
  resize: none;
  overflow-y: aute;
`;
const GuestbookWriteButton = styled.div`
  margin-top: 0.5vh;
  margin-left: 20vw;
  width: 4vw;
  height: 2vh;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookArea = styled.div`
  margin-left: 1vw;
  margin-top: 2vh;
  width: 23.5vw;
  height: 12vh;
  border: 1px solid black;
`;
const GuestbookHead = styled.div`
  height: 2.375vh;
  background-color: #cdcfc4;
  border-bottom: 1px solid black;
  display: flex;
`;
const GuestbookNo = styled.div`
  width: 3vw;
  height: 2.375vh;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookNickname = styled.div`
  width: 6vw;
  height: 2.375vh;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookDate = styled.div`
  width: 7vw;
  height: 2.375vh;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GuestbookDelete = styled.div`
  margin-left: 4vw;
  width: 3vw;
  height: 2.375vh;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: right;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
const GuestbookBody = styled.div`
  height: 9.6vh;
  background-color: #eccdb0;
  border-bottom: 1px solid black;
  display: flex;
`;
const GuestbookImage = styled.div`
  width: 4.8vw;
  height: 9.7vh;
  background-image: url(${CandyImg});
  background-size: contain;
  background-repeat: no-repeat;
`;

const GuestbookMain = styled.div`
  margin-left: 1vw;
  width: 17vw;
  height: 10vh - 1px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const itemsPerPage = 10;

const GuestBoardGuestbook = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  const [currentPage, setCurrentPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchBoardDataCN();

    isMyHomeAxios();
  }, []);

  //본인만 "새 게시물 작성"이 보이도록 하는 axios
  const isMyHomeAxios = async () => {
    const myCoupleNameData = await MemberAxiosApi.renderCoupleNameSearch(email);
    console.log("불러온 커플네임 : " + myCoupleNameData.data);
    console.log("세션 커플네임 :" + coupleName);
    if (myCoupleNameData.data !== coupleName) {
      setIsMyHome(false);
    } else {
      setIsMyHome(true);
    }
  };
  const fetchBoardDataCN = async () => {
    console.log(coupleName);
    try {
      const data = await BoardAxios.getCoupleName(coupleName);
      console.log("axios 데이터", data.data);
      setBoardData(data.data);
    } catch (error) {
      console.error("Failed to fetch board data", error);
    }
  };

  const handleNameClick = (id) => {
    navigate(`/${coupleName}/board-details/${id}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("currentData", currentData);
  return (
    <BookTheme>
      <BoardSide>
        <BoardTitle>알콩 달콩 커플게시판</BoardTitle>
        <CoupleDiv>
          <CoupleImg />
        </CoupleDiv>
        <BoardGrayBar />
        <Link
          to={`/${coupleName}/board-write`}
          style={{ textDecoration: "none" }}
        >
          {isMyHome && <BoardPost>새 게시물 작성</BoardPost>}
        </Link>
        <BoardTable>
          <thead>
            <tr>
              <BoardTh>ID</BoardTh>
              <BoardTh>Name</BoardTh>
              <BoardTh>Date</BoardTh>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <BoardTd>{item.id}</BoardTd>
                <NameHover onClick={() => handleNameClick(item.id)}>
                  {item.title}
                </NameHover>
                <BoardTd>{item.regDate}</BoardTd>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <BoardPaginationContainer>
          {[...Array(Math.ceil(boardData.length / itemsPerPage))].map(
            (_, index) => (
              <BoardPaginationButton
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                style={{
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </BoardPaginationButton>
            )
          )}
        </BoardPaginationContainer>
      </BoardSide>
      <CenterArea />
      <GuestbookSide>
        {/* <GuestbookTitle>방명록</GuestbookTitle>
        <GuestbookGrayBar />
        <GuestbookWriteArea>
          <GuestbookBody>
            <GuestbookImage></GuestbookImage>
            <GuestbookWriteMain>
              <GuestbookInput placeholder="내용을 입력하세요." />
            </GuestbookWriteMain>
          </GuestbookBody>
        </GuestbookWriteArea>
        <GuestbookWriteButton>방명록 등록</GuestbookWriteButton>
        <GuestbookArea>
          <GuestbookHead>
            <GuestbookNo>No.1</GuestbookNo>
            <GuestbookNickname>캔디</GuestbookNickname>
            <GuestbookDate>(2024.02.15)</GuestbookDate>
            <GuestbookDelete>삭제</GuestbookDelete>
          </GuestbookHead>
          <GuestbookBody>
            <GuestbookImage></GuestbookImage>
            <GuestbookMain>
              데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
              세우고 있어요.
            </GuestbookMain>
          </GuestbookBody>
        </GuestbookArea>
        <GuestbookArea>
          <GuestbookHead>
            <GuestbookNo>No.1</GuestbookNo>
            <GuestbookNickname>캔디</GuestbookNickname>
            <GuestbookDate>(2024.02.15)</GuestbookDate>
            <GuestbookDelete>삭제</GuestbookDelete>
          </GuestbookHead>
          <GuestbookBody>
            <GuestbookImage></GuestbookImage>
            <GuestbookMain>
              데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
              세우고 있어요.
            </GuestbookMain>
          </GuestbookBody>
        </GuestbookArea>
        <GuestbookArea>
          <GuestbookHead>
            <GuestbookNo>No.1</GuestbookNo>
            <GuestbookNickname>캔디</GuestbookNickname>
            <GuestbookDate>(2024.02.15)</GuestbookDate>
            <GuestbookDelete>삭제</GuestbookDelete>
          </GuestbookHead>
          <GuestbookBody>
            <GuestbookImage></GuestbookImage>
            <GuestbookMain>
              데이트 게시물 잘 보고 있어요! 저희 커플도 참고해서 데이트 계획
              세우고 있어요.
            </GuestbookMain>
          </GuestbookBody>
        </GuestbookArea> */}
        <Guestbook />
      </GuestbookSide>
    </BookTheme>
  );
};
export default GuestBoardGuestbook;
