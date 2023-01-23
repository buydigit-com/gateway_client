import React, { useContext } from "react";
import { WebSocketContext } from "./WebSocketProvider";

const TxnDataContext = React.createContext();

const TxnDataProvider = ({ children }) => {

  const {socket,txnHash} = useContext(WebSocketContext);
  const [txnData, setTxnData] = React.useState(undefined);

  React.useEffect(() => {

    socket.on(txnHash, (data) => {
      setTxnData(JSON.parse(data));
    });

    return () => socket.close();
  }, []);

  if (txnData === undefined) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TxnDataContext.Provider value={txnData}>
      {children}
    </TxnDataContext.Provider>
  );
};

export { TxnDataContext, TxnDataProvider };
