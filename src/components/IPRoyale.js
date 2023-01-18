import React from 'react';
import AuthWizardProvider from './wizard/AuthWizardProvider';
import IpWizardLayout from './ip-royal/IpWizard';

const IPRoyale = () => {
  return (
    <AuthWizardProvider>
      <IpWizardLayout />
    </AuthWizardProvider>
  );
};

export default IPRoyale;
