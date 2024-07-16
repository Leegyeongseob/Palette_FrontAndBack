import AxiosInstance from "./AxiosInstance";
import Common from "../common/Common";

const ChatAxiosApi = {
  chatMessagesSave: async (roomId, sender, receiver, message) => {
    console.log("receiver" + receiver);
    const chat = {
      roomId: roomId,
      sender: sender,
      receiver: receiver,
      message: message,
    };
    return await AxiosInstance.post("/chat/messages", chat);
  },

  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(
      Common.PALLETE_DOMAIN + `/chat/room/${roomId}`
    );
  },

  // 채팅방 목록 보기
  chatList: async () => {
    return await AxiosInstance.get(Common.PALLETE_DOMAIN + "/chat/list");
  },

  chatCreate: async (name) => {
    const chat = {
      name: name,
    };
    return await AxiosInstance.post(Common.PALLETE_DOMAIN + "/chat/new", chat);
  },

  pastChatDetail: async (roomId) => {
    return await AxiosInstance.get(`/chat/messages/${roomId}`);
  },

  // 커플 계정 뽑아오기
  coupleEmail: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/chat2/coupleEmail", member);
  },
};

export default ChatAxiosApi;
