import React, { useContext } from "react";
import Loading from "../Loading";
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
    return <Loading init={true} />
  }

  return (
    <TxnDataContext.Provider value={txnData}>
      {children}
    </TxnDataContext.Provider>
  );
};

export { TxnDataContext, TxnDataProvider };
