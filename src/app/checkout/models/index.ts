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
