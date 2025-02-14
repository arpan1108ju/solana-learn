import {clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction} from '@solana/web3.js'
import dotenv from 'dotenv';
dotenv.config();

// tx signature 66t5x6fVXCj6s4w1C1eGPkkQrCq3BoYmshDheaSES4aNHwzhuUQCbuZg2E2VmVv4Y7ZjF1er7EkbN2XyrtYTAmUG

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS =
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";
  
  async function main(){
      
      if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
      }
      const secretKey = new Uint8Array(JSON.parse(process.env.SECRET_KEY) as number[]);
      const signerKeyPair = Keypair.fromSecretKey(secretKey);

      
      // *************

      const connection = new Connection(clusterApiUrl('devnet'),'confirmed');
      
      const programId = new PublicKey(PING_PROGRAM_ADDRESS);
      const programDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);
      
      const instruction = new TransactionInstruction({
          programId : programId,
          keys : [
              {
                  pubkey : programDataId,
                  isSigner : false,
                  isWritable : true
              }
          ]
      })
      
      const transaction = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(connection,transaction,[
         signerKeyPair
      ])

      console.log(`✅ Transaction completed! Signature is ${signature}`);
      
}

main();
