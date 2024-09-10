const mongoose = require("mongoose");

const ledgeruser = new mongoose.Schema({
  name: String,
});

const LedgerUser = mongoose.model("LedgerUser", ledgeruser);

module.exports = LedgerUser;
