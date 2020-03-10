const KOPrintRegistryMinter = artifacts.require("KOPrintRegistryMinter");

module.exports = function(deployer) {
 deployer.deploy(KOPrintRegistryMinter, "0x89447f2Ca722481d1399ae08b4d7E9471883F6c8", "0x3C0d974D25399FB6d0AF974b9384BEB1860A116C", "0xdde2d979e8d39bb8416eafcfc1758f3cab2c9c72", "0xfbeef911dc5821886e1dda71586d90ed28174b7d");
};
