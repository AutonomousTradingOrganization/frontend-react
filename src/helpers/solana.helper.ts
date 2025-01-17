import { BN, Idl, Program } from "@coral-xyz/anchor";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";
import { AddressLookupTableAccount, Connection, LAMPORTS_PER_SOL, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction, TransactionMessage, VersionedTransaction, Signer } from "@solana/web3.js";
import { sign } from 'tweetnacl';
import { IDL, PROGRAM_ID } from "../idl/idl";
import { IDLCounter, PROGRAM_ID_COUNTER } from "../idl/idlCounter";
import { IDLCounterCpi, PROGRAM_ID_COUNTER_CPI } from "../idl/idCounterCpi";
import { IDLHandClick, PROGRAM_ID_HAND_CLICK } from "../idl/idHandClick";
// import { IDLAlice, PROGRAM_ID_ALICE } from "../idl/idlAlice";
import { IDLBob, PROGRAM_ID_BOB } from "../idl/idlBob";
import { IDLAto, PROGRAM_ID_ATO } from "../idl/idlAto";
import { IDLAto2, PROGRAM_ID_ATO2 } from "../idl/idlAto2";
import { IDLAccountVoter, PROGRAM_ID_ACCOUNTVOTER } from "../idl/idlAccountVoter";
import { getQuote } from "./jupiter.helper";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

console.log(IDLAccountVoter);
console.log(PROGRAM_ID_ACCOUNTVOTER.toString());

console.log(process.env.REACT_APP_RPC_URL);

const connection = new Connection(process.env.REACT_APP_RPC_URL!, "confirmed");
const program = new Program<Idl>(IDL as Idl, PROGRAM_ID, {
    connection,
});
const programCounter = new Program<Idl>(IDLCounter as Idl, PROGRAM_ID_COUNTER, {
  connection,
});
const programHandClick = new Program<Idl>(IDLHandClick as Idl, PROGRAM_ID_HAND_CLICK, {
  connection,
});
const programBob = new Program<Idl>(IDLBob as Idl, PROGRAM_ID_BOB, {
  connection,
});
// const programAlice= new Program<Idl>(IDLAlice as Idl, PROGRAM_ID_ALICE, {
//   connection,
// });
const programAto = new Program<Idl>(IDLAto as Idl, PROGRAM_ID_ATO, {
  connection,
});

const programAccountVoter = new Program<Idl>(IDLAccountVoter as Idl, PROGRAM_ID_ACCOUNTVOTER, {
  connection,
});

const programAto2 = new Program<Idl>(IDLAto2 as Idl, PROGRAM_ID_ATO2, {
  connection,
});



// (async () => {
//     console.log(programAccountVoter);
//     const keypairTest = await Keypair.generate();
//     console.log(keypairTest);
//     console.log(keypairTest.publicKey.toString());
//     console.log(keypairTest.secretKey.toString());
//     let lbsol = await getSolanaBalance(keypairTest.publicKey.toString());
//     console.log(lbsol);
//     let airdopNewAccount = await connection.requestAirdrop(keypairTest.publicKey, LAMPORTS_PER_SOL);
//     console.log(airdopNewAccount);
//     console.log("https://explorer.solana.com/address/"+airdopNewAccount);
//     let airdopNewAccount2 = await connection.requestAirdrop("GkLNgapZctZgt4sdjA2UK8gQedjz7cq7NcjVUToXwKqz", LAMPORTS_PER_SOL);
//     console.log(airdopNewAccount2);
// })();

const seed = new Uint8Array([131,118,141,236,168,118,207,212,69,123,27,98,244,137,48,59,140,58,63,251,172,114,84,95,124,20,197,204,153,230,204,7,233,249,47,75,220,170,231,208,140,129,190,253,66,143,19,33,152,213,9,250,148,238,163,41,87,228,15,134,164,29,248,177]);

const atoUser = Keypair.fromSecretKey(seed);
console.log(atoUser);
console.log(atoUser.publicKey);
console.log(atoUser.publicKey.toString());
//GkLNgapZctZgt4sdjA2UK8gQedjz7cq7NcjVUToXwKqz
(async () => {
    let lbsol = await getSolanaBalance(atoUser.publicKey.toString());
    console.log(lbsol);
})();

