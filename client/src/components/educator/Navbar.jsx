import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const educatorData = dummyEducatorData
  const {user} = useUser()
  return (
    <div className='flex items-center justify-between px-4 py-3 border-b border-gray-500 md:px-8'>
      <Link to='/educator'>
      <img src={assets.logo} alt="logo" className='w-20 rounded-full lg:w-32' />
      </Link>
      <div className='relative flex items-center gap-5 text-gray-500'>
        <p>Hi {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton/> : <img src={assets.profile_img} alt='profile' className='max-w-8' />}
      </div>
    </div>
  );
};

export default Navbar;