import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Loader from "../../ui/Loader";
import { useAuth } from "../../context/authContext";
import api, { setAccessToken } from "../../api/api_utility";
import { useCart } from "../../context/cartContext";

/* ================= Validation schema =================== */
const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

/* ==================Demo Credentials================= */
const DEMO_USER = {
  email: "userexplorer@gmail.com",
  password: "123456",
};


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: DEMO_USER.email,
    password: DEMO_USER.password,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { mergeCartOnLogin } = useCart();

  /* ================= Validate =================== */
  const validate = async () => {
    try {
      await LoginSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const error = err as Yup.ValidationError;
      const formErrors: Record<string, string> = {};
      error.inner.forEach((e) => {
        if (e.path) formErrors[e.path] = e.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  /* ================= Handlers ================== */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Demo autofill (user only)
  const fillDemo = () => {
    setForm({
      email: DEMO_USER.email,
      password: DEMO_USER.password,
    });
    toast.success("Test User credentials loaded 🚀");
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;
    setIsLoading(true);

    try {
      const res = await api.post("/api/v1/user/login", form);
      const { accessToken, user } = res.data?.data || {};
      if (!accessToken || !user) {
        throw new Error("Invalid login response");
      }

      setAccessToken(accessToken);
      setUser(user);
      await mergeCartOnLogin();

      sessionStorage.removeItem("didLogout");
      toast.success(res.data?.message || "Login successful");
      navigate( "/", { replace: true });
      
    } catch (err) {
      const error = err as any;
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate(`/forgot-password/${form.email || "email"}`);
  };

  if (isLoading) return <Loader />;

  /* ====================== UI ====================== */
  return (
    <>

      {/* ================= LOGIN FORM ================= */}
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md mt-6 border border-gray-200 dark:border-gray-700">

          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* DEMO BUTTON */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full border border-dashed border-gray-400 dark:border-gray-600 py-2 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
            >
              ⚡ Use Test Credentials
            </button>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md p-2">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="enter password"
                  className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div
              onClick={handleForgotPassword}
              className="text-sm text-red-500 text-right cursor-pointer hover:underline"
            >
              Forgot password?
            </div>

            {/* LOGIN BUTTON */}
            <button
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold disabled:opacity-60 transition"
            >
              Login
            </button>

            {/* SIGNUP */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-red-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </section>
    </>
  );
};

export default Login;