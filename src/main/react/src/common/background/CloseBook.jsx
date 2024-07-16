import styled from "styled-components";
import closebook from "../../img/background/closebook.png";
import theme3 from "../../img/background/theme/3.jpg";
import background from "../../img/background/theme/background3.jpg";
import logo from "../../img/background/logo.png";
import { Outlet, Link } from "react-router-dom";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import { useEffect, useState } from "react";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BookTheme = styled.div`
  width: 450px;
  height: 72.5%;
  margin-top: 10vh;
  margin-left: 55px;
  background-image: url(${theme3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1333px) {
    width: 64%;
    height: 48.5vw;
    margin-top: calc(480px - 27vw);
    margin-left: 7%;
  }
`;
const LogoDiv = styled.div`
  width: 100%;
  height: 26%;
  display: flex;
  justify-content: center;
  align-items: first baseline;
`;
const Logo = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: scale(0.95);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }
  @media screen and (max-width: 1333px) {
    width: 10vw;
    height: 10vw;
  }
`;
const Contents = styled.div`
  width: 100%;
  height: 100%;
`;
const Book = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${closebook});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
`;

const CloseBook = ({ modify }) => {
  const [coupleName, setCoupleName] = useState();
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (modify) {
      coupleNameAxios();
    }
  }, []);
  const coupleNameAxios = async () => {
    const res = await MemberAxiosApi.renderCoupleNameSearch(email);
    setCoupleName(res.data);
  };
  return (
    <Background>
      <Book>
        <BookTheme>
          <LogoDiv>
            {!modify && (
              <Link to="/">
                <Logo alt="logo" src={logo} />
              </Link>
            )}
            {modify && (
              <Link to={`/${coupleName}/main-page`}>
                <Logo alt="logo" src={logo} />
              </Link>
            )}
          </LogoDiv>
          <Contents>
            <Outlet />
          </Contents>
        </BookTheme>
      </Book>
    </Background>
  );
};

export default CloseBook;
