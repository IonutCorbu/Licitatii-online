import  {React, useState, useEffect } from "react";
import axios from "axios";
import { details_style } from "../style/User_style";
import { username_style } from "../style/User_style";
import { email_style,data_style,rol_style } from "../style/User_style";
import {button_style} from "../style/User_style"
import { useNavigate } from "react-router-dom";


const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
  
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);
    const [data,time]=formattedDate.split(",");
    const [month, day, year] = data.split("/");
    var [hour,minute,second]=time.split(":");
  
    if(hour==24)
        hour="00";
    return `${day}-${month}-${year}, ${hour}:${minute}:${second}`;
  };

  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
  
    return null; 
  }


function User() {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        const response = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []);


  const handleDeleteUser=async ()=>{
    if (window.confirm("Sunteți sigur că doriți să ștergeți utilizatorul "+user.Username+"?")){
        try {
            await axios.delete(`http://localhost:5000/api/user/${user.ID}`);
            console.log("User deleted successfully");
            navigate("/admin_page");
        } catch (error) {
            console.error("Error:", error);
        }
    }
  }

  return (
    <div>
      {user ? (
        <>
          
          <div style={details_style}>
            <h1 style={username_style}>{user.Username}</h1>
            <span style={email_style}>Email: {user.Email}</span>
            <span style={rol_style}>Rolul userului: {user.Rol}</span>
            <span style={data_style}>Data nașterii: {formatDate(user.Data_nasterii)}</span>
            <span style={data_style}>Data înregistrării în platformă: {formatDate(user.Data_inregistrare)}</span>
            <button className="btn btn-danger mt-3" style={button_style} onClick={handleDeleteUser}>Șterge utilizatorul</button>
          </div>
          
        </>
      ) : (
        <p>Nu există userul</p>
      )}
    </div>
  );
}

export default User;