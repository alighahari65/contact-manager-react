import Navbar from './components/Navbar'
import './App.css'
import Contacts from './components/contact/Contacts';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Show from './components/contact/Show';
import EditContact from './components/contact/EditContact';
import AddContact from './components/contact/AddContact';


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <h2>مدیریت کننده اشخاص</h2>
      <Navbar  />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='/contacts' element={<Contacts contacts= {contacts} loading={loading} />} />
        <Route path='/contacts/:contactId' element={<Show />}  />
        <Route path='/contacts/edit/:contactId' element={<EditContact />}/>
        <Route path='/contacts/add' element={<AddContact />} />
      </Routes>
    </div>
  );
}

export default App;
