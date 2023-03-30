
const dateFormatter = (date) => {
    const newDate = new Date(date);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);

    return formattedDate
}

module.exports = dateFormatter;