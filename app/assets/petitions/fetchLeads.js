import { fetchData } from "./fetchData";
const fetchLeads = (
  successResponse,
  backendURLBase,
  endpoints,
  clientId,
  dataUser,
  questions
) => {
  fetchData(
    "POST",
    backendURLBase,
    endpoints.toSaveLeads,
    clientId,
    `&firstName=${dataUser.userName ? dataUser.userName : dataUser.emailUser}&postalcode=${
      dataUser.postalCode ? dataUser.postalCode : "N/A"
    }&emailData=${dataUser.emailUser}&representative=${
      dataUser.email
    }&emailMessage=${JSON.stringify(questions)}&sended=${successResponse}`
  );
};

const fetchAllLeads = async (petitionMethod,backendURLBase, endpoint, clientId, setLeads) => {
  const  leads = await fetchData(petitionMethod, backendURLBase, endpoint, clientId)
   const data = leads.data
   setLeads(data)
}

export {
   fetchLeads, fetchAllLeads
}