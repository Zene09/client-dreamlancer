import apiUrl from '../apiConfig'
import axios from 'axios'


export const getAllBids = (user) => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/bids/`,
        headers: {
            Authorization: `Token ${user.token}`,
        },
    })
}

export const getOneBid = (user, id) => {
    return axios({
        method: 'GET',
        url: `${apiUrl}/bids/${id}`,
        headers: {
            Authorization: `Token ${user.token}`,
        },
    })
}

// export const createOneJob = (job, user) => {
//     console.table(job)
//     console.log('API createOneJob user.token=', user.token)
//     return axios({
//         method: 'POST',
//         url: `${apiUrl}contracts/`,
//         data: { contract: job },
//         headers: { Authorization: `Token ${user.token}` }
//     })
// }

// export const destroyOneJob = (id, user) => {
//     console.log('destroyOneJob is running')
//     console.log('destroyOneJob job is ', id)
//     console.log('destroyOneJob user is ', user)
//     return axios({
//         method: 'delete',
//         url: `${apiUrl}/jobs/${id}/`,
//         headers: { Authorization: `Token ${user.token}` }
//     })
// }

// export const editOneJob = (job, user) => {
//     return axios({
//         method: 'PATCH',
//         url: `${apiUrl}/jobs/${job._id}/`,
//         data: { job: job },
//         headers: { Authorization: `Token ${user.token}` }
//     })
// }