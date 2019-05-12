import React, { Component } from 'react'
import { Nav, Row, Col } from 'react-bootstrap'
import { updateActiveCampaign } from './action'
import { connect } from 'react-redux';

class Tabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabNames: [{
                "name": "Upcoming Campaign"
            }, {
                "name": "Live Campaign"
            }, {
                "name": "Past Campaign"
            }]
        }
    }

    componentWillMount() {
        this.props.updateActiveCampaign('Upcoming Campaign');
    }
    handleSelect(eventKey) {
        this.props.updateActiveCampaign(eventKey);
    }

    render() {
        return (
            <Row>


                <Nav variant="pills" activeKey={this.props.activetab} onSelect={k => this.handleSelect(k)}>
                    {this.state.tabNames.map((key, index) => {
                        return (
                            <Col sm="auto" key={index}>
                                <Nav.Item index={index} className="bg-secondary" >
                                    <Nav.Link eventKey={key.name} className="text-white">
                                        {key.name}
                                    </Nav.Link>
                                </Nav.Item>
                            </Col>
                        )

                    })}
                </Nav>
            </Row>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        activetab: state.campaignreducer.activetab
    };
};
export default connect(mapStateToProps, { updateActiveCampaign })(Tabs);
