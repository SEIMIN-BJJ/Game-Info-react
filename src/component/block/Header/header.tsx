import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: auto;
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.h4`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: 'Pretendard-Medium';
  padding: 0 19rem;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    color: #000;
    padding: 0px 30px;
    position: relative;
  }
`;

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
  transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease-in-out;

`;

const HeaderComp = () => {


  return (
    <Header>
      <HeaderDiv>
        <Logo>SEIMIN GAME INFOMATION</Logo>
      </HeaderDiv>
    </Header>
  );
};

export default HeaderComp;