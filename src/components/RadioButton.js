
export default function RadioButton({
  checked,
  onChange,
  label,
  className,
  radioClassName,
  labelClassName,
}) {
  return (
    <div className={`group ${className}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className={`
          h-4 w-4
          ${radioClassName ?? 'text-indigo-600'}
          border-0 active:ring-0 focus:ring-0
          focus:outline-none focus:border-0  focus:ring-offset-0

        `}
      />
      <span className={`label pl-2 dark:text-coolGray-500 ${labelClassName}`}>{label}</span>
    </div>
  )
}
