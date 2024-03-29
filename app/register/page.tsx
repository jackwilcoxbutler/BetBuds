import Form from "@/components/form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-t-white">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-t-dark-blue shadow-xl bg-t-dark-blue">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          {/* Logo */}
          <h3 className="text-xl text-t-white font-semibold">Sign Up</h3>
          <p className="text-sm text-t-white">
           Create an account with your email and password
          </p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
} 
