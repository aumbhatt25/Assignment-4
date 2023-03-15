import { useState } from "react";
import { json, useNavigation, useLoaderData, Link, Outlet } from "react-router-dom";
import classes from './ContactDetail.module.css'

function ContactDetail() {
    const details = useLoaderData();

    const twoLetter = details.name.split(" ")
    const firstLetter = twoLetter[0].slice(0, 1).toUpperCase();
    let profileWord = firstLetter
    if (twoLetter.length > 1) {
        const secondLetter = twoLetter[1].slice(0, 1).toUpperCase();
        profileWord = firstLetter.concat(secondLetter)
    }

    return (
        <div>
      <div className={classes.showDetails}>
        <><div className={classes.circleDiv}>
          <p><span className={classes.circle}><span>{profileWord}</span></span></p>
          <p className={classes.nameShow}>{details.name}</p>
          {details.pos && details.company && <p className={classes.showPosition}>{details.pos} at {details.company}</p>}
        </div>
        <div className={classes.name}>
          <div className={classes.col1}>Name:</div>
          <div className={classes.col}>{details.name}</div>
        </div>
        <div className={classes.email}>
          <div className={classes.col1}>Email:</div>
          <div className={classes.col}>{details.email}</div>
        </div>
        <div className={classes.phone}>
          <div className={classes.col1}>Phone:</div>
          <div className={classes.col}>{details.phone}</div>
        </div>
        <div className={classes.company}>
          <div className={classes.col1}>Company:</div>
          <div className={classes.col}>{details.company}</div>
        </div>
        <div className={classes.address}>
          <div className={classes.col1}>Address:</div>
          <div className={classes.col}>{details.address}</div>
        </div>
        <div className={classes.col}>
        <Link to={`edit`}><div className={classes.coledit}>Edit</div></Link>
        </div></>
        <Outlet/>
      </div>
    </div>
    )
}

export default ContactDetail;

export async function loader({ params }) {
    const response = await fetch(`https://assignment-4-25cbc-default-rtdb.firebaseio.com/contacts/${params.contactId}.json`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw json(
            { message: 'could not fetch details.' },
            {
                status: 500
            }
        )
    }
    const data = await response.json();

    const detailsArr = {
        name: data.name,
        pos: data.pos,
        phone: data.phone,
        email: data.email,
        company: data.company,
        address: data.address,
        id: data.id
    }
    return detailsArr;
}