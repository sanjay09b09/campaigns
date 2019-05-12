import React, { Component } from 'react'
import moment from 'moment';

class Datepicker extends Component {

    render() {
        return (
            <div>
                <input ref="datepicker" defaultValue={this.props.selecteddate} type="date"></input>
                <button onClick={() => this.props.onsave(moment(this.refs.datepicker.value)._i)}>Save</button>
            </div>
        )
    }
}

export default Datepicker;
