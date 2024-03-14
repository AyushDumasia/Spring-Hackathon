const asyncHandler = require("express-async-handler");
const Inventory = require("../models/inventorySchema.js");
const { adminValidation } = require("../middlewares/adminValidation.js");

let getInventory = asyncHandler(async (req, res) => {
  res.render("./inventory/inventory.ejs", { Inventory });
});

let postInventory = asyncHandler(async (req, res) => {
  let { product, quantity, perPrice } = req.body;
  let newInventory = await Inventory.create({ product, quantity, perPrice });
  req.flash("success", "Inventory added successfully");
  res.redirect("/menu/inventory");
});

let inventoryHistory = asyncHandler(async (req, res) => {
  let inventory = await Inventory.find();
  res.render("./inventory/inventoryHistory.ejs", { inventory });
  // res.send(inventory);
});

module.exports = { getInventory, postInventory, inventoryHistory };
