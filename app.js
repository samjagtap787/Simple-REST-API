const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const cars = [
  {
    id: "1",
    brand: "Lexus",
    model: "GX",
    "car body": "4WD",
    color: "black",
    price: "50000$",
    year: 2020,
  },

  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    "car body": "sedan",
    color: "blue",
    price: "25000$",
    year: 2010,
  },
];
// Get requist
app.get("/cars", (req, res) => {
    //direct send the cars array in the res object
  res.status(200).json(cars);
});

// Get single car requist
app.get("/cars/:id", (req, res) => {
  const Id = req.params.id;

  //using .filter function we loop through array and get the car that has id equals to requisted id
  const findCar = cars.filter((car) => car.id === Id);
  res.status(200).json(findCar);
});
//post requist
app.post("/cars", (req, res) => {
  //get car details frome req.body and stored in variable
  const addcar = req.body;
  // variable pushed in to the cars array
  cars.push(addcar);

  res.status(201).send(addcar);
});

// update the data
app.put("/cars/:id", (req, res) => {
    //got id from req.params 
  const id = req.params.id;
  //got details to update from req.body object
  const updatedCar = req.body;
 
  /// for getting index of the element that has similar id to id get from req.params
    /// using .findindex() we iterate through array and return the id match index 
  const index = cars.findIndex((car) => car.id === id);
  if (index !== -1) {
    cars[index] = updatedCar;
    res.json(updatedCar);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/cars/:id", (req, res) => {
  const Id = req.params.id;

  const index = cars.findIndex((car) => car.id === Id);
  if (index !== -1) {
    const deletedCar = cars.splice(index, 1);
    res.json(deletedCar[0]);
  } else {
    res.sendStatus(404);
  }
});
//create port start listening on that port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
