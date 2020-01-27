const auth = require("./../funcControllers/authController");
const apiController = require("./../funcControllers/apiController");
const actionController = require("./../funcControllers/actionController");

const appcontroller = async () => {
  // login do Rossumu
  const tokenId = await auth.login();

  // ziskani queues
  const queueIds = await apiController.getQueues(tokenId);

  // zacatek loopu
  const queueDone = await actionController.processQueue(tokenId, queueIds);

  // ziskani dat itemu === loop pro vsechny ziskane dokumenty
  await auth.logout(tokenId);
};

module.exports = appcontroller;
