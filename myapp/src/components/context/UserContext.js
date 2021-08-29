import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios'

export const UserContext = createContext()

export const UserContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [feeds,setFeeds] = useState([]);
  const [user,setUser] = useState({});
  const [comments,setComments] = useState([]);
  const [likes,setLikes] = useState([])

  useEffect(() => {
    getUser();
    getPosts();
  }, [])

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

  const getComments = async (feed) => {
    try {
      const result = await Axios({
        method: 'GET',
        url: `/api/comment/get-comments/${feed.id}`,
        header: {
          'Content-Type': 'application/json'
        }
      })
      setComments(result.data.rows);
    } catch (err) {
      console.log(err)
    }
  }

  const addComment = async (comment,feed,setComment)=>{
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
          feedId:feed.id
        }
      })
      getPosts();
      setComment('')
      getComments(feed);
    }
    else{}}
     catch (err) {
      console.log(err)
    }
  }

  const getLikes = async (feed) => {
    try {
      const result = await Axios({
        method: 'GET',
        url: `/api/like/get-likes/${feed.id}`,
        header: {
          'Content-Type': 'application/json'
        }
      })
      setLikes(result.data);
    } catch (err) {
      console.log(err)
    }
  }

  const addLike = async (feed)=>{
    try {
      const result = await Axios({
        method: 'POST',
        url: '/api/like/add-like',
        header: {
          'Content-Type': 'application/json'
        },
        data:{
          feedId:feed.id
        }
      })
      getPosts();
      console.log('LIKES RESULT',result.data)
      getLikes(feed)
    }
     catch (err) {
      console.log(err)
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        setIsLoggedIn,
        feeds,setFeeds,
        user,setUser,
        getPosts,getUser,
        comments,
        getComments,
        addComment,
        likes,
        getLikes,addLike
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
