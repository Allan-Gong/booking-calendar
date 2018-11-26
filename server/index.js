const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const moment = require("moment");
const fixtures = require("./fixtures");
const { toBooking, addNewBookings } = require("../lib/booking");

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
  result = addNewBookings(bookings, newBookings.map(toBooking).filter(Boolean));
  bookings = result.bookings;
  conflicts = conflicts.concat(result.conflicts);

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

app.put("/booking", (req, res) => {
  const bookingToUpdate = req.body;
  console.log("bookingToUpdate", bookingToUpdate);

  [bookings, conflicts].forEach(listOfBooking => {
    const found = _.find(
      listOfBooking,
      booking => booking.id == bookingToUpdate.id
    );
    if (found != undefined) {
      found.title = bookingToUpdate.title;
      found.start = bookingToUpdate.start;
      found.end = bookingToUpdate.end;
    }
  });

  result = addNewBookings([], bookings.concat(conflicts));
  bookings = result.bookings;
  conflicts = conflicts;

  res.json({
    bookings: result.bookings,
    conflicts: result.conflicts
  });
});

app.delete("/booking/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  bookings = _.remove(bookings, booking => booking.id != bookingId);
  conflicts = _.remove(conflicts, booking => booking.id != bookingId);

  res.json({
    bookings: bookings,
    conflicts: conflicts
  });
});

console.log("app starting on port 3001");
app.listen(3001);
