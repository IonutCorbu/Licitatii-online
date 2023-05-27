import React from "react"
import { Link } from "react-router-dom";
function Footer(){
   return (
    <footer className=" text-center text-lg-start" style={{ marginTop: '15%',backgroundColor:'#cccccc' }}>
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase mt-3 ">Licență de utilizare a numelui</h5>

          <p>
            Drepturile pentru utilizarea numelui sunt rezervate.
          </p>
        </div>

        <div className="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
          <h5 className="text-uppercase mb-0">Linkuri</h5>

          <ul className="list-unstyled mt-3">
            <li class="nav-item">
                <Link to="/" class="nav-link active text-light btn btn-dark mb-2 p-2">Acasă</Link>
            </li>
            <li class="nav-item">
                <Link to="/carusel" class="nav-link active text-light btn btn-dark p-2">Galerie de imagini</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    &#169; {new Date().getFullYear()} Licitații imobiliare
    </div>
  </footer>
);
}

export default Footer