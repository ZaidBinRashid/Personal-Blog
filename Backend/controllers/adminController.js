import fs from "fs/promises";
import path from "path";

export const addArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  const id = Date.now().toString();
  const date = new Date().toDateString();
  const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
  const fileName = `${id}_${safeTitle}.txt`;
  const filePath = path.join(process.cwd(), "articles", fileName);

  try {
    // Write the file
    const fileData = `${date}\n${content}`
    await fs.writeFile(filePath, fileData, "utf8");
    return res.status(200).json({
      message: "Article added",
      id,
      title,
      fileName,
      date,
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
    const fileData = await fs.readFile(filePath, "utf8");
    const [date, ...body] = fileData.split("\n");

    const [, ...titleParts] = file.replace(".txt", "").split("_");

    res.json({
      id,
      title: titleParts.join(" "),
      content: body.join("\n"),
      fileName: file,
      date
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const files = await fs.readdir(articlesDir);

    const articles = await Promise.all(
      files
        .filter(file => file.endsWith(".txt"))
        .map(async file => {
          const filePath = path.join(articlesDir, file);

          // read only what's needed
          const fileData = await fs.readFile(filePath, "utf8");
          const [date] = fileData.split("\n");

          const [id, ...titleParts] = file.replace(".txt", "").split("_");

          return {
            id,
            title: titleParts.join(" "),
            fileName: file,
            date
          };
        })
    );

    res.json(articles);
  } catch (err) {
    console.error("Error reading articles:", err);
    res.status(500).send("Error fetching articles");
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
      const files = await fs.readdir(articlesDir);

    // find article file by ID
    const oldFile = files.find(
      f => f.startsWith(`${id}_`) && f.endsWith(".txt")
    );

    if (!oldFile) {
      return res.status(404).json({ error: "Article not found" });
    }

    const oldPath = path.join(articlesDir, oldFile);
    
    // read existing file to keep original date
    const fileData = await fs.readFile(oldPath, "utf8");
    const [date] = fileData.split("\n");

    const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");
    const newFileName = `${id}_${safeTitle}.txt`;
    const newPath = path.join(articlesDir, newFileName);

    // write updated content (keep original date)
    const updatedData = `${date}\n${content}`;
    await fs.writeFile(newPath, updatedData, "utf8");

    // remove old file if name changed
    if (newFileName !== oldFile) {
      await fs.unlink(oldPath);
    }

    res.json({
      message: "Article updated",
      id,
      title,
      fileName: newFileName,
      date
    });
  } catch (err) {
    console.log("Error updating aritcle:", err);
    res.status(500).send("Failed to Update Article");
  }

}