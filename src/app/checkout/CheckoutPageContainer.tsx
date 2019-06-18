import React from 'react';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutModel, OrderSummaryInfoModel } from './models';

// tslint:disable-next-line:variable-name
export const CheckoutPageContainer = () => {
    return <CheckoutPage onCompletePayment={mockHandlePayment} orderSummaryInfo={MOCK_SUMMARY} />;
};

const mockHandlePayment = (checkoutModel: CheckoutModel) => {
    alert(JSON.stringify(checkoutModel));
};

const MOCK_SUMMARY: OrderSummaryInfoModel = {
    currency: 'AED',
    shoppingItems: 7,
    discount: 69,
    shopping: 869,
};
