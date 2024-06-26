import Form from "@/components/form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-t-white mx-4 overscroll-contain">
      <div className="z-10 sm:w-full overflow-hidden rounded-2xl border border-t-dark-blue shadow-xl bg-t-dark-blue">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          {/* Logo */}
          <h3 className="text-xl text-t-white font-semibold">Sign In</h3>
          <p className="text-sm text-t-white">
            Use your email and password to sign in
          </p>
        </div>
        <Form type="login" />
      </div>
    </div>
  );
}
