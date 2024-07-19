import styled, { keyframes, css } from "styled-components";
import theme3 from "../../img/background/theme/new.jpg";
import theme3_1 from "../../img/background/theme/new-1.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 책 넘기는 애니메이션을 위한 keyframes
const turnPageLeft = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    transform-origin: left;
  }
  30% {
    transform: perspective(1600px) rotateY(-25deg);
    transform-origin: left;
  } 
  100% {
    transform: perspective(1000px) rotateY(-180deg);
    transform-origin: left;
  }
`;
const BookTheme = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.7vw;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookTheme2 = styled.div`
  width: 497px;
  height: 67vh;
  margin-top: 5vh;
  margin-left: 0.1vw;
  background-image: url(${theme3_1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
    margin-top: 4.2vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
    margin-top: 2.8vh;
  }
`;

const BookSign = styled.div`
  width: 497px;
  height: 66vh;

  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
  }
`;
const BookSign2 = styled.div`
  width: 497px;
  height: 66vh;
  background-image: url(${theme3_1});
  background-size: cover;
  transform: perspective(1000px) rotateY(0deg); /* 애니메이션 초기 위치 */
  transform-origin: left;
  border-left: 0.5px solid black;
  overflow: hidden;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${turnPageLeft} 1.8s forwards;
    `}
  @media screen and (max-width: 1200px) {
    width: 420px;
    height: 56vh;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
    height: 35vh;
  }
`;
const ContentsDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 60px;
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  @media screen and (max-width: 1200px) {
    font-size: 40px;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
    font-weight: 400;
  }
`;
const BeforeMainPage = () => {
  const [animate, setAnimate] = useState(false);
  const coupleName = sessionStorage.getItem("coupleName");
  const navigate = useNavigate();
  useEffect(() => {
    pageMove();
  }, []);
  const pageMove = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate(`/${coupleName}/main-page`);
    }, 1800);
  };
  return (
    <>
      <BookTheme>
        <BookSign>
          <ContentsDiv>
            <p>우리들의 이야기,</p>
          </ContentsDiv>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <BookSign2 animate={animate}>
          <ContentsDiv>
            <p>지금 시작합니다!</p>
          </ContentsDiv>
        </BookSign2>
      </BookTheme2>
    </>
  );
};

export default BeforeMainPage;
