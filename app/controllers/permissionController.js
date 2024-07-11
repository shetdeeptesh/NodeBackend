const Permission = require("../models/permissionModel");

async function handleCreateNewPermission(req, res) {
  const body = req.body;
  if (!body || !body.name || !body.description) {
    return res.status(400).json({ msg: "all fields required" });
  }

  const uniqueFields = ["name"];
  for (const field of uniqueFields) {
    const PermissionExist = await Permission.exists({ [field]: body[field] });
    if (PermissionExist) {
      return res
        .status(400)
        .json({ msg: `Permission already exits with ${field} ${body[field]}` });
    }
  }

  try {
    const result = await Permission.create({
      name: body.name,
      description: body.description,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleGetAllPermissions(req, res) {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page if not provided
  const skip = (page - 1) * limit;

  try {
    const totalPermission = await Permission.countDocuments({});
    const totalPages = Math.ceil(totalPermission / limit);

    const permissions = await Permission.find({}).skip(skip).limit(limit);

    return res.json({
      permissions,
      currentPage: page,
      totalPages,
      totalPermission,
    });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleGetPermissionsById(req, res) {
  const id = req.params.id;
  try {
    const permissions = await Permission.find({ _id: id });
    return res.json({ permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUpdatePermissionsById(req, res) {
  const updatableFields = ["name", "description"];

  const id = req.params.id;
  const permission = await Permission.find({ _id: id, isDeleted: false });
  if (!permission) {
    return res.json({ msg: "permission not found or deleted" });
  }

  var updatableFieldsData = {};
  for (const field of updatableFields) {
    if (req.body[field]) {
      updatableFieldsData[field] = req.body[field];
    }
  }

  const updatedPermission = await Permission.findByIdAndUpdate(
    { _id: id },
    { $set: updatableFieldsData },
    { new: true }
  );
  return res.json(updatedPermission);
}

async function handleDeletePermissionsById(req, res) {
  const id = req.params.id;
  const permissionDeleted = await Permission.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } }
  );

  console.log(permissionDeleted);
  if (permissionDeleted) {
    return res.json({
      msg: "Permission '" + permissionDeleted["name"] + "' Deleted",
    });
  }

  return res.json({
    msg: "permisson not found or may be deleted",
  });
}

module.exports = {
  handleCreateNewPermission,
  handleGetAllPermissions,
  handleGetPermissionsById,
  handleUpdatePermissionsById,
  handleDeletePermissionsById,
};
