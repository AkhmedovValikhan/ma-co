// import React, { Fragment } from 'react';
// import { Checkbox, FormField, Input } from '../../../common/components/forms';
// import { LITERALS } from '../../../literals';
// import { Radio } from '../../../common/components/forms/Radio/Radio';
// import { PaymentMethod } from '../models';
// import './Payment.scss';
// import { Button } from '../../../common/components/core';
// import { createInitialState, FieldState } from '../../../common/components/forms/abstract';
// import { formatCreditCard } from '../utils/CheckoutUtils';
// import { Form } from '../../../common/components/forms/Form';

// interface PaymentSelectionProsp {
//     method: PaymentMethod;

// }

// interface PaymentSelectionState {
//     cardNumber: FieldState<string>;
// }

// interface CardDetailsForm {
//     number: string;
//     cvn: string;
// }

// export class PaymentSelection extends React.PureComponent<PaymentSelectionProsp, PaymentSelectionState> {

//     constructor(props: PaymentSelectionProsp) {
//         super(props);

//         this.state = {
//             cardNumber: createInitialState(''),
//         };
//     }

//     private renderCardForm() {
//         return <div>
//             <div>
//                 <FormField label={LITERALS.CHECKOUT__CARD_LABEL} >
//                     <Input state={this.state.cardNumber} onChange={s => this.setState({ cardNumber: s })} formatter={formatCreditCard} />
//                 </FormField>
//             </div>
//             <div>
//                 <FormField label={LITERALS.CHECKOUT__EXPIRATION_LABEL} >
//                     <Input state={createInitialState('df')} />
//                 </FormField>
//                 <FormField label={LITERALS.CHECKOUT__CVN_LABEL} >
//                     <Input state={createInitialState('df')} />
//                 </FormField>
//             </div>
//             <Checkbox label={LITERALS.CHECKOUT__SAVE_CARD_DETAILS_LABEL} />
//         </div>;
//     }

//     private renderCardOption() {
//         return <Form<CardDetailsForm> initialValues={{ cvn: '', number: '' }} render={this.renderCardForm} />;
//     }

//     public render() {
//         return <Fragment>
//             <h1>{LITERALS.CHECKOUT__PAYMENT_SELECTION}</h1>
//             <div>
//                 <div className='payment__method-header'>
//                     <Radio />
//                     {LITERALS.CHECKOUT__CREDIT_DEBIT_CARD}
//                 </div>

//                 {this.renderCardOption()}
//             </div>
//             <div>
//                 <div className='payment__method-header'>
//                     <Radio checked={this.props.method === PaymentMethod.Cash} onChange={}/>
//                     {LITERALS.CHECKOUT__CASH_ON_DELIVERY}
//                 </div>
//             </div>
//             <hr />
//             <Button>{LITERALS.CHECKOUT__APPLY_DISCOUNT_CODE}</Button>
//             <div />
//         </Fragment>;
//     }
// }
