//bring in express code
const express = require('express')

//initialize server and port
const app = express()
const port = 3000

let firstName = null
let lastName = null
let favoriteMovieList = ['The Cheetah Girls', 'Hairspray']
let newMovie = ''

//app.get is defining default server route/API route ('/')
//console.logs only run server terminal not in browser sicne we are working on backend only
app.get('/', (req, res) => {
    console.log("Default Route")
  res.send('My name is Darriel Morris and today is September 6th, 2022.')
})

app.get('/list-movies', (req, res) => {
  console.log('movie path')
  let moviesString = favoriteMovieList.join();
  res.send(moviesString)
})

app.get('/add-movie', (req, res) => {
  newMovie = req.query.newMovie.replace('+','');
  favoriteMovieList.push(newMovie);
  console.log(newMovie)
    res.send(`added movie: ${newMovie} -- current list: ${favoriteMovieList}`)
     })
     
     ///// EXAMPLES FROM CLASS: //////////
app.get('/search', (req, res) => {
  console.log("Search Route")
  console.log("req.query: ", req.query) // returns object of key + value => after ? in URL ==> localhost:3000/userInfo?firstName (key) =Ginny (value).
  // to add multiple key value pairs, add an &
  // Query params are entered into a url after adding a ? at the end of the url.
  firstName = req.query.firstName
    res.send(`Search route: First Name: ${firstName}`)
})

app.get('/user-info', (req, res) => {
  firstName = req.query.firstName
  const lastName = req.query.lastName
    res.send("User Info: " + firstName + ' ' + lastName)
})

app.get('/save-user-info', (req, res) => {
  console.log("save user info Route")
  firstName = req.query.firstName;
  lastName = req.query.lastName;
    res.send('user info => ' + firstName + " " + lastName)
})

//computer acting as a server - we can now request from our own server 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})