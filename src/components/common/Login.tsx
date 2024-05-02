

export const Login = () => {
  return (
   
   
   <div className='min-h-screen w-screen grid grid-cols-2 gap-1'>
      <div className="h-full w-full flex items-center justify-center p-4">
        <img src ="frontlogo.png" alt="login" className="h-[420px] w-[680px] " />
      </div>
      <div className="h-full w-full flex flex-col p-4 items-center justify-center bg-gradient-to-t from-[#3DAA4A] gap-8">
          
            <div className="w-fullflex  justify-center">
                <h1 className="font-semibold text-[40px]">Document Tracking System</h1>
              </div>
            <div className="flex w-[510px] h-[607px] bg-white shadow-2xl rounded-lg ">
            <form>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">Email</span>
                  <input type="email" className="peer ..."/>
                  <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                    Please provide a valid email address.
                  </p>
                </label>
</form>



            </div>
      </div>

    </div>
  )
}
