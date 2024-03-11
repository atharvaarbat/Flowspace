import React from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '@/assets/logo-dark.svg';
import LogoLight from '@/assets/logo-light.svg';
import { Heart, HomeIcon, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation().pathname
    console.log(location)
    return (
        <div className="sm:w-[20vw]  dark:text-white border-r">
            <div className="p-5 ">
                <img src={LogoDark} alt="Logo" className="w-40 dark:hidden block" />
                <img src={LogoLight} alt="Logo" className="w-40 hidden dark:block" />
            </div>

            <div className="flex flex-col p-3 gap-2">
                <Link to="/" className={`flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#19191F] ${location == '/' ? 'bg-gray-100 dark:bg-[#19191F]':null} p-2 px-5 rounded-lg`}>
                    <div className='flex gap-2 items-center'>
                        <HomeIcon className='w-5 h-5' color='#5057FF' />
                        <span>Dashboard</span>
                    </div>
                    {/* <p className='text-[#8B8B8B] text-sm'>(12)</p> */}
                </Link>
                <Link to="/favourites" className={`flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#19191F] ${location == '/favourites' ? 'bg-gray-100 dark:bg-[#19191F]':null} p-2 px-5 rounded-lg`}>
                    <div className='flex gap-2 items-center'>
                        <Heart className='w-5 h-5' color='#5057FF' />
                        <span>Favourites</span>
                    </div>
                    {/* <p className='text-[#8B8B8B] text-sm'>(12)</p> */}
                </Link>
                <Link to="/trash" className={`flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#19191F] ${location == '/trash' ? 'bg-gray-100 dark:bg-[#19191F]':null} p-2 px-5 rounded-lg`}>
                    <div className='flex gap-2 items-center'>
                        <Trash2 className='w-5 h-5' color='#5057FF' />
                        <span>Trash</span>
                    </div>
                    {/* <p className='text-[#8B8B8B] text-sm'>(12)</p> */}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
