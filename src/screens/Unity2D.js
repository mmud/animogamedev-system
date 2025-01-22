import React,{useLayoutEffect, useState, useRef,useEffect} from 'react'
import "./programming.css"
import {useCollectionData} from "react-firebase-hooks/firestore"
import {db,auth} from "../firebase-config"
import { collection } from "firebase/firestore"
import { query, where,updateDoc,doc } from "firebase/firestore";  
import Videol from '../components/Videol'
import Videot from '../components/Videot'
import "./Quiz.css"
import Swal from "sweetalert2";  

export default function Unity2D() {
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
    

    const userCollectionRef = collection(db,"users")
    const webdataCollectionRef = collection(db,"website-data")
    const queryuser = query(userCollectionRef,where("uid","==",auth.currentUser.uid));
    const [data] = useCollectionData(queryuser,{idField:'id'});
    const [webdata] = useCollectionData(webdataCollectionRef,{idField:'id'});
    let usewebdata = webdata && webdata.filter(m=>m.id ===" i2d-unity-videos");
    const fram = useRef(null);
    const videoslist = useRef(null);
    function useWindowSize() {
        //onresize code
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        //my code
        if(fram.current != null ){
        var framwidth = fram.current.clientWidth;
        var framheight = (9*framwidth)/16;
        fram.current.style.height =`${framheight}px`;
        videoslist.current.style.height =`${framheight + 160}px`;
        }
        return size;
    }
    useWindowSize();
    const [src, setsrc] = useState(usewebdata&&usewebdata[0].videos[0].src)
    const [title, settitle] = useState(usewebdata&&usewebdata[0].videos[0].title)
    const [currenttag, setcurrenttag] = useState(0);
    useEffect(() => {
      setsrc(usewebdata&&usewebdata[0].videos[0].src);
      settitle(usewebdata&&usewebdata[0].videos[0].title)
    })
    
        const clickhandle=(tag)=>{
            setsrc(usewebdata && usewebdata[0].videos[tag].src)
            settitle(usewebdata && usewebdata[0].videos[tag].title)
            setcurrenttag(tag);
            for (let i = 0; i < videoslist.current.childNodes.length; i++) {
                videoslist.current.childNodes[i].classList.remove("current");
            }
            videoslist.current.childNodes[currenttag].classList.add("current");
        }
        useEffect(() => {
            if(videoslist.current.childNodes[currenttag]!==undefined)
            {
                for (let i = 0; i < videoslist.current.childNodes.length; i++) {
                    videoslist.current.childNodes[i].classList.remove("current");
                }
                videoslist.current.childNodes[currenttag].classList.add("current");
            }
        }, [currenttag]);
        
    
    
        //quiz code
        let usequizzes = webdata && webdata.filter(m=>m.id ===" i2d-unity-quizzes");
        //console.log(usequizzes && usequizzes[0][0])
        const quizblock = useRef(null);
        const submitbtn = useRef(null);
        const nextbtn = useRef(null);
        const answers = useRef(null);
        const back = useRef(null);
        const r1 = useRef(null);
        const r2 = useRef(null);
        const r3 = useRef(null);
        const r4 = useRef(null);

        const [q, setq] = useState("");
        const [a1, seta1] = useState("");
        const [a2, seta2] = useState("");
        const [a3, seta3] = useState("");
        const [a4, seta4] = useState("");
        const [img, setimg] = useState(undefined);
        const [currentq,setcurrentq]=useState(0);
    
        const [right, setright] = useState("");
        const [lengthq, setlengthq] = useState(usequizzes && usequizzes[0]? usequizzes[0][currenttag].length:'');
        const [score, setscore] = useState(0);
        
        //console.log(usequizzes && usequizzes[0][currenttag].length);
    
        const [quizcheck, setquizcheck] = useState(0);
        const quizclickhandle=async(tag)=>{
            if(currenttag != tag){
                setcurrentq(0);
            setscore(0);
            let checkeda;
            let righta;
            for (let i = 0; i < answers.current.childNodes.length; i++) {
                    if(answers.current.childNodes[i].childNodes[0].checked){
                            checkeda =answers.current.childNodes[i];
                        }
                        if(answers.current.childNodes[i].style.backgroundColor == "rgb(50, 255, 126)"){
                                righta =answers.current.childNodes[i];
                            }
                        }
                        if(checkeda !== undefined){
                                checkeda.childNodes[0].checked = false;
                                checkeda.style.backgroundColor="#2c2936";
                                righta.style.backgroundColor="#2c2936";
                                righta.style.color="white";
                                submitbtn.current.style.display="block";
                                nextbtn.current.style.display="none";
                            }
            }
    
            function msToTime(s) {
                var ms = s % 1000;
                s = (s - ms) / 1000;
                var secs = s % 60;
                s = (s - secs) / 60;
                var mins = s % 60;
                var hrs = (s - mins) / 60;
                if(hrs==0)
                {
                return  mins + " دقيقة";
                }
                else{
                return hrs + ' ساعة ' + mins + " دقيقة";
                }
              }
              


            if(data && data[0].i2dunityq ==undefined){
                setcurrenttag(tag);
                setright(usequizzes && usequizzes[0][currenttag][currentq].correcta);
                setquizcheck(quizcheck+1);
                //console.log(usequizzes && usequizzes[0][tag][currentq],usequizzes && usequizzes[0][tag].length-1);
                setlengthq(usequizzes && usequizzes[0][tag].length);
                quizblock.current.style.display="block";
                back.current.style.display="block";
            }  
            else if(data[0].i2dunityq[tag] ===undefined)
            {
            //console.log(usequizzes && usequizzes[0][tag]);
            setcurrenttag(tag);
            setright(usequizzes && usequizzes[0][currenttag][currentq].correcta);
            setquizcheck(quizcheck+1);
            //console.log(usequizzes && usequizzes[0][tag][currentq],usequizzes && usequizzes[0][tag].length-1);
            setlengthq(usequizzes && usequizzes[0][tag].length);
            quizblock.current.style.display="block";
            back.current.style.display="block";
            // const userDoc = doc(db,"users",data && data[0].id);
            // let nexttag = tag+1;
            // if(data[0].programming[nexttag] ===undefined)
            // {
            //     const newFields = {programming:{
            //         ...data[0].programming,
            //         [tag]:true,
            //         [nexttag]:false
            //     }};
            //     await updateDoc(userDoc,newFields);
            // }
            // for (let i = 0; i < videoslist.current.childNodes.length; i++) {
            //     videoslist.current.childNodes[i].classList.remove("current");
            // }
            // videoslist.current.childNodes[current].classList.add("current");
            }
            else if((data && data[0].i2dunityq ==undefined) || (data && data[0].i2dunityq[tag]< new Date().getTime()))
            {
                setcurrenttag(tag);
            setright(usequizzes && usequizzes[0][currenttag][currentq].correcta);
            setquizcheck(quizcheck+1);
            //console.log(usequizzes && usequizzes[0][tag][currentq],usequizzes && usequizzes[0][tag].length-1);
            setlengthq(usequizzes && usequizzes[0][tag].length);
            quizblock.current.style.display="block";
            back.current.style.display="block";
            }
            else
            {
                if(localStorage.getItem("codetime")>new Date().getTime())
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'حاول مجددا بعد ' +msToTime( data && data[0].i2dunityqq[tag]- new Date().getTime())
                    })
                }
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: ` حاول مجددا بعد `+msToTime( data && data[0].i2dunityqq[tag]- new Date().getTime())
                    })
                }
            }
            
        }
    
        useEffect(() => {
            addqdata(usequizzes && usequizzes[0][currenttag][currentq],usequizzes && usequizzes[0][currenttag].length-1);
        }, [quizcheck,currenttag]);
        
    
        const addqdata = (obj,count)=>{
            if(obj !== undefined){
            setq(obj.title);
            seta1(obj.a1);
            seta2(obj.a2);
            seta3(obj.a3);
            seta4(obj.a4);
            setimg(obj.img);
            }
        }
    
        const [subcheck, setsubcheck] = useState(0);
    
        const submitClick=()=>{
            r1.current.disabled = true;
            r2.current.disabled = true;
            r3.current.disabled = true;
            r4.current.disabled = true;
            setright(usequizzes && usequizzes[0][currenttag][currentq].correcta);
            setright(usequizzes && usequizzes[0][currenttag][currentq].correcta);
            setsubcheck(subcheck+1);
        }
    
        let righta;
        useEffect(() => {
            checkanswer(right);
        }, [right,subcheck]);
    
        const checkanswer=(rightanswer)=>{
            let checkeda;
            
            let is;
    
            for (let i = 0; i < answers.current.childNodes.length; i++) {
                if(answers.current.childNodes[i].childNodes[0].checked){
                    checkeda =answers.current.childNodes[i];
                }
                if(answers.current.childNodes[i].childNodes[1].innerText === rightanswer)
                {
                    righta = answers.current.childNodes[i];
                }
            }
            is = checkeda === righta;
    
            if(checkeda !== undefined){
                if(!is)
                {
                    checkeda.style.backgroundColor="#ff3838";
                    righta.style.backgroundColor="#32ff7e";
                    righta.style.color="black";
    
                }
                else if(is)
                {
                    righta.style.backgroundColor="#32ff7e";
                    righta.style.color="black";
                    setscore(score+1);
                }
                submitbtn.current.style.display="none";
                nextbtn.current.style.display="block";
            }
    
        }
        
        const nextClick=(rightanswer)=>{
            r1.current.disabled = false;
            r2.current.disabled = false;
            r3.current.disabled = false;
            r4.current.disabled = false;
            if(currentq<lengthq)
            {
                setcurrentq(currentq + 1);
            }
            else
            {
                TheEndOfQuiz();
                closequiz();
            }
        }
    
        useEffect(() => {
        let checkeda;
        let righta;
    
        for (let i = 0; i < answers.current.childNodes.length; i++) {
            if(answers.current.childNodes[i].childNodes[0].checked){
                checkeda =answers.current.childNodes[i];
            }
            if(answers.current.childNodes[i].style.backgroundColor === "rgb(50, 255, 126)"){
                righta =answers.current.childNodes[i];
            }
        }
        if(checkeda != undefined){
            checkeda.childNodes[0].checked = false;
            checkeda.style.backgroundColor="#2c2936";
            righta.style.backgroundColor="#2c2936";
            righta.style.color="white";
            submitbtn.current.style.display="block";
            nextbtn.current.style.display="none";
            if(currentq < lengthq){
                addqdata(usequizzes && usequizzes[0][currenttag][currentq],usequizzes && usequizzes[0][currenttag].length-1);
            }
            else{
                TheEndOfQuiz();
                closequiz();
            }
        }
        }, [currentq])
    
        const closequiz=()=>{                      
            back.current.style.display="none";
            quizblock.current.style.display="none";
        }
    
    
        const TheEndOfQuiz=()=>{
            if(score/lengthq>=0.5)
            {
                //xp
                let xp= score*100;
                if(data[0].i2dunityxp ==undefined || data[0].i2dunityxp[currenttag]<xp || data[0].i2dunityxp[currenttag] === undefined)
                {
                    let newFields;
                    const userDoc = doc(db,"users",(data[0].id));
                    if((data[0].exp+xp)>=((data[0].level+1)*1000)){
                    newFields = {exp:data[0].exp+xp - (data[0].level+1)*1000,level: data[0].level+1};
                    }else if((data[0].exp+xp)!==((data[0].level+1)*1000))
                    {
                        if(data[0].i2dunityxp !== undefined){
                            if(data[0].i2dunityxp[currenttag] !== undefined){
                                newFields={exp:(data[0].exp+xp-data[0].i2dunityxp[currenttag])}
                            }
                            else{
                                newFields={exp:(data[0].exp+xp)}
                                
                            }
                        }
                        else{
                            newFields={exp:(data[0].exp+xp)}
                            
                        }
                    }
            
                    updateDoc(userDoc,newFields);
                    //nextvideo
                    const user2Doc = doc(db,"users",data && data[0].id);
                    let nexttag = currenttag+1;
                    let new2Fields;
                    if(data[0].i2dunity!==undefined)
                    {
                        new2Fields = {i2dunity:{
                            ...data[0].i2dunity,
                            [currenttag]:true,
                            [nexttag]:false
                        }};
                    }
                    else{
                        new2Fields = {i2dunity:{
                            [currenttag]:true,
                            [nexttag]:false
                        }};
                    }
                    updateDoc(user2Doc,new2Fields);
                    
    
                    //save the xp
    
                    const user4Doc = doc(db,"users",data && data[0].id);
                    const new4Fields = {i2dunityxp:{
                        ...data[0].i2dunityxp,
                        [currenttag]:xp,
                    }};
                    updateDoc(user4Doc,new4Fields);
                }
                Swal.fire({
                    icon: 'success',
                    title: 'مبروك',
                    text: `تستطيع الانتقال الي الدرس التالي ${score + "/" + lengthq} درجتك`
                })
                clickhandle(currenttag+1);
            }
            else
            {
                if(localStorage.getItem("codetime")>new Date().getTime())
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'درجتك اقل من النصف',
                        text: `حاول مجددا بعد 10 دقائق`
                    })
                }
                else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'درجتك اقل من النصف',
                        text: `حاول مجددا بعد 3 ساعة`
                    })
                }
                //let date = new Date();
                //date.setTime(date.getTime()+(12*60*60*1000))
    
    
                //new Date().getTime()
    
            }
            if(localStorage.getItem("codetime")>new Date().getTime())
            {
                const user3Doc = doc(db,"users",data && data[0].id);
                let date = new Date();
                const new3Fields = {i2dunityq:{
                    ...data[0].i2dunityq,
                    [currenttag]:date.setTime(date.getTime()+(10*60*1000))
                }};
                updateDoc(user3Doc,new3Fields);
            }
            else
            {
                const user3Doc = doc(db,"users",data && data[0].id);
                let date = new Date();
                const new3Fields = {i2dunityq:{
                    ...data[0].i2dunityq,
                    [currenttag]:date.setTime(date.getTime()+(3*60*60*1000))
                }};
                updateDoc(user3Doc,new3Fields);
            }
            
            setcurrentq(0);
            setscore(0);
            let checkeda;
            let righta;
            back.current.style.display="none";
            for (let i = 0; i < answers.current.childNodes.length; i++) {
                if(answers.current.childNodes[i].childNodes[0].checked){
                    checkeda =answers.current.childNodes[i];
                }
                if(answers.current.childNodes[i].style.backgroundColor == "rgb(50, 255, 126)"){
                    righta =answers.current.childNodes[i];
                }
            }
            if(checkeda !== undefined){
                checkeda.childNodes[0].checked = false;
                checkeda.style.backgroundColor="#2c2936";
                righta.style.backgroundColor="#2c2936";
                righta.style.color="white";
                submitbtn.current.style.display="block";
                nextbtn.current.style.display="none";
            }
    
        }
    
        const loadb = useRef(null)
        const loads = useRef(null)
        if(webdata!=undefined){
            setTimeout(() => {
                loads.current.style.display="none";
                loadb.current.style.display="none";
            }, 300);
        }
    
        return (
            <div className="container">
                <div className="loadingback" ref={loadb}></div>
            <div className="boxLoading" ref={loads}></div>
                <div className="back" ref={back}></div>
            {/*
                -------------------the quiz---------------------
            */}
                <div className="Quiz" >
                    <div className="quiz-app"ref={quizblock}>
                        <i className="fas fa-times" onClick={closequiz}></i>
                        <div className="quiz-info">
                            <div className="category">Category: <span>2D Unity</span></div>
                            <div className="count"><span>{currentq + 1}</span> : <span>{lengthq}</span></div>
                        </div>
                        <div className="quiz-area">
                            <h2>{q}</h2>
                            {img!=undefined?<img src={img} alt="qimg" />:""}
                        </div>
                        <div className="answers-area" ref={answers}>
                            <div className="answer">
                                <input type="radio" id="a1" name='ques' ref={r1}/>
                                <label htmlFor="a1">{a1}</label>
                            </div>
                            <div className="answer">
                                <input type="radio" id="a2" name='ques' ref={r2}/>
                                <label htmlFor="a2">{a2}</label>
                            </div>
                            <div className="answer">
                                <input type="radio" id="a3" name='ques' ref={r3}/>
                                <label htmlFor="a3">{a3}</label>
                            </div>
                            <div className="answer">
                                <input type="radio" id="a4" name='ques' ref={r4}/>
                                <label htmlFor="a4">{a4}</label>
                            </div>
                        </div>
                        <button className="submit-button" ref={submitbtn} onClick={submitClick}>Submit Answer</button>
                        <button className="next-button" ref={nextbtn} onClick={()=>nextClick(usequizzes && usequizzes[0][currenttag][currentq].correcta)}>Next Question</button>
                    </div>
                </div>
                {/*
                -------------------the body---------------------
                 */}
            <h1 className="title">{title}</h1>
                <div className="programming">
                    <div className="videoside">
                        <iframe ref={fram}  width="100%" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <br/>
                        <br/>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9721699003407663"
                            crossOrigin="anonymous"></script>
                        <ins className="adsbygoogle"
                            style={{display:"block"}}
                            data-ad-client="ca-pub-9721699003407663"
                            data-ad-slot="6053106568"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                    <div className="listside">
                        <h2>محتويات القسم</h2>
                        <div className="videosList" ref={videoslist}>
    
                        {
                            usewebdata && usewebdata[0].videos.map((item,i) => {
                                if(data&&data[0].codetime == 9999999999999)
                                {
                                    return <Videol status="t" title={item.title} keyt={i} key={i} handleclick={clickhandle} quizclick={quizclickhandle}/>
                                }
                                else if(i===0 &&data[0].i2dunity==undefined)
                                {
                                    return(
                                        <Videol status="f" title={item.title} keyt={i} key={i} handleclick={clickhandle} quizclick={quizclickhandle}/>
                                        )
                                }
                                else if(data[0].i2dunity && data[0].i2dunity[i]===false){
                                    return(
                                    <Videol status="f" title={item.title} keyt={i} key={i} handleclick={clickhandle} quizclick={quizclickhandle}/>
                                    )
                                }else if(data[0].i2dunity && data[0].i2dunity[i] === true)
                                {
                                    return <Videol status="t" title={item.title} keyt={i} key={i} handleclick={clickhandle} quizclick={quizclickhandle}/>
                                }else if(data[0].i2dunity ==undefined || data[0].i2dunity && data[0].i2dunity[i] === undefined)
                                {
                                    return <Videot status="u" title={item.title} keyt={i} key={i}/>
                                }
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    /*
<button onClick={async()=>{
    const userDoc = doc(db,"users",data && data[0].id);
        let nexttag = tag+1;
        const newFields = {programming:{
            ...data[0].programming,
            [tag]:true,
            [nexttag]:false
        }};
        await updateDoc(userDoc,newFields);
        if(data){
            console.log(data[0].programming);
        };
}}>ppppp</button>


{console.log(usewebdata && usewebdata[0].videos)}
                    {console.log(data && data[0].programming)}

*/
