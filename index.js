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
    console.log(reviews);

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

app.get("/add", (req, res)=> {
  res.render("edit.ejs");
})

app.get("/api/books/search", async (req, res) => {
    const q = typeof req.query.q === "string"
        ? req.query.q.trim()
        : "";

    if (q.length < 2) {
        return res.json([]);
    }

    if (q.length > 100) {
        return res.status(400).json({
            error: "Search term is too long"
        });
    }

    try {
        const params = new URLSearchParams({
            q: q,
            limit: "10",
            fields: "key,title,author_name,cover_i,cover_edition_key,editions,editions.key"
        });

        const response = await fetch(
            `https://openlibrary.org/search.json?${params}`,
            { signal: AbortSignal.timeout(8000) }
        );

        if (!response.ok) {
            throw new Error("Open Library request failed");
        }

        const data = await response.json();

        const books = data.docs
            .map((book) => {

                // Preferimos o OLID de edição (terminado em M).
                const olid = book.cover_edition_key ||
                    book.editions?.docs?.[0]?.key?.split("/").pop();

                if (!/^OL\d+M$/.test(olid ?? "")) {
                    return null;
                }

                const cover = book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : `https://covers.openlibrary.org/b/olid/${olid}-M.jpg?default=false`;

                return {
                    title: book.title,
                    author: book.author_name?.join(", ") || "Unknown author",
                    olid: olid,
                    cover: cover
                };
            })
            .filter(Boolean);

        res.json(books);

    } catch (error) {
        console.error(error);

        res.status(502).json({
            error: "Could not search Open Library"
        });
    }
});

app.post("/new", async (req, res) => {
    const title = String(req.body.title ?? "").trim();
    const reviewText = String(req.body.text ?? "").trim();
    const rating = String(req.body.rating ?? "");
    const olid = String(req.body.olid ?? "");

    if (
        !title ||
        title.length > 150 ||
        !reviewText ||
        !/^[1-5]$/.test(rating) ||
        !/^OL\d+M$/.test(olid)
    ) {
        return res.status(400).send("Invalid review data");
    }

    try {
        await db.query(
            `INSERT INTO review (title, "text", rating, olid)
             VALUES ($1, $2, $3, $4)`,
            [title, reviewText, Number(rating), olid]
        );

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving review");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});