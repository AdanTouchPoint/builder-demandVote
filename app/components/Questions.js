import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { Link, animateScroll as scroll } from "react-scroll";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//const cryptoRandomString = require("crypto-random-string");

const Questions = ({
setDataQuestions,
dataQuestions,
  user,
  showQuestions,
  setShowQuestions,
  questions,
  setQuestions,
  setSmokerAnswers,
  setShowQuestionsView,
}) => {
  // agregar consulta a questions del deashboard para las preguntas
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const handleText = (e) => {
   setQuestions({
      ...questions,
      [e.target.name]: e.target.value
        .replace(/\n\r?/g, "<br/>")
        .replace(/#/g, " "),
    });
  };
  const click = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    const { question1, question2, question3 } = questions;
    setValidated(true);
    if (
      question1?.trim() === "" ||
      question2?.trim() === "" ||
      question3?.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    setShowQuestionsView(false);
    scroll.scrollToBottom();
  };
  useEffect(() => {
    return /* console.log(questions); */
  }, [questions]);
  return (
    <div
      hidden={showQuestions}
      className={"container"}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h2>Craft your email</h2>
        {error ? (
          <Alert variant={"danger"}>All fields are required!</Alert>
        ) : null}
        <Link
          activeClass="active"
          to="section1"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        ></Link>
        <Form noValidate validated={validated}>
        {dataQuestions
          ? dataQuestions.map((key, value) => (
              // eslint-disable-next-line react/jsx-key
              <Col key={value} className="questions">
                <Form.Group>
                  <Form.Label> {key.questions} </Form.Label>
                  <Form.Control
                    id="message-emailform"
                    onChange={handleText}
                    as="textarea"
                    type="text-area"
                    name={`question${value + 1}`}
                    required
                  />
                </Form.Group>
              </Col>
            ))
          : null}
          <div style={{padding: "15px"}}>
          <Button onClick={click}>Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Questions;

