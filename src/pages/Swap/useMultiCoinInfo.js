
/**
   * @param {Token} primaryCoin
   * @param {Token} secondaryCoin
   * @returns {{poolName: string, otherCoin:Token}}
   */
export function getInfoMultiCoin(primaryCoin, secondaryCoin, metapoolTokens, priorityRanking) {
  const { poolName, poolTokens } = getRelevantPool(
    primaryCoin,
    secondaryCoin,
    metapoolTokens,
    priorityRanking
  )


  const coinSymbolsInPool = poolTokens.map(i => i.symbol)

  let otherCoin

  if (coinSymbolsInPool.includes(secondaryCoin.symbol)) {
    otherCoin = secondaryCoin
  } else {
    otherCoin = poolTokens.filter(i => i.symbol != primaryCoin.symbol)[0]
  }

  return ({
    poolName,
    otherCoin
  })
}


/**
 * @param {Token} activeCoin
 * @param {Token} passiveCoin
 * @param {Token[]} metapoolTokens
 * @param priorityRanking
 */
function getRelevantPool(activeCoin, passiveCoin, metapoolTokens, priorityRanking) {
  const coinSymbols = [activeCoin, passiveCoin].map( i => i.symbol)
  const potentialPools = priorityRanking[activeCoin.symbol]

  if (potentialPools.length == 1) {
    return potentialPools[0]
  }

  for (const token of metapoolTokens) {
    if (coinSymbols.includes(token.symbol)) {
      return priorityRanking[token.symbol][0]
    }
  }

  return potentialPools[0]
}

