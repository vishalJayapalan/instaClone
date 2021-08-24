import React,{useState} from 'react'
import Axios from 'axios'
import { BASE_URL } from '../../config'

export default function AddPostModal({setShowAddPostModal}) {
  const fileInput = React.createRef();
  const [caption,setCaption] = useState('');
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(fileInput.current.files[0].name);
    setShowAddPostModal(false);
  }

  const uploadFiles = async (event) => {
    const files = Array.from(event.target.files)
    const flLeng = files.length
    if (!flLeng) return
    if (flLeng < 10 )  {
      const formData = new FormData()
      for (const image of files) formData.append('images', image)
      try {
        const result = await Axios({
          method: 'POST',
          url: `${BASE_URL}/image/upload`,
          header: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData,
          onUploadProgress: (event) => console.log(Math.round((event.loaded / event.total) * 100))
        })
      } catch (err) {
      }
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
            onClick={()=>setShowAddPostModal(false)}
          />
        </div>
        <form className="mt-5" onSubmit={handleSubmit}>
          {<div>
            <input type='file' multiple accept="image/*" ref={fileInput} onChange={uploadFiles} />
          </div>}
          <div className="pt-9 mx-auto flex flex-row-reverse justify-between items-center">
            <button
              type="submit"
              className="text-sm md:text-base bg-blueBtn text-white rounded-lg p-4 leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2">
              Confirm
            </button>
            <button
              type="button"
              className="justify-center rounded-md  px-4 py-2 text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ms-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
          <textarea className="border" value={caption} onChange={(e)=> setCaption(e.target.value)} />
        </form>
        </div>
      </div>
  )
}
