import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BoardAxios from "../../axiosapi/BoardAxios";
import boardBg from "../../img/background/theme/9.jpg";
import CoupleImg from "../../common/couple/CoupleImgMini";
import AddPhoto from "../../img/board/AddPhoto.png";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase/firebaseBoard";

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

const WriteSide = styled.div`
  width: 25.8vw;
  height: 68.5vh;
`;
const BackToGuestbook = styled.div`
  margin-top: 2vh;
  margin-left: 19vw;
  width: 8vw;
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
const WriteTitle = styled.div`
  margin-left: 1.5vw;
  margin-top: 4vh;
  width: 22.8vw;
  height: 7vh;
  display: flex;
`;
const WriteTitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 30px;
`;
const WriteGrayBar = styled.div`
  margin-left: 1.5vw;
  width: 22.5vw;
  height: 0.4vh;
  background-color: #b0b0b0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WriteAddPhoto = styled.button`
  margin-top: 1.2vh;
  margin-left: 1.5vw;
  width: 2vw;
  height: 3.5vh;
  background-image: url(${AddPhoto});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
  }
`;
const WriteMain = styled.div`
  margin-left: 1.5vw;
  margin-top: 1.2vh;
  width: 22.8vw;
  height: 40vh;
  display: flex;
  align-items: flex-start;
`;
const WriteMainInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  resize: none;
  overflow-y: auto;
`;
const WritePost = styled.div`
  margin-top: 2vh;
  margin-left: 19vw;
  width: 8vw;
  height: 1vh;
  font-size: 16px;
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

const itemsPerPage = 10;

const BoardWrite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [boardData, setBoardData] = useState([]);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  // 세션 추가
  const email = sessionStorage.getItem("email");
  const coupleName = sessionStorage.getItem("coupleName");
  // useEffect(() => {
  //   fetchBoardData();
  // }, []);
  useEffect(() => {
    fetchBoardDataCN();
  }, []);

  const fetchBoardDataCN = async () => {
    const coupleName = sessionStorage.getItem("coupleName");
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

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (!file) return;

    const fileRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling can be added here if needed
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("파일 업로드 실패");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!title || !contents) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      let downloadURL = "";

      if (file) {
        const fileRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(fileRef, file);

        downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // 업로드 진행 상태 처리 (optional)
            },
            (error) => {
              console.error("파일 업로드 실패:", error);
              alert("파일 업로드에 실패했습니다.");
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                console.error("URL 가져오기 실패:", error);
                reject(error);
              }
            }
          );
        });
      }

      const boardData = {
        title,
        contents,
        imgUrl: downloadURL,
        memberEmail: email || "",
      };
      console.log("제출할 데이터:", boardData);
      await submitBoard(boardData);
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  const submitBoard = async (boardReqDto) => {
    const coupleName = sessionStorage.getItem("coupleName");
    try {
      console.log("서버로 전송할 데이터:", boardReqDto, coupleName);
      const response = await BoardAxios.createBoard(boardReqDto, coupleName);

      console.log("서버 응답 데이터:", response);
      navigate(`/${coupleName}/board-guestbook`); // 리다이렉트
    } catch (error) {
      console.error(
        "게시글 생성 실패:",
        error.response ? error.response.data : error
      );
      alert(
        `게시글 생성에 실패했습니다: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };
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
        ></Link>
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
      <WriteSide>
        <Link
          to={`/${coupleName}/board-guestbook`}
          style={{ textDecoration: "none" }}
        >
          <BackToGuestbook>돌아가기</BackToGuestbook>
        </Link>
        <WriteTitle>
          <WriteTitleInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </WriteTitle>
        <WriteGrayBar />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
        <WriteAddPhoto onClick={handleAddPhotoClick}></WriteAddPhoto>
        <WriteMain>
          <WriteMainInput
            placeholder="내용을 입력하세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </WriteMain>
        <WritePost onClick={handleSubmit}>게시하기</WritePost>
      </WriteSide>
    </BookTheme>
  );
};

export default BoardWrite;
