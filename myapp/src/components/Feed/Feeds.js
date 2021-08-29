import React,{useState,useEffect,useContext} from 'react'
import Feed from './index'
import Header from '../Header/index.js'
import { UserContext } from '../context/UserContext';

export default function Feeds() {
  // const [user,setUser] = useState({});
  // const [feeds,setFeeds] = useState([]);
  const {
    user,
    feeds,setFeeds
  } = useContext(UserContext);

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
