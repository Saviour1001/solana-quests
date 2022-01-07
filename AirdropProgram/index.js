// Importing libraries

const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

// Creating a new wallet

const newPair = new Keypair();
console.log(`=> For wallet address ${newPair.publicKey}`);
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

// Getting the balance of the wallet

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

// Calling an airdrop program

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`-- Airdropping 2 SOL --`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Driver function
const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};
driverFunction();
