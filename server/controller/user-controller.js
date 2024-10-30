const { validationResult } = require('express-validator');

const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const User = require('../models/user');

// GET

// const getUserCount = async (req, res, next) => {
//   let count;
//   try {
//     count = await User.countDocuments({isAdmin:false});
//     if (!count || count===0) {
//       return res.json({
//         ok: 1,
//         message: 'No users found!',
//         count: 0
//       });
//     }
//   } catch (err) {
//     return res.json({ok:-1, message: "Fetching all user count failed!"});
//   }

//   res.json({ok:1, message: "Successfully Fetched user count", count: count});
// };

// const getUsers = async (req, res, next) => {
//   const page = req.query.page || 0;
//   const usersPerPage = process.env.DB_PAGECOUNT_USERS;
//   let users;
//   try {
//     users = await User
//       .find({}, '-password')
//       .skip(page * usersPerPage)
//       .limit(usersPerPage);
//   } catch (err) {
//     return res.json({ok:-1, message: "Fetching user failed, please try again later"});
//   }
//   res.json({ok:1, users: users.map(user => user.toObject({ getters: true }))});
// };

const getUser = async (req, res, next) => {
  const userName = req.params['username'];
  // console.log('DEBUG -- user-controller.js -- 1: '+uid);
  let user;
  try {
    // user = await User.find();
    user = await User.findOne({userName: userName}, '-password');
    // console.log('DEBUG -- user-controller.js -- 2: '+user.name);
    if (!user){
      return res.json({ok:-1, message: "Invalid Username!"});
    }
  } catch (err) {
    return res.json({ok:-1, message: "Fetching user failed, please try again later"});
  }
  res.json({ok:1, user: user});
};

// const getUserById = async (req, res, next) => {
//   const userId = req.params['uid'];
//   // console.log(userId);
//   let user;
//   try {
//     user = await User.findById({ _id: userId }, '-password')
//   } catch (err) {
//     return res.json({ok:-1, message: "Fetching user failed, please try again later"});
//   }

//   res.json({ok:1, user: user});
// };

// const getUserByEmail = async (req, res, next) => {
//   const email = req.params['email'];
//   let user;
//   try {
//     user = await User.find({ email: email }, '-password')
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching Employee failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   res.json({user: user});
// };

// const getUserByUsername = async (req, res, next) => {
//   const username = req.params['username'];
//   let user;
//   try {
//     user = await User.find({ userName: username }, '-password')
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching Employee failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   res.json({user: user});
// };

// const getEmployeesByProjectId = async (req, res, next) => {
//   const pid = req.params.pid;

//   let existingProject;
//   try {
//     existingProject = await Project.findById({_id: pid});
//   } catch (err) {
//     return res.json({ok:-1, message: "Fetching project failed! "+err})
//   }
//   if (!existingProject === 0) {
//     res.json({
//       ok: -1,
//       message: "Project does not exist with this ID",
//     });
//     return;
//   }

//   // Iterate over all user IDs
//   let existingEmployees = [];
//   for (let uid of existingProject.employees) {

//     // Finding the existance of the user with USER ID
//     let existingUser;
//     try {
//       existingUser = await User.findOne({ _id: uid, isEmployee: true, isAdmin: false });
//       if (!existingUser) {
//         continue; // Skip this user if they do not exist
//       }
//     } catch (error) {
//       // Log the error but do not stop processing the rest of the user IDs
//       console.error('Error finding user with ID:', uid, error);
//       continue;
//     }

//     existingEmployees.push(existingUser);
//   }

//   // Respond with all the approved applications
//   if (existingEmployees.length > 0) {
//     res.json({ ok: 1, employees: existingEmployees, message:"Fetching employees successful" });
//   } else {
//     // If no applications were approved, send a different response
//     res.json({ ok: -1, message: 'No employees' });
//   }
// };

// const getEmployeeCount = async (req, res, next) => {
//   let employeeCount;
//   try {
//     employeeCount = await User.countDocuments({ isEmployee: true, isTerminated: false  });
//   } catch (err) {
//     res.json({ ok:-1, message:"No Employees found" });
//     return;
//   }

//   res.json({ ok:1, count: employeeCount });
//   // console.log("DEBUG -- Employee-Controller - Fetching employee count successful!");
// };

// const getPaidEmployeeCount = async (req, res, next) => {
//   let employeeCount;
//   try {
//     employeeCount = await User.countDocuments({ isEmployee: true, isTerminated: false, isPaid: true });
//   } catch (err) {
//     res.json({ ok:-1, message:"No Paid Employees found" });
//     return;
//   }

//   res.json({ ok:1, count: employeeCount });
//   // console.log("DEBUG -- Employee-Controller - Fetching employee count successful!");
// };

