import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthWizardContext } from 'context/Context';
import Loading from '../ip-royal/Loading';
const AuthWizardProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [step, setStep] = useState(1);
  const loading = false;

  const value = { user, setUser, step, setStep };
  return (
    <AuthWizardContext.Provider value={value}>
      {loading && <Loading />}
      {!loading && children}
    </AuthWizardContext.Provider>
  );
};

AuthWizardProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthWizardProvider;
