import * as React from 'react';
import './App.scss';

import { Footer, Header } from '../../common/components/layout';
import { CheckoutPage } from '../checkout';
import { PHONE_NUMBER } from '../../constants';

interface State {
}

export class App extends React.PureComponent<{}, State> {
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
