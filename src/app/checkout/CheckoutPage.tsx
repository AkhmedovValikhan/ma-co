import React, { Fragment } from 'react';
import { Button, Icon } from '../../common/components/core';
import { Checkbox, Radio } from '../../common/components/forms';
import { createInitialState, FieldState } from '../../common/components/forms/abstract';
import { Page } from '../../common/components/layout/Page';
import { LITERALS } from '../../literals';
import './CheckoutPage.scss';
import { createCreditCartState, CreditCardFormState, extractCardInfo, isCreditCardStateValid, setDisabledState } from './CreditCardInput';
import { CreditCardForm } from './CreditCardInput/CreditCardForm';
import { MASTERCARD_ICON, PLUS_ICON, VISA_ICON } from './icons';
import { CheckoutModel, OrderSummaryInfoModel, PaymentMethod } from './models';
import { OrderSummary } from './OrderSummary/OrderSummary';

interface CheckoutState {
    paymentMethod: PaymentMethod;
    cardNumber: FieldState<string>;
    creditCardState: CreditCardFormState;
    confirmed: FieldState<boolean>;
    saveDetail: boolean;
    discountCode: string;
}

export interface CheckoutPageProps {
    onCompletePayment: (model: CheckoutModel) => void;
    orderSummaryInfo: OrderSummaryInfoModel;
}

export class CheckoutPage extends React.PureComponent<CheckoutPageProps, CheckoutState> {
    constructor(props: CheckoutPageProps) {
        super(props);

        this.state = {
            paymentMethod: PaymentMethod.Card,
            confirmed: createInitialState(false),
            cardNumber: createInitialState(''),
            creditCardState: createCreditCartState(),
            saveDetail: false,
            discountCode: '',
        };
    }

    private onCardStateChange = (creditCardState: CreditCardFormState) => this.setState({ creditCardState });
    private onConfirmedChange = (confirmed: FieldState<boolean>) => this.setState({ confirmed });

    private shouldDisableCompletePayment = () => {
        const { confirmed, creditCardState, paymentMethod } = this.state;
        if (!confirmed.value) { return true; }
        const isCardValid = isCreditCardStateValid(creditCardState) || paymentMethod === PaymentMethod.Cash;
        if (!isCardValid) { return true; }
        return false;
    }
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

    private onCompletePayment = () => {
        const cardInfo = extractCardInfo(this.state.creditCardState)!;
        const { paymentMethod, discountCode, confirmed } = this.state;
        this.props.onCompletePayment({
            cardInfo,
            discountCode,
            paymentMethod,
            termsAgreed: confirmed.value,
        });
    }

    private renderPaymentSelection() {
        return <Fragment>
            <h1>{LITERALS.CHECKOUT__PAYMENT_SELECTION}</h1>
            <div>
                <div className='checkout-page__method-header'>
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
            <Button mode='minimal' size='sm'>
                <Icon className='checkout-page__code-btn-icon' inline={PLUS_ICON} />
                {LITERALS.CHECKOUT__APPLY_DISCOUNT_CODE}
            </Button>
        </Fragment>;
    }

    private renderActions() {
        return <Fragment>
            <Button
                onClick={this.onCompletePayment}
                className='summary__complete-btn'
                fluid
                disabled={this.shouldDisableCompletePayment()}
            >
                {LITERALS.CHECKOUT__COMPLETE_PAYMENT}
            </Button>
            <Checkbox state={this.state.confirmed} onChange={this.onConfirmedChange} label={LITERALS.CHECKOUT__TERMS_TEXT} />
        </Fragment>;
    }

    public render() {
        return <Page className='checkout-page'>
            <div className='checkout-page__payment-container col-md-6 col-xs-12'>
                {this.renderPaymentSelection()}
            </div>
            <div className='checkout-page__summary-container col-md-4'>
                <OrderSummary info={this.props.orderSummaryInfo} />
                {this.renderActions()}
            </div>
        </Page>;
    }
}
