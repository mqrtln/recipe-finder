import { useState } from 'react';

const EditRecipeForm = ({ recipe, onCancel, onSave }) => {
	const [formData, setFormData] = useState({
		title: recipe.title || '',
		description: recipe.description || '',
		ingredients: recipe.ingredients?.join(', ') || '',
		remixed_by: recipe.remixed_by || '',
	});

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			title: formData.title,
			description: formData.description,
			ingredients: formData.ingredients.split(',').map((i) => i.trim()),
			remixed_by: formData.remixed_by,
		};

		await onSave(recipe.id, payload); // Calls parent function
	};

	return (
		<form onSubmit={handleSubmit} className="edit-form">
			<input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" />
			<textarea
				name="description"
				value={formData.description || ''}
				onChange={handleChange}
				placeholder="Description"
			/>
			<input
				name="ingredients"
				value={formData.ingredients || ''}
				onChange={handleChange}
				placeholder="Ingredients (comma-separated)"
			/>
			<input name="remixed_by" value={formData.remixed_by || ''} onChange={handleChange} placeholder="Your name" />
			<button type="submit">Save</button>
			<button type="button" onClick={onCancel}>
				Cancel
			</button>
		</form>
	);
};

export default EditRecipeForm;
