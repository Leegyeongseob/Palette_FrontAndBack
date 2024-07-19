import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Footer = styled.div`
  width: 100%;
  height: auto;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 1200px) {
    padding: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FooterLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const FooterRight = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const LinkTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;

  @media (max-width: 768px) {
    padding-right: 0;
  }

  @media (max-width: 1200px) {
    flex-direction: row;
    padding-right: 20px;
  }
`;

const TextTitle = styled(Link)`
  font-size: calc(1rem + 0.5vw);
  text-decoration: none;
  color: #000;
  padding: 5px 10px;
  margin: 5px;

  &:hover {
    font-weight: bolder;
  }
  @media (max-width: 1200px) {
    font-size: calc(0.9rem + 0.3vw);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const IntroBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const IntroText = styled.div`
  width: 100%;
  font-size: calc(0.9rem + 0.5vw);
  text-align: left; // 왼쪽 정렬
  padding: 5px 0;

  @media (max-width: 1200px) {
    font-size: calc(0.8rem + 0.5vw);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CopyrightBox = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;

  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Copyright = styled.div`
  width: 100%;
  font-size: calc(0.9rem + 0.5vw);
  text-align: center;

  @media (max-width: 1300px) {
    font-size: calc(0.8rem + 0.5vw);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Foot = () => (
  <Footer>
    <FooterLeft>
      <LinkTitle>
        <TextTitle to="">개인정보처리방침</TextTitle>
        <TextTitle to="">이용약관</TextTitle>
      </LinkTitle>
      <IntroBox>
        <IntroText>
          Palette | 대표 : 곰돌이사육사 | 사업자등록번호 : 000-00-00000 |
          통신판매업 신고번호 : 제2024-서울강남-00000호 | 개인정보보호 책임자 :
          백승재
        </IntroText>
        <IntroText>
          주소 : 서울시 강남구 테헤란로14길 6 | 대표전화 : 02-000-0000
        </IntroText>
        <IntroText>
          고객센터 : @palette_service | 운영시간 : 평일 오전 9시 ~ 오후
          6시(주말/공휴일 휴무)
        </IntroText>
      </IntroBox>
      <CopyrightBox>
        <Copyright>Copyright 2024. Palette inc. all rights reserved.</Copyright>
      </CopyrightBox>
    </FooterLeft>
    <FooterRight></FooterRight>
  </Footer>
);

export default Foot;
