import React from "react";
import { styled } from "styled-components";
import Globalstyle from "../../PaletteStyle";
import Header from "./paletteImport/Header";
import Category from "./paletteImport/Category";
import Footer from "./paletteImport/Footer";
import one from "../../img/loginImg/person-icon2.png";
import two from "../../img/loginImg/kakako.png";
import { Link } from "react-router-dom";
import useKakao from "./paletteImport/KakaoChat";
import { exText as notices } from "./PaletteNotice";
import { questions } from "./PaletteHelp";
import QnAItem from "./paletteImport/CustomerQnA";

const Tdfont = styled(Link)`
  display: flex;
  text-decoration: none;
  color: #000;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tbody tr:hover {
    background-color: #dadada;
    cursor: pointer;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid gray;
    font-size: 0.9vw;
    min-width: 220px;
  }

  td.number {
    width: 100px;
    min-width: 100px;
    text-align: center;
  }

  td.date {
    width: 200px;
    min-width: 200px;
    text-align: center;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
`;
const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff9f2;
  position: sticky;
`;

const BoardWrapper = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
`;

const Board = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff9f0;
`;

const HelpRoot = styled.div`
  width: 90%;
  height: 3%;
  display: flex;
  flex-direction: row;
  font-size: 0.8vw;
  justify-content: flex-start;
  align-items: center;
`;

const Root = styled(Link)`
  width: 6%;
  height: 100%;
  display: flex;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;
const Root2 = styled(Root)`
  width: 2%;
`;
const Root3 = styled(Root)`
  width: 6.5%;
`;

const CustomerBox = styled.div`
  width: 90%;
  height: 8%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #dddddd;
  color: #303030;
`;

const BoxLeft = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 18px 18px;
`;

const BoxLeftUp = styled.div`
  width: 90%;
  height: 60%;
  font-size: 1.6vw;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const BoxLeftDown = styled.div`
  width: 90%;
  height: 30%;
  font-size: 0.8vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BoxRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 20px;
`;

const BoxRightWrap = styled(Link)`
  width: 45%;
  height: 90%;
  text-decoration: none;
  color: #000;
  border: none;
  background-color: #dddddd;
  &:hover {
    font-weight: bolder;
  }
`;

const BoxRightWrap2 = styled.div`
  width: 45%;
  height: 90%;
  text-decoration: none;
  color: #000;
  border: none;
  background-color: #dddddd;
  &:hover {
    font-weight: bolder;
  }
`;

const BoxRightUp = styled.div`
  width: 90%;
  height: 65%;
  background-image: url(${one});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BoxRightUp2 = styled.div`
  width: 90%;
  height: 65%;
  background-image: url(${two});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const BoxRightDown = styled.div`
  width: 90%;
  height: 50%;
  font-size: 0.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HelpBoard = styled.div`
  width: 90%;
  height: 23%;
  display: flex;
  flex-direction: column;
`;
const HelpBoardDown = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  flex-direction: column;
`;
const HelpTitleDown = styled.div`
  width: 100%;
  height: 50%;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
`;

const HelpWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 6%;
`;

const HelpTitle = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: row;
`;

const HelpTitleLeft = styled.div`
  width: 50%;
  height: 90%;
  font-size: 1.1vw;
  font-weight: bolder;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const HelpTitleRight = styled(Link)`
  width: 50%;
  height: 90%;
  font-size: 0.8vw;
  text-decoration: none;
  color: #000;
  border: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    font-weight: bolder;
  }
`;

const QuestionBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomerPage = () => {
  useKakao("8f6501dd89f4d2c62daa077aaddd8ece"); // 여기에 본인의 카카오 앱 키를 입력하세요
  const recentNotices = notices.slice(0, 4);
  const recentQuestions = questions.slice(0, 5);

  const handleChat = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: "_raJpG", // 여기에 본인의 카카오톡 채널 ID를 입력하세요
      });
    }
  };

  return (
    <>
      <Globalstyle />
      <Header />
      <Background>
        <Container>
          <BoardWrapper>
            <Category />
            <Board>
              <HelpRoot>
                <Root to="/">Palette</Root>
                <Root2>{">"}</Root2>
                <Root3 to="/customer">고객센터</Root3>
              </HelpRoot>
              <CustomerBox>
                <BoxLeft>
                  <BoxLeftUp>무엇을 도와드릴까요 ?</BoxLeftUp>
                  <BoxLeftDown>
                    고객센터 01025546626 | 평일 09:00 ~ 18:00 | 주말 및 공휴일
                    휴무
                  </BoxLeftDown>
                </BoxLeft>
                <BoxRight>
                  <BoxRightWrap to="/customer/inquiry">
                    <BoxRightUp />
                    <BoxRightDown>1:1 문의하기</BoxRightDown>
                  </BoxRightWrap>
                  <BoxRightWrap2 as="button" onClick={handleChat}>
                    <BoxRightUp2 />
                    <BoxRightDown>카카오톡 문의</BoxRightDown>
                  </BoxRightWrap2>
                </BoxRight>
              </CustomerBox>
              <HelpBoard>
                <HelpWrap>
                  <HelpTitle>
                    <HelpTitleLeft>공지사항</HelpTitleLeft>
                    <HelpTitleRight to="/customer/notice">
                      더보기 {">"}
                    </HelpTitleRight>
                  </HelpTitle>
                  <Tdfont to="/customer/notice">
                    <table>
                      <tbody>
                        {recentNotices.map((notice) => (
                          <tr key={notice.classNo}>
                            <td className="number">{notice.classNo}</td>
                            <td>{notice.title}</td>
                            <td className="date">{notice.join}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tdfont>
                </HelpWrap>
              </HelpBoard>
              <HelpBoard>
                <HelpWrap>
                  <HelpTitle>
                    <HelpTitleLeft>자주 묻는 질문</HelpTitleLeft>
                    <HelpTitleRight to="/customer/help">
                      더보기 {">"}
                    </HelpTitleRight>
                  </HelpTitle>
                  <QuestionBox>
                    {recentQuestions.map((item, index) => (
                      <QnAItem key={index} q={item.q} a={item.a} />
                    ))}
                  </QuestionBox>
                </HelpWrap>
              </HelpBoard>
              <HelpBoardDown>
                <HelpWrap>
                  <HelpTitleDown>
                    <HelpTitleLeft>1:1 문의하기</HelpTitleLeft>
                    <HelpTitleRight to="/customer/inquiry">
                      바로가기 {">"}
                    </HelpTitleRight>
                  </HelpTitleDown>
                </HelpWrap>
              </HelpBoardDown>
              <HelpBoardDown>
                <HelpWrap>
                  <HelpTitleDown>
                    <HelpTitleLeft>광고 문의</HelpTitleLeft>
                    <HelpTitleRight to="/customer/ad">
                      바로가기 {">"}
                    </HelpTitleRight>
                  </HelpTitleDown>
                </HelpWrap>
              </HelpBoardDown>
            </Board>
          </BoardWrapper>
        </Container>
        <Footer />
      </Background>
    </>
  );
};

export default CustomerPage;
