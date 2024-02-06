import React, { useRef } from "react";
import styled from "styled-components";
import { BsArrowUpSquare } from "react-icons/bs";


const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

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
  color: #fff;
  font-family: 'Pretendard-ExtraBold';
  padding: 0 19rem;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
    color: #fff;
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
  background-color: #E60013;
  z-index: 1;
  transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease-in-out;

`;

const ScrollToTopIcon = styled(BsArrowUpSquare)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 2rem 3rem 4rem 4rem;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #E60013;
  }
`;

const HeaderComp = () => {
  const headerRef = useRef(null); 

  const scrollToTop = () => {
    if (headerRef.current) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Header ref={headerRef} >
      <HeaderDiv>
        <Logo>SEIMIN GAME INFOMATION</Logo>
        <ScrollToTopIcon onClick={scrollToTop} />
      </HeaderDiv>
    </Header>
  );
};

export default HeaderComp;