import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getCounter, initializeCounter } from "../helpers/solana.helper";
import { incrementCounter } from "../helpers/solana.helper";
import { useState } from "react";

export function Counter() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Counter
            </h1>
            {
                anchorWallet?.publicKey && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeCounter(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                    if(!initResult){
                                        console.log("setError");
                                        setTransactionError(true);
                                    }
                                }
                            }}
                        >
                            Create Counter ( works only one time)
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const incrementResult = await incrementCounter(anchorWallet);
                                    setTransactionHash(incrementResult);
                                    setSendingTransaction(false);
                                    console.log("increment result");
                                    console.log(incrementResult);
                                    if(!incrementResult){
                                        console.log("setError");
                                        setTransactionError(true);
                                    }
                                }
                            }}
                        >
                            Increment Counter
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