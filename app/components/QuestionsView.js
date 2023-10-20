import React from "react";
import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/Card";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const QuestionsView = ({
  questions,
  dataUser,
  setDataUser,
  setShowThankYou,
  setHidden,
  setShowQuestions,
  showQuestionsView,
  setShowQuestionsView,
  backendURLBaseServices,
  clientId,
  endpoints,
  mainData,
  backendURLBase,
  emailData,
  setLeads,
  leads
}) => {
  const { name, lastName } = dataUser;
const elements = (questions) => {
return Object.keys(questions).map((clave) => (
   questions[clave].split('<br/>').map((line,index)=>(
    <React.Fragment key={index}>
    {line}
    <br />
  </React.Fragment>
   ))
  ));
}
const back = (e) => {
  e.preventDefault();
  setShowQuestionsView(false);
};
const handleChange = (e) => {
  setDataUser({
    ...dataUser,
    [e.target.name]: e.target.value,
  });
};
  const hoy = new Date();
  const today = hoy.toDateString();
  const click = async (e) => {
    e.preventDefault();
    let message = JSON.stringify(questions)
    setShowThankYou(false);
    setShowQuestions(true);
    setHidden(true);
    setShowQuestionsView(true);
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendEmails,
      clientId,
      `questions=${message}&user=${JSON.stringify(dataUser)}`
    );
        if (payload.success === true) {
      fetchLeads(
        true,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        message
      );
      setShowThankYou(false);
    }
    if (payload.success !== true) {
      fetchLeads(
        false,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        message
      );
      return (
        <Alert>
        The email has not been sent successfully, please try again again late
          <Button
            className={"button-email-form"}
            variant={"dark"}
            onClick={back}
          >
            Back
          </Button>
        </Alert>
      );
    }
  };
  return (
    <div
      hidden={showQuestionsView}
      className={"container"}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h2>{mainData.titlePreview}</h2>
        <p>{mainData.intructionsPreview}</p>
        <Form.Group className="field">
                    <Form.Label className="select-label">subject</Form.Label>
                    <Form.Control
                      id={"subject"}
                      type={"text"}
                      placeholder={"subject"}
                      name={"subject"}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
        <div style={{ textAlign: "left" }}>
          <Card body>
            <div>
            {
            questions? elements(questions) : null
           }
            </div>
            Sincerely,
            <p>
              {name} {lastName}
            </p>
          </Card>
        </div>
        <p style={{padding: "15px"}}> {mainData.textPreview} </p>
        <Button onClick={click} className={"u-full-width"}>
          {mainData.sendButtonPreview}
        </Button>
      </div>
    </div>
  );
};

export default QuestionsView;
