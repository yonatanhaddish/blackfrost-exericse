import React, { useState } from 'react';

import { Radio, RadioGroup } from "@blueprintjs/core"

const WalletConnector = () => {

  const [whichWalletSelected, setwhichWalletSelected] = useState('');
  const [wallets1, setwallets1] = useState([]);
  const [walletIsEnabled, setwalletIsEnabled] = useState(false);

  const handleWalletSelect = (obj) => {
    const whichWalletSelected = obj.target.value
    setwhichWalletSelected(whichWalletSelected);
    console.log(whichWalletSelected);
  };
  

  return (
    <>
      <div>
        <RadioGroup label= "Select Wallet:"
                    onChange={handleWalletSelect}
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