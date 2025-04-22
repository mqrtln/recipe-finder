import express from "express";
import dotenv from "dotenv";


dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = 5000; 

app.use(express.json());
// Api implementation
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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
})