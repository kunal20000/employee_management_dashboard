import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import FormInput from "~/components/ui/Input";
import { login, isLoggedIn } from "~/utils/localStorageHelpers";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) navigate("/dashboard");
  }, [navigate]);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (email === "admin@example.com" && password === "1234") {
      login();
    
      toast.success("Login successful! Welcome 👋");
    
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#374151]">
      <div className="bg-white w-3/4 h-[80vh]  lg:grid lg:grid-cols-2 gap-5 rounded-xl shadow">
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col p-6 justify-center"
          noValidate
        >
          <h1 className="text-center text-2xl font-semibold">Welocome</h1>
          <h2 className="text-xl font-bold mb-6 text-center text-blue-700">
            Employee Dashboard Login
          </h2>

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-2"
          >
            Login
          </button>
          <p className="text-gray-500 text-xs mt-3 text-center">
            Demo Credentials: admin@example.com / 1234
          </p>
        </form>
        <div className="h-full w-full hidden rounded-r-xl lg:block overflow-hidden">
          <img
            src="/images/1.jpg"
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
