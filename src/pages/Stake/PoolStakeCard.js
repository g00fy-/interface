import { Link } from 'react-router-dom'

import { getPoolUrl } from '@urls'

import StakeCard from '@components/StakeCard'
import LinkButton from '@components/LinkButton'


export default function PoolStakeCard({ token }) {
  const { poolName } = token
  const href = getPoolUrl({ token })
  return (
    <StakeCard
      token={token}
      poolLabel={<JumpToPoolButton poolName={poolName} href={href} />}
      rightContent={<LinkButton href={href} />}
    />
  )
}

function JumpToPoolButton({ poolName, href }) {
  const linkClassName = 'text-gray-900 hover:text-blue-500 dark:text-coolGray-300'

  if (href[0] == '/') {
    return (
      <Link to={href} className={linkClassName}>
        {poolName}
      </Link>
    )
  } else {
    return (
      <a href={href} className={linkClassName} target='_blank'>
        {poolName}
      </a>
    )
  }
}
