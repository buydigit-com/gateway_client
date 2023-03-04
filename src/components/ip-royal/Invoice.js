import Flex from 'components/common/Flex';
import React from 'react';
import Logo from 'components/common/Logo';

const Invoice = ({ txnData,shopTheme }) => {


  return (
    <Flex direction="column" className="py-3 cursor-pointer">
      <Logo textClass="text-900" width={190} />
      <h5 className="fw-semi-bold text-dark fs-2 mb-3 mt-3">Invoice</h5>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Shop</span>
        <span className="fs--1 text-dark">{txnData.shop.name}</span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Product #ID</span>
        <span className="fs--1 text-dark">{txnData.product_id}</span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Product Description</span>
        <span className="fs--1 text-dark">{txnData.product_description}</span>
      </Flex>
      <hr />
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Fiat Amount</span>
        <span className="fs--1 text-dark">
          {txnData.fiat_amount.toFixed(2)}{' '}
          {txnData.fiat_currency == 'usd'
            ? '$'
            : txnData.fiat_currency == 'eur'
            ? '€'
            : 'error'}{' '}
        </span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Fees</span>
        <span className="fs--1 text-dark">
          00.00{' '}
          {txnData.fiat_currency == 'usd'
            ? '$'
            : txnData.fiat_currency == 'eur'
            ? '€'
            : 'error'}
        </span>
      </Flex>
      <hr />
      <Flex justifyContent="between pb-2">
        <span className="text-dark fs--3 fw-semi-bold">Total Pay</span>
        <span style={shopTheme.theme.text} className="fs--3 text-danger fw-bold ">
          {txnData.fiat_amount.toFixed(2)}{' '}
          {txnData.fiat_currency == 'usd'
            ? '$'
            : txnData.fiat_currency == 'eur'
            ? '€'
            : 'error'}
        </span>
      </Flex>
      <h5 className="fw-semi-bold text-dark fs-2 mb-3 mt-3">Deposit</h5>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Coin</span>
        <span className="fs--1 text-dark">{txnData.deposit.coin.name}</span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Network</span>
        <span className="fs--1 text-dark">{txnData.deposit.network.description}</span>
      </Flex>
      <hr />
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Amount Due</span>
        <span className="fs--1 text-dark">{txnData.deposit.amount} {txnData.deposit.coin.symbol}</span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Amount Sent</span>
        <span className="fs--1 text-dark">{txnData.deposit.real_amount_received} {txnData.deposit.coin.symbol}</span>
      </Flex>
      <hr />
      <Flex justifyContent="between pb-3">
        <span className="text-dark fw-semi-bold">Blockchain Txn</span>
      </Flex>
      <Flex justifyContent="between pb-3">
        <a target="_blank" href={txnData.deposit.network.explorer_url+txnData.deposit.blockchain_txid}>{txnData.deposit.network.explorer_url+txnData.deposit.blockchain_txid.substring(0, 10)+"..."}</a>  
      </Flex>
    </Flex>
  );
};

export default Invoice;
