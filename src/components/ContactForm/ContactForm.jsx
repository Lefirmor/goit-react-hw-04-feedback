import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { Button, Input, Form, Label } from './ContactForm.styled';

const ContactForm = ({ onHandleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputChange = ({ target: { name, value } }) => {
    if (name === 'userName') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    } else {
      throw new Error('Something is wrong');
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const nameId = nanoid();

    const userContacts = {
      id: nameId,
      name,
      number,
    };

    clearData();

    onHandleSubmit(userContacts);
  };

  const clearData = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form action="" onSubmit={onFormSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="userName"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={inputChange}
          />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={inputChange}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};
