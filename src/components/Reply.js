import React,{useRef,useState} from 'react';
import { collection,deleteDoc , doc} from "firebase/firestore"
import { query, where,updateDoc } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import {auth , db} from "../firebase-config"
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";  

export default function Reply(props) {
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
          let c=props.comments;
          for( var i = 0; i < c.length; i++){ 
            if ( c[i].text === props.commenttext) { 
              for (let j = 0; j < c[i].replys.length; j++) {
                if(c[i].replys[j].text==props.text){
                  c[i].replys.splice(j, 1);
                }
              }
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

    // const anpost=()=>{
    //   const userDoc = doc(db,"fourm",props.id);
    //   props.currentpost[0].answerd=true;
    //   let date = new Date();
    //   props.currentpost[0].timeend=date.setTime(date.getTime()+(7*24*60*60*1000));
    //   let newfield =props.currentpost[0]
    //   updateDoc(userDoc,newfield);
    // }
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
      let c=props.comments;
      for( var i = 0; i < c.length; i++){ 
        if ( c[i].text === props.commenttext) { 
          for (let j = 0; j < c[i].replys.length; j++) {
            if(c[i].replys[j].text==props.text){
              c[i].replys[j].text=comment;
            }
          }
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

    if(props.uid !==undefined && auth.currentUser.uid !== undefined)
    {
      if(props.uid===auth.currentUser.uid||buy){
        return (
          <div className="commentcontent">
            <div className="comment reply">
              <div className="user">
              <img src={userData && userData[0].photo} alt="userimg" />
              <p>{userData && userData[0].name}</p>
              </div>
              <div className="body">
                <h2  dangerouslySetInnerHTML={{__html: props.text}}></h2>
              </div>
              {/* {props.currentpost[0].userid === auth.currentUser.uid?(!props.currentpost[0].answerd?<i className="fa fa-check" onClick={anpost}></i>:""):""} */}
              <div className="events">
                <span onClick={deletepost}>Delete</span>
                <span onClick={editcomment}>Edit</span>
              </div>
            </div>
            <div className="updatecomment" ref={updatec}>
              {<ReactQuill placeholder="..." id="a4" ref={commentin} className="editcommentinput" onChange={commentchange} modules={Comment.modules} formats={Comment.foramts} value={comment}/>}
              <button className="submitbtn editcommentbtn" ref={commentbtn} onClick={updatecomment}>ارسال</button>
            </div>
          </div>
      );
      }
      else
      {
        return (
          <div className="comment reply">
            <div className="user">
            <img src={userData && userData[0].photo} alt="userimg" />
            <p>{userData && userData[0].name}</p>
            </div>
            <div className="body">
            <h2  dangerouslySetInnerHTML={{__html: props.text}}></h2>
            </div>
            {/* {props.currentpost[0].userid === auth.currentUser.uid?(!props.currentpost[0].answerd?<i className="fa fa-check" onClick={anpost}></i>:""):""} */}
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