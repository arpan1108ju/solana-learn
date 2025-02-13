import {Keypair} from '@solana/web3.js'

// ************* generate keypair 

const keypair = Keypair.generate();

console.log('public key : ',keypair.publicKey.toBase58())
console.log('secret key : ',keypair.secretKey)


// ************** exsiting key import
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}
const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();
console.log('public key is : ',publicKey);