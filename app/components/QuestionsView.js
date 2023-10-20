import React from "react";
import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/Card";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import Alert from "react-bootstrap/Alert";
const QuestionsView = ({
  questions,
  dataUser,
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
  const hoy = new Date();
  const today = hoy.toDateString();
  const click = async (e) => {
    e.preventDefault();
    setShowThankYou(false);
    setShowQuestions(true);
    setHidden(true);
    setShowQuestionsView(true);
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendEmails,
      clientId,
      `questions=${JSON.stringify(questions)}&user=${JSON.stringify(dataUser)}`
    );
        if (payload.success === true) {
      fetchLeads(
        true,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        questions
      );
      setShowThankYou(false);
      setLeads(leads+1)
    }
    if (payload.success !== true) {
      fetchLeads(
        false,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        questions
      );
      setLeads(leads+1)
      return (
        <Alert>
          El correo no ha sido enviado con éxito, por favor intente de nuevo más
          tarde
          <Button
            className={"button-email-form"}
            variant={"dark"}
            onClick={back}
          >
            Regresar
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

        <div style={{ textAlign: "left" }}>
          <Card body>
            <p>
              {today} <br />
              Committee Secretariat Government Committee
              <br />
              Parliament Address Line 1 <br />
              Parliament Address Line 2 <br />
              Parliament Address Line 3<br />
            </p>
            <p>
              Submission by {name} {lastName} - {today}
            </p>
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
