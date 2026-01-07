import MovieEvent from "../schema/MovieEvent.js";

export const createEvent = async (req, res) => {
  const { movieTitle, theaterName, showTime, showDate, city, maxPeople } = req.body.eventInformation;
  console.log("req.body: ", req.body)
  if (!movieTitle || !theaterName || !showTime || !city || !showDate) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }
  const combined = `${showDate}T${showTime}:00`;

  // Convert to Date
  const showDateTime = new Date(combined);
  // Show time must be in future
  console.log("finalDate: ", showDateTime)
  // Validate date
if (isNaN(showDateTime.getTime())) {
  return res.status(400).json({
    message: "Invalid date or time format"
  });
}

// Must be in the future
if (showDateTime <= new Date()) {
  return res.status(400).json({
    message: "Show time must be in the future"
  });
}
// showTime = showDateTime
  try {
    const event = await MovieEvent.create({
      movieTitle,
      theaterName,
      showTime: showDateTime,
      city,
      maxPeople: maxPeople || 2,
      createdBy: req.user.userId,
      currentPeople: 1
    });

    return res.status(201).json({
      message: "Movie event created",
      event
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const listEvents = async (req, res) => {
  const { city } = req.query;

  try {
    const filter = {
      status: "OPEN",
      showTime: { $gt: new Date() }
    };

    if (city) filter.city = city;

    const events = await MovieEvent.find(filter)
      .populate("createdBy", "name city")
      .sort({ showTime: 1 });

    return res.json(events);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const getMyEvents = async (req, res) => {
  try {
    const events = await MovieEvent.find({
      createdBy: req.user.userId
    }).sort({ showTime: 1 });

    return res.json(events);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
