import React, { useEffect, useRef, useState } from "react";
import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import axios from "axios";
import { MOVE_DID_MODULE, AI_AGENT_API_URL } from "./constants";
import "./styles.css";

const aptosConfig = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: "https://aptos.testnet.porto.movementlabs.xyz/v1",
  faucet: "https://fund.testnet.porto.movementlabs.xyz/"
});
const aptos = new Aptos(aptosConfig);

function AppContent() {
  const { signAndSubmitTransaction, account, connected } = useWallet();
  const [currentName, setCurrentName] = useState<string>("");
  const [currentBio, setCurrentBio] = useState<string>("");
  const [reputation, setReputation] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  // Fetch bio from on-chain data
  const fetchBio = async () => {
    if (!account) return;
    try {
      const resource = await aptos.getAccountResource({
        accountAddress: account.address,
        resourceType: `${MOVE_DID_MODULE}::Bio`
      });
      if (resource) {
        setCurrentName(resource.data.name);
        setCurrentBio(resource.data.bio);
      }
    } catch (error) {
      console.error("Bio not found", error);
    }
  };

  // Register or update bio on-chain
  const registerBio = async () => {
    if (!account || !nameRef.current || !bioRef.current) return;
    const name = nameRef.current.value;
    const bio = bioRef.current.value;
    // Prepare the transaction data to call the update_bio function in the Move module.
    const transaction = {
      data: {
        function: `${MOVE_DID_MODULE}::update_bio`,
        functionArguments: [name, bio, ""] // Leaving social_link empty for now.
      }
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      console.log(`Transaction submitted: https://explorer.movementlabs.xyz/txn/${response.hash}`);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      fetchBio();
    } catch (error) {
      console.error("Error updating bio", error);
    }
  };

  // Call the AI agent to compute the reputation score.
  const computeReputation = async () => {
    if (!account) return;
    try {
      const response = await axios.post(`${AI_AGENT_API_URL}/compute-reputation`, {
        walletAddress: account.address
      });
      setReputation(response.data.reputation);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error("Error computing reputation", error);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchBio();
      computeReputation();
    }
  }, [connected]);

  return (
    <div className="container">
      <h1>MoveAIID – Decentralized Identity & Reputation</h1>
      {!connected ? (
        <p>Please connect your wallet.</p>
      ) : (
        <div>
          <WalletSelector />
          <div className="profile-panel">
            <h2>Your Profile</h2>
            <div>
              <label>Name:</label>
              <input type="text" defaultValue={currentName} ref={nameRef} />
            </div>
            <div>
              <label>Bio:</label>
              <textarea defaultValue={currentBio} ref={bioRef} />
            </div>
            <button onClick={registerBio}>Update Profile</button>
          </div>
          <div className="reputation-panel">
            <h2>Your Reputation Score</h2>
            {reputation !== null ? (
              <div>
                <p>Reputation: {reputation}</p>
                <p>AI Recommendation: {recommendation}</p>
                <button onClick={computeReputation}>Refresh Reputation</button>
              </div>
            ) : (
              <p>Loading reputation...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const wallets = []; // Add desired wallet adapters here (e.g., Petra, Martian, etc.)
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <AppContent />
    </AptosWalletAdapterProvider>
  );
}
