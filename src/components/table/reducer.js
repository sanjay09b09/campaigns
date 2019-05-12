const initialState = {
    activetab: 'Upcoming Campaign',
    locale:'en'
}

const campaignreducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CAMPAIGNS":
            return {
                ...state,
                campaigns: action.data
            }
        case "ACTIVE_CAMPAIGN":
            return {
                ...state,
                activetab: action.data
            }
        case "SET_LOCALE":
            return {
                ...state,
                locale: action.data
            }
            case "UPDATE_CAMPAIGN":
                const indexValue=state.campaigns.findIndex((ele)=>{
                    return action.data.updatedValue.id == ele.id
                })
            return {
                ...state,
                campaigns:[...state.campaigns.slice(0,indexValue),action.data.updatedValue, ...state.campaigns.slice(indexValue+1)]
            }
        default:
            return state;
    }


}

export default campaignreducer;