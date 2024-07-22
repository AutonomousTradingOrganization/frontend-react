import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { createProposalAto } from "../helpers/solana.helper";
import { useState } from "react";

export function Proposal() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Proposal create
            </h1>

            <div>
                <label>
                    Title
                </label>
                <input
                    type="string"
                    value={title}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Mail"
                />
            </div>
            <div>
                <label>
                    Description
                </label>
                <input
                    type="string"
                    value={description}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder="Mail"
                />
            </div>
            <div>
                <label>
                    Mode
                </label>
                <input
                    type="number"
                    value={mode}
                    onChange={(e) => setBalanceTotal(parseInt(e.target.value))}
                    placeholder="Mail"
                />
            </div>
            <div>
                <label>
                    Threshold
                </label>
                <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setBalanceTotal(parseInt(e.target.value))}
                    placeholder="Mail"
                />
            </div>
            <div>
                <label>
                    Deadline
                </label>
                <input
                    type="number"
                    value={deadline}
                    onChange={(e) => setBalanceTotal(parseInt(e.target.value))}
                    placeholder="Mail"
                />
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