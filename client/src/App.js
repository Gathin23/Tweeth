import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctChain, setCorrectChain] = useEffect(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain" + chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the rinkeby testnet");
        setCorrectChain(false);
        return;
      } else {
        setCorrectChain(true);
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts",});

      console.log("Found Accounts", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to metamask", error);
    }
  };

  useEffect(() => {
    connectWallet();
  })

  return <div className="App"></div>;
}

export default App;
