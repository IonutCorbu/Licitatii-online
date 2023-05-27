import  {React, useState, useEffect } from "react";
import axios from "axios";
import { h1_style } from "../style/Anunt_style";
import { pret_style } from "../style/Anunt_style";
import {descriere_style} from "../style/Anunt_style"
import { zona_style } from "../style/Anunt_style";
import {center_style} from "../style/Anunt_style";
import {data_style} from "../style/Anunt_style";
import {form_style} from "../style/Anunt_style";
import {label_style} from "../style/Anunt_style";
import {position_style} from "../style/Anunt_style";
import {preturi_style} from "../style/Anunt_style";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
    month: "2-digit",
    year: "numeric",
    };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", options);
    
    const [month, day, year] = formattedDate.split("/");
  
    return `${day}-${month}-${year}`;
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


function Anunt() {
  const [announcement, setAnnouncement] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        console.log(id);
        const response = await axios.get(`http://localhost:5000/api/announcements/${id}`);
        setAnnouncement(response.data.announcement);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchAnnouncement();
  }, []);


  const navigate=useNavigate();

  async function licitationHandler(event) {
    event.preventDefault();
  
    const sum = document.getElementById("suma").value;
    const username = getCookie("username");
  
    const data = {
      ID_anunt: id,
      username: username,
      suma: sum,
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/licitations", data);
  
      console.log("Licitation inserted successfully");
      if(window.confirm("Licitație depusă cu succes.Doriti să reveniți la pagina de start?"))
      {
        navigate("/start");
        document.location.reload();
      }
      console.log(response.data);
  
    } catch (error) {
        if(error.response.status===400)
        {
            alert("Suma nu este mai mare decat suma inițială și cea mai mare licitare");
        }
      console.error("Error:", error.response.data); 
    }
  }

  return (
    <div>
      {announcement ? (
        <>
          <h1 style={h1_style}>{announcement.Titlu}</h1>
          <div style={descriere_style}>
          <span style={zona_style}>
            {announcement.Zona}
          </span>
          <div style={preturi_style}>
            <span style={pret_style}>
                Suma de start: {announcement.Suma_start} euro
            </span>
            <span style={pret_style} >
                Suma actuală: {announcement.maxSuma} euro
            </span>
          </div>
          
          </div>
          <div style={center_style}>
            <span>
                {announcement.Descriere}
            </span>
          </div>
          <div>
          <div style={data_style}>
          <span >
            Data terminării licitației: {formatDate(announcement.Data_final)}
          </span>
          </div>
          
          {getCookie("username")!="guest"?(<form style={form_style}>
            <div style={position_style}>
              <label style={label_style} for="suma">Licitarea dumneavoastră: </label>
              <input className="form-control"
                type="number"
                id="suma"
              />
            </div>
            <button type="submit" onClick={licitationHandler} className="btn btn-danger mt-3">Licitează</button>
          </form>):(<></>)}
          </div>
          
        </>
      ) : (
        <p>Nu există anunțul</p>
      )}
    </div>
  );
}

export default Anunt;