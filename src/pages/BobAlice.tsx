import { useAnchorWallet } from "@solana/wallet-adapter-react";
//import { initializeBobAccount, addAliceToBob } from "../helpers/solana.helper";
import { initializeBobAccount } from "../helpers/solana.helper";
import { useState } from "react";

export function HandClick() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                HandClick
            </h1>
            {
                anchorWallet?.publicKey && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeBobAccount(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("result initializeBobAccount");
                                    console.log(initResult);
                                    if(!initResult){
                                        console.log("setError");
                                        setTransactionError(true);
                                    }
                                }
                            }}
                        >
                            Initialize account
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await addAliceToBob(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("result addAliceToBob");
                                    console.log(initResult);
                                    if(!initResult){
                                        console.log("setError");
                                        setTransactionError(true);
                                    }
                                }
                            }}
                        >
                            Alice add on Bob
                        </button>
                    </div>
                )
            }
            {
                sendingTransaction && (
                    <p>
                        Sending transaction...
                    </p>
                )
            }
            {
                transactionHash && !sendingTransaction && (
                    <p>
                        Transaction hash: <b>{transactionHash}</b>
                    </p>
                )
            }
            {
                transactionError && !sendingTransaction && (
                    <p>
                        Transaction Error
                    </p>
                )
            }
        </div>
    );
}