import axios from 'axios';
import config from './config.json'


// @desc Get All Contacts
export const getAllContacts = () => {
    const url = `${config.SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get Contact With Id
export const findContactById = (id) => {
    const url = `${config.SERVER_URL}/contacts/${id}`;
    return axios.get(url);
}

// @desc Create Contact
export const createContact = (contact) => {
    const url = `${config.SERVER_URL}/contacts`;
    return axios.post(url, contact);
}

// @desc Update Contact With Id
export const updateContact = (contact, id) => {
    const url = `${config.SERVER_URL}/contacts/${id}`;
    return axios.put(url, contact);
}

// @desc Delete Contact With Id
export const deleteContact = (id) => {
    const url = `${config.SERVER_URL}/contacts/${id}`;
    return axios.delete(url);
}

// @desc Get All Groups
export const getAllGroups = (id) => {
    const url = `${config.SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc Get Group With Id
export const findGroupById = (id) => {
    const url = `${config.SERVER_URL}/groups/${id}`;
    return axios.get(url);
}

