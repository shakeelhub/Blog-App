import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import ImageSlider from '../components/ImageSlider';
import {SliderData} from '../components/SliderData'
import Footer from '../components/Footer'

const IndexPage = () => {

  const[posts,setPosts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4100/post').then(response => {
      response.json().then(posts => {
       setPosts(posts);
      })
    })
  },[])

  return (
    <>
    <ImageSlider slides={SliderData} />
     {posts.length > 0 && posts.map( post => (
      <Post {...post}/>
     ))}
     <Footer/>
    </>
  )
}

export default IndexPage