import {clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js'
import base58 from 'bs58';

import dotenv from 'dotenv';
dotenv.config();


// sender   qVr69P48eeUUTKfY72HkJe2zg1c8FKGEPiCG1FmQvpb   Dg9YCBH6ffU6pcKSveL5H1FaP19pHqZnDtqzh6P2WDnp
// reciever 4zUkkDrUwr27Bn3peGtEfkREN7fAhfnSHmn275bH85sy  qVr69P48eeUUTKfY72HkJe2zg1c8FKGEPiCG1FmQvpb

// tx signature  5rznHwDeXw5oj2tKpqvUTMG15ggbYan8FojBDChQAqPhb1jxXaPvzd6fmRQLsGCazofd8QaprM7WnCusuPx5ATJ6

async function main() {
    try {
   
    if (!process.env.SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
    const sender1KeyPair = Keypair.fromSecretKey(secretKey);

    if (!process.env.SECRET_KEY_2) {
        throw new Error('SECRET_KEY_2 is not defined in the environment variables');
      }
    const secretKey2 = base58.decode(process.env.SECRET_KEY_2);
    const sender2KeyPair = Keypair.fromSecretKey(secretKey2);

    const toPublicKey1 = new PublicKey(process.argv[2]);
    const toPublicKey2 = new PublicKey(process.argv[3]);

    console.log(`got sender ${sender1KeyPair.publicKey.toBase58()} and reciver ${toPublicKey1.toBase58()}`)
    console.log(`got sender ${sender2KeyPair.publicKey.toBase58()} and reciver ${toPublicKey2.toBase58()}`)

    const connection = new Connection(clusterApiUrl('devnet'),'confirmed');

    console.log(
        `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
    );

    const transaction = new Transaction();
    const LAMPORTS_TO_SEND = 500;

    const sendSolInstruction1 = SystemProgram.transfer({
        fromPubkey : sender1KeyPair.publicKey,
        toPubkey : new PublicKey(toPublicKey1),
        lamports : LAMPORTS_TO_SEND
    })

    const sendSolInstruction2 = SystemProgram.transfer({
        fromPubkey : sender2KeyPair.publicKey,
        toPubkey : new PublicKey(toPublicKey2),
        lamports : LAMPORTS_TO_SEND * 2
    })

    transaction.add(sendSolInstruction1,sendSolInstruction2);

    const signature = await sendAndConfirmTransaction(connection,transaction,[
        sender1KeyPair,sender2KeyPair
    ])

    console.log(
        `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPublicKey1} and to ${toPublicKey2}. `,
      );
    console.log(`Transaction signature is ${signature}`);

         
   } catch (error) {
    console.log(error);        
   }
}

main();
