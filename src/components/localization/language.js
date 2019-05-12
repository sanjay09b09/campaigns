import  React,{Component} from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {setLocale} from '../table/action'
import {connect} from 'react-redux'
import counterpart from 'counterpart'
import Translate from 'react-translate-component'
class Languagebtn extends Component {
    constructor(){
        super()
        this.changeLocale = this.changeLocale.bind(this);
        this.state={
            locale:'en'
        }
    }
    changeLocale(locale) {
        this.props.setLocale(locale);
        counterpart.setLocale(locale)
    }
    render(){
        return (
            <Translate 
  component={DropdownButton}
  attributes={{ title: "chooselanguage" }}>
            <Dropdown.Item className={this.props.locale ==='en' ? 'active': null}  onClick={()=>this.changeLocale('en')}>English</Dropdown.Item>
            <Dropdown.Item  className={this.props.locale ==='fr' ? 'active': null} onClick={()=>this.changeLocale('fr')}>French</Dropdown.Item>
          </Translate>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        locale: state.campaignreducer.locale
    };
};

export default connect(mapStateToProps,{setLocale})(Languagebtn);
