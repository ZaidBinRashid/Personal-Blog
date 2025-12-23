import fs from "fs/promises";
import path from "path";

export const addArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  const id = Date.now().toString();
  const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
  const fileName = `${id}_${safeTitle}.txt`;
  const filePath = path.join(process.cwd(), "articles", fileName);

  try {
    // Write the file
    await fs.writeFile(filePath, content, "utf8");
    return res.status(200).json({
      message: "Article added",
      id,
      title,
      fileName,
    });
  } catch (err) {
    console.error("Error writing file:", err);
    return res.status(500).send("Error writing file");
  }
};

const articlesDir = path.join(process.cwd(), "articles");

export const deleteArticleById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Article ID is required");
  }

  try {
    const files = await fs.readdir(articlesDir);

    const fileToDelete = files.find((file) => file.startsWith(`${id}_`));

    if (!fileToDelete) {
      return res.status(404).send("Article not found");
    }

    await fs.unlink(path.join(articlesDir, fileToDelete));

    return res.status(200).send("Article deleted successfully");
  } catch (err) {
    console.error("Error deleting article:", err);
    return res.status(500).send("Error deleting article");
  }
};

export const getArticlebyId = async (req, res) => {
  const {id} = req.params
  try {
     const files = await fs.readdir(articlesDir);

    // find the file that starts with the ID
    const file = files.find(f => f.startsWith(`${id}_`) && f.endsWith(".txt"));

    if (!file) {
      return res.status(404).json({ error: "Article not found" });
    }

    const filePath = path.join(articlesDir, file);
    const content = await fs.readFile(filePath, "utf8");

    const [, ...titleParts] = file.replace(".txt", "").split("_");

    res.json({
      id,
      title: titleParts.join(" "),
      content,
      fileName: file
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const files = await fs.readdir(articlesDir);

    const articles = files
      .filter(file => file.endsWith(".txt"))
      .map(file => {
        const [id, ...titleParts] = file.replace(".txt", "").split("_");

        return {
          id,
          title: titleParts.join(" "),
          fileName: file
        };
      });

    res.json(articles);
  } catch (err) {
    console.error("Error reading articles:", err);
    res.status(500).send("Error fetching articles");
  }
};

export const updateArticle = async (req, res) => {}