const signUser: Signer = {
    publicKey: atoUser.publicKey,
    secretKey: seed
}
console.log("sign");
console.log(signUser);

export async function getSolanaBalance(publicKey: string): Promise<number> {
    const balanceInLamports = await connection.getBalance(new PublicKey(publicKey));
    const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
  
    return balanceInSol;
}

export const getWalletAuthentication = async (wallet: WalletContextState, message: string): Promise<Uint8Array | null> => {
    try {
      const messageEncoded = new TextEncoder().encode(`${message}`);
    
      if (!wallet.signMessage) {
        console.error('The wallet does not support message signing');
        return null;
      }
    
      return await wallet.signMessage(messageEncoded);
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const verifyEncodedMessage = async (wallet: WalletContextState, message: string, encodedMessage: Uint8Array): Promise<boolean> => {
    try {
      if (!wallet.publicKey) {
        console.error('Wallet not connected');
        return false;
      }
      const messageEncoded = new TextEncoder().encode(`${message}`);
  
      return sign.detached.verify(messageEncoded, encodedMessage, wallet.publicKey.toBytes());
    } catch (error) {
      console.error(error);
      return false;
    }
};

export const getRecentBlockhash = async (): Promise<string | null> => {
    try {
      return (await connection.getLatestBlockhash()).blockhash;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export const transferSolana = async (wallet: WalletContextState, destination: PublicKey, amount: number): Promise<string | null> => {
    try {
        if (!wallet.publicKey || !wallet.signTransaction) return null;
      const recentBlockhash = await getRecentBlockhash();
      const transferTransaction = new Transaction();

      // JUST FOR TESTING THE SIZE OF THE TRANSACTION
    //   if (!recentBlockhash) return null;
    //   transferTransaction.feePayer = wallet.publicKey;
    //   transferTransaction.recentBlockhash = recentBlockhash;
    //   console.log(transferTransaction.serialize({ requireAllSignatures: false }).byteLength);

      const transfer = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destination,
        lamports: amount * LAMPORTS_PER_SOL
      });

      transferTransaction.add(transfer);

      if (transferTransaction && recentBlockhash) {
        transferTransaction.feePayer = wallet.publicKey;
        transferTransaction.recentBlockhash = recentBlockhash;
        const signedTransaction = await wallet.signTransaction(transferTransaction);
        return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const initializeAccount = async (anchorWallet: AnchorWallet, data: number, age: number): Promise<string | null> => {
    try {
      const accountTransaction = await getInitializeAccountTransaction(anchorWallet.publicKey, new BN(data), new BN(age));
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const createProposalAto = async (anchorWallet: AnchorWallet, title: string, description: string, mode: number, threshold: number, deadline: number): Promise<string | null> => {
    try {
      const accountTransaction = await getCreateProposalAto(anchorWallet.publicKey, String(title), String(description), new BN(mode), new BN(threshold), new BN(deadline) );
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const voterRegistrationAto = async (anchorWallet: AnchorWallet, name: string, email: string): Promise<string | null> => {
    try {
      const accountTransaction = await getVoterRegistrationAto(anchorWallet.publicKey, String(name), String(email) );
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const voteAto = async (anchorWallet: AnchorWallet, vote: number, amount: number, now: number): Promise<string | null> => {
    try {
      const accountTransaction = await getVoteAto(anchorWallet.publicKey, Number(vote), new BN(amount), new BN(now) );
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

// export const initializeAto2 = async (anchorWallet: AnchorWallet): Promise<string | null> => {
//     try {
//       const accountTransaction = await getInitializeAto2(anchorWallet.publicKey);
//       // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
//       const recentBlockhash = await getRecentBlockhash();
//       if (accountTransaction && recentBlockhash) {
//           accountTransaction.feePayer = anchorWallet.publicKey;
//           accountTransaction.recentBlockhash = recentBlockhash;
//           const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
//           return await connection.sendRawTransaction(signedTransaction.serialize());
//       }
//       return null;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
// };

export const initializeAto21 = async (anchorWallet: AnchorWallet): Promise<string | null> => {
    try {
      const accountTransaction = await getInitializeAto21(anchorWallet.publicKey);
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
console.log("accountTransaction");
console.log(accountTransaction);
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
        //   accountTransaction.feePayer = signUser.publicKey;

          accountTransaction.recentBlockhash = recentBlockhash;
          accountTransaction.sign(signUser);
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
        //   const signedTransaction = accountTransaction.serialize();
        //   return await connection.sendRawTransaction(signedTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

// export const initializeAto22 = async (anchorWallet: AnchorWallet): Promise<string | null> => {
//     try {
//       const accountTransaction = await getInitializeAto22(anchorWallet.publicKey);
//       // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
// console.log("accountTransaction");
// console.log(accountTransaction);
//       const recentBlockhash = await getRecentBlockhash();
//       if (accountTransaction && recentBlockhash) {
//           console.log(accountTransaction);
//         //   accountTransaction.feePayer = anchorWallet.publicKey;
//           accountTransaction.feePayer = signUser.publicKey;
//           accountTransaction.recentBlockhash = recentBlockhash;
//           accountTransaction.sign(signUser);
//           const signedTransaction = accountTransaction.serialize();
//           return await connection.sendRawTransaction(signedTransaction);
//         //   const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
//         //   return await connection.sendRawTransaction(signedTransaction.serialize());
//       }
//       return null;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
// };


export const initializeAccountVoter = async (anchorWallet: AnchorWallet, pseudo: string, mail: string, balance_total: number, balance_sol: number, total_trade: number, total_participation: number, win_trade: number): Promise<string | null> => {
  try {
    const accountVoterTransaction = await getInitializeAccountVoterTransaction(anchorWallet.publicKey, String(pseudo), String(mail), new BN(balance_total), new BN(balance_sol), new BN(total_trade), new BN(total_participation), new BN(win_trade));
    // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));

    const recentBlockhash = await getRecentBlockhash();
    console.log("recentBlockhash")
    console.log(recentBlockhash)
    if (accountVoterTransaction && recentBlockhash) {
      accountVoterTransaction.feePayer = anchorWallet.publicKey;
      accountVoterTransaction.recentBlockhash = recentBlockhash;
        const signedTransaction = await anchorWallet.signTransaction(accountVoterTransaction);
        return await connection.sendRawTransaction(signedTransaction.serialize());
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const initializeAto = async (anchorWallet: AnchorWallet): Promise<string | null> => {
  try {
    const atoTransaction = await getInitializeAto(anchorWallet.publicKey);
    // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));

    const recentBlockhash = await getRecentBlockhash();
    if (atoTransaction && recentBlockhash) {
      atoTransaction.feePayer = anchorWallet.publicKey;
      atoTransaction.recentBlockhash = recentBlockhash;
        const signedTransaction = await anchorWallet.signTransaction(atoTransaction);
        return await connection.sendRawTransaction(signedTransaction.serialize());
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const initializeCounter = async (anchorWallet: AnchorWallet): Promise<string | null> => {
    try {
      const accountTransaction = await getInitializeCounterTransaction(anchorWallet.publicKey);
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

// init counter program for handclick
export const initializeCounterHandClick = async (anchorWallet: AnchorWallet): Promise<string | null> => {
    try {
      const accountTransaction = await getInitializeCounterHandClickTransaction(anchorWallet.publicKey);
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const initializeBobAccount = async (anchorWallet: AnchorWallet): Promise<string | null> => {
    try {
      const accountTransaction = await getInitializeBobAccountTransaction(anchorWallet.publicKey);
      // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));
  
      const recentBlockhash = await getRecentBlockhash();
      if (accountTransaction && recentBlockhash) {
          accountTransaction.feePayer = anchorWallet.publicKey;
          accountTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};

// Click handclick vers counter
export const handClickCounter = async (anchorWallet: AnchorWallet): Promise<string | null> => {
    try {
      const handClickTransaction = await getHandClickCounterTransaction(anchorWallet.publicKey);
  
      const recentBlockhash = await getRecentBlockhash();
      if (handClickTransaction && recentBlockhash) {
          handClickTransaction.feePayer = anchorWallet.publicKey;
          handClickTransaction.recentBlockhash = recentBlockhash;
          const signedTransaction = await anchorWallet.signTransaction(handClickTransaction);
          return await connection.sendRawTransaction(signedTransaction.serialize());
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
};
// call by handClickCounter
export const getHandClickCounterTransaction = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {
        console.log(publicKey);
        console.log(publicKey.toString());
        console.log("counter for handclick : "+PROGRAM_ID_COUNTER_CPI);
        console.log(SystemProgram.programId);
        console.log("handclick : "+PROGRAM_ID_HAND_CLICK);
      return await programHandClick.methods.handClick()
        .accounts({
            counterDataAccount: publicKey,
            counterProgram: PROGRAM_ID_COUNTER_CPI
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const incrementCounter = async (anchorWallet: AnchorWallet): Promise<string | null> => {
  try {
    const accountTransaction = await programCounter.methods.increment().transaction();
    // const accountTransaction = await getInitializeAccountTransactionWWithoutAnchor(anchorWallet.publicKey, new BN(data), new BN(age));

    const recentBlockhash = await getRecentBlockhash();
    if (accountTransaction && recentBlockhash) {
        accountTransaction.feePayer = anchorWallet.publicKey;
        accountTransaction.recentBlockhash = recentBlockhash;
        const signedTransaction = await anchorWallet.signTransaction(accountTransaction);
        return await connection.sendRawTransaction(signedTransaction.serialize());
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAccount = async (publicKey: PublicKey): Promise<any> => {
    try {
      const accountSeed = Buffer.from("account");
      const [accountPda] = PublicKey.findProgramAddressSync(
        [
            accountSeed, 
            publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID.toString())
      );
      return await program.account.newAccount.fetch(accountPda);
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const getAccountVoter = async (publicKey: PublicKey): Promise<any> => {
  try {
    const accountVoterSeed = Buffer.from("accountVoter");
    const [accountVoterPda] = PublicKey.findProgramAddressSync(
      [
        accountVoterSeed, 
        publicKey.toBuffer()
      ], 
      new PublicKey(PROGRAM_ID_ACCOUNTVOTER.toString())
    );
    return await programAccountVoter .account.newAccount.fetch(accountVoterPda);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCounter = async (publicKey: PublicKey): Promise<any> => {
    try {
      const counterSeed = Buffer.from("counter");
      const [counterPda] = PublicKey.findProgramAddressSync(
        [
          counterSeed, 
            publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID.toString())
      );
      return await program.account.counter.fetch(counterPda);
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const getInitializeAccountTransaction = async (publicKey: PublicKey, data: BN, age: BN): Promise<Transaction | null> => {
    try {
      const accountSeed = Buffer.from("account");
      const [accountPda] = PublicKey.findProgramAddressSync(
        [
          accountSeed, 
          publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID.toString())
      );
      return await program.methods.initialize(data, age)
        .accounts({
            newAccount: accountPda,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getCreateProposalAto = async (publicKey: PublicKey, title: String, description: String, mode: BN, threshold: BN, deadline: BN): Promise<Transaction | null> => {
    try {
    const tailIndex = await programAto2.account.atoData.fetch(atoUser.publicKey);
    const tailIndexProposal = Number(tailIndex.proposalIndexTail);
    // const tailIndexProposal = tailIndex.proposalIndexTail.valueOf();
    // const tailIndexProposal = 2;
    console.log(tailIndex);
    console.log(tailIndexProposal);
    const propsIndexBuffer = Buffer.allocUnsafe(2);
    propsIndexBuffer.writeUInt16LE(tailIndexProposal, 0);
    console.log(propsIndexBuffer);

        const proposalCreateSeed = Buffer.from("ATO_PROP"); 
        const [propDataPda] = PublicKey.findProgramAddressSync(
        [
          proposalCreateSeed,
          publicKey.toBuffer(),
        //   new BN(2).toBuffer()
          propsIndexBuffer
        ], 
        new PublicKey(PROGRAM_ID_ATO2.toString())
      );
      return await programAto2.methods.proposalCreate(title, description, mode, threshold, deadline)
        .accounts({
            propData : propDataPda,
            atoData: atoUser.publicKey,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getVoterRegistrationAto = async (publicKey: PublicKey, name: String, email: String): Promise<Transaction | null> => {
    try {
    // const tailIndex = await programAto2.account.atoData.fetch(atoUser.publicKey);
    // const tailIndexProposal = Number(tailIndex.proposalIndexTail);
    // const tailIndexProposal = tailIndex.proposalIndexTail.valueOf();
    // const tailIndexProposal = 2;
    // console.log(tailIndex);
    // console.log(tailIndexProposal);
    // const propsIndexBuffer = Buffer.allocUnsafe(2);
    // propsIndexBuffer.writeUInt16LE(tailIndexProposal, 0);
    // console.log(propsIndexBuffer);

        const voterRegistrationSeed = Buffer.from("ATO_VOTER"); 
        const [voterDataPda] = PublicKey.findProgramAddressSync(
        [
          voterRegistrationSeed,
          publicKey.toBuffer()
        //   new BN(2).toBuffer()
        //   propsIndexBuffer
        ], 
        new PublicKey(PROGRAM_ID_ATO2.toString())
      );
      return await programAto2.methods.voterRegistration(name, email)
        .accounts({
            voterData : voterDataPda,
            atoData: atoUser.publicKey,
            voter: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getVoteAto = async (publicKey: PublicKey, vote: Number, amount: BN, now: BN): Promise<Transaction | null> => {
    try {
        const tailIndex = await programAto2.account.atoData.fetch(atoUser.publicKey);
        const tailIndexProposal = Number(tailIndex.proposalIndexTail);
        console.log("tailIndex");
        console.log(tailIndex);
        console.log(tailIndexProposal);
        console.log(tailIndex.status);
        console.log(tailIndex.proposalIndexHead);
        console.log(tailIndex.proposalIndexTail);
        console.log(tailIndex.voterIndexTail);
        console.log(tailIndex.voterIndexHead);
        const propsIndexBuffer = Buffer.allocUnsafe(2);
        propsIndexBuffer.writeUInt16LE(tailIndexProposal, 0);
        console.log("propsIndexBuffer");
        console.log(propsIndexBuffer);
        console.log(propsIndexBuffer[0]);
        console.log(propsIndexBuffer[1]);

        const voteTailIndex = 0;
        //console.log(tailIndex);
        const voteIndexBuffer = Buffer.allocUnsafe(2);
        voteIndexBuffer.writeUInt16LE(voteTailIndex, 0);

        // const allProposals = await programAto2.account.propData.all()
        // console.log("allProposals");
        // console.log(allProposals);
        const voteSeed = Buffer.from("ATO_VOTE"); 
        const [voteDataPda] = PublicKey.findProgramAddressSync(
        [
          voteSeed,
          propsIndexBuffer,
          voteIndexBuffer
        //   new BN(2).toBuffer()
        ], 
        new PublicKey(PROGRAM_ID_ATO2.toString())
      );
      return await programAto2.methods.vote(vote, amount, now)
        .accounts({
            voteData     : voteDataPda,
            // voterData : voteDataPda,
            voterData : new PublicKey("82RrBSsJHZwosBgsP9M7xSrVKaYC8emkG3nDtL8knsA"),
            // propData     : prop1.publicKey,
            propData     : new PublicKey("FARvLU4urEohM8knQc4YRqBEmqJPUKvHnPXGzc2NC9Vu"),
            atoData: atoUser.publicKey,
            voter: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeAto2 = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {
        const atoDataPubkey = Keypair.generate();
        console.log(atoDataPubkey);
        console.log(atoDataPubkey.publicKey);
        console.log(atoDataPubkey.publicKey.toString());
        const atoDataPair = new Keypair();
        console.log(atoDataPair);
        console.log(atoDataPair.publicKey);
        console.log(atoDataPair.publicKey.toString());

        const [atoPda] = PublicKey.findProgramAddressSync(
            [], 
            new PublicKey(PROGRAM_ID_ATO2.toString())
        );
        console.log(SystemProgram.programId.toString());
        console.log(atoPda.toString());
        console.log(publicKey.toString());
      return await programAto2.methods.initialize()
        .accounts({
            atoData: atoPda,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .signers([atoDataPair])
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeAto21 = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {

        // const atoDataPair = new Keypair();
        // console.log(atoDataPair);
        // console.log(atoDataPair.publicKey);
        // console.log(atoDataPair.publicKey.toString());

        const [atoPda] = PublicKey.findProgramAddressSync(
        [
          atoUser.publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID_ATO2.toString())
      );
      return await programAto2.methods.initialize()
        .accounts({
            atoData: atoUser.publicKey,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeAto22 = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {
        const [atoPda] = PublicKey.findProgramAddressSync(
        [
          atoUser.publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID_ATO2.toString())
      );
      return await programAto2.methods.initialize()
        .accounts({
            atoData: atoUser.publicKey,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .signers([atoUser])
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};


export const getInitializeAccountVoterTransaction = async (publicKey: PublicKey, pseudo: String, mail: String, balance_total: BN, balance_sol: BN, total_trade: BN, total_participation: BN, win_trade: BN): Promise<Transaction | null> => {
  try {
    console.log(PROGRAM_ID_ACCOUNTVOTER.toString());
    const accountVoterSeed = Buffer.from("accountVoter");
    const [accountVoterPda] = PublicKey.findProgramAddressSync(
      [
        accountVoterSeed, 
        publicKey.toBuffer()
      ], 
      new PublicKey(PROGRAM_ID_ACCOUNTVOTER.toString())
    );
    console.log("accountVoterPda");
    console.log(accountVoterPda);
    console.log(accountVoterPda.toString());
    console.log(pseudo);
    console.log(mail);
    console.log(balance_total);
    console.log(balance_sol);
    console.log(total_trade);
    console.log(total_participation);
    console.log(win_trade);
    return await programAccountVoter.methods.initialize(pseudo, mail, balance_total, balance_sol, total_trade, total_participation, win_trade)
      .accounts({
          newAccount: accountVoterPda,
          signer: publicKey,
          systemProgram: SystemProgram.programId
      })
      .transaction()
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const getInitializeAto = async (publicKey: PublicKey): Promise<Transaction | null> => {
  try {
    // const accountSeed = Buffer.from("account");
    // const [accountPda] = PublicKey.findProgramAddressSync(
    //   [
    //     accountSeed, 
    //     publicKey.toBuffer()
    //   ], 
    //   new PublicKey(PROGRAM_ID.toString())
    // );
    return await programAto.methods.initialize()
      .accounts({
          atoData: publicKey,
          signer: publicKey,
          systemProgram: SystemProgram.programId
      })
      .transaction()
    } catch (error) {
      console.error(error);
      return null;
    }
};

export const getInitializeBobAccountTransaction = async (publicKey: PublicKey): Promise<Transaction | null> => {
    const newKeypair = new Keypair();
    console.log(newKeypair.publicKey.toString());
    console.log(newKeypair.secretKey.toString());
    try {
      const [accountPda] = PublicKey.findProgramAddressSync(
        [          
            publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID_BOB.toString())
        // with [] and derivation via public key
        // Error: Signature verification failed.
        // Missing signature for public key [`FZ52TUHUaDqGcfq2JP7TUYT1c9LLwLnjLi3Sxo2N6zx8`].
        // with [] and derivation with new PublicKey(PROGRAM_ID_BOB.toString())
        // Error: Signature verification failed.
        // Missing signature for public key [`HHFZKGMyrraom8aLJm7zgv4pSyMQKDsPqimaSs8j2Log`].
        // with publicKey.toBuffer()
        // Error: Signature verification failed.
        // Missing signature for public key [`DQchDYSp2jqUHhuRB3RDRDpLobEPhy8gWuAfnveVmT6o`].
        // new PublicKey(PROGRAM_ID_BOB.toString())
        // Error: Signature verification failed.
        // Missing signature for public key [`7svwGSj5Z2qLcBEsD8s6eNedEiR5pTSuJLYYnyr3Xk66`].
        // new PublicKey(publicKey.toString())
      );
      return await programBob.methods.initialize()
        .accounts({
            // Error: Signature verification failed.
            // Missing signature for public key [`61yHcSjDDYx9kZvPPFv1wZwhgc2bakGwin4eKZGUXRHr`].
            // bobDataAccount: PROGRAM_ID_BOB,
            // voir erreur dans accountpda
            bobDataAccount: accountPda,
            // Error Code: TryingToInitPayerAsProgramAccount. Error Number: 4101.
            // Error Message: You cannot/should not initialize the payer account as a program account.",
            // bobDataAccount: publicKey,
            // with newKeypair account Error: Signature verification failed.
            // bobDataAccount: newKeypair.publicKey,
            signer: publicKey,
            // signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeCounterHandClickTransaction = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {
      return await program.methods.initialize()
        .accounts({
            counterDataAccount: PROGRAM_ID_COUNTER_CPI,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getHandClickTransaction = async (publicKey: PublicKey, data: BN, age: BN): Promise<Transaction | null> => {
    try {
      const accountSeed = Buffer.from("handClick");
      const [accountPda] = PublicKey.findProgramAddressSync(
        [
          accountSeed, 
          publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID.toString())
      );
      return await program.methods.click(data, age)
        .accounts({
            newAccount: accountPda,
            signer: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeCounterTransaction = async (publicKey: PublicKey): Promise<Transaction | null> => {
    try {
      const newKeypair = new Keypair();

      const counterSeed = Buffer.from("counter");
      const [counterPda] = PublicKey.findProgramAddressSync(
        [
          counterSeed
        ], 
        new PublicKey(PROGRAM_ID_COUNTER.toString())
      );
      console.log(publicKey.toString());
      console.log(PROGRAM_ID_COUNTER.toString());
      console.log(PROGRAM_ID_COUNTER.toBuffer());
      console.log(counterPda.toString());
      console.log(newKeypair.publicKey.toString());
      console.log(newKeypair.secretKey.toString());
      return await programCounter.methods.initialize()
        .accounts({
            counter: counterPda,
            // user: newKeypair.publicKey,
            user: publicKey,
            systemProgram: SystemProgram.programId
        })
        .transaction()
      } catch (error) {
        console.error(error);
        return null;
      }
};

export const getInitializeAccountTransactionWWithoutAnchor = async (publicKey: PublicKey, data: BN, age: BN): Promise<Transaction | null> => {
    try {
      const accountSeed = Buffer.from("account");
      const [accountPda] = PublicKey.findProgramAddressSync(
        [
          accountSeed, 
          publicKey.toBuffer()
        ], 
        new PublicKey(PROGRAM_ID.toString())
      );
  
      const instructionData = Buffer.alloc(10); // Adjust size as needed
      instructionData.writeUInt8(0, 0); // This is the "initialize" instruction index
      data.toArrayLike(Buffer, 'le', 8).copy(instructionData, 1); // Write data
      age.toArrayLike(Buffer, 'le', 2).copy(instructionData, 9); // Write age
  
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: accountPda, isSigner: false, isWritable: true },
          { pubkey: publicKey, isSigner: true, isWritable: false },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: new PublicKey(PROGRAM_ID.toString()),
        data: instructionData,
      });
  
      const transaction = new Transaction().add(instruction);
      return transaction;
    } catch (error) {
      console.error(error);
      return null;
    }
};

export async function instructionDataToTransactionInstruction(instructionPayload: any) {
  if (!instructionPayload) {
      return null;
  }

  return new TransactionInstruction({
      programId: new PublicKey(instructionPayload.programId),
      keys: instructionPayload.accounts.map((key: any) => ({
          pubkey: new PublicKey(key.pubkey),
          isSigner: key.isSigner,
          isWritable: key.isWritable,
      })),
      data: Buffer.from(instructionPayload.data, "base64"),
  });
};

export async function getSwapIxs(wallet: PublicKey, amount: number, mint: string, outputMint: string, destinationTokenAccount: string = '', slippage: string = '0.5') {
  const quoteResponse: any = await getQuote(amount, mint, outputMint, slippage);

  let swapParams: any = {
      quoteResponse,
      userPublicKey: wallet.toString(),
      wrapAndUnwrapSol: true,
      prioritzationFeeLamports: 1_000_000,
  }

  if (destinationTokenAccount.length > 0) {
      swapParams['destinationTokenAccount'] = destinationTokenAccount;
  }

  const swapIx: any = await (
      await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(swapParams)
      })
  ).json();

  const instructions: any = [];

  console.log('swapIx', swapIx);

  if (swapIx.computeBudgetInstructions) {
      for (let i = 0; i < swapIx.computeBudgetInstructions.length; i++) {
          instructions.push(await instructionDataToTransactionInstruction(swapIx.computeBudgetInstructions[i]));
      }
  }

  for (let i = 0; i < swapIx?.setupInstructions?.length; i++) {
      instructions.push(await instructionDataToTransactionInstruction(swapIx.setupInstructions[i]));
  }

  instructions.push(await instructionDataToTransactionInstruction(swapIx.swapInstruction));

  if (swapIx.cleanupInstruction) {
      instructions.push(await instructionDataToTransactionInstruction(swapIx.cleanupInstruction));
  }

  return { instructions, addressLookupTableAddresses: swapIx.addressLookupTableAddresses, swappedAmount: quoteResponse.outAmount };
}

export const getAddressLookupTableAccounts = async (
  keys: string[],
  connection: any,
): Promise<AddressLookupTableAccount[]> => {
  const addressLookupTableAccountInfos =
      await connection.getMultipleAccountsInfo(
          keys.map((key) => new PublicKey(key))
      );

  return addressLookupTableAccountInfos.reduce((acc: any, accountInfo: any, index: any) => {
      const addressLookupTableAddress = keys[index];
      if (accountInfo) {
          const addressLookupTableAccount = new AddressLookupTableAccount({
              key: new PublicKey(addressLookupTableAddress),
              state: AddressLookupTableAccount.deserialize(accountInfo.data),
          });
          acc.push(addressLookupTableAccount);
      }

      return acc;
  }, new Array<AddressLookupTableAccount>());
};

export const jitoTipWallets: string[] = [
  '96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5',
  'HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe',
  'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY',
  'ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49',
  'DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh',
  'ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt',
  'DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL',
  '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT'
];

export const getJitoTipWallet = () => {
  // return random tip wallet from JitoTipWallets
  return jitoTipWallets[Math.floor(Math.random() * jitoTipWallets.length)];
}

export const createSwapTransaction = async (addressLookupTableAddresses: any, payer: PublicKey, swapIx: TransactionInstruction[]): Promise<VersionedTransaction | null> => {
  const addressLookupTableAccounts = addressLookupTableAddresses ? await getAddressLookupTableAccounts(
    addressLookupTableAddresses,
    connection,
 ) : [];

  let { blockhash } = await connection.getLatestBlockhash();

  const tipIx = SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: new PublicKey(getJitoTipWallet()),
      lamports: 100_000,
  });

  swapIx.push(tipIx);

  const swapMessageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions: swapIx,
  }).compileToV0Message(addressLookupTableAccounts);
  
  return new VersionedTransaction(swapMessageV0);
};

export const sendTransaction = async (transaction: VersionedTransaction): Promise<string | null> => {
  const transactionSignature = transaction.signatures[0];
  let txSignature = bs58.encode(transactionSignature);
  
  try {
    let blockhashResult = await connection.getLatestBlockhash({
      commitment: "confirmed",
   });

    let confirmTransactionPromise;
    let txSendAttempts = 1;
    try {
       confirmTransactionPromise = connection.confirmTransaction(
          {
             signature: txSignature,
             blockhash: blockhashResult.blockhash,
             lastValidBlockHeight: blockhashResult.lastValidBlockHeight,
          },
          "confirmed"
       );

       let confirmedTx = null;
       while (!confirmedTx) {
          confirmedTx = await Promise.race([
             confirmTransactionPromise,
             new Promise((resolve) =>
                setTimeout(() => {
                   resolve(null);
                }, 1000)
             ),
          ]);
          if (confirmedTx) {
             break;
          }

          await connection.sendRawTransaction(transaction.serialize(), { maxRetries: 0 });

          console.log(`${new Date().toISOString()} Tx not confirmed after ${1000 * txSendAttempts++}ms, resending`);

          if (txSendAttempts > 60) {
             return null;
          }
       }

      return txSignature;
  } catch (error) {
    console.error(error);
    return txSignature;
  }
} catch (error) {
  console.error(error);
  return txSignature;
}
};

export async function sendSwapTransaction(wallet: WalletContextState, amount: number, token1: string, token2: string) {
  try {
      if (!wallet.publicKey || !wallet.signTransaction) return;
      const instructions: TransactionInstruction[] = [];

      const { instructions: swapIx, addressLookupTableAddresses } = await getSwapIxs(wallet.publicKey, amount, token1, token2);

      const transaction = await createSwapTransaction(addressLookupTableAddresses, wallet.publicKey, swapIx);

      if (!transaction) {
          return null;
      }

      const signedTransaction = await wallet.signTransaction(transaction);

      const signature = await sendTransaction(signedTransaction);

      console.log('signature', signature);
      return signature;
  } catch (error) {
      console.error(error);
      return null;
  }
}
