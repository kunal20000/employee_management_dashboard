import { useEffect, useState } from "react";
import Header from "../components/Header";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import {
  getEmployees,
  isLoggedIn,
  saveEmployees,
} from "../utils/localStorageHelpers";
import type { Employee } from "~/types/Employee";
import { useNavigate } from "react-router";
import Loader from "~/components/ui/Loader";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>(getEmployees());
  const [showForm, setShowForm] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, genderFilter, statusFilter]);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  const activeCount = employees.filter((e) => e.isActive).length;
  const inactiveCount = employees.filter((e) => !e.isActive).length;

  const handleSave = (emp: Employee) => {
    if (editEmp) {
      setEmployees(employees.map((e) => (e.id === emp.id ? emp : e)));
  
      toast.success("Employee updated successfully!");
    } else {
      setEmployees([...employees, emp]);
  
      toast.success("Employee added successfully!");
    }
  
    setShowForm(false);
    setEditEmp(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
  
      toast.success("Employee deleted successfully!");
    }
  };
 const toggleStatus = (id: string) => {
  const emp = employees.find((e) => e.id === id);

  if (!emp) return;

  // Show toast ONCE
  toast.success(
    emp.isActive ? "Employee set to Inactive" : "Employee set to Active"
  );

  // Update state
  setEmployees((prev) =>
    prev.map((e) =>
      e.id === id ? { ...e, isActive: !e.isActive } : e
    )
  );
};


  const filtered = employees.filter((emp) => {
    const matchName = emp.fullName.toLowerCase().includes(search.toLowerCase());

    const matchGender = genderFilter === "all" || emp.gender === genderFilter;

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && emp.isActive) ||
      (statusFilter === "inactive" && !emp.isActive);

    return matchName && matchGender && matchStatus;
  });
  return (
    <div className="">
      <Header />
      <div className="p-6">
        <section className="flex gap-4">
          <h1 className="text-xl mb-3 font-semibold">
            Total Number of Employees: {employees.length}{" "}
          </h1>
          <h1 className="text-xl font-medium">Active: {activeCount}</h1>
          <h1 className="text-xl mb-3 font-medium">
            Inactive: {inactiveCount}
          </h1>
        </section>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <input
            placeholder="Search by name"
            className="border p-2 rounded w-full md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={() => {
              setEditEmp(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <EmployeeList
            employees={filtered}
            onEdit={(emp) => {
              setEditEmp(emp);
              setShowForm(true);
            }}
            onDelete={handleDelete}
            onToggle={toggleStatus}
          />
        )}
        {showForm && (
          <EmployeeForm
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
            editEmployee={editEmp}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
