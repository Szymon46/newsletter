const mongoose = require("mongoose");
const { createUser, getUser } = require("./models/user");

/**
 * Connects to the database
 * @param {string} hostname
 */
async function connect(hostname) {
  try {
    await mongoose.connect(`mongodb://${hostname}/newsletter`);
    console.error("Connected to the database...");
  } catch (err) {
    console.error(`Could not connect to the database: ${err}`);
  }

  await init();
}

async function init() {
  const adminExists = (await getUser("admin")) ? true : false;

  if (adminExists) {
    return;
  }

  try {
    await createUser("admin", "admin");
  } catch (err) {
    console.error(`Could not initialize the database: ${err}`);
  }
}

module.exports = { connect, init };
