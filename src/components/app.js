import  React,{Component} from 'react'
import Tabs from './table/tabs'
import Tablebody from './table/table'
import Store from '../configs/storeconfig'
import {Provider} from 'react-redux';
import {Container} from 'react-bootstrap'

class App extends Component {
    render(){
        return (
            <Provider store={Store}>
            <Container>
            <Tabs {...this.props}></Tabs>
            <Tablebody {...this.props}></Tablebody>
            </Container>
            </Provider>
        )
    }
}

export default App;
