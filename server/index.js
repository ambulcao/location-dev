import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'devpriximbattfr',
});

app.listen(3002, () => {
  console.log('Server is running on port 3002')
});


// Let us now create a route to the server that will register a user

app.post('/register', (req, res) => {
  const { UserName, FirstName, LastName, Password } = req.body

  const SQL = 'INSERT INTO utilizadores (username, first_name, last_name, password) VALUES (?, ?, ?, ?)'
  const values = [UserName, FirstName, LastName, Password]

  db.query(SQL, values, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating user' })
    } else {
      console.log('User inserted successfully!')
      res.status(200).send({ message: 'User added!' })
    }
  })
})


// Now we need to Login with these credentials from a registered User

app.post('/login', (req, res) => {
  const { LoginUserName, LoginPassword } = req.body;

  console.log('Sending login request:', LoginUserName, LoginPassword);

  const SQL = 'SELECT * FROM utilizadores WHERE LOWER(username) = LOWER(?) && password = ?';
  const values = [LoginUserName, LoginPassword];

  db.query(SQL, values, (err, results) => {
    if (err) {
      console.error('Error during query:', err);
      res.status(500).send({ error: err });
    } else {
      console.log('Query results:', results);
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(401).send({ message: `Credentials Don't match!` });
      }
    }
  });
});

// rota para buscar os dados de latitude e longitude 

app.get('/coordinates', (req, res) => {
  const SQL = 'SELECT latitude, longitude FROM coordenadas';
  
  db.query(SQL, (err, results) => {
    if (err) {
      console.error('Error fetching coordinates:', err);
      res.status(500).send({ error: err });
    } else {
      console.log('Coordinates fetched successfully:', results);
      res.status(200).send(results);
    }
  });
});