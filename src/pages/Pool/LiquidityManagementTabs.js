import Tabs from '@tw/Tabs'
import TabItem from '@tw/TabItem'

import PlusIcon from '@icons/PlusIcon'
import MinusIcon from '@icons/MinusIcon'



export default function LiquidityManagementTabs({ cardNav, setCardNav }) {
  return (
    <Tabs>
      <TabItem
        isActive={cardNav === 'addLiquidity'}
        onClick={() => {
          setCardNav('addLiquidity')
        }}
      >
        <PlusIcon className='inline-block' />
          Add Liquidity
      </TabItem>
      <TabItem
        isActive={cardNav === 'removeLiquidity'}
        onClick={() => {
          setCardNav('removeLiquidity')
        }}
      >
        <MinusIcon className='inline-block' />
          Remove Liquidity
      </TabItem>
    </Tabs>
  )
}