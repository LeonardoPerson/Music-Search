import {ChangeEvent, FormEvent, useState} from 'react'
import axios from 'axios'
import {apiURL, applyCors} from './Api'

const imageAlternative = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'

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
    <div className = "scrolling-box">
      <section id="about-section" className="about-section">
        <h1>Music Search</h1>
        <p>Discover your favorite songs</p>      
      </section>

      {/*Form for input any song or artist ----------------------------------*/}
      <section id="music" className="music-section">
        <form onSubmit={searchLyric} autoComplete='on'>
          <input
            autoFocus
            type='text'
            onChange={handleChange}
            placeholder='Insira o nome do artista ou da música...'
          />
          <button>Search</button>
        </form> 

        {/*Checking if the entered value is valid------------------------------*/}
        <div>
          {termWarning && <div>Enter a valid value</div>} 
        </div>
        
        {/*display of data returned by the api---------------------------------*/}
        {
          error ? 
          <div>Something went wrong ...</div>
          :      
          <div className="music-grid"> 
            {musicData?.data.map(item =>   

              <div key={item.id}>
                <div className='song-information'>
                  <div className="song-title">{item.artist.name}</div> 
                  <div>Song: {item.title}</div> 
                  <div>Album: {item.album.title}</div>  
                </div>            
                <img 
                  className="album-image"
                  src={item.album.cover_big ? item.album.cover_big:imageAlternative} 
                  alt='album cover'
                />
                <audio controls>
                  <source src={item.preview} type='audio/mpeg'/>
                </audio>
              </div>           
            )}
          </div>         
        }   
        
        {/*showing the buttons to change the page------------------------------*/}
        <div className='scrolling-box'>
          {
            musicData?.prev && 
              <button onClick={() => getMoreSongs(musicData.prev)}>
                <a href='#appTitle'>
                  PREVIOUS
                </a>
              </button>
          }

          {
            musicData?.next && 
              <button onClick={() => getMoreSongs(musicData.next)}>
                <a href='#appTitle'>
                  NEXT
                </a>
              </button>
          }
        </div>
      </section>
    </div>
  )
}

export default Search