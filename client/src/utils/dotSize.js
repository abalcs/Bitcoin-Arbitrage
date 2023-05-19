const dotSize = (data) => {
    // let dot; 

    // for(let i = 0; i < data.length; i++) {
    //     // console.log(data[i].profit)
    //     if(data[i].profit < 150000) {
    //         dot = 3
    //     }
    //     else if(data[i].profit >= 150000 && data[i].profit < 250000) {
    //         dot = 5
    //     }
    //     else if(data[i].profit >= 250000 && data[i].profit <350000) {
    //         dot = 10
    //     }
    //     else {dot = 15}
    // }

    let dot = {}

      for(let i = 0; i < data.length; i++) {
        // console.log(data[i].profit)
        if(dot[i].date === data[i].date && data[i].profit < 150000) {
            dot[i].r = 3
        }
        else if(dot[i].date === data[i].date && data[i].profit >= 150000 && data[i].profit < 250000) {
            dot[i].r = 5
        }
        else if(dot[i].date === data[i].date && data[i].profit >= 250000 && data[i].profit <350000) {
            dot[i].r = 10
        }
        else {dot[i].r = 15}
    }

    return dot
}

module.exports = dotSize;