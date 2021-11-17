import Card from '@tw/Card'




export default function StatCard({ label, content, IconComponent }) {
  return (
    <Card className="mt-0 sm:mt-4 md:mt-6 bg-gradient-to-b from-coolGray-900 to-coolGray-800 shadow-indigo-xl pt-5 pr-3 pl-4 sm:pr-6 sm:pl-4 pb-5 sm:pb-6 opacity-90">
      <div>
        <div className="hidden lg:inline-block h-full w-12 pb-4 ">
        <IconComponent className="h-8 w-8 text-indigo-200 " />
        </div>
        <div className="inline-block ">
          <dd className="text-4xl font-bold text-white">
            {content}
          </dd>
          <dt className="mt-2 text-lg leading-6 font-medium text-indigo-400">{label}</dt>
        </div>
      </div>
    </Card>
  )
}

