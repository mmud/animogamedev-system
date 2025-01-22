import React,{useState,useRef} from 'react'
import "./profile.css"
import csbronze from "../imges/badges/csharpBronzeBadge.png"
import cssliver from "../imges/badges/csharpSilverBadge.png"
import csgold from "../imges/badges/CsGoldBadge.png"
import csplat from "../imges/badges/csharpPlatBadge.png"
import cppbronze from "../imges/badges/cppBronzeBadge.png"
import cppsilver from "../imges/badges/CppSilverBadge.png"
import cppgold from "../imges/badges/CppGoldBadge.png"
import cppplat from "../imges/badges/CppPlatBadge.png"
import { collection} from "firebase/firestore"
import { query, where,updateDoc,doc } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import {auth , db} from "../firebase-config"
import Swal from "sweetalert2";  
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Profile() {
  let queryuser;
  try{
  const userCollectionRef = collection(db,"users");
  queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
  
  }
  catch{}
  const [userData] = useCollectionData(queryuser,{idField:'id'});


  const userCollectionRefopen = collection(db,"opens_sec");
  const queryuser2 = query(userCollectionRefopen,where("openid","==","bad"));
  const [userDataopen] = useCollectionData(queryuser2);

//badges

function countProperties(obj) {
  var count = 0;

  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          ++count;
  }

  return count;
}

  if(userDataopen && userData)
  {
    // console.log(countProperties(userData&&userData[0].csharp));
    // console.log(userDataopen[0].bronze_csharp_csharp);
    //bronze_c#_c#
    if(userData[0].badges[0] !=true)
    {
      if(countProperties(userData&&userData[0].csharp)>userDataopen[0].bronze_csharp_csharp)
      {
        const user2Doc = doc(db,"users",userData && userData[0].id);
        let new2Fields;

            new2Fields = {badges:{
              ...userData[0].badges,
              [0]:true
            }};
        updateDoc(user2Doc,new2Fields);
        
      }
    }
  }


//upload photo
  const [barstyle, setbarstyle] = useState({
    display:"none"
  })
  const [progressstyle, setprogressstyle] = useState({
    width: "0"
  })

  const handleChange = (e) =>{
    if (e.target.files[0]) {
      if(e.target.files[0]['type'].split('/')[0] === 'image'){
        if(e.target.files[0].size <=8388608)
        {
          // Create a root reference
          const storage = getStorage();

          // Create a reference to 'images/mountains.jpg'
          const mountainImagesRef = ref(storage, `usersphotos/${e.target.files[0].name}`);
          const uploadTask = uploadBytesResumable(mountainImagesRef, e.target.files[0]);
          setbarstyle({
            display:"block"
          })
          uploadTask.on(
            'state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setbarstyle({
                display:"block",
              })
              setprogressstyle({
                width:progress+"%"
              })
              switch (snapshot.state) {
                case 'paused':
                  break;
                case 'running':
                  break;
              }
            },
            (error) => {
              setbarstyle({
                display:"none"
              })
              setprogressstyle({
                width:0
              })
              Swal.fire({
                icon: 'error',
                title: 'حدث خطاء يرجي المحاولة لاحقاً',
                showConfirmButton: false,
                timer: 2000
            })            }, 
            () => {
              Swal.fire({
                icon: 'success',
                title: 'تم تغير الصورة بنجاح',
                showConfirmButton: false,
                timer: 2000
              });

              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const user4Doc = doc(db,"users",userData && userData[0].id);
                const new4Fields = {photo:`${downloadURL}`};
                updateDoc(user4Doc,new4Fields);
              });
              setbarstyle({
                display:"none"
              })
              setprogressstyle({
                width:0
              })
            }
          )

        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'يجب ان يكون حجم الصورة اقل من 8 ميجا',
            showConfirmButton: false,
            timer: 2000
        })
        } 
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'المدخل ليس صورة',
          showConfirmButton: false,
          timer: 2000
      })
      }
    }
  }

    const navigate = useNavigate()
    const notipanel = useRef(null);
    const notiback = useRef(null);
    const opennoti=()=>{
        notipanel.current.style.display="block";
        notiback.current.style.display="block";
        if(new URL(document.URL).pathname==='/discussion')
        {
            navigate(`/`);
        };
    }

    const closenoti=async()=>{
      notipanel.current.style.display="none";
      notiback.current.style.display="none";
  }
  return (
    <div className="container">
      <div className="back" ref={notiback}></div>
            <div className="notipanel" ref={notipanel}>
                <i className="fas fa-times" onClick={closenoti}></i>
                <h2>المناقشة</h2>
                {userData&&userData[0].mypostes!=undefined? userData&&userData[0].mypostes.map((p,i)=> <p key={i} className="singlenoti" onClick={()=>{if(new URL(document.URL).pathname=='/discussion'){navigate(`/discussion?notipost=${p.url}`, {replace: true});};closenoti();}}><Link to={`/discussion?notipost=${p.url}`}>{p.text}</Link></p> ):''}
            </div>

      <div className="profilecontent">
        {/* <div className="uploadpanel">
        <input type="file" id="file" />
        <label for="file" class="btn-3">
          <span>select</span>
        </label>
          <p className="uprules">اقصي حجم يمكن رفعة 8 ميجا*</p>
        </div> */}
        <div className="badge">
          <h2><i className="fas fa-trophy"></i> الشارات</h2>
          <div className="cate">
            <img src={csbronze} alt="csbronzebadge" className={userData&&userData[0].badges? userData&&userData[0].badges[0]?"active":'':''}/>
            <img src={cssliver} alt="cssliverbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[1]?"active":'':''}/>
            <img src={csgold} alt="csgoldbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[2]?"active":'':''}/>
            <img src={csplat} alt="csplatbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[3]?"active":'':''}/>
          </div>
          <div className="cate">
            <img src={cppbronze} alt="cppbronzebadge" className={userData&&userData[0].badges? userData&&userData[0].badges[4]?"active":'':''}/>
            <img src={cppsilver} alt="cppsilverbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[5]?"active":'':''}/>
            <img src={cppgold} alt="cppgoldbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[6]?"active":'':''}/>
            <img src={cppplat} alt="cppplatbadge" className={userData&&userData[0].badges? userData&&userData[0].badges[7]?"active":'':''}/>
          </div>
        </div>

        <div className="rightd">
          <div className="profilephoto">
            <div className="bar" style={barstyle}>
              <div className="progress" style={progressstyle}></div>
            </div>
            <div style={{"position":"relative","width":"min-content","margin":"auto"}}>
              <img src={userData&&userData[0].photo} alt="userphoto"/>
              <input type="file" id="file" onChange={handleChange} />
              <label htmlFor="file" >
                <i className="fas fa-pen" ></i>
              </label>
            </div>
          </div>
          <p className="username">@{userData&&userData[0].name}</p>
          {(userData&&userData[0].mypostes!=undefined? (<div className="noti" onClick={opennoti}><p className="number">{userData&&userData[0].mypostes.length}</p><p>المناقشة</p></div>):"")}
          <div className="title"> اللقب : <span>{userData&&userData[0].tag}</span></div>
        </div>
      </div>
    </div>
  )
}
