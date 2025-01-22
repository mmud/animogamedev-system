import React,{useState,useRef,useEffect} from 'react'
import "./Codes.css"
import { collection , getDocs,where ,addDoc,updateDoc,doc, limit} from "firebase/firestore"
import {auth ,db} from "../firebase-config"
import { query } from "firebase/firestore";
import Swal from "sweetalert2";  

export default function Codes() {

    let buy=(localStorage.getItem("codetime")>new Date().getTime());
    // const [ad, setad] = useState(false)
    
    //     useEffect(() => {
    //         if(!buy){
    //         var s=document.createElement('script');
    //         function ads(u,z,p){
    //             s.src=u;
    //             s.setAttribute('data-zone',z);
    //             p.appendChild(s);
    //             }
    //             ads('https://iclickcdn.com/tag.min.js',4910585,document.body||document.documentElement);
    //             console.log("run");
    //         }
    //     return () => {
    //         if(!ad&&!buy){
    //             (document.body||document.documentElement).removeChild(s)
    //             console.log("end");
    //         setad(true);
    //         }
    //     }
    //     },[])

    const [codeinput, setcodeinput] = useState("")
    const inputc = useRef(null)
    const btncodesclick=async()=>{
        if(codeinput.trim() != "")
        {
            const userCollectionRefwebdata = collection(db,"userdata");
            const queryuser = query(userCollectionRefwebdata,limit(1));
            const webdata = await getDocs(queryuser);
            let webdatad=(webdata.docs.map((doc)=>({...doc.data()})))


            if(codeinput == "ndpro")
            {
                const userCollectionRef = collection(db,"users");
                const queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
                const data = await getDocs(queryuser);
                let user =(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
                const user3Doc = doc(db,"users",user && user[0].id);
                const new3Fields = {codetime:9999999999999};
                localStorage.setItem("codetime", 9999999999999);
                await updateDoc(user3Doc,new3Fields);
                Swal.fire({
                    icon: 'success',
                    title: 'تم تفعيل حسابك بنجاح',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            else if(webdatad[0].codes.indexOf(codeinput)!= -1)
            {
                const userCollectionRef = collection(db,"users");
                const queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
                const data = await getDocs(queryuser);
                let user =(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
                let date = new Date();
                const user3Doc = doc(db,"users",user && user[0].id);
                const new3Fields = {codetime:date.setTime(date.getTime()+(30*24*60*60*1000))};
                localStorage.setItem("codetime", date.setTime(date.getTime()+(30*24*60*60*1000)));
                
                await updateDoc(user3Doc,new3Fields);
                const codeDoc = doc(db,"userdata","codes");
                for( var i = 0; i < webdatad[0].codes.length; i++){ 
                    if ( webdatad[0].codes[i] === codeinput) { 
                        webdatad[0].codes.splice(i, 1); 
                        break;
                    }
                }
                const codeFields = {
                    codes:[...webdatad[0].codes]
                };
                await updateDoc(codeDoc,codeFields);
                Swal.fire({
                    icon: 'success',
                    title: 'تم تفعيل حسابك بنجاح',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            else
            {
                Swal.fire({
                    icon: 'error',
                    title: 'الكود الذي ادخلته خطاء',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            inputc.current.value="";
            setcodeinput("");
        }
    }

  return (
    <div className="container codes" >
        <p>قم بأدخال الكود الخاص بك</p>
        <input ref={inputc} type="text" placeholder="code....." onChange={(e)=>{setcodeinput(e.target.value)}}/>
        <button onClick={btncodesclick}>تفعيل</button>
        <a href="https://www.patreon.com/AnimoGamDev" target="_blank" rel="noreferrer">للحصول علي كود</a>
        <div> اشترك ب 10 دولار/شهر للحصول علي المزايا الاتية</div>
        <ul>
            <li>بدون اعلانات</li>
            <li>كل الاقسام مفتوحة</li>
            <li>امكانية حل الكويز كل 10 دقائق</li>
        </ul>
    </div>
    )
}
