import { useState } from 'react'
import ExploreFood from './ExploreFood'
import FoodDisplay from './FoodDisplay'
import Header from '../components/Header/Header'
function Home() {
  const [category, setCategory] = useState(null) // null = show all foods

  return (
    <div>
    <Header></Header>
      <ExploreFood category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home;