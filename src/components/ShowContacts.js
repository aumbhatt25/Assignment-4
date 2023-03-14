import React, { useEffect, useRef, useState } from "react";
import { json, useLoaderData, Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import classes from './ShowContacts.module.css'
import { RiContactsBook2Fill } from "react-icons/ri";
import ContactRender from "./ContactRender";

function ShowContacts() {
    const nav = useNavigate();
    const buttonHandler = () => {
        nav('/addcontact');
    };

    const navigate=useNavigation();
    const getData = useLoaderData();
    const [list, setList] = useState(getData);
    let filteredList = [];
    const ref = useRef('');

    useEffect(() => {
        setList(getData);
    },[getData])

    const searchHandler = () => {
        filteredList = getData.filter(contact => contact.name.toLowerCase().includes(ref.current.value));

        setList(ref.current.value === '' ? getData : filteredList);
    }

    return (<div className={classes.all}>
    <div className={classes.mainShow}>
            <div className={classes.welcome}>
                <div><RiContactsBook2Fill className={classes.contactIcon}/></div>
                <div className={classes.welcomeText}>
                    <span>Contacts</span>
                    <span>Welcome to firstCRM contact page</span>
                </div>
            </div>
            <div className={classes.search}><div>
                <input type={'search'} placeholder='Search contacts' onChange={searchHandler} ref={ref} />
            </div>
                <button className={classes.addbtn} onClick={buttonHandler}>+ Add Contact</button>
            </div>
            <div className={classes.header}>
                    <p className={classes.p1}>Basic Info</p>
                    <p className={classes.p2}>Company</p>
            </div>
            <ul>
                {list.map((contact) => (
                        <Link key={contact.id} to={`${contact.id}`}>
                            <div>
                                {list.length > 0 ? <ContactRender contact={contact}/> : <li>No contacts saved</li>}
                            </div>
                        </Link>
                ))}
            </ul>
        </div>
        <div className={classes.loadDiv}>
      {navigate.state === 'loading' ? <h3 className={classes.loading}>Loading...</h3> : <Outlet />}
        </div>
        </div>
    )
}

export default ShowContacts;

export async function loader() {
    const response = await fetch('https://assignment-4-25cbc-default-rtdb.firebaseio.com/contacts.json');
    if (!response.ok) {
        throw json(
            { message: 'could not fetch data.' },
            {
                status: 500
            }
        )
    }

    const data = await response.json();

    const contactData = [];

    for (const key in data) {
        contactData.push({
            id: key,
            name: data[key].name,
            pos: data[key].pos,
            email: data[key].email,
            phone: data[key].phone,
            company: data[key].company,
            address: data[key].address
        }
        )
    }
    return contactData;
}