// const getPaidEmployees = async (req, res, next) => {
//   const page = req.query.page || 0;
//   const employeesPerPage = process.env.DB_PAGECOUNT_EMPLOYEES;

//   let allEmployees;
//   try {
//     allEmployees = await User
//       .find({ isEmployee: true, isTerminated: false, isPaid: true }, '-password')  // Adjust the query to filter by isEmployee
//       .skip(page * employeesPerPage)
//       .limit(employeesPerPage);
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching paid Employees failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   if (!allEmployees || allEmployees.length === 0) {
//     res.json({
//       ok: -1,
//       message: "No paid employees found.",
//     });
//     return;
//   }

//   res.json({
//     ok: 1,
//     employees: allEmployees.map((emp) => emp.toObject({ getters: true })),
//   });
//   // console.log("DEBUG -- Employee-Controller - Fetching employees successful!");
// };

// const getEmployees = async (req, res, next) => {
//   const page = req.query.page || 0;
//   const employeesPerPage = process.env.DB_PAGECOUNT_EMPLOYEES;

//   let allEmployees;
//   try {
//     allEmployees = await User
//       .find({ isEmployee: true, isTerminated: false }, '-password')  // Adjust the query to filter by isEmployee
//       .skip(page * employeesPerPage)
//       .limit(employeesPerPage);
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching Employees failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   if (!allEmployees || allEmployees.length === 0) {
//     res.json({
//       ok: -1,
//       message: "No employees found.",
//     });
//     return;
//   }

//   res.json({
//     ok: 1,
//     employees: allEmployees.map((emp) => emp.toObject({ getters: true })),
//   });
//   // console.log("DEBUG -- Employee-Controller - Fetching employees successful!");
// };

// const getEmployeeById = async (req, res, next) => {
//   const userId = req.params['uid'];
//   let employee;
//   try {
//     employee = await User.findOne({ _id: userId, isEmployee: true,  }, '-password')
//     if (!employee){
//       return res.json({ok:-1, message:"Employee does not exist with userId: "+userId})
//     }
//   } catch (err) {
//     return res.json({ok:-1, message: "Fetching employee failed"});
//   }

//   res.json({ok:1, employee: employee});
// };

// const getEmployeeByEmail = async (req, res, next) => {
//   const email = req.params['email'];
//   let employee;
//   try {
//     employee = await User.findOne({ email: email, isEmployee: true, isTerminated: false }, '-password')
//     if (!employee){
//       return res.json({ok:-1, message:"Employee does not exist with email: "+email})
//     }
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching Employee failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   res.json({employee: employee});
// };

// const getEmployeeByUsername = async (req, res, next) => {
//   const username = req.params['username'];
//   let employee;
//   try {
//     employee = await User.findOne({ userName: username, isEmployee: true }, '-password')
//     if (!employee){
//       return res.json({ok:-1, message:"Employee does not exist with username: "+username})
//     }
//   } catch (err) {
//     const error = new HttpError(
//       'Fetching Employee failed, please try again later.',
//       500
//     );
//     return next(error);
//   }

//   res.json({employee: employee});
// };

// const searchEmployeeByEmail = async (req, res, next) => {
//   const search_email = req.params['search_email'];

//   let employee;
//   try {
//     // Use a regular expression to search for a user with an email that includes the searchQuery
//     // 'i' flag for case-insensitive search
//     employee = await User.findOne({ email: new RegExp(search_email, 'i'), isEmployee: true, isTerminated: false }, '-password');

//     if (!employee) {
//       return res.status(404).json({ ok:-1, message: 'No employee found matching the email query.' });
//     }

//   } catch (err) {
//     return res.json({ ok:-1, message: "Something went wrong!",err });
//   }

//   res.json({ ok:1, employee: employee });
// };

// POST

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ok:-1, message:'Invalid inputs passed, please check your data.' });
    }

    const { email, password } = req.body;

    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.json({ok:-1, message: "User already exists with this email!. Please log in!"})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const generatedUserName = uuidv4();

    const createdUser = new User({
      email: email,
      password: hashedPassword,
      userName: generatedUserName,
    });

    await createdUser.save();
    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1hr' }
    );

    res.status(201).json({
      userId: createdUser.id,
      userName: createdUser.userName,
      email: createdUser.email,
      token: token,
      isAdmin: false,
      isPaid: false,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.json({ok:-1, message: "Signup failed! Try again later!"})
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log("Email: "+email+" , Password: "+password);
  
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.json({ok:-1, message: "Something went wrong while searching the email!"})
  }

  if (!existingUser) {
    
    return res.json({ok:-1, message: "Invalid email! No user exists with this email!"})
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.json({ok:-1, message: "Something went wrong while checking password!"})
  }

  if (!isValidPassword) {
    return res.json({ok:-1, message: "Invalid password! Could not log in!"})
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return res.json({ok:-1, message: "Logging in failed, please try again later."})
  }

  res.status(201).json({
    ok: 1,
    userId: existingUser.id,
    userName: existingUser.userName,
    token: token,
    isAdmin: existingUser.isAdmin,
    isPaid: existingUser.isPaid,
    email: existingUser.email,
  });
};

