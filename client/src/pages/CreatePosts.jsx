import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom'
import Editor from '../Editor';

const CreatePosts = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);  
  const[redirect,setRedirect] = useState(false);



  async function createNewPost(e) {
    e.preventDefault();  

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files) {
      data.append('file', files);  // Append the file to the FormData object
    }

    const token = localStorage.getItem('token'); //

    const response = await fetch('http://localhost:4100/post', {
      method: 'POST',
      body: data,
      credentials:'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      setRedirect(true);
  }
}

if(redirect){
  return <Navigate  to={'/'}/>
}

  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Summary'
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <input
          type='file'
          onChange={e => setFiles(e.target.files[0])}  
        />
      <Editor value={content} onChange={setContent}/>
        <button style={{ marginTop: '8px' }}>Create Post</button>
      </form>
    </>
  );
}

export default CreatePosts;
