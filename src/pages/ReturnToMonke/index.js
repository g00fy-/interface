import Grid from '@tw/Grid'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'


import PfpGeneratorCard from './PfpGeneratorCard'




export default function ReturnToMonkePage() {


  return (
    <PageWrapper>
      <StandardPageContainer title='Generate Synaptic Profile Picture'>
        <main className='relative z-0 overflow-y-auto focus:outline-none h-full'>
          <div className='py-6'>
            <Grid
              cols={{ xs: 1 }}
              gap={6}
              className='py-16 justify-center px-2 sm:px-6 md:px-8'
            >
              <div className='place-self-center pb-3'>
                <PfpGeneratorCard />
              </div>
            </Grid>
          </div>
        </main>
      </StandardPageContainer>
    </PageWrapper>
  )
}

