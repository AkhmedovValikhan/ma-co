import React from 'react';
import { LITERALS } from '../../../../literals';
import { Icon } from '../../core';
import './Footer.scss';
import { FOOTER_ICON } from './icons';

export class Footer extends React.PureComponent<{}, {}> {
    public render() {
        return <footer className='footer d-none d-sm-flex'>
            <div className='container'>
                <div className='row' style={{ alignItems: 'center' }}>
                    <div className='col-sm-6'>
                        <Icon className='footer__icon' inline={FOOTER_ICON} />
                    </div>
                    <div className='col-sm-6'>
                        <p className='footer__copy'>{LITERALS.FOOTER__COPYRIGHT}</p>
                    </div>
                </div>
            </div>
        </footer>;
    }
}
