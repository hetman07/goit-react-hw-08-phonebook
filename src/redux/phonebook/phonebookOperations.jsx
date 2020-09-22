import axios from "axios";
import phonebookActions from "./phonebookActions";

//axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com/";

const addContact = (name, number) => dispatch => {
  dispatch(phonebookActions.addContactRequest()); //запрос на сервер
  //addContactRequest() это createAction возвращ обьект с {type: "ADD_CONTACT"}
  //и этот обьект диспатчится в Редусер
  axios
    .post("/contacts", { name, number })
    .then(response => {
      return dispatch(phonebookActions.addContactSuccess(response.data)); //в action придет обьект response.data и запишется на св-во payload
    })
    .catch(error => dispatch(phonebookActions.addContactError(error)));
};

const fetchContacts = () => dispatch => {
  dispatch(phonebookActions.fetchContactsRequest());
  axios
    .get("/contacts")
    .then(response =>
      dispatch(phonebookActions.fetchContactSuccess(response.data)),
    )
    .catch(error => dispatch(phonebookActions.fetchContactsError(error)));
};

const delContact = id => dispatch => {
  dispatch(phonebookActions.deleteContactsRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(phonebookActions.deleteContactSuccess(id)))
    .catch(error => dispatch(phonebookActions.deleteContactError(error)));
};

export default {
  addContact,
  fetchContacts,
  delContact,
};
