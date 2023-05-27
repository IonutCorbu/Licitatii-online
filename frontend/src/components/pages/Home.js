import React from "react";
import poza from '../img/intro.jpg'
function Home()
{
    return (
        <div className="container">
  <div className="row" style={{marginTop:"5%"}}>
  <div className="col-md-8">
      <div className="card" style={{ marginBottom: '0%', width: '100%' }}>
        <div className="card-body bg-dark text-light">
          <label htmlFor="descriere" style={{ fontSize: '25px', left: "0" }}>Despre noi</label>
          <p id="descriere">Suntem un site format în favoarea persoanelor care au intenția de a cumpăra un apartament scos la licitație de către administratorul site-ului. Ne propunem să facilităm procesul de cumpărare a unui apartament în cazul căruia există mai mulți doritori.</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '5%', width: '100%' }}>
        <div className="card-body bg-dark text-light">
          <label htmlFor="detalii" style={{ fontSize: '25px' }}>Cum funcționează?</label>
          <p id="detalii">Pentru a putea licita este necesară crearea unui cont. Puteți vizualiza licitațiile doar ca guest, fără a vă crea cont. Există 2 tipuri de utilizatori, utilizatori standard și premium. Utilizatorii premium au întâietate odată ce s-au anunțat ca participanți la licitație. Administratorul are dreptul de vă atenționa prin suspendarea contului dacă încălcați regulile comunității, iar în cazul în care continuați are dreptul de a vă închide permanent contul.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card" style={{marginTop:"10%",marginLeft:"10%"}}>
        <img src={poza} alt="My Logo" className="img-fluid mx-auto d-block" style={{ width: "100%", height: "100%", }} />
      </div>
    </div>
   
  </div>
</div>
    );
}

export default Home;