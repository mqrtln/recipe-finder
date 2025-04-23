const handleRecipeData = (recipe) => {
    const updatedRecipe = {...recipe}; 

    for(const key in updatedRecipe){
        if(typeof updatedRecipe[key] === 'string'){
            updatedRecipe[key] = updatedRecipe[key]
                .replace(/&amp;/g, '&')
                .replace(/&nbsp;/g, '-'); 

        }
    }
    // Remove the description if it is "N/A"
    if (updatedRecipe.description === "N/A") {
        delete updatedRecipe.description;
    }

    return updatedRecipe; 
}

export default handleRecipeData; 