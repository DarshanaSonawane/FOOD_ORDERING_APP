import { useState } from 'react'
import ExploreFood from './ExploreFood'
import FoodDisplay from './FoodDisplay'

function ExplorePage() {
  const [category, setCategory] = useState(null)

  return (
    <div>
      <ExploreFood category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  )
}

export default ExplorePage