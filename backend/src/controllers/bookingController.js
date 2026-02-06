import Booking from "../models/bookingModel.js";
import Guide from "../models/guideModel.js";

// Tourist creates a booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    // Only tourists can book
    if (req.user.role !== "tourist") {
      return res.status(403).json({ message: "Only tourists can create bookings" });
    }

    const {
      guideId,
      date,
      durationHours,
      meetingLocation,
      notes,
    } = req.body;

    // Check guide exists
    const guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    // Create booking
    const booking = await Booking.create({
      tourist: userId,
      guide: guideId,
      date,
      durationHours,
      meetingLocation,
      notes,
    });

    res.status(201).json({
      message: "Booking request created",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// this allow guides to see their bookings
export const getGuideBookings = async (req, res) => {
  try {
  // only guides are allowed

    if(req.user.role !== 'guide'){
      return res.status(403).json({ message: "Only guides are allowed"})
    }

    //finding guide profile linked to this user
    const guide = await Guide.findOne ({ user: req.user.id});
    if(!guide){
      return res.status(404).json({message: "Guide profile not found"})
    }

    const bookings = await Booking.find({guide: guide._id})
    .populate("tourist", "name")
    .sort({createdAt: -1});

    res.json({
      count: bookings.length,
      bookings,
    });
  } catch(error){
    console.error("Get guide bookings error:", error.message);
    res.status(500).json({message: "Server error"});
  }
};


// here guide will either accept or reject the booking request
export const updateBookingStatus = async (req, res) => {
  try{
    //only guide allowed
    if(req.user.role !== "guide"){
      return res.status(403).json({message:"only guides can update"})
    }

    const {bookingId} = req.params;
    const {status} = req.body;

    if(!["confirmed", "cancelled"].includes(status)){
      return res.status(400).json({message: "invalid status response"})
    }

    //find guide profile
    const guide = await Guide.findOne({user: req.user.id});
    if(!guide){
      return res.status(404).json({message: "guide profile not found"})
    }

    //find booking that belong to this guide
    const booking = await Booking.findOne({
      _id: bookingId,
      guide: guide._id,
      status: "pending",
    });

    if(!booking){
      return res.status(404).json({message: "BOOKing not found"})
    }

    booking.status = status;
    await booking.save();

    res.json({
      message: `Booking ${status}`,
      booking,
    });
    
  }catch(error){
    console.error("Update booking eror:", error.message);
    res.status(500),json({message: "Server error"})
  }
};