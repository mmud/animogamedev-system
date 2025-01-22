import React,{useRef} from 'react'
import "./login.css"
import { GoogleAuthProvider , signInWithPopup,signInWithRedirect, socialMediaAuth,GithubAuthProvider } from "firebase/auth";
import { auth } from "../firebase-config";
import leftimg from "../imges/MainPhoto.png"
import wavel from "../imges/LeftDowneffect.png"
import waver from "../imges/RightUpEffect.png"
import {db} from "../firebase-config"
import { collection , getDocs ,addDoc,updateDoc,doc} from "firebase/firestore"
import { query, where } from "firebase/firestore";  
import GoogleButton from 'react-google-button'
import { signOut } from "firebase/auth"
import Swal from "sweetalert2";  



export default function Login() {
    //google login
    const sgininclick=async()=>{
        //google
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).catch(res=>{
            if(res=="FirebaseError: Firebase: Error (auth/account-exists-with-different-credential)."){
                Swal.fire({
                    icon: 'error',
                    title: 'تم تسجيل الدخول مسبقاً بهذا الأيميل عن طريق جيت هب',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
        //firebase check
        let user;
        const userCollectionRef = collection(db,"users");
        const userCollectionRefwebdata = collection(db,"userdata");
        const queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
        const data = await getDocs(queryuser);
        const webdata = await getDocs(userCollectionRefwebdata);
        user =(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        let webdatad=(webdata.docs.map((doc)=>({...doc.data(),id:doc.id})))
        if(user.length === 0)
        {
            await addDoc(userCollectionRef,{email:auth.currentUser.email,
                                            name:auth.currentUser.displayName,
                                            uid:auth.currentUser.uid,
                                            photo:auth.currentUser.photoURL,
                                            exp:0,
                                            level:0,
                                            csharp:{0:false},
                                            csharpq:{0:0},
                                            csharpxp:{0:0},
                                            unity:{0:false},
                                            unityq:{0:0},
                                            unityxp:{0:0},
                                            codetime:0,
                                            notifications:[],
                                            badgesnotifications:[],
                                            favpost:[],
                                            mypostes:[],
                                            badges:[false,false,false,false,false,false,false,false],
                                            tag:""
                                        });
            const userDoc = doc(db,"userdata",webdatad[1].id);
            let x= (webdatad[1].data+1);
            const newFields = {data:x};
            await updateDoc(userDoc,newFields);
        }
        localStorage.setItem("loged",true);
        window.location.reload();
    }
    //facebook login
    const facein= async()=>{
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider).catch(res=>{
            if(res=="FirebaseError: Firebase: Error (auth/account-exists-with-different-credential)."){
                Swal.fire({
                    icon: 'error',
                    title: 'تم تسجيل الدخول مسبقاً بهذا الأيميل عن طريق جوجل',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        });
        //firebase
        let user;
        const userCollectionRef = collection(db,"users");
        const userCollectionRefwebdata = collection(db,"userdata");
        //signOut(auth);
        let queryuser;
        try{
        queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
        }
        catch{}
        const data = await getDocs(queryuser);
        const webdata = await getDocs(userCollectionRefwebdata);
        user =(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        let webdatad=(webdata.docs.map((doc)=>({...doc.data(),id:doc.id})))
        if(user.length === 0)
        {
            await addDoc(userCollectionRef,{email:auth.currentUser.email,
                                            name:auth.currentUser.displayName!=null?auth.currentUser.displayName:auth.currentUser.email,
                                            uid:auth.currentUser.uid,
                                            photo:auth.currentUser.photoURL,
                                            exp:0,
                                            level:0,
                                            csharp:{0:false},
                                            csharpq:{0:0},
                                            csharpxp:{0:0},
                                            unity:{0:false},
                                            unityq:{0:0},
                                            unityxp:{0:0},
                                            codetime:0,
                                            notifications:[],
                                            badgesnotifications:[],
                                            favpost:[],
                                            mypostes:[],
                                            badges:[false,false,false,false,false,false,false,false],
                                            tag:""
                                        });
            const userDoc = doc(db,"userdata",webdatad[1].id);
            let x= (webdatad[1].data+1);
            const newFields = {data:x};
            await updateDoc(userDoc,newFields);
        }
        localStorage.setItem("codetime",user[0].codetime);
        localStorage.setItem("loged",true);
        window.location.reload();
    }

    const loadb = useRef(null)
    const loads = useRef(null)
    setTimeout(async() => {
        try{
        loads.current.style.display="none";
        loadb.current.style.display="none";
        }
        catch{}
    }, 1000);

    const users = useRef("")

    const getd=async()=>{
        let webdatad;
        const userCollectionRefwebdata = collection(db,"userdata");
        const webdata =await getDocs(userCollectionRefwebdata);
        webdatad=(webdata.docs&&webdata.docs.map((doc)=>({...doc.data(),id:doc.id})));
        try{
        users.current.innerText=`${webdatad[1].data} Students`
        }
        catch{}
    }
    getd();

    return (
        <>
        <div className="loadingback" ref={loadb}></div>
        <div className="boxLoading" ref={loads}></div>
        <img src={wavel} alt="wave left" className="wavel"></img>
        <img src={waver} alt="wave right" className="waver"></img>

        <div className="loginp">
            <img src={leftimg} alt="left img"></img>
                <div className="theform">
                <h1>!مرحبا</h1>
                <h2>بك في منصة انيمو طريقك لدخول عالم صناعة الالعاب</h2>
                <p>سجل الدخول بحسابك</p>
                {/* <button onClick={sgininclick} className="google-btn"><i className="fab fa-google"></i> جوجل</button> */}
                <GoogleButton
                type="light" // can be light or dark
                onClick={sgininclick} 
                className="google-btn button"
                />
                <button onClick={facein} className="face-btn"><i className="fab fa-github"></i>Sign in with Github</button>
                <div ref={users} className="learners"></div>
            </div>
        </div>
        </>
    )
}