import classNames from 'classnames';
import Cleave from 'cleave.js';
import Tooltip from 'rc-tooltip';
import * as React from 'react';
import { Icon } from '../../core/Icon';
import { CHECK_ICON, ERROR_ICON } from './icons';
import './Input.scss';
import { InputProps } from './Input.types';
interface State {
    errorMessages: string[];
}

export class Input extends React.PureComponent<InputProps, State> {
    private _cleave?: Cleave;
    private _inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props: InputProps) {
        super(props);

        this.state = {
            errorMessages: [],
        };
    }

    private onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (this._cleave) {
            value = this._cleave.getRawValue();
        }
        let isValid = true;
        if (this.props.validator) {
            const validationResult = this.props.validator(value);
            isValid = !validationResult;
            if (validationResult) {
                this.setState({ errorMessages: [validationResult.message] });
            }
        }
        if (this.props.onChange) {
            this.props.onChange({ ...this.props.state, value, valid: isValid, dirty: true });
        }
    }

    public componentDidMount() {
        if (this.props.cleaveOptions) {
            this._cleave = new Cleave(this._inputRef.current!, this.props.cleaveOptions);
        }
    }

    public componentDidUpdate() {
        if (this._cleave) {
            this._cleave.setRawValue(this.props.state.value);
        }
    }

    private renderStatus(): React.ReactNode {
        const { dirty, disabled, valid } = this.props.state;
        if (!dirty || disabled) { return null; }
        return <Tooltip visible={!valid} placement={'top'} overlay={this.state.errorMessages[0]}>
            <Icon className='input__status-icon' inline={valid ? CHECK_ICON : ERROR_ICON} />
        </Tooltip>;
    }

    public render() {
        let value = this.props.state.value;
        if (this.props.formatter) {
            value = this.props.formatter(value);
        }
        const { disabled, valid } = this.props.state;
        const classes = classNames({
            'input': true,
            'input--fluid': this.props.fluid,
            'input--disabled': disabled,
            'input--invalid': !valid && !disabled,
        });
        const className = `${classes} ${this.props.className ? this.props.className : ''}`;
        return <React.Fragment>
            <div className='input__container'>
                <input
                    disabled={disabled}
                    ref={this._inputRef}
                    autoComplete='off'
                    formNoValidate
                    value={value}
                    className={className}
                    onInput={this.onInput}
                />
                {this.renderStatus()}
            </div>
        </React.Fragment>;
    }
}
