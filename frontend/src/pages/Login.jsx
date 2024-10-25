import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSpring, animated, config } from "react-spring";
import { Mail, Lock, User, EyeOff, Eye, Loader2 } from "lucide-react";
import { assets } from "../assets/assets";

const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.gentle,
  });

  return (
    <animated.div className="w-full relative mb-4" style={inputAnimation}>
      <Icon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </animated.div>
  );
};

const LoadingSpinner = () => (
  <Loader2 className="animate-spin items-center" size={20} />
);



const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: config.gentle,
  });

  const switchAnimation = useSpring({
    transform: state === "Sign Up" ? "translateX(0%)" : "translateX(100%)",
    config: config.wobbly,
  });


    const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          
          toast.success("Account Created Successfully!");
        } else {
          toast.error(data.message);
          setIsLoading(false);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setIsLoading(false)
          toast.success("Welcome Back!");
        } else {
          toast.error(data.message);
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={assets.bg3}
          className="w-full h-full object-cover"
          alt="background"
          style={{
            objectPosition: "center",
            filter: "brightness(0.9)", // Optional: slightly dim the background
          }}
        />
        {/* Optional overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content Container */}
      <animated.div
        style={formAnimation}
        className="bg-black/5 backdrop-blur-sm p-4 sm:p-8 rounded-xl shadow-2xl w-[95%] max-w-md relative z-10 mx-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-300">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-400 mb-6 sm:mb-8">
          {state === "Sign Up"
            ? "Join us to book your appointments easily"
            : "Login to access your account"}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <InputField
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <InputField
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2.5 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
              </>
            ) : state === "Sign Up" ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {state === "Sign Up" ? "Already have an account?" : "New here?"}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            disabled={isLoading}
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="disabled:text-gray-400 disabled:cursor-not-allowed text-primary hover:text-primary-dark transition-colors duration-300"
          >
            {state === "Sign Up" ? "Login" : "Create an account"}
          </button>
        </div>

        <animated.div
          style={switchAnimation}
          className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary"
        ></animated.div>
      </animated.div>
    </div>
  );
};

export default Login;
