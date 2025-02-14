import { Connection,clusterApiUrl,Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}
const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

const connection = new Connection(clusterApiUrl('devnet'));


async function main() {
    const address = new PublicKey(publicKey);
    const balance = await connection.getBalance(address);
    console.log(`The balance of the account at ${address} is ${balance} lamports = ${balance/LAMPORTS_PER_SOL} SOL`);
    console.log(`✅ Finished!`);
    
}

main();


