import React from 'react';
import { TxnDataContext } from './ip-royal/provider/TxnDataProvider';
import { ShopThemeContext } from './ip-royal/provider/ShopThemeProvider';

const Gateway = () => {

  const txnData = React.useContext(TxnDataContext);
  const shopTheme = React.useContext(ShopThemeContext);
  console.log(shopTheme);
  return (
    <>
      <h1>prova</h1>
      <h1>{txnData.deposit.status}</h1>
      <h1>{shopTheme.available ? "theme available" : "no"}</h1>
    </>
  );
};

export default Gateway;
