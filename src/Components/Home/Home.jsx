import React from 'react'
import "./Home.scss";
import Row from '../Row';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';

const api_key="00455c12b832e6eab741e78a4fe80528";
const url="https://api.themoviedb.org/3/movie/";
const upcoming="upcoming";
const imgUrl="https://image.tmdb.org/t/p/original";
const popular="popular";
const latest="latest";
const now_playing="now_playing";
const top_rated="top_rated";


const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [latestMovies, setLatestMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [topRatedMovies, settopRatedMovies] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchUpcoming=async()=>{
      const {data:{results}}=await axios.get(`${url}/${upcoming}?api_key=${api_key}`);
      setUpcomingMovies(results);
    }

    const fetchPopular=async()=>{
      const {data:{results}}=await axios.get(`${url}/${popular}?api_key=${api_key}`);
      setPopularMovies(results);
    }

    const fetchLatest=async()=>{
      const {data:{results}}=await axios.get(`${url}/${latest}?api_key=${api_key}`);
      setLatestMovies(results);
    }

    const fetchNowPlaying=async()=>{
      const {data:{results}}=await axios.get(`${url}/${now_playing}?api_key=${api_key}`);
      setNowPlayingMovies(results);
    }

    const fetchTopRated=async()=>{
      const {data:{results}}=await axios.get(`${url}/${top_rated}?api_key=${api_key}`);
      settopRatedMovies(results);
    }

    const genreData=async()=>{
      const {data:{genres}}=await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=00455c12b832e6eab741e78a4fe80528`);
      setGenres(genres);
    }

    fetchUpcoming();
    fetchPopular();
    fetchLatest();
    fetchNowPlaying();
    fetchTopRated();
    genreData();
  }, [])
  

  return (
    <section className="home">
      <div className="banner" style={{backgroundImage:popularMovies[0]?`url(${imgUrl}/${popularMovies[0].poster_path})`:'rgb(16,16,16)'}}>
          {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
          {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
          <div className='btn'>
            <button>Play <BiPlay/></button>
            <button> My List <AiOutlinePlus/></button>
          </div>
      </div>
      <Row title="Upcoming Movies" arr={upcomingMovies}/>
      <Row title="Popular" arr={popularMovies}/>
      <Row title="Now Playing" arr={nowPlayingMovies}/>
      <Row title="Top Rated" arr={topRatedMovies}/>
      <Row title="Latest Movies" arr={latestMovies}/>

      <div className='genreBox'>
            {
                genres.map((e)=>(
                  <Link key={e.id} to={e.id}>{e.name}</Link>
                ))
            }
      </div>

    </section>
  )
}

export default Home