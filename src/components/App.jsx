import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, removeContact, setFilter } from './redux/contactsSlice';
import { nanoid } from 'nanoid';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isExistingContact = contacts.some(
      contact =>
        contact.name &&
        contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  const handleDelete = contactId => {
    dispatch(removeContact(contactId));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
        height: '100vh',
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
