


import Grid from '@tw/Grid'

import PageWrapper from '@layouts/PageWrapper'
import StandardPageContainer from '@layouts/StandardPageContainer'


import AirdropCard from './AirdropCard'







export default function AirdropPage() {


  return (
    <PageWrapper>
      <StandardPageContainer title='Claim'>
        <main className='relative z-0 overflow-y-auto focus:outline-none h-full'>
          <div className='py-6'>
            <Grid
              cols={{ xs: 1 }}
              gap={6}
              className='py-16 justify-center px-2 sm:px-6 md:px-8'
            >
              <div className='place-self-center pb-3'>
                <AirdropCard />
              </div>
            </Grid>
          </div>
        </main>
      </StandardPageContainer>
    </PageWrapper>
  )
}




/**
 * The entire module above was written by someone who is objectively retarded
 * there are probably 1000 ways to implement this better.
 * This is what happens when you think theyll never know that I’m actually just an ape
 * larping as a raccoon larping as a human larping as an ape
 */
