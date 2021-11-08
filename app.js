const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 5000;

// app middleware
app.use(express.json());

// const movies = fs.readFile("./movies.json", (err, data) => {
//   console.log(data.toString());
// });

// const movies = [
//   {
//     id: 1,
//     name: "fast & furious",
//     isFav: true,
//     isDeleted: false,
//   },
//   {
//     id: 2,
//     name: "Lord Of Rings",
//     isFav: false,
//     isDeleted: false,
//   },
//   {
//     id: 3,
//     name: "The conjuring",
//     isFav: true,
//     isDeleted: false,
//   },
// ];

//1- get all existing movies  {done}

app.get("/movies", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    let existingMovies = [];
    for (let i = 0; i < movie.length; i++) {
      if (movie[i].isDeleted === false) {
        existingMovies.push(movie[i]);
      }
    }

    res.status(200).json(existingMovies);
    console.log(existingMovies);
  });
});
//----------------------

//2- get fav movies  {done}

app.get("/favMovies", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    let favMovies = [];
    for (let i = 0; i < movie.length; i++) {
      if (movie[i].isFav === true) {
        favMovies.push(movie[i]);
      }
    }

    res.status(200).json(favMovies);
    console.log(favMovies);
  });
});

//------------------------

//3- get movie by id {done}

app.get("/movieById", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    const { id } = req.query;
    const byId = movie.find((element) => {
      return element.id === Number(id);
    });
    if (byId) {
      res.status(200).json(byId);
    } else {
      res.status(404).json("movie not found");
    }
  });
});
//-------------------------

//4- create new movie  {done}

app.post("/addNewMovie", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    const newMovie = req.body.name;
    movie.push({
      id: movie.length + 1,
      name: newMovie,
      isFave: false,
      isDeleted: false,
    });
    res.status(200).json(newMovie);
    console.log(movie);
  });
});

//-------------------------

//5- update movie data by id {done}

app.put("/updateMovieById/:id", (req, res) => {
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    const { id } = req.params;
    const { name } = req.body;
    movie.forEach((ele) => {
      if (ele.id === Number(id)) {
        ele.name = name;
      }
    });
    res.status(200).json(name);
    console.log(movie);
  });
});

//--------------------------

//6- soft delete by Id {done}

app.put("/softDelete", (req, res) => {
  //could also be done with params
  fs.readFile("./movies.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    const { id } = req.query;
    movie.forEach((ele) => {
      if (ele.id === Number(id)) {
        ele.isDeleted = true;
      }
    });
    res.status(200).json(id);
    console.log(movie);
  });
});

//--------------------------

app.listen(PORT, () => {
  console.log(`server is on and running on ${PORT}`);
});
