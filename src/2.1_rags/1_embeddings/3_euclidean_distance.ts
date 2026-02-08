function euclideanDistance(vectorA:number[], vectorB:number[]):number{
  if(vectorA.length!==vectorB.length){
    throw new Error('Vectors must have the same length');
  }

  let sumSquareDifference=0;
  for(let i=0;i<vectorA.length;i++){
    const difference=vectorA[i]-vectorB[i];
    sumSquareDifference+=difference*difference;
  }

  return Math.sqrt(sumSquareDifference)
}