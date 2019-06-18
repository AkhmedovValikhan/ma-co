import React, { Fragment } from "react";
import { Button } from "../../../common/components/core";
import { LITERALS } from "../../../literals";
import { Checkbox } from "../../../common/components/forms";
import { formatPrice } from "../utils/CheckoutUtils";
import './OrderSummary.scss';
import { DescriptionListItem, DescriptionList } from "./DescriptionList";
import { FieldState, createInitialState } from "../../../common/components/forms/abstract";

interface OrderSummaryState {
    confirmed: FieldState<boolean>;
}

export interface OrderSummaryProps {
    info: OrderSummaryInfo;
}

export interface OrderSummaryInfo {
    shopping: number;
    shoppingItems: number;
    discount: number;
    deliveryFee?: number;
    currency: string;
}

export class OrderSummary extends React.PureComponent<OrderSummaryProps, OrderSummaryState> {
    constructor(props: OrderSummaryProps) {
        super(props);

        this.state = {
            confirmed: createInitialState(false),
        };
    }


    private onConfirmedChange = (confirmed: FieldState<boolean>) => this.setState({ confirmed });
    private renderDescription() {
        const { currency, deliveryFee, discount, shopping, shoppingItems } = this.props.info;
        const items: DescriptionListItem[] = [
            {
                title: LITERALS.CHECKOUT__SHOPPING,
                extra: ` (${shoppingItems} items)`,
                value: formatPrice(shopping, currency),
            },
            {
                title: LITERALS.CHECKOUT__DISCOUNT,
                value: formatPrice(-discount, currency),
                theme: 'danger',
            },
            {
                title: LITERALS.CHECKOUT__DELIVERY_FEE,
                value: deliveryFee ? formatPrice(deliveryFee, currency) : LITERALS.CHECKOUT__FREE,
            },
        ];
        const total: DescriptionListItem = {
            title: LITERALS.CHECKOUT__TOTAL_INC_VAT,
            value: formatPrice(shopping - discount, currency),
        };
        return <DescriptionList
            items={items}
            total={total}
        />;
    }

    private renderActions() {
        return <Fragment>
            <Button className='summary__complete-btn' fluid>{LITERALS.CHECKOUT__COMPLETE_PAYMENT}</Button>
            <Checkbox state={this.state.confirmed} onChange={this.onConfirmedChange} label={LITERALS.CHECKOUT__TERMS_TEXT} />
        </Fragment>;
    }

    public render() {
        return <div>
            <h3>{LITERALS.CHECKOUT__ORDER_SUMMARY}</h3>
            {this.renderDescription()}
            {this.renderActions()}
        </div>;
    }
}
