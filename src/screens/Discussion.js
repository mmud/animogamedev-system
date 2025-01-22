import React ,{useState, useRef,useEffect,useLayoutEffect} from 'react';
import "./Discussion.css"
import Postdis from '../components/Postdis';
import { collection } from "firebase/firestore"
import {db,auth} from "../firebase-config"
import {useCollectionData,useDocumentDataOnce  } from "react-firebase-hooks/firestore"
import { query, where,orderBy } from "firebase/firestore"
import { getDocs ,addDoc,updateDoc,doc} from "firebase/firestore"
import { limit , serverTimestamp,startAfter } from "firebase/firestore";  
import ReactQuill from 'react-quill';
import "../../node_modules/react-quill/dist/quill.snow.css"
import Comment from '../components/Comment';
import { async } from '@firebase/util';

export default function Discussion(props) {

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



    // const queryString = (query,startWithQues=true)=>{
    //     if(startWithQues) query =query.slice(1,query.length);
    //     const parsedUrls = query.split('&');
    
    //     let output =[];
    
    //     for (let url of parsedUrls){
    //         const [key,val] = url.split('=');
    //         output.push({[key]:val});
    //     }
    
    //     return output;
    // }

    // console.log(queryString())
    let notipost
        const getn=()=>{
            const search = window.location.search; 
            const params = new URLSearchParams(search);
            notipost = params.get('notipost'); 
        }
        getn();

    const userCollectionRefs = collection(db,"users");
    const queryss = query(userCollectionRefs,where("uid","==",auth.currentUser.uid));
    const [userDatas] = useCollectionData(queryss,{idField:'id'});
    /******************level***********/
    if(!buy){
        if(userDatas && userDatas[0].level <1)
        {
            window.location.href = "/";
        }
    }



    const [currentpage, setcurrentpage] = useState(0)

    const nextpagebtn = useRef(null);
    const prevpagebtn = useRef(null);

    const nextbtnclick=()=>
    {
        setcurrentpage(currentpage +1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
            
        });
    }

    const prevbtnclick=()=>
    {
        setcurrentpage(currentpage -1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
            
        });
    }

    let fdata=[];
    
    
    const webdataCollectionRef = collection(db,"fourm");
    let queryt = query(webdataCollectionRef,orderBy('createdAt'));

    [fdata] = useCollectionData(queryt,{idField:'id'});
    
    const btns=async()=>{
        try{
        if(fdata&& fdata.length>=10){
            if(nextpagebtn!==null){
                nextpagebtn.current.style.visibility="visible";
            }
        }

        if(Math.floor( fdata&& fdata.length/10)<=currentpage)
        {
            nextpagebtn.current.style.visibility="hidden";
        }

        if(currentpage>0){
            if(prevpagebtn!==null){
                prevpagebtn.current.style.visibility="visible";
            }
        }

        if(currentpage===0){
            if(prevpagebtn!=null){
                prevpagebtn.current.style.visibility="hidden";
            }
        }
    }
    catch{}
    }
    btns();
    let postesdata=[];


    const [typing, settyping] = useState(false)
    const [testdata, settestdata] = useState(false)
    const [notionce, setnotionce] = useState(false)
    const postesmake=async()=>{
        
        if(!typing){
            if(fdata&&fdata != testdata)
            settestdata( fdata&&fdata.reverse())
            if(notipost!=null && !notionce)
            {
                let nitodata= fdata&&fdata.filter((f)=>f.title == notipost );

                const userCollectionRef = collection(db,"users");            
                const userData = await getDocs(query(userCollectionRef,where("uid","==",nitodata && nitodata[0].userid)));
                const d= userData.docs.map((doc)=>({...doc.data(),id:doc.id}))
                setnotionce(true);
                Postclick(nitodata&&nitodata[0].id,d[0].photo);
            }
            
        }

        for (let i = (currentpage*10); i < (currentpage+1)*10; i++) {
            if(fdata&&fdata[i]!==undefined)
            postesdata.push(fdata&&fdata[i]);
        }
    }
    postesmake();

    const addpanal = useRef(null);
    const back = useRef(null);
    const titlein = useRef(null);
    const artin = useRef(null);
    const commentin = useRef(null);
    const post = useRef(null);

    const [title, settitle] = useState("");
    const [art, setart] = useState("");
    const [comment, setcomment] = useState("");

    const titlechange=(e)=>{
        settitle(e.target.value);
    }

    const artchange=(e)=>{
        setart(e);
    }

    const commentchange=(e)=>{
        setcomment(e);
    }

    const handladdclick = ()=>{
        addpanal.current.style.display="block";
        back.current.style.display="block";
        settyping(true);

    }

    const handlcloseaddclick = ()=>{
        addpanal.current.style.display="none";
        back.current.style.display="none";
        settyping(false);
    }


    const userCollectionRefwebdata = collection(db,"fourm");


    const sendpost=async()=>{
        if(title.trim() != ""&&art.trim() !=""&&title != " "&&art !=" "){
            handlcloseaddclick();
            await addDoc(userCollectionRefwebdata,{
                createdAt:serverTimestamp(),
                title:title,
                text:art,
                userid:auth.currentUser.uid,
                answerd:false,
                comments:[]
            })

            let user
            const userCollectionRefs = collection(db,"users");
            const queryuser = query(userCollectionRefs,where("uid","==",auth.currentUser.uid));
            const datau = await getDocs(queryuser);
            user =(datau.docs&&datau.docs.map((doc)=>({...doc.data(),id:doc.id})))

            if(user[0].mypostes==undefined)
            {
                user[0].mypostes=[{
                  text:title,
                  url:title
                }]
            }
            else
            {
              let mypostes=[];
              mypostes =[...user[0].favpost]
              mypostes.push({
                text:title,
                url:title
              });
              user[0].mypostes = [...mypostes].filter((value, index, self) =>
              index === self.findIndex((t) => (
                t.url === value.url && t.text === value.text
              ))
              )
              //user[0].favpost=;
            }
      
           
            const upddoc = doc(db,"users",user[0].id);
            const newFields=user[0];
            await updateDoc(upddoc,newFields);    
            
            settitle("");
            setart("");
            titlein.current.value="";
            artin.current.value="";
        }
    }


    const [posttitle, setposttitle] = useState("");
    const [posttext, setposttext] = useState("");
    const [postimg, setpostimg] = useState("");
    const [postcomments, setpostcomments] = useState("");
    const [currentpost, setcurrentpost] = useState([{
        userid:0
    }]);

    const Postclick= async(id,img)=>{
        let postdata=fdata.filter(p=>id===p.id);
        setcurrentpost(postdata);
        setposttitle(postdata[0].title);
        setposttext(postdata[0].text);
        setpostcomments(postdata[0].comments);
        setpostimg(img);
        post.current.style.display="block";
        back.current.style.display="block";
    }

    const closepost=()=>{
        post.current.style.display="none";
        back.current.style.display="none";
    }
    // const userCollectionRef = collection(db,"users");
    // const querys = query(userCollectionRef,where("uid","==",currentpost[0].userid));

    //const [userData] = useCollectionData(querys,{idField:'id'});

    const Commentadd=async()=>{
        if(comment !=""){
            const userDoc = doc(db,"fourm",currentpost[0].id);
            let newfield ={comments:[...currentpost[0].comments,{
                    text:comment,
                    userid:auth.currentUser.uid,
                    createdAt: new Date().getTime()
            }]};
            await updateDoc(userDoc,newfield);
            setcomment("")
            commentin.current.value="";
            const webdataCollectionRef = collection(db,"fourm");
            const queryt = query(webdataCollectionRef,orderBy('createdAt'));
            let data =await getDocs(queryt);
            let data1=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
            let data2=data1.filter(p=>currentpost[0].id===p.id);
            setpostcomments(data2[0].comments);
            setcurrentpost([{
                createdAt:currentpost[0].createdAt,
                text:currentpost[0].text,
                title:currentpost[0].title,
                userid:currentpost[0].userid,
                comments:data2[0].comments,
                id:currentpost[0].id,
                replys:[]
            }]);
            
            if(currentpost[0].userid !== auth.currentUser.uid)
            {
                const userCollectionRef = collection(db,"users");
                const queryuser = query(userCollectionRef,where("uid","==",currentpost[0].userid));
                const datau = await getDocs(queryuser);
                let user =(datau.docs.map((doc)=>({...doc.data(),id:doc.id})))
                
                if(user[0].notifications==undefined)
                {
                    user[0].notifications=[{
                        text:currentpost[0].title + " بالتعليق في " + auth.currentUser.displayName +" قام",
                        url:currentpost[0].title
                    }]
                }
                else
                {
                    user[0].notifications.push({
                        text:currentpost[0].title + " بالتعليق في " + auth.currentUser.displayName +" قام",
                        url:currentpost[0].title
                    });
                }


                const upddoc = doc(db,"users",user[0].id);
                const newFields=user[0];
                await updateDoc(upddoc,newFields);
            }
            //window.location.reload();
        }
    }    
    const loadb = useRef(null)
    const loads = useRef(null)
    if(fdata!=undefined){
            loads.current.style.display="none";
            loadb.current.style.display="none";
    }
    return( 
        <div className="container" style={{position:"relative"}}>
            <div className="loadingback" ref={loadb}></div>
        <div className="boxLoading" ref={loads}></div>
            <div className="back" ref={back}></div>
            
            <h1 className="title underline">Animo Discussion</h1>
            
            <button className="addbtn" onClick={handladdclick}>اضف سؤال</button>
            
            {postesdata && postesdata.map( p => <Postdis timeend={p.timeend} uid={p.userid} title={p.title} text={p.text} id={p.id} key={p.id} comments={p.comments} clickf={Postclick} answerd={p.answerd}/> )}
            
            <div className="addf" ref={addpanal}>
                <i className="fas fa-times" onClick={handlcloseaddclick}></i>
                
                <h1 className="title underline">اضف سؤال</h1>
                
                <label htmlFor="a1" className="addt">عنوان السؤال</label>
                <input type="text" id="a1" ref={titlein} placeholder="..." onChange={titlechange}/>

                <label htmlFor="a4" className="addt">مقال للسؤال</label>
                <ReactQuill
                    placeholder="..."
                    id="a4" ref={artin} className="bigin"
                    onChange={artchange}
                    modules={Discussion.modules}
                    formats={Discussion.foramts}
                    value={art}
                />

                <button className="submitbtn" onClick={sendpost}>ارسال</button>
            </div>

            <div className="post" ref={post}>
                <div className="q">
                    <div className="posthead">
                        <img alt="userimg" src={postimg}></img>
                        <h2>{posttitle}</h2>
                        <i className="fas fa-times" onClick={closepost}></i>
                    </div>
                    <div className="textp" dangerouslySetInnerHTML={{__html: posttext}}></div>
                    <div className="commentssec">
                        <div className="commentssechead">
                            the comments
                        </div>
                        <div className="thecomments">
                            {!currentpost[0].answerd?<label htmlFor="a2" className="addt">اضف تعليق</label>:""}
                            {!currentpost[0].answerd?<ReactQuill placeholder="..." id="a4" ref={commentin} className="bigin" onChange={commentchange} modules={Discussion.modules} formats={Discussion.foramts} value={comment}/>:""}
                            {!currentpost[0].answerd?<button className="submitbtn" onClick={Commentadd}>ارسال</button>:""}
                            {postcomments && postcomments.map((p,i)=> <Comment currentpost={currentpost} commentts={currentpost[0].comments} uid={p.userid} text={p.text} id={currentpost[0].id} key={i+"comment"} replys={p.replys}/>  )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pages">
                <button className="nextpage" ref={nextpagebtn} onClick={nextbtnclick}>الصفحة التالية</button>
                <button className="prevpage" ref={prevpagebtn} onClick={prevbtnclick}>الصفحة السابقة</button>
            </div>
        </div>
    );
}

Discussion.modules={
    toolbar:[
        [{header:"1"},{header:"2"},{header:[3,4,5,6]},{font:[]}],
        [{size:[]}],
        ["bold","italic","underline","strike","blockquote"],
        [{list:"ordered"},{list:"bullet"}],
        ["link","image"],
        ["clean"],
        ["code-block"]
    ]
};

Discussion.foramts=[
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block"
]


// Create Data
//const timestamp = firebase.firestore.FieldValue.serverTimestamp;

//db.collection('things').add({ ...myData, createdAt: timestamp() })


// Query
//db.collection('things').orderBy('createdAt').startAfter(today)

//<div dangerouslySetInnerHTML={{__html: art}}></div>
