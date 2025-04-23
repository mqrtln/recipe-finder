import express from "express";
import supabase from "../supabaseClient.js"; // Import the Supabase client

const router = express.Router();

// ADd a new recipe to the favorites list // db
router.post("/favorite", async (req, res) => {
  const {
    title,
    publisher,
    ingredients,
    description,
    image_url,
    source_url,
    original_api_id,
  } = req.body;

  try {
    const { data, error } = await supabase.from("recipes").insert([
      {
        title,
        publisher,
        ingredients,
        description,
        image_url,
        source_url,
        original_api_id,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ success: false, error: "Failed to save recipe" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false }); // Order by created_at in descending order

    if (error) {
      console.error("Supabase fetch error:", error);
      throw error;
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch favorite recipes" });
  }
});

router.delete("/favorite/:id", async (req, res) => {
  const { id } = req.params; // Get the recipe ID from the request parameters

  try {
    const { error } = await supabase.from("recipes").delete().eq("id", id); // Delete the recipe with the specified ID

    if (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }
    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ success: false, error: "Failed to delete recipe" });
  }
});

router.put("/favorite/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, remixed_by } = req.body;

  try {
    const { data, error } = await supabase
      .from("recipes")
      .update({
        title,
        description,
        ingredients,
        remixed_by,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ success: false, error: "Failed to update recipe" });
  }
});

export default router;
