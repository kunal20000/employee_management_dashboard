import { useState, useEffect } from "react";
import type { Employee } from "~/types/Employee";
import StatusToggle from "./ui/StatusToggle";
import toast from "react-hot-toast";

interface Props {
  onSave: (employee: Employee) => void;
  onCancel: () => void;
  editEmployee?: Employee | null;
}

const EmployeeForm: React.FC<Props> = ({ onSave, onCancel, editEmployee }) => {
  const [employee, setEmployee] = useState<Employee>(
    editEmployee || {
      id: crypto.randomUUID(),
      fullName: "",
      gender: "Male",
      dob: "",
      state: "",
      isActive: true,
      profileImage: "",
    }
  );

  const [preview, setPreview] = useState(employee.profileImage);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Prefill edit mode
  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
      setPreview(editEmployee.profileImage || "");
    }
  }, [editEmployee]);

  // Validation logic
  useEffect(() => {
    const newErrors: { [key: string]: string } = {};
    if (!employee.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!employee.dob) newErrors.dob = "Date of birth is required";
    if (!employee.state.trim()) newErrors.state = "State is required";
    if (!employee.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
  
    const name = target.name;
    const value = target.value;
  
    setEmployee({
      ...employee,
      [name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : value,
    });
  
    setTouched({ ...touched, [name]: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    // Only allow images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    } 
  
    // Max size: 200KB
    if (file.size > 200 * 1024) {
      toast.error("Image must be less than 200KB");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64 = reader.result as string;
  
      setPreview(base64);
  
      setEmployee({
        ...employee,
        profileImage: base64,
      });
    };
  
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isValid) return;
    onSave(employee);
  };

  // Helper: show error only if user has touched or submitted
  const showError = (field: string) =>
    (touched[field] || submitted) && errors[field];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {editEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              name="fullName"
              placeholder="Full Name"
              className={`w-full border p-2 rounded ${
                showError("fullName") ? "border-red-500" : ""
              }`}
              value={employee.fullName}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, fullName: true })}
            />
            {showError("fullName") && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>
          <div>
            <select
              name="gender"
              className={`w-full border p-2 rounded ${
                showError("gender") ? "border-red-500" : ""
              }`}
              value={employee.gender}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, gender: true })}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {showError("gender") && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <input
              type="date"
              name="dob"
              className={`w-full border p-2 rounded ${
                showError("dob") ? "border-red-500" : ""
              }`}
              value={employee.dob}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, dob: true })}
            />
            {showError("dob") && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* State */}
          <div>
            <input
              name="state"
              placeholder="State"
              className={`w-full border p-2 rounded ${
                showError("state") ? "border-red-500" : ""
              }`}
              value={employee.state}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, state: true })}
            />
            {showError("state") && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium">Status:</label>

            <StatusToggle
              checked={employee.isActive}
              onChange={() =>
                setEmployee({
                  ...employee,
                  isActive: !employee.isActive,
                })
              }
            />
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-16 w-16 object-cover rounded-full mt-2 mx-auto"
              />
            )}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded text-white ${
                isValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
