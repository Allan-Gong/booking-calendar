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
    id: uuidv4(),
    title: raw.userId,
    start: start.format(),
    end: end.format()
  };
};

// Assume there is no conflicts in existingBookings
exports.addNewBookings = (existingBookings, existingConflicts, newBookings) => {
  let bookings = existingBookings;
  let newConflicts = [];

  newBookings.forEach(newBooking => {
    if (isConflict(existingBookings, newBooking)) {
      newBooking.color = "red";
      newConflicts.push(newBooking);
    } else {
      delete newBooking.color;
      bookings.push(newBooking);
    }
  });
  const conflicts = existingConflicts.concat(newConflicts);

  return {
    bookings: bookings,
    conflicts: conflicts
  };
};

exports.updateBooking = (
  existingBookings,
  existingConflicts,
  bookingToUpdate
) => {
  [existingBookings, existingConflicts].forEach(listOfBooking => {
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

  // Try to add bookings from nothing to detect possible new conflicts
  return addNewBookings([], [], bookings.concat(conflicts));
};

exports.deleteBooking = (existingBookings, existingConflicts, bookingId) => {
  const bookings = _.remove(bookings, booking => booking.id != bookingId);
  const conflicts = _.remove(conflicts, booking => booking.id != bookingId);

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
