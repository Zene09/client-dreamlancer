import apiUrl from '../apiConfig'
import axios from 'axios'
// import Redirect from './../components/shared/Redirect'

export const getAllJobs = (user) => {
    // return axios(`${apiUrl}/jobs/`)
    return axios({
        method: 'GET',
        url: `${apiUrl}contracts/`,
        headers: {
			Authorization: `Token ${user.token}`,
		},
    })
}

export const getOneJob = (user, id) => {
    // return axios(`${apiUrl}contracts/${id}/`)
    return axios({
      method: 'GET',
      url: `${apiUrl}contracts/${id}`,
      headers: {
        Authorization: `Token ${user.token}`,
  },
  })
}

export const createOneJob = (job, user) => {
    
    console.table(job)
    console.log('API createOneJob user.token=',user.token)
    return axios({
      method: 'POST',
      url: `${apiUrl}/contracts/`,
      data: { contract: job },
      headers: { Authorization: `Token ${user.token}` }
    })
  }

export const destroyOneJob = (id, user) => {
    console.log('destroyOneJob is running')
    console.log('destroyOneJob job is ', id)
    console.log('destroyOneJob user is ', user)
    return axios({
        method: 'delete',
        url: `${apiUrl}/contracts/${id}/`,
        headers: { Authorization: `Token ${user.token}` }
    })
}

export const editOneJob = (job, user) => {
    return axios({
        method: 'PATCH',
        url: `${apiUrl}/contracts/${job.id}/`,
        data: { contract: job },
        headers: { Authorization: `Token ${user.token}` }
      })
}

export const acceptOneBid = (job, user) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/contracts/${job.id}/`,
    data: { contract: job },
    headers: { Authorization: `Token ${user.token}` }
  })
}