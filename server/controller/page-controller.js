const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// const { v4: uuidv4 } = require('uuid');
const Page = require('../models/page');
const User = require('../models/user');

// GET

const getPage = async (req, res, next) => {
  const userName = req.params['userName'];

  // Checking user validity
  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName });
    if (!existingUser) {
      return res.status(404).json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.status(500).json({ ok: -1, message: "Fetching user failed, please try again later" });
  }

  // Checking page validity for that user
  const pageName = req.params['pageName'];
  let existingPage;
  try {
    existingPage = await Page.findOne({ name: pageName, user: existingUser._id });
    if (!existingPage) {
      return res.status(404).json({ ok: -1, message: "Invalid URL / page is not owned my this user" });
    }
  } catch (err) {
    return res.status(500).json({ ok: -1, message: `Fetching page failed, please try again later!\n${err}` });
  }
  return res.status(200).json({ ok: 1, message: "Existing Page found!", page: existingPage });
};

const getPages = async (req, res, next) => {
  const userName = req.params['userName'];

  // Checking user validity
  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName }, '-password').populate('pages');
    if (!existingUser) {
      return res.json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching user failed, please try again later" });
  }

  // Getting all pages
  let allPages = [];
  try {
    for (const pageId of existingUser.pages) {
      const page = await Page.findById(pageId);
      if (page) {
        allPages.push(page);
      }
    }
    return res.json({ok: 1, message: "Successful in fetching user pages", pages: allPages})
  } catch (err) {
    return res.json({ ok: -1, message: "Something went wrong while fetching pages! Please try again later!" });
  }
};

const getPageNames = async (req, res, next) => {
  const userName = req.params['userName'];

  // Checking user validity
  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName }, '-password');
    if (!existingUser) {
      return res.json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching user failed, please try again later" });
  }

  // Getting only page names based on the user's page IDs
  let pageNames = [];
  try {
    for (const pageId of existingUser.pages) {
      const page = await Page.findById(pageId).select('name'); // Only selecting the 'name' field
      if (page) {
        pageNames.push(page.name);
      }
    }
    return res.json({ ok: 1, message: "Successfully fetched user page names", pageNames: pageNames });
  } catch (err) {
    return res.json({ ok: -1, message: "Something went wrong while fetching page names! Please try again later!" });
  }
};


// POST

const createPage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ ok: -1, message: 'Invalid inputs passed, please check your data.' });
  }

  const userName = req.params['userName'];
  const { name, pageElements } = req.body;

  // Fetching the user with the username
  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName }, '-password');
    if (!existingUser) {
      return res.json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching user failed, please try again later" });
  }

  // Checking if a page with this name already exists
  // An user can change their username in future hence all page names must be unique
  let existingPage;
  try {
    existingPage = await Page.findOne({ name: name }); // Corrected variable usage
    if (existingPage) {
      return res.json({ ok: -1, message: "A page already exists with this name!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching page failed, please try again later!" });
  }

  // Creating the new page
  try {
    // const generatedId = uuidv4();
    const createdPage = new Page({
      name: name,
      pageElements: pageElements,
      creationDate: Date.now(),
      user: existingUser._id
    });

    // Saving the page
    await createdPage.save();

    // Linking the page with the user
    existingUser.pages.push(createdPage._id);
    await existingUser.save();

    return res.status(201).json({
      ok: 1,
      page: createdPage
    });
  } catch (err) {
    console.error("Creating page failed! " + err);
    return res.json({ ok: -1, message: "Adding new page failed!" });
  }
};

// PATCH



// DELETE

const deletePage = async (req, res, next) => {
  const userName = req.params['userName'];
  const pageName = req.params['pageName'];

  // Fetching the user with the username
  let existingUser;
  try {
    existingUser = await User.findOne({ userName: userName }).populate('pages');
    if (!existingUser) {
      return res.status(404).json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.status(500).json({ ok: -1, message: "Fetching user failed, please try again later." });
  }

  // Finding the page with the provided name
  let pageToDelete;
  try {
    pageToDelete = await Page.findOne({ name: pageName });
    if (!pageToDelete) {
      return res.status(404).json({ ok: -1, message: "Page not found!" });
    }

    // Verify if the page belongs to the user
    const userOwnsPage = existingUser.pages.some(page => page._id.equals(pageToDelete._id));
    if (!userOwnsPage) {
      return res.status(403).json({ ok: -1, message: "User does not own this page." });
    }
  } catch (err) {
    return res.status(500).json({ ok: -1, message: "Fetching page failed, please try again later." });
  }

  // Deleting the page and unlinking from the user
  try {
    // Deleting the page from the collection
    await Page.deleteOne({ _id: pageToDelete._id });

    // Unlinking the page from the user's pages array
    existingUser.pages = existingUser.pages.filter(pageId => !pageId.equals(pageToDelete._id));
    await existingUser.save();

    return res.status(200).json({
      ok: 1,
      message: "Page successfully deleted and unlinked from the user."
    });
  } catch (err) {
    console.error("Deleting page failed! " + err);
    return res.status(500).json({ ok: -1, message: "Deleting page failed, please try again later." });
  }
};


module.exports = {
  getPage,
  getPageNames,
  getPages,
  createPage,
  deletePage
};