//bring in express code
const express = require('express')
//bring in body parser so we can parse the post request body
const bodyParser = require('body-parser');

//initialize server and port
const app = express()
const port = 3000

//parse app/json 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////////////////////////////////
let firstName = null
let lastName = null
const favoriteMovieList = ['The Cheetah Girls', 'Hairspray']
let newMovie = ''

//app.get is defining default server route/API route ('/')
//console.logs only run server terminal not in browser sicne we are working on backend only
app.get('/', (req, res) => {
    console.log("Default Route")
    const myName = 'Darriel Morris';
    const today = new Date();
    const todayFormatted = today.toLocaleDateString();
  res.send(`My name is ${myName} and today is ${todayFormatted}.`)
})

// Movie CRUD Functions

// Create = make a post request

app.post("/new-movie", (req, res) => {
  // create object in body
  console.log(req.body)
  
  const newMovieTitle = req.body.title
  favoriteMovieList.push(newMovieTitle)
  // We must respond always and send something back
  res.json({
    success: true
  })
})

// Read = always a get request
app.get("/all-movies", (req, res) => {
  //res.send only sends strings. we want to use res.json to send json objects or arrays
  res.json(favoriteMovieList)
})

// Update = put request = requires additional param
// find a movie and update that movie title
app.put("/update-movie/:titleToUpdate", (req, res) => {
  // route param - /: - specify which movie in list to update
  // value of ^ will show in req.params
  console.log('req params', req.params)

  //update movie title
  const titleToUpdate = req.params.titleToUpdate
  const newTitle = req.body.newTitle
  console.log(newTitle)
  console.log(titleToUpdate)

  // to update movie title, first find index of movie
  const indexOfMovie = favoriteMovieList.indexOf(titleToUpdate)
  console.log(indexOfMovie)
  
  // overwrite value of favoriteMovie List at indexOfmovie with newTitle 
  favoriteMovieList[indexOfMovie] = newTitle

  res.json({
    success: true
  })
})


app.delete("/delete-movie/:titleToDelete", (req, res) => {

const titleToDelete = req.params.titleToDelete

const indexOfMovie = favoriteMovieList.indexOf(titleToDelete)

//if movie not found in array, respond with false
if (indexOfMovie < 0) {
  res.json({
    hasBeenDeleted: false
  });
  return;
}

favoriteMovieList.splice(indexOfMovie, 1)

  res.json({
    hasBeenDeleted: true
  })
})
// app.get('/list-movies', (req, res) => {
//   console.log('movie path')
//   let moviesString = favoriteMovieList.join(", ");
//   res.send(moviesString)
// })

// app.get('/add-movie', (req, res) => {
//   newMovie = req.query.newMovie.replace('+','');
//   favoriteMovieList.push(newMovie);
//   console.log(newMovie)
//     res.send(`added movie: ${newMovie} -- current list: ${favoriteMovieList}`)
// })

////////////// EXAMPLES FROM CLASS: /////////////////
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

app.post('/save-user-info', (req, res) => {
  console.log(req.body)
  firstName = req.body.firstName;
  lastName = req.body.lastName;
    res.send('user info => ' + firstName + " " + lastName)
})

//:movieName - (key) syntax to define url parameter (value) - string that is in url
// app.get('/single-movie/:movieName', (req, res) => {
//   console.log(req.params);

//   res.send("")
// })
//computer acting as a server - we can now request from our own server 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/* 
  Rules of HTTP (Hypertext Transfer Protocol)
1. An exchange 
2.
3.
4.
- GET is used for fetching data from server. There cant be any body payload that goes with it.
- POST is used to create data on the server.





*/