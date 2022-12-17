const constants = require("../utilities/constants");

const mongoose = require("mongoose");

const samplePro = require("../models/sampro_model");
var fs = require("fs");

exports.createOrUpdate = async (req, res) => {
  try {
    const samPro = req.body;
    if (req.file) {
      samPro.image = req.file.path;
    }
    const samProId =
      req.body.samProId && mongoose.isValidObjectId(req.body.samProId)
        ? req.body.samProId
        : mongoose.Types.ObjectId();
    const samProCreate = await samplePro.findOneAndUpdate(
      { _id: samProId },
      samPro,
      { new: true, upsert: true }
    );

    res.status(constants.post_success).send({
      data: { samPro: samProCreate },
      error: null,
      status: constants.post_success,
      message: "data created successfully",
    });
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: "Error in creating the  data",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber)
      : 1;
    const samproo = await samplePro
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
    const total = await samplePro.countDocuments();
    res.status(constants.post_success).send({
      data: { samp: samproo, total: total },
      error: null,
      status: constants.post_success,
      message: "All the data Collected Sucessfully",
    });
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: "Error in getting the form",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const samppleP = await samplePro.findOne({ _id: req.params.samProId });

    res.status(constants.post_success).send({
      data: { sam: samppleP },
      error: null,
      status: constants.post_success,
      message: "got the data successfully",
    });
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: "Error in getting the data",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const samplePro_delete = await samplePro.findOneAndDelete({
      _id: req.params.samProId,
    });
    fs.unlink(samplePro_delete.image, (err) => {
      if (err) throw err;
    });
    res.status(constants.post_success).send({
      data: samplePro_delete,

      error: null,
      status: constants.post_success,
      message: "form Deleted Sucessfully",
    });
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: "Error in deleting the form",
    });
  }
};
