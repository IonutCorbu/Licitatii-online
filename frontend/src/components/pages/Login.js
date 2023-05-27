import React from "react";
import { NavLink } from "react-router-dom";
import {form_style} from '../style/Login_style.js';
import {h1_style} from '../style/Login_style.js';
import {div_style} from '../style/Login_style.js'
import { label_style } from "../style/Login_style.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login()
{

  const navigate = useNavigate();

  async function loginHandler(event) {
    event.preventDefault();
    const username = document.getElementById('user').value;
    const password = document.getElementById('password').value;
  
    const loginData = {
      username: username,
      password: password
    };
    try {
      console.log(loginData);
      const response = await axios.post('http://localhost:5000/auth/login', loginData);
      if (response.status === 200) {
        const token = response.data.token;
        console.log(response.data.rol);
        alert('Logare reușită');
        if(response.data.rol==="STANDARD"){
          document.cookie = `username=${username}; path=/`;
          localStorage.setItem('token', token);
          document.cookie = `token=${token}; path=/`;
          navigate('/start');
          document.location.reload();
        }
        else if(response.data.rol==="ADMIN"){
          document.cookie = `username=${username}; path=/`;
          localStorage.setItem('token', token);
          document.cookie = `token=${token}; path=/`;
          navigate('/admin_page');
          document.location.reload();
        }
        
      } 
    } catch (error) {
      if(error.response.status===401)
      {
        alert('Credentiale gresite');
      }
      else{
      console.error('Error:', error);
      alert('Încearcă mai târziu');
      }
    }
  }

    return (
        <div style={div_style}>
            <h1 style={h1_style}>Pagina de Login</h1>
        <form className="d-flex flex-column align-items-center" onSubmit={loginHandler} style={form_style}>
        <div class="form-group ">
          <label for="user" style={label_style}>Username</label>
          <input type="text" className="form-control" id="user" aria-describedby="userlHelp" placeholder="Enter username" style={{width:"100%"}}/>
        </div>
        <div class="form-group">
          <label for="password" style={label_style}>Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter Password" style={{width:"100%"}}/>
        </div>
        <NavLink className="navbar-item mt-2" activeClassName="is-active" to="/recovery" exact>Ați uitat parola?</NavLink>
        <NavLink className="navbar-item" activeClassName="is-active" to="/register" exact>Creați un cont</NavLink>
        <button type="submit" className="btn btn-danger mt-3">Submit</button>
      </form>
      </div>
    );
}

export default Login;