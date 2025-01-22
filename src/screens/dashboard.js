import React,{useState} from 'react'
import "./dashboard.css"
import { collection } from "firebase/firestore"
import {db,auth} from "../firebase-config"
import {useCollectionData,useDocumentDataOnce  } from "react-firebase-hooks/firestore"
import { query, where,orderBy } from "firebase/firestore"
import { getDocs ,addDoc,updateDoc,doc} from "firebase/firestore"
import { limit , serverTimestamp,startAfter } from "firebase/firestore";  
import Swal from "sweetalert2";  
import { async } from '@firebase/util'

export default function Dashboard() {
    const userCollectionRefopen = collection(db,"opens_sec");
    const queryuser2 = query(userCollectionRefopen,where("openid","==","programming"));
    const [userDataopen] = useCollectionData(queryuser2,{idField:'id'});

    const queryuserengine = query(userCollectionRefopen,where("openid","==","engine"));
    const [userDataopenengine] = useCollectionData(queryuserengine,{idField:'id'});

    const queryuserbages= query(userCollectionRefopen,where("openid","==","bad"));
    const [userDataopenbadges] = useCollectionData(queryuserbages,{idField:'id'});

    const userCollectionRefcodes = collection(db,"userdata");
    const queryusercodes = query(userCollectionRefcodes,limit(1));
    const [userDatacodes] = useCollectionData(queryusercodes,{idField:'id'});

    /******************************codes**************************************/
    const [code, setcode] = useState("")
    const getcode=async()=>{
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
           }
           return result;
        }
        let codeg=makeid(10);
        const codeDoc = doc(db,"userdata","codes");
        const codeFields = {
            codes:[...userDatacodes[0].codes,codeg]
        };
        await updateDoc(codeDoc,codeFields);
        setcode(codeg);
    }

        ////////////////////
    function countProperties(obj) {
        var count = 0;
      
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                ++count;
        }
      
        return count;
      }
      


    /******************************csharp**************************************/
    const [csharp, setcsharp] = useState("")
    const [csharpq, setcsharpq] = useState("")

    const opencsharp=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "csharp":true
        };
        await updateDoc(user4Doc,new4Fields);
    }
  
    const closecsharp=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "csharp":false
        };
        await updateDoc(user4Doc,new4Fields);
    }
  

    //PL6xJDaN7qoDL8O5GvbwskfIkrTesOtCIA
    const addcsharp=async()=>{

        const userDoc = doc(db,"website-data",'csharp-videos');
    
        const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${csharp}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                const json = await response.json();
                let playlist=json;
    
                let videosdata=playlist.items.map(v=>({
                    title:v.snippet.title,
                    src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                }))
    
    
                let fulldata=[...videosdata]
                let fulldatatoweb=[];
                for (let i = 0; i < fulldata.length; i++) {
                    if(fulldata[i].title === "مراجعة على ليفل 1 فى لغة السي شارب[مهمة]"||
                    fulldata[i].title ==="مراجعة على الجزء التاني فى لغة السي شارب - Level2 Revision"||
                    fulldata[i].title ==="الدرس 18 فى لغة السي شارب | Quick Revision on Functions"||
                    fulldata[i].title ==="أختصارت وملاحظات مهمة فى لغة السي شارب"||
                    fulldata[i].title ==="الدرس 11 فى لغة السي شارب | Arrays Part2"||
                    fulldata[i].title ==="الدرس 12 فى لغة السي شارب | Label | Foreach"||
                    fulldata[i].title ==="الدرس 13 فى لغة السي شارب | Lists"
                    )
                {
                    continue;
                }
                    fulldatatoweb.push(fulldata[i]);
                }
                
        let newFields={
            videos:[
            ...fulldatatoweb
            ]
        }
        await updateDoc(userDoc,newFields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log("done")
    }
    

    const addcsharpquizes=async()=>{
            let data =eval("(" + csharpq + ')')
            let count=0;
            for (let i = 0; i < Number( userDataopenbadges[0].bronze_csharp_csharp); i++) {
                count += countProperties(data[i]);
            }
          const userDoc = doc(db,"website-data",'csharp-quizzes');
          await updateDoc(userDoc,data);
          const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
          const new4Fields = {
              ...userDataopenbadges[0],
              "mosabr":(count*100)-100
          };
          await updateDoc(user4Doc,new4Fields);
          Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
          console.log(data);
      }
 /******************************csharp data**************************************/
 const [csharpdata, setcsharpdata] = useState("")
 const [csharpdataq, setcsharpdataq] = useState("")

 const opencsharpdata=async()=>{
     const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
     const new4Fields = {
         ...userDataopen[0],
         "csharpdata":true
     };
     await updateDoc(user4Doc,new4Fields);
 }

 const closecsharpdata=async()=>{
     const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
     const new4Fields = {
         ...userDataopen[0],
         "csharpdata":false
     };
     await updateDoc(user4Doc,new4Fields);
 }


 const addcsharpdata=async()=>{

     const userDoc = doc(db,"website-data",'csharpdata-videos');
 
     const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${csharpdata}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
             const json = await response.json();
             let playlist=json;
 
             let videosdata=playlist.items.map(v=>({
                 title:v.snippet.title,
                 src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
             }))
 
 
             let fulldata=[...videosdata]
             let fulldatatoweb=[];
             for (let i = 0; i < fulldata.length; i++) {
                 if(fulldata[i].title === "مراجعة على ليفل 1 فى لغة السي شارب[مهمة]"||
                 fulldata[i].title ==="مراجعة على الجزء التاني فى لغة السي شارب - Level2 Revision"||
                 fulldata[i].title ==="الدرس 18 فى لغة السي شارب | Quick Revision on Functions"||
                 fulldata[i].title ==="أختصارت وملاحظات مهمة فى لغة السي شارب"||
                 fulldata[i].title ==="الدرس 11 فى لغة السي شارب | Arrays Part2"||
                 fulldata[i].title ==="الدرس 12 فى لغة السي شارب | Label | Foreach"||
                 fulldata[i].title ==="الدرس 13 فى لغة السي شارب | Lists"
                 )
             {
                 continue;
             }
                 fulldatatoweb.push(fulldata[i]);
             }
             
     let newFields={
         videos:[
         ...fulldatatoweb
         ]
     }
     await updateDoc(userDoc,newFields);
     Swal.fire({
         icon: 'success',
         title: 'تم الارسال'
     })
     console.log("done")
 }
 


 const addcsharpdataquizes=async()=>{
         let data =eval("(" + csharpdataq + ')')
     
       const userDoc = doc(db,"website-data",'csharpdata-quizzes');
       await updateDoc(userDoc,data);
       Swal.fire({
         icon: 'success',
         title: 'تم الارسال'
     })
       console.log(data);
   }


    /******************************csharp in unity**************************************/
    const [csharpinunity, setcsharpinunity] = useState("")
    const [csharpinunityq, setcsharpinunityq] = useState("")
    const opencsharpinunity=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "csharp_unity":true
        };
        await updateDoc(user4Doc,new4Fields);
    }

    const closecsharpinunity=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "csharp_unity":false
        };
        await updateDoc(user4Doc,new4Fields);
    }
    const addcsharpinunity=async()=>{

        const userDoc = doc(db,"website-data",'csharpunity-videos');
    
        const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${csharpinunity}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                const json = await response.json();
                let playlist=json;
    
                let videosdata=playlist.items.map(v=>({
                    title:v.snippet.title,
                    src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                }))
    
                
        let newFields={
            videos:[
            ...videosdata
            ]
        }
        await updateDoc(userDoc,newFields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log("done")
    }

    
    const addcsharpunityquizes=async()=>{
        let data =eval("(" + csharpinunityq + ')')
    
      const userDoc = doc(db,"website-data",'csharpunity-quizzes');
      await updateDoc(userDoc,data);
      Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
      console.log(data);
  }
    /******************************unity engine**************************************/
    const [unityengine, setunityengine] = useState("")
    const [unityengineq, setunityengineq] = useState("")
    const openunityengine=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenengine[0].id);
        const new4Fields = {
            ...userDataopenengine[0],
            "unityengine":true
        };
        await updateDoc(user4Doc,new4Fields);
    }

    const closecunityengine=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenengine[0].id);
        const new4Fields = {
            ...userDataopenengine[0],
            "unityengine":false
        };
        await updateDoc(user4Doc,new4Fields);
    }

    const addunityengine=async()=>{

        const userDoc = doc(db,"website-data",'unity-videos');
    
        const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${unityengine}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                const json = await response.json();
                let playlist=json;
    
                let videosdata=playlist.items.map(v=>({
                    title:v.snippet.title,
                    src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                }))
    
                
        let newFields={
            videos:[
            ...videosdata
            ]
        }
        await updateDoc(userDoc,newFields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log("done")
    }
    const addunityenginequizes=async()=>{
        let data =eval("(" + unityengineq + ')')
    
      const userDoc = doc(db,"website-data",'unity-quizzes');
      await updateDoc(userDoc,data);
      Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
      console.log(data);
      
  }
    /******************************c++**************************************/
        const [cplusplus, setcplusplus] = useState("")
        const [cplusplusq, setcplusplusq] = useState("")
        const opencplusplus=async()=>{
            const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
            const new4Fields = {
                ...userDataopen[0],
                "cplusplus":true
            };
            await updateDoc(user4Doc,new4Fields);
        }

        const closecplusplus=async()=>{
            const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
            const new4Fields = {
                ...userDataopen[0],
                "cplusplus":false
            };
            await updateDoc(user4Doc,new4Fields);
        }
        const addcplusplus=async()=>{

            const userDoc = doc(db,"website-data",'cplusplus-videos');
        
            const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${cplusplus}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                    const json = await response.json();
                    let playlist=json;
        
                    let videosdata=playlist.items.map(v=>({
                        title:v.snippet.title,
                        src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                    }))
        
                    
            let newFields={
                videos:[
                ...videosdata
                ]
            }
            await updateDoc(userDoc,newFields);
            Swal.fire({
                icon: 'success',
                title: 'تم الارسال'
            })
            console.log("done")
        }

        
        const addcplusplusquizes=async()=>{
            let data =eval("(" + cplusplusq + ')')
        
        const userDoc = doc(db,"website-data",'cplusplus-quizzes');
        await updateDoc(userDoc,data);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log(data);
    }
    /******************************c++ datastructure **************************************/
    const [cplusplusdata, setcplusplusdata] = useState("")
    const [cplusplusqdata, setcplusplusqdata] = useState("")
    const opencplusplusdata=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "cplusplus_data":true
        };
        await updateDoc(user4Doc,new4Fields);
    }

    const closecplusplusdata=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "cplusplus_data":false
        };
        await updateDoc(user4Doc,new4Fields);
    }
    const addcplusplusdata=async()=>{

        const userDoc = doc(db,"website-data",'cplusplusdata-videos');

        const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${cplusplusdata}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                const json = await response.json();
                let playlist=json;

                let videosdata=playlist.items.map(v=>({
                    title:v.snippet.title,
                    src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                }))

                
        let newFields={
            videos:[
            ...videosdata
            ]
        }
        await updateDoc(userDoc,newFields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log("done")
    }


    const addcplusplusquizesdata=async()=>{
        let data =eval("(" + cplusplusqdata + ')')

    const userDoc = doc(db,"website-data",'cplusplusdata-quizzes');
    await updateDoc(userDoc,data);
    Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
    console.log(data);
    }
    /******************************2dart **************************************/
    const [art2d, setart2d] = useState("")
    const [art2dq, setart2dq] = useState("")
    const openart2d=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "art2d":true
        };
        await updateDoc(user4Doc,new4Fields);
    }

    const closeart2d=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopen[0].id);
        const new4Fields = {
            ...userDataopen[0],
            "art2d":false
        };
        await updateDoc(user4Doc,new4Fields);
    }
    const addart2d=async()=>{

        const userDoc = doc(db,"website-data",'art2d-videos');

        const response = await fetch (`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${art2d}&maxResults=100&key=AIzaSyDElaQKnLIerUJ2TGO27zZYh5Rl8z1qAzs`)
                const json = await response.json();
                let playlist=json;

                let videosdata=playlist.items.map(v=>({
                    title:v.snippet.title,
                    src:`https://www.youtube.com/embed/${v.snippet.resourceId.videoId}`
                }))

                
        let newFields={
            videos:[
            ...videosdata
            ]
        }
        await updateDoc(userDoc,newFields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
        console.log("done")
    }


    const addart2dquizes=async()=>{
        let data =eval("(" + art2dq + ')')

    const userDoc = doc(db,"website-data",'art2d-quizzes');
    await updateDoc(userDoc,data);
    Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
    console.log(data);
    }

    /****************************************badges**************************************/
    /*bronze c# c#*/
    const [bronze_csharp_csharp, setbronze_csharp_csharp] = useState("")
    const bronze_csharp_csharpset=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
        const new4Fields = {
            ...userDataopenbadges[0],
            "bronze_csharp_csharp":bronze_csharp_csharp
        };
        await updateDoc(user4Doc,new4Fields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
    }
     /*silver c# c#*/
     const [silver_csharp_csharp, setsilver_csharp_csharp] = useState("")
     const silver_csharp_csharpset=async()=>{
         const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
         const new4Fields = {
             ...userDataopenbadges[0],
             "silver_csharp_csharp":silver_csharp_csharp
         };
         await updateDoc(user4Doc,new4Fields);
         Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
     }
    /*gold c# data*/
    const [gold_csharp_data, setgold_csharp_data] = useState("")
    const gold_csharp_dataset=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
        const new4Fields = {
            ...userDataopenbadges[0],
            "gold_csharp_data":gold_csharp_data
        };
        await updateDoc(user4Doc,new4Fields);
        Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
    }
    /*plat c# data*/
    const [plat_csharp_data, setplat_csharp_data] = useState("")
    const plat_csharp_dataset=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
        const new4Fields = {
            ...userDataopenbadges[0],
            "plat_csharp_data":plat_csharp_data
        };
        await updateDoc(user4Doc,new4Fields);
        Swal.fire({
        icon: 'success',
        title: 'تم الارسال'
    })
    } 
    /*bronze c++ c++*/
    const [bronze_cplusplus_cplusplus, setbronze_cplusplus_cplusplus] = useState("")
    const bronze_cplusplus_cplusplusset=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
        const new4Fields = {
            ...userDataopenbadges[0],
            "bronze_cplusplus_cplusplus":bronze_cplusplus_cplusplus
        };
        await updateDoc(user4Doc,new4Fields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
    }
    /*silver c++ c++*/
    const [silver_cplusplus_cplusplus, setsilver_cplusplus_cplusplus] = useState("")
    const silver_cplusplus_cplusplusset=async()=>{
        const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
        const new4Fields = {
            ...userDataopenbadges[0],
            "silver_cplusplus_cplusplus":silver_cplusplus_cplusplus
        };
        await updateDoc(user4Doc,new4Fields);
        Swal.fire({
            icon: 'success',
            title: 'تم الارسال'
        })
    }
     /*silver c++ data*/
     const [gold_cplusplus_data, setgold_cplusplus_data] = useState("")
     const gold_cplusplus_dataset=async()=>{
         const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
         const new4Fields = {
             ...userDataopenbadges[0],
             "gold_cplusplus_data":gold_cplusplus_data
         };
         await updateDoc(user4Doc,new4Fields);
         Swal.fire({
             icon: 'success',
             title: 'تم الارسال'
         })
     }
      /*silver c++ data*/
      const [plat_cplusplus_data, setplat_cplusplus_data] = useState("")
      const plat_cplusplus_dataset=async()=>{
          const user4Doc = doc(db,"opens_sec",userDataopenbadges[0].id);
          const new4Fields = {
              ...userDataopenbadges[0],
              "plat_cplusplus_data":plat_cplusplus_data
          };
          await updateDoc(user4Doc,new4Fields);
          Swal.fire({
              icon: 'success',
              title: 'تم الارسال'
          })
      }
    return (
    <div className="container">
        <div className="dash">
            <h1 className="title underline">Dashboard</h1>
            <div className="programmingsec">
                <h1>programming</h1>
                <div className="sec">
                    {/*                  csharp                    */}
                    <h2> csharp</h2>
                    <p>اضافة فيديوهات السي شارب بكود البلاي ليست</p>
                    <button onClick={opencsharp} className="right10px">افتح</button>
                    <button onClick={closecsharp}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setcsharp(e.target.value)}/>
                    <button onClick={addcsharp}>ارسل</button>
                    <p>اضافة امتحانات السي شارب بكود الجيسون</p>
                    <textarea  onChange={(e)=>setcsharpq(e.target.value)}/>
                    <button onClick={addcsharpquizes}>ارسل</button>
                    <hr/>
                    {/*                  csharp data                    */}
                    <h2> csharp datastructure</h2>
                    <p>اضافة فيديوهات داتاستركشر السي شارب بكود البلاي ليست</p>
                    <button onClick={opencsharpdata} className="right10px">افتح</button>
                    <button onClick={closecsharpdata}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setcsharpdata(e.target.value)}/>
                    <button onClick={addcsharpdata}>ارسل</button>
                    <p>اضافة امتحانات داتاستركشر السي شارب بكود الجيسون</p>
                    <textarea  onChange={(e)=>setcsharpdataq(e.target.value)}/>
                    <button onClick={addcsharpdataquizes}>ارسل</button>
                    <hr/>
                    {/*                  csharp in unity                    */}
                    <h2> csharp in unity</h2>
                    <p>اضافة فيديوهات السي شارب يونتي بكود البلاي ليست</p>
                    <button onClick={opencsharpinunity} className="right10px">افتح</button>
                    <button onClick={closecsharpinunity}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setcsharpinunity(e.target.value)}/>
                    <button onClick={addcsharpinunity}>ارسل</button>
                    <p>اضافة امتحانات السي شارب يونتي بكود الجيسون</p>
                    <textarea  onChange={(e)=>setcsharpinunityq(e.target.value)}/>
                    <button onClick={addcsharpunityquizes}>ارسل</button>
                    <hr/>
                    {/*                   unity engine                    */}
                    <h2>unity engine</h2>
                    <p>اضافة فيديوهات محرك يونتي بكود البلاي ليست</p>
                    <button onClick={openunityengine} className="right10px">افتح</button>
                    <button onClick={closecunityengine}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setunityengine(e.target.value)}/>
                    <button onClick={addunityengine}>ارسل</button>
                    <p>اضافة امتحانات محرك يونتي بكود الجيسون</p>
                    <textarea  onChange={(e)=>setunityengineq(e.target.value)}/>
                    <button onClick={addunityenginequizes}>ارسل</button>
                    <hr/>
                    {/*                  c++                    */}
                    <h2> c++</h2>
                    <p>اضافة فيديوهات السي بلس بلس بكود البلاي ليست</p>
                    <button onClick={opencplusplus} className="right10px">افتح</button>
                    <button onClick={closecplusplus}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setcplusplus(e.target.value)}/>
                    <button onClick={addcplusplus}>ارسل</button>
                    <p>اضافة امتحانات السي بلس بلس بكود الجيسون</p>
                    <textarea  onChange={(e)=>setcplusplusq(e.target.value)}/>
                    <button onClick={addcplusplusquizes}>ارسل</button>
                    <hr/>
                    {/*                  c++ datastructure                    */}
                    <h2> c++ datastructure</h2>
                    <p>اضافة فيديوهات السي بلس بلس داتاستركشر بكود البلاي ليست</p>
                    <button onClick={opencplusplusdata} className="right10px">افتح</button>
                    <button onClick={closecplusplusdata}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setcplusplusdata(e.target.value)}/>
                    <button onClick={addcplusplusdata}>ارسل</button>
                    <p>اضافة امتحانات السي بلس بلس داتاستركشر بكود الجيسون</p>
                    <textarea  onChange={(e)=>setcplusplusqdata(e.target.value)}/>
                    <button onClick={addcplusplusquizesdata}>ارسل</button>
                    <hr/>
                    {/*                  2D art                   */}
                    <h2>2D art </h2>
                    <p>اضافة فيديوهات الرسم التو دي بكود البلاي ليست</p>
                    <button onClick={openart2d} className="right10px">افتح</button>
                    <button onClick={closeart2d}>اقفل</button>
                    <br/>
                    <input  onChange={(e)=>setart2d(e.target.value)}/>
                    <button onClick={addart2d}>ارسل</button>
                    <p>اضافة امتحانات الرسم التو دي بكود الجيسون</p>
                    <textarea  onChange={(e)=>setart2dq(e.target.value)}/>
                    <button onClick={addart2dquizes}>ارسل</button>
                    <hr/>
                    <hr/>
                    {/*                  badges                   */}
                    <h1>badges</h1>
                    {//c# bronze
                    }
                    <h2>c# bronze </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج البرونزي في السي شارب</p>
                    <br/>
                    <div>كورس السي شارب</div>
                    <input onChange={(e)=>setbronze_csharp_csharp(e.target.value)} />
                    <button onClick={bronze_csharp_csharpset}>تعديل</button>
                    {//c# silver
                    }
                    <h2>c# silver </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج الفضي في السي شارب</p>
                    <br/>
                    <div>كورس السي شارب</div>
                    <input onChange={(e)=>setsilver_csharp_csharp(e.target.value)} />
                    <button onClick={silver_csharp_csharpset}>تعديل</button>
                    {//c# gold
                    }
                    <h2>c# Gold </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج الذهبي في السي شارب</p>
                    <br/>
                    <div>كورس داتاستركشر السي شارب</div>
                    <input onChange={(e)=>setgold_csharp_data(e.target.value)} />
                    <button onClick={gold_csharp_dataset}>تعديل</button>
                     {//c# plat
                    }
                    <h2>c# Plat </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج البلاتيني في السي شارب</p>
                    <br/>
                    <div>كورس داتاستركشر السي شارب</div>
                    <input onChange={(e)=>setplat_csharp_data(e.target.value)} />
                    <button onClick={plat_csharp_dataset}>تعديل</button>
                     {//c++ bronze
                    }
                    <h2>c++ bronze </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج البرونزي في السي بلس بلس</p>
                    <br/>
                    <div>كورس السي بلس بلس</div>
                    <input onChange={(e)=>setbronze_cplusplus_cplusplus(e.target.value)} />
                    <button onClick={bronze_cplusplus_cplusplusset}>تعديل</button>
                     {//c++ silver
                    }
                    <h2>c++ silver </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج الفضي في السي بلس بلس</p>
                    <br/>
                    <div>كورس السي بلس بلس</div>
                    <input onChange={(e)=>setsilver_cplusplus_cplusplus(e.target.value)} />
                    <button onClick={silver_cplusplus_cplusplusset}>تعديل</button>
                     {//c++ gold
                    }
                    <h2>c++ gold </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج الذهبي في السي بلس بلس</p>
                    <br/>
                    <div>كورس داتاستركشر السي بلس بلس</div>
                    <input onChange={(e)=>setgold_cplusplus_data(e.target.value)} />
                    <button onClick={gold_cplusplus_dataset}>تعديل</button>
                     {//c++ plat
                    }
                    <h2>c++ plat </h2>
                    <p>للتعديل علي عدد فيديوهات التي يجب فتحها للحصول علي بادج البلاتيني في السي بلس بلس</p>
                    <br/>
                    <div>كورس داتاستركشر السي بلس بلس</div>
                    <input onChange={(e)=>setplat_cplusplus_data(e.target.value)} />
                    <button onClick={plat_cplusplus_dataset}>تعديل</button>
                    <hr/>
                    <hr/>
                    {/*                  codes                   */}
                    <br/>
                    <br/>
                    <h1>كود عشوائي</h1>
                    <br/>
                    <p>{code}</p>
                    <button onClick={getcode}>انشاء كود</button>
                </div>
            </div>
        </div>
    </div>
    )
}
