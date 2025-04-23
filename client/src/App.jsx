import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import SavedRecipes from "./pages/SavedRecipes"
import RecipeDetail from "./pages/RecipeDetail"

function App() {
  return (
    <div className="App">
      <h1>Recipe finder</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  )
}

export default App
