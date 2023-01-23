import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';

import eth from 'assets/img/iproyal/eth-icon.png';
import classNames from 'classnames';
import Loading from './Loading';
import GatewayService from 'services/gateway';

const ChoseNetworkForm = ({
  register,
  errors,
  watch,
  setFormData,
  activeCoin,
  activeNetwork,
  shopTheme
}) => {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(activeNetwork);
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await GatewayService.getNetworks(activeCoin);
      if (response.status == '200') {
        console.log('response.data', response.data);
        setNetworks(response.data.networks);
      } else {
        console.error(`Error: ${response.data.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    if (networks.length > 0) {
      setLoading(false);
    }
  }, [networks]);

  if (loading) {
    return <Loading shopTheme={shopTheme} />;
  }

  if (!loading) {
    return (
      <div className="overflow-auto scrollbar" style={{ height: 365 }}>
        {networks.map((network, index) => (
          <Flex
            key={network.id}
            alignItems="center"
            className={classNames(
              'border-bottom py-2 gap-1 cursor-pointer hover-bg-100 px-2 rounded-3',
              { 'bg-200': active == network.id },
              { 'hover-bg-100': active != network.id }
            )}
            onClick={() => {
              setActive(network.id);
              setFormData(prevState => ({
                ...prevState,
                network_id: network.id
              }));
            }}
          >
            <Avatar src={'/images/network/' + network.description.toLowerCase() + '.svg'} size="2xl" />

            <Flex className="ms-2" justifyContent="between w-100">
              <span className="mb-0 text-dark fs-0 fw-bold">
                {network.name}
              </span>
              <span className="fs-0 mb-0 text-dark fw-semi-bold">
                {network.symbol}
              </span>
            </Flex>
          </Flex>
        ))}
      </div>
    );
  }
};

ChoseNetworkForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ChoseNetworkForm;
