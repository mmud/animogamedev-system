import React,{useState,useEffect} from 'react'
import './../App.css'
import {auth , db} from "../firebase-config"
import "./home.css"
import { collection} from "firebase/firestore"
import { query, where } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import csharpicon from "./../imges/courses/hashtag.png"
import _2dgames from "./../imges/courses/2dGame.png"
import _3dgames from "./../imges/courses/3dGame.png"
import datastrictureicon from "./../imges/courses/administration.png"
import unityicon from "./../imges/courses/UnityIcon.png"
import cppicon from "./../imges/courses/cppicon.png"
import Unrealicon from "./../imges/courses/Unreal Engine Icon.png"
import Typesbtn from '../components/typesbtn'

export default function Gameengine() {
    const userCollectionRef = collection(db,"users");
    const queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
    const [userData] = useCollectionData(queryuser,{idField:'id'});
    let buy=(localStorage.getItem("codetime")>new Date().getTime());
    let buttonsData;

    if(buy)
    {
        buttonsData =[
            {
                title:"Unity Engine",
                dis:"اتعلم محرك يونتي و ازاي تتعامل مع بيئة المحرك",
                icon:unityicon,
                link:"/gameengine/unity",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"2D Games With Unity",
                dis:"تعلم صناعة الالعاب التو دي بأستخدام محرك يونتي",
                icon:_2dgames,
                link:"/gameengine/unity2d",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"3D Games With Unity",
                dis:"تعلم صناعة الالعاب الثري دي بأستخدام محرك يونتي",
                icon:_3dgames,
                link:"/soon",
                levelneed:true,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"Unreal Engine",
                dis:"اتعلم محرك انريل و ازاي تتعامل مع بيئة المحرك",
                icon:Unrealicon,
                link:"/soon",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال15"
    
            },
            {
                title:"2D Games With Unreal",
                dis:"تعلم صناعة الالعاب التو دي بأستخدام محرك انريل",
                icon:_2dgames,
                link:"/soon",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"3D Games With Unreal",
                dis:"تعلم صناعة الالعاب الثري دي بأستخدام محرك انريل",
                icon:_3dgames,
                link:"/soon",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            }
        ];
    }
    else
    {
        buttonsData =[
            {
                title:"C Sharp",
                dis:"اتعلم محرك يونتي و ازاي تتعامل مع بيئة المحرك",
                icon:unityicon,
                link:"/gameengine/unity",
                levelneed:userData && userData[0].level>=0,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"2D Games With Unity",
                dis:"تعلم صناعة الالعاب التو دي بأستخدام محرك يونتي",
                icon:_2dgames,
                link:"/gameengine/unity2d",
                levelneed:userData && userData[0].level>=5,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"3D Games With Unity",
                dis:"تعلم صناعة الالعاب الثري دي بأستخدام محرك يونتي",
                icon:_3dgames,
                link:"/soon",
                levelneed:userData && userData[0].level>=10,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"Unreal Engine",
                dis:"اتعلم محرك انريل و ازاي تتعامل مع بيئة المحرك",
                icon:Unrealicon,
                link:"/soon",
                levelneed:userData && userData[0].level>=0,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"2D Games With Unreal",
                dis:"تعلم صناعة الالعاب التو دي بأستخدام محرك انريل",
                icon:_2dgames,
                link:"/soon",
                levelneed:userData && userData[0].level>=20,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"3D Games With Unreal",
                dis:"تعلم صناعة الالعاب الثري دي بأستخدام محرك انريل",
                icon:_3dgames,
                link:"/discussion",
                levelneed:userData && userData[0].level>=5,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            }
        ];
    }


  return (
    <div className="container">
        <h1 className="title underline">Game Engine</h1>
        <div className="sectionscont gameenginecont">
            {buttonsData.map((m,i)=><Typesbtn key={i} title={m.title} dis={m.dis} icon={m.icon} link={m.link} levelneed={m.levelneed} levelmsg={m.levelmsg}/>)}
        </div>
    </div>
  )
}
