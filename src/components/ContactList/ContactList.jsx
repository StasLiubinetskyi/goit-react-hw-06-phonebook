import React from 'react';
import ContactListStyled from './ContactListStyled';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../redux/contactsSlice'; 
import { selectContacts, selectFilter } from '../redux/selectors'; 

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleDelete = contactId => {
    dispatch(removeContact(contactId));
  };

  return (
    <ContactListStyled>
      <ul>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name, number }) => (
            <li key={id}>
              {name}: {number}
              <button type="button" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </ContactListStyled>
  );
};

export default ContactList;
