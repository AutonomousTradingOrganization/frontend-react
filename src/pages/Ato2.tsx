import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { initializeAto21 } from "../helpers/solana.helper";
import { useState } from "react";

export function Ato2() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                ATO2 VOTING
            </h1>
            {
                anchorWallet?.publicKey && (
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeAto21(anchorWallet);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                }
                            }}
                        >
                            Create Voting 2 (initializeAto21)
                        </button>
                            Create Voting Data
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