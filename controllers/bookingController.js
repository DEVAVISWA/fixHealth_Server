const { err } = require("../Utils/logger");
const Booking = require("../models/booking");
const bookingRouter = require("express").Router();

bookingRouter.post("/create_Booking", async (req, res) => {
  try {
    const { email, name, date, slot, slotNo } = req.body;
    const bookings = await Booking.find({
      date: date,
      email,
    }).sort({ slotNo: 1 });
    if (bookings.length > 0) {
      const isValidBooking = bookings.some(
        (booking) => Math.abs(booking.slotNo - slotNo) < 3
      );
      if (!isValidBooking) {
        const booking = new Booking({
          email,
          name,
          date,
          slot,
          remarks: "",
          slot_confirmed: false,
          slotNo,
        });
        await booking.save();
        res
          .json({
            error: false,
            message: "Appointment time updated.",
            data: null,
          })
          .status(200);
      } else {
        res
          .json({
            message:
              "You have a another appointment booked in this time span. Please select another timeslot.",
            error: true,
          })
          .status(200);
      }
    } else {
      const booking = new Booking({
        email,
        name,
        date,
        slot,
        remarks: "",
        slot_confirmed: false,
        slotNo,
      });
      await booking.save();
      res
        .json({ error: false, message: "Appointment time updated." })
        .status(200);
    }
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to create new Booking - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});
bookingRouter.get("/get_booking_details_by_id/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.find({ email })
      .populate("slot")
      .sort({ date: 1 });
    res.json({
      message: "Booking details fetched",
      data: bookings,
      error: false,
    });
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to fetch details - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});
bookingRouter.get("/get_booking_detail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const bookings = await Booking.find({ _id: id })
      .populate("slot")
      .sort({ date: 1 });
    res.json({
      message: "Booking details fetched",
      data: bookings,
      error: false,
    });
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to fetch details - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

bookingRouter.post("/confirm_slot", async (req, res) => {
  try {
    const { bookingID, remarks } = req.body;
    const bookings = await Booking.updateOne(
      { _id: bookingID },
      { slot_confirmed: true, remarks: remarks }
    );
    res.json({
      message: "Slot confirmed successfully!",
      data: null,
      error: false,
    });
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to confirm slot - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

module.exports = bookingRouter;
