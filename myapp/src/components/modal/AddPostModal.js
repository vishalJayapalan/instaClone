import React,{useState} from 'react'

export default function AddPostModal({setShowAddPostModal}) {
  const fileInput = React.createRef();
  const [caption,setCaption] = useState('')
  const handleSubmit = (event) =>{
    event.preventDefault();

  }
  return (
    <div className="fixed z-40 w-full h-full inset-0 bg-gray-900 bg-opacity-80 transition-opacity flex md:items-center items-end">
        <div className="z-50 bg-white w-full md:w-2/5 min-h-96 mx-auto md:rounded-xl p-8">
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
        <form onSubmit={handleSubmit}>
          <div>
            <input type='file' ref={fileInput} />
          </div>
          <div>
            <button onClick={()=>setShowAddPostModal(false)}>cancel</button>
            <button type='submit'>Post</button>
          </div>
          <textarea className="border" value={caption} onChange={(e)=> setCaption(e.target.value)} />
        </form>
        </div>
      </div>
  )
}
