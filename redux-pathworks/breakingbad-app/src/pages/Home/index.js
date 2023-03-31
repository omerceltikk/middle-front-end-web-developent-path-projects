import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from '../../redux/characterSlice'
import "./styles.css"
import Masonry from 'react-masonry-css'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { Link } from 'react-router-dom'
function Home() {
    const data = useSelector((state) => state.characters.items)
    const status = useSelector((state) => state.characters.status)
    const page = useSelector((state) => state.characters.page)
    const error = useSelector((state) => state.characters.error)
    const hasNextPage = useSelector((state) => state.characters.hasNextPage)
    const dispatch = useDispatch()

    
 useEffect(() => {
    if(status === "idle"){
   dispatch(fetchCharacters())
 }},[dispatch])

 if(status === "failed") {
    return  <Error message={error}/>
 }
  return (
    <div>
       <h1>Characters</h1>
       <Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
   {
           data.map((item) => (
            <Link to={`/char/${item.char_id}`}>
            <div key={item.char_id}>
                <img alt={item.name} src={item.img} className="character" />
                <p>{item.name}</p>
                </div>
            </Link>
           )) 
       }
</Masonry>
{status ==="loading" && <Loading/>}
<div style={{padding:"20px 0 40px 0", textAlign:"center"}}>
    {
    hasNextPage && status !== "loading" &&
<button onClick={() => dispatch(fetchCharacters(page))}> Load More {page} </button>
    }
</div>
      
    </div>
  )
}

export default Home