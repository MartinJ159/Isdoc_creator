const apiController = require("./apiController");
const filecontroller = require("./fileController");

// tady si ziskam vsechny itemy queue
exports.processQueue = async (tokenId, queueIds) => {
  let processDone;
  // 1) zpracovani vsech queue === ziskani dokumentu z aktivne bezici queue
  for (const el of queueIds) {
    docsIDs = await apiController.getAllDocs(tokenId, el);
    //  2) loop pro kazdy dokument v queue
    processDone = await this.processReceivedItem(tokenId, docsIDs, el);
  }
  return processDone;
};

exports.processReceivedItem = async (tokenId, docsIDs, el) => {
  // docsIDs array na konci pridat status o itemu
  for (const docID of docsIDs) {
    const docData = await apiController.getOneItem(tokenId, docID, el);
    const outputFile = await process.env.ISDOC_FILENAME.replace(
      /{%EL%}/g,
      docID
    );
    // zapis dat do templatu === bude pro 4 invoice party === 1) opening template, 2) invoices_template - line items, 3) taxing-template, 4) ending template
    // 1) opening Template
    const opening = await filecontroller.replaceOpeningTemplate(
      process.env.ISDOC_TEMPLATE_OPENING,
      docData
    );

    // 2) Invoice items
    const items = await filecontroller.appendParts(
      docData.line_items,
      process.env.ISDOC_TEMPLATE_ITEMS
    );
    // vlozeni spliteru
    const spliter = await filecontroller.appendSplitter(
      process.env.ISDOC_TEMPLATE_SPLITER
    );

    // 3) Tax items

    const taxes = await filecontroller.appendParts(
      docData.vat_details,
      process.env.ISDOC_TEMPLATE_TAXES
    );

    // 4) End template
    const closing = await filecontroller.replaceEndingTemplate(
      process.env.ISDOC_TEMPLATE_ENDING,
      docData
    );

    // 5) usporadani casti dokumentu
    const completedDocument = opening + items + spliter + taxes + closing;

    // 6) zapis dat
    filecontroller.writeData(completedDocument, outputFile);
  }
};
