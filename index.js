import pg from'pg';
import express from 'express'
import bodyParser from 'body-parser';
import axios from 'axios';

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'Engeman@2026',
  port: 5432,
});

db.connect();
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM review");
    const reviews = result.rows;

    const updatedReviews = await Promise.all(
      reviews.map(async (review) => {
        try {
          const response = await fetch(
            `https://openlibrary.org/books/${review.olid}.json`
          );

          if (!response.ok) {
            throw new Error("Livro não encontrado");
          }

          const book = await response.json();

          return {
            ...review,
            bookTitle: book.title
          };

        } catch (error) {
          console.error(error);

          return {
            ...review,
            bookTitle: "Título indisponível"
          };
        }
      })
    );

    res.render("index.ejs", { reviews: updatedReviews });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar reviews");
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});