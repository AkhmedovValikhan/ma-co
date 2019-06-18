import { Theme } from '../..';

export interface RadioProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    theme?: Theme;
}
