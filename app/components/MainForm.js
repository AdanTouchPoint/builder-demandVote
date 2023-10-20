"use client";
import React, { useState } from "react";
import Home from "./Home";
import ThankYou from "./ThankYou";
import Questions from "./Questions";
import RegisterForm from "./RegisterForm";
import QuestionsView from "./QuestionsView"
import Footer from "./Footer"
import { animateScroll as scroll } from "react-scroll";
import { fetchRepresentatives } from "../assets/petitions/fetchRepresentatives";
const MainForm = ({
  leads,
  setLeads,
  dataUser,
  setDataUser,
  mp,
  setMp,
  setEmailData,
  emailData,
  clientId,
  tweet,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  senator,
  setSenator,
  setDataQuestions,
  dataQuestions,
  questions,
  setQuestions,
  showQuestions,
  setShowQuestions,
  showQuestionsView,
  setShowQuestionsView

}) => {
  const [showThankYou, setShowThankYou] = useState(true);
  const [hidden, setHidden] = useState(true)
  const [showHome,setShowHome ]= useState(false)
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
   
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
    <header style={{background: '#e4eaf1'}}>
    </header>
    <div style={{background: '#6a7b8d', flex: '1'}}>
        <h1 style={{color: 'white'}}>
           {mainData.title} 
        </h1>
        <Home
            dataUser={dataUser}
            setDataUser={setDataUser}
            hidden={hidden}
            setHidden={setHidden}
            mainData={mainData}
            showHome={showHome}
            setShowHome={setShowHome}
        />
        <RegisterForm
            mainData={mainData}
            hidden={hidden}
            dataUser={dataUser}
            setDataUser={setDataUser}
            showQuestions={showQuestions}
            setShowQuestions={setShowQuestions}
            questions={questions}
            setQuestions={setQuestions}
            senator={senator}
        />
        <Questions 
            setDataQuestions={setDataQuestions}
            dataQuestions={dataQuestions}
            dataUser={dataUser}
            setDataUser={setDataUser}
            showQuestions={showQuestions}
            setShowQuestions={setShowQuestions}
            questions={questions}
            setQuestions={setQuestions}
            showQuestionsView={showQuestionsView}
            setShowQuestionsView={setShowQuestionsView}
        />
        <QuestionsView
            setHidden={setHidden}
            dataUser={dataUser}
            questions={questions}
            setShowThankYou={setShowThankYou}
            showQuestions={showQuestions}
            setShowQuestions={setShowQuestions}
            showQuestionsView={showQuestionsView}
            setShowQuestionsView={setShowQuestionsView}
            endpoints={endpoints}
            backendURLBaseServices={backendURLBaseServices}
            backendURLBase={backendURLBase}
            clientId={clientId}
            mainData={mainData}
            senator={senator}
            setDataUser={setDataUser}
            emailData={emailData}
            leads={leads}
            setLeads={setLeads}
            showHome={showHome}
            setShowHome={setShowHome}
        />
        <ThankYou
        setHidden={setHidden}
        typData={typData}
        showThankYou={showThankYou}
        setShowThankYou={setShowThankYou}/>
    </div>
    <Footer/>

</div>
  );
};
export default MainForm;