// PATCH 

const updateUserInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ok:-1, message:'Invalid inputs passed, please check your data.' });
  }
  
  const { userName, email, password } = req.body;

  const userId = req.params.uid;

  let existingUser;
  try {
    // Find the existing user by userId
    existingUser = await User.findById({ _id: userId });
    if (!existingUser) {
      res.json({ok:-1, message:"No matching User ID found! Try again!" });
    }

    // Check if the updated userName already exists
    if (userName !== existingUser.userName) {
      const userWithSameId = await User.findOne({ userName: userName });
      if (userWithSameId) {
        res.json({ok:-1, message:"The entered userName already exists!" });
      }
    }

    // Check if the updated email already exists
    if (email !== existingUser.email) {
      const userWithSameEmail = await User.findOne({ email: email });
      if (userWithSameEmail) {
        res.json({ok:-1, message:"The entered email already exists!" });
      }
    }

    // Update the password if not default '-'
    let hashedPassword = existingUser.password;
    if (password !== '-'){
      hashedPassword = await bcrypt.hash(password, 12);
    }
    
    // Update user details
    existingUser.userName = userName;
    existingUser.email = email;
    existingUser.password = hashedPassword;

    // Save the updated user
    await existingUser.save();
    
    res.status(200).json({
      ok:1, 
      userName: existingUser.userName,
      email: existingUser.email,
    });
  } catch (err) {
    // Handle database or server errors
    res.status(200).json({ok:-1, message:"Something went wrong! could not save user details!" });
  }
};

// const updateUserInfo = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError('Invalid inputs passed, please check your data.', 422));
//   }
  
//   const { firstname, lastname, userName, email, phone, bio } = req.body;

//   const userId = req.params.uid;

//   let existingUser;
//   try {
//     // Find the existing user by userId
//     existingUser = await User.findById({ _id: userId });
//     if (!existingUser) {
//       res.json({ok:-1, message:"Username needs to be unique! Try again!" });
//     }

//     // Check if the updated userName already exists
//     if (userName !== existingUser.userName) {
//       const userWithSameId = await User.findOne({ userName });
//       if (userWithSameId) {
//         return next(new HttpError('The entered username is taken. Try something else.', 422));
//       }
//     }

//     // const hashedPassword = await bcrypt.hash(password, 12);
    
//     // Update user details
//     existingUser.firstname = firstname;
//     existingUser.lastname = lastname;
//     existingUser.userName = userName;
//     existingUser.email = email;
//     existingUser.bio = bio;
//     existingUser.phone = phone;

//     // Save the updated user
//     await existingUser.save();
    
//     res.status(200).json({ok:1, user: existingUser.toObject({ getters: true }) });
//   } catch (err) {
//     // Handle database or server errors
//     res.status(200).json({ok:-1, message:"Something went wrong! could not save user details!" });
//   }
// };

// const updateUserPassword = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError('Invalid inputs passed, please check your data.', 422));
//   }

//   const { oldPassword, newPassword } = req.body;
//   const userId = req.params.uid;

//   let existingUser;
//   try {
//     existingUser = await User.findById({ _id: userId });
//     if (!existingUser) {
//       return res.json({ok:-1, message: "User does not exist with this user ID"});
//     }
//   }
//   catch (error) {
//     return new HttpError("Something went wrong!", 404);
//   }

//   let isValidPassword = false;
//   try {
//     isValidPassword = await bcrypt.compare(oldPassword, existingUser.password);
//   } catch (err) {
//     return res.json({ok:-1, message: "Some error occured while comparing passwords!"});
//   }

//   if (!isValidPassword) {
//     return res.json({ok:-1, message: "The old password does not match!"});
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     existingUser.password = hashedPassword;
//     await existingUser.save();
//     res.json({ ok:1, message:"updated password", user: existingUser.toObject({ getters: true }) });
//   } catch (err) {
//     // Handle database or server errors
//     return res.json({ok:-1, message: "Something went wrong, could not update user password!"});
//   }
// };

// const updateUserImage = async (req, res, next) => {
//   const userId = req.params.uid;

//   try {
//     // Find the existing user by email
//     const existingUser = await User.findById({ _id: userId });
//     if (!existingUser) {
//       return next(new HttpError('User not found, update failed.', 404));
//     }

//     // Unlinking the user image file
//     const imagePath = existingUser.image;
//     if (imagePath !== process.env.DB_USER_DEFAULT_IMAGE){
//       fs.unlink(imagePath, err => {
//         console.log("Successfully deleted the image file for the user with ID:", userId);
//       })
//     }
    
