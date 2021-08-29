import React from 'react'
import Feed from './index'

export default function Feeds() {
  const user = { name: 'myAccount', id: 'myAccount' }
  const feeds = [
    {
      id: 1,
      name: 'testname',
      creationTime: 'postTime',
      profilePhoteUrl: '/images/profile1.png',
      postImageUrl: '/images/photo1.png',
      liked: false,
      caption: 'This is the first post',
      comments: [{
        id: 'commentId1',
        name: 'myAccount',
        comment: 'comment1'
      }],
      likedBy: ['myAccount'],
      postTime: new Date()
    }, {
      id: 2,
      name: 'Test Name 2',
      creationTime: 'postTime',
      profilePhoteUrl: '/images/profile2.png',
      postImageUrl: '/images/photo2.png',
      liked: true,
      place: 'kannur',
      caption: 'This is the first post',
      comments: [{
        id: 'commentId2',
        name: 'myAccount',
        comment: 'comment2'
      }],
      likedBy: [],
      postTime: new Date()
    }
  ]
  return (
    <div className='md:max-w-935px mx-auto px-3'>
      <div className='md:max-w-614px'>
        {feeds.map(feed => <Feed key={feed.id} feed={feed} user={user} />)}
      </div>
    </div>
  )
}
