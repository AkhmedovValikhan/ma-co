import React from 'react';
import { CreditCardFormState } from '.';
import { FormField, Input, Checkbox } from '../../../common/components/forms';
import { FieldState } from '../../../common/components/forms/abstract';
import { LITERALS } from '../../../literals';
import { EXPIRY_DATE_CLEAVE, CC_CLEAVE, CVN_VALIDATOR, EXPIRY_DATE_VALIDATE, CREDIT_CARD_VALIDATOR } from './CreditCardForm.aux';

export interface CreditCardFormProps {
    state: CreditCardFormState;
    onChange: (state: CreditCardFormState) => void;
}

interface State {
    cardNumberState: FieldState<string>;
    expirationState: FieldState<string>;
    cvnState: FieldState<string>;
    saveState: FieldState<boolean>;
}

export class CreditCardForm extends React.PureComponent<CreditCardFormProps, State> {

    private onNumberChange = (state: FieldState<string>) => {
        this.props.onChange({ ...this.props.state, cardNumberState: state });
    }

    private onExpirationChange = (state: FieldState<string>) => {
        this.props.onChange({ ...this.props.state, expirationState: state });
    }

    private onSaveDetailsChange = (state: FieldState<boolean>) => {
        this.props.onChange({ ...this.props.state, saveDetails: state });
    }

    private onCvnChange = (state: FieldState<string>) => {
        this.props.onChange({ ...this.props.state, cvnState: state });
    }

    public render() {
        return <div className='cc-form'>
            <div className='row'>
                <div className='col'>
                    <FormField label={LITERALS.CHECKOUT__CARD_LABEL} >
                        <Input
                            state={this.props.state.cardNumberState}
                            onChange={this.onNumberChange}
                            cleaveOptions={CC_CLEAVE}
                            validator={CREDIT_CARD_VALIDATOR}
                        />
                    </FormField>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <FormField label={LITERALS.CHECKOUT__EXPIRATION_LABEL} >
                        <Input
                            state={this.props.state.expirationState}
                            onChange={this.onExpirationChange}
                            cleaveOptions={EXPIRY_DATE_CLEAVE}
                            validator={EXPIRY_DATE_VALIDATE}
                        />
                    </FormField>
                </div>
                <div className='col'>
                    <FormField label={LITERALS.CHECKOUT__CVN_LABEL}>
                        <Input
                            validator={CVN_VALIDATOR}
                            state={this.props.state.cvnState}
                            onChange={this.onCvnChange}
                        />
                    </FormField>
                </div>
            </div>
            <Checkbox state={this.props.state.saveDetails} onChange={this.onSaveDetailsChange} label={LITERALS.CHECKOUT__SAVE_CARD_DETAILS_LABEL} />
        </div>;
    }
}

