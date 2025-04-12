// components/ui/button.jsx
export function Button({ children, onClick, disabled }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {children}
      </button>
    )
  }
  