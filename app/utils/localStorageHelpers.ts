// app/utils/localStorageHelpers.ts
import type { Employee } from "~/types/Employee";

const EMP_KEY = "employees";
const LOGIN_KEY = "isLoggedIn";

// Get Employees
export const getEmployees = (): Employee[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(EMP_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading employees:", error);
    return [];
  }
};

// Save Employees (Optimized)
export const saveEmployees = (employees: Employee[]) => {
  if (typeof window === "undefined") return;

  try {
    // Remove large base64 images
    const optimized = employees.map((emp) => ({
      ...emp,
      profileImage:
        emp.profileImage?.startsWith("data:image") ? "" : emp.profileImage,
    }));

    localStorage.setItem(EMP_KEY, JSON.stringify(optimized));
  } catch (error) {
    console.error("Storage quota exceeded:", error);

    alert(
      "Storage limit exceeded. Please delete some employees or use smaller images."
    );
  }
};

// Check Login
export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(LOGIN_KEY) === "true";
};

// Login
export const login = () => {
  if (typeof window === "undefined") return;

  localStorage.setItem(LOGIN_KEY, "true");
};

// Logout
export const logout = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(LOGIN_KEY);
};
