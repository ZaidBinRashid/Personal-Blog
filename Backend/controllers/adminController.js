import { log } from "console";
import fs from "fs/promises";
import path from "path";

export const addArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
  const fileName = `${safeTitle}.txt`;
  const filePath = path.join(process.cwd(), "articles", fileName);

  try {
    // Ensure the folder exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write the file
    await fs.writeFile(filePath, content);

    console.log(`File saved: ${filePath}`);
    return res.status(200).send(`Article saved as: ${fileName}`);
  } catch (err) {
    console.error("Error writing file:", err);
    return res.status(500).send("Error writing file");
  }
};

export const deleteArticle = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send("Title is required");
  }

  const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
  const fileName = `${safeTitle}.txt`;
  const filePath = path.join(process.cwd(), "articles", fileName);

  try {
    await fs.access(filePath); // Ensure file exists
    await fs.unlink(filePath);

    console.log("File deleted successfully");
    return res.status(200).send("Article deleted successfully");
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).send("Article not found");
    }
    console.error("Error deleting file:", err);
    return res.status(500).send("Error deleting file");
  }
};

export const allArticles = async (req, res) => {
  try {
    
  } catch (err) {    
    console.error("Something went wrong!:", err);
    return res.status(500).send("Error Fetching articles");
  }
}