import apiUrl from '../src/apiConfig'
import axios from 'axios'

// CREATE profile
export const createComment = (user, blogId, newComment) => {
    console.log('the user in createComment', user)
    console.log('the newComment in createComment', newComment)
    return axios({
        url: `${apiUrl}/comments/${blogId}`,
        method: 'POST',
        data: { comment: newComment }
    })
}

// UPDATE profile
export const updateComment = (user, blogId, updatedComment) => {
    console.log('this is updatedComment', updatedComment)
    return axios({
        url: `${apiUrl}/comments/${blogId}/${updatedComment._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { comment: updatedComment }
    })
}

// DELETE profile
export const deleteComment = (user, blogId, commentId) => {
    return axios({
        url: `${apiUrl}/comments/${blogId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}