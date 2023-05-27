import React from "react";
import { form_style } from '../style/Register_style.js';
import { h1_style } from '../style/Register_style.js';
import { div_style } from '../style/Register_style.js';
import { label_style } from "../style/Register_style.js";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import emailjs from 'emailjs-com';

function Register() {
  const navigate = useNavigate();

  async function Registerhandler(event) {
    event.preventDefault(); 
    
    const dateOfBirth = document.getElementById('date').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmation').value;

    const registrationData = {
      dateOfBirth: dateOfBirth,
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/register', registrationData);
      console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        alert('Înregistrare realizată cu succes!');
        emailjs.init('');//stearsa pentru a nu fi folosita pentru trimitere de emailuri prin EmailJS
        var params = {
          to: email,
          to_name: username
        };
        emailjs.send('', '', params);//sterse pentru a nu fi folosite pentru trimitere de emailuri prin EmailJS
        navigate('/start');
        document.cookie = `username=${username}; path=/`;
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/`;
      } else {
        if (response.status === 409) {
          alert('Înregistrare eșuată. Username sau email deja folosit.');
        } else {
          alert('Înregistrare eșuată. Verificați formularul și încercați din nou.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 409) {
        alert('Înregistrare eșuată. Username sau email deja folosit.');
      } 
      else if (error.response && error.response.status === 400) {
        alert('Înregistrare eșuată. Parolele nu coincid.');
      }
      else {
        alert('Încearcă mai târziu!');
      }
    }
  }

  return (
    <div style={div_style}>
      <h1 style={h1_style}>Pagina de Register</h1>
      <form className="d-flex flex-column align-items-center" style={form_style} onSubmit={Registerhandler}>
        <div className="form-group">
          <label htmlFor="date" style={label_style}>Data nașterii</label>
          <input type="date" className="form-control" id="date" placeholder="Data nașterii" style={{ width: "100%" }} />
        </div>
        <div className="form-group">
          <label htmlFor="email" style={label_style}>Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" style={{ width: "100%" }} />
        </div>
        <div className="form-group">
          <label htmlFor="user" style={label_style}>Username</label>
          <input type="text" className="form-control" id="user" aria-describedby="emailHelp" placeholder="Enter a username" style={{ width: "100%" }} />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={label_style}>Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" style={{ width: "100%" }} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmation" style={label_style}>Confirmation Password</label>
          <input type="password" className="form-control" id="confirmation" placeholder="Confirmation" style={{ width: "100%" }} />
        </div>
        <NavLink className="navbar-item mt-2" activeClassName="is-active" to="/login" exact>Aveți deja un cont?</NavLink>
        <button type="submit" className="btn btn-danger mt-3">Submit</button>
      </form>
    </div>
  );
}

export default Register;
