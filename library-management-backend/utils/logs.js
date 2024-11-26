let logs = [];

function addLog(originalBook, updatedBook) {
    const changes = {};

    for (const key in updatedBook) {
        if (originalBook[key] !== updatedBook[key]) {
            changes[key] = { from: originalBook[key], to: updatedBook[key] };
        }
    }

    if (Object.keys(changes).length > 0) {
        logs.push({
            isbn: originalBook.isbn,
            timestamp: new Date(),
            changes,
        });
    }
}

function logUpdates() {
    return logs;
}

module.exports = {
    addLog,
    logUpdates,
};
