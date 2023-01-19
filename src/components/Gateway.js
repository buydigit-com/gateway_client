import React from 'react';
import AuthWizardProvider from './wizard/AuthWizardProvider';
import IpWizardLayout from './ip-royal/IpWizard';

const Gateway = () => {
  return (
    <AuthWizardProvider>
      <IpWizardLayout />
    </AuthWizardProvider>
  );
};

export default Gateway;
