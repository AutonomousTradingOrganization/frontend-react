import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { voterRegistrationAto } from "../helpers/solana.helper";
import { useState } from "react";

export function VoterRegistration() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
    const [name, setName] = useState<string>('Name');
    const [email, setEmail] = useState<string>('Email');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Voter registration
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div>
                    <label>
                        Name
                    </label>
                    <input
                        type="string"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </div>
                <div>
                    <label>
                        Mail
                    </label>
                    <input
                        type="string"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                                    const initResult = await voterRegistrationAto(anchorWallet, name, email);
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