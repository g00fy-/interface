import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'

import ContractInfoContent from './ContractInfoContent'


export default function ContractInfo() {
  return (
    <PageWrapper>
      <StandardPageContainer title="Contract Info">
        <div className="mt-4">
          <ContractInfoContent />
        </div>
      </StandardPageContainer>
    </PageWrapper>
  )
}
