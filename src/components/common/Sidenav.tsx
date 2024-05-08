import { ClipboardList, LayoutDashboard, UsersRound } from "lucide-react";
import { useState } from "react";

export const SideNav = () => {
    const [showItems, setShowItems] = useState(false);
    
    return (
        <div className="flex w-[298px] h-screen bg-green-500 justify-center">
            <div className="flex flex-col mt-24">
                <h1 className="flex items-center font-semibold text-[22px] p-8 cursor-pointer transform hover:scale-105 transition-transform">
                    <LayoutDashboard className="w-[50px] h-[40px]" />
                    Dashboard
                </h1>
                <h2 className="flex items-center font-semibold text-[22px] p-8 cursor-pointer transform hover:scale-105 transition-transform" onClick={() => setShowItems(!showItems)}>
                    <ClipboardList className="w-[50px] h-[40px]" />
                    Tracking
                </h2>
                {showItems && (
                    <div className="overflow-hidden transition-height ease-in-out duration-800">
                        <div className="flex flex-col items-center">
                            <p className="text-[22px] font-semibold p-2">Search</p>
                            <p className="text-[22px] font-semibold p-2">inbox</p>
                        </div>
                    </div>
                )}
                <h3 className="flex items-center font-semibold text-[22px] p-8 cursor-pointer transform hover:scale-105 transition-transform">
                    <UsersRound className="w-[50px] h-[40px]" />
                    User
                </h3>
            </div>
        </div>
    );
};
