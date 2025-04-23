import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const SavedRecipes = () => {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleDelete = async (id) => {
		const confirmed = window.confirm('Are you sure you want to delete this recipe?');
		if (!confirmed) return; // If user cancels, do nothing
		// Proceed with deletion
		try {
			const res = await fetch(`/api/favorite/${id}`, {
				method: 'DELETE',
			});
			if (res.ok) {
				setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
			} else {
				const json = await res.json();
				console.error('Failed to delete recipe:', json.error);
			}
		} catch (err) {
			console.error('Error deleting recipe:', err);
		}
	};

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const res = await fetch('/api/favorites');
				const json = await res.json();

				if (res.ok) {
					setRecipes(json.data); // Assuming data.data contains the recipes
				} else {
					console.error('Failed to fetch favorite recipes:', json.error);
				}
			} catch (err) {
				console.error('Error fetching favorite recipes:', err);
			} finally {
				setLoading(false); // Set loading to false after fetching
			}
		};

		fetchFavorites(); // Call the function to fetch favorites
	}, []); // Empty dependency array to run once on mount

	return (
		<div className="saved-recipes">
			<Navbar />
			<h2>Saved Recipes</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="recipe-container">
					{recipes.length === 0 ? (
						<p>No saved recipes found.</p>
					) : (
						recipes.map((recipe) => (
							<div key={recipe.id} className="recipe-card">
								<h3>{recipe.title}</h3>
								<img src={recipe.image_url} alt={recipe.title} />
								<p>Published by: {recipe.publisher}</p>
								<a href={recipe.source_url}>View Recipe</a>
								{recipe.ingredients && recipe.ingredients.length > 0 ? (
									<ul>
										{recipe.ingredients.map((ingredient, idx) => (
											<li key={idx}>{ingredient}</li>
										))}
									</ul>
								) : (
									<p>
										<em>No ingredients listed.</em>
									</p>
								)}

								<button onClick={() => handleDelete(recipe.id)}>Remove from favorites</button>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default SavedRecipes;
