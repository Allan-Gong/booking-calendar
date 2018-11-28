const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const moment = require("moment");
const fixtures = require("./fixtures");
const {
  toBooking,
  addNewBookings,
  updateBooking,
  deleteBooking
} = require("../lib/booking_service");

const app = express();
app.use(cors()); // so that app can access
app.use(bodyParser.json()); // for parsing application/json

// Assume existing bookings do not have any conflicts
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
  const result = addNewBookings(
    bookings,
    newBookings.map(toBooking).filter(Boolean)
  );

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

app.put("/booking", (req, res) => {
  const bookingToUpdate = req.body;
  const result = updateBooking(bookings, conflicts, bookingToUpdate);

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

app.delete("/booking/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  const result = deleteBooking(bookings, conflicts, bookingId);

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

console.log("app starting on port 3001");
app.listen(3001);
