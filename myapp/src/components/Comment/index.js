import React from 'react'

export default function index({ comment }) {
  return (
    <div className='mb-1'>
      <span className='font-semibold'>{comment.user_name}</span><span className='ml-2'>{comment.comment}</span>
    </div>
  )
}
