import { createAction } from "@reduxjs/toolkit";

//созд 3 actions для 1-ой операции
//request, suсcess, error
//который возвращает обьект {type: '....', payload: '.....'}

const addContactRequest = createAction("ADD_CONTACT_REQUEST");
const addContactSuccess = createAction("ADD_CONTACT_SUCCESS");
const addContactError = createAction("ADD_CONTACT_ERROR");

const fetchContactsRequest = createAction("FETCH_CONTACT_REQUEST");
const fetchContactSuccess = createAction("FETCH_CONTACT_SUCCESS");
const fetchContactsError = createAction("FETCH_CONTACT_ERROR");

const deleteContactsRequest = createAction("DEL_CONTACT_REQUEST");
const deleteContactSuccess = createAction("DEL_CONTACT_SUCCESS");
const deleteContactsError = createAction("DEL_CONTACT_ERROR");

const changeFilter = createAction("UPD_FILTER");

export default {
  addContactRequest,
  addContactSuccess,
  addContactError,

  fetchContactsRequest,
  fetchContactSuccess,
  fetchContactsError,

  deleteContactsRequest,
  deleteContactSuccess,
  deleteContactsError,

  changeFilter,
};
