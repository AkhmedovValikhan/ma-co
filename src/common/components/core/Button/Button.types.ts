import { Theme } from '../..';

export interface ButtonProps {
    onClick: () => void | Promise<void>;
    className?: string;
    theme?: Theme;
    fluid: boolean;
    mode?: ButtonMode;
    size?: ButtonSize;
}

export type ButtonMode = 'minimal' | 'normal';
export type ButtonSize = 'sm' | 'md';
