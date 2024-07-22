import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Authentication } from "./Authentication";
import { Transfer } from "./Transfer";
import { Account } from "./Account";
import { AccountVoter } from "./AccountVoter";
import { Counter } from "./Counter";
import { HandClick } from "./HandClick";
import { BobAlice } from "./BobAlice";
import { Ato } from "./Ato";
import { Ato2 } from "./Ato2";
import { Swap } from "./Swap";

export function Dashboard() {

    const anchorWallet = useAnchorWallet();

    return (
        <div>
            {
                anchorWallet?.publicKey ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p>
                        Connected to wallet: <b>{anchorWallet.publicKey.toBase58()}</b>
                        </p>
                        <AccountVoter />
                        <Proposal />
                        <Ato2 />
                        <Ato />
                        <Authentication />
                        <BobAlice />
                        <Transfer />
                        <Account />
                        <Counter />
                        <HandClick />
                        <Swap />
                    </div>
                ) : (
                    <div>
                    <h1>Solana React Exemple</h1>
                    <p>
                        Cliquer sur le bouton "Connect Wallet" pour connecter votre wallet Solana.
                    </p>
                    </div>
                )
            }
        </div>
    );
}