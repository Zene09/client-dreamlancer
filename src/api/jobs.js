import apiUrl from '../apiConfig'
import axios from 'axios'
// import Redirect from './../components/shared/Redirect'

export const getAllJobs = () => {
    return axios(`${apiUrl}/jobs/`)
}

export const getOneJob = (id) => {
    return axios(`${apiUrl}/jobs/${id}/`)
}

export const createOneJob = (job, user) => {
    
    console.log('API createOneJob user.token=',user.token)
    return axios({
      method: 'POST',
      url: `${apiUrl}/jobs/`,
      data: { job: job },
      headers: { Authorization: `Token ${user.token}` }
    })
  }

export const destroyOneJob = (id, user) => {
    console.log('destroyOneJob is running')
    console.log('destroyOneJob job is ', id)
    console.log('destroyOneJob user is ', user)
    return axios({
        method: 'delete',
        url: `${apiUrl}/jobs/${id}/`,
        headers: { Authorization: `Token ${user.token}` }
    })
}

export const editOneJob = (job, user) => {
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/jobs/${job._id}/`,
        data: { job: job },
        headers: { Authorization: `Token ${user.token}` }
      })
}