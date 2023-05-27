import {React,useEffect,useState} from "react";
import {card_style}from "../style/Admin_style.js";
import {body_style}from "../style/Admin_style.js";
import {title_users}from "../style/Admin_style.js";
import {button_style}from "../style/Admin_style.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPage(){
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const HandleButtonClick = (id) => {
    navigate(`/user?id=${id}`);
    document.location.reload();
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users"); 
      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error:", error);
    }
  };
return (
    <>
    <div className="card mt-5"style={card_style} >
    <div className="card-body bg-dark text-light d-flex flex-column align-items-center" style={body_style}>
        <span style={title_users}>Utilizatori existenți</span>
        <div id="useri" className="overflow-auto" style={{ width: "100%" }}>
            {users.map((user) => (
              <button key={user.ID} className="btn btn-dark bg-primary" style={button_style} onClick={() => HandleButtonClick(user.ID)}>
                {user.Username}
              </button>
            ))}
          </div>
    </div>
    </div>
  </>
);
}
export default AdminPage;