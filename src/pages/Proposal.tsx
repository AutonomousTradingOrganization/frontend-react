import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { createProposalAto } from "../helpers/solana.helper";
import { useState } from "react";

export function Proposal() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('title');
    const [description, setDescription] = useState<string>('description');
    const [mode, setMode] = useState<number>(0);
    const [threshold, setThreshold] = useState<number>(0);
    const [deadline, setDeadline] = useState<number>(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Proposal create
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div>
                    <label>
                        Title
                    </label>
                    <input
                        type="string"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div>
                    <label>
                        Description
                    </label>
                    <input
                        type="string"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div>
                    <label>
                        Mode
                    </label>
                    <input
                        type="number"
                        value={mode}
                        onChange={(e) => setMode(parseInt(e.target.value))}
                        placeholder="Mode"
                    />
                </div>
                <div>
                    <label>
                        Threshold
                    </label>
                    <input
                        type="number"
                        value={threshold}
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        placeholder="Threshold"
                    />
                </div>
                <div>
                    <label>
                        Deadline
                    </label>
                    <input
                        type="number"
                        value={deadline}
                        onChange={(e) => setDeadline(parseInt(e.target.value))}
                        placeholder="Deadline"
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
                                    const initResult = await createProposalAto(anchorWallet, title, description, mode, threshold, deadline);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                    console.log("https://explorer.solana.com/tx/"+transactionHash+"?cluster=devnet")
                                }
                            }}
                        >
                            Create Proposal
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