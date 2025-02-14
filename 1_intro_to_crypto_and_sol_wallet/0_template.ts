import {clusterApiUrl, Connection, Keypair} from '@solana/web3.js'
import dotenv from 'dotenv';
dotenv.config();

async function main(){
    if (!process.env.SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
    const signerKeyPair = Keypair.fromSecretKey(secretKey);
    
    const connection = new  Connection(clusterApiUrl('devnet'),'confirmed');
    

    
}

main();