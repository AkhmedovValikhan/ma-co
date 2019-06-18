import { Theme } from '../..';
import { FieldState } from '../abstract';

export interface CheckboxProps {
    onChange: (state: FieldState<boolean>) => void;
    label: string;
    theme?: Theme;
    state: FieldState<boolean>;
}
