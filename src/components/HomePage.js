import { useNavigation } from 'react-router-dom';
import classes from './HomePage.module.css'

function HomePage(){
    const nav=useNavigation();
    return(
        <div className={classes.div}>
            <h4>Home Page</h4>
            <h1>Welcome to Contacts</h1>
            {nav.state==="loading" && <div className={classes.loading}>Loading...</div>}
        </div>
    )
}

export default HomePage;