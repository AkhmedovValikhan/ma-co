import { CleaveOptions } from 'cleave.js/options';
import { InputFormatter } from '..';
import { FieldState, Validator } from '../abstract';

export interface InputProps {
    className?: string;
    fluid?: boolean;
    state: FieldState<string>;
    formatter?: InputFormatter;
    maxLength?: number;
    cleaveOptions?: CleaveOptions;
    validator?: Validator<string>;

    onChange?: (state: FieldState<string>) => void;
}
