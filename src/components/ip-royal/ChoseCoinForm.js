import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// import WizardInput from './WizardInput';

import Flex from 'components/common/Flex';
import Avatar from 'components/common/Avatar';

import bitcoin from 'assets/img/iproyal/bitcoin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import GatewayService from 'services/gateway';
import Loading from './Loading';

const ChoseCoinForm = ({
  register,
  errors,
  watch,
  setFormData,
  activeCoin,
  txn_hash,
  shopTheme
}) => {
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(activeCoin);
  const [coins, setCoins] = useState([]);

  const [slice, setSlice] = useState(6);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await GatewayService.getCoins(txn_hash);
      if (response.status == '200') {
        console.log('response.data', response.data);
        setCoins(response.data.coins);
      } else {
        console.error(`Error: ${response.data.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      setLoading(false);
    }
  }, [coins]);

  if (loading) {
    return <Loading shopTheme={shopTheme} />;
  }

  if (!loading) {
    return (
      <div className="position-relative">
        <div className="scrollbar overflow-auto" style={{ height: 365 }}>
          {coins.slice(0, slice).map(
            (coin, index) => (
              console.log('coin', coin),
              (
                <Flex
                  key={coin.id}
                  alignItems="center"
                  className={classNames(
                    'border-bottom py-3 cursor-pointer hover-bg-200 rounded-3 px-2',
                    // { 'bg-200': active },
                    { 'border-top' : index == 0 },
                    { 'bg-200': active == coin.id },
                    { 'hover-bg-100': active != coin.id }
                  )}
                  onClick={() => {
                    setActive(coin.id);
                    setFormData(prevState => ({
                      ...prevState,
                      coin_id: coin.id,
                      network_id: undefined
                    }));
                  }}
                >
                  <Avatar
                    src={'/images/crypto/' + coin.symbol.toLowerCase() + '.svg'}
                    size="xl"
                  />

                  <Flex className="ms-2" justifyContent="between w-100">
                    <span className="mb-0 text-dark fs-0 fw-bold">
                      {coin.name}
                    </span>
                    <span className="fs-0 mb-0 text-dark fw-semi-bold">
                      {coin.symbol}
                    </span>
                  </Flex>
                </Flex>
              )
            )
          )}
        </div>

        {coins.length > 4 && (

        <div
          className={classNames('position-absolute hover-200', {
            'd-none': coins.length < 4 || showMore
          })}
          style={{ bottom: -13, right: 'calc(50% - 59px)' }}
        >
          <Flex
            role="button"
            className="tex-white px-2 py-1 fs--1 gap-2 rounded-4"
            justifyContent="center"
            style={{ backgroundColor: '#817B7B' }}
            alignItems="center"
            onClick={() => {
              setSlice(999);
              setShowMore(true);
            }}
          >
            <span className="text-white">More Currency</span>
            <FontAwesomeIcon
              size="sm"
              className="text-white"
              icon="chevron-down"
            />
          </Flex>
        </div>
        )}
      </div>
    );
  }
};

ChoseCoinForm.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  watch: PropTypes.func
};

export default ChoseCoinForm;
