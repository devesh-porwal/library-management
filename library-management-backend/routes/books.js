var express = require('express');
var router = express.Router();
const { addOrUpdateBook, getBooks } = require('../controllers/books');
const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  isbn: Joi.string().min(1).required(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  genre: Joi.string().required(),
});

router.get('/', function(req, res, next) {
    const { author, genre } = req.query;
    const books = getBooks(author, genre);
    res.status(200).json(books)
});
  
router.post('/', (req, res) => {
    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    const { title, author, isbn, year, genre } = req.body;

    if (!title || !author || !isbn || !year) {
        return res.status(400).send({ error: 'Title, Author, ISBN, and Year are required fields.' });
    }

    const result = addOrUpdateBook({ title, author, isbn, year, genre });
    res.send(result);
});
  
module.exports = router;
