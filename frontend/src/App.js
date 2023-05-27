import React from 'react';
import Home from  './components/pages/Home.js'
import Header from './components/inc/Header.js';
import Footer from './components/inc/Footer.js';
import Login from './components/pages/Login.js'
import Register from './components/pages/Register.js';
import Start from './components/pages/Start.js';
import AdminPage from './components/pages/AdminPage.js';
import Carusel from './components/pages/Carusel.js';
import Recovery from './components/pages/Recovery.js';
import Edit from './components/pages/Edit.js';
import NewPost from './components/pages/New_Post.js';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './App.css';
import HeaderAdmin from './components/inc/Header_Admin.js';
import Anunt from './components/pages/Anunt.js';
import User from './components/pages/User.js';
import Licitatii from './components/pages/Licitatii.js';
const root = createRoot(document.getElementById("root"));
root.render(<App />);

function verifytoken(){
  const token = get_cookie("username");
  if(token)
    return true;
  return false;
}

function get_cookie(name){
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
}

function App() {
  var logged=verifytoken();
  const userCookie = document.cookie.split("; ").find((row) => row.startsWith("username="));
  const user = userCookie ? userCookie.split("=")[1] : null;

  return (
      
      <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<div className="home-page" ><Header/><Home/><Footer/></div>}></Route>
              <Route path='/login' element={<div className="login-page"><Header/><Login/><Footer/></div>}></Route>
              <Route path='/register' element={<div className="register-page"><Header/><Register/><Footer/></div>}></Route>
              {logged&&user==='admin'&&<Route path="/user" element={<div className="user-page"><HeaderAdmin/><User/><Footer/></div>} />}
              {logged&&<Route path="/start" element={<div className="start-page"><Header/><Start /><Footer/></div>} />}
              {logged&&user==='admin'&&<Route path="/admin_page" element={<div className="admin-page"><HeaderAdmin/><AdminPage /><Footer/></div>} />}
              {logged&&user==='admin'&&<Route path="/carusel" element={<div><HeaderAdmin/><Carusel/><Footer/></div>} />}
              <Route path="/carusel" element={<div><Header/><Carusel/><Footer/></div>} />
              <Route path="/recovery" element={<div className='recovery-page'><Header/><Recovery/><Footer/></div>} />
              {logged &&user==='admin'&& <Route path="/edit" element={<div className='recovery-page'><HeaderAdmin/><Edit/><Footer/></div>} />}
              {logged&&user==='admin'&&<Route path="/new_post" element={<div className='new_post-page'><HeaderAdmin/><NewPost/><Footer/></div>} />}
              {logged&&user==='admin'&&<Route path="/anunt" element={<div className='anunt-page'><HeaderAdmin/><Anunt/><Footer/></div>} />}
              {logged&&user==='admin'&&<Route path="/istoric" element={<div className='licitatii-page'><HeaderAdmin/><Licitatii/><Footer/></div>} />}
              {logged&&<Route path="/istoric" element={<div className='licitatii-page'><Header/><Licitatii/><Footer/></div>} />}
              {logged&&<Route path="/anunt" element={<div className='anunt-page'><Header/><Anunt/><Footer/></div>} />}
              {logged&&<Route path="/edit" element={<div className='recovery-page'><Header/><Edit/><Footer/></div>} />}
              {logged&&<Route path="/new_post" element={<div className='new_post-page'><Header/><NewPost/><Footer/></div>} />}

            </Routes>
          </div>
      </Router>
  );
}

export default App;
