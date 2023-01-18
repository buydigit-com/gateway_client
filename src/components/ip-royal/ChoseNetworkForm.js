import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';

import eth from 'assets/img/iproyal/eth-icon.png';

const ChoseNetworkForm = ({ register, errors, watch }) => {
  console.log(register, errors, watch);
  return (
    <>
      <Flex
        alignItems="center"
        className="border-bottom py-4 gap-1 cursor-pointer"
      >
        <Avatar src={eth} size="2xl" />

        <Flex className="ms-2" justifyContent="between w-100">
          <span className="mb-0 text-dark fs-0 fw-semi-bold">
            Ethereum Main Network
          </span>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        className="border-bottom py-4 gap-1 cursor-pointer"
      >
        <Avatar src={eth} size="2xl" />

        <Flex className="ms-2" justifyContent="between w-100">
          <span className="mb-0 text-dark fs-0 fw-semi-bold">
            Rinkeby Test Network
          </span>
        </Flex>
      </Flex>
    </>
  );
};

ChoseNetworkForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ChoseNetworkForm;
