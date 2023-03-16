import classes from './ContactRender.module.css'

function ContactRender(props) {
    const twoLetter = props.contact.name.split(' ');
    const firstLetter = twoLetter[0].slice(0, 1).toUpperCase();
    let profileWord = firstLetter;
    if (twoLetter.length > 1) {
        const secondLetter = twoLetter[1].slice(0, 1).toUpperCase();
        profileWord = firstLetter.concat(secondLetter);
    }
    return (
        <>
            <div className={classes.main}>
                <div className={classes.circleDiv}>
                    <p>
                        <span className={classes.circle}>
                            <span>{profileWord}</span>
                        </span>
                    </p>
                </div>
                <div className={classes.name}>
                    <div>{props.contact.name}</div>
                    <div>{props.contact.email}</div>
                </div>
                <p className={classes.company}>{props.contact.company}</p>
            </div>
        </>
    );
}

export default ContactRender;