import React,{useState,useEffect} from 'react'
import Ranksu from '../components/ranksu'
import "./ranks.css"
import {db,auth} from "../firebase-config"
import { collection, limitToLast } from "firebase/firestore"
import { query, where,updateDoc,doc,orderBy,limit } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"

export default function Ranks() {
    const userCollectionRef = collection(db,"users");
    const queryuser = query(userCollectionRef,where("codetime","!=",9999999999999));
    const [data] = useCollectionData(queryuser,{idField:'id'});
    const udata= data&&data.reverse();
    let indexu;
    let usingdata = udata;
    usingdata&&usingdata.sort((a, b) => b.level - a.level);
    usingdata=usingdata&&usingdata.slice(0,10);
    console.log(usingdata);
    // udata&&udata.forEach(element => {
    // console.log(element)

    //     if(!element.codetime === "9999999999999")
    //     {
    //         setusingdata([...usingdata, element]);
    //     }
    // });

    console.log(localStorage.getItem("codetime"));
    
    
    indexu =(udata&&udata.findIndex((o, i) => {
        if (o.uid === auth.currentUser.uid) {
            if(i==0)
            return 1;
            else
            return i; // stop searching
        }
    })+1)
    
    if(indexu==0)
    {
        indexu="لا يوجد";
    }

    return (
        <div className="container">
            <div className="rank">
                <div className="head">
                    تصنيفك:<span>{indexu}</span>
                </div>
                <div className="body">
                    {usingdata&&usingdata.map((p,i)=><Ranksu key={i} name={p.name} level={p.level} img={p.photo} number={i}/>)}
                </div>
            </div>
        </div>
    )
}
