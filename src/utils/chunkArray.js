// chunks array into chunks of maximum size
// evenly distributes items among the chunks
export function chunkArray(items, maxChunkSize) {
  if (maxChunkSize < 1) {
    throw new Error('maxChunkSize must be gte 1')
  }

  if (items.length <= maxChunkSize) {
    return [items]
  }

  const numChunks = Math.ceil(items.length / maxChunkSize)
  const chunkSize = Math.ceil(items.length / numChunks)

  return [...Array(numChunks).keys()].map((ix) => items.slice(ix * chunkSize, ix * chunkSize + chunkSize))
}

// const CONSERVATIVE_BLOCK_GAS_LIMIT = 10000000 // conservative, hard-coded estimate of the current block gas limit
// export const DEFAULT_GAS_REQUIRED = 200000 // the default value for calls that don't specify gasRequired

// // chunks array into chunks
// // evenly distributes items among the chunks
// export function chunkArray(items, gasLimit = CONSERVATIVE_BLOCK_GAS_LIMIT * 10) {
//   const chunks = []
//   let currentChunk = []
//   let currentChunkCumulativeGas = 0

//   for (let i = 0; i < items.length; i++) {
//     const item = items[i]

//     // calculate the gas required by the current item
//     const gasRequired = item?.gasRequired ?? DEFAULT_GAS_REQUIRED

//     // if the current chunk is empty, or the current item wouldn't push it over the gas limit,
//     // append the current item and increment the cumulative gas
//     if (currentChunk.length === 0 || currentChunkCumulativeGas + gasRequired < gasLimit) {
//       currentChunk.push(item)
//       currentChunkCumulativeGas += gasRequired
//     } else {
//       // otherwise, push the current chunk and create a new chunk
//       chunks.push(currentChunk)
//       currentChunk = [item]
//       currentChunkCumulativeGas = gasRequired
//     }
//   }
//   if (currentChunk.length > 0) chunks.push(currentChunk)

//   return chunks
// }