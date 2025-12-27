import MovieEvent from "../schema/MovieEvent.js";

export const createEvent = async (req, res) => {
  const { movieTitle, theaterName, showTime, city, maxPeople } = req.body;

  if (!movieTitle || !theaterName || !showTime || !city) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  // Show time must be in future
  if (new Date(showTime) <= new Date()) {
    return res.status(400).json({
      message: "Show time must be in the future"
    });
  }

  try {
    const event = await MovieEvent.create({
      movieTitle,
      theaterName,
      showTime,
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
