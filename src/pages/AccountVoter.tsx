import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getAccountVoter, initializeAccountVoter, initializeAccountVoter2, initializeAccountVoter3 } from "../helpers/solana.helper";
import { useState } from "react";

export function AccountVoter() {

    const anchorWallet = useAnchorWallet();
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionError, setTransactionError] = useState<boolean>(false);
    const [sendingTransaction, setSendingTransaction] = useState<boolean>(false);
    const [account, setAccount] = useState<any | null | undefined>(undefined);
    const [pseudo, setPseudo] = useState<string>('name');
    const [mail, setMail] = useState<string>('mail');
    const [balance_total, setBalanceTotal] = useState<number>(0);
    const [balance_sol, setBalanceSol] = useState<number>(0);
    const [total_trade, setTotalTrade] = useState<number>(0);
    const [total_participation, setTotalParticipation] = useState<number>(0);
    const [win_trade, setWinTrade] = useState<number>(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h1>
                Account Voter
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div>
                    <label>
                        Pseudo
                    </label>
                    <input
                        type="string"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="Pseudo"
                    />
                </div>
                <div>
                    <label>
                        Mail
                    </label>
                    <input
                        type="string"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Mail"
                    />
                </div>
                <div>
                    <label>
                        Balance Totale
                    </label>
                    <input
                        type="number"
                        value={balance_total}
                        onChange={(e) => setBalanceTotal(parseInt(e.target.value))}
                        placeholder="Mail"
                    />
                </div>
                <div>
                    <label>
                        Balance Sol
                    </label>
                    <input
                        type="number"
                        value={balance_sol}
                        onChange={(e) => setBalanceSol(parseInt(e.target.value))}
                        placeholder="Mail"
                    />
                </div>
                <div>
                    <label>
                        Total Trade
                    </label>
                    <input
                        type="number"
                        value={total_trade}
                        onChange={(e) => setTotalTrade(parseInt(e.target.value))}
                        placeholder="Mail"
                    />
                </div>
                <div>
                    <label>
                        Total Participation
                    </label>
                    <input
                        type="number"
                        value={total_participation}
                        onChange={(e) => setTotalParticipation(parseInt(e.target.value))}
                        placeholder="Mail"
                    />
                </div>
                <div>
                    <label>
                        Win Trade
                    </label>
                    <input
                        type="number"
                        value={win_trade}
                        onChange={(e) => setWinTrade(parseInt(e.target.value))}
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
                                    const account = await getAccountVoter(anchorWallet.publicKey)
                                    setAccount(account);
                                }
                            }}
                        >
                            Get Account
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeAccountVoter(anchorWallet, pseudo, mail, balance_total, balance_sol, total_trade, total_participation, win_trade);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                }
                            }}
                        >
                            Create Account
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeAccountVoter2(anchorWallet, pseudo, mail, balance_total, balance_sol, total_trade, total_participation, win_trade);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                }
                            }}
                        >
                            Create Account
                        </button>
                        <button
                            onClick={async () => {
                                if (anchorWallet.publicKey) {
                                    setSendingTransaction(true);
                                    const initResult = await initializeAccountVoter3(anchorWallet, pseudo, mail, balance_total, balance_sol, total_trade, total_participation, win_trade);
                                    setTransactionHash(initResult);
                                    setSendingTransaction(false);
                                    console.log("initResult");
                                    console.log(initResult);
                                }
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                )
            }
            {
                account !== undefined && (
                    <p>
                        Account: <b>{account === null ? 'N/A' : `pseudo: ${account.pseudo} - mail: ${account.mail} - balance_total: ${account.balance_total} - balance_sol: ${account.balance_sol} - total_trade: ${account.total_trade} - total_participation: ${account.total_participation} - win_trade: ${account.win_trade}`}</b>
                    </p>
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