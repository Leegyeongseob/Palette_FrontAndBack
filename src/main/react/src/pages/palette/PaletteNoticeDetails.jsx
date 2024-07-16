import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Globalstyle from '../../PaletteStyle';
import Header from './paletteImport/Header';
import Footer from './paletteImport/Footer';
import Category from "./paletteImport/Category";
import { exText } from './PaletteNotice'; // 예시 데이터 사용

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
`;

const BoardWrapper = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HelpRoot = styled.div`
width: 90%;
height: 5%;
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
const Root4 = styled(Root)`
width: 10%;
`;

const HelpBoard = styled.div`
  width: 90%;
  height: 45%;
  display: flex;
  align-items: center;
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
`;

const HelpBoardText = styled.div`
    width: 96%;
    height: 90%;
    font-size: 1vw;
    padding: 3%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const TitleBox = styled.div`
width: 90%;
height: 6%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border-top: 2px solid darkgray;
`;

const TitleLeft = styled.div`
  width: 48%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.1vw;
`;

const TitleRight = styled.div`
  width: 48%;
  height: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
 font-size: 0.9vw;
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

const BtnBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  width: 10%;
  height: 20%;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  background-color: #fff9f0;
  cursor: pointer;
  &:hover {
    background-color: #dadada;
  }
`

const NoticeDetailPage = () => {
  const { id } = useParams();
  const notice = exText.find((item) => item.classNo.toString() === id);
  const navigate = useNavigate(); 

  const backBtnClick = () => {
    navigate(`/customer/notice`);
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
                <Root2>{">"}</Root2>
                <Root4 to="/customer/notice">공지사항</Root4>
              </HelpRoot>
              <TitleBox>
                <TitleLeft>
                제목 : {notice.title}
                </TitleLeft>
                <TitleRight>
                작성일: {notice.join}
                </TitleRight>
              </TitleBox>
              <HelpBoard>
                    <HelpBoardText>
                    {notice ? (
                        <div>
                        <p>{notice.title}</p>
                        </div>
                    ) : (
                        <p>공지사항을 찾을 수 없습니다.</p>
                    )}
                    </HelpBoardText>
              </HelpBoard>
              <BtnBox>
                <BackBtn onClick={() => backBtnClick()}>뒤로가기</BackBtn>
              </BtnBox>
            </Board>
          </BoardWrapper>
        </Container>
        <Footer />
      </Background>
    </>
  );
};

export default NoticeDetailPage;
