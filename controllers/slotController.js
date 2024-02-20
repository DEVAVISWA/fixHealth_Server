const { err } = require("../Utils/logger");
const Booking = require("../models/booking");
const Slot = require("../models/slot");

const slotRouter = require("express").Router();

slotRouter.post("/create_slot", async (req, res) => {
  try {
    const { filter, slotTime, slotNo } = req.body;
    const slot = new Slot({
      filter,
      slotTime,
      slotNo,
    });
    await slot.save();
    res
      .json({ message: "Slot created successfully", error: false })
      .status(200);
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to create new slot time - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

slotRouter.get("/get_slots", async (req, res) => { 
  //get slots for user type : physio, date: from ui, slot_confirmed: false
  // Booking.aggregate([
  //   {
  //     $lookup: {
  //       from:"users",
  //       localField:"email",
  //       foreignField:"email",
  //       as:"physioUser"
  //     }
  //   },
  //   {
  //     $unwind:"$physioUser"
  //   },
  //   {
  //     $match: {
  //       $and : [
  //       {"slot_confirmed" : {$eq : false}},
  //       {"physioUser.user_type" : {$eq : "physio"}},
  //       {"date" : {$gte: new Date("2024-02-19T00:00:00.000Z")}},
  //       {"date" : {$lte: new Date("2024-02-19T23:59:59.999Z")}}
  //       ]
  //     }
  //   }
  //   ])
  try {
    const slots = await Slot.aggregate([
      {
        $group: {
          _id: "$filter",
          slots: {
            $push: { slotTime: "$slotTime", slotNo: "$slotNo", id: "$_id" },
          },
        },
      },
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "Morning"] }, then: 1 },
                { case: { $eq: ["$_id", "Afternoon"] }, then: 2 },
                { case: { $eq: ["$_id", "Evening"] }, then: 3 },
              ],
              default: 99,
            },
          },
        },
      },
      {
        $sort: {
          sortOrder: 1,
        },
      },
    ]).exec();
    res
      .json({ error: false, data: slots, message: "successfully fetched!" })
      .status(200);
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to create new slot time - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

module.exports = slotRouter;
