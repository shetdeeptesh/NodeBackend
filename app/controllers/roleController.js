const Role = require("../models/roleModel");

async function handleCreateNewRole(req, res) {
  const body = req.body;
  if (!body || !body.name || !body.permissions) {
    return res.status(400).json({ msg: "all fields required" });
  }

  const uniqueFields = ["name"];
  for (const field of uniqueFields) {
    const RoleExist = await Role.exists({ [field]: body[field] });
    if (RoleExist) {
      return res
        .status(400)
        .json({ msg: `Role already exits with ${field} ${body[field]}` });
    }
  }

  try {
    const result = await Role.create({
      name: body.name,
      permissions: body.permissions,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleGetAllRoles(req, res) {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
  const skip = (page - 1) * limit;

  try {
    const totalRole = await Role.countDocuments({});
    const totalPages = Math.ceil(totalRole / limit);

    const roles = await Role.find({}).skip(skip).limit(limit);

    return res.json({
      roles,
      currentPage: page,
      totalPages,
      totalRole,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleGetRolesById(req, res) {
  const id = req.params.id;
  try {
    const roles = await Role.find({ _id: id });
    return res.json({ roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUpdateRolesById(req, res) {
  const updatableFields = ["name", "permissions"];

  const id = req.params.id;
  const role = await Role.find({ _id: id, isDeleted: false });
  if (!role) {
    return res.json({ msg: "role not found or deleted" });
  }

  var updatableFieldsData = {};
  for (const field of updatableFields) {
    if (req.body[field]) {
      updatableFieldsData[field] = req.body[field];
    }
  }

  const updatedRoles = await Role.findByIdAndUpdate(
    { _id: id },
    { $set: updatableFieldsData },
    { new: true }
  );
  return res.json(updatedRoles);
}

async function handleDeleteRolesById(req, res) {
  const id = req.params.id;
  const roleDeleted = await Role.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } }
  );


  if (roleDeleted) {
    return res.json({
      msg: "Role '" + roleDeleted["name"] + "' Deleted",
    });
  }

  return res.json({
    msg: "role not found or may be deleted",
  });
}

module.exports = {
  handleCreateNewRole,
  handleGetAllRoles,
  handleGetRolesById,
  handleUpdateRolesById,
  handleDeleteRolesById,
};
