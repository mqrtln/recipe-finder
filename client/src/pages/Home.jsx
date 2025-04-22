import Navbar from "../components/Navbar";
import { useState } from "react";
const Home = () => {

    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]);



    const testRecipe = async (input) => {
        console.log(input)
        try{
            const res = await fetch(`/api/search?query=${input}`);
            const data = await res.json();
            
           setRecipes(data.results); // Set the fetched recipes to state
        }catch(err) {
            console.error('Failed to fetch recipes:', err);
    };
}
    return (
        <div>
            <Navbar /> 
            <h2>Home</h2>
            <p>Welcome to the Recipe Finder!</p>
            <p>Find your favorite recipes and save them for later.</p>
            <form action="submit" onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                testRecipe(input); // Call the function to fetch recipes
                setInput(''); // Clear the input field after submission
            }}>
                <input value={input} onChange={(e) => setInput(e.target.value)}type="text" placeholder="Search for recipes..." />
                <button type="submit">Search</button>
            </form>

            <div className="recipe-container">
                {recipes.map((recipe, index) => (
                    <div key={index}>
                        <h3>{recipe.title}</h3>
                        <h4>{recipe.publisher}</h4>
                        <img src={recipe.featured_image} alt={recipe.title} />
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Home; 