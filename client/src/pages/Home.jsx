import { NavLink } from 'react-router';
import Navbar from '../components/Navbar';
import handleRecipeData from '../handlers/handleRecipeData';
import { useState } from 'react';
const Home = () => {
	const [input, setInput] = useState('');
	const [recipes, setRecipes] = useState([]);

	const getRecipes = async (input) => {
		try {
			const res = await fetch(`/api/search?query=${input}`);
			const data = await res.json();
			const filteredResults = data.results.filter((recipe, index, arr) => {
				return (
					recipe.title.toLowerCase() !== 'all recipes' &&
					!arr.slice(0, index).some((r) => r.title.toLowerCase() === 'all recipes')
				);
			});

			setRecipes(filteredResults);
		} catch (err) {
			console.error('Failed to fetch recipes:', err);
		}
	};

	const handleAddToFavorites = (recipe) => async () => {
		const payload = {
			title: recipe.title,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			description: recipe.description || '',
			image_url: recipe.featured_image || '',
			source_url: recipe.source_url || '',
			original_api_id: recipe.pk,
		};
		try {
			const res = await fetch('/api/favorite', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (res.ok) {
				console.log('Recipe added to favorites:', data);
				console.log('visual flare her later');

				// Maybe show a success message or update the UI
			} else {
				console.error('Failed to add recipe to favorites:', data.error);
			}
		} catch (err) {
			console.error('Error adding recipe to favorites:', err);
		}
	};

	return (
		<div>
			<Navbar />
			<h2>Home</h2>
			<p>Welcome to the Recipe Finder!</p>
			<p>Find your favorite recipes and save them for later.</p>
			<form
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					getRecipes(input);
					setInput(''); // Clear the input field after submission
				}}
			>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
					placeholder="Search for recipes..."
				/>
				<button type="submit">Search</button>
			</form>

			<div className="recipe-container">
				{recipes.map((recipe, index) => {
					const updatedRecipe = handleRecipeData(recipe); // Parse the recipe data using the imported function
					return (
						<div key={index}>
							<h3>{updatedRecipe.title}</h3>
							<h4>{updatedRecipe.publisher}</h4>
							<img src={updatedRecipe.featured_image} alt={updatedRecipe.title} />
							<p>{updatedRecipe.description}</p>
							<NavLink to={`/recipe/${updatedRecipe.pk}`}>Go to recipe</NavLink>
							<button onClick={handleAddToFavorites(updatedRecipe)}>Add to favorites</button>
							<p>Rating: {updatedRecipe.rating}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
