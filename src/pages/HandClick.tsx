import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getCounter, initializeCounter, initializeCounterHandClick } from "../helpers/solana.helper";
import { handClickCounter } from "../helpers/solana.helper";
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
                                    const initResult = await initializeCounterHandClick(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("result initializeCounterHandClick");
                                    console.log(initResult);
                                    if(!initResult){
                                        console.log("setError");
                                        setTransactionError(true);
                                    }
                                }
                            }}
                        >
                            Initialize the counter for hand click
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await handClickCounter(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("result handClickCounter");
                                    console.log(initResult);
                                    if(!initResult){
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