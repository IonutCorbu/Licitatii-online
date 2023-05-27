În arhiva trimisă nu am atașat și node_modules, folderul generat de comanda npx create-react-app proiect. Pentru a putea testa proiectul, sunt necesare următoarele comenzi:

npx create-react-app proiect --pentru crearea folderului care a facilitat dezvoltarea proiectului am folosit 
cd proiect
npm start => pentru a vedea în timp real modificările aduse

De asemenea, proiectul nu poate fi verificat dacă fișierele au extensia .tojs(cel putin app.tojs). 

Paginile au fost create în folderul pages, iar imaginile folosite pe fundalul lor în folderul img.
-  Home pageul are rolul de a întâmpina utilizatorii explicând rolul aplicației.Permite trecerea către login/register/homepage (prin opțiunea Continuă ca guest).

-  Login page-ul realizează trecerea către Start page după efectuarea logării. De asemenea, permite trecerea la pagina de Recovery password sau la pagina de register.

- Register page-ul realizează crearea unui cont prin completarea câmpurilor: user,password,confirmation password,data de naștere și email.

- Recovery page-ul are rolul de a genera o parolă random pentru a te conecta și a o schimba ulterior din Edit page. Trimiterea parolei generate aleator se face cu ajutorul EmailJs
    Pentru Emailjs a trebuit să instalez libraria:

npm install emailjs

- Carusel page-ul este o pagină dedicată expunerii pozelor care au fost folosite. Ele sunt prezentate folosind carousel din Bootstrap.

- Start page-ul este pagina în care vor ajunge utilizatorii după logare/înregistrare. De aici, utilizatorii își pot schimba datele folosind edit profil, vor putea vedea istoricul licitațiilor (pagină neimplementată încă pentru că este dependentă de partea de backend) și vor putea vizualiza licitațiile care sunt de actualitate.

- Edit page-ul este pagina care este răspunzătoare de modificarea datelor din aplicație. 

- Admin page este pagina din care administratorul va putea gestiona utilizatorii. Poate fi accesata folosind credențialele admin și adminpass în pagina Login.

Designul acestor pagini se face folosind CSS, mai exact variabile în care se reține stilul dorit pentru un anume tag. Fișierele pentru design pot fi găsite în folderul style.

De asemenea, pentru standardizarea aspectului paginii, am creat în folderul inc un Header și un Footer corespunzătoare aplicației.

Alte instalări de pachete necesare sunt:

Bootstrap
react-router-dom folosind npm install react-router-dom

Trimiterea emailurilor se face prin respectarea unui template creat în API-ul EmailJs. Voi mai crea un template pentru confirmarea creării unui cont de îndată ce voi realiza și partea de backend.

Acesta este template-ul:
Licitatii Imobiliare <ilicitatii@gmail.com>


Salut,

Noua ta parola este : {{parola}} . O poți schimba din pagina Edit Profile după logare.

Toate cele bune,

Licitatii Imobiliare




