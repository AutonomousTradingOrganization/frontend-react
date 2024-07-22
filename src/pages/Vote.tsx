import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { voteAto } from "../helpers/solana.helper";
import { useState } from "react";

export function Vote() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
    const [vote, setVote] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('Amount');
    const [now, setNow] = useState<string>('Now');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Voter registration
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div>
                    <label>
                        Vote
                    </label>
                    <input
                        type="number"
                        value={vote}
                        onChange={(e) => setVote(e.target.value)}   
                    />
                </div>
                <div>
                    <label>
                        Amount
                    </label>
                    <input
                        type="string"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Name"
                    />
                </div>
                <div>
                    <label>
                        Now
                    </label>
                    <input
                        type="string"
                        value={now}
                        onChange={(e) => setNow(e.target.value)}
                        placeholder="Mail"
                    />
                </div>
            </div>
            {
                anchorWallet?.publicKey && (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await voteAto(anchorWallet, vote, amount, now);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                    console.log("https://explorer.solana.com/tx/"+initResult+"?cluster=devnet")
                                }
                            }}
                        >
                            Register
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