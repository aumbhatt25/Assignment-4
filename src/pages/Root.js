import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import classes from './Root.module.css'

function RootLayout(){
    return(
        <div className={classes.root}>
        <main>
        <Navigation/>
        <Outlet/>
        </main>
        </div>
    )
}

export default RootLayout;