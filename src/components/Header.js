import React,{useRef,useEffect} from 'react'
import { collection} from "firebase/firestore"
import { query, where,updateDoc,doc,orderBy } from "firebase/firestore";  
import Logo from "../imges/A N I M O.png"
import { signOut } from "firebase/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import {auth , db} from "../firebase-config"
import "./header.css"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";  
import { useNavigate } from 'react-router-dom';
import { getAuth, signInAnonymously } from "firebase/auth";
import { async } from '@firebase/util';


export default function Header() {
    let queryuser;
    
    const userCollectionRef = collection(db,"users");
    queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
    const [userData] = useCollectionData(queryuser,{idField:'id'});
    if(userData)
    {
        userData[0]!=null?localStorage.setItem("codetime",userData[0].codetime):console.log("");
    }

    /**********************badges********************************/

  
    const userCollectionRefopen = collection(db,"opens_sec");
    const queryuser2 = query(userCollectionRefopen,where("openid","==","bad"));
    const [userDataopen] = useCollectionData(queryuser2);
    
  function countProperties(obj) {
    var count = 0;
  
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }
  
    return count;
  }
  
  async function pushbadgesnoti(status){   
    if(userData[0].badgesnotifications==undefined)
    {
        userData[0].badgesnotifications=[{
          text:`${status}مبروك لقد حصلت علي الوسام ال`
        }]
    }
    else
    {
        userData[0].badgesnotifications.push({
            text: ` مبروك لقد حصلت علي الوسام ` + status 
        });
    }

    
    const upddoc = doc(db,"users",userData[0].id);
    const newFields=userData[0];
    await updateDoc(upddoc,newFields);
  }


  async function badges(){
    if(userDataopen && userData && userData[0])
    {
      // console.log(countProperties(userData&&userData[0].csharp));
      // console.log(userDataopen[0].bronze_csharp_csharp);
      //bronze_c#_c#
      if(userData[0].badges[0] !==true)
      {
        if(countProperties(userData&&userData[0].csharp)>userDataopen[0].bronze_csharp_csharp)
        {
          const user2Doc = doc(db,"users",userData && userData[0].id);
          let new2Fields;
  
              new2Fields = {badges:{
                ...userData[0].badges,
                0:true
              }};
              userData[0].badges[0]=true;
          await updateDoc(user2Doc,new2Fields);
          await pushbadgesnoti("البرونزي في لغة السي شارب")
        }
      }
      else if(userData[0].badges[1] !==true)
      {
        if(countProperties(userData&&userData[0].csharp)>userDataopen[0].silver_csharp_csharp)
        {
          const user2Doc = doc(db,"users",userData && userData[0].id);
          let new2Fields;
  
              new2Fields = {badges:{
                ...userData[0].badges,
                1:true
              }};
              userData[0].badges[1]=true;
          await updateDoc(user2Doc,new2Fields);
          await pushbadgesnoti("الفضي في لغة السي شارب")
        }
      }
      else if(userData[0].badges[2] !==true)
      {
        if(countProperties(userData&&userData[0].csharpdata)>userDataopen[0].gold_csharp_data)
        {
            const user2Doc = doc(db,"users",userData && userData[0].id);
            let new2Fields;
    
                new2Fields = {badges:{
                  ...userData[0].badges,
                  2:true
                }};
                userData[0].badges[2]=true;
            await updateDoc(user2Doc,new2Fields);
            await pushbadgesnoti("الذهبي في لغة السي شارب")
        }
      }
      else if(userData[0].badges[3] !==true)
      {
        if(countProperties(userData&&userData[0].csharpdata)>userDataopen[0].plat_csharp_data)
        {
            const user2Doc = doc(db,"users",userData && userData[0].id);
            let new2Fields;
    
                new2Fields = {badges:{
                  ...userData[0].badges,
                  3:true
                }};
                userData[0].badges[3]=true;
            await updateDoc(user2Doc,new2Fields);
            await pushbadgesnoti("البلاتيني في لغة السي شارب")
        }
      }
      if(userData[0].badges[4] !==true)
      {
        if(countProperties(userData&&userData[0].cplusplus)>userDataopen[0].bronze_cplusplus_cplusplus)
        {
          const user2Doc = doc(db,"users",userData && userData[0].id);
          let new2Fields;
  
              new2Fields = {badges:{
                ...userData[0].badges,
                4:true
              }};
              userData[0].badges[4]=true;
          await updateDoc(user2Doc,new2Fields);
          await pushbadgesnoti("البرونزي في لغة السي بلس بلس")
        }
      }
      else if(userData[0].badges[5] !==true)
      {
        if(countProperties(userData&&userData[0].cplusplus)>userDataopen[0].silver_cplusplus_cplusplus)
        {
          const user2Doc = doc(db,"users",userData && userData[0].id);
          let new2Fields;
  
              new2Fields = {badges:{
                ...userData[0].badges,
                5:true
              }};
              userData[0].badges[5]=true;
          await updateDoc(user2Doc,new2Fields);
          await pushbadgesnoti("الفضي في لغة السي بلس بلس")
        }
      }
      else if(userData[0].badges[6] !==true)
      {
        if(countProperties(userData&&userData[0].cplusplusdata)>userDataopen[0].gold_cplusplus_data)
        {
            const user2Doc = doc(db,"users",userData && userData[0].id);
            let new2Fields;
    
                new2Fields = {badges:{
                  ...userData[0].badges,
                  6:true
                }};
                userData[0].badges[6]=true;
            await updateDoc(user2Doc,new2Fields);
            await pushbadgesnoti("الذهبي في لغة السي بلس بلس")
        }
      }
      else if(userData[0].badges[7] !==true)
      {
        if(countProperties(userData&&userData[0].cplusplusdata)>userDataopen[0].plat_cplusplus_data)
        {
            const user2Doc = doc(db,"users",userData && userData[0].id);
            let new2Fields;
    
                new2Fields = {badges:{
                  ...userData[0].badges,
                  7:true
                }};
                userData[0].badges[7]=true;
            await updateDoc(user2Doc,new2Fields);
            await pushbadgesnoti("البلاتيني في لغة السي بلس بلس")
        }
      }
    }
  }
  badges();

  //tags
  async function tags() {
      if(userDataopen && userData && userData[0])
      {
        if(userData[0].badges[0] == true || userData[0].badges[4] == true)
          {
              if(userData[0].tag!="مثابر"&&userData[0].tag!="مثابر بقوة")
              {
                const user2Doc = doc(db,"users",userData && userData[0].id);
                let new2Fields;
                new2Fields = {tag:"مثابر"};
                await updateDoc(user2Doc,new2Fields);
                userData[0].tag="مثابر";
              }
              else if(userData[0].exp >= userDataopen[0].mosabr&&userData[0].tag!="مثابر بقوة")
              {
                  console.log(userData[0].exp + " + " + userDataopen[0].mosabr);
                const user2Doc = doc(db,"users",userData && userData[0].id);
                let new2Fields;
                new2Fields = {tag:"مثابر بقوة"};
                if(userData[0].tag!="مثابر بقوة")
                await updateDoc(user2Doc,new2Fields);
              }
          }
      }
  }
  tags();


    const line1 = useRef(null);
    const line2 = useRef(null);
    const line3 = useRef(null);
    const uln = useRef(null);
    const burger = useRef(null);
    const icon1 = useRef(null);
    const icon2 = useRef(null);

    
    const burgerclickhandle = ()=>{
        line1.current.classList.toggle("activeline1")
        line2.current.classList.toggle("activeline2")
        line3.current.classList.toggle("activeline3")
        uln.current.classList.toggle("active")
    }

    useEffect(() => {
        
        document.addEventListener('click', function(event) {
                if(event.path[0] != uln.current && event.path[0] != line1.current&& event.path[0] != line2.current&& event.path[0] != line3.current&& event.path[0] != burger.current&& event.path[0] != icon1.current&& event.path[0] != icon2.current)
                {
                    if(line1.current!=null ||line2.current!=null||line3.current!=null||uln.current!=null){
                        line1.current.classList.remove("activeline1")
                        line2.current.classList.remove("activeline2")
                        line3.current.classList.remove("activeline3")
                        uln.current.classList.remove("active")
                    }
                }
            
          });
    
      return () => {
          try{
                document.removeEventListener("click");
          }
          catch{}
      }
    }, [])
    

    const logoutdo=async()=>{
        Swal.fire({
            title: 'هل تريد تسجيل الخروج؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم ',
            cancelButtonText:"لا"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("codetime",0);
                localStorage.setItem("loged",false);
                signOut(auth);
                navigate(``);
            }
        })
    }

    const notipanel = useRef(null);
    const favpanel = useRef(null);
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
        let data =userData&&userData[0];
        data.notifications=[];
        const upddoc = doc(db,"users",userData&&userData[0].id);
        await updateDoc(upddoc,data);
    }

    const openfav=()=>{
        favpanel.current.style.display="block";
        notiback.current.style.display="block";
        if(new URL(document.URL).pathname==='/discussion')
        {
            navigate(`/`);
        };
    }
    

    const closefav=async()=>{
        favpanel.current.style.display="none";
        notiback.current.style.display="none";
    }

    const badgespanel = useRef(null);
    const openbadges=()=>{
        badgespanel.current.style.display="block";
        notiback.current.style.display="block";
    }

    const closebadges=async()=>{
        badgespanel.current.style.display="none";
        notiback.current.style.display="none";
        let data =userData&&userData[0];
        data.badgesnotifications=[];
        const upddoc = doc(db,"users",userData&&userData[0].id);
        await updateDoc(upddoc,data);
    }


    const navigate = useNavigate()
    let fdata=[];
    
    
    const webdataCollectionRef = collection(db,"fourm");
    let queryt = query(webdataCollectionRef,orderBy('createdAt'));

    [fdata] = useCollectionData(queryt,{idField:'id'});
    const checkpostes_data=async()=>{
        // console.log(userData&&userData[0])
        // console.log(fdata&&fdata)
        if(userData&&userData[0]&&userData[0].mypostes!=undefined&&userData[0].favpost!=undefined&&userData[0].notifications!=undefined&&fdata){
            let favpost=[];
            let notifications=[];
            let mypostes=[];
            favpost =[...(userData&&userData[0]).favpost];
            notifications =[...(userData&&userData[0]).notifications];
            mypostes =[...(userData&&userData[0]).mypostes];
            userData[0].favpost = [...favpost].filter((value, index) => {
                let is=false;
                fdata&&fdata.forEach(element => {
                    if(element.title == value.text)
                    {
                        is=true;
                    }
                });
                if(is)
                return true;
            })
            
            userData[0].notifications = [...notifications].filter((value, index) => {
                let is=false;
                fdata&&fdata.forEach(element => {
                    if(element.title == value.url)
                    {
                        is=true;
                    }
                });
                if(is)
                return true;
            })

            userData[0].mypostes = [...mypostes].filter((value, index) => {
                let is=false;
                fdata&&fdata.forEach(element => {
                    if(element.title == value.text)
                    {
                        is=true;
                    }
                });
                if(is)
                return true;
            })
            
            const upddoc = doc(db,"users",userData&&userData[0].id);
            const newFields=userData&&userData[0];
            await updateDoc(upddoc,newFields);    
        }
    }
    checkpostes_data();
    // setTimeout(() => {
    // }, 100);
    // setInterval(() => {
    //     checkpostes_data();
    // }, 5000);
    
    

    return (
        <div className="headerf">
            <div className="container">
                <header>
                    <Link to={process.env.PUBLIC_URL +"/"}>
                    <div className="logoside">
                        <img src={Logo} alt="Logo"/>
                        <p>رحلتك لصناعة الالعاب تبدأ هنا</p>
                    </div>
                    </Link>
                    <div className="profile">
                        <div className="status">
                            <div className="level">
                            <span>Lv</span> {(userData && userData[0])? userData[0].level:""}
                            </div>
                            <div className="exp">
                            <span>EXP</span>
                            <div className="bar">
                                <div className="progress" style={{width:`${(userData&&userData[0]&&userData[0].exp/((userData&&userData[0]&&userData[0].level+1)*1000))*100}%`}}></div>
                                <div className="progressdetails">{(userData && userData[0])?userData[0].exp + "/" + (userData[0].level+1)*1000 :"" }</div>
                            </div>
                            <div className="downicons">
                                    <i className="fas fa-cog">
                                        <div className="but">
                                            <p><Link to={process.env.PUBLIC_URL +"/profile"} className="pink">تعديل الحساب</Link></p>
                                            {localStorage.getItem("codetime")==9999999999999?<p><Link to={process.env.PUBLIC_URL +"/Mksiaj"} className="pink">داشبورد</Link></p>:""}
                                            <p onClick={logoutdo}>تسجيل الخروج</p>
                                        </div>
                                    </i>
                                    <i className="fas fa-bell">
                                    {userData&&userData[0]&&userData[0].notifications.length>0?(<span className="noti" onClick={opennoti}>{userData&&userData[0]&&userData[0].notifications.length}</span>):""}</i> 
                                    <i className="fas fa-star" onClick={openfav}></i>
                                    <i className="fas fa-award">
                                    {userData&&userData[0]&&userData[0].badgesnotifications.length>0?(<span className="noti" onClick={openbadges}>{userData&&userData[0]&&userData[0].badgesnotifications.length}</span>):""}</i> 
                                </div>
                            </div>
                        </div>
                                <img src={userData&&userData[0]&&userData[0].photo}   alt="userphoto" onClick={()=>navigate('/profile')} className="pointer"/>
                    </div>
                            
                    <div className="barburger" ref={burger} onClick={burgerclickhandle}>
                        <div className="slice" id="line1" ref={line1}></div>
                        <div className="slice" id="line2" ref={line2}></div>
                        <div className="slice" id="line3" ref={line3}></div>
                    </div>
                </header>
                <nav>
                    <ul ref={uln}>
                    <div className="profile">
                        <div className="status">
                            <div className="level">
                            <span>Lv</span> {(userData && userData[0])? userData[0].level:""}
                            </div>
                            <div className="exp">
                            <span>EXP</span>
                            <div className="bar">
                                <div className="progress" style={{width:`${(userData&&userData[0]&&userData[0].exp/((userData&&userData[0]&&userData[0].level+1)*1000))*100}%`}}></div>
                                <div className="progressdetails">{(userData && userData[0])?userData[0].exp + "/" + (userData[0].level+1)*1000 :""}</div>
                            </div>
                            <div className="downicons">
                                    <i className="fas fa-cog" ref={icon1}>
                                        <div className="but">
                                            <p><Link to={process.env.PUBLIC_URL +"/profile"} className="pink">تعديل الحساب</Link></p>
                                            {localStorage.getItem("codetime")==9999999999999?<p><Link to={process.env.PUBLIC_URL +"/Mksiaj"} className="pink">داشبورد</Link></p>:""}
                                            <p onClick={logoutdo}>تسجيل الخروج</p>
                                        </div>
                                    </i>
                                    <i className="fas fa-bell" ref={icon2}>
                                    {userData&&userData[0]&&userData[0].notifications.length>0?(<span className="noti" onClick={opennoti}>{userData&&userData[0]&&userData[0].notifications.length}</span>):""}
                                    </i>    
                                    <i className="fas fa-star" onClick={openfav}></i>
                                    <i className="fas fa-award">
                                    {userData&&userData[0]&&userData[0].badgesnotifications.length>0?(<span className="noti" onClick={openbadges}>{userData&&userData[0]&&userData[0].badgesnotifications.length}</span>):""}</i> 
                                </div>
                            </div>
                        </div>
                        <img src={userData&&userData[0]&&userData[0].photo}   alt="userphoto" onClick={()=>navigate('/profile')}/>
                    </div>
                        <Link to={process.env.PUBLIC_URL +"/"}><li>القائمة</li></Link>
                        <a href="https://www.youtube.com/c/AnimoGameDev" target="_blank" rel="noreferrer"><li>يوتيوب</li></a>
                        <a href="https://discord.gg/N6DaYAY"  target="_blank" rel="noreferrer"><li>ديسكورد</li></a>
                        <Link to={process.env.PUBLIC_URL +"/addcode"}><li className="fakea1">الإشتراك</li></Link>
                        <Link to={process.env.PUBLIC_URL +"/ranks"}><li className="fakea3">التصنيف</li></Link>
                        <a href="https://youtu.be/dAzsvDSB2Bs" target="_blank"  rel="noreferrer"><li className="fakea2">ازاي تستخدم المنصة</li></a>
                    </ul>
                </nav>
            </div>
            <div className="back" ref={notiback}></div>
            <div className="notipanel" ref={notipanel}>
                <i className="fas fa-times" onClick={closenoti}></i>
                <h2>الأشعارات</h2>
                {userData&&userData[0]&&userData[0].notifications.map((p,i)=> <p key={i} className="singlenoti" onClick={()=>{if(new URL(document.URL).pathname=='/discussion'){navigate(`/discussion?notipost=${p.url}`, {replace: true});};closenoti();}}><Link to={`/discussion?notipost=${p.url}`}>{p.text}</Link></p> )}
            </div>
            <div className="notipanel" ref={favpanel}>
                <i className="fas fa-times" onClick={closefav}></i>
                <h2>البوستات المفضلة</h2>
                {userData&&userData[0]&&userData[0].favpost? userData&&userData[0].favpost.map((p,i)=> <p key={i} className="singlenoti" onClick={()=>{if(new URL(document.URL).pathname==='/discussion'){navigate(`/discussion?notipost=${p.url}`);};closefav();}}><Link to={`/discussion?notipost=${p.url}`}>{p.text}</Link></p> ):""}
            </div>
            <div className="notipanel" ref={badgespanel}>
                <i className="fas fa-times" onClick={closebadges}></i>
                <h2>أشعارات الشارات</h2>
                {userData&&userData[0]&&userData[0].badgesnotifications? userData&&userData[0].badgesnotifications.map((p,i)=> <p key={i} className="singlenoti">{p.text}</p> ):""}
            </div>
        </div>
    )
}
/*

 <button onClick={async()=>{
                        const userDoc = doc(db,"users",userData && userData[0].id);
                        const newFields = {programming:{...userData[0].programming,
                            2:true
                        }};
                        await updateDoc(userDoc,newFields)
                        if(userData){
                            console.log(userData[0].programming[2])
                        };
                    }}>ppppp</button>
*/
