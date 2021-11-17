import Card from '@tw/Card'
import InfoSection from '@components/InfoSection'


export default function InfoSectionCard({title, children}) {
  return (
    <Card
      title={
        <small>
          {title}
        </small>
      }
      className="pt-3 pb-3 pr-4 pl-4 rounded-2xl"
      titleClassName="-mt-2"
      divider={false}
    >
      <InfoSection
        showDivider={true}
        showOutline={false}
        className="-my-2 -mx-2.5 "
      >
        {children}
      </InfoSection>
    </Card>
  )
}