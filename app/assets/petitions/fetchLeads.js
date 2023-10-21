import { fetchData } from "./fetchData";
const fetchLeads = (
  successResponse,
  backendURLBase,
  endpoints,
  clientId,
  dataUser,
  message
) => {
  console.log(message)
  fetchData(
    "POST",
    backendURLBase,
    endpoints.toSaveLeads,
    clientId,
    `&firstName=${
      dataUser.userName ? dataUser.userName : "N/A"
    }&postalcode=${
      dataUser.postalCode ? dataUser.postalCode : "N/A"
    }&emailData=${dataUser.emailUser ? dataUser.emailUser : "N/A"}&representative=${
      dataUser.email
    }&emailMessage=${message}&subject=${
      dataUser.subject
    }&party=${dataUser.party}&sended=${successResponse}`
  );
};
const fetchAllLeads = async (
  petitionMethod,
  backendURLBase,
  endpoint,
  clientId,
  setLeads
) => {
  const leads = await fetchData(
    petitionMethod,
    backendURLBase,
    endpoint,
    clientId
  );
  const data = leads.data;
  setLeads(data);
};

export { fetchLeads, fetchAllLeads };
