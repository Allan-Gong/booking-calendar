const moment = require("moment");
const _ = require("lodash");
const uuidv4 = require("uuid/v4");

exports.toBooking = raw => {
  const start = moment(raw.time);
  if (!start.isValid()) {
    console.error(`Invalid time: ${raw.time}`);
    return undefined;
  }

  const end = moment(raw.time).add(raw.duration, "minutes");

  return {
    title: raw.userId,
    start: start.format(),
    end: end.format(),
    allDay: false
  };
};

exports.addNewBookings = (existingBookings, newBookings) => {
  let bookings = existingBookings;
  let conflicts = [];

  newBookings.forEach(newBooking => {
    if (isConflict(existingBookings, newBooking)) {
      newBooking.color = "red";
      conflicts.push(newBooking);
    } else {
      bookings.push(newBooking);
    }
  });

  return {
    bookings: bookings,
    conflicts: conflicts
  };
};

const isConflict = (existingBookings, newBooking) => {
  const overlap = _.find(
    existingBookings,
    existingBooking =>
      moment(existingBooking.start).isBefore(newBooking.end) &&
      moment(newBooking.start).isBefore(existingBooking.end)
  );

  return overlap == undefined ? false : true;
};
