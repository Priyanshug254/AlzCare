// components/ui/input.jsx
export function Input({ value, onChange, placeholder, disabled }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border rounded w-full"
        disabled={disabled}
      />
    )
  }
  