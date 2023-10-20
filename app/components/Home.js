import React, { Fragment } from "react";
import Button from "react-bootstrap/cjs/Button";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import { Link, animateScroll as scroll } from "react-scroll";
import '../globals.css'
const Home = ({ mainData,dataUser, setDataUser, hidden, setHidden, showHome,setShowHome }) => {
  const {instruction} =  mainData
  const getIntstructions = (instruction) => {
  const text = instruction.split('\n').map((line,index)=>(
    <React.Fragment key={index}>
    {line}
    <br />
  </React.Fragment>
  ))
  return text
  }
  const handleClick = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
    setHidden(false);
    setShowHome(true)
    scroll.scrollToBottom();
  };
  return (
    <Fragment  >
      <Container className="containerText" hidden={showHome}>
        <div >
        <Row>
          <Col>
            <Link
              activeClass="active"
              to="section1"
              spy={true}
              smooth={true}
              offset={100}
              duration={500}
            ></Link>
            <div style={{ fontSize: "17px", textAlign: "justify" }}>
                    {getIntstructions(instruction)}
            </div>
          </Col>
        </Row>
        <Row className={"Button1"}>
          <Col xs={12} xl={12}>
            <Button
              onClick={handleClick}
              size={"lg"}
              name={"smoker"}
              value={"1"}
              variant="primary"
            >
              {mainData.findBtnText}
            </Button>
          </Col>
          {/* <Col className={"Button2"} xs={6}>
                        <Button size={'lg'} onClick={handleClick} size={"lg"} name={'smoker'} value={'2'}
                                variant="info">I don´t vape, but am a supporter</Button>
                    </Col> */}
        </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Home;
