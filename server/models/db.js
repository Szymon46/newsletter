const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { User } = require("./user");

async function connect(hostname) {
  await mongoose
    .connect(`mongodb://${hostname}/newsletter`)
    .then(() => {
      console.log("Connected to MongoDB...");
    })
    .catch((err) => {
      console.error(`Could not connect to MongoDB: ${err}`);
    });

  const isInit = await checkInit();

  if (!isInit) {
    await init();
  }
}

async function init() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("admin", salt);

  const admin = User({
    username: "admin",
    hash,
  });

  await admin
    .save()
    .catch((err) => console.log(`Could not add the user: ${err}`));
}

async function checkInit() {
  const adminExists = await User.findOne({ username: "admin" });

  if (adminExists) {
    return true;
  }

  return false;
}

module.exports = {
  connect,
  init,
  checkInit,
};
