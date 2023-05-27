import { useNavigate } from "react-router-dom";
import {div_style} from '../style/Recovery_style.js'
import {h1_style} from '../style/Recovery_style.js'
import {form_style} from '../style/Recovery_style.js'
import {label_style} from '../style/Recovery_style.js'
import emailjs from 'emailjs-com';
import axios from "axios";

function Recovery()
{
    const navigate = useNavigate();

    async function recoveryHandler(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      console.log(email);
      const recoveryData = {
        email:email
      };
      try {
        const response = await axios.post('http://localhost:5000/auth/recovery', recoveryData);
      
        if (response.status === 200) {
          const { message } = response.data;
              
          emailjs.init('l3TdoHObAItSXL8AD');
          const params = {
            to: email,
            message: message
          };
      
          emailjs.send('service_7l1mqsm', 'template_h95enje', params)
            .then(() => {
              if (window.confirm('Emailul pentru schimbarea parolei trimis cu succes')) {
                navigate('/');
              }
            })
            .catch((error) => {
              console.error('Error sending email:', error);
            });
        } 
      } catch (error) {
        if(error.response.status===404)
        {
          document.getElementById('email').value="";
          alert("Email negasit");
        }
        else{
        console.error('Error:', error);
        alert('Încearcă mai târziu!');
        }
      }
    }
    return (
        <div style={div_style}>
            <h1 style={h1_style}>Am uitat parola</h1>
        <form className="d-flex flex-column align-items-center" onSubmit={recoveryHandler} style={form_style}>
        <div class="form-group ">
          <label for="email" style={label_style}>Email</label>
          <input type="email" class="form-control" id="email" aria-describedby="userlHelp" placeholder="Enter your email" style={{width:"100%"}}/>
        </div>
        <button type="submit" class="btn btn-danger mt-3">Submit</button>
      </form>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      </div>
    );
}
export default Recovery;