//     // Linking the new image
//     try {
//       existingUser.image = req.file.path;
//       // console.log(req.file.path);
//     }
//     catch (err2){
//       console.log("File path error:\n",err2);
//     }

//     // Save the updated user
//     await existingUser.save();
    
//     res.status(200).json({ user: existingUser.toObject({ getters: true }) });
//   } catch (err) {
//     // Handle database or server errors
//     return next(new HttpError('Something went wrong[1], could not update user image.', 500));
//   }
// };

// const removeUserImage = async (req, res, next) => {
//   const userId = req.params.uid;

//   try {
//     // Find the existing user by email
//     const existingUser = await User.findById({ _id: userId });
//     if (!existingUser) {
//       return next(new HttpError('User not found, update failed.', 404));
//     }

//     // Unlinking the user image file
//     const imagePath = existingUser.image;
//     if (imagePath !== process.env.DB_USER_DEFAULT_IMAGE){
//       fs.unlink(imagePath, err => {
//         console.log("Successfully deleted the image file for the user with ID:", userId);
//       })
//     }
//     // Removing the file path from database
//     existingUser.image = process.env.DB_USER_DEFAULT_IMAGE;

//     // Save the updated user
//     await existingUser.save();
    
//     res.status(200).json({ user: existingUser.toObject({ getters: true }) });
//   } catch (err) {
//     // Handle database or server errors
//     return next(new HttpError('Something went wrong[1], could not update user image.', 500));
//   }
// };

// const updateUserAsEmployee = async (req, res, next) => {
//   // console.log(req.body);
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError('Invalid inputs passed, please check your data.', 422)
//     );
//   }

//   const { userId } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findById({_id: userId});
//     existingUser.isEmployee = true;
//     await existingUser.save();
      
//     return res.status(200).json({ok: 1, message:"User updated to Employee" });
//   } catch (err) {
//     return res.json({ok:-1, message:"Something went wrong!"+err})
//   }
// };

// // DELETE

// const deleteUser = async (req, res) => {
//   const userId = req.params.uid;

//   // checking the existence of the user with the user ID
//   let existingUser;
//   try {
//     existingUser = await User.findById(userId);
//   } catch (err) {
//     return res.status(500).json({ ok: -1, message: "Something went wrong, could not find user" });
//   }

//   // getting the user's image path
//   let imagePath = existingUser.image;

//   // checking if the passwords match
//   const password = req.body.password;
//   try {
//     const isValidPassword = await bcrypt.compare(password, existingUser.password);
//     if (!isValidPassword) {
//       return res.status(401).json({ ok: -1, message: "Could not delete Account! Passwords do not match" });
//     }
//   } catch (err) {
//     return res.status(500).json({ ok: -1, message: "Could not match the passwords" });
//   }

//   // deleting all the applications linked to the user
//   try {
//     const applications = await Applied.find({ user: userId });
//     for (let existingApplied of applications) {
//       let resumePath = existingApplied.resume;
//       if (resumePath !== process.env.DB_USER_DEFAULT_RESUME) {
//         try {
//           await fs.promises.unlink(resumePath);
//           console.log("Successfully deleted the resume file for the user's application");
//         } catch (err) {
//           console.log("Failed to delete the resume file for the user's application");
//         }
//       }
//     }

//     // Deleting all the applications
//     await Applied.deleteMany({ user: userId });
//   } catch (err) {
//     console.log("Error in deleting applications for the user:", err);
//   }

//   // deleting the user
//   try {
//     await User.deleteOne({ _id: userId });
//   } catch (err) {
//     return res.status(500).json({ ok: -1, message: "Could not delete Account! Something went wrong!" });
//   }

//   // unlinking the image file from the database
//   if (imagePath !== process.env.DB_USER_DEFAULT_IMAGE) {
//     try {
//       await fs.promises.unlink(imagePath);
//       console.log("Successfully deleted the image file for the user");
//     } catch (err) {
//       console.log("Failed to delete the image file for the user");
//     }
//   }

//   res.status(200).json({ ok: 1, message: "User account deleted successfully!" });
// };

module.exports = {
  // getEmployeeCount,
  // getPaidEmployeeCount,
  // getEmployees,
  // getPaidEmployees,
  // getEmployeeById,
  // getEmployeeByEmail,
  // getEmployeeByUsername,
  // searchEmployeeByEmail,

  // getUserCount,
	// getUsers,
  getUser,
  // getUserById,
  // getUserByEmail,
  // getUserByUsername,
  // getEmployeesByProjectId,

	signup,
	login,

  updateUserInfo
  // updateUserInfo,
  // updateUserPassword,
  // updateUserImage,
  // removeUserImage,
  // updateUserAsEmployee,

  // deleteUser
};