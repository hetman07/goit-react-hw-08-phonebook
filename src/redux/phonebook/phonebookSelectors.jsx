import { createSelector } from "@reduxjs/toolkit";

const getLoading = state => state.contacts.loading;

const getItems = state => state.contacts.items;

const getFilter = state => state.contacts.filter;

const getError = state => state.contacts.error;
const getErrorMsg = state => state.contacts.error_message;

//сложный селектор - это селектор к-рый исп. простой селектор+возвращает производные данные
// const getVisibleContacts = state => {
//   const items = getItems(state);
//   const filter = getFilter(state).toLowerCase();

//   return items.filter(contact => contact.name.toLowerCase().includes(filter));
// };

//сложный селектор с исп мемоизации с reduxjs/toolkit
const getVisibleContacts = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);

const getContactId = createSelector(
  [(state, contId) => contId, getItems],
  (contId, items) => items.find(item => item.id === contId),
);

export default {
  getLoading,
  getItems,
  getFilter,
  getError,
  getErrorMsg,
  getVisibleContacts,
  getContactId,
};
