

import Card from "@tw/Card"

import ImageUploader from './ImageUploader'


export default function PfpGeneratorCard() {

  return (
    <Card
      title={
        <>
        To Regain Balance One must Return to Monke
        {" "}
          <div className="float-right"> 🦍 </div>
        </>
      }
      divider={false}
      className={`
        shadow-indigo-xl hover:shadow-purple-2xl
        transform transition-all duration-100 rounded-2xl
        min-w-[380px]
      `}
    >
      <ImageUploader/>
    </Card>
  )
}

