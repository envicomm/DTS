import { LoginForm } from "./Forms/loginForm";
export const Login = () => {
  return (
    <div className="min-h-screen w-screen grid grid-cols-2 gap-1">
      <div className="h-full w-full flex items-center justify-center p-4">
        <img src="frontlogo.png" alt="login" className="h-[420px] w-[680px] " />
      </div>
      <div className="h-full w-full flex flex-col p-4 items-center justify-center bg-gradient-to-t from-[#3DAA4A] gap-8">
        <div className="w-fullflex  justify-center">
          <h1 className="font-semibold text-[40px]">
            Document Tracking System
          </h1>
        </div>
        <div className="flex flex-col w-[510px] h-[607px] bg-white shadow-2xl rounded-lg items-center justify-center p-4">
          <h1 className="font-semibold text-[24px]">Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
