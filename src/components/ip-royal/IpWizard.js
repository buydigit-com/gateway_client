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

  const [modal, setModal] = useState(false);

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

  const toggle = () => setModal(!modal);

  const handleNavs = targetStep => {
    if (step !== 4) {
      if (targetStep < step) {
        setStep(targetStep);
      } else {
        handleSubmit(onSubmitData, onError)();
      }
    } else {
      toggle();
    }
  };

  const [formData, setFormData] = useState({
    coin_id: undefined,
    network_id: undefined,
  });

  const [socket, setSocket] = useState(null);
  

  useEffect(() => {
    const newSocket = io("http://api.buydigit.com:5000/", { query: "hash="+params.txn_hash , rememberUpgrade:true, rememberTransport:true,transport: ['websocket'] });
    setSocket(newSocket);
    
    newSocket.on('txnUpdate', (data) => {
      console.log(data);
    });

    newSocket.on('connect', () => {
      console.log("Connected");
    });

    return () => newSocket.close();
  }, []);

  return (
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
        <WizardModal modal={modal} setModal={setModal} />
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
                        <SearchBox autoCompleteItem={autoCompleteInitialItem} />
                      </div>
                      <ChoseCoinForm
                        activeCoin={formData.coin_id}
                        setFormData={setFormData}
                        register={register}
                        errors={errors}
                        watch={watch}
                        txn_hash={params.txn_hash}
                      />
                    </div>

                    <Button
                      variant="danger"
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
                  style={{ height: 400 }}
                >
                  <Card.Header className="border-bottom">
                    <Card.Title>Payment Summary</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Flex justifyContent="between pb-3">
                      <span className="text-dark fw-semi-bold">Store Name</span>
                      <span className="fs--1 text-dark">Franklin Decor</span>
                    </Flex>
                    <Flex justifyContent="between pb-1">
                      <span className="text-dark fw-semi-bold">Amount</span>
                      <span className="fs--1 text-dark">250.00</span>
                    </Flex>
                    <Flex justifyContent="between pb-3">
                      <span className="text-dark fw-semi-bold">Tax</span>
                      <span className="fs--1 text-dark">0.00</span>
                    </Flex>
                    <hr />
                    <Flex justifyContent="between pb-2">
                      <span className="text-dark fw-semi-bold">Total Pay</span>
                      <span className="fs--1 text-dark fw-semi-bold">
                        250.0
                      </span>
                    </Flex>
                    <div className="rounded-3 border border-300 p-3 mt-3 text-truncate">
                      <p className="mb-1 text-dark">Pay with crypto</p>
                      <span className="fs--1  " style={{ width: '90px' }}>
                        Pay via Bitcoin, Ethereum and other cryptocurrencies.
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
                    <ChoseNetworkForm
                      activeCoin={formData.coin_id}
                      activeNetwork={formData.network_id}
                      setFormData={setFormData}
                      register={register}
                      errors={errors}
                      watch={watch}
                    />
                  </div>

                  <Button
                    variant="danger"
                    className="ms-auto rounded-4  w-100 px-5 mt-3 py-3"
                    type="submit"
                    transform="down-1 shrink-4"
                    disabled={formData.network_id === undefined}
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
                    <Invoice />
                  </Card.Body>
                </Card>
                <Button className="btn-danger py-3 rounded-4 mx-auto w-100 w-lg-50">
                  Download Invoice
                </Button>
              </Flex>
            )}
          </div>
          <div
            className={classNames('px-lg-6 position-absolute', {
              'd-none': step === 4,
              ' d-none d-lg-flex': step < 4
            })}
            style={{ top: '45%', left: '5%' }}
          >
            <IconButton
              variant="danger"
              icon={isRTL ? 'chevron-right' : 'chevron-left'}
              iconAlign="left"
              transform="down-1 shrink-4"
              className={classNames(
                'px-0 fw-semi-bold rounded-circle px-3 py-2 shadow-sm',
                {
                  'd-none': step === 1
                }
              )}
              onClick={() => {
                setStep(step - 1);
              }}
            />
          </div>
        </Form>
      </Container>
    </>
  );
};

const NavItem = ({ index, step, handleNavs, label }) => {
  return (
    <Nav.Item>
      <Nav.Link
        className={classNames('fw-semi-bold ', {
          done: index < 4 ? step > index : step > 3,
          active: step === index
        })}
      >
        <span className="nav-item-circle-parent ">
          <span
            style={{ borderRadius: '40%' }}
            className="nav-item-circle position-relative"
          >
            {step !== index && <Check />}
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
