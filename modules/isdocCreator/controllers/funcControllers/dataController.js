exports.invoiceDataMining = data => {
  let invoiceData = new Object();
  data.forEach(el => {
    el.content.forEach(category => {
      category.children.forEach(item => {
        const name = item.schema_id;
        const value = item.value;
        // jedna se o polozku, ktera ma dalsi itemy === Vat detail/radkova polozka
        if (item.value === undefined) {
          // vytvoreni array pro celou polozku
          let subArray = [];
          item.children.forEach(data => {
            // vytvoreni objektu pro sub polozku
            let invoiceSubData = new Object();
            data.children.forEach(el => {
              // vyplneni objektu daty
              const subName = el.schema_id;
              const subValue = el.value;
              invoiceSubData[subName] = subValue;
            });
            // prilepeni dat do array
            subArray.push(invoiceSubData);
          });
          // prirazeni arraye dane polozce
          invoiceData[name] = subArray;
        } else invoiceData[name] = value;
      });
    });
  });
  return invoiceData;
};

exports.getDocumentIDs = data => {
  let documentIds = [];
  data.forEach(element => {
    let id = element.url;
    id = id.replace(process.env.ELIS_ROSSUM_ANNOT_PATH, "");
    documentIds.push(id);
  });
  return documentIds;
};

exports.getQueues = data => {
  let queueIds = [];
  data.forEach(el => {
    queueIds.push(el.id);
  });
  return queueIds;
};
