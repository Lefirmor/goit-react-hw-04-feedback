import { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { Container, Title } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Lefirmor', number: '1212122' },
    // { id: 'id-2', name: 'Gwendoline Christie', number: '4438912' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const contactsParce = JSON.parse(contacts);
    if (contactsParce) {
      setContacts(contactsParce);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleSubmit = obj => {
    const contactsName = contacts.map(contact => contact.name);
    if (contactsName.includes(obj.name)) {
      alert(`${obj.name} is already in contacts.`);
      return;
    }
    setContacts([...contacts, obj]);
  };

  const handleDeleteItem = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onHandleSubmit={handleSubmit} />
      <Title>Contacts</Title>
      <Filter filter={filter} onHandleInputChange={handleInputChange} />
      <ContactList contacts={handleFilter()} deleteItem={handleDeleteItem} />
    </Container>
  );
};

export default App;
