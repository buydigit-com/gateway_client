import Flex from 'components/common/Flex';
import React from 'react';

const Invoice = () => {
  return (
    <Flex direction="column" className="py-3 cursor-pointer">
      <h5 className="text-danger fw-bold text-center fs-2 mb-6">IpRoyal</h5>
      <h5 className="fw-semi-bold text-dark fs-2 mb-3">Invoice</h5>
      <Flex justifyContent="between">
        <p className="text-start text-dark fw-semi-bold mb-1 pb-1">Order ID</p>
        <p className="text-end text-dark">#4545114</p>
      </Flex>
      <Flex justifyContent="between" className="mb-2">
        <p className="text-start text-dark fw-semi-bold">Store Name</p>
        <p className="text-end text-dark">Franklin Decor</p>
      </Flex>
      <Flex justifyContent="between">
        <p className="text-start text-dark fw-semi-bold">Amount</p>
        <p className="text-end text-dark">250.00</p>
      </Flex>
      <Flex justifyContent="between">
        <p className="text-start text-dark fw-semi-bold">Tax</p>
        <p className="text-end text-dark">0.00</p>
      </Flex>
      <hr />
      <Flex justifyContent="between" className="mb-2">
        <p className="text-start text-dark fw-semi-bold">
          Order Amount in BTC:
        </p>
        <p className="text-end text-dark">0.00078564 BTC</p>
      </Flex>
      <Flex justifyContent="between" className="mb-2">
        <p className="text-start text-dark fw-semi-bold">Invoice Paid Time:</p>
        <p className="text-end text-dark">2023-01-15 14:07 UTC</p>
      </Flex>
    </Flex>
  );
};

export default Invoice;
