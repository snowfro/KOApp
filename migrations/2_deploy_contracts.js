const KOPrintRegistry = artifacts.require("KOPrintRegistry");

module.exports = function(deployer) {
 deployer.deploy(KOPrintRegistry, "0xA07716Cfa56785c0e4ECA7F5f086E0F1D09CD1C7" , "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "","","");
};
