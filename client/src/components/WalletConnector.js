import React, { useEffect, useState } from 'react';

import {
  Address,
  BaseAddress,
  MultiAsset,
  Assets,
  ScriptHash,
  Costmdls,
  Language,
  CostModel,
  AssetName,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionOutput,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,
  BigInt,
  TransactionHash,
  TransactionInputs,
  TransactionInput,
  TransactionWitnessSet,
  Transaction,
  PlutusData,
  PlutusScripts,
  PlutusScript,
  PlutusList,
  Redeemers,
  Redeemer,
  RedeemerTag,
  Ed25519KeyHashes,
  ConstrPlutusData,
  ExUnits,
  Int,
  NetworkInfo,
  EnterpriseAddress,
  TransactionOutputs,
  hash_transaction,
  hash_script_data,
  hash_plutus_data,
  // index_of_input,
  ScriptDataHash,
  Ed25519KeyHash,
  NativeScript,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";


import { Button, Radio, RadioGroup } from "@blueprintjs/core"

const WalletConnector = () => {

  const [whichWalletSelected, setwhichWalletSelected] = useState('');
  const [walletIsFound, setWalletIsFound] = useState(false);
  const [API, setAPI] = useState();
  const [walletIsEnabled, setwalletIsEnabled] = useState(false);
  const [networkId, setNewworkId] = useState();
  

  const handleWalletSelect = (obj) => {
    const whichWalletSelected = obj.target.value
    setwhichWalletSelected(whichWalletSelected);
    console.log(whichWalletSelected);
    // refreshData();
  };

  const refreshData = async () => {
    const walletIsFound = checkIfWalletFound();
    // console.log(whichWalletSelected)
    // console.log(walletIsFound);

    generateScriptAddress();

    try {
      const walletIsFound = checkIfWalletFound();
      // console.log(walletIsFound);
      if (walletIsFound) {
        console.log("walletFound")
        enableWallet();
      }
      else console.log("WalletNotFound");
    }
    catch (err) {
      console.log(err)
    }
  }

  const checkIfWalletFound = () => {
    // let walletIsFound = false;
    
    const wallet = whichWalletSelected;

    if (wallet === 'nami') {
      const walletIsFound = !!window?.cardano?.nami
      console.log("nami")
    }
    else if (wallet === "eternl") {
      const walletIsFound = !!window?.cardano?.eternl
      console.log("eternl")
    }
    else if (wallet === 'yoroi') {
      const walletIsFound = !!window?.cardano?.yoroi
      console.log('yoroi')
    }

    setWalletIsFound({walletIsFound})
    console.log(walletIsFound)
    return walletIsFound;
  }

  const enableWallet = async () => {
    
    try {

      const wallet = whichWalletSelected;
      if (wallet === "nami") {
        const API = await window.cardano.nami.enable();
        // console.log(API);
      }
      else if (wallet === "eternl") {
        const API = await window.cardano.eternl.enable();
        // console.log(API);
      }
      else if (wallet === "yoroi") {
        const API = await window.cardano.yoroi.enable();
        // console.log(API);
      }

      await checkIfWalletEnabled();
      await getNetworkId();
    } 
    catch (err) {
      console.log(err);
    }
    };

  const checkIfWalletEnabled = async () => {

    try {
      const wallet = whichWalletSelected
      if (wallet === "nami") {
        const walletIsEnabled = await window.cardano.nami.isEnabled();
        // console.log("nami: " + walletIsEnabled);
      }
      else if (wallet === "eternl") {
        const walletIsEnabled = await window.cardano.eternl.isEnabled();
        // console.log("eternl: " + walletIsEnabled);
      }
      else if (wallet === "yoroi") {
        const walletIsEnabled = await window.cardano.yoroi.isEnabled();
        // console.log("yoroi: " + walletIsEnabled);
      }

      setwalletIsEnabled({walletIsEnabled})
      // console.log(walletIsEnabled);
    } 
    catch (err) {
      console.log(err)
    }
    return walletIsEnabled;
  };

  const getNetworkId = async () => {

    try {
      const networkId = await API.getNetworkId();
      console.log("TESTNETWORK!!!")
    }
    catch (err) {
      console.log(err)
    }
  };

  const generateScriptAddress = () => {
    const networkId = NetworkInfo.testnet().network_id();
    console.log("TESTNETWORKID: " + networkId)
  };


  return (
    <>
      <div>
        <RadioGroup label= "Select Wallet:"
                    onChange={handleWalletSelect}
                    selectedValue={whichWalletSelected}
                    inline={true}
         >
          <Radio label='Nami' value='nami' />
          <Radio label='Eternl' value='eternl' />
          <Radio label='Yoroi' value='yoroi' />
        </RadioGroup>
        <Button onClick={refreshData}>Refresh</Button>
      </div>
    </>
  )
};

export default WalletConnector;