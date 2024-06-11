import './App.css'
import Layout from './Layout/Layout'
import {Route,Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvider} from './UserContext'
import CreatePosts from './pages/CreatePosts'
import PostPage from './pages/PostPage'
import EditPosts from './pages/EditPosts'

function App() {

  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<RegisterPage/>}/>
      <Route path='/centers' element={<CreatePosts/>}/>
      <Route path='/post/:id' element={<PostPage/>}/>
      <Route path='/edit/:id' element={<EditPosts/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
    </>

    
  )
}

export default App
