const { err } = require("../Utils/logger");
const Slot = require("../models/slot");

const slotRouter = require("express").Router();

slotRouter.post("/create_slot", async (req, res) => {
  try {
    const { day, filter, slotTime, slotNo } = req.body;
    const slot = new Slot({
      day,
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
        message: `unable to create new slot time  ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

module.exports = slotRouter;
