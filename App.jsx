import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import TelegramLoginButton from 'react-telegram-login';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'nfts'), (snapshot) => {
      const nftList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNfts(nftList);
    });
    return () => unsubscribe();
  }, []);

  const handleTelegramResponse = (response) => {
    // Handle response from Telegram
  };

  const mintNFT = async (nftData) => {
    try {
      await addDoc(collection(db, 'nfts'), nftData);
      console.log('NFT Minted!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <h1>Miner Tycoon NFT Game</h1>
      <TelegramLoginButton dataAuthUrl="https://example.com/auth" onLogin={handleTelegramResponse} />
      <button onClick={() => mintNFT({ name: 'Rare NFT', value: 100 })}>Mint NFT</button>
      <ul>
        {nfts.map(nft => (
          <li key={nft.id}>{nft.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
