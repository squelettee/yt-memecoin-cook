'use client';

import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { FC, useMemo, useState, useEffect } from 'react';
import { getRpcEndpoint } from '@/actions/rpc-actions'

import '@solana/wallet-adapter-react-ui/styles.css';

type Props = {
  children?: React.ReactNode;
};

export const Wallet: FC<Props> = ({ children }) => {
  const [endpoint, setEndpoint] = useState<string>('https://api.mainnet-beta.solana.com');

  useEffect(() => {
    const initEndpoint = async () => {
      const rpcEndpoint = await getRpcEndpoint();
      setEndpoint(rpcEndpoint);
    };

    initEndpoint();
  }, []);

  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};