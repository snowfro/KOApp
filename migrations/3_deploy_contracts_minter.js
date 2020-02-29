const KOPrintRegistryMinter = artifacts.require("KOPrintRegistryMinter");

module.exports = function(deployer) {
 deployer.deploy(KOPrintRegistryMinter, "0x89447f2Ca722481d1399ae08b4d7E9471883F6c8", "0x3C0d974D25399FB6d0AF974b9384BEB1860A116C");
};
