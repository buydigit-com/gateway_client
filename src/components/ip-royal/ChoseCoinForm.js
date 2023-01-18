import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';

import bitcoin from 'assets/img/iproyal/bitcoin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChoseCoinForm = ({ register, errors, watch }) => {
  console.log(register, errors, watch);
  return (
    <>
      <Flex alignItems="center" className="border-bottom py-4 cursor-pointer">
        <Avatar src={bitcoin} size="xl" />

        <Flex className="ms-2" justifyContent="between w-100">
          <span className="mb-0 text-dark fs-0 fw-semi-bold">Bit Coin</span>
          <span className="fs-0 mb-0">0.0000000000.1BTC</span>
        </Flex>
      </Flex>
      <Flex alignItems="center" className="border-bottom py-4 cursor-pointer">
        <Avatar src={bitcoin} size="xl" />

        <Flex className="ms-2" justifyContent="between w-100">
          <span className="mb-0 text-dark fs-0 fw-semi-bold">Ethereum</span>
          <span className="fs-0 mb-0">0.0000000000.1BTC</span>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        className="border-bottom py-4 cursor-pointer position-relative"
      >
        <Avatar src={bitcoin} size="xl" />

        <Flex className="ms-2" justifyContent="between w-100">
          <span className="mb-0 text-dark fs-0 fw-semi-bold">Dogecoin</span>
          <span className="fs-0 mb-0">0.0000000000.1BTC</span>
        </Flex>
        <div
          className="position-absolute hover-200"
          style={{ bottom: -15, zIndex: 10, right: '40%' }}
        >
          <Flex
            className="tex-white px-2 py-1 fs--1 gap-2 rounded-4"
            justifyContent="center"
            style={{ backgroundColor: '#817B7B' }}
            alignItems="center"
          >
            <span className="text-white">More Currency</span>
            <FontAwesomeIcon
              size="sm"
              className="text-white"
              icon="chevron-down"
            />
          </Flex>
        </div>
      </Flex>
    </>
  );
};

ChoseCoinForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ChoseCoinForm;
