const { toBooking, addNewBookings } = require("../lib/booking");
const {
  booking1,
  booking2,
  newBooking1,
  newBooking2,
  conflictBooking1,
  conflictBooking2,
  conflictBooking3,
  conflictBooking4,
  conflictWithNewBooking1,
  conflictWithNewBooking2
} = require("./booking.fixture");

test("toBooking", () => {
  // Prepare fixtures
  const csvJsonEntry = {
    time: "2018-11-25T09:00:00+11:00",
    duration: 180,
    userId: "user_1"
  };

  // SUT
  const booking = toBooking(csvJsonEntry);

  // Verify
  expect(booking).toEqual({
    id: expect.any(String),
    title: "user_1",
    start: "2018-11-25T09:00:00+11:00",
    end: "2018-11-25T12:00:00+11:00"
  });
});

test("toBooking - invalid time", () => {
  // Prepare fixtures
  const csvJsonEntry = {
    time: "foo",
    duration: 180,
    userId: "user_1"
  };

  // SUT
  const booking = toBooking(csvJsonEntry);

  // Verify
  expect(booking).toEqual(undefined);
});

test("addNewBookings - no conflicts", () => {
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [newBooking1, newBooking2];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: []
  });
});

test("addNewBookings - conflicts with existing bookings (scenario 1)", () => {
  // existing s----------e
  // new         s----------e
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [newBooking1, newBooking2, conflictBooking1];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [conflictBooking1]
  });
});

test("addNewBookings - conflicts with existing bookings (scenario 2)", () => {
  // existing    s----------e
  // new      s----------e
  //Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [newBooking1, newBooking2, conflictBooking2];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [conflictBooking2]
  });
});

test("addNewBookings - conflicts with existing bookings (scenario 3)", () => {
  // existing s----------e
  // new        s-----e
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [newBooking1, newBooking2, conflictBooking3];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [conflictBooking3]
  });
});

test("addNewBookings - conflicts with existing bookings (scenario 4 )", () => {
  // existing    s----------e
  // new      s----------------e
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [newBooking1, newBooking2, conflictBooking4];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [conflictBooking4]
  });
});

test("addNewBookings - multiple conflicts", () => {
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [
    newBooking1,
    newBooking2,
    conflictBooking1,
    conflictBooking2,
    conflictBooking3,
    conflictBooking4
  ];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [
      conflictBooking1,
      conflictBooking2,
      conflictBooking3,
      conflictBooking4
    ]
  });
});

test("addNewBookings - conflicts found in new bookings", () => {
  // Prepare fixtures
  const existingBookings = [booking1, booking2];
  const newBookings = [
    newBooking1,
    newBooking2,
    conflictWithNewBooking1,
    conflictWithNewBooking2
  ];

  // SUT
  const result = addNewBookings(existingBookings, newBookings);

  // Verify
  expect(result).toEqual({
    bookings: [booking1, booking2, newBooking1, newBooking2],
    conflicts: [conflictWithNewBooking1, conflictWithNewBooking2]
  });
});
