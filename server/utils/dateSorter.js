function convertToDate(dateString) {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript months are zero-indexed
    const day = parseInt(dateParts[2]);
    return new Date(year, month, day);
}

module.exports = convertToDate;