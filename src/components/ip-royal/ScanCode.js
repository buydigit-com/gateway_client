import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';

import qrcode from 'assets/img/iproyal/qrcode.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScanCode = ({ register, errors, watch }) => {
  console.log(register, errors, watch);
  return (
    <>
      <Flex
        alignItems="center"
        direction="column"
        className="py-3 cursor-pointer"
      >
        <span className="fs-0 text-dark"> You are paying</span>
        <span>
          <span className="fs-1 text-danger fs-2">0.00078564</span>
          <span className="fw-semi-bold fs-1 text-dark"> BTC</span>
        </span>
        <div className="border rounded-3 p-2 mt-3">
          <img src={qrcode} alt="d" />
        </div>
        <p className="w-50 mx-auto fs--1 mt-3">
          To complete your payment, please send 0.0009 BCH to the address below.
        </p>
        <Flex
          style={{ width: '65%' }}
          className="border p-3 rounded-3 gap-3"
          justifyContent="between"
          alignItems="center"
          onClick={() => {}}
        >
          <span className="text-dark">1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</span>
          <FontAwesomeIcon size="lg" icon="fa-regular fa-copy" />
        </Flex>
      </Flex>
    </>
  );
};

ScanCode.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ScanCode;
