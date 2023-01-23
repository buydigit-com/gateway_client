import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Container,
  Form,
  Nav,
  ProgressBar
} from 'react-bootstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import AppContext, { AuthWizardContext } from 'context/Context';
import IconButton from 'components/common/IconButton';
import WizardModal from '../wizard/WizardModal';
import Flex from 'components/common/Flex';
import ChoseCoinForm from './ChoseCoinForm';
import SearchBox from 'components/navbar/top/SearchBox';
import autoCompleteInitialItem from 'data/autocomplete/autocomplete';
import ChoseNetworkForm from './ChoseNetworkForm';
import ScanCode from './ScanCode';
import Invoice from './Invoice';
import Check from './Check';
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import { min } from 'd3';
import Loading from './Loading';

const IpWizardLayout = ({ variant, validation, progressBar }) => {

  const params = useParams();

  const { isRTL } = useContext(AppContext);
  const { user, setUser, step, setStep } = useContext(AuthWizardContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors
  } = useForm();

  const [modal, setModal] = useState({"open": false, "switchMessage": ""});

  const navItems = [
    {
      icon: 'dollar-sign',
      label: 'Chose Coin'
    },
    {
      icon: 'user',
      label: 'Select Network'
    },
    {
      icon: 'dollar-sign',
      label: 'Scan & Pay'
    },
    {
      icon: 'thumbs-up',
      label: 'Generate Invoice'
    }
  ];

  const onSubmitData = data => {
    setUser({ ...user, ...data });
    setStep(step + 1);
  };

  const onError = () => {
    if (!validation) {
      clearErrors();
      setStep(step + 1);
    }
  };

  const toggle = (switchMessage) => {
    setModal({"open": !modal.open, "switchMessage": switchMessage});
  };

  const handleNavs = targetStep => {
    if (step !== 4) {
      if (targetStep < step) {
        setStep(targetStep);
      } else {
        handleSubmit(onSubmitData, onError)();
      }
    }
  };

  const handleBack = () => {
    if (step == 3){
      toggle("scanPageBack");    
    }
    else{
      setStep(step - 1);
    }
  }
  

  const [formData, setFormData] = useState({
    coin_id: undefined,
    network_id: undefined,
  });

  const [txnData, setTxnData] = useState(undefined);
  const [availableStep, setAvailableStep] = useState({
    "min": 1,
    "max": 4,
  });

  const [shopTheme, setShopTheme] = useState({
    "available": false,
    "theme": {

    }
  });

  const [socket, setSocket] = useState(null);
  

  useEffect(() => {
    const newSocket = io("http://api.buydigit.com:5000/", { query: "txn_hash="+params.txn_hash , rememberUpgrade:true, rememberTransport:true,transport: ['websocket'] });
    setSocket(newSocket);
    
    newSocket.on(params.txn_hash, (data) => {
      setTxnData(JSON.parse(data));
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (txnData == undefined) {
      return;
    }

/*     if (txnData.deposit.coin_id != formData.coin_id && txnData.deposit.coin_id != undefined) {
      console.log("txnData.deposit.coin_id != formData.coin_id", txnData.deposit.coin_id, formData.coin_id);
      setFormData({
        ...formData,
        coin_id: txnData.deposit.coin_id,
      });
    }

    if (txnData.deposit.network_id != formData.network_id && txnData.deposit.network_id != undefined) {
      console.log("txnData.deposit.network_id != formData.network_id", txnData.deposit.network_id, formData.network_id);
      setFormData({
        ...formData,
        network_id: txnData.deposit.network_id,
      });
    } */

    if (txnData.deposit.status == 'pending') {
      setAvailableStep({
        "min": 1,
        "max": 4,
      });
    }
    else if (txnData.deposit.status == 'initiated') {
      setAvailableStep({
        "min": 1,
        "max": 4,
      });
      setStep(3)
    }
    else if (txnData.deposit.status == 'waitingconfirm') {
      setAvailableStep({
        "min": 3,
        "max": 4,
      });
    }
    else if (txnData.deposit.status == 'confirmed') {
      setAvailableStep({
        "min": 4,
        "max": 4,
      });
    }
    else if (txnData.deposit.status == 'failed') {
      setAvailableStep({
        "min": 4,
        "max": 4,
      });
    }
  }, [txnData]);

  useEffect(() => {
    if (step < availableStep.min) {
      console.log("step < availableStep.min", step, availableStep.min);
      setStep(availableStep.min);
    }
  }, [availableStep]);

  useEffect(() => {
    if (txnData == undefined) {
      return;
    }

    if (Object.keys(txnData.shop.theme_customization).length != 0){
      console.log("txnData.shop.theme_customization", txnData.shop.theme_customization);
      setShopTheme({
        "available": true,
        "theme": {
          "button" : {
            "--falcon-btn-disabled-bg": txnData.shop.theme_customization.primary,
            "--falcon-btn-border-color": txnData.shop.theme_customization.primary,
            "--falcon-btn-bg": txnData.shop.theme_customization.primary,
            "--falcon-btn-hover-bg": txnData.shop.theme_customization.primary,
            "--falcon-btn-hover-color": txnData.shop.theme_customization.primary_text,
            "--falcon-btn-color": txnData.shop.theme_customization.primary_text,
            "--falcon-btn-disabled-color": txnData.shop.theme_customization.primary_text,
            "--falcon-btn-disabled-border-color" : txnData.shop.theme_customization.primary,
            "--falcon-btn-hover-border-color": txnData.shop.theme_customization.primary,
            "--falcon-btn-focus-shadow-rgb" : "241,93,84",
            "--falcon-btn-active-color" : txnData.shop.theme_customization.primary_text,
            "--falcon-btn-active-bg" : txnData.shop.theme_customization.primary,
            "--falcon-btn-active-border-color" : txnData.shop.theme_customization.primary,
          },
          "text" : {
            "--falcon-danger-rgb" : "254,181,0",
          },
          "nav":{
            "--falcon-danger" : txnData.shop.theme_customization.primary,
          }
        }
    });
  }
  
  }, [txnData]);

  return (
    <>
      {txnData == undefined && <Loading />}
      {txnData != undefined && (
      <>
      <div className="w-100">
        <div
          className={classNames('theme-wizard w-100 w-lg-50 pt-2 mx-auto', {
            'px-4 py-3': variant === 'pills',
            'pb-2': !variant
          })}
        >
          <Nav className="justify-content-center" variant={'variant'}>
            {variant === 'pills'
              ? navItems.map((item, index) => (
                  <NavItemPill
                    key={item.label}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={'check'}
                    label={item.label}
                  />
                ))
              : navItems.map((item, index) => (
                  <NavItem
                    key={item.label}
                    shopTheme={shopTheme}
                    index={index + 1}
                    step={step}
                    handleNavs={handleNavs}
                    icon={''}
                    label={item.label}
                  />
                ))}
          </Nav>
        </div>
      </div>
      <Container fluid="md">
        <WizardModal shopTheme={shopTheme} modal={modal} setModal={setModal} setStep={setStep} />
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmitData, onError)}
          className="theme-wizard mb-5 position-relative"
        >
          {progressBar && <ProgressBar now={step * 25} style={{ height: 2 }} />}
          <div className="fw-normal px-lg-6 py-4">
            {step === 1 && (
              <Flex className="flex-column gap-3 flex-lg-row">
                <Card className="rounded-4 w-100 w-lg-50 order-2 order-lg-1">
                  <Card.Header className="border-bottom">
                    <Card.Title> Select Currency</Card.Title>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <div className='mb-4'>
                        <SearchBox autoCompleteItem={[]} />
                      </div>
                      <ChoseCoinForm
                        activeCoin={formData.coin_id}
                        setFormData={setFormData}
                        register={register}
                        errors={errors}
                        watch={watch}
                        txn_hash={params.txn_hash}
                        shopTheme={shopTheme}
                      />
                    </div>

                    <Button
                      variant="danger"
                      style={shopTheme.theme.button}
                      className="ms-auto rounded-4  w-100 px-5 mt-5 py-3"
                      type="submit"
                      transform="down-1 shrink-4"
                      disabled={formData.coin_id === undefined}
                    >
                      Proceed to pay
                    </Button>
                  </Card.Body>
                </Card>
                <Card
                  className="rounded-4 w-100 w-lg-50 order-1 order-lg-2"
                  style={{ height: 650 }}
                >
                  <Card.Header className="border-bottom">
                    <Card.Title>Payment Summary</Card.Title>
                  </Card.Header>
                  <Card.Body>
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
                      <span className="fs--1 text-dark">{txnData.fiat_amount} {txnData.fiat_currency == "usd" ? "$" : txnData.fiat_currency == "eur" ? "€" : "error" } </span>
                    </Flex>
                    <Flex justifyContent="between pb-3">
                      <span className="text-dark fw-semi-bold">Fees</span>
                      <span className="fs--1 text-dark">0.00 {txnData.fiat_currency == "usd" ? "$" : txnData.fiat_currency == "eur" ? "€" : "error" }</span>
                    </Flex>
                    <hr />
                    <Flex justifyContent="between pb-2">
                      <span className="text-dark fs--3 fw-semi-bold">Total Pay</span>
                      <span style={shopTheme.theme.text} className="fs--3 text-danger fw-bold ">
                        {txnData.fiat_amount} {txnData.fiat_currency == "usd" ? "$" : txnData.fiat_currency == "eur" ? "€" : "error" }
                      </span>
                    </Flex>
                    <Flex justifyContent="between pb-3">
                      <span className="text-dark fw-semi-bold">Expiry Date</span>
                      <span className="fs--1 text-dark">{txnData.expiry_at}</span>
                    </Flex>
                    <div className="ms-auto rounded-3 border border-300 p-3 mt-3 text-truncate">
                      <p className="mb-1 text-dark">Paying with buydigit.com</p>
                      <span className="fs--1  " style={{ width: '90px' }}>
                        via Bitcoin, Ethereum and other cryptocurrencies.
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Flex>
            )}
            {step === 2 && (
              <Card className="rounded-4 mx-auto w-100 w-lg-50">
                <Card.Header className="border-bottom">
                  <Card.Title> Select Network</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    {formData.coin_id != undefined && (
                    <ChoseNetworkForm
                      activeCoin={formData.coin_id}
                      activeNetwork={formData.network_id}
                      setFormData={setFormData}
                      register={register}
                      errors={errors}
                      watch={watch}
                      shopTheme={shopTheme}
                    />
                    )}
                  </div>

                  <Button
                    variant="danger"
                    style={shopTheme.theme.button}
                    className="ms-auto rounded-4  w-100 px-5 mt-3 py-3"
                    type="submit"
                    transform="down-1 shrink-4"
                    disabled={formData.network_id === undefined || formData.coin_id === undefined}
                    onClick={() => {
                      setTxnData({...txnData, deposit: {
                        amount: undefined,
                      }})
                      socket.emit('initiateTransaction', {
                        txn_hash: params.txn_hash,
                        coin_id: formData.coin_id,
                        network_id: formData.network_id,
                      });
                    }}
                  >
                    Continue
                  </Button>
                </Card.Body>
              </Card>
            )}
            {step === 3 && (
              <Card className="rounded-4 w-100 w-lg-50 mx-auto">
                <Card.Header className="border-bottom">
                  <Card.Title className="text-center"> Send Payment</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <ScanCode
                    register={register}
                    shopTheme={shopTheme}
                    txnData={txnData}
                    errors={errors}
                    setValue={setValue}
                  />
                </Card.Body>
              </Card>
            )}
            {step === 4 && (
              <Flex alignItems="center" direction="column" className="gap-3">
                <Card className="rounded-4 mx-auto shadow-sm w-lg-50 w-100">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Invoice txnData={txnData} shopTheme={shopTheme} />
                  </Card.Body>
                </Card>
                <Button style={shopTheme.theme.button} className="btn-danger py-3 rounded-4 mx-auto w-100 w-lg-50">
                  Download Invoice
                </Button>
              </Flex>
            )}
          </div>
          <div
            className={classNames('px-lg-6 position-absolute start-0', {
              'd-none': step === 4,
              'd-lg-flex d-none': step < 4
            })}
            style={{ top: '45%' }}
          >
            <IconButton
              variant="danger"
              style={shopTheme.theme.button}
              icon={isRTL ? 'chevron-right' : 'chevron-left'}
              iconAlign="left"
              transform="down-1 shrink-4"
              className={classNames(
                'px-0 fw-semi-bold rounded-circle px-3 py-2 shadow-sm',
                {
                  'd-none': step === 1
                }
              )}
              onClick={handleBack}
            />
          </div>
          <div
            className={classNames('px-lg-6 position-absolute ', {
              'd-none': step === 4,
              'd-lg-none d-flex': step < 4
            })}
            style={{ top: '45%', left: -30 }}
          >
            <IconButton
              variant="danger"
              style={shopTheme.theme.button}
              icon={isRTL ? 'chevron-right' : 'chevron-left'}
              iconAlign="left"
              transform="down-1 shrink-4"
              className={classNames(
                'px-0 fw-semi-bold rounded-circle px-3 py-2 shadow-sm',
                {
                  'd-none': step === 1
                }
              )}
              onClick={handleBack}
            />
          </div>
        </Form>
      </Container>
    </>
      )}
    </>
  );
};

