import './style.css';
import Home from './pages/Home.jsx';
import {Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import Album from './pages/Album.jsx';
import Sets from './pages/Sets.jsx';
import BoxDetail from './pages/BoxDetail.jsx';
import CardDetail from './pages/CardDetail.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/album" element={<Album/>}/>
        <Route path="/sets" element={<Sets/>}/>
        <Route path="/sets/:set_Code" element={<BoxDetail/>}/>
        <Route path="/cards/:cardId" element={<CardDetail/>}/>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
