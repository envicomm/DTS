import { CircleUserRound, Settings } from "lucide-react"

export const Header =() =>{
    return(

        <div className="flex w-full h-[77px] justify-between ">
            <div className="flex items-center ml-6 ">
                <h1 className="text-green-500 text-[30px]">LOGO</h1>
        </div>
            <div className="flex items-center mr-6">
                <div className="flex justify-center items-center">
                <Settings className="text-green-500 w-[65px] h-[45px]"/>
                <div className="div"></div>
                <h1 className="flex  text-[15px]">John Doe</h1>
                <CircleUserRound className="text-green-500 w-[75px] h-[52px]" />
                </div>
            </div>

        </div>

    )
}