import React, { useContext } from 'react';
import { TxnDataContext } from './TxnDataProvider';

const NavStepContext = React.createContext();

const NavStepProvider = ({ children }) => {

  const txnData = useContext(TxnDataContext);
  const [step, setStep] = React.useState(1);
  const [availableStep, setAvailableStep] = React.useState({
    "min": 1,
    "max": 4,
  });

  const value = { step, setStep, availableStep, setAvailableStep };

  React.useEffect(() => {
    if (txnData == undefined) {
      return;
    }

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

  React.useEffect(() => {
    if (step < availableStep.min) {
      console.log("step < availableStep.min", step, availableStep.min);
      setStep(availableStep.min);
    }
  }, [availableStep]);

  return (
    <NavStepContext.Provider value={value}>
      {children}
    </NavStepContext.Provider>
  );
};

export { NavStepContext, NavStepProvider };
