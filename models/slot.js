// const { default: mongoose } = require("mongoose");

// const SlotSchema = new mongoose.Schema({
//   day: {
//     type: String,
//     enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//   },
//   filter: {
//     type: String,
//     enum: ["Morning", "Afternoon", "Evening"],
//   },
//   slotTime: String, /// 5.30 AM .... 11.00 PM
//   slotNo: Number, // slot 1 - 5.30 AM , 2 - 5-45 AM....
//   name: {
//     type: mongoose.Schema.Types.String,
//     ref: "Booking",
//   },
// });

// const Slot = mongoose.model("Slot", SlotSchema, "slots");

// module.exports = Slot;

const { default: mongoose } = require("mongoose");

const SlotSchema = new mongoose.Schema({
  filter: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
  },
  slotTime: String, /// 5.30 AM .... 11.00 PM
  slotNo: {
    type: Number,
    unique: true,
  }, // slot 1 - 5.30 AM , 2 - 5-45 AM....
});

const Slot = mongoose.model("Slot", SlotSchema, "slots");

module.exports = Slot;
