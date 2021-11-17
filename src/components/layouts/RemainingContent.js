import Grid from '@tw/Grid'





export default function RemainingContent({ title, subtitle, description, children}) {
  return (
    <Grid
      cols={{ xs: 1 }}
      gap={6}
      className='py-3 justify-center px-2 sm:px-6 md:px-8'
    >
      <div className='px-4'>
        <div className='flex flex-col my-6 text-center'>
          <div className="inline-block">
            <span
              className={`
                text-default font-medium text-2xl lg:text-3xl
                dark:bg-clip-text dark:bg-gradient-to-r
                dark:from-purple-600 dark:to-blue-600
                dark:text-transparent
              `}
            >
              {title}
            </span>
          </div>
          <p className='mt-5 max-w-prose mx-auto text-lg text-coolGray-700 dark:text-coolGray-500'>
            {subtitle}
          </p>
          <p className='mt-2 max-w-prose mx-auto text-coolGray-500 dark:text-coolGray-600'>
            {description}
          </p>
          <Grid cols={{ xs: 1 }} gap={2}>
            <div className='place-self-center'>
              {children}
            </div>
          </Grid>
        </div>
      </div>
    </Grid>
  )
}
