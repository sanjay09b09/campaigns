import React, { Component } from 'react'
import moment from 'moment';

class Datepicker extends Component {
    constructor() {
        super()
        this.someFunction = this.someFunction.bind(this)
    }
    someFunction(reff) {
    }
    render() {
        return (
            <div>
                <input ref="datepicker" value={this.props.selecteddate} onChange={() => this.someFunction(this.refs.datepicker)} type="date"></input>
                <button onClick={() => this.props.onsave(moment(this.refs.datepicker.value)._i)}>Save</button>
            </div>
        )
    }
}

export default Datepicker;
