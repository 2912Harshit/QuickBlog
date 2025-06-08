import React, { useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { setInput } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef();

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setInput(searchTerm.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, setInput]);

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className='w-2.5' alt="" />
        </div>
        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
          Your own <span className='text-primary'>blogging</span><br /> platform.
        </h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts here.
        </p>

        {/* Debounced Search */}
        <div className='flex justify-center'>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for blogs'
            className='w-full max-w-lg px-4 py-3 text-gray-700 border border-gray-300 rounded-full shadow-sm focus:ring-primary focus:border-primary outline-none transition-all duration-300'
          />
        </div>
      </div>

      <img src={assets.gradientBackground} alt="gradientBackground" className='absolute -top-50 -z-1 opacity-50' />
    </div>
  );
};

export default Header;
