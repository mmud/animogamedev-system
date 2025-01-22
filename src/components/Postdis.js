import React,{useRef,useState} from 'react';
import { collection,deleteDoc , doc} from "firebase/firestore"
import { query, where,updateDoc,getDocs } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import {auth , db} from "../firebase-config"
import Swal from "sweetalert2";  
import { async } from '@firebase/util';

export default function Postdis(props) {
    const userCollectionRef = collection(db,"users");
    const querys = query(userCollectionRef,where("uid","==",props.uid));

    const [userData] = useCollectionData(querys,{idField:'id'});

    const deletepost=async()=>{
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
          deleteDoc(userDoc);
        }
      })
    }

    const deleteposti = async()=>{

      const userDoc = doc(db,"fourm",props.id);
      await deleteDoc(userDoc);
    }

    const [isfav, setisfav] = useState(false)
    let user
    const getuserd=async()=>{
      const userCollectionRefs = collection(db,"users");
      const queryuser = query(userCollectionRefs,where("uid","==",auth.currentUser.uid));
      const datau = await getDocs(queryuser);
      user =(datau.docs&&datau.docs.map((doc)=>({...doc.data(),id:doc.id})))
      for (let i = 0; i < user[0].favpost.length; i++) {
        if(props.title == user[0].favpost[i].text)
        {
          setisfav(true);
          break;
        }
      }
    }
    getuserd();
    
    const addfavclick = async()=>{
      if(user[0].favpost==undefined)
      {
          user[0].favpost=[{
            text:props.title,
            url:props.title
          }]
      }
      else
      {
        let favpost=[];
        favpost =[...user[0].favpost]
        favpost.push({
          text:props.title,
          url:props.title
        });
        user[0].favpost = [...favpost].filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.url === value.url && t.text === value.text
        ))
        )
        //user[0].favpost=;
      }


      const upddoc = doc(db,"users",user[0].id);
      const newFields=user[0];
      await updateDoc(upddoc,newFields);    
    
    }
      const [value, setValue] = useState(0);

    const removefavclick=async()=>{
    
    for( var i = 0; i < user[0].favpost.length; i++){ 
    
        if ( user[0].favpost[i].text == props.title) { 
    
          user[0].favpost.splice(i, 1); 
          break;
        }
    
      }


      const upddoc = doc(db,"users",user[0].id);
      const newFields=user[0];
      await updateDoc(upddoc,newFields);  
      setisfav(false);
       
    }

    if(props.timeend<(new Date().getTime()))
    {
      deleteposti();
    }
    let buy=(localStorage.getItem("codetime")==9999999999999);
    if(props.uid !==undefined && auth.currentUser.uid !== undefined)
    {
      if(props.uid===auth.currentUser.uid || buy){
        return (
          <div className="postdis">
            {isfav?<i className="fas fa-star" onClick={removefavclick}></i>:<i className="far fa-star" onClick={addfavclick}></i>}
            <div className="user">
              <img src={userData && userData[0].photo} alt="userimg" />
              <p>{userData && userData[0].name}</p>
            </div>
            <div className="body">
              <h2 onClick={()=>{props.clickf(props.id,userData && userData[0].photo)}}>{props.title}</h2>
              <div className="details">
              <i class="fas fa-comment"></i> {props.comments.length}
              </div>
            </div>
            <div className="answerd">{props.answerd?"Answered":""}</div>
            <p className="postdelete" onClick={deletepost}>Delete</p>
          </div>
      );
      }
      else
      {
        return (
          <div className="postdis">
            {isfav?<i className="fas fa-star" onClick={removefavclick}></i>:<i className="far fa-star" onClick={addfavclick}></i>}
            <div className="user">
            <img src={userData && userData[0].photo} alt="userimg" />
            <p>{userData && userData[0].name}</p>
            </div>
            <div className="body">
              <h2 onClick={()=>{props.clickf(props.id,userData && userData[0].photo)}}>{props.title}</h2>
              <div className="details">
              <i class="fas fa-comment"></i> {props.comments.length}
              </div>
              <div className="answerd">{props.answerd?"Answered":""}</div>
            </div>
          </div>
      );
      }
    }
  
}
