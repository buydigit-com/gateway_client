import React from 'react';
import AuthWizardProvider from './wizard/AuthWizardProvider';
import IpWizardLayout from './ip-royal/IpWizard';
import Prova from './Prova';
import {
  WebSocketProvider
} from './ip-royal/provider/WebSocketProvider';
import {
  TxnDataProvider
} from './ip-royal/provider/TxnDataProvider';
import {
  ShopThemeProvider
} from './ip-royal/provider/ShopThemeProvider';
import {
  NavStepProvider
} from './ip-royal/provider/NavStepProvider';

import NavbarTop from 'components/navbar/top/NavbarTop';
import Footer from 'components/footer/Footer';

const Gateway = () => {
  return (
    <WebSocketProvider>
      <TxnDataProvider>
        <ShopThemeProvider>
          <NavStepProvider>
            <NavbarTop />
            <IpWizardLayout />
            <Footer />
          </NavStepProvider>
        </ShopThemeProvider>
      </TxnDataProvider>
    </WebSocketProvider>
  );
};

export default Gateway;
