export const formatCreditCard = (cardNum: string): string => {
    if (!cardNum || !cardNum.length) { return cardNum; }
    return cardNum.split('').map((dig, ind) => (ind && (ind % 4 === 0)) ? ` ${dig}` : dig).join('');
};

export const formatPrice = (price: number, currency: string) => {
    return `${price.toFixed(2)} ${currency}`;
};
