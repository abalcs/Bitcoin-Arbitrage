const dotSize = (data) => {
    let dot; 

    for(let i = 0; i < data.length; i++) {
        console.log(data[i].profit)
        if(data[i].profit < 150000) {
            dot = 3
        }
        else if(data[i].profit >= 150000 && data[i].profit < 250000) {
            dot = 5
        }
        else if(data[i].profit >= 250000 && data[i].profit <350000) {
            dot = 10
        }
        else {dot = 15}
    }
    console.log(dot)
    return dot
}

module.exports = dotSize;