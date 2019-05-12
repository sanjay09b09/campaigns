import React, { Component } from 'react'
import Tabs from './table/tabs'
import Tablebody from './table/table'
import Languagebtn from './localization/language'
import Store from '../configs/storeconfig'
import { Provider } from 'react-redux';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap'

class App extends Component {
    render() {
        console.log('%c Could not do Css. used react- bootstrap.;) ', 'background: #222; color: #bada55');
        return (
            <Provider store={Store}>
                <Container>
                    <div className="row">
                        <div className="col">
                            <Tabs {...this.props}></Tabs>
                        </div>
                        <div className="col">
                            <Languagebtn></Languagebtn>
                        </div>
                    </div>
                    <Tablebody {...this.props}></Tablebody>
                </Container>
            </Provider>
        )
    }
}

export default App;
