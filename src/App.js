import './App.css';
import React,{useState,useEffect} from 'react'
import Login from './screens/login';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "./firebase-config"
import Home from './screens/Home';
import {BrowserRouter , Route ,Routes,Navigate  } from "react-router-dom";
import { collection} from "firebase/firestore"
import { query, where } from "firebase/firestore";  
import {useCollectionData} from "react-firebase-hooks/firestore"
import {db} from "./firebase-config"
import Header from './components/Header';
import Footer from './components/Footer';
import Unity from './screens/Unity';
import Discussion from './screens/Discussion';
import Codes from './screens/Codes';
import Soon from './screens/Soon';
import Csharp from './screens/charp';
import Programming from './screens/Programming';
import Csharpunity from './screens/charpunity';
import Profile from './screens/Profile';
import Ranks from './screens/Ranks';
import Gameengine from './screens/Gameengine';
import Unity2D from './screens/Unity2D';
import Dashboard from './screens/dashboard';
import Repairing from './screens/Repairing';
import Cplusplus from './screens/cplusplus';
import Cplusplusdata from './screens/cplusplusdata';
import Art2d from './screens/Art2d';
import Error from './screens/error';
import Csharpdata from './screens/csharpdata';

function App() {

  const userCollectionRefopen = collection(db,"opens_sec");
  const queryuser2 = query(userCollectionRefopen,where("openid","==","programming"));
  const [userDataopen] = useCollectionData(queryuser2);

  const userCollectionRefopen2 = collection(db,"opens_sec");
  const queryuser22 = query(userCollectionRefopen2,where("openid","==","engine"));
  const [userDataopen2] = useCollectionData(queryuser22);
  // let buy=(localStorage.getItem("codetime")>new Date().getTime());

  const [user] = useAuthState(auth);
  // const [ad, setad] = useState(false)
    
  // useEffect(() => {
  //     if(!buy){
  //     var s=document.createElement('script');
  //     function ads(u,z,p){
  //         s.src=u;
  //         s.setAttribute('data-zone',z);
  //         p.appendChild(s);
  //         }
  //         ads('https://iclickcdn.com/tag.min.js',4910585,document.body||document.documentElement);
  //         console.log("run");
  //     }
  // return () => {
  //     if(!ad&&!buy){
  //         (document.body||document.documentElement).removeChild(s)
  //         console.log("end");
  //     setad(true);
  //     }
  // }
  // },[])
  // return(
  //     <BrowserRouter>
  //       <Header/>
  //       <Routes>
  //         <Route path={"/"} exact element={<Home/>} />
  //         <Route path={"/programming"} exact element={<Programming/>} />
  //         <Route path={"/programming/csharp"} exact element={<Csharp/>} />
  //         <Route path={"/programming/csharpunity"} exact element={<Csharpunity/>} />
  //         <Route path={"/gameengine/unity"} exact element={<Unity/>} />
  //         <Route path={"/gameengine/unity2d"} exact element={<Unity2D/>} />
  //         <Route path={"/discussion"} exact element={<Discussion/>} />
  //         <Route path={"/2dart"} exact element={<Art2d/>} />
  //         <Route path={"/addcode"} exact element={<Codes/>} />
  //         <Route path={"/profile"} exact element={<Profile/>} />
  //         <Route path={"/soon"} exact element={<Soon/>} />
  //         <Route path={"/ranks"} exact element={<Ranks/>} />
  //         <Route path={"/gameengine"} exact element={<Gameengine/>} />
  //         <Route path={"/Mksiaj"} exact element={<Dashboard/>} />
  //         <Route path={"/Repairing"} exact element={<Repairing/>} />
  //         <Route path={"*"} exact element={<Error/>} />
  //       </Routes>
  //       <Footer />
  //     </BrowserRouter>
  //     )
  if( localStorage.getItem("loged")==true || user )
  {
    return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path={"/"} exact element={<Home/>} />
        <Route path={"/programming"} exact element={<Programming/>} />
        <Route path={"/programming/csharp"} exact element={userDataopen&&userDataopen[0].csharp?<Csharp/>:<Repairing/>} />
        <Route path={"/programming/csharpdata"} exact element={userDataopen&&userDataopen[0].csharpdata?<Csharpdata/>:<Repairing/>} />
        <Route path={"/programming/csharpunity"} exact element={userDataopen&&userDataopen[0].csharp_unity?<Csharpunity/>:<Repairing/>} />
        <Route path={"/programming/cplusplus"} exact element={userDataopen&&userDataopen[0].cplusplus?<Cplusplus/>:<Repairing/>} />
        <Route path={"/programming/cplusplusdata"} exact element={userDataopen&&userDataopen[0].cplusplus_data?<Cplusplusdata/>:<Repairing/>} />
        <Route path={"/gameengine"} exact element={<Gameengine/>} />
        <Route path={"/gameengine/unity"} exact element={userDataopen2&&userDataopen2[0].unityengine?<Unity/>:<Repairing/>} />
        <Route path={"/gameengine/unity2d"} exact element={<Unity2D/>} />
        <Route path={"/discussion"} exact element={<Discussion/>} />
        <Route path={"/addcode"} exact element={<Codes/>} />
        <Route path={"/2dart"} exact element={userDataopen&&userDataopen[0].art2d?<Art2d/>:<Repairing/>} />
        <Route path={"/profile"} exact element={<Profile/>} />
        <Route path={"/soon"} exact element={<Soon/>} />
        <Route path={"/ranks"} exact element={<Ranks/>} />
        <Route path={"/Mksiaj"} exact element={<Dashboard/>} />
        <Route path={"/Repairing"} exact element={<Repairing/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    )
  }
  else
  {
    return(
    <Login />
    )
  }
}

export default App;