const NavItem = ({ index, step, handleNavs, label ,shopTheme }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold ', {
          done: index < 4 ? step > index : step > 3,
          active: step === index
        })}
        style={shopTheme.theme.nav}
      >
        <span className="nav-item-circle-parent ">
          <span
            style={{ borderRadius: '40%' }}
            className="nav-item-circle position-relative"
          >
            {step > index && <Check />}
            <span
              hidden={index <= 4 ? step > index : step > 3}
              className="position-absolute top-0"
              style={{ left: '35%' }}
            >
              {index}
            </span>
          </span>
        </span>
        <span className="d-none d-lg-block mt-1 fs--1">{label}</span>
      </Nav.Link>
    </Nav.Item>
  );
};

const NavItemPill = ({ index, step, handleNavs, icon, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold', {
          done: step > index,
          active: step === index
        })}
        onClick={() => handleNavs(index)}
      >
        <Flex alignItems="center" justifyContent="center">
          <FontAwesomeIcon icon={icon} />
          {/* <span>{index}</span> */}
          <span className="d-none d-lg-block mt-1 fs--1 ms-2">{label}</span>
        </Flex>
      </Nav.Link>
    </Nav.Item>
  );
};

IpWizardLayout.propTypes = {
  variant: PropTypes.oneOf(['pills']),
  validation: PropTypes.bool,
  progressBar: PropTypes.bool
};

NavItemPill.propTypes = {
  index: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  handleNavs: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

NavItem.propTypes = NavItemPill.propTypes;

export default IpWizardLayout;
