"use client"
import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainForm from "./components/MainForm";
import LoadingMainForm from './components/LoadingMainForm';
import { fetchQuestions } from './assets/petitions/fetchQuestions';
import { fetchStatesData } from './assets/petitions/fetchStatesData';
import { fetchTweet } from './assets/petitions/fetchTweet';
import { fetchTYM } from './assets/petitions/fetchTYM';
import { fetchMainContent } from './assets/petitions/fetchMainContent';
import { fetchAllLeads } from './assets/petitions/fetchLeads';
import { fetchRepresentatives } from './assets/petitions/fetchRepresentatives';
//require('dotenv').config()

function Home() {
  const [emailData, setEmailData] = useState({
    userName: ''
  })
  const [dataUser, setDataUser] = useState({
email:'',
subject:''
  })
      const [backendURLBase] = useState(`${process.env.NEXT_PUBLIC_URL}`)
      const [backendURLBaseServices] = useState(`${process.env.NEXT_PUBLIC_URL_SERVICES}`)
      const [clientId] = useState(`${process.env.NEXT_PUBLIC_CLIENT_ID}`)
      const [endpoints] = useState({
        toGetAllRepresentatives:'/all-senators/',
        toGetQuestions:'/questions/',
        toGetMainData:'/main/',
        toGetThankYouMessage:'/typ-message/',
        toGetTweets:'/tweets/',
        toSaveLeads:'/leads/',
        toSendEmails:'/email-builder/',
        toGetAllLeads:'/leads/'
      })
    const [mp, setMp] = useState([])
    const [senator, setSenator] = useState([])
    const [states, setStates] = useState([])
    const [tweet, setTweet] = useState('')
    const [leads, setLeads] = useState()
    const [dataQuestions,setDataQuestions] = useState()
    const [questions, setQuestions] = useState({
      question1: '',
    })
    const [showQuestions, setShowQuestions] = useState(true)
    const [showQuestionsView,setShowQuestionsView] = useState(true)
    const [mainData, setMainData] = useState({
      title:'Please enter a title on your board',
      instruction:'Please enter an instruction paragraph in your dashboard',
      termsAndConditionsTxt:'Please enter a text of terms and conditions in your dashboard',
      termsAndConditionsURL:'#',
      findBtnText: 'Find your representative',
      note:'Please enter a note text in your dashboard',
    })
    const [typData, setTypData] = useState({
      thankYouMessage:'Please enter a thank you message on the dashboard',
      secondThankYouMessage : 'Please enter fill this field in the dashboard',
      repeatButtonTyp : 'Please fill in this field on the dashboard',
    })
    const [loading, setLoading] = useState(true)
   // const adanCID ='636dadcf2626f92aade6664a'
    useEffect(() => {

        async function fetchData() {
          await Promise.all([
            fetchAllLeads('GET', backendURLBase, endpoints.toGetAllLeads, clientId, setLeads),
            fetchMainContent('GET', backendURLBase, endpoints.toGetMainData, clientId, '', setMainData),
            //fetchEmailData('GET', backendURLBase, endpoints.toGetQuestions, clientId, "", setDataUser),
            fetchRepresentatives('GET', backendURLBase, endpoints.toGetAllRepresentatives, clientId, setDataUser,dataUser),
            fetchTweet('GET', backendURLBase, endpoints.toGetTweets, clientId, '', setTweet),
            fetchQuestions('GET', backendURLBase, endpoints.toGetQuestions, clientId, '', setDataQuestions,setSenator),
            fetchTYM('GET', backendURLBase, endpoints.toGetThankYouMessage, clientId, '', setTypData)
          ]).then(() => {
            setLoading(false) // cambia el estado a "false" cuando todas las consultas se hayan completado
          }).catch((error) => console.error(error))
        }
        fetchData()
    },[])
    


    return(
      <>
        {/* <LoadingMainForm/> */}
      {
        loading && <LoadingMainForm/>
      }
      {
        !loading && (
          <MainForm
              setLeads={setLeads}
              leads={leads}
              setEmailData={setEmailData}
              emailData={emailData}
              dataUser={dataUser}
              setDataUser={setDataUser}
              mp={mp}
              setMp={setMp}
              senator={senator}
              setSenator={setSenator}
              clientId={clientId}
              //states={states}
              endpoints={endpoints}
              tweet={tweet}
              typData={typData}
              mainData={mainData}
              backendURLBase={backendURLBase}
              backendURLBaseServices={backendURLBaseServices}
              dataQuestions={dataQuestions}
              setDataQuestions={setDataQuestions}
              questions={questions}
              setQuestions={setQuestions}
              showQuestions={showQuestions}
              setShowQuestions={setShowQuestions}
              showQuestionsView={showQuestionsView}
              setShowQuestionsView={setShowQuestionsView}
          />

        )
      }
      
      </>
    )

}

export default Home
