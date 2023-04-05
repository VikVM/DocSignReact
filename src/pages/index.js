import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Contract, providers, ethers } from "ethers";
import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import { DOC_SIGN_CONTRACT_ADDRESS, abi } from "../../constants";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [whitelist, setWhitelist] = useState(null);
  const [docNumber, setDocNumber] = useState("");

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId != 97) {
      window.alert("Change to BNB Chain Testnet");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return provider;
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 97,
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getWhiteList = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const signContract = new Contract(DOC_SIGN_CONTRACT_ADDRESS, abi, signer);
      const address = await signer.getAddress();
      const whitelistedAddresses = await signContract.getWhitelist();
      setWhitelist(whitelistedAddresses);
    } catch (error) {
      console.error(error);
    }
  };
  const signDoc = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      console.log(signer);
      const signContract = new Contract(DOC_SIGN_CONTRACT_ADDRESS, abi, signer);
      const tx = await signContract.signDocument(docNumber);
      console.log(tx);

    } catch (error) {
      console.error(error);
    }
  };

  const renderButtonSign = () => {
    if (walletConnected) {
      return (
        <div>
          <div>Sign your document:</div>
          <input
            type="number"
            onChange={(e) => updateCurrentDocNumber(e.target.value)}
          />
          <button className={styles.button} onClick={signDoc}>
            Sign
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet To Sign Documents
        </button>
      );
    }
  };

  function updateCurrentDocNumber(text) {
    setDocNumber(text);
  }

  const renderButtonGet = () => {
    if (walletConnected) {
      return (
        <div>
          <div>Check Whitelist</div>
          <button className={styles.button} onClick={getWhiteList}>
            Check
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect Wallet to check Whitelist
        </button>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Doc Sign DAPP</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Document Signer DAPP</p>
          <div>
            <button onClick={connectWallet} className={styles.button}>
              {!walletConnected ? "Connect Wallet" : "Disconnect"}
            </button>
          </div>
        </div>
        <br />
        {renderButtonGet()}
        <br />
        <div className="Whitelist">
          <ul>
            {whitelist &&
              whitelist.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <div></div>
          <div className="SignDocument">
            <br />
            {renderButtonSign()}
            <br />
          </div>
        </div>
      </main>
    </>
  );
}
