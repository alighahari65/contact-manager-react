import Navbar from './components/Navbar'
import './App.css'
import Contacts from './components/contact/Contacts';
import { useState, useEffect, useeffe } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Show from './components/contact/Show';
import EditContact from './components/contact/EditContact';
import AddContact from './components/contact/AddContact';
import axios from 'axios'
import { getAllContacts, getAllGroups } from './services/contactService';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const {data : contactsData} = await getAllContacts();
        const {data : groupsData} = await getAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false)
      }catch (er) {
        setLoading(false)
        console.log(er)

      }
    }

    fetchData();

  }, [])

  return (
    <div className="App">
      <h2>مدیریت کننده اشخاص</h2>
      <Navbar  />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts contacts= {contacts} loading={loading} />} />
        <Route path='/contacts/:contactId' element={<Show />}  />
        <Route path='/contacts/edit/:contactId' element={<EditContact />}/>
        <Route path='/contacts/add' element={<AddContact loading={loading} groups = {groups} />} />
      </Routes>
    </div>
  );
}

export default App;
