import React from 'react'
import number1 from "../imges/ranks/medal1.png"
import number2 from "../imges/ranks/medal2.png"
import number3 from "../imges/ranks/medal3.png"

export default function Ranksu(props) {
    if(props.number==0)
    {
        return (
            <div className="ranksu">
                <div className="markz">
                    <img src={number1} className="rankimg"/>
                </div>
                <div className="userdetails">
                    <img src={props.img} />
                    <div className="details">
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="level">
                            level:{props.level}
                        </div>
                    </div>
                </div>
            </div>
          )
    } 
    else if(props.number==1)
    {
        return (
            <div className="ranksu">
                <div className="markz">
                <img src={number2} className="rankimg"/>
                </div>
                <div className="userdetails">
                    <img src={props.img} />
                    <div className="details">
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="level">
                            level:{props.level}
                        </div>
                    </div>
                </div>
            </div>
          )
    }
    else if(props.number==2)
    {
        return (
            <div className="ranksu">
                <div className="markz">
                <img src={number3} className="rankimg"/>
                </div>
                <div className="userdetails">
                    <img src={props.img} />
                    <div className="details">
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="level">
                            level:{props.level}
                        </div>
                    </div>
                </div>
            </div>
          )
    }
    else{
        return (
            <div className="ranksu">
                <div className="markz">
                    {props.number+1}
                </div>
                <div className="userdetails">
                    <img src={props.img} />
                    <div className="details">
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="level">
                            level:{props.level}
                        </div>
                    </div>
                </div>
            </div>
          )
    }
}
