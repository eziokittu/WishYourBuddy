const { validationResult } = require('express-validator');

// const { v4: uuidv4 } = require('uuid');
const Page = require('../models/page');
const User = require('../models/user');

// GET

const getPage = async (req, res, next) => {
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

  // Checking page validity
  const pageName = req.params['pageName'];
  let existingPage;
  try {
    existingPage = await Page.findOne({ name: pageName });
    if (!existingPage) {
      return res.json({ ok: -1, message: "Invalid page name!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching page failed, please try again later!" });
  }

  // Checking if the page belongs to this user
  try {
    let pageBelongsToUser = false;
    for (let i = 0; i < existingUser.pages.length; i++) {
      if (existingUser.pages[i].equals(existingPage._id)) {
        pageBelongsToUser = true;
        break;
      }
    }

    // page not of this user
    if (!pageBelongsToUser) {
      return res.json({ ok: 1, message: "Page does not belong to this user!", page: existingPage, isOwner: false });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Error checking page ownership, please try again later!" });
  }

  return res.json({ ok: 1, message: "Page belongs to this user", page: existingPage, isOwner: true });
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
    existingUser = await User.findOne({ userName: userName });
    if (!existingUser) {
      return res.json({ ok: -1, message: "Invalid Username!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching user failed, please try again later." });
  }

  // Finding the page with the provided name
  let pageToDelete;
  try {
    pageToDelete = await Page.findOne({ name: pageName });
    if (!pageToDelete) {
      return res.json({ ok: -1, message: "Page not found!" });
    }
  } catch (err) {
    return res.json({ ok: -1, message: "Fetching page failed, please try again later." });
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
    return res.json({ ok: -1, message: "Deleting page failed, please try again later." });
  }
};


module.exports = {
  getPage,
  createPage,
  deletePage
};