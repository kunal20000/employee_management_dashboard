interface Props {
    checked: boolean;
    onChange: () => void;
    label?: string;
  }
  
  const StatusToggle: React.FC<Props> = ({
    checked,
    onChange,
    label,
  }) => {
    return (
      <div className="flex items-center gap-2">
        {label && <span className="font-medium">{label}</span>}
  
        <button
          type="button"
          onClick={onChange}
          className={`relative inline-flex h-6 w-12 rounded-full transition-colors ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow transition-transform ${
              checked ? "translate-x-6" : ""
            }`}
          />
        </button>
  
        <span className="text-sm text-gray-600">
          {checked ? "Active" : "Inactive"}
        </span>
      </div>
    );
  };
  
  export default StatusToggle;
  