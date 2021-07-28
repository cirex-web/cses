/* eslint-disable react-hooks/exhaustive-deps */
import react, { useEffect, useState } from "react";
import Odometer from "react-odometerjs";
import css from "./user.module.css";
let getReadableString = (date)=>{
  let time = +new Date()-date;
  time = parseInt(time/1000);
  let seconds = time%60;
  time = parseInt(time/60);
  let minutes = time%60;
  time = parseInt(time/60);
  let hours = time%24;
  time = parseInt(time/24);
  let days = time;
  if(days!==0){
    return days+" days ago";
  }else if(hours!==0){
    return hours+" hours ago";
  }else if(minutes!==0){
    return minutes+" minutes ago";
  }else{
    return seconds+" seconds ago";
  }
}
const User = ({ id }) => {
  let URL = "https://cses.fi/user/" + id;
  URL = "https://api.codetabs.com/v1/proxy/?quest=" + URL;
  const [numSolved, setNumSolved] = useState(0);
  const [userName,setUserName] = useState("--");
  const [timesRendered, setTimesRendered] = useState(0);
  const [lastSubmitted, setLastSubmitted] = useState("--");
  useEffect(() => {
    let fetchData = async () => {
      let myHeaders = new Headers();
      myHeaders.append("cache-control", "no-store");
      
      const ms = Date.now();
      const response = await fetch(URL+"?lol="+ms, {
        // headers: myHeaders,
      });
      var el = document.createElement("html");
      let txt = await response.text();
      el.innerHTML = txt;
      if(txt&&el){
        
        setNumSolved(
          parseInt(
            el.querySelector(`[href='/problemset/user/${id}/']`).innerHTML
          )
        );
        setUserName(el.getElementsByClassName("skeleton")[0].querySelector("title").innerHTML.replace("CSES - User ",""));
        let date = el.getElementsByClassName("skeleton")[0].querySelectorAll("td")[5].innerHTML;
        date+=" GMT+0300";
        setLastSubmitted(getReadableString(new Date(date)));
      }
      
      // const data = await response.json();
    };
    fetchData();
    setTimeout(() => {
      setTimesRendered(timesRendered + 1);
    }, 1000);
  }, [timesRendered]);

  return (
    <div className={css.userContainer}>
      <div className={css.userHeader+" "+css.innerContainer}>{userName}</div>
      <div className={css.odometer+" "+css.innerContainer}>
        <Odometer value={numSolved} />
        <p>Last submitted: {lastSubmitted}</p>
      </div>
    </div>
  );
};

export default User;
