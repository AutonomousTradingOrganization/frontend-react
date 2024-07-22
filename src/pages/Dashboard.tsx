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
                        <VoterRegistration />
                        <Proposal />
                        <Vote />
                        <Ato2 />
                    </div>
                ) : (
                    <div>
                    <h1>ATO : Autonomous Trading Organization</h1>
                    <p>
                        Cliquer sur le bouton "Connect Wallet" pour connecter votre wallet Solana a la dApp ATO.
                    </p>
                    </div>
                )
            }
        </div>
    );
}
