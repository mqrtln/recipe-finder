import express from "express";
import dotenv from "dotenv";
import recipeRoute from "./routes/recipes.js";

dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = 5000; 

app.use(express.json());


/* API IMPLEMENTATION */

// Search for recipes
app.get("/api/search", async (req, res) => {
     const { query } = req.query; 
     try{
        const response = await fetch(`https://food2fork.ca/api/recipe/search/?page=1&query=${query}`,{ 
        headers: {
            // eslint-disable-next-line no-undef
            Authorization: `Token ${process.env.FOOD2FORK_TOKEN}`, // Use the token from your .env file
        },
     });
     const data = await response.json();

     res.json(data); 
     } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Internal Server Error" });
     }
});

// Get single recipe 
app.get("/api/recipe", async (req, res) => {
    const { id } = req.query;
    const intId = parseInt(id); // Parse the id from the URL parameters
    try { 
        const response = await fetch(`https://food2fork.ca/api/recipe/get/?id=${intId}`, {
            headers: {
                // eslint-disable-next-line no-undef
                Authorization: `Token ${process.env.FOOD2FORK_TOKEN}`, // Use the token from your .env file
            },
        });
        const data = await response.json(); // Parse the response as JSON
        res.json(data); // Send the data back to the client
    } catch (error){
        console.error("Error fetching recipe data:", error); 
        res.status(500).json({ error: "Internal Server Error" });
        
    }
});



app.use('/api', recipeRoute); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
})