const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, { skip, limit }).populate(
    "owner",
    "email"
  );
  res.json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  if (req.user._id !== { owner }) {
    throw HttpError(404, "Not found");
  }
  const { contactId } = req.params;
  // const existIdinUser = await User.exists({ contactId });
  // if (!existIdinUser) {
  //   throw HttpError(404, "Not found");
  // }
  const result = await Contact.findById(contactId);
  res.json({ result });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  if (req.user._id !== { owner }) {
    throw HttpError(404, "Not found");
  }
  const { contactId } = req.params;
  // const existIdinUser = await User.exists({ contactId });
  // if (!existIdinUser) {
  //   throw HttpError(404, "Not found");
  // }
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).json({
    message: "Deleted",
  });
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  if (req.user._id !== { owner }) {
    throw HttpError(404, "Not found");
  }
  const { contactId } = req.params;
  // const existIdinUser = await User.exists({ contactId });
  // if (!existIdinUser) {
  //   throw HttpError(404, "Not found");
  // }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  // const { _id: owner } = req.user;
  // if (req.user._id !== { owner }) {
  //   throw HttpError(404, "Not found");
  // }
  const { contactId } = req.params;
  const existIdinUser = await User.exists({ contactId });
  if (!existIdinUser) {
    throw HttpError(404, "Not found");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
