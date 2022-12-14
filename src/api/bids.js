import apiUrl from '../apiConfig'
import axios from 'axios'
// import Redirect from './../components/shared/Redirect'

// export const getAllBids = (user, job) => {
export const getAllBids = (user) => {
  // return axios(`${apiUrl}/bids/{job.id}`)
  return axios({
    method: 'GET',
    url: `${apiUrl}/bids/`,
    // url: `${apiUrl}/bids/{job.id}`,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  })
}

//GET One Bid
export const getOneBid = (user, id) => {
  // return axios(`${apiUrl}bids/${id}/`)
  return axios({
    method: 'GET',
    url: `${apiUrl}/bids/${id}`,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  })
}

//CREATE Bid
export const createOneBid = (bid, user) => {

  console.table(bid)
  console.log('API createOneBid user.token=', user.token)
  return axios({
    method: 'POST',
    url: `${apiUrl}/bids/`,
    data: { bid: bid },
    headers: { Authorization: `Token ${user.token}` }
  })
}

//UPDATE Bid
export const editOneBid = (bid, user, updatedBid) => {
  return axios({
    url: `${apiUrl}/bids/${bid.id}/${updatedBid}`,
    method: 'PATCH',
    data: { bid: updatedBid },
    headers: { Authorization: `Token ${user.token}` }
  })

}

//DELETE Bid
export const destroyOneBid = (id, user) => {
  console.log('destroyOneBid is running')
  console.log('destroyOneBid bid is ', id)
  console.log('destroyOneBid user is ', user)
  return axios({
    method: 'delete',
    url: `${apiUrl}/bids/${id}/`,
    headers: { Authorization: `Token ${user.token}` }
  })
}