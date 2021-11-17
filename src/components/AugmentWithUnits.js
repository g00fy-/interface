
export default function AugmentWithUnits({content, label}) {
  return (
    <div className="text-right">
      {content}
      {" "}
      <span className="text-coolGray-500">
        {label}
      </span>
    </div>
  )
}