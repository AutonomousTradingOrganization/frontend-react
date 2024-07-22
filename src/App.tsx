import './App.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Dashboard } from './pages/Dashboard';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyButton from "./components/MyButton";
import { Ato2 } from "./pages/Ato2";
import { useWallet } from '@solana/wallet-adapter-react';
import { getSolanaBalance } from './helpers/solana.helper';

function App() {

  const wallet = useWallet();
  const [solanaBalance, setSolanaBalance] = useState<number | null>(null);

  useEffect(() => {
    if (wallet.publicKey) {
      getSolanaBalance(wallet.publicKey.toBase58())
        .then((balance) => setSolanaBalance(balance));
    } else {
      setSolanaBalance(null);
    }
  }, [wallet.publicKey]);

  return (
    <div className="App">
      <div className="header">
        <div className='wallet'>
          {
            solanaBalance !== null && 
            (
              <div>
                <p>Balances: {solanaBalance} SOL</p>
              </div>
            )
          }
          <WalletMultiButton></WalletMultiButton>
        </div>
      </div>
      <Router>
        <MyButton to="/frontend-react-build/" />
        <MyButton to="/frontend-react-build/ato2" />
        <Routes>
            <Route path="/frontend-react-build/" element={<Dashboard />} />
            <Route path="/frontend-react-build/ato2" element={<Ato2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
