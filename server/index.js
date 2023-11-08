// Our dependecies
import express from 'express';
const app = express();
import mysql from 'mysql';
import cors from 'cors';

app.use(express.json())
app.use(cors())

// Let us run the server. SO this running,
app.listen(3002, ()=>{
  console.log('Server is running on port 3002')
})

// Let us create our database (mysql)
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'devpriximbattfr',
})

//Let us now create a route to the server that will register a user

app.post('/register', (req, res) => {
  // We need to get variables sent from the form
  //const sentEmail = req.body.Email
  const sentUserName = req.body.UserName
  const sentPassword = req.body.Password

  // Lets create SQL statement to insert the user to the Database table Users
  //const SQL = 'INSERT INTO utilizadores (username, password, last_name) VALUES (?, ?, ?)'
  const SQL = 'INSERT INTO utilizadores (username, password) VALUES (?, ?)'

  // We are going to enter these values through a variable
  //const Values = [sentEmail, sentUserName, sentPassword]
  const Values = [sentUserName, sentPassword]

  // Query to execute the sql statement stated above
  db.query(SQL, Values, (err, results) => {
    if(err){
      res.send(err)
    } else {
      console.log('User inserted successfully!')
      res.send({message: 'User added!'})
    }
  })
})

