import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'

import PortfolioContent from './PortfolioContent'


export default function Portfolio() {
  return (
    <PageWrapper>
      <StandardPageContainer title='Portfolio'>
        <div className='mt-4'>
          <PortfolioContent />
        </div>
      </StandardPageContainer>
    </PageWrapper>
  )
}
