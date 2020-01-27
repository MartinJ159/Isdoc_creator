const axios = require("./../../../../utility/axiosConfig");
const dataController = require("./dataController");

exports.getAllDocs = async (token, queueID) => {
  const res = await axios
    .get(process.env.ELIS_ENDPOINT.replace(/{%QUEUEID%}/g, queueID), {
      headers: { Authorization: "token " + token }
    })
    .catch(function(error) {
      console.log("chyba get all docs");
    });
  const documentIds = dataController.getDocumentIDs(res.data.results);
  return documentIds;
};

exports.getOneItem = async (token, id, queueID) => {
  const res = await axios
    .get(
      process.env.ELIS_DOCUMENT_ENDPOINT.replace(/{%QUEUEID%}/g, queueID) + id,
      {
        headers: { Authorization: "token " + token }
      }
    )
    .catch(function(error) {
      console.log("chyba get one doc");
    });
  const invoiceData = dataController.invoiceDataMining(res.data.results);
  return invoiceData;
};

exports.getQueues = async token => {
  const res = await axios
    .get(process.env.ELIS_WORKSPACE_ENDPOINT, {
      headers: { Authorization: "token " + token }
    })
    .catch(function(error) {
      console.log("chyba get queue");
    });
  const queueIds = dataController.getQueues(res.data.results);
  return queueIds;
};
