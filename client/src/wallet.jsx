import { useState } from 'react';
import {
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  LinearFee,
  BigNum,
  Address,
  Transaction,
  TransactionWitnessSet,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionOutput,
} from '@emurgo/cardano-serialization-lib-asmjs';
import WalletSelection from './components/walletSelection';
let Buffer = require('buffer/').Buffer;

function Wallet() {
  const [walletSelected, setWalletSelected] = useState('');
  const [walletName, setWalletName] = useState('');
  const [balance, setBalance] = useState(0);
  const [paymentAddress, setPaymentAddress] = useState('');
  const [changeAddress, setChangeAddress] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [API, setAPI] = useState('');
  const [Utxos, setUtxos] = useState([]);
  const [txOutputHash, setTxOutputHash] = useState('');

  // boiler plate
  let protocolParams = {
    linearFee: {
      minFeeA: '44',
      minFeeB: '155381',
    },
    minUtxo: '34482',
    poolDeposit: '500000000',
    keyDeposit: '2000000',
    maxValSize: 5000,
    maxTxSize: 16384,
    priceMem: 0.0577,
    priceStep: 0.0000721,
    coinsPerUtxoWord: '34482',
  };

  const handleWalletSelect = (item) => {
    setWalletSelected(item.value);
    setWalletName(item.name);
  };

  // everytime a new wallet is chosen we need to connect to that waller and get
  // api key etc ....
  const refreshData = async () => {
    try {
      await getUtxos();
      await getBalance();
      await getChangeAddress();
    } catch (err) {
      console.log(err);
    }
  };

  // boiler plate
  const initTransactionBuilder = async () => {
    const txBuilder = TransactionBuilder.new(
      TransactionBuilderConfigBuilder.new()
        .fee_algo(
          LinearFee.new(
            BigNum.from_str(protocolParams.linearFee.minFeeA),
            BigNum.from_str(protocolParams.linearFee.minFeeB)
          )
        )
        .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
        .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
        .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
        .max_value_size(protocolParams.maxValSize)
        .max_tx_size(protocolParams.maxTxSize)
        .prefer_pure_change(true)
        .build()
    );
    return txBuilder;
  };

  const checkIfWalletFound = () => {
    let walletIsFound = false;
    const wallet = walletSelected;
    if (wallet === 'nami') {
      walletIsFound = !!window?.cardano?.nami;
    } else if (wallet === 'eternl') {
      walletIsFound = !!window?.cardano?.eternl;
    } else if (wallet === 'yoroi') {
      walletIsFound = !!window?.cardano?.flint;
    }
    return walletIsFound;
  };

  // when you enable it it returns a wallet api that you can use to send transactions, it
  // first checks if the user has the specified wallet locally
  const connectToWallet = async () => {
    const walletFound = checkIfWalletFound();
    if (walletFound) {
      try {
        let walletAPI;
        if (walletSelected === 'nami') {
          walletAPI = await window.cardano.nami.enable();
        } else if (walletSelected === 'eternl') {
          walletAPI = await window.cardano.eternl.enable();
        } else if (walletSelected === 'yoroi') {
          walletAPI = await window.cardano.yoroi.enable();
        }
        setAPI(walletAPI);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Wallet not found locally');
    }
  };

  const getBalance = async () => {
    try {
      const balanceCBORHex = await API.getBalance();
      const walletBalance = Value.from_bytes(Buffer.from(balanceCBORHex, 'hex'))
        .coin()
        .to_str();
      setBalance(walletBalance);
      console.log(walletBalance);
    } catch (err) {
      console.log(err);
    }
  };

  const getUtxos = async () => {
    let Utxos = [];
    try {
      const rawUtxos = await API.getUtxos();
      for (const rawUtxo of rawUtxos) {
        const utxo = TransactionUnspentOutput.from_bytes(
          Buffer.from(rawUtxo, 'hex')
        );
        const input = utxo.input();
        const txid = Buffer.from(
          input.transaction_id().to_bytes(),
          'utf8'
        ).toString('hex');
        const txindx = input.index();
        const output = utxo.output();
        const amount = output.amount().coin().to_str();
        const multiasset = output.amount().multiasset();
        let multiAssetStr = '';

        if (multiasset) {
          const keys = multiasset.keys();
          const N = keys.len();

          for (let i = 0; i < N; i++) {
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(
              policyId.to_bytes(),
              'utf8'
            ).toString('hex');
            const assets = multiasset.get(policyId);
            const assetNames = assets.keys();
            const K = assetNames.len();

            for (let j = 0; j < K; j++) {
              const assetName = assetNames.get(j);
              const assetNameString = Buffer.from(
                assetName.name(),
                'utf8'
              ).toString();
              const assetNameHex = Buffer.from(
                assetName.name(),
                'utf8'
              ).toString('hex');
              const multiassetAmt = multiasset.get_asset(policyId, assetName);
              multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
            }
          }
        }
        const obj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          str: `${txid} #${txindx} = ${amount}`,
          multiAssetStr: multiAssetStr,
          TransactionUnspentOutput: utxo,
        };
        Utxos.push(obj);
      }
      setUtxos(Utxos);
    } catch (err) {
      console.log(err);
    }
  };

  const getTxUnspentOutputs = async () => {
    let txOutputs = TransactionUnspentOutputs.new();
    for (const utxo of Utxos) {
      txOutputs.add(utxo.TransactionUnspentOutput);
    }
    return txOutputs;
  };

  const sendAda = async () => {
    const txBuilder = await initTransactionBuilder();
    const shelleyOutputAddress = Address.from_bech32(paymentAddress);
    const shelleyChangeAddress = Address.from_bech32(changeAddress);

    txBuilder.add_output(
      TransactionOutput.new(
        shelleyOutputAddress,
        Value.new(BigNum.from_str(sendAmount.toString()))
      )
    );

    // Find the available UTXOs in the wallet and
    // us them as Inputs
    const txUnspentOutputs = await getTxUnspentOutputs();
    txBuilder.add_inputs_from(txUnspentOutputs, 1);

    console.log(txUnspentOutputs);

    // calculate the min fee required and send any change to an address
    txBuilder.add_change_if_needed(shelleyChangeAddress);

    // once the transaction is ready, we build it to get the tx body without witnesses
    const txBody = txBuilder.build();

    // Tx witness
    const transactionWitnessSet = TransactionWitnessSet.new();

    const tx = Transaction.new(
      txBody,
      TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
    );

    let txVkeyWitnesses = await API.signTx(
      Buffer.from(tx.to_bytes(), 'utf8').toString('hex'),
      true
    );

    txVkeyWitnesses = TransactionWitnessSet.from_bytes(
      Buffer.from(txVkeyWitnesses, 'hex')
    );

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

    const signedTx = Transaction.new(tx.body(), transactionWitnessSet);

    const submittedTxHash = await API.submitTx(
      Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex')
    );
    console.log(submittedTxHash);
    setTxOutputHash(submittedTxHash);
  };

  // address to send any leftover change from trnasaction
  const getChangeAddress = async () => {
    try {
      const raw = await API.getChangeAddress();
      const changeAddress = Address.from_bytes(
        Buffer.from(raw, 'hex')
      ).to_bech32();
      setChangeAddress(changeAddress);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <WalletSelection handleWalletSelect={handleWalletSelect} />
      <button onClick={() => connectToWallet()}>Connect</button>
      <h1>Selected wallet : {walletName} </h1>
      <h1>Balance : {balance}</h1>
      <button onClick={() => refreshData()}>Refresh Data</button>
      <h1>
        Send Address :{' '}
        <input
          type="text"
          onChange={(e) => {
            setPaymentAddress(e.target.value);
          }}
        />{' '}
      </h1>
      <h1>
        Enter Amount :{' '}
        <input
          type="number"
          onChange={(e) => {
            setSendAmount(e.target.value);
          }}
        />
      </h1>
      <button onClick={() => sendAda()}>Send Ada</button>
      <h1>Transaction Output Hash: {txOutputHash}</h1>
    </div>
  );
}

export default Wallet;
