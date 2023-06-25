import Navbar from './components/Navbar'
import './App.css'
import Contacts from './components/contact/Contacts';
import { useState, useEffect, useeffe } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import Show from './components/contact/Show';
import EditContact from './components/contact/EditContact';
import AddContact from './components/contact/AddContact';
import axios from 'axios'
import { getAllContacts, getAllGroups, deleteContact } from './services/contactService';
import { confirmAlert } from 'react-confirm-alert';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serachContact, setSearchContact] = useSearchParams();

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
  }, []);

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>مدیریت کننده اشخاص</h2>
      <Navbar setSearch = {setSearchContact}  />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts confirmDelete={confirm} contacts= {contacts} loading={loading} search={serachContact} />} />
        <Route path='/contacts/:contactId' element={<Show />}  />
        <Route path='/contacts/edit/:contactId' element={<EditContact />}/>
        <Route path='/contacts/add' element={<AddContact loading={loading} groups = {groups} />} />
      </Routes>
    </div>
  );
}

export default App;
