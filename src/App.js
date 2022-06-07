
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Movies from './movies';
import Filter from './filter'
import './App.css';

function App() {
  const [popular, setPopular] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState(0)
  const fetchPopular = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=7fe24aaf9b28e264a4caebfc6864fc98&language=en-US&page=1')
    const movies = await data.json()
    console.log(movies.results)
    setPopular(movies.results)
    setFiltered(movies.results)
  }

  useEffect(() => {
    fetchPopular()
  }, [])


  return (
    <div className="App">
      <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <motion.div layout className='popular-movies'>
        <AnimatePresence>
        {
          popular && filtered.map(movie => {
            return <Movies movie={movie} key={movie.id} />
          })
        }
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
