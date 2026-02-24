export default function Input({
  label,
  value,
  onChange,
  className,
  isPassword,
}) {
  return (
    <>
      <label className="text-gray-900">
        {label}:
        <input
          className={`mb-5 h-10 w-full rounded-sm border-2 border-gray-500 p-1 ${className}`}
          type={isPassword ? 'password' : 'text'}
          name="username"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
      </label>
    </>
  )
}
