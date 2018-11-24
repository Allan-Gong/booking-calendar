const moment = require("moment");

const today = moment()
  .hour(0)
  .minute(0)
  .second(0);

exports.bookings = [
  {
    time: today.hour(10).valueOf(),
    duration: 60 * 60 * 1000,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-1, "day")
      .hour(11)
      .valueOf(),
    duration: 120 * 60 * 1000,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-2, "day")
      .hour(10)
      .valueOf(),
    duration: 180 * 60 * 1000,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(-3, "day")
      .hour(10)
      .valueOf(),
    duration: 180 * 60 * 1000,
    userId: "user_1"
  },
  {
    time: today
      .clone()
      .add(1, "day")
      .hour(14)
      .valueOf(),
    duration: 240 * 60 * 1000,
    userId: "user_1"
  }
];
