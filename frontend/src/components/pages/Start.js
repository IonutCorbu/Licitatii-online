import { React, useEffect, useState } from "react";

import { card_style } from "../style/Start_style.js";
import { body_style } from "../style/Start_style.js";
import { houses_style } from "../style/Start_style.js";
import { button_style } from "../style/Start_style.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Start() {

  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/announcements");
      console.log(response.data);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const HandleButtonClick = (id) => {
    navigate(`/anunt?id=${id}`);
    document.location.reload();
  };

  return (
    <>
      <div className="card mt-5" style={card_style}>
        <div className="card-body bg-dark text-light d-flex flex-column align-items-center" style={body_style}>
          <span style={houses_style}>Anunțuri existente</span>
          <div id="anunturi" className="overflow-auto" style={{ width: "100%" }}>
            {announcements && announcements.length > 0 ? (
              announcements.map((announcement) => (
                <button
                  key={announcement.ID}
                  className="btn btn-dark bg-danger"
                  style={button_style} onClick={() => HandleButtonClick(announcement.ID)}
                >
                  {announcement.Titlu} cu  {announcement.Nr_camere} camere la {announcement.Suma_start} de euro
                </button>
              ))
            ) : (
              <p style={{ fontSize: "25px", margin: "5px", minHeight: "20px" }}>
                Nu există anunțuri deocamdată...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;