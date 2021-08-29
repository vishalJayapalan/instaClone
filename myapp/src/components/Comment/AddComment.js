import React, { useState } from 'react'
import Axios from 'axios'

export default function AddComment({getComments,feedId}) {
  const [comment,setComment]= useState('');

const addComment = async ()=>{
  try {
    if(comment.length){
    const result = await Axios({
      method: 'POST',
      url: '/api/comment/add-comment',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        comment:comment,
        feedId:feedId
      }
    })
    getComments();
  }
  } catch (err) {
    console.log(err)
  }
}
  return (
    <div className='flex h-14 items-center p-4 border'>
      <svg aria-label="Emoji" className="_8-yf5" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>
      <input className='ml-4 border-none outline-none w-full' value={comment} onChange={(e)=> setComment(e.target.value)} placeholder='Add a comment...' />
      <button onClick={addComment}>Post</button>
    </div>
  )
}
