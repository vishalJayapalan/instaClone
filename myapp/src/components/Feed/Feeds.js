import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Feed from './index'
import Header from '../Header/index.js'

export default function Feeds() {
  const [user,setUser] = useState({});
  const [feeds,setFeeds] = useState([]);


  const getPosts = async () => {
    try {
      const result = await Axios({
        method: 'GET',
        url: '/api/feed/get-feeds',
        header: {
          'Content-Type': 'application/json'
        }
      })
      setFeeds(result.data);
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = async () => {
    try {
      const result = await Axios({
        method: 'GET',
        url: '/api/user/get-user',
        header: {
          'Content-Type': 'application/json'
        }
      })
      setUser(result.data[0]);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPosts()
    getUser()
  }, [])

  return (
    <div className='text-sm'>
      <Header />
      <div className='md:max-w-935px mx-auto px-3'>
        <div className='md:max-w-614px'>
          {feeds.map(feed => <Feed key={feed.id} feed={feed} user={user} />)}
        </div>
      </div>
    </div>
  )
}
