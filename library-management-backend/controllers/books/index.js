var { books } = require('../../utils/booksDataset');
const updateLogs = require('../../utils/logs');

function getBooks(author, genre) {
    //Filter books based on author and genre

    return books.filter((book) =>{
        let authorMatches = true;
        let genreMatches = true;

        if(author){
            authorMatches = book?.author?.toLowerCase().includes(author.toLowerCase())
        }
        if(genre){
            genreMatches = book?.genre?.toLowerCase().includes(genre.toLowerCase())
        }
       
        return genreMatches && authorMatches

    })
}

function addOrUpdateBook(book) {
    const { title, author, isbn, year } = book;

    const duplicateBook = books.find(
        (b) =>
            b.title === title &&
            b.author === author &&
            b.isbn === isbn &&
            b.year === year
    );

    if (duplicateBook) {
        return { message: 'Duplicate book exists', data: duplicateBook };
    }

    const existingIndex = books.findIndex((b) => b.isbn === isbn);
    // If the book already exists for updating

    if (existingIndex > -1) {
        const originalBook = books[existingIndex];
        books[existingIndex] = { ...originalBook, ...book };
        updateLogs.addLog(originalBook, book);
        return { message: 'Book updated successfully', data: books[existingIndex] };
    }

    books.push(book);
    return { message: 'Book added successfully', data: book };
}
module.exports = {
    getBooks,
    addOrUpdateBook
};