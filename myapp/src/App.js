import React,{useState} from 'react';
import Header from './components/Header/index.js'
import AddPostModal from './components/modal/AddPostModal.js'
function App() {
  const [showAddPostModal,setShowAddPostModal] = useState(false)
  return (
    <div>
      {showAddPostModal && <AddPostModal setShowAddPostModal={setShowAddPostModal} />}
      <Header setShowAddPostModal={setShowAddPostModal} />
    </div>
  );
}

export default App;
