const { validationResult } = require('express-validator');

const { v4: uuidv4 } = require('uuid');
const Colour = require('../models/colour');

// GET

const getColours = async (req, res, next) => {
  let allColours;
  try {
    allColours = await Colour.find();
    if (!allColours) {
      return res.json({ ok: 1, message: "No colours exist!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching colour failed, please try again later!" });
  }
  res.json({ ok: 1, colours: allColours });
};

const getColour = async (req, res, next) => {
  const cid = req.params['cid'];
  let existingColour;
  try {
    existingColour = await Colour.findById(cid);
    if (!existingColour) {
      return res.json({ ok: -1, message: "Invalid colour ID! OR no colour exists with this ID" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching colour failed, please try again later!" });
  }
  res.json({ ok: 1, colour: existingColour });
};

// POST

const addColour = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ ok: -1, message: 'Invalid inputs passed, please check your data.' });
    }

    // if (req.userData.isAdmin === false){
    //   return res.json({ok:-1, message:'Only the ADMIN can add a new colour!' });
    // }

    const { name } = req.body;

    let colourWithSameName = await Colour.findOne({ name: name });
    if (colourWithSameName) {
      return res.json({ ok: -1, message: "A colour with the same 'name' already exists! Try another name!" })
    }
    // let colourWithSameCode = await Colour.findOne({ code: code });
    // if (colourWithSameCode) {
    //   return res.json({ok:-1, message: "A colour with the same 'Code' already exists! Try another 'code'!"})
    // }

    const createdColour = new Colour({
      name: name
    });

    await createdColour.save();

    res.status(201).json({
      ok: 1,
      colour: createdColour
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.json({ ok: -1, message: "Adding the new colour failed!" })
  }
};

const addColours = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: -1, message: 'Invalid inputs passed, please check your data.' });
    }

    const { names } = req.body; // `names` is a list of color name strings
    const addedColours = []; // To keep track of successfully added colors

    for (let name of names) {
      // Check if the color name already exists
      let colourWithSameName = await Colour.findOne({ name: name });
      if (colourWithSameName) {
        continue; // Skip if color already exists
      }
      
      // Create and save the new color
      const createdColour = new Colour({
        name: name
      });
      await createdColour.save();

      // Add to the list of successfully added colors
      addedColours.push(createdColour);
    }

    // Send a single response after all colors have been processed
    return res.status(201).json({
      ok: 1,
      addedColours: addedColours,
      message: "Added all unique colours!"
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ ok: -1, message: "Adding the new colours failed!" });
  }
};


// DELETE

const deleteColourById = async (req, res, next) => {
  const { colourId } = req.body;

  // deleting the colour
  try {
    await Colour.deleteOne({ _id: colourId });
  } catch (err) {
    return res.status(500).json({ ok: -1, message: "Could not delete colour! Something went wrong!" });
  }

  res.status(200).json({ ok: 1, message: "colour deleted successfully!" });
};

const deleteColourByName = async (req, res, next) => {
  const { name } = req.body;

  // deleting the colour
  try {
    await Colour.deleteOne({ name: name });
  } catch (err) {
    return res.status(500).json({ ok: -1, message: "Could not delete colour! Something went wrong!" });
  }

  res.status(200).json({ ok: 1, message: "colour deleted successfully!" });
};

module.exports = {
  getColours,
  getColour,
  addColour,
  addColours,
  deleteColourById,
  deleteColourByName
};