import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Authentication } from "./Authentication";
import { Proposal } from "./Proposal";
import { VoterRegistration } from "./VoterRegistration";
import { AccountVoter } from "./AccountVoter";
import { Vote } from "./Vote";
import { Ato2 } from "./Ato2";

export function Dashboard() {

    const anchorWallet = useAnchorWallet();

    return (
        <div>
            {
                anchorWallet?.publicKey ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Proposal />
                        <VoterRegistration />
                        <AccountVoter />
                        <Vote />
                        <Ato2 />
                    </div>
                ) : (
                    <div>
                    <h1><img src="/logo512.png" />ATO : Autonomous Trading Organization</h1>
                    <p>
                        Cliquer sur le bouton "Connect Wallet" pour connecter votre wallet Solana a la dApp ATO.
                    </p>
                    </div>
                )
            }
        </div>
    );
}