import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Footer = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;
const FooterLeft = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const FooterRight = styled.div`
  width: 20%;
  height: 90%;
  display: flex;
`;

const LinkTitle = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TextTitle = styled(Link)`
  width: 13%;
  height: 90%;
  display: flex;
  font-size: 0.9vw;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #000;
  &:hover {
    font-weight: bolder;
  }
`;

const IntroBox = styled.div`
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
`;

const IntroText = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  font-size: 0.7vw;
  align-items: center;
`;

const CopyrightBox = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
`;

const Copyright = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  font-size: 0.6vw;
  align-items: center;
`;

const Foot = () => (
  <>
    <Footer>
      <FooterLeft>
      <LinkTitle>
        <TextTitle to="">개인정보처리방침</TextTitle>
        <TextTitle to="">이용약관</TextTitle>
      </LinkTitle>
      <IntroBox>
        <IntroText>Palette | 대표 : 곰돌이사육사 | 사업자등록번호 : 000-00-00000 | 통신판매업 신고번호 : 제2024-서울강남-00000호 | 개인정보보호 책임자 : 백승재</IntroText>
        <IntroText>주소 : 서울시 강남구 테헤란로14길 6 | 대표전화 : 02-000-0000</IntroText>
        <IntroText>고객센터 : @palette_service | 운영시간 : 평일 오전 9시 ~ 오후 6시(주말/공휴일 휴무)</IntroText>
      </IntroBox>
      <CopyrightBox>
        <Copyright>Copyright 2024. Palette inc. all rights reserved.</Copyright>
      </CopyrightBox>
      </FooterLeft>
      <FooterRight></FooterRight>
    </Footer>
  </>
);

export default Foot;
