function cosineSimilarity(vectorA:number[], vectorB:number[]):number {

  if(vectorA.length!==vectorB.length) {
    throw new Error('Vector must have the same length')
  }

  // calculate the dot product : A.B
  let dotProduct=0;
  for(let i=0;i<vectorA.length;i++){
    dotProduct+=vectorA[i]*vectorB[i];
  }

  // calculate the magnitude of A: |A|

  let magnitudeA=0;
  for(let i=0; i<vectorA.length; i++){
    magnitudeA=vectorA[i] * vectorA[i]
  }
  magnitudeA=Math.sqrt(magnitudeA);

  // calaculate the magnitude of B: |B|
  let magnitudeB = 0;
  for (let i = 0; i < vectorB.length; i++) {
    magnitudeB += vectorB[i] * vectorB[i];
  }
  magnitudeB = Math.sqrt(magnitudeB);
  

// Avoid division by zero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  // Final cosine similarity
  return dotProduct / (magnitudeA * magnitudeB);
}
