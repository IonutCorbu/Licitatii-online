import React from "react";
import { form_style } from "../style/Edit_style.js";
import { div_style } from "../style/Edit_style.js";
import { label_style } from "../style/Edit_style.js";
import { h1_style } from "../style/Edit_style.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const userCookie = document.cookie.split("; ").find((row) => row.startsWith("username="));
  const user = userCookie ? userCookie.split("=")[1] : null;

  const Edithandler = async (event) => {
    event.preventDefault();

    const username=document.getElementById("user");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirmation");
    const email = document.getElementById("email");
    const date = document.getElementById("date");

    console.log(username.value);
    const updatedData = {};
    updatedData.logged=user;
    if (password.value === confirm.value && password.value !== "") {
      updatedData.Parola = password.value;
    }

    if (date.value !== "") {
      updatedData.Data_nasterii = date.value;
    }

    if (email.value !== "") {
      updatedData.Email = email.value;
    }

    if (username.value !== "") {
      updatedData.Username = username.value;
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        console.log(updatedData);
        const response = await axios.put("http://localhost:5000/api/users", updatedData);
        if (response.data.success) {
          if(updatedData.Username!=="")
          {
            document.cookie = `username=${updatedData.Username}; expires=expiryDate; path=/`;
            document.location.reload();
          }
          if (window.confirm("Datele au fost modificate cu succes!")) {
            navigate("/start");
          }
        } else {
          alert("A apărut o eroare. Vă rugăm să încercați din nou.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("A apărut o eroare. Vă rugăm să încercați din nou.");
      }
    } else {
      alert("Toate câmpurile sunt nule!");
    }
  };

  return (
    <div>
      <div style={div_style}>
        <h1 style={h1_style}>Editare profil</h1>
        <form
          className="d-flex flex-column align-items-center"
          style={form_style}
          onSubmit={Edithandler}
        >
          <div class="form-group">
            <label for="date" style={label_style}>
              Data nașterii
            </label>
            <input
              type="date"
              class="form-control"
              id="date"
              placeholder="Data nașterii"
              style={{ width: "100%" }}
            />
          </div>
          <div class="form-group ">
            <label for="email" style={label_style}>
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              style={{ width: "100%" }}
            />
          </div>
          <div class="form-group ">
            <label for="user" style={label_style}>
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="user"
              aria-describedby="emailHelp"
              placeholder="Enter a username"
              style={{ width: "100%" }}
            />
          </div>
          <div class="form-group">
            <label for="password" style={label_style}>
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              style={{ width: "100%" }}
            />
          </div>
          <div class="form-group">
            <label for="confirmation" style={label_style}>
              Confirmation Password
            </label>
            <input
              type="password"
              class="form-control"
              id="confirmation"
              placeholder="Confirmation"
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit" class="btn btn-danger mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;