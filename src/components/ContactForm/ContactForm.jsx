import React, { useState } from 'react';
import ContactFormStyled from './ContactFormStyled';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contactsSlice';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    const numberInput = event.target.value;
    const numberRegex =
      /^\+?\d{0,4}?[-.\s]?\(?\d{0,3}?\)?[-.\s]?\d{0,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/;

    if (numberInput === '' || numberRegex.test(numberInput)) {
      setNumber(numberInput);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      dispatch(addContact(newContact));

      setName('');
      setNumber('');
    }
  };

  return (
    <ContactFormStyled onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Enter phone number"
        required
      />
      <button type="submit">Add contact</button>
    </ContactFormStyled>
  );
};

export default ContactForm;
