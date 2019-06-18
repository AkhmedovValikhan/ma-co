import { Theme } from "../..";

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    theme?: Theme;
};
