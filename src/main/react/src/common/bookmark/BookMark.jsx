import styled from "styled-components";
import theme6 from "../../img/background/theme/6.jpg";
import theme12 from "../../img/background/theme/12.jpg";
import theme8 from "../../img/background/theme/8.jpg";
import theme3 from "../../img/background/theme/3.jpg";
import clothesBg from "../../img/background/theme/4.jpg";
import boardBg from "../../img/background/theme/board_background.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../../pages/datediary/Modal";
import soleModalImg from "../../img/mainImg/솔로잠금.gif";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import visitLcck from "../../img/mainImg/방문자 잠금.gif";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
const BookMarkDiv = styled.div`
  width: 358px;
  height: 10.493vh;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 300px;
    height: 9vh;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
    height: 4vh;
  }
`;
const BookMarks = styled.div`
  width: 50px;
  height: 100px;
  border: 1px solid #000;
  border-radius: 10px 10px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  writing-mode: vertical-lr;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-position: center;
  background-size: cover;
  cursor: pointer;
  border-bottom: none;
  @media screen and (max-width: 1200px) {
    width: 40px;
    height: 80px;
    font-size: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 25px;
    height: 50px;
    font-size: 7px;
    border-radius: 5px 5px 0 0;
  }
`;

const BookMark = () => {
  const coupleName = sessionStorage.getItem("coupleName");
  const navigator = useNavigate();
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const email = sessionStorage.getItem("email");
  const [compareCoupleName, setCompareCoupleName] = useState("");
  const [notEqualCoupleName, setNotEqualCoupleName] = useState(false);
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    navigator("/login-page");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  //솔로 모달
  const soloModal = () => {
    setModalOpen(true);
    setModalContent("커플 연결을 위해 로그인 페이지로 이동합니다.");
  };
  // 커플인지 확인하는 비동기함수
  const isCoupleAxios = async (emailValue) => {
    const coupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
      emailValue
    );
    const resCouple = await MemberAxiosApi.isCoupleTrue(coupleNameData.data);
    return resCouple.data;
  };
  // 주인인지 방문객인지 확인
  const compareCoulpleNameFunction = async (emailData) => {
    const coupleNameData = await MemberAxiosApi.renderCoupleNameSearch(
      emailData
    );
    if (coupleNameData.data !== coupleName) {
      // 본인이 아닌경우
      setModalOpen(true);
      setNotEqualCoupleName(true);
      setModalContent("방문자는 해당 기능이 잠겨있습니다.");
      navigator(`/${coupleName}/main-page`);
    } else {
      //본인이면서 커플일 경우
      setNotEqualCoupleName(false);
    }
  };

  const OpenDiaryOnClickHandler = async () => {
    compareCoulpleNameFunction(email);
    if ((await isCoupleAxios(email)) === true) {
      navigator("/date-diary");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenAlbumOnClickHandler = async () => {
    compareCoulpleNameFunction(email);
    if ((await isCoupleAxios(email)) === true) {
      navigator("/date-album");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenClothesOnClickHandler = async () => {
    compareCoulpleNameFunction(email);
    if ((await isCoupleAxios(email)) === true) {
      navigator("/date-clothes");
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenDateplannerOnClickHandler = async () => {
    compareCoulpleNameFunction(email);
    if ((await isCoupleAxios(email)) === true) {
      navigator(`/${coupleName}/dateplanner`);
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };
  const OpenBoardOnClickHandler = async () => {
    if ((await isCoupleAxios(email)) === true) {
      navigator(`/${coupleName}/board-guestbook`);
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };

  const OpenChatOnClickHandler = async () => {
    compareCoulpleNameFunction(email);
    if ((await isCoupleAxios(email)) === true) {
      navigator(`/Chat`);
    } else {
      // 모달
      soloModal();
      console.log("솔로는 웁니다.");
    }
  };

  //방문객 모달 확인버튼 이벤트함수
  const visitCodeModalOkBtnHandler = () => {
    closeModal();
    navigator(`/${coupleName}/main-page`);
  };
  return (
    <BookMarkDiv>
      {notEqualCoupleName ? (
        <Modal
          open={modalOpen}
          header="방문객 기능잠금"
          type={true}
          confirm={visitCodeModalOkBtnHandler}
          img={visitLcck}
        >
          {modalContent}
        </Modal>
      ) : (
        <Modal
          open={modalOpen}
          header="솔로는 웁니다."
          type={true}
          confirm={codeModalOkBtnHandler}
          img={soleModalImg}
        >
          {modalContent}
        </Modal>
      )}
      <BookMarks imageurl={theme3} onClick={OpenDiaryOnClickHandler}>
        다이어리
      </BookMarks>
      <BookMarks imageurl={theme8} onClick={OpenAlbumOnClickHandler}>
        갤러리
      </BookMarks>
      <BookMarks imageurl={clothesBg} onClick={OpenClothesOnClickHandler}>
        데이트룩
      </BookMarks>
      <BookMarks imageurl={theme6} onClick={OpenDateplannerOnClickHandler}>
        데이트코스
      </BookMarks>
      <BookMarks imageurl={boardBg} onClick={OpenBoardOnClickHandler}>
        게시판
      </BookMarks>
      <BookMarks imageurl={theme12} onClick={OpenChatOnClickHandler}>
        채팅
      </BookMarks>
    </BookMarkDiv>
  );
};

export default BookMark;
