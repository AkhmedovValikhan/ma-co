import React from 'react';
import { createInitialState } from '../../../common/components/forms/abstract';
import { LITERALS } from '../../../literals';
import { OrderSummaryInfoModel } from '../models';
import { formatPrice } from '../utils/CheckoutUtils';
import { DescriptionList, DescriptionListItem } from './DescriptionList';
import './OrderSummary.scss';

export interface OrderSummaryProps {
    info: OrderSummaryInfoModel;
}

export class OrderSummary extends React.PureComponent<OrderSummaryProps, {}> {
    constructor(props: OrderSummaryProps) {
        super(props);

        this.state = {
            confirmed: createInitialState(false),
        };
    }

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

    public render() {
        return <div>
            <h3>{LITERALS.CHECKOUT__ORDER_SUMMARY}</h3>
            {this.renderDescription()}
        </div>;
    }
}
