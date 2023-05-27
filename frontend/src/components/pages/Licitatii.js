import { React, useEffect, useState } from "react";
import { card_style } from "../style/Start_style.js";
import { body_style } from "../style/Start_style.js";
import { houses_style } from "../style/Start_style.js";
import { text_style } from "../style/Licitatii_style.js";
import { button_style } from "../style/Start_style.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Licitatii() {

  const navigate = useNavigate();
  const [licitations, setLicitations] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/licitations");
      console.log(response.data);
      setLicitations(response.data.apartments);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <div className="card mt-5" style={card_style}>
        <div className="card-body bg-dark text-light d-flex flex-column align-items-center" style={body_style}>
          <span style={houses_style}>Licitații finalizate</span>
          <div id="anunturi" className="overflow-auto" style={{ width: "100%" }}>
            {licitations && licitations.length > 0 ? (
              licitations.map((licitation) => (
                <span
                  key={licitation.ID}
                  className="card bg-danger"
                  style={text_style}
                >
                  {licitation.Titlu} cu {licitation.Nr_camere} câștigat de {licitation.Username}  la valoarea  de {licitation.suma} de euro
                </span>
              ))
            ) : (
              <p style={{ fontSize: "25px", margin: "5px", minHeight: "20px" }}>
                Nu există licitații finalizate deocamdată...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Licitatii;