import React from "react"
import { Form, redirect, useRouteLoaderData, useActionData } from "react-router-dom";
import classes from './AddContact.module.css'

function AddContact({ method = 'POST' }) {
    const editData = useRouteLoaderData('detail');
    const errorData = useActionData();

    return (
        <Form method={method} action={method === 'PATCH' ? '' : '/addcontact'}>
            <div className={classes.form}>
                {method === 'PATCH' ? <label>Edit Contact</label> : <label>Add New Contact</label>}
                <label>Name</label>
                <label htmlFor="name" className={errorData && errorData.nameError && classes.labelError}></label>
                <input id='name' name="name" className={
                    errorData && errorData.nameError && classes.inputError
                } defaultValue={editData ? editData.name : ''}></input>
                {errorData && (
                    <>
                        <p>{errorData.nameError}</p>
                    </>
                )}
                <br />
                <label>Position</label>
                <input id='pos' name="pos" defaultValue={editData ? editData.pos : ''}></input>
                <br />
                <label>Email</label>
                <input id='email' name="email" className={
                    errorData && errorData.emailError && classes.inputError
                } defaultValue={editData ? editData.email : ''}></input>
                {errorData && (
                    <>
                        <p>{errorData.emailError}</p>
                    </>
                )}
                <br />
                <label>Phone</label>
                <input id='phone' name="phone" className={
                    errorData && errorData.phoneError && classes.inputError
                } defaultValue={editData ? editData.phone : ''}></input>
                {errorData && (
                    <>
                        <p>{errorData.phoneError}</p>
                    </>
                )}
                <br />
                <label>Company</label>
                <input id='company' name="company" defaultValue={editData ? editData.company : ''}></input>
                <br />
                <label>Address</label>
                <input id='address' name="address" defaultValue={editData ? editData.address : ''}></input>
                <br />
                <button className={classes.submit}>Submit</button>
            </div>
        </Form>
    )
}

export default AddContact;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const contactData = {
        name: data.get('name').trim(),
        pos: data.get("pos").trim(),
        email: data.get("email").trim(),
        phone: data.get("phone").trim(),
        company: data.get("company").trim(),
        address: data.get("address").trim(),
        id: new Date().toISOString()
    };

    const error = {};
    if (contactData.name === "") {
        error.nameError = "Please Enter Person Name";
    }
    if (
        contactData.email === "" ||
        !contactData.email.includes("@") ||
        !contactData.email.includes(".")
    ) {
        error.emailError = "Please Enter Valid Email Address";
    }
    if (
        contactData.phone === "" ||
        contactData.phone.length > 11 ||
        contactData.phone.length < 10 || isNaN(contactData.phone)
    ) {
        error.phoneError = "Please Enter 10 Digit Number";
    }
    if (contactData.address === "") {
        contactData.address = "No Information Provided";
    }
    if (contactData.company === "") {
        contactData.company = "No Information Provided";
    }
    if (Object.keys(error).length > 0) {
        return error;
    }

    if (method === 'PATCH') {
        const response = await fetch(`https://assignment-4-25cbc-default-rtdb.firebaseio.com/contacts/${params.contactId}.json`, {
            method: method,
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'Application/json'
            }
        })

    } else {
        const response = await fetch('https://assignment-4-25cbc-default-rtdb.firebaseio.com/contacts.json', {
            method: method,
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
    }

    return redirect('/contact');
}