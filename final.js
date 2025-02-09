const fs = require("fs");
const ethers = require("ethers");

// Define your mnemonic phrase
const mnemonic = "brisk dance matter also during ill gym success trigger list member project";

// Read passphrase from `phrase.txt`
const passphrase = fs.readFileSync("phrase.txt", "utf8").trim();

// Get the derivation path from the command-line argument
const derivPath = process.argv[2];

if (!derivPath) {
  console.error("Error: Please provide a derivation path as an argument.");
  console.error("Example: node code.js m/1/5/0/0/0");
  process.exit(1);
}

// Derive wallet with the provided derivation path and passphrase
const hdnodePass = ethers.utils.HDNode.fromMnemonic(mnemonic, passphrase);
const wallet = hdnodePass.derivePath(derivPath);

// Log the address and private key to the console
console.log(`Address for derivation path "${derivPath}" with passphrase:`, wallet.address);
// console.log(`Private key for derivation path "${derivPath}" with passphrase:`, wallet.privateKey);

// Write the private key to a file named `privkey.txt`
fs.writeFileSync("privkey.txt", wallet.privateKey);
console.log("Private key has been written to privkey.txt");
