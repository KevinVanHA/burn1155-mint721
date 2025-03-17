import { useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import styles from "../styles/Theme.module.css";

// Import Navigation component normally since it doesn't use ThirdwebProvider hooks directly
import Navigation from "../components/Navigation";

// Create a dynamic import for the MutantMinter with client-side only rendering
const MutantMinter = dynamic(
  () => import("../components/MutantMinter"),
  { ssr: false }
);

const Home: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Navigation />
      <main className={styles.container}>
        <h1 className={styles.title}>Mutant NFT Minter</h1>
        <p className={styles.description}>
          Burn your 1155 Serum Token to mint a new 721 Mutant NFT
        </p>
        <div className={styles.minterContainer}>
          {isMounted ? <MutantMinter /> : <div>Loading...</div>}
        </div>
      </main>
    </div>
  );
};

export default Home;