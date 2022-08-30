import apiUrl from '../apiConfig'
import axios from 'axios'
// import Redirect from './../components/shared/Redirect'

// export const getAllContractBid = (user, job) => {
export const getAllContractBid = (user) => {
  // return axios(`${apiUrl}/contract_bid/{job.id}`)
  return axios({
    method: 'GET',
    url: `${apiUrl}/contract_bid/`,
    // url: `${apiUrl}/contract_bid/{job.id}`,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  })
}

//GET One Bid
export const getOneContractBid = (user, id) => {
  // return axios(`${apiUrl}contract_bid/${id}/`)
  return axios({
    method: 'GET',
    url: `${apiUrl}/contract_bid/${id}`,
    headers: {
      Authorization: `Token ${user.token}`,
    },
  })
}

//CREATE ContractBid
export const createOneContractBid = (contractBid, user) => {
// (contract_id, bid_id, status, 
  // console.table(bid)
  console.log('API createOneContractBid user.token=', user.token)
  return axios({
    method: 'POST',
    url: `${apiUrl}/contract_bid/`,
    data: {contract_data: contractBid },
    headers: { Authorization: `Token ${user.token}` }
  })
}

//UPDATE ContractBid
export const editOneContractBid = (bid, user, updatedContractBid) => {
  return axios({
    url: `${apiUrl}/contract_bid/${bid.id}/${updatedContractBid}`,
    method: 'PATCH',
    data: { bid: updatedContractBid },
    headers: { Authorization: `Token ${user.token}` }
  })

}

//DELETE ContractBid
export const destroyOneContractBid = (id, user) => {
  console.log('destroyOneContractBid is running')
  console.log('destroyOneContractBid bid is ', id)
  console.log('destroyOneContractBid user is ', user)
  return axios({
    method: 'delete',
    url: `${apiUrl}/contract_bid/${id}/`,
    headers: { Authorization: `Token ${user.token}` }
  })
}