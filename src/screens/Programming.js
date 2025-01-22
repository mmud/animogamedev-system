import React,{useState,useEffect} from 'react'
import './../App.css'
import {auth , db} from "../firebase-config"
import "./home.css"
import { collection} from "firebase/firestore"
import { query, where } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import csharpicon from "./../imges/courses/hashtag.png"
import datastrictureicon from "./../imges/courses/administration.png"
import unityicon from "./../imges/courses/UnityIcon.png"
import cppicon from "./../imges/courses/cppicon.png"
import Unrealicon from "./../imges/courses/Unreal Engine Icon.png"
import Typesbtn from '../components/typesbtn'

export default function Programming() {
    const userCollectionRef = collection(db,"users");
    let queryuser;
    try{
    queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
    }
    catch{}
    const [userData] = useCollectionData(queryuser,{idField:'id'});
    let buy=(localStorage.getItem("codetime")>new Date().getTime());
    let buttonsData;

    const userCollectionRefopen = collection(db,"opens_sec");
    const queryuser2 = query(userCollectionRefopen,where("openid","==","programming"));
    const [userDataopen] = useCollectionData(queryuser2);
    
    //console.log(userDataopen&&userDataopen[0].csharp)
    if(buy)
    {
        buttonsData =[
            {
                title:"C Sharp",
                dis:"تعلم أساسيات السي شارب",
                icon:csharpicon,
                link:"/programming/csharp",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"Data Structure",
                dis:"تعلم هياكل البيانات في السي شارب",
                icon:datastrictureicon,
                link:"/programming/csharpdata",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"C# Unity",
                dis:"تعلم السي شارب داخل محرك يونتي",
                icon:unityicon,
                link:"/programming/csharpunity",
                levelneed:true,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"C Plus Plus",
                dis:"تعلم أساسيات السي بلس بلس",
                icon:cppicon,
                link:"/programming/cplusplus",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال15"
    
            },
            {
                title:"Data Structure",
                dis:"تعلم هياكل البيانات في السي بلس بلس",
                icon:datastrictureicon,
                link:"/programming/cplusplusdata",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"C++ Unreal",
                dis:"تعلم السي بلس بلس داخل محرك أنريل",
                icon:Unrealicon,
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
                dis:"تعلم أساسيات السي شارب",
                icon:csharpicon,
                link:"/programming/csharp",
                levelneed:userData && userData[0].level>=0,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"Data Structure",
                dis:"تعلم هياكل البيانات في السي شارب",
                icon:datastrictureicon,
                link:"/programming/csharpdata",
                levelneed:userData && userData[0].level>=5,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"C# Unity",
                dis:"تعلم السي شارب داخل محرك يونتي",
                icon:unityicon,
                link:"/programming/csharpunity",
                levelneed:userData && userData[0].level>=10,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"C Plus Plus",
                dis:"تعلم أساسيات السي بلس بلس",
                icon:cppicon,
                link:"/programming/cplusplus",
                levelneed:userData && userData[0].level>=0,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"Data Structure",
                dis:"تعلم هياكل البيانات في السي بلس بلس",
                icon:datastrictureicon,
                link:"/programming/cplusplusdata",
                levelneed:userData && userData[0].level>=20,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"C++ Unreal",
                dis:"تعلم السي بلس بلس داخل محرك أنريل",
                icon:Unrealicon,
                link:"/discussion",
                levelneed:userData && userData[0].level>=5,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            }
        ];
    }


  return (
    <div className="container">
        <h1 className="title underline">Programming</h1>
        <div className="sectionscont">
            {buttonsData.map((m,i)=><Typesbtn key={i} title={m.title} dis={m.dis} icon={m.icon} link={m.link} levelneed={m.levelneed} levelmsg={m.levelmsg}/>)}
        </div>
    </div>
  )
}
