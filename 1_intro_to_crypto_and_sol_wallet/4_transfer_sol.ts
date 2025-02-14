import {clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction} from '@solana/web3.js'
import dotenv from 'dotenv';
dotenv.config();


// sender   qVr69P48eeUUTKfY72HkJe2zg1c8FKGEPiCG1FmQvpb
// reciever 4zUkkDrUwr27Bn3peGtEfkREN7fAhfnSHmn275bH85sy

// tx signature  48WheerhacvXYbP26XixbHMPy4yr7ADR27tMjSTj6sbpM4Y9U5ZJsKWdeQNgYCn8jiin6dEwNqQ2Key5dCDACYhK

async function main() {
    try {
   
    if (!process.env.SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
    const senderKeyPair = Keypair.fromSecretKey(secretKey);

    const toPublicKey = new PublicKey(process.argv[2]);

    console.log(`got sender ${senderKeyPair.publicKey.toBase58()} and reciver ${toPublicKey.toBase58()}`)

    const connection = new Connection(clusterApiUrl('devnet'),'confirmed');

    console.log(
        `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
    );

    const transaction = new Transaction();
    const LAMPORTS_TO_SEND = 500;

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey : senderKeyPair.publicKey,
        toPubkey : new PublicKey(toPublicKey),
        lamports : LAMPORTS_TO_SEND
    })

    transaction.add(sendSolInstruction);


    const startTime = Date.now();
    const signature = await sendAndConfirmTransaction(connection,transaction,[
        senderKeyPair
    ])
    const endTime = Date.now();



    console.log(
        `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPublicKey} with time ${(endTime-startTime)/1000}s. `,
      );
    console.log(`Transaction signature is ${signature}`);

         
   } catch (error) {
    console.log(error);        
   }
}

main();
