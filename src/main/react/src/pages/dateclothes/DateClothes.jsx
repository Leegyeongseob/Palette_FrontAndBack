import styled from "styled-components";
import clothesBg from "../../img/album/1.jpeg";
import CoupleImage from "../../common/couple/CoupleImg";
import Swiper from "./Swiper";
import { useState } from "react";
import clothesBg1 from "../../img/background/theme/clothes_background.jpg";
const BookSign = styled.div`
  width: 100%;
  aspect-ratio: 50/20;
  height: auto;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
`;
const Save2 = styled.div`
  justify-content: end;
`;
const Save = styled.div`
  justify-content: first baseline;
`;
const CoupleimgCon = styled.div`
  margin-left: 102.5%;
  /* aspect-ratio: 203/35; */
  display: flex;
  justify-content: center;
  width: 102.5%;
  height: auto;
  /* background-color: black; */
  position: relative;
  /* margin-bottom: 5vh; */
  gap: 500px;
`;
const BookSign2 = styled.div`
  width: 100%;
  aspect-ratio: 50/20;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  & > .save2 {
    justify-content: end;
  }
  & > .clothDiv {
    height: 32%;
  }
  & > .optionSDiv {
    width: 480px;
    height: auto;
    display: flex;
    justify-content: flex-end;
  }
`;
const BookTheme = styled.div`
  width: 41.5%;
  height: 81.5%;
  margin-top: 5vh;
  margin-left: 0.7vw;
  /* background-image: url(${clothesBg1}); */
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 41.5%;
    height: 56vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 34.5vh;
    margin-top: 3vh;
  }
`;

const BookTheme2 = styled.div`
  width: 41.5%;
  height: 81.5%;
  margin-top: 5vh;
  margin-left: 0.1vw;
  /* background-image: url(${clothesBg1}); */
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    width: 41.5%;
    height: 56vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 34.5vh;
    margin-top: 3vh;
  }
`;
const Title = styled.div`
  width: 100%;
  height: 6vh;
  font-family: "Courier New", Courier, monospace;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  align-items: center;
  /* padding-top: 3vh; */
  margin-top: 10vh;
  position: relative;
  /* padding-left: 2vw; */
  @media screen and (max-width: 1200px) {
    position: relative;
    top: 10vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 34.5vh;
    margin-top: 3vh;
  }
`;

const Options = styled.div`
  width: 100px;
  height: 4vh;
  background-color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 80px;
    height: 3vh;
  }
`;
const OptionsSelectDiv = styled.div`
  width: auto;
  height: auto;
  height: 4vh;
  display: flex;
  z-index: 100;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const StroeButton = styled.div`
  width: 5vw;
  height: 4vh;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1vw;
  font-size: 1vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
const ClothesFormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: end;
`;

const ClothesForm = styled.div`
  width: 253px;
  height: auto;
  background-color: #fff;
  margin-right: 15%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 35vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 20.5vh;
    margin-top: 3vh;
  }
`;
const ClothesForm2 = styled.div`
  width: 253px;
  height: auto;
  background-color: #fff;
  margin-left: 15%;
  border-radius: 0.521vw;
  border: 2px solid pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 35vh;
    margin-top: 4vh;
  }
  @media screen and (max-width: 768px) {
    width: 41.5%;
    height: 20.5vh;
    margin-top: 3vh;
  }
`;
const OptionDiv = styled.div`
  width: 500px;
  height: 38px;
  display: flex;
  justify-content: end;
  @media screen and (max-width: 1200px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 280px;
  }
`;
const DateClothes = () => {
  const [isOnePiece, setIsOnePiece] = useState(false);
  return (
    <>
      <BookTheme>
        <BookSign>
          <Title>데이트룩 코디</Title>
          <CoupleimgCon>
            <CoupleImage clothes={true} />
          </CoupleimgCon>
          <ClothesFormContainer>
            <ButtonDiv>
              <StroeButton>저장</StroeButton>
            </ButtonDiv>
            <ClothesForm>
              <Swiper clothNum={1} />
              <Swiper clothNum={2} />
              <Swiper shoes={true} clothNum={3} />
            </ClothesForm>
          </ClothesFormContainer>
        </BookSign>
      </BookTheme>
      <BookTheme2>
        <div className="clothDiv" />
        <BookSign2>
          <OptionDiv>
            <OptionsSelectDiv>
              <Options
                onClick={() => {
                  setIsOnePiece(true);
                }}
              >
                원피스
              </Options>
              <Options
                onClick={() => {
                  setIsOnePiece(false);
                }}
              >
                상＆하의
              </Options>
            </OptionsSelectDiv>
          </OptionDiv>
          <ClothesFormContainer>
            <ClothesForm2>
              <Swiper clothNum={4} OnePiece={isOnePiece} />
              <Swiper clothNum={5} OnePiece={isOnePiece} />
              <Swiper clothNum={7} OnePiece={isOnePiece} />
              <Swiper shoes={true} clothNum={6} />
            </ClothesForm2>
            <ButtonDiv>
              <StroeButton>저장</StroeButton>
            </ButtonDiv>
          </ClothesFormContainer>
        </BookSign2>
      </BookTheme2>
    </>
  );
};
export default DateClothes;
