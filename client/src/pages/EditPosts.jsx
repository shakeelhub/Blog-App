import React, { useEffect, useState } from 'react'
import { Navigate,useParams } from 'react-router-dom';
import Editor from '../Editor';


const EditPosts = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const[redirect,setRedirect] = useState(false); 

    useEffect(()=>{
        fetch('http://localhost:4100/post/'+id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    },[id])

   

   async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('id',id)
        data.set('content', content);
        if (files?.[0]){
            data.set('file', files);
        }
        await fetch('http://localhost:4100/post',{
            method:'PUT',
            body: data,
            credentials:'include'
        });
    setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/post/'+id} />
    }
  
    return (
        <>
          <form onSubmit={updatePost}>
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
              onChange={e => setFiles(e.target.files[0])}  // Set the first selected file to the state
            />
           <Editor onChange={setContent} value={content}/>
            <button style={{ marginTop: '8px' }}>Update Post</button>
          </form>
        </>
      );
}

export default EditPosts