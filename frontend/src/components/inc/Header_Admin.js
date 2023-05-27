import React from "react";
import {Link} from "react-router-dom";
import { h1_style } from "../style/Header_style.js";
import { user_style } from "../style/Header_style.js";
import {navItemStyle} from "../style/Header_style.js"

function setGuest() {
  document.cookie = "username=guest; path=/";
}

function verifyToken() {
  const token = get_cookie("username");
  if (token) return true;
  return false;
}

function get_cookie(name) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}

function delete_cookie(name, path, domain) {
  if (get_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function handleLogout() {
  delete_cookie("username", "/", null);
  delete_cookie("token", "/", null);
  delete_cookie("refresh","/",null);
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

function HeaderAdmin() {
  const logged = verifyToken();
  const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="));
  const user = userCookie ? userCookie.split("=")[1] : null;

  return (
    <nav class="navbar bg-black navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <h1
          class="navbar-brand bg-danger p-3 font-weight-bold text-light text-5 text-center"
          style={h1_style}
        >
          Licitații imobiliare
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-5" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            {logged ? (
              <>
                <li class="nav-item">
                  <Link
                    to="/istoric"
                    class="nav-link active text-light btn btn-primary"
                    style={navItemStyle}
                  >
                    Licitații din trecut
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link
                    to="/start"
                    class="nav-link active text-light btn btn-primary"
                    style={navItemStyle}
                  >
                    Licitații disponibile
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link
                    to="/edit"
                    class="nav-link active text-light btn btn-primary"
                    style={navItemStyle}
                  >
                    Editează profil
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link
                    to="/new_post"
                    class="nav-link active text-light btn btn-primary"
                    style={navItemStyle}
                  >
                    Adaugă anunț
                  </Link>
                </li>
                <li class="nav-item ms-3">
                  <Link
                    to="/admin_page"
                    class="nav-link active text-light btn btn-primary"
                    style={navItemStyle}
                  >
                    Pagina de admin
                  </Link>
                </li>
                <li class="nav-item ms-5 me-2">
                  <Link
                    to="/login"
                    class="nav-link active text-light"
                    onClick={handleLogout}
                    style={navItemStyle}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <Link
                    to="/"
                    class="nav-link active text-light"
                    style={navItemStyle}
                  >
                    Acasă
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/login"
                    class="nav-link active text-light"
                    style={navItemStyle}
                  >
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/register"
                    class="nav-link active text-light"
                    style={navItemStyle}
                  >
                    Register
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/start"
                    onClick={setGuest}
                    class="nav-link active text-light"
                    style={navItemStyle}
                  >
                    Continuă ca guest
                  </Link>
                </li>
              </>
            )}
            <li class="nav-item">
              <Link
                to="/carusel"
                class="nav-link active text-light"
                style={navItemStyle}
              >
                Galerie de imagini
              </Link>
            </li>
          </ul>
        </div>
          <span style={user_style} class="ms-2">
            User logat: <i>{user}</i>
          </span>
      </div>
    </nav>
  );
}

export default HeaderAdmin;