const KOPrintRegistry = artifacts.require("KOPrintRegistry");
const KOPrintRegistryMinter = artifacts.require("KOPrintRegistryMinter");

module.exports = function(deployer) {
 deployer.deploy(KOPrintRegistry, "0xA07716Cfa56785c0e4ECA7F5f086E0F1D09CD1C7" , "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "100000000000000000", "","","");
 deployer.deploy(KOPrintRegistryMinter, "0x89447f2Ca722481d1399ae08b4d7E9471883F6c8", "0x3C0d974D25399FB6d0AF974b9384BEB1860A116C");
};
