import React from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './theme/mode-toggles';
import HelloGif from '../assets/hello.gif'
const Navbar = () => {
  return (
    <nav className="p-2">
      <div className="flex justify-between px-2 items-center">
        <div className="text-lg font-semibold">



          <h1>Good to see you again 😊</h1>


        </div>
        <div className='flex items-center gap-2'>
          <p className='text-end'>Made with ❤️ by Atharva Arbat</p>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
