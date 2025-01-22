import React,{useRef,useState} from 'react';
import { collection,deleteDoc,getDocs , doc} from "firebase/firestore"
import { query, where,updateDoc } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import {auth , db} from "../firebase-config"
import ReactQuill from 'react-quill';
import Reply from './Reply.js';
import Swal from "sweetalert2";  

export default function Comment(props) {
    const userCollectionRef = collection(db,"users");
    const querys = query(userCollectionRef,where("uid","==",props.uid));

    const [userData] = useCollectionData(querys,{idField:'id'});

    const deletepost=()=>{
      Swal.fire({
        title: 'هل تريد حذف الرسالة؟',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم ',
        cancelButtonText:"لا"
      }).then((result) => {
        if (result.isConfirmed) {
          const userDoc = doc(db,"fourm",props.id);
          let c=props.commentts;
          for( var i = 0; i < c.length; i++){ 
            if ( c[i].text === props.text) { 
              c.splice(i, 1); 
              break;
                i--; 
            }
          }
          let newfield ={comments:c}
          updateDoc(userDoc,newfield);
        }
      })



    }

    //if()

    const anpost=async()=>{
      const userDoc = doc(db,"fourm",props.id);
      props.currentpost[0].answerd=true;
      let date = new Date();
      props.currentpost[0].timeend=date.setTime(date.getTime()+(7*24*60*60*1000));
      let newfield =props.currentpost[0];
      await updateDoc(userDoc,newfield);
      let newFields;
      const userDoc2 = doc(db,"users",(userData[0].id));
      newFields={exp:(userData[0].exp+200)}
      await updateDoc(userDoc2,newFields);

    }
    let buy=(localStorage.getItem("codetime")==9999999999999);

    
    const commentin = useRef(null);
    const commentbtn = useRef(null);
    const updatec = useRef(null);
    
    const [comment, setcomment] = useState(props.text);

    const commentchange=(e)=>{
      setcomment(e);
    }

    const [upopen, setupopen] = useState(false)
    const editcomment=()=>{
      if(upopen)
      updatec.current.style.display="none";
      else
      updatec.current.style.display="block";

      setupopen(!upopen);
    }

    const updatecomment=async()=>{
      const userDoc = doc(db,"fourm",props.id);
      let c=props.commentts;
      for( var i = 0; i < c.length; i++){ 
        if ( c[i].text === props.text) { 
          c[i].text = comment;
          break;
            i--; 
        }
      }
      let newfield ={comments:c}
      editcomment();
      await updateDoc(userDoc,newfield);
      //const newFields = ;
      //await updateDoc(userDoc,newFields)
    }



    const replydiv = useRef(null);

    const replyin = useRef(null);
    const replybtnref = useRef(null);
    const [reply, setreply] = useState("");
    
    const replychange=(e)=>{
      setreply(e);
    }

    const [upopenr, setupopenr] = useState(false)
    const replybtn=()=>{
      if(upopenr)
      replydiv.current.style.display="none";
      else
      replydiv.current.style.display="block";

      setupopenr(!upopenr);
    }


    const addreply=async()=>{
      const userDoc = doc(db,"fourm",props.id);
      let c=props.commentts;
      for( var i = 0; i < c.length; i++){ 
        if ( c[i].text === props.text) { 
          let x={
            text:reply,
            userid:auth.currentUser.uid
          }
          if(c[i].replys==undefined)
          {
            c[i].replys=[x];
          }
          else{
            c[i].replys=[
              ...c[i].replys,
              x
            ]
          }
          break;
            i--; 
        }
      }
      let newfield ={comments:c}
      replybtn();
      await updateDoc(userDoc,newfield);
      setreply("");
      if(props.uid !== auth.currentUser.uid)
            {
                const userCollectionRef = collection(db,"users");
                const queryuser = query(userCollectionRef,where("uid","==",props.uid));
                const datau = await getDocs(queryuser);
                let user =(datau.docs.map((doc)=>({...doc.data(),id:doc.id})))
                
                if(user[0].notifications==undefined)
                {
                    user[0].notifications=[{
                      text:props.currentpost[0].title + " بالرد علي التعليق في " + auth.currentUser.displayName +" قام",
                      url:props.currentpost[0].title
                    }]
                }
                else
                {
                    user[0].notifications.push({
                      text:props.currentpost[0].title + " بالرد علي التعليق في " + auth.currentUser.displayName +" قام",
                      url:props.currentpost[0].title
                    });
                }

                
                const upddoc = doc(db,"users",user[0].id);
                const newFields=user[0];
                await updateDoc(upddoc,newFields);
            }
      //const newFields = ;
      //await updateDoc(userDoc,newFields)
    }
  

    if(props.uid !==undefined && auth.currentUser.uid !== undefined)
    {
      if(props.uid===auth.currentUser.uid||buy){
        return (
          <div className="commentcontent">
            <div className="comment">
              <div className="commentbody">
                <div className="user">
                <img src={userData && userData[0].photo} alt="userimg" />
                <p>{userData && userData[0].name}</p>
                </div>
                <div className="body">
                  <h2  dangerouslySetInnerHTML={{__html: props.text}}></h2>
                </div>
                {props.currentpost[0].userid === auth.currentUser.uid?(!props.currentpost[0].answerd?<i className="fa fa-check" onClick={anpost}></i>:""):""}
                <div className="events">
                  <span  onClick={deletepost}>Delete</span>
                  <span  onClick={editcomment}>Edit</span>
                  <span className="replybtn" onClick={replybtn}>Reply</span>
                </div>
              </div>
              <div className="replys">
              <div className="addreply" ref={replydiv}>
                {<ReactQuill placeholder="..." id="a4" ref={replyin} className="editcommentinput" onChange={replychange} modules={Comment.modules} formats={Comment.foramts} value={reply}/>}
                {<button className="submitbtn editcommentbtn" ref={replybtnref} onClick={addreply}>ارسال</button>}
              </div>
              
                {props.replys&&props.replys.map((p,i)=><Reply key={i + p.userid} comments={props.commentts} id={props.id} commenttext={props.text} text={p.text} uid={p.userid}/>)}
              </div>
            </div>
            <div className="updatecomment" ref={updatec}>
              {<ReactQuill placeholder="..." id="a4" ref={commentin} className="editcommentinput" onChange={commentchange} modules={Comment.modules} formats={Comment.foramts} value={comment}/>}
              {<button className="submitbtn editcommentbtn" ref={commentbtn} onClick={updatecomment}>ارسال</button>}
            </div>
          </div>
      );
      }
      else
      {
        return (
          <div className="comment">
            <div className="commentbody">
              <div className="user">
              <img src={userData && userData[0].photo} alt="userimg" />
              <p>{userData && userData[0].name}</p>
              </div>
              <div className="body">
              <h2  dangerouslySetInnerHTML={{__html: props.text}}></h2>
              </div>
              {props.currentpost[0].userid === auth.currentUser.uid?(!props.currentpost[0].answerd?<i className="fa fa-check" onClick={anpost}></i>:""):""}
              <div className="events">
                <span className="replybtn" onClick={replybtn}>Reply</span>
              </div>
            </div>
            <div className="replys">
              <div className="addreply" ref={replydiv}>
                {<ReactQuill placeholder="..." id="a4" ref={replyin} className="editcommentinput" onChange={replychange} modules={Comment.modules} formats={Comment.foramts} value={reply}/>}
                {<button className="submitbtn editcommentbtn" ref={replybtnref} onClick={addreply}>ارسال</button>}
              </div>
                {props.replys&&props.replys.map((p,i)=><Reply key={i + p.userid} comments={props.commentts} commenttext={props.text} id={props.id} text={p.text} uid={p.userid}/>)}
              </div>
          </div>
      );
      }
    }
  
}

Comment.modules={
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

Comment.foramts=[
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