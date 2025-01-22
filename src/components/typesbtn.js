import React from 'react'
import "./typesbtn.css"
import { Link } from "react-router-dom";

export default  function Typesbtn(props) {
    let statee;

    if((props.levelneed))
    {
        statee="active";
        return (
            <div className="alink">
            <Link to={props.link} className={statee}>
            <div className="type">
                <img src={props.icon} alt={props.title} />
                <div className="text">
                    <h2>{props.title}</h2>
                    <p>{props.dis}</p>
                </div>
            </div>
            </Link>
            </div>
        )
    }
    else
    {
        statee="notactive";
        return (
            <div className="alink">
            <Link to="/" className={statee}>
            <div className="type">
                <img src={props.icon} alt={props.title} />
                <div className="text">
                    <h2>{props.title}</h2>
                    <p>{props.dis}</p>
                </div>
                <div className="msg">
                    {props.levelmsg}
                </div>
            </div>
            </Link>
            </div>
        )
    }
    
}
