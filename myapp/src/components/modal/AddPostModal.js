import React, { useState, useEffect,useContext } from 'react'
import Axios from 'axios'
import { BASE_URL } from '../../config'
import { UserContext } from '../context/UserContext';

export default function AddPostModal({ setShowAddPostModal }) {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState('');
  const {
    getPosts
  } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData()
    data.append('caption', caption)
    data.append('image', image)
    try {
      const result = await Axios({
        method: 'POST',
        url: '/api/feed/upload',
        header: {
          'Content-Type': 'multipart/form-data'
        },
        data
      })
      getPosts();
      setShowAddPostModal(false);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="fixed z-40 w-full h-full inset-0 bg-gray-900 bg-opacity-80 transition-opacity flex items-center ">
      <div className="z-50 bg-white w-full md:w-2/5 mx-2 min-h-96 md:mx-auto rounded-lg md:rounded-xl p-8">
        <div
          className="z-50 text-black relative flex justify-between"
        >
          <h5>New Post</h5>
          <img
            className="text-text-default cursor-pointer"
            src='icons/closeGray.svg' alt="close"
            onClick={() => setShowAddPostModal(false)}
          />
        </div>
        <form className="mt-5 w-full" onSubmit={handleSubmit}>
          {<div className='flex w-full justify-between'>
            <label htmlFor='image'>Image:</label>
            <input type='file' multiple accept="image/*" id="image" onChange={(e) => setImage(e.target.files[0])} />
          </div>}
          <textarea className="border w-full resize-none" placeholder='Enter a caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
          <div className="pt-9 mx-auto w-3/6 flex flex-row-reverse justify-between items-center">
            <button
              type="submit"
              className="text-sm md:text-base bg-blueBtn text-white rounded-lg p-4 leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setShowAddPostModal(false)}
              className="justify-center rounded-md  px-4 py-2 text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ms-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
