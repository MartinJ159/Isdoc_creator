const fs = require("fs");

// nacteni template filu
exports.readFile = filepath => {
  const template = fs.readFileSync(filepath, "utf-8");
  return template;
};

// replace Opening template
exports.replaceOpeningTemplate = (filePath, invoiceData) => {
  const data = this.readFile(filePath);
  let newData = data;
  newData = newData.replace(/{%ID%}/g, invoiceData.invoice_id);
  newData = newData.replace(/{%ISSUEDATE%}/g, invoiceData.date_issue);
  newData = newData.replace(/{%TAXDATE%}/g, invoiceData.date_uzp);
  newData = newData.replace(/{%VATAPPLY&}/g, "true");
  newData = newData.replace(/{%LOCALCURRCODE%}/g, invoiceData.currency);
  newData = newData.replace(/{%CURRCODE%}/g, "1");
  newData = newData.replace(/{%REFCURRRATE%}/g, "1");
  newData = newData.replace(/{%LOCALCURRCODE%}/g, invoiceData.sender_ic);
  newData = newData.replace(/{%SENDERIC%}/g, invoiceData.currency);
  newData = newData.replace(/{%SENDERNAME%}/g, invoiceData.sender_name);
  newData = newData.replace(/{%SENDERDIC%}/g, invoiceData.sender_dic);
  newData = newData.replace(/{%VENDORTAXSCHEME%}/g, "");
  newData = newData.replace(/{%RECIPIENTIC%}/g, invoiceData.recipient_ic);
  newData = newData.replace(/{%RECIPIENTDIC%}/g, invoiceData.recipient_dic);
  newData = newData.replace(/{%RECIPIENTNAME%}/g, invoiceData.recipient_name);
  newData = newData.replace(/{%RECIPIENTTAXSCHEME%}/g, "");
  newData = newData.replace(/{%ORDERID%}/g, invoiceData.order_id);
  newData = newData.replace(/{%ORDERNUMBER%}/g, invoiceData.order_id);
  return newData;
};

// Replace invoice lines

exports.replaceInvoiceLines = (filePath, invoiceData) => {
  const data = this.readFile(filePath);
  let newData = data;
  newData = newData.replace(/{%QUANTITY%}/g, invoiceData.item_quantity);
  newData = newData.replace(
    /{%PRICEWITHOUTVAT%}/g,
    invoiceData.item_net_unit_price
  );
  newData = newData.replace(/{%UNITPRICE%}/g, invoiceData.item_unit_price);
  newData = newData.replace(/{%VATRATE%}/g, invoiceData.item_vat_rate);
  newData = newData.replace(/{%DESC%}/g, invoiceData.item_desc);
  newData = newData.replace(/{%VATCALCMETHOD%}/g, "0");
  newData = newData.replace(/{%SELLERITEMID%}/g, "");
  newData = newData.replace(
    /{%TOTALBASE%}/g,
    invoiceData.item_net_unit_price * invoiceData.item_quantity
  );
  newData = newData.replace(
    /{%TOTALAMOUNT%}/g,
    invoiceData.item_unit_price * invoiceData.item_quantity
  );
  newData = newData.replace(
    /{%VAT%}/g,
    invoiceData.amount_total - invoiceData.amount_total_base
  );
  return newData;
};

// Replace taxes

exports.replaceTaxes = (filePath, invoiceData) => {
  const data = this.readFile(filePath);
  let newData = data;
  newData = newData.replace(/{%TAXABLEAMOUNT%}/g, invoiceData.vat_detail_base);
  newData = newData.replace(/{%TAXAMOUNT%}/g, invoiceData.vat_detail_tax);
  newData = newData.replace(
    /{%TAXINCLUSIVEAMOUNT%}/g,
    invoiceData.vat_detail_base + invoiceData.vat_detail_tax
  );
  newData = newData.replace(/{%ALREADYCLAIMEDTAXABLEAMOUNT%}/g, "0");
  newData = newData.replace(/{%ALREADYCLAIMEDTAXAMOUNT%}/g, "0");
  newData = newData.replace(/{%TAXAMOUNT%}/g, invoiceData.vat_detail_tax);
  newData = newData.replace(/{%ALREADYCLAIMEDTAXINCLUSIVEAMOUNT%}/g, "0");
  newData = newData.replace(
    /{%DIFFTAXABLEAMOUNT%}/g,
    invoiceData.vat_detail_base
  );
  newData = newData.replace(/{%DIFFTAXAMOUNT%}/g, invoiceData.vat_detail_tax);
  newData = newData.replace(
    /{%DIFFTAXINCLUSIVEAMOUNT%}/g,
    invoiceData.vat_detail_base + invoiceData.vat_detail_tax
  );
  newData = newData.replace(/{%TAXPERCENT%}/g, invoiceData.vat_detail_rate);
  return newData;
};

// replace Ending template

exports.replaceEndingTemplate = (filePath, invoiceData) => {
  const data = this.readFile(filePath);
  let newData = data;
  newData = newData.replace(
    /{%TOTALWITHOUTTAX%}/g,
    invoiceData.amount_total_base
  );
  newData = newData.replace(/{%AMOUNTPAID%}/g, "0");
  newData = newData.replace(/{%ALREADYPAIDWITHOUTTAX%}/g, "0");
  newData = newData.replace(/{%PAIDDEPOSITAMOUNT%}/g, "0");
  newData = newData.replace(
    /{%AMOUNTROUNDING%}/g,
    invoiceData.amount_total -
      invoiceData.amount_total_base -
      invoiceData.amount_total_tax
  );
  newData = newData.replace(/{%AMOUNTDUE%}/g, invoiceData.amount_total);
  newData = newData.replace(/{%TERMS%}/g, "");
  newData = newData.replace(/{%DUEDATE%}/g, invoiceData.date_due);
  newData = newData.replace(/{%ACCOUNTNUMBER%}/g, invoiceData.account_num);
  newData = newData.replace(/{%BANKCODE%}/g, invoiceData.bank_num);
  newData = newData.replace(/{%BANKNAME%}/g, "");
  newData = newData.replace(/{%IBAN%}/g, invoiceData.iban);
  newData = newData.replace(/{%BICSWIFT%}/g, invoiceData.bic);
  newData = newData.replace(/{%PAYMENTREFERENCE%}/g, invoiceData.var_sym);
  newData = newData.replace(/{%CONSTSYM%}/g, invoiceData.const_sym);
  return newData;
};

exports.appendSplitter = filePath => {
  const data = this.readFile(filePath);
  return data;
};

// zapis dat = slozeni pucli
exports.writeData = (data, filePath) => {
  // append opening
  fs.appendFile(filePath, data, function(err) {
    if (err) error = err;
  });
};

exports.moveFile = (oldname, newName) => {
  fs.rename(oldname, newName, function(err) {
    if (err) throw err;
  });
};

exports.appendParts = async (data, template, outputFile) => {
  let completedParts = "";
  for (const el of data) {
    completedParts =
      completedParts +
      (await this.replaceInvoiceLines(template, el, outputFile));
  }
  return completedParts;
};
