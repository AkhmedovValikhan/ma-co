import * as React from 'react';
import './App.scss';

import { Footer, Header } from '../../common/components/layout';
import { PHONE_NUMBER } from '../../constants';
import { CheckoutPage } from '../checkout';

export class App extends React.PureComponent<{}, {}> {
    constructor() {
        super({});

        this.state = {};
    }

    private renderBody() {
        return <CheckoutPage />;
    }

    public render() {
        return (
            <React.Fragment>
                <Header phone={PHONE_NUMBER} />
                {this.renderBody()}
                <Footer />
            </React.Fragment>
        );
    }

}
