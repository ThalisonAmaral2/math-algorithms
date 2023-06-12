let firstInteger = 12;
let secondInteger = 30;

const GCD = (firstInteger, secondInteger) => {
    const findFactors = (integer) => {
      const factors = [];
      let divisor = 2;
      while (integer > 1) {
        if (integer % divisor === 0) {
          factors.push(divisor);
          integer /= divisor;
        } else {
          divisor++;
        }
      }
      return factors;
    };
    const getCommonFactors = (firstList, secondList) => {
        const secondSet = new Set(secondList);
        const foundValuesSet = new Set(firstList.filter((value) => secondSet.has(value)));
        return [...foundValuesSet];
    };
  
    const firstFactors = findFactors(firstInteger);
    const secondFactors = findFactors(secondInteger);
    const commonFactors =  getCommonFactors(firstFactors, secondFactors);
  
    return commonFactors.reduce((total, factor) => total * factor, 1);
};

let greatestCommonDivisor = GCD(firstInteger, secondInteger);
console.log(`The greatest common divisor between ${firstInteger} and ${secondInteger} is ${greatestCommonDivisor}`);
  