import react, { useEffect, useState } from "react";
import Odometer from "react-odometerjs";

const User = ({ id }) => {
  let URL = "https://cses.fi/user/" + id;
  URL = "https://api.codetabs.com/v1/proxy/?quest=" + URL;
  const [numSolved, setNumSolved] = useState(0);
  const [timesRendered, setTimesRendered] = useState(0);
  useEffect(() => {
    let fetchData = async () => {
      let myHeaders = new Headers();
      myHeaders.append("cache-control", "no-store");
      
      const ms = Date.now();
      const response = await fetch(URL+"?lol="+ms, {
        // headers: myHeaders,
      });
      var el = document.createElement("html");
      
      el.innerHTML = (await response.text()) || "";
      setNumSolved(
        parseInt(
          el.querySelector(`[href='/problemset/user/${id}/']`)?.innerHTML
        )
      );
      // const data = await response.json();
    };
    fetchData();
    setTimeout(() => {
      setTimesRendered(timesRendered + 1);
    }, 1000);
  }, [timesRendered]);

  return (
    <div className="user-container">
      <Odometer value={numSolved} />
    </div>
  );
};

export default User;
