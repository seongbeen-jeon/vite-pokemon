import './style.css';
import Home from './pages/Home.jsx';
import {Routes,Route} from 'react-router-dom';
import Layout from './Layout.jsx';
import Album from './pages/Album.jsx';
import Sets from './pages/Sets.jsx';
import CardListPage from './pages/CardListPage.jsx';
import CardDetail from './pages/CardDetail.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/album" element={<Album/>}/>
        <Route path="/sets" element={<Sets/>}/>
        <Route path="/sets/:boxid" element={<CardListPage/>}/>
        <Route path="/cards/:cardid" element={<CardDetail/>}/>
      </Route>
    </Routes>
  )
}

export default App
