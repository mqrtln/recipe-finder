import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import handleRecipeData from '../handlers/handleRecipeData';
const RecipeDetail = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			const intId = parseInt(id); // Parse the id from the URL parameters
			try {
				const res = await fetch(`/api/recipe?id=${parseInt(intId)}`);
				const data = await res.json();

				const updatedRecipe = handleRecipeData(data); // Parsing the recipe data using the imported function
				setRecipe(updatedRecipe);
			} catch (err) {
				console.error('Failed to fetch recipe:', err);
				setError('Failed to fetch recipe. Please try again later.');
			}
		};

		fetchRecipe();
	}, [id]); // Rerender/update on id change

	// Error handling
	if (error) return <p>{error}</p>;
	if (!recipe) return <p>Loading...</p>; // Show a loading message while the recipe is being fetched

	return (
		<div>
			<Navbar />
			<h2>{recipe.title}</h2>
			<p>Published by: {recipe.publisher}</p>
			<p>Published on: {recipe.date_added}</p>
			<img src={recipe.featured_image} alt={recipe.title} />
			<br />
			<a href={recipe.source_url}>{recipe.source_url}</a>

			{/* And more after this */}

			<h3>Ingredients:</h3>
			<ul>
				{recipe.ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient}</li>
				))}
			</ul>
		</div>
	);
};

export default RecipeDetail;
