const moment = require("moment");

const today = moment()
  .hour(0)
  .minute(0)
  .second(0);

exports.bookings = [
  {
    time: today
      .clone()
      .hour(10)
      .format(),
    duration: 60,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-1, "day")
      .hour(11)
      .format(),
    duration: 120,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-2, "day")
      .hour(10)
      .format(),
    duration: 180,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-3, "day")
      .hour(10)
      .format(),
    duration: 180,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(1, "day")
      .hour(14)
      .format(),
    duration: 240,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(2, "day")
      .hour(14)
      .format(),
    duration: 240,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(3, "day")
      .hour(14)
      .format(),
    duration: 240,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(4, "day")
      .hour(14)
      .format(),
    duration: 240,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(5, "day")
      .hour(14)
      .format(),
    duration: 240,
    userId: "user_1"
  }
];
