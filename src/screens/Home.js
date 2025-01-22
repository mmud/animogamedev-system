import React,{useRef,useState,useEffect} from 'react'
import { signOut } from "firebase/auth"
import {auth , db} from "../firebase-config"
import "./home.css"
import { collection} from "firebase/firestore"
import { query, where } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import programingicon from "../imges/courses/ProgrammingIcon.png"
import unityicon from "../imges/courses/UnityIcon.png"
import articon from "../imges/courses/art.png"
import _3dicon from "../imges/courses/3d.png"
import audioicon from "../imges/courses/Audio.png"
import disicon from "../imges/courses/Discussion.png"
import enginesicon from "../imges/courses/Icon.png"
import Typesbtn from '../components/typesbtn'
import { getAuth, signInAnonymously } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth"
import {  getDocs ,addDoc,updateDoc,doc} from "firebase/firestore"

export default function Home() {      
   
    let queryuser;
    let buttonsData;
    let buy=(localStorage.getItem("codetime")>new Date().getTime());

    // if(auth.currentUser == null)
    // {
    //     const user = signInWithEmailAndPassword(auth,"gusetanimo@gmail.com","123456789");

    // }
    // else{
        const userCollectionRef = collection(db,"users");
        try{
        queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
        }catch{}
       
    // }
    const [userData] = useCollectionData(queryuser,{idField:'id'});

  
    

    if(buy)
    {
        buttonsData =[
            {
                title:"Programming",
                dis:"اتعلم لغات البرمجة المستخدمة في صناعة الالعاب",
                icon:programingicon,
                link:process.env.PUBLIC_URL +"/programming",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"Game Engine",
                dis:"اتعلم محرك الالعاب و ابداء في صناعة العابك الخاصة",
                icon:enginesicon,
                link:process.env.PUBLIC_URL +"/gameengine",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"2D Art",
                dis:"اتعلم البكسل أرت و الجرافيك أرت",
                icon:articon,
                link:process.env.PUBLIC_URL+"/2dart",
                levelneed:true,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"3D Design",
                dis:"اتعلم ازاي تعمل تصميمات ثري دي للعبتك",
                icon:_3dicon,
                link:process.env.PUBLIC_URL+"/soon",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال15"
    
            },
            {
                title:"Audio",
                dis:"اتعلم ازاي تعمل مؤثرات صوتية و موسيقي للعبتك",
                icon:audioicon,
                link:process.env.PUBLIC_URL+"/soon",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"Discussion",
                dis:"لو عندك مشكلة أو حابب تناقش موضوع معين",
                icon:disicon,
                link:process.env.PUBLIC_URL+"/discussion",
                levelneed:true,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال1"
    
            }
        ];
    }
    else
    {
        buttonsData =[
            {
                title:"Programming",
                dis:"اتعلم لغات البرمجة المستخدمة في صناعة الالعاب",
                icon:programingicon,
                link:process.env.PUBLIC_URL +"/programming",
                levelneed:userData &&userData[0]&& userData[0].level>=0,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال0"
            },
            {
                title:"Game Engine",
                dis:"اتعلم محرك الالعاب و ابداء في صناعة العابك الخاصة",
                icon:enginesicon,
                link:process.env.PUBLIC_URL +"/gameengine",
                levelneed:userData &&userData[0]&& userData[0].level>=5,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال5"
    
            },
            {
                title:"2D Art",
                dis:"اتعلم البكسل أرت و الجرافيك أرت",
                icon:articon,
                link:process.env.PUBLIC_URL+"/2dart",
                levelneed:userData &&userData[0]&& userData[0].level>=10,
                levelmsg:"1سيتم فتح هذا المسار بعد تخطي المستوي ال0"
    
            },
            {
                title:"3D Design",
                dis:"اتعلم ازاي تعمل تصميمات ثري دي للعبتك",
                icon:_3dicon,
                link:process.env.PUBLIC_URL+"/soon",
                levelneed:userData &&userData[0]&& userData[0].level>=15,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال15"
    
            },
            {
                title:"Audio",
                dis:"اتعلم ازاي تعمل مؤثرات صوتية و موسيقي للعبتك",
                icon:audioicon,
                link:process.env.PUBLIC_URL+"/soon",
                levelneed:userData &&userData[0]&& userData[0].level>=20,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال20"
    
            },
            {
                title:"Discussion",
                dis:"لو عندك مشكلة أو حابب تناقش موضوع معين",
                icon:disicon,
                link:process.env.PUBLIC_URL+"/discussion",
                levelneed:userData &&userData[0]&& userData[0].level>=1,
                levelmsg:"سيتم فتح هذا المسار بعد تخطي المستوي ال1"
    
            }
        ];
    }
    
    const loadb = useRef(null)
    const loads = useRef(null)
    if(userData !=undefined)
    {
        loads.current.style.display="none";
        loadb.current.style.display="none";
    }


    return (
        <div className="pro">
            <div className="loadingback" ref={loadb}></div>
            <div className="boxLoading" ref={loads}></div>
            <div className="container">
                {buttonsData.map((m,i)=><Typesbtn key={i} title={m.title} dis={m.dis} icon={m.icon} link={m.link} levelneed={m.levelneed} levelmsg={m.levelmsg}/>)}
            </div>
        <script>alert("lol")</script>
        </div>
    )
}

/*
 <h1>profile</h1>
            <button onClick={async()=> await signOut(auth)}>logout</button>
            <img src={auth.currentUser.photoURL} alt="userphoto"/>
            <div>{auth.currentUser.email}</div>
            <div>exp:{userData && userData[0].exp}</div>
            <div>level:{userData && userData[0].level}</div>
            <div className="bar"><div className="progress" style={{width:`${(userData&&userData[0].exp/((userData&&userData[0].level+1)*1000))*100}%`}}></div></div>
*/
/*
    //نظام الزيادة
    //import {updateDoc,doc} from "firebase/firestore"

    const add =async()=>{
        let newFields;
        const userDoc = doc(db,"users",(userData[0].id));
        if((userData[0].exp+200)===((userData[0].level+1)*1000)){
        newFields = {exp:0,level: userData[0].level+1};
        }else if((userData[0].exp+200)!==((userData[0].level+1)*1000))
        {
            newFields={exp:(userData[0].exp+200)}
        }

        await updateDoc(userDoc,newFields)
    }
    */