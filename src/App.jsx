import { useEffect, useState } from 'react'
import {fetchDataFromApi} from "./utils/api"
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from "./pages/searchResult/SearchResult"
import PageNotFound from './pages/404/pageNotFound';
import Header from './components/Header/header';
import Footer from './components/Footer/footer'

function App() {

  const dispatch = useDispatch()
  const {url} = useSelector((state) =>
  state.home);

  useEffect(() => {
    fetchApiConfig();
  } , [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url));
    })
  }

  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/:mediaType/:id' element={<Details />}/>
    <Route path='/search/:query' element={<SearchResult />}/>
    <Route path='/explore/:mediaType' element={<Explore />}/>
    <Route path='*' element={<PageNotFound />}/>
  </Routes>
  <Footer />
  </BrowserRouter>
  )
}

export default App
