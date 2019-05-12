export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS'
export const ACTIVE_CAMPAIGN = 'ACTIVE_CAMPAIGN'
export const SET_LOCALE = 'SET_LOCALE'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'

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

export function setLocale(data) {
    return {
        type: SET_LOCALE,
        data
    }
}

export function updateCampaignDate(data) {
    return {
        type: UPDATE_CAMPAIGN,
        data
    }
}
export function fetchingCampaigns() {
    return function (dispatch) {
        fetch('../../src/jsonapi/mockdata.json')
            .then(res => res.json())
            .then(function (res) {
                res.forEach(element => {
                    element.id= Math.floor(Math.random()*500)
                });
                dispatch(fetchCampaignSuccess(res))
            })
    }
}