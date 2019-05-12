const initialState = {
    campaigns: [],
    activetab: 'Upcoming Campaign'
}

const campaignreducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CAMPAIGNS":
            return {
                ...state,
                campaigns: [action.data]
            }
        case "ACTIVE_CAMPAIGN":
            return {
                ...state,
                activetab: action.data
            }
        default:
            return state;
    }


}

export default campaignreducer;