const express = require("express");
const router = express.Router();
let books = [
  {
    ISBN: "9780451524935",
    Author: "George Orwell",
    Title: "1984",
    Reviews: [
      {
        Reviewer: "Alice Johnson",
        Rating: 5,
        Comment:
          "A chilling and thought-provoking masterpiece about surveillance and authoritarianism.",
      },
      {
        Reviewer: "John Smith",
        Rating: 4,
        Comment: "Brilliantly written, though some parts feel slightly dated.",
      },
    ],
  },
  {
    ISBN: "9780062316110",
    Author: "Harper Lee",
    Title: "To Kill a Mockingbird",
    Reviews: [
      {
        Reviewer: "Emily Clark",
        Rating: 5,
        Comment:
          "An essential read for its heartfelt narrative and powerful themes of justice.",
      },
      {
        Reviewer: "Mark Davis",
        Rating: 4.5,
        Comment:
          "A poignant exploration of race and morality in the American South.",
      },
    ],
  },
  {
    ISBN: "9780316769488",
    Author: "J.D. Salinger",
    Title: "The Catcher in the Rye",
    Reviews: [
      {
        Reviewer: "Sophia Brown",
        Rating: 4,
        Comment: "A captivating portrayal of teenage angst and rebellion.",
      },
      {
        Reviewer: "Ethan Martinez",
        Rating: 3.5,
        Comment:
          "While engaging, the protagonist’s cynicism can be overwhelming.",
      },
    ],
  },
  {
    ISBN: "9780316769501",
    Author: "J.D. Salinger",
    Title: "Nine Stories",
    Reviews: [
      {
        Reviewer: "Liam Harper",
        Rating: 4.5,
        Comment:
          "A brilliant collection of short stories that showcase Salinger's unique style.",
      },
      {
        Reviewer: "Olivia Taylor",
        Rating: 4,
        Comment:
          "Each story is a gem, offering a mix of humor, melancholy, and insight.",
      },
    ],
  },
];

router.get("/", (req, res) => {
  res.send(books);
});

router.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered = books.filter((val) => {
    return val.ISBN === isbn;
  });
  res.send(filtered);
});

router.get("/author/:author", (req, res) => {
  const author = req.params.author;
  let filtered = books.filter((val) => {
    return val.Author === author;
  });
  res.send(filtered);
});

router.get("/title/:title", (req, res) => {
  const title = req.params.title;
  let filtered = books.filter((val) => {
    return val.Title === title;
  });
  res.send(filtered);
});

router.get("/title/:title/review", (req, res) => {
  const title = req.params.title;
  let filtered = books.filter((val) => {
    return val.Title === title;
  });
  let reviews = []
  filtered.forEach(val=>{
    reviews.push(val.Reviews)
  })
  res.send(reviews);
});
module.exports = router;
