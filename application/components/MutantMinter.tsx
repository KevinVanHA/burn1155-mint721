import { useState } from "react";
import { SmartContract, useAddress, useContract } from "@thirdweb-dev/react";
import { BaseContract } from "ethers";
import { MAYC_ADDRESS, SERUM_ADDRESS } from "../const/contractAddresses";

const MutantMinter = () => {
  const address = useAddress();
  const { contract: serumContract } = useContract(SERUM_ADDRESS);
  const { contract: maycContract } = useContract(MAYC_ADDRESS);
  const [isLoading, setIsLoading] = useState(false);

  const mintMutantNft = async () => {
    if (!address || !serumContract || !maycContract) {
      return alert("Please connect your wallet first");
    }
    
    setIsLoading(true);
    
    try {
      // 1. Check the approval of the mayc contract to burn the user's serum tokens
      const hasApproval = await serumContract.call("isApprovedForAll", [
        address,
        maycContract.getAddress(),
      ]);
      
      const balance = await serumContract.call("balanceOf", [address, 0]);

      if (!hasApproval) {
        // Set approval
        await serumContract.call("setApprovalForAll", [
          maycContract.getAddress(),
          true,
        ]);
      }

      if (balance < 1) {
        setIsLoading(false);
        return alert("Not enough serum tokens");
      }

      await maycContract.call("claim", [address, 1]);
      alert("Success! Your Mutant NFT has been minted!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting your NFT. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={mintMutantNft} 
      disabled={isLoading || !address}
      style={{
        backgroundColor: "#3f51b5",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading || !address ? 0.7 : 1
      }}
    >
      {isLoading ? "Processing..." : "Mint Your Mutant NFT"}
    </button>
  );
};

export default MutantMinter;