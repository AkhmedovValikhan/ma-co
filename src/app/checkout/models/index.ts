import { CreditCardInfo } from "../CreditCardInput";

export interface CardDetails {
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    cvn: string;
}

export enum PaymentMethod {
    Card,
    Cash,
}

export interface CheckoutModel {
    cardInfo: CreditCardInfo;
    paymentMethod: PaymentMethod;
    termsAgreed: boolean;
    discountCode?: string;
}

export interface OrderSummaryInfoModel {
    shopping: number;
    shoppingItems: number;
    discount: number;
    deliveryFee?: number;
    currency: string;
}
