//bring in express code
const express = require('express')

//initialize server and port
const app = express()
const port = 3000

const favoriteMovieList = ['The Cheetah Girls', 'Hairspray'];
const moviesString = favoriteMovieList.join();

//app.get is defining default server route/API route ('/')
//console.logs only run server terminal not in browser sicne we are working on backend only
app.get('/', (req, res) => {
    console.log("Default Route")
  res.send('My name is Darriel Morris and today is September 6th, 2022.')
})

app.get('/list-movies', (req, res) => {
    res.send(moviesString)
})
//computer acting as a server - we can now request from our own server 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})