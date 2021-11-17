import LoadingSpinner from '@components/LoadingSpinner'






export default function ButtonLoadingSpinner({className}) {
  return (
    <LoadingSpinner className={`!text-coolGray-50 opacity-50 ${className}`} />
  )
}