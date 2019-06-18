import React, { Fragment } from 'react';
import { Button, Icon } from '../../common/components/core';
import { Radio } from '../../common/components/forms';
import { createInitialState, FieldState } from '../../common/components/forms/abstract';
import { Page } from '../../common/components/layout/Page';
import { LITERALS } from '../../literals';
import './CheckoutPage.scss';
import { createCreditCartState, CreditCardFormState, setDisabledState } from './CreditCardInput';
import { CreditCardForm } from './CreditCardInput/CreaditCardForm';
import { MASTERCARD_ICON, VISA_ICON } from './icons';
import { CardDetails, PaymentMethod } from './models';
import { OrderSummary, OrderSummaryProps } from './OrderSummary/OrderSummary';

interface CheckoutState {
    cardDetails: CardDetails;
    paymentMethod: PaymentMethod;
    cardNumber: FieldState<string>;
    creditCardState: CreditCardFormState;
    saveDetail: boolean;
}

export class CheckoutPage extends React.PureComponent<{}, CheckoutState> {
    constructor() {
        super({});

        this.state = {
            paymentMethod: PaymentMethod.Card,
            cardNumber: createInitialState(''),
            cardDetails: {
                cardNumber: '',
                cvn: '',
                expirationMonth: 22,
                expirationYear: 2222,
            },
            creditCardState: createCreditCartState(),
            saveDetail: false,
        };
    }

    private onCardStateChange = (creditCardState: CreditCardFormState) => this.setState({ creditCardState });

    private renderCardForm() {
        return <div className='checkout-page__cc-container'>
            <CreditCardForm state={this.state.creditCardState} onChange={this.onCardStateChange} />
        </div>;
    }

    private togglePaymentMethod = () => {
        const paymentMethod = this.state.paymentMethod === PaymentMethod.Cash ? PaymentMethod.Card : PaymentMethod.Cash;
        this.setState({
            paymentMethod,
            creditCardState: setDisabledState(this.state.creditCardState, paymentMethod === PaymentMethod.Cash), // this is a bit ugly
        });
    }

    private renderPaymentSelection() {
        return <Fragment>
            <h1>{LITERALS.CHECKOUT__PAYMENT_SELECTION}</h1>
            <div>
                <div className='payment__method-header'>
                    <Radio
                        checked={this.state.paymentMethod === PaymentMethod.Card}
                        onChange={this.togglePaymentMethod}
                        label={LITERALS.CHECKOUT__CREDIT_DEBIT_CARD}
                    />
                    <div>
                        <Icon inline={VISA_ICON} />
                        <Icon inline={MASTERCARD_ICON} />
                    </div>
                </div>
                {this.renderCardForm()}
            </div>
            <div>
                <div className='payment__method-header'>
                    <Radio
                        checked={this.state.paymentMethod === PaymentMethod.Cash}
                        onChange={this.togglePaymentMethod}
                        label={LITERALS.CHECKOUT__CASH_ON_DELIVERY}
                    />
                </div>
            </div>
            <hr />
            <Button mode='minimal' size='sm'>{LITERALS.CHECKOUT__APPLY_DISCOUNT_CODE}</Button>
            <div />
        </Fragment>;
    }

    public render() {
        return <Page className='checkout-page'>
            <div className='payment col-md-6 col-xs-12'>
                {this.renderPaymentSelection()}
            </div>
            <div className='checkout-page__summary-container col-md-4'>
                <OrderSummary info={MOCK_SUMMARY} />
            </div>
        </Page>;
    }
}

const MOCK_SUMMARY: OrderSummaryProps['info'] = {
    currency: 'AED',
    shoppingItems: 7,
    discount: 69,
    shopping: 869,
};
