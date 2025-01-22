import React from 'react'
import "./videol.css"

export default function Videot(props) {
    let state;
    if(props.status ==="f")
    {
        state = "";
    }else if(props.status ==="t")
    {
        state = "active";
    }else if(props.status ==="u")
    {
        state = "locked";
    }

    
    return (
        <div className={`videol ${state}`} keyt={props.keyt}>
            <div className="right">
                <div className="isdone"></div>
                <p>{props.title}</p>
            </div>
            <button>Quiz</button>
        </div>
    )
}
