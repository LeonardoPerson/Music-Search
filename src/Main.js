import {useState} from 'react'
import axios from 'axios'

const apiURL = `https://api.lyrics.ovh/`
const applyCors = 'https://cors-anywhere.herokuapp.com/'
const imageAlternative = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg'

const Main = () => {
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
    </div>
  )
}

export default Main