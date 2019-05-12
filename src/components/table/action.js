export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS'
export const ACTIVE_CAMPAIGN = 'ACTIVE_CAMPAIGN'

function fetchCampaignSuccess(data) {
    return {
        type: FETCH_CAMPAIGNS,
        data
    }
}

export function updateActiveCampaign(data) {
    return {
        type: ACTIVE_CAMPAIGN,
        data
    }
}
export function fetchingCampaigns() {
    return function (dispatch) {
        fetch('../../src/jsonapi/mockdata.json')
            .then(res => res.json())
            .then(function (res) {
                dispatch(fetchCampaignSuccess(res))
            })
    }
}