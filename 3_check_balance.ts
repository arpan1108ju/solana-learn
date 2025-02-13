import { Connection,clusterApiUrl,Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const publicKey = process.argv[2];

async function main() {
    
    try {
        const connection = new Connection(clusterApiUrl('mainnet-beta'));
        const address = new PublicKey(publicKey);
        const balance = await connection.getBalance(address);
        console.log(`The balance of the account at ${address} is ${balance} lamports = ${balance/LAMPORTS_PER_SOL} SOL`);
        console.log(`✅ Finished!`);
        
    } catch (error : unknown) {
        console.log('Invalid public key');
    }   
}

main();




