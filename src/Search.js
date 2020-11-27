import {useState} from 'react'
import axios from 'axios'
import {apiURL, applyCors} from './api'

const imageAlternative = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [termWarning, setTermWarning] = useState(false)
  const [musicData, setMusicData] = useState([])
  const [error, setError] = useState(null)

  const searchLyric = (event) => {
    event.preventDefault() 
    setMusicData([])
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

  const handleChange = (event) => {
    const aux = event.target.value
    setSearchTerm(aux)    
  } 

  const getMoreSongs = (url) => {
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
      <h1 id='appTitle'>Music Search</h1>
      
      <form onSubmit={searchLyric} autoComplete="on">
        <input
          autoFocus
          type='text'
          onChange={handleChange}
          placeholder='Insira o nome do artista ou da música...'
        />
        <button>Search</button>
      </form> 
      <div data-testid="warning-text">
        {termWarning && <div>Enter a valid value</div>} 
      </div>
      
      {
        error ? <div>Something went wrong ...</div>
        :      
        <div data-testid="show-name"> 
          {musicData.data && musicData.data.map(item =>                            
              <div key={item.id}>
                <div>{item.artist.name}</div> 
                <div>Song: {item.title}</div> 
                <div>{item.album.type}: {item.album.title}</div>
                
                <img 
                  src={item.album.cover_medium ? item.album.cover_medium:imageAlternative} 
                  alt="album cover"
                />

                <audio controls>
	                <source src={item.preview} type="audio/mpeg"/>
                </audio>

                <br/>
                <br/>
              </div>           
          )}
        </div>         
      }   
      
      <div class='scrolling-box'>
        {musicData.prev && 
          <button onClick={() => getMoreSongs(musicData.prev)}>
            <a href="#appTitle">
              PREVIOUS
            </a>
          </button>}
        {musicData.next && 
          <button onClick={() => getMoreSongs(musicData.next)}>
            <a href="#appTitle">
              NEXT
            </a>
          </button>}
      </div>  

    </div>
  )
}

export default Search