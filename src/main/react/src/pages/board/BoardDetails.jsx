import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
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

const DetailsSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;

const EditBackContainer = styled.div`
  margin-top: 2vh;
  margin-left: 14vw;
  width: 16vw;
  height: 1vh;
  display: flex;
  justify-content: ${(isMyHome) => isMyHome && "center"};
`;

const EditPost = styled.div`
  width: 4vw;
  height: 1vh;
  font-size: 13px;
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

const BackToGuestbook = styled.div`
  width: 4vw;
  height: 1vh;
  font-size: 13px;
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

const DetailsNumber = styled.div`
  margin-left: 1.5vw;
  margin-top: 3vh;
  width: 10vw;
  height: 3vh;
  font-size: 24px;
  font-weight: 600;
`;

const DetailsTitle = styled.div`
  margin-left: 1.5vw;
  width: 22.8vw;
  height: 3vh;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsGrayBar = styled.div`
  margin-top: 1.5vh;
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
`;

const DetailsMain = styled.div`
  margin-left: 1.5vw;
  margin-top: 1.2vh;
  width: 22.8vw;
  height: 45vh;
  font-weight: 600;
`;
const BoardImgDetail = styled.div`
  width: 13vw;
  height: 22vh;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;
const itemsPerPage = 10;

const BoardDetails = () => {
  const [boardDetails, setBoardDetails] = useState(null); // State to store board details
  const [boardData, setBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 내 방이면 true 아니면 false
  const [isMyHome, setIsMyHome] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params
  const coupleName = sessionStorage.getItem("coupleName");
  const email = sessionStorage.getItem("email");
  // Function to fetch board details based on ID
  const fetchBoardDetails = async (id) => {
    console.log("id : " + id);
    try {
      // Example: Fetch board details from an API
      const response = await BoardAxios.fetchBoardById(id);
      setBoardDetails(response.data); // Assuming response.data contains board details
    } catch (error) {
      console.error("Error fetching board details:", error);
    }
  };

  useEffect(() => {
    fetchBoardDataCN();
    // Fetch board details when component mounts
    if (id) {
      fetchBoardDetails(id);
    }
    isMyHomeAxios();
  }, [id]);
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

  // Ensure boardData is defined before slicing
  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // 게시글 수정하기
  const updateBoardContentsAxios = async (idValue) => {
    navigate(`/${coupleName}/board-update`, { state: idValue });
  };
  // 게시글 삭제하기
  const deleteBoardContentsAxios = async (idValue) => {
    const res = await BoardAxios.deleteBoard(idValue);
    navigate(`/${coupleName}/board-guestbook`);

    console.log(res);
  };
  //삭제 버튼 이벤트 함수
  const deleteOnClickHandler = () => {
    deleteBoardContentsAxios(id);
  };
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
      <CenterArea></CenterArea>
      {boardDetails && ( // Render DetailsSide if boardDetails is not null
        <DetailsSide>
          <EditBackContainer isMyHome={isMyHome}>
            {isMyHome && (
              <>
                <EditPost
                  onClick={() => {
                    updateBoardContentsAxios(id);
                  }}
                >
                  수정하기
                </EditPost>
                <EditPost onClick={deleteOnClickHandler}>삭제하기</EditPost>
              </>
            )}
            <Link
              to={`/${coupleName}/board-guestbook`}
              style={{ textDecoration: "none" }}
            >
              <BackToGuestbook>돌아가기</BackToGuestbook>
            </Link>
          </EditBackContainer>
          <DetailsNumber>No. {boardDetails.id}</DetailsNumber>
          <DetailsTitle>{boardDetails.title}</DetailsTitle>
          <DetailsGrayBar />
          {boardDetails.imgUrl && (
            <BoardImgDetail imageurl={boardDetails.imgUrl} />
          )}
          <DetailsMain>{boardDetails.contents}</DetailsMain>
        </DetailsSide>
      )}
    </BookTheme>
  );
};

export default BoardDetails;
