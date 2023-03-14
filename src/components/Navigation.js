import { Link } from "react-router-dom";
import {AiFillHome} from "react-icons/ai"
import {IoMdContact} from "react-icons/io"
import { AiOutlineSave } from "react-icons/ai";
import {BiTimeFive} from "react-icons/bi";
import {TiCloudStorageOutline} from "react-icons/ti"
import { AiTwotoneFile } from "react-icons/ai";
import {TbWorld} from "react-icons/tb"
import {AiOutlineBars} from "react-icons/ai"
import classes from "./Navigation.module.css"


const Navigation=()=>{
    return(
        <div className={classes.nav}>
            <div><Link title="Menu"><AiOutlineBars/></Link></div>
            <div className={classes.nav2}>
                <div><Link title="Home" to="/"><AiFillHome/></Link></div>
                <div><Link title="Contact" to="/contact"><IoMdContact/></Link></div>
                <div><Link title="Save"><AiOutlineSave/></Link></div>
                <div><Link title="History"><BiTimeFive/></Link></div>
                <div><Link title="Storage"><TiCloudStorageOutline/></Link></div>
                <div><Link title="Document"><AiTwotoneFile/></Link></div>
                <div><Link title="World Wide Web"><TbWorld/></Link></div>  
            </div>
        </div>
    )
}

export default Navigation;