import {Keypair} from '@solana/web3.js'
import base58 from 'bs58'

// ************* generate keypair 

// const keypair = Keypair.generate();

// console.log('public key : ',keypair.publicKey.toBase58())
// console.log('secret key : ',keypair.secretKey)


// ************** exsiting key import
import dotenv from 'dotenv';
dotenv.config();

// from uint array
if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the environment variables');
}
const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();
console.log('public key 1 is : ',publicKey);


// from base58 rep
if (!process.env.SECRET_KEY_2) {
  throw new Error('SECRET_KEY_2 is not defined in the environment variables');
}
const secretKey2 = base58.decode(process.env.SECRET_KEY_2);
const sender2KeyPair = Keypair.fromSecretKey(secretKey2);
console.log('public key 2 is : ',sender2KeyPair.publicKey.toBase58());


