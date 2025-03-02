import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex flex-col-reverse items-center justify-between w-full px-8 text-left border-t md:flex-row">
      <div className='flex items-center gap-4'>
        <img src={assets.logo} className='hidden w-12 rounded-full md:block' alt="" />
        <div className='hidden w-px bg-gray-500/60 md:block h-7'></div>
        <p className='py-4 text-xs text-center text-gray-500 md:text-sm'>Copyright 2025 © Ou-Academy All Right Reserved.</p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#"><img src={assets.facebook_icon} alt="" /></a>
        <a href="#"><img src={assets.twitter_icon} alt="" /></a>
        <a href="#"><img src={assets.instagram_icon} alt="" /></a>
      </div>
    </footer>
  );
};

export default Footer;