import axios from 'axios'
import stacks from './stacks'

const APPCONFIG_DOMAIN_ARRAY = stacks()


const authObj = () => ({
    auth: {
        username: localStorage.getItem('A'),
        password: localStorage.getItem('B')
    },
    headers: {
        'Content-Type': 'application/json'
    }
})


export async function getAppList(stack_key) {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/app`
    const authObjCopy = { ...authObj() }
    try {
        const response = await axios.get(URL, authObjCopy);
        return response.data
    } catch (error) {
        return error
    }
}

export const getByAppID = async (appID,stack_key) => {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/app/${appID}`
    const authObjCopy = { ...authObj() }
    try {
        const response = await axios.get(URL, authObjCopy);
        return response.data
    } catch (error) {
        return error
    }
}

export const postNewEntry = async (postBody, stack_key) => {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/add`
    const config = {
        url: URL,
        method: 'POST',
        data: postBody,
        ...authObj()
    }
    try {
        const response = await axios(config);
        return response.data
    } catch (error) {
        return error
    }
}

export const updateEntry = async (postBody, stack_key) => {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/update`
    const config = {
        url: URL,
        method: 'PUT',
        data: postBody,
        ...authObj()
    }
    try {
        const response = await axios(config);
        return response.data
    } catch (error) {
        return error
    }
}

export const historyOfEntry = async (entryNum, stack_key) => {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/history/${entryNum}`
    let authObjCopy = { ...authObj() }
    try {
        const response = await axios.get(URL, authObjCopy);
        return response.data
    } catch (error) {
        return error
    }
}

export const recentlyChanged = async (recence, stack_key) => {
    const URL = `${APPCONFIG_DOMAIN_ARRAY[stack_key]}/api/1/config/changed/${recence}`
    let authObjCopy = { ...authObj() }
    try {
        const response = await axios.get(URL, authObjCopy);
        return response.data
    } catch (error) {
        return error
    }
}


    // {
    //     "message": "LEMME UPDAAAAAAATE",
    //     "entries": [
    //         {
    //             "id": 218,
    //             "appID": 3,
    //             "key": "1",
    //             "value": "UPDATEDONE"
    //         },
    //         {
    //             "id": 219,
    //             "appID": 3,
    //             "key": "2",
    //             "value": "UPDATEDTWO"
    //         },
    //         {
    //             "id": 220,
    //             "appID": 3,
    //             "key": "3",
    //             "value": "UPDATEDONETHREE"
    //         }
    //     ]
    // }

    // FORM OF JSON:
    // {
    //     "message": "required to turn smartfax on",
    //     "entries": [
    //         {
    //             "appID": 3,
    //             "key": "ff_smartfax_enabled",
    //             "value": "true"
    //         }
    //     ]
    // }
    /// OR
    // {
    //     "message": "test updating!",
    //     "entries": [
    //         {
    //             "appID": 2,
    //             "key": "testest1",
    //             "value": "NEWONE"
    //         },
    //         {
    //             "appID": 2,
    //             "key": "testest2",
    //             "value": "NEWTWO"
    //         },
    //         {
    //             "appID": 2,
    //             "key": "testest3",
    //             "value": "NEWTHREE"
    //         }
    //     ]
    // }
// }