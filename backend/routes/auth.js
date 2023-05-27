import express  from "express";
import connection from '../db.js';
import  Jwt  from 'jsonwebtoken';
let router=express.Router();


router.post('/login', async (req, res) => {
  console.log('Executing /auth/login route');
  console.log("am ajuns aici");
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE Username = ? AND Parola = ?';
  const values = [username, password];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const token = generateToken(user);
        const rol=user.Rol;
        res.json({ token,rol });
      } else {
        console.log(results);
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});
  
  
  router.post('/register', async (req, res) => {
    console.log('Executing /auth/register route');
    const { username, email, password, confirmPassword, dateOfBirth } = req.body;
    try {
      const existingUser = await connection.query('SELECT * FROM users WHERE Username = ? OR Email = ?', [username, email], (error, existingUser) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error retrieving existing user' });
        }
        console.log(existingUser.length);
        if (existingUser.length > 0) {
          return res.status(409).json({ error: 'Username or email already exists' });
        }
        if (password !== confirmPassword) {
          return res.status(400).json({ error: 'Passwords do not match' });
        }
        const insertQuery = 'INSERT INTO users (username, email, parola, data_nasterii,rol,Data_inregistrare) VALUES (?, ?, ?, ?,"STANDARD",NOW())';
        const insertValues = [username, email, password, dateOfBirth];
  
        connection.query(insertQuery, insertValues, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error inserting user' });
          }
          const selectQuery = 'SELECT * FROM users WHERE Username = ?';
          connection.query(selectQuery, [username], (error, selectedUser) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Error retrieving user' });
            }
            console.log(selectedUser);
            if (selectedUser.length > 0) {
              const token = generateToken(selectedUser[0]);
              res.json({ token });
            } else {
              return res.status(401).json({ error: 'User not found' });
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/recovery', async (req, res) => {
    console.log('Executing /auth/recovery route');
    const { email } = req.body;
    console.log("aici");
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        console.log(email);
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0) {
          const newPassword = generateRandomString();
          const updateQuery = 'UPDATE users SET parola = ? WHERE email = ?';
          connection.query(updateQuery, [newPassword, email], (updateError) => {
            if (updateError) {
              console.error('Error:', updateError);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              console.log('New password:', newPassword);
              res.json({ message: newPassword });
            }
          });
        } else {
          res.status(404).json({ error: 'Email negasit' });
        }
      }
    });
  });

  
  
  
  function generateToken(user) {
    const token = Jwt.sign({ userId: user.ID }, 'secret', { expiresIn: '1h' });
    return token;
  }

  function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default router;