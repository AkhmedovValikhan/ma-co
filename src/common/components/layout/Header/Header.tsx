import React from "react";
import './Header.scss';
import { LITERALS } from "../../../../literals";
import { Icon } from "../../core";
import { HEADER_ICON, PHONE_ICON } from "./icons";
import { HeaderProps } from "./Header.types";

export class Header extends React.PureComponent<HeaderProps, {}> {
    private renderHelp() {
        return <a href={`tel:${this.props.phone}`} className='header__help'>
            <Icon className='header__help-icon' inline={PHONE_ICON} />
            <span className='d-none d-sm-block'>{LITERALS.HEADER__NEED_HELP}</span>
            <span className='header__help-phone d-none d-sm-block'>{this.props.phone}</span>
        </a>;
    }

    public render() {
        return <header className='header'>
            <div className='container header__container'>
                <Icon className='header__logo' inline={HEADER_ICON} />
                {this.renderHelp()}
            </div>
        </header>;
    }
}