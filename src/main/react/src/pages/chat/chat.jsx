import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaRegImage, FaGear, FaHeart } from "react-icons/fa6";
import { TbWallpaper } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../axiosapi/ChatAxiosApi";
import MainAxios from "../../axiosapi/MainAxios";
import {
  BsEmojiAngry,
  BsEmojiAstonished,
  BsEmojiFrown,
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiGrin,
  BsEmojiHeartEyes,
} from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import chatBack1 from "../../img/chat/pcchatimg/9.jpg";
import chatBack2 from "../../img/chat/pcchatimg/6.jpg";
import chatBack3 from "../../img/chat/pcchatimg/8.jpg";
import chatBack4 from "../../img/chat/pcchatimg/13.png";
import chatBack5 from "../../img/chat/pcchatimg/21.png";
import chatBack6 from "../../img/chat/pcchatimg/25.png";
import chatBack7 from "../../img/chat/pcchatimg/31.png";
import chatBack8 from "../../img/chat/pcchatimg/e2778e53a9a2d07fdce550181fc43fc5.jpg";
import Common from "../../common/Common";
import { chatstorage } from "../../firebase/Chatfirebase";
import LoginAxios from "../../axiosapi/LoginAxios";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";

const GlobalStyle = styled.div`
  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 12px; /* 스크롤바 너비 */
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb {
    background: #cdcfc4; /* 스크롤바 색상 */
    border-radius: 10px; /* 둥근 모서리 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a3a59c; /* 스크롤바 호버 색상 */
  }
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Chatpage = styled.div`
  width: 54vw;
  height: 68vh;
  margin-top: 5vh;
  background: url(${(props) => props.backgroundImage}) no-repeat center center;
  background-size: cover;
  position: relative;
`;

const Textarea = styled.div`
  width: 54vw;
  height: ${(props) => (props.isPlusMenuVisible ? "30vh" : "50vh")};
  overflow-y: auto;
  padding: 10px;
  background: transparent;
`;

const TopText = styled.div`
  position: sticky;
  top: 0;
  background-color: transparent;
  z-index: 1;
  padding: 10px;
`;

const PlusMenu = styled.div`
  width: 54vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
`;

const TemaMenu = styled.div`
  width: 54vw;
  height: 18vh;
  background-color: #a5a5a5b7;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
  img {
    width: 6vw;
    height: auto;
    max-height: 100%;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const EmojiMenu = styled.div`
  width: 54vw;
  height: 18vh;
  background-color: gray;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: absolute;
  bottom: 10vh;
  justify-content: space-around;
`;

const EmojiIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: #ffcc00; /* 호버 시 색상 변경 */
  }
`;

const PlusMenuBtn = styled.div`
  font-size: 50px;
  padding: 10px;
  display: flex;

  gap: 20px;
  .icon:last-child {
    margin-right: 0;
  }
`;

const InputText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  input {
    flex: 1;
    height: 4vh;
    font-size: 15px;
    border: 0;
    border-radius: 10px 0 0 10px;
    outline: none;
    padding-left: 10px;
    background-color: #ffffff;
  }
  .send {
    width: 4vh;
    height: 4vh;
    background-color: #fdff8f;
    margin-right: 2vw;
    border: 0;
    border-radius: 0 10px 10px 0;
    outline: none;
    font-size: 1rem;
    margin-left: auto;
    cursor: pointer;
    position: relative;
    padding-right: 30px;
  }
  .heart {
    color: red;
    font-size: 20px;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
  .plus {
    position: relative;
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .plus::before,
  .plus::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: black;
  }
  .plus::before {
    transform: rotate(0deg);
  }
  .plus::after {
    transform: rotate(90deg);
  }
`;

