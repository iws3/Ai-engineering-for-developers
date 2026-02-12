/**
 * This is the simplest chunking strategy: split text into fixed-size pieces
 * with some overlap between consecutive chunks.
 * 
 * Why overlap? If an important concept spans the boundary between chunks,
 * the overlap ensures both chunks capture some of that concept.
 */


interface Chunk {
    text:string;
    startIndex:number;
    endIndex:number;
    chunkNumber:number;
}


function fixedSizeChunking(text:string, chunkSize:number, overlapSize:number):Chunk[]{

    const chunks:Chunk[]=[];

    // split text into words (simple tokenization)
    const words=text.split(/\s+/);
    let chunkNumber=0;
    let currentIndex=0;

    while(currentIndex< words.length) {
        const chunkWords=words.slice(currentIndex, currentIndex+chunkSize);

        const chunkText=chunkWords.join(' ');

        chunks.push({
            text:chunkText,
            startIndex:currentIndex,
            endIndex:currentIndex + chunkWords.length,
            chunkNumber:chunkNumber++
        })

        // Move forward by (chunksize - overlapp) words
        // This creates the overlapp between consecutive
        currentIndex+=chunkSize-overlapSize;


    }

    return {}
}