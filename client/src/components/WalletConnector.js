import React, { useState } from 'react';

import { Radio, RadioGroup } from "@blueprintjs/core"

const WalletConnector = () => {

  const [whichWalletSelected, setwhichWalletSelected] = useState('');
  

  const handleWalletSelect = (obj) => {
    const whichWalletSelected = obj.target.value
    setwhichWalletSelected(whichWalletSelected);
    // console.log(whichWalletSelected);
    refreshData();
  };

  const checkIfWalletFound = () => {
    let walletIsFound = false;

    const wallet = whichWalletSelected;
    if (wallet == 'nami') {
      console.log("nami")
    }
    else if (wallet == "eternl") {
      console.log("eternl")
    }
    else if (wallet == 'yoroi') {
      console.log('yoroi')
    }
    return walletIsFound;
  }

  const refreshData = async () => {
    try {
      const walletIsFound = checkIfWalletFound();
      if (walletIsFound) {
        console.log("walletFound")
      }
      else console.log("WalletNotFound");
    }
    catch (err) {
      console.log(err)
    }
  }
  

  return (
    <>
      <div>
        <RadioGroup label= "Select Wallet:"
                    onChange={handleWalletSelect}
                    selectedValue={whichWalletSelected}
         >
          <Radio label='Nami' value='nami' />
          <Radio label='Eternl' value='eternl' />
          <Radio label='Yoroi' value='yoroi' />
        </RadioGroup>
      </div>
    </>
  )
};

export default WalletConnector;