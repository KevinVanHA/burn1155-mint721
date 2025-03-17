import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Theme.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoContainer}>
          {/* Replace with your actual logo or app name */}
          <div className={styles.logoWrapper}>
            <Image 
              src="/logo-placeholder.png" 
              alt="App Logo" 
              width={40} 
              height={40}
              className={styles.logo}
              ></Image>
            <span className={styles.appName}>Burn1155Mint721</span>
          </div>
        </Link>
        <div className={styles.connectWalletContainer}>
          <ConnectWallet 
            theme="dark"
            btnTitle="Connect Wallet"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;