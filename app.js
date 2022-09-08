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
const favoriteMovieList = [{
  title: 'The Cheetah Girls',
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
},{title: 'Hairspray',
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}]


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
  console.log("POST to /new-movie")
  // create object in body
  console.log('req.body', req.body)
  
  const newMovieTitle = {
    title: "",
    starRating: 0,
    isRecommended: false,
    createdAt: new Date(),
    lastModified: new Date()
  };

  newMovieTitle.title = req.body.title;
  newMovieTitle.starRating = req.body.starRating;
  newMovieTitle.isRecommended = req.body.isRecommended;

  if (req.body.isRecommended === undefined){
    //should triggger when req.body.isRecommended is undefined
    res.json({
      success: false,
      message: "isRecommended is required field"
    }) 
    return;
  } else {
    newMovieTitle.isRecommended = req.body.isRecommended
  };

  if (req.body.title === undefined){
    //should triggger when req.body.title is undefined
    res.json({
      success: false,
      message: "title is required field"
    }) 
    return;
  } else {
    newMovieTitle.title = req.body.title
  };

  if (req.body.starRating === undefined){
    //should triggger when req.body.starRating is undefined
    res.json({
      success: false,
      message: "starRating is required field"
    }) 
    return;
  } else {
    newMovieTitle.starRating = req.body.starRating
  };
  
  console.log('newMovie:', newMovieTitle)

  favoriteMovieList.push(newMovieTitle)
  // We must respond always and send something back
  res.json({
    success: true
  })
})

// Read = always a get request
app.get("/all-movies", (req, res) => {
  console.log("GET to /all-movies")
  //res.send only sends strings. we want to use res.json to send json objects or arrays
  res.json(favoriteMovieList)
})

// Update = put request = requires additional param
// find a movie and update that movie title
app.put("/update-movie/:titleToUpdate", (req, res) => {
  console.log("PUT to /update-movie")
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
  console.log("DELETE /delete-movie")
  //title to find and delete
const titleToDelete = req.params.titleToDelete
  //find the index of that movie
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
		1. An exchange of information across the internet MUST start with a Request
		2. A single Request MUST be answered with a SINGLE Response and there must always be a response
		3. The data sent in HTTP requests is always going to be plain text 
			- Note: If we want to send a JSON object, we need to stringify the object first
			- Note: In order for the browser to render the data, it needs an HTML file to tell the browser how to render the data.
				HTML + CSS will tell the browser the structure of a page and how to make it look
			- Note: When you enter a url into the browser that will ALWAYS be a GET request
		4. There are 4 basic types of HTTP request: GET, POST, PUT, DELETE
			- GET is used for fetching data from a server. There cannot be any body payload that goes with it.
			- POST is used to create data on the server. The post request comes with a request body payload.
			- PUT is used to modify data on the server, and acts similarly to the POST request.
			- DELETE is used to delete data from the server.
			- AKA: CRUD (Create, Read, Update, Delete)
		5. There are 3 ways to send user data to the server
			- Query Params: req.query - Used primarily to modify the request parameters
			- Route Params: req.params - Used primarily to request a specfic resource
			- Body: req.body - Used primarily for sending user data
				- Note: In Postman, in order to send a body payload you need to go to the 'body' request tab, select raw and then JSON
*/