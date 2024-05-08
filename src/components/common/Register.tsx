export const Register = () =>{
    return(
        <div className="min-h-screen w-screen">
         
            <form>
                <div className="">
                    <label htmlFor="Email">Email</label>
                    <br/>
                    <input type="text" name="Email" id="frame" required maxLength={20}/>
                </div>
                <div className="">
                    <label htmlFor="Password">Password</label>
                    <br/>
                    <input type="password" name="password" placeholder="*" id="frame" required maxLength={15}/>
                </div>
                <div className="">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <br/>
                    <input type="number" name="mobileNumber" id="frame" required maxLength={11}/>
                </div>
                
            </form>
            
        </div>
    );
};