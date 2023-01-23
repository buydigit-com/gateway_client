import React, { useContext } from 'react';
import { TxnDataContext } from './TxnDataProvider';

const ShopThemeContext = React.createContext();

const ShopThemeProvider = ({ children }) => {

  const txnData = useContext(TxnDataContext);

  let shopTheme = {
    available: false,
    theme: {}
  };

  if (Object.keys(txnData.shop.theme_customization).length != 0) {
    console.log(
      'txnData.shop.theme_customization',
      txnData.shop.theme_customization
    );
    
    shopTheme = {
      available: true,
      theme: {
        button: {
          '--falcon-btn-disabled-bg': txnData.shop.theme_customization.primary,
          '--falcon-btn-border-color': txnData.shop.theme_customization.primary,
          '--falcon-btn-bg': txnData.shop.theme_customization.primary,
          '--falcon-btn-hover-bg': "#c89516",
          '--falcon-btn-hover-color':
            txnData.shop.theme_customization.primary_text,
          '--falcon-btn-color': txnData.shop.theme_customization.primary_text,
          '--falcon-btn-disabled-color':
            txnData.shop.theme_customization.primary_text,
          '--falcon-btn-disabled-border-color':
            txnData.shop.theme_customization.primary,
          '--falcon-btn-hover-border-color':
            txnData.shop.theme_customization.primary,
          '--falcon-btn-focus-shadow-rgb': '241,93,84',
          '--falcon-btn-active-color':
            txnData.shop.theme_customization.primary_text,
          '--falcon-btn-active-bg': txnData.shop.theme_customization.primary,
          '--falcon-btn-active-border-color':
            txnData.shop.theme_customization.primary,
          'hover': "opacity: 0.8"
        },
        text: {
          '--falcon-danger-rgb': '254,181,0'
        },
        nav: {
          '--falcon-danger': txnData.shop.theme_customization.primary
        }
      }
    };
  }

  return (
    <ShopThemeContext.Provider value={shopTheme}>
      {children}
    </ShopThemeContext.Provider>
  );
};

export { ShopThemeContext, ShopThemeProvider };
