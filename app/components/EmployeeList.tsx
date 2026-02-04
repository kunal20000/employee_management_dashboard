import type { Employee } from "~/types/Employee";
import StatusToggle from "./ui/StatusToggle";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlinePrinter } from "react-icons/hi";
import toast from "react-hot-toast";

interface Props {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const EmployeeList: React.FC<Props> = ({
  employees,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const printList = () => window.print();

  if (employees.length === 0)
    return (
      <p className="text-center mt-5 text-gray-600">No employees found.</p>
    );

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th>Employee ID</th>
            <th className="p-2">Profile Image</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Gender</th>
            <th className="p-2">DOB</th>
            <th className="p-2">State</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-2 text-center">
                <div className="w-24 truncate mx-auto">{emp.id}</div>
              </td>
              <td className="p-2 text-center">
                <img
                  src={emp.profileImage}
                  alt=""
                  className="h-10 w-10 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 text-center capitalize">{emp.fullName}</td>
              <td className="p-2 text-center">{emp.gender}</td>
              <td className="p-2 text-center">{emp.dob}</td>
              <td className="p-2 text-center">{emp.state}</td>
              <td className="p-2 text-center">
                <StatusToggle
                  checked={emp.isActive}
                  onChange={() => onToggle(emp.id)}
                />
              </td>
              <td className="p-2 space-x-2 text-center">
                <button onClick={() => onEdit(emp)} className="text-blue-600">
                  <BiEditAlt size={20} />
                </button>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="text-red-600"
                >
                  <MdDeleteOutline size={20} />
                </button>
                <button onClick={printList} className="text-blue-600">
                  <HiOutlinePrinter size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
