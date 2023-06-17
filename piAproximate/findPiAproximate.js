const getRandomPoints = (amount, range) => {
    let coordinates = [];
    let coordinatesString = [];
    const getRandomNumber = (range) => {
        return Math.round(Math.random() * range) - 100;
    }
    for (let i = 0; i < amount; i++) {
        coordinatesString.push(`(${getRandomNumber(range)},${getRandomNumber(range)})`);
        coordinates.push([getRandomNumber(range),getRandomNumber(range)])
    }
    return {
        coordString:coordinatesString,
        coordArray:coordinates
    };
}
const isPointInsideCircle = (point, circleRadius) => {
    const Coord_X = point[0];
    const Coord_Y = point[1];
    const Center_X = 0;
    const Center_Y = 0;

    //Find the distance between a given point and the center of the cartesian plane 
    const diff_X = Center_X - Coord_X;
    const diff_Y = Center_Y - Coord_Y;

    let coordDiffPow = Math.pow(diff_X, 2) + Math.pow(diff_Y, 2);
    let Distance_Of_Points = Math.sqrt(coordDiffPow);

    if(Distance_Of_Points <= circleRadius){
        //Point is inside the circle
        return true;
    }else{
        //Point is outside the circle
        return false;
    }
}
const PiAproximation = (coordinatesList, circleRadius, amountOfPoints) => {

    let numberOfPointsInsideCircle = 0;

    for (let i = 0; i < amountOfPoints; i++) {
        const point = coordinatesList[i];
        const checkPoint = isPointInsideCircle(point, circleRadius);

        if(checkPoint == true){
            numberOfPointsInsideCircle++;
        }
    }

    //After finding the number of points inside the circle, divide it by the total number of points
    //Get the result and multiply it by 4, the result should be approximate to PI = 3.14

    const aproximatePi = (numberOfPointsInsideCircle/amountOfPoints)*4
    return aproximatePi;

}
const findPi = () => {
    const fs = require('fs')
    const circleRadius = 100
    const range = circleRadius*2;
    const amountOfPoints = 678;
    const coordinates = getRandomPoints(amountOfPoints,range);
    const aproximatePi = PiAproximation(coordinates.coordArray, circleRadius, amountOfPoints);
    console.log('pi', aproximatePi)


    // console.log('coordinatesString = ', coordinatesString)
    const coordinatesData = coordinates.coordString.join(',');


    fs.writeFile('./milena.txt', coordinatesData, (err) => {
        if(err) throw err;
        console.log('Seu arquivo foi salvo');
        console.log(`A aproximação do Pi resultou em ${aproximatePi}`)
    })
}

findPi()