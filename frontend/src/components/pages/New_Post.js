import React from "react";
import {form_style} from '../style/New_Post_style.js';
import {h1_style} from '../style/New_Post_style.js';
import {div_style} from '../style/New_Post_style.js'
import { label_style } from "../style/New_Post_style.js";
import { useNavigate } from "react-router-dom";
import { p_style } from "../style/New_Post_style.js";
import axios from 'axios';
function NewPost()
{
  const userCookie = document.cookie.split("; ").find((row) => row.startsWith("username="));
  const user = userCookie ? userCookie.split("=")[1] : null;
  const navigate = useNavigate();
  async function postHandler(event) {
      event.preventDefault(); 
    
      const sumaStart = document.getElementById("suma_start").value;
      const dataFinal = document.getElementById("data_final").value;
      const titlu = document.getElementById("titlu").value;
      const zona = document.getElementById("zona").value;
      const nrCamere = document.getElementById("nr_camere").value;
      const descriere = document.getElementById("descriere").value;
    
      const announcement = {
        user,
        sumaStart,
        dataFinal,
        titlu,
        zona,
        nrCamere,
        descriere
      };
    
      try {
        const response = await axios.post("http://localhost:5000/api/announcements", announcement);
    
        console.log(response.data);
    
        document.getElementById("suma_start").value = "";
        document.getElementById("data_final").value = "";
        document.getElementById("titlu").value = "";
        document.getElementById("zona").value = "";
        document.getElementById("nr_camere").value = "";
        document.getElementById("descriere").value = "";
        
        if(window.confirm("Anunț adăugat cu succes. Doriți să vă întoarceți la pagina principală?"))
            navigate("/start");
      } catch (error) {
        console.error("Error:", error);
      }
  }
  

    return (
      <>
        <div style={div_style}>
            <h1 style={h1_style}>Anunț nou</h1>
            <p style={p_style}>Aplicația noastră vă oferă posibilitatea să adăugați noi anunțuri</p>
        <form className="d-flex flex-column align-items-center" onSubmit={postHandler} style={form_style}>
        <div class="form-group ">
          <label for="suma_start" style={label_style}>Suma de start (în euro)</label>
          <input type="number" className="form-control" id="suma_start" aria-describedby="userlHelp" placeholder="Introdu o sumă" style={{width:"100%"}}/>
        </div>
        <div class="form-group">
          <label for="data_final" style={label_style}>Data încheierii</label>
          <input type="datetime-local" className="form-control" id="data_final" style={{width:"100%"}}/>
        </div>
        <div class="form-group">
          <label for="titlu" style={label_style}>Titlu anunț</label>
          <input type="text" className="form-control" id="titlu" placeholder="Introdu un titlu" style={{width:"100%"}}/>
        </div>
        <div class="form-group">
          <label for="zona" style={label_style}>Alege o zonă:</label>
          <select id="zona" style={{width:"100%"}}>
            <option>Alba</option>
            <option>Arad</option>
            <option>Argeș</option>
            <option>Bacău</option>
            <option>Bihor</option>
            <option>Bistrița-Năsăud</option>
            <option>Botoșani</option>
            <option>Brașov</option>
            <option>Brăila</option>
            <option>București - sector 1</option>
            <option>București - sector 2</option>
            <option>București - sector 3</option>
            <option>București - sector 4</option>
            <option>București - sector 5</option>
            <option>București - sector 6</option>
            <option>Buzău</option>
            <option>Caraș-Severin</option>
            <option>Călărași</option>
            <option>Cluj</option>
            <option>Constanța</option>
            <option>Covasna</option>
            <option>Dâmbovița</option>
            <option>Dolj</option>
            <option>Galați</option>
            <option>Giurgiu</option>
            <option>Gorj</option>
            <option>Harghita</option>
            <option>Hunedoara</option>
            <option>Ialomița</option>
            <option>Iași</option>
            <option>Ilfov</option>
            <option>Maramureș</option>
            <option>Mehedinți</option>
            <option>Mureș</option>
            <option>Neamț</option>
            <option>Olt</option>
            <option>Prahova</option>
            <option>Satu Mare</option>
            <option>Sălaj</option>
            <option>Sibiu</option>
            <option>Suceava</option>
            <option>Teleorman</option>
            <option>Timiș</option>
            <option>Tulcea</option>
            <option>Vaslui</option>
            <option>Vâlcea</option>
            <option>Vrâncea</option>
          </select>    
          </div>
          <div class="form-group">
          <label for="nr_camere" style={label_style}>Număr de camere</label>
          <select id="nr_camere" style={{width:"100%"}}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="descriere" style={label_style}>Enter your message:</label>
          <textarea id="descriere" placeholder="Scrieți o descriere" rows="4" cols="50"></textarea>
        </div>
        <button type="submit" className="btn btn-danger mt-3">Submit</button>
      </form>
      </div>
      </>
    );
}

export default NewPost;