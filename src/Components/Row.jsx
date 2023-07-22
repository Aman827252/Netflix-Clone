import React from 'react'
import Card from './Card'
import './Home/Home.scss'
const imgUrl="https://image.tmdb.org/t/p/original"

const Row = ({title,arr=[]}) => {
  return (
    <div className="row">
        <h2>{title}</h2>
        <div>
          {
            arr.map((e,index)=>(
              <Card key={index} img={`${imgUrl}/${e.poster_path}`}/>
            ))
          }
        </div>
    </div>
  )
}

export default Row