const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const moment = require("moment");
const fixtures = require("./fixtures");
const { toBooking, addNewBookings } = require("../src/lib/booking");

const app = express();
app.use(cors()); // so that app can access
app.use(bodyParser.json()); // for parsing application/json

let bookings = fixtures.bookings.map(toBooking).filter(Boolean);
let conflicts = [];

app.get("/bookings", (_, res) => {
  res.json({
    bookings: bookings,
    conflicts: conflicts
  });
});

app.post("/bookings", (req, res) => {
  const newBookings = req.body;
  result = addNewBookings(bookings, newBookings);
  bookings = result.bookings;
  conflicts = conflicts.concat(result.conflicts);

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

console.log("app starting on port 3001");
app.listen(3001);
