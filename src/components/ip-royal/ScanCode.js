import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';
import QRCode from 'react-qr-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Loading from './Loading';
import { Spinner } from 'react-bootstrap';
import SoftBadge from 'components/common/SoftBadge';

const ScanCode = ({ register, errors, watch, txnData }) => {
  function Status() {
    switch (txnData.deposit.status) {
      case 'initiated':
        return (
          <div className="w-100 w-lg-75 rounded-3 border border-300 p-3 mt-3 text-truncate">
            <Flex
              className=""
              justifyContent="between"
              alignItems="center"
            >
              <span className="text-dark text-truncate fw-semi-bold">
                Payment Status:&nbsp;
                <SoftBadge pill bg="warning" className="ml-2">
                  Pending
                </SoftBadge>
              </span>
              <Spinner animation="grow" size="sm" />
            </Flex>
          </div>
        );
      case 'waitingconfirm':
        return (
          <div className="w-100 w-lg-75 rounded-3 border border-300 p-3 mt-3 text-truncate">
            <Flex
              className=""
              justifyContent="between"
              alignItems="center"
            >
              <span className="text-dark text-truncate fw-semi-bold">
                Payment Status:&nbsp;
                <SoftBadge pill bg="warning" className="ml-2">
                  Blockchain On Hold
                </SoftBadge>
              </span>
              <Spinner animation="grow" size="sm" />
            </Flex>
            <span className="fs--1  " style={{ width: '90px' }}>
              Blockchain Transaction: &nbsp;&nbsp;
              <a target="_blank" href={txnData.deposit.network.explorer_url+txnData.deposit.blockchain_txid}>{txnData.deposit.blockchain_txid.substring(0, 30)+"..."}</a>  
            </span>
          </div>
        );
    }
  }

  if (txnData.deposit.amount == undefined) {
    return <Loading />;
  }

  if (txnData.deposit.amount != undefined) {
    return (
      <>
        <Flex
          alignItems="center"
          direction="column"
          className="py-3 cursor-pointer"
        >
          <span className="fs-0 text-dark"> You are paying</span>
          <span>
            <span className="fs-1 fw-semi-bold text-danger fs-2">
              {txnData.deposit.amount}
            </span>
            <span className="fw-semi-bold fs-1 text-dark">
              {' '}
              {txnData.deposit.coin.symbol}
            </span>
          </span>
          <p className="w-100 w-lg-50 text-center mx-auto fs--1 mt-1">
            Network Selected: {txnData.deposit.network.description}
          </p>
          <div className="border rounded-3 p-2 mt-2">
            <QRCode
              style={{ height: '200px', maxWidth: '100%', width: '100%' }}
              value={txnData.deposit.deposit_address}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="w-100 w-lg-50 text-center mx-auto fs--1 mt-3">
            To complete your payment, please send {txnData.deposit.amount}{' '}
            {txnData.deposit.coin.symbol} to the address below. You can scan the
            QR code with your mobile wallet or copy the address and paste it
            into your wallet. Select the right network or funds will be lost.
          </p>
          <Flex
            className="border p-2 rounded-3 gap-1 w-100 w-lg-75"
            justifyContent="between"
            alignItems="center"
            onClick={() => {
              navigator.clipboard.writeText(txnData.deposit.deposit_address);
            }}
          >
            <span className="text-dark text-truncate">
              {txnData.deposit.deposit_address}
            </span>
            <FontAwesomeIcon size="lg" icon={faCopy} />
          </Flex>
          <Status />
        </Flex>
      </>
    );
  }
};

ScanCode.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ScanCode;