const ChatMain = () => {
  const [isPlusMenuVisible, setPlusMenuVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(chatBack1);
  const [isTemaMenuVisible, setTemaMenuVisible] = useState(false);
  const [isEmojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const inputFileRef = useRef(null);
  const { roomId } = useParams(); // 채팅방 번호
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [sender, setSender] = useState(""); // 보내는 사람
  const [receiver, setReceiver] = useState(""); // 받는 사람
  const ws = useRef(null); // 웹소켓 객체
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [imageURL, setImageURL] = useState("");
  const [coupleNickName, setCoupleNickName] = useState(["", ""]);
  const email = sessionStorage.getItem("email");

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    // 엔터키 입력시, 공백 제거 후 비어있지 않으면
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    const sendMessage = async (roomId, sender, receiver, message) => {
      try {
        const rsp = await ChatAxiosApi.chatMessagesSave(
          roomId,
          sender,
          receiver,
          message
        );
        setInputMsg(""); // 메시지 전송 후 입력 필드 초기화
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    // WebSocket을 통해 메시지 전송
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: sender,
          receiver: receiver,
          message: inputMsg,
        })
      );
    }

    // 서버에 메시지 저장
    sendMessage(roomId, sender, receiver, inputMsg);
  };

  useEffect(() => {
    const coupleEmailAxios = async () => {
      try {
        const rsp = await ChatAxiosApi.coupleEmail(email);
        console.log(rsp.data);
        setSender(rsp.data[0]);
        setReceiver(rsp.data[1]);
      } catch (error) {
        console.log(error);
      }
    };
    coupleEmailAxios();
  }, [email]);

  useEffect(() => {
    const accessToken = Common.getAccessToken();
    const getChatRoom = async () => {
      try {
        const rsp = await ChatAxiosApi.chatDetail(roomId);
        // setChatList(rsp.chatData);
        setRoomName(rsp.data.name);
        console.log(rsp.data.chatData);
      } catch (e) {
        if (e.rsp.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await ChatAxiosApi.chatDetail(roomId);
            console.log(rsp.data.name);
            setRoomName(rsp.data.name);
          }
        }
      }
    };
    const getPastMessages = async () => {
      try {
        const rsp = await ChatAxiosApi.pastChatDetail(roomId);
        setChatList(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    getChatRoom();
    getPastMessages();
  }, []);

  useEffect(() => {
    // console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(Common.PALETTE_SOCKET_URL);
      ws.current.onopen = () => {
        console.log("connected to " + Common.PALETTE_SOCKET_URL);
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,

          sender: sender,
          receiver: receiver,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log("테스트" + data.message);
      setChatList((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected]);

  // 화면 하단으로 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  const chatContainerRef = useRef(null);

  // console.log(chatList);

  const togglePlusMenu = () => {
    setPlusMenuVisible(!isPlusMenuVisible);
    setTemaMenuVisible(false);
    setEmojiMenuVisible(false);
  };
  // 테마 토글
  const toggleTemaMenu = () => {
    setTemaMenuVisible(!isTemaMenuVisible);
    setPlusMenuVisible(false);
    setEmojiMenuVisible(false);
  };
  // 이모지 토글
  const toggleEmojiMenu = () => {
    setEmojiMenuVisible(!isEmojiMenuVisible);
    setPlusMenuVisible(false);
    setTemaMenuVisible(false);
  };
  // 테마 토글
  const handleTemaClick = (image) => {
    setBackgroundImage(image);
    setTemaMenuVisible(false);
  };

  // 이미지 업로드 부분
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = chatstorage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef
      .put(file)
      .then(() => {
        return fileRef.getDownloadURL();
      })
      .then((url) => {
        setImageURL(url);
        console.log("File available at", url);
        const messageData = {
          type: "IMAGE",
          sender: sender,
          receiver: receiver,
          message: "",
          imageUrl: url,
        };
        ws.current.send(JSON.stringify(messageData));
        setChatList((prevChatList) => [
          ...prevChatList,
          { sender: sender, message: "", imageUrl: url },
        ]); // 로컬 상태 업데이트
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  //커플 개인 닉네임 불러오기
  const coupleNickNameAxois = async (couple) => {
    const resNickName = await MainAxios.searchNickName(email, couple);
    setCoupleNickName(resNickName.data);
  };
  useEffect(() => {
    const coupleName = sessionStorage.getItem("coupleName");
    coupleNickNameAxois(coupleName);
  }, []);

  return (
    <GlobalStyle>
      <Chatpage backgroundImage={backgroundImage}>
        <TopText>{coupleNickName[0]}</TopText>
        <Textarea
          ref={chatContainerRef}
          isPlusMenuVisible={
            isPlusMenuVisible || isTemaMenuVisible || isEmojiMenuVisible
          }
        >
          {chatList.map((chat, index) => (
            <Message key={index} isSender={chat.sender === sender}>
              {chat.chatData}
              {chat.imageUrl ? (
                <img
                  src={chat.imageUrl}
                  alt="전송된 이미지"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                chat.message
              )}
            </Message>
          ))}
        </Textarea>
        <PlusMenu isVisible={isPlusMenuVisible}>
          <PlusMenuBtn>
            <label htmlFor="imageInput">
              <FaRegImage className="icon 이미지사진" />
            </label>
            <input
              type="file"
              id="imageInput"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <TbWallpaper className="icon 톱니" onClick={toggleTemaMenu} />
            <MdEmojiEmotions className="icon 임티" onClick={toggleEmojiMenu} />
          </PlusMenuBtn>
        </PlusMenu>
        <TemaMenu isVisible={isTemaMenuVisible}>
          <img
            src={chatBack1}
            alt="테마1"
            onClick={() => handleTemaClick(chatBack1)}
          />
          <img
            src={chatBack2}
            alt="테마2"
            onClick={() => handleTemaClick(chatBack2)}
          />
          <img
            src={chatBack3}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack3)}
          />
          <img
            src={chatBack4}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack4)}
          />
          <img
            src={chatBack5}
            alt="테마4"
            onClick={() => handleTemaClick(chatBack5)}
          />
          <img
            src={chatBack6}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack6)}
          />
          <img
            src={chatBack7}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack7)}
          />
          <img
            src={chatBack8}
            alt="테마3"
            onClick={() => handleTemaClick(chatBack8)}
          />
        </TemaMenu>
        <EmojiMenu isVisible={isEmojiMenuVisible}>
          <EmojiIcon>
            <BsEmojiHeartEyes />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiAngry></BsEmojiAngry>
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiAstonished />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiFrown />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiDizzy />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiExpressionless />
          </EmojiIcon>
          <EmojiIcon>
            <BsEmojiGrin />
          </EmojiIcon>
        </EmojiMenu>
        <InputText>
          <button className="plus" onClick={togglePlusMenu}></button>
          <input
            type="text"
            value={inputMsg}
            onChange={onChangMsg}
            placeholder="메시지를 입력하세요"
            onKeyUp={onEnterKey}
          />
          <button className="send" onClick={onClickMsgSend}>
            <FaHeart className="heart" />
          </button>
        </InputText>
      </Chatpage>
    </GlobalStyle>
  );
};

export default ChatMain;