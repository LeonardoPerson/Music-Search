import React from 'react'
import {ChangeEvent, FormEvent, useState} from 'react'
import axios from 'axios'
import {apiURL, applyCors} from '../Api'

interface musicDataObject {
  data: [
    {
      id: string,
      title: string,
      preview: string,
      artist: {
        name: string
      }
      album: {
        type: string,
        title: string,
        cover_medium: string,
        cover_big: string
      }
    }
  ],
  prev: string,
  next: string
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [termWarning, setTermWarning] = useState(false)
  const [musicData, setMusicData] = useState<musicDataObject>()
  const [error, setError] = useState(null)

  //Function performed when clicking the search button
  const searchLyric = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() 
    setMusicData(undefined)
    if(searchTerm){
      setTermWarning(false)        
      try{
        axios.get(`${apiURL}/suggest/${searchTerm.trim()}`)
        .then(response => {     
          setMusicData(response.data)
        })
      }catch(error){
        setError(error)
      }         
    }else{
      setTermWarning(true)
    }
  }

  //Capturing the value entered by the user
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const aux: string = event.target.value
    setSearchTerm(aux)    
  } 

  //Function performed when clicking the button to change the page
  const getMoreSongs = (url: string) => {
    try{
      axios.get(`${applyCors}${url}`)
         .then(response => {            
          setMusicData(response.data)
         }) 
    }catch(error){
      setError(error)
    }
  }

  return(
    
    <div>     
      <section id='about-section' className='about-section'>
        <h1>Music Search</h1>
        <p>Discover the 15 best songs of your favorite artist</p>    
      </section>

      {/*Form for input any song or artist ----------------------------------*/}
      <section id='music' className='music-section'>
        <div className='form'>
          <form onSubmit={searchLyric} autoComplete='on'>
            <input
              className='input-search'
              type='text'
              onChange={handleChange}
              placeholder='Enter the artist or song ...'
            />
            <button className='search-button'>Search</button>
          </form> 
        </div>

        {/*Checking if the entered value is valid------------------------------*/}
        <div>
          {termWarning && <div className='warning-text'>Enter a valid name</div>} 
        </div>
        
        {/*display of data returned by the api-------------------------------*/}
        {
          error ? 
          <div>Something went wrong ...</div>
          :   
          musicData?.data.map(item =>
            <div key={item.id} className='card-song'>               
                <div className='song-title'>{item.artist.name}</div> 
                <div>Song: {item.title}</div> 
                <div>Album: {item.album.title}</div>                
            </div>           
          )
       
        }   
        
        {console.log(musicData?.data)}
        {console.log(error)}
        {/*showing the buttons to change the page------------------------------*/}
        {/*<div className='scrolling-box'>
          {
            musicData?.prev && 
              <button onClick={() => getMoreSongs(musicData.prev)} className='previous-button'>
                <a href='#music'>
                  PREVIOUS
                </a>
              </button>
          }

          {
            musicData?.next && 
              <button onClick={() => getMoreSongs(musicData.next)} className='next-button'>
                <a href='#music'>
                  NEXT
                </a>
              </button>
          }
        </div>
        */}
      </section>
   
    </div>
  )
}

export default Search