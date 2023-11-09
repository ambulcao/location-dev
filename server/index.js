import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'devpriximbattfr',
});

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});

app.post('/register', (req, res) => {
  const { UserName, FirstName, LastName, Password } = req.body;

  const SQL = 'INSERT INTO utilizadores (username, first_name, last_name, password) VALUES (?, ?, ?, ?)';
  const values = [UserName, FirstName, LastName, Password];

  db.query(SQL, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      console.log('User inserted successfully!');
      res.status(200).send({ message: 'User added!' });
    }
  });
});
