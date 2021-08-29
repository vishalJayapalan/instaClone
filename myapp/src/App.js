import React, { useState } from 'react';
import Header from './components/Header/index.js'
import AddPostModal from './components/modal/AddPostModal.js'
import Feeds from './components/Feed/Feeds.js';
function App() {
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  return (
    <div className='text-sm'>
      {showAddPostModal && <AddPostModal setShowAddPostModal={setShowAddPostModal} />}
      <Header setShowAddPostModal={setShowAddPostModal} />
      <Feeds />
    </div>
  );
}

export default App;
