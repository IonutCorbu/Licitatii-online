import express  from "express";
import connection from '../db.js';
let router=express.Router();


router.get("/users", (req, res) => {
  const query = "SELECT * FROM users WHERE username <> 'admin'"; 
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const users = results;
      console.log(users);
      res.json({ users });
    }
  });
});

router.put("/users", (req, res) => {
  const username = req.body.logged;
  const updatedData = req.body;

  if (!username || Object.keys(updatedData).length === 0) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  const selectQuery = "SELECT ID FROM users WHERE Username = ?";
  connection.query(selectQuery, [username], (error, results) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, message: "Failed to retrieve user ID" });
    }

    const userId = results[0]?.ID;

    if (!userId) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (
      !updatedData.Username &&
      !updatedData.Email &&
      !updatedData.Parola &&
      !updatedData.Data_nasterii
    ) {
      return res.status(400).json({ success: false, message: "No valid fields provided for update" });
    }

    const updateQuery = [];
    const updateValues = [];

    if (updatedData.Username) {
      updateQuery.push("Username = ?");
      updateValues.push(updatedData.Username);
    }

    if (updatedData.Email) {
      updateQuery.push("Email = ?");
      updateValues.push(updatedData.Email);
    }

    if (updatedData.Parola) {
      updateQuery.push("Parola = ?");
      updateValues.push(updatedData.Parola);
    }

    if (updatedData.Data_nasterii) {
      updateQuery.push("Data_nasterii = ?");
      updateValues.push(updatedData.Data_nasterii);
    }

    const updateQueryString = `UPDATE users SET ${updateQuery.join(", ")} WHERE ID = ?`;
    console.log(updateQueryString);
    const updateValuesWithId = [...updateValues, userId];
    console.log(updateValuesWithId);
    connection.query(updateQueryString, updateValuesWithId, (error) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ success: false, message: "Failed to update user" });
      }

      return res.status(200).json({ success: true, message: "User updated successfully" });
    });
  });
});


router.get("/announcements/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);

  const query = `
    SELECT a.*, IFNULL(MAX(l.suma), 0) AS maxSuma
    FROM anunturi AS a
    LEFT JOIN licitari AS l ON a.ID = l.ID_anunt
    WHERE a.Vandut = 0 AND a.ID = ?
    GROUP BY a.ID
  `;

  connection.query(query, id, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const announcement = results[0];
      console.log(announcement);
      res.json({ announcement });
    }
  });
});

router.get("/announcements", (req, res) => {
    const query = "SELECT * FROM anunturi where Vandut=0 and NOW()<Data_final"; 
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const announcements = results;
        console.log(announcements);
        res.json({ announcements });
      }
    });
  });



router.post("/announcements", (req, res) => {

  const { sumaStart, dataFinal, titlu, zona, nrCamere, descriere, user } = req.body;

  const query = `INSERT INTO anunturi (ID_user,Suma_start, Data_final, Titlu, Zona, Nr_camere, Descriere) 
                 VALUES ((SELECT ID FROM users WHERE Username = ?),?, ?, ?, ?, ?, ?)`;
  const values = [ user,sumaStart, dataFinal, titlu, zona, nrCamere, descriere];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while inserting the announcement" });
      } else {
        console.log("Announcement inserted successfully");
        res.status(200).json({ success: true });
      }
    });
  });

  router.post("/licitations", (req, res) => {
    console.log(req.body);
    const { ID_anunt, username, suma } = req.body;
  
    const checkQuery = "SELECT MAX(suma) AS maxSuma FROM licitari WHERE ID_anunt = ?";
    connection.query(checkQuery, [ID_anunt], (checkError, checkResults) => {
      if (checkError) {
        console.error("Error:", checkError);
        res.status(500).json({ error: "An error occurred while checking the maximum licitation" });
      } else {
        const maxSuma = checkResults[0].maxSuma;
  
        const selectQuery = "SELECT Suma_start FROM anunturi WHERE ID = ?";
        connection.query(selectQuery, [ID_anunt], (selectError, selectResults) => {
          if (selectError) {
            console.error("Error:", selectError);
            res.status(500).json({ error: "An error occurred while retrieving the announcement" });
          } else {
            const Suma_start = selectResults[0].Suma_start;
  
            if (suma <= maxSuma || suma < Suma_start) {
              res.status(400).json({ error: "Sum is not greater than the maximum licitation or Suma_start" });
              return;
            }
            console.log(username);
            const insertQuery =
              "INSERT INTO licitari(ID_anunt, ID_user, suma, data) VALUES (?, (SELECT ID FROM users WHERE Username = ?), ?, NOW())";
            connection.query(insertQuery, [ID_anunt, username, suma], (insertError, insertResults) => {
              if (insertError) {
                res.status(500).json({ error: "An error occurred while inserting the licitation" });
              } else {
                console.log("Licitation inserted successfully");
                res.status(200).json({ success: true });
              }
            });
          }
        });
      }
    });
  });


  router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM users WHERE id = ?";
  
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const user = results[0];
        console.log(user);
        res.json({ user });
      }
    });
  });


  router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
  
    const query = "DELETE FROM users WHERE ID = ?";
  
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: "User not found" });
        } else {
          console.log("User deleted successfully");
          res.status(200).json({ success: true });
        }
      }
    });
  });


  router.get("/licitations", (req, res) => {
    const query = `
      SELECT a.*, l.suma, u.Username
      FROM anunturi AS a
      INNER JOIN licitari AS l ON l.ID_anunt = a.ID
      INNER JOIN users AS u ON u.ID = l.ID_user
      WHERE a.Data_final < NOW()
        AND l.suma = (
          SELECT MAX(suma)
          FROM licitari
          WHERE ID_anunt = a.ID
        )
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const apartments = results;
        console.log(apartments);
        res.json({ apartments });
  
        apartments.forEach((apartment) => {
          console.log(apartment);
          if (apartment.Vandut === 0) {
            const updateQuery = "UPDATE anunturi SET Vandut = 1 WHERE ID = ?";
            connection.query(updateQuery, [apartment.ID], (updateError, updateResult) => {
              if (updateError) {
                console.error("Error updating vandut column:", updateError);
              } else {
                console.log("Vandut column updated successfully for ID:", apartment.ID);
              }
            });
          }
        });
      }
    });
  });

  
  
  
  
  
  
  
export default router;