import React from 'react'
import "./videol.css"

export default function Videol(props) {
    let state;
    if(props.status ==="f")
    {
        state = "";
    }else if(props.status ==="f" && props.keyt === 0)
    {
        state = "current";
    }
    else if(props.status ==="t" && props.keyt === 0)
    {
        state = "active current";
    }
    else if(props.status ==="t")
    {
        state = "active";
    }else if(props.status ==="u")
    {
        state = "locked";
    }

    
    return (
        <div className={`videol ${state}`} keyt={props.keyt} onClick={()=>props.handleclick(props.keyt)}>
            <div className="right">
                <div className="isdone"></div>
                <p>{props.title}</p>
            </div>
            <button onClick={()=>props.quizclick(props.keyt)}>Quiz</button>
        </div>
    )
}
