const User = require("../models/userModel");

const { hashPassword, comparePassword } = require("../helpers/passwordHashing");
const { setUser } = require("../service/authService");

// to get all users with pagination enabled
async function handleGetAllUsers(req, res) {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page if not provided
  const skip = (page - 1) * limit;

  try {
    const totalUsers = await User.countDocuments({});
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({}).skip(skip).limit(limit);

    return res.json({
      users,
      currentPage: page,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// Get the user By Id
async function handleGetUserById(req, res) {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  return res.json(user);
}

// Update the registred user
async function handleUpdateUserById(req, res) {
  const updatableFields = ["firstName", "lastName", "email"];

  const id = req.params.id;
  const user = await User.find({ _id: id, isDeleted: false });
  if (!user) {
    return res.json({ msg: "user not found or deleted" });
  }

  var updatableFieldsData = {};
  for (const field of updatableFields) {
    if (req.body[field]) {
      updatableFieldsData[field] = req.body[field];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { $set: updatableFieldsData },
    { new: true }
  );
  return res.json(updatedUser);
}

// Delete the registred user
async function handleDeleteUserById(req, res) {
  const id = req.params.id;
  const userDeleted = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } }
  );

  console.log(userDeleted);
  if (userDeleted) {
    return res.json({
      msg:
        "user '" +
        userDeleted["firstName"] +
        " " +
        userDeleted["lastName"] +
        "' Deleted",
    });
  }

  return res.json({
    msg: "user not found or may be deleted",
  });
}

// Register new user
async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.password
  ) {
    return res.status(400).json({ msg: "all fields required" });
  }

  const uniqueFields = ["email"];
  for (const field of uniqueFields) {
    const userExist = await User.exists({ [field]: body[field] });
    if (userExist) {
      return res
        .status(400)
        .json({ msg: `user already exits with ${field} ${body[field]}` });
    }
  }

  // Password hashing
  const password = hashPassword(body.password);
  try {
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: password,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// login user
async function handleUserLogin(req, res) {
  const body = req.body;
  if (!body || !body.email || !body.password) {
    return res.status(400).json({ msg: "all fields required" });
  }

  const user = await User.findOne({ email: body.email, isDeleted: false });
  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }

  const isPasswordCorrect = comparePassword(user.password, body.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "incorrect password" });
  }

  const token = setUser(user);
  return res.json({ token: token });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  handleUserLogin,
};
