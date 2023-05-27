import mysql from 'mysql';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'licitatii',
});
connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
  
    console.log('Connected to the database!');
  });
export default connection;