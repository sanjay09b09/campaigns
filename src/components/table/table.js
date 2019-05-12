import React, { Component } from 'react'
import { Table, Modal } from 'react-bootstrap'
import { connect } from 'react-redux';
import { fetchingCampaigns, updateCampaignDate } from './action'
import Datepicker from './datepicker'
import moment from 'moment';
import counterpart from 'counterpart'
import Translate from 'react-translate-component'

counterpart.registerTranslations('en', {
  date :'Date',
  campaign:'Campaign',
  view:'View',
  actions:'Actions',
  chooselanguage:'Choose Language'
})
counterpart.registerTranslations('fr', {
  date :'Rendez-vous amoureux',
  campaign:'Campagne',
  view:'Vue',
  actions:'Actes',
  chooselanguage:'Choisir la langue'
})
class Tablebody extends Component {

  constructor() {
    super()
    this.getDueDate = this.getDueDate.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.activateModal = this.activateModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderModalBody = this.renderModalBody.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.calculateEvents = this.calculateEvents.bind(this);
    this.checkData = this.checkData.bind(this);
    this.state = {
      modalActive: false,
      modalType: null,
      selectedCampaign: []

    }
  }
  componentWillMount() {
    this.props.fetchingCampaigns();
  }
  getDueDate(date) {

    return (
      <div>
        <span>{moment(date).format('YYYY-MMMM-Do')}</span><br></br>
        <span className="text-secondary">{moment(date).fromNow()}</span>
      </div>
    )


  }

  renderModalBody(type, selectedEle) {
    switch (type) {
      case "csv":
        return (<div>We can use https://github.com/react-csv/react-csv</div>)
      case "report":
        return (<div>We can use https://github.com/diegomura/react-pdf</div>)
      case "datepicker":
        const selectedDate = moment(selectedEle[0].dueDate).format('YYYY-MM-DD')
        return (<Datepicker onsave={this.updateDate} selecteddate={selectedDate}></Datepicker>)
    }
  }

  activateModal(type, ele,index) {
    this.setState({ modalActive: true, modalType: type, selectedCampaign: [ele] })

  }
  handleClose() {
    this.setState({ modalActive: false })
  }
  renderModal() {
    return (
      <Modal show={this.state.modalActive} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderModalBody(this.state.modalType, this.state.selectedCampaign)}</Modal.Body>
      </Modal>
    )
  }

  updateDate(date) {
    this.state.selectedCampaign[0].dueDate = moment(date).valueOf()
    this.props.updateCampaignDate({updatedValue:this.state.selectedCampaign[0]});
    this.handleClose()
  }

  checkData(ele, dateMilliseconds, operator) {
    switch (operator) {
      case "<":
        return ele.dueDate < dateMilliseconds
      case ">":
        return ele.dueDate > dateMilliseconds
      case "===":
        return ele.dueDate === dateMilliseconds
    }
  }
  calculateEvents() {
    const date = new Date();
    const dateMilliseconds = date.getTime();
    switch (this.props.activetab) {
      case "Upcoming Campaign":
        return this.props.campaigns && this.props.campaigns.filter((ele) => this.checkData(ele, dateMilliseconds, '>'))
      case "Live Campaign":
        return this.props.campaigns && this.props.campaigns.filter((ele) => this.checkData(ele, dateMilliseconds, '==='))
      case "Past Campaign":
        return this.props.campaigns && this.props.campaigns.filter((ele) => this.checkData(ele, dateMilliseconds, '<'))

    }

  }

  render() {
    moment.locale(this.props.locale)
    const eventsData = this.calculateEvents()
    return (
      <Table  bordered hover>
        {this.renderModal()}
        <thead className="bg-light">
          <tr>
            <th><Translate content="date"></Translate></th>
            <th><Translate content="campaign"></Translate></th>
            <th><Translate content="view"></Translate></th>
            <th><Translate content="actions"></Translate></th>
          </tr>
        </thead>
        <tbody>
          {eventsData && eventsData.map((key,index) => {
            return (
              <tr key={index}>
                <td>{this.getDueDate(key.dueDate)}</td>
                <td><img style={{ "height": "32px" }} src={key.icon}></img>{key.campaignName}</td>
                <td>{key.price} {this.props.locale ==='en'? '$' : '€'}</td>
                <td>
                  <span onClick={() => this.activateModal("csv", key,index)}><img style={{ "height": "32px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6y3qmTD_DonKHvCRgaOm_Q5u6ZNDOXV_WbMM3SHtTiZdGgIC9"></img></span>
                  <span onClick={() => this.activateModal("report", key,index)}><img style={{ "height": "32px", "marginLeft": "10px" }} src="https://cdn0.iconfinder.com/data/icons/ie_ICandies/64/button_34.png"></img></span>
                  <span className="justify-content-end" onClick={() => this.activateModal("datepicker", key,index)}><img style={{ "height": "32px", "marginLeft": "10px" }} src="https://cdn4.iconfinder.com/data/icons/brainy-icons-free-36-science-and-education-icons/64/calendar_64.png"></img></span>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    campaigns: state.campaignreducer.campaigns,
    activetab: state.campaignreducer.activetab,
    locale:state.campaignreducer.locale
  };
};

export default connect(mapStateToProps, { fetchingCampaigns, updateCampaignDate })(Tablebody);

