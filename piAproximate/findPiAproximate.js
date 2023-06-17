const getRandomPoints = (amount, range, circleRadius) => {
    let coordinates = [];
    let coordinatesString = [];
    const getRandomNumber = (range) => {
        return Math.round(Math.random() * range) - circleRadius;
    }
    for (let i = 0; i < amount; i++) {
        const pointX = getRandomNumber(range);
        const pointY = getRandomNumber(range)

        coordinatesString.push(`(${pointX},${pointY})`);
        coordinates.push([pointX,pointY])
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
const logPoints = (coordinates) => {
    const fs = require('fs')
    const path = require('path')

    // console.log('coordinatesString = ', coordinatesString)
    const coordinatesData = coordinates.coordString.join(',');

    const directory = path.join(__dirname, './logPoints.txt')

    fs.writeFile(directory, coordinatesData, (err) => {
        if(err) throw err;
        console.log(`Seu arquivo log foi salvo em: ${directory}`);
        console.log(` 
    Instruções:
1 - Vá para https://www.desmos.com/calculator
2 - Copie a equação 'x^{2}+y^{2}=r^{2}' (sem as aspas) e cole na calculadora desmos, um circulo será gerado
3 - Defina o Raio correto para o Circulo
4 - Copie todo o texto gerado no log e cole na calculadora Desmos, todos os pontos serão visualizados

A aproximação do Pi deu ${aproximatePi}
`);
    })

}

// Defina as proporções abaixo
const circleRadius = 100
const amountOfPoints = 678;
// Defina as proporções acima


const range = circleRadius*2;
const coordinates = getRandomPoints(amountOfPoints,range, circleRadius);
const aproximatePi = PiAproximation(coordinates.coordArray, circleRadius, amountOfPoints);
logPoints(coordinates.coordString)