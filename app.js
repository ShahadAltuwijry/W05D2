const express = require("express");
// const fs = require("fs");
const app = express();

const PORT = 5000;

// app middleware
app.use(express.json());

const movies = [
  {
    id: 1,
    name: "fast & furious",
    isFav: true,
    isDeleted: false,
  },
  {
    id: 2,
    name: "Lord Of Rings",
    isFav: false,
    isDeleted: false,
  },
  {
    id: 3,
    name: "The conjuring",
    isFav: true,
    isDeleted: false,
  },
];

//get all existing movies  {done}

app.get("/movies", (req, res) => {
  let existingMovies = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].isDeleted === false) {
      existingMovies.push(movies[i]);
    }
  }

  res.status(200).json(existingMovies);
  console.log(existingMovies);
});
//----------------------

//get fav movies  {done}

app.get("/favMovies", (req, res) => {
  let favMovies = [];
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].isFav === true) {
      favMovies.push(movies[i]);
    }
  }

  res.status(200).json(favMovies);
  console.log(favMovies);
});
//------------------------

//get movie by id {done}

app.get("/movieById", (req, res) => {
  const { id } = req.query;
  const byId = movies.find((element) => {
    return element.id === Number(id);
  });
  if (byId) {
    res.status(200).json(byId);
  } else {
    res.status(404).json("movie not found");
  }
});
//-------------------------

//create new movie  {done}

app.post("/addNewMovie", (req, res) => {
  const newMovie = req.body.name;
  // newMovie = { name, isFav, isDeleted} = req.body;
  movies.push({
    id: movies.length + 1,
    name: newMovie,
    isFave: false,
    isDeleted: false,
  });
  res.status(200).json(newMovie);
  console.log(movies);
});

//-------------------------

//update movie data by id {done}

app.put("/updateMovieById/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  movies.forEach((ele) => {
    if (ele.id === Number(id)) {
      ele.name = name;
    }
  });
  res.status(200).json(name);
  console.log(movies);
});

//--------------------------

app.listen(PORT, () => {
  console.log(`server is on and running on ${PORT}`);
});
