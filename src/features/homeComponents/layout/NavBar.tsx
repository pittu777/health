import React from 'react'
import Logo from "./../../../public/assets/images/log.svg";
import Image from 'next/image';
import appleLogo from "./../../../public/assets/images/apple.svg";
import playStore from "./../../../public/assets/images/playsore.svg";
export const NavBar = () => {
  return (
    <nav className='flex justify-between items-center'>
      <div>

        <Image src={Logo} alt="logo" width={120} height={40} />
      </div>
     
        

        
       
   
       <div>
       <ul className="flex gap-8 font-medium text-black p-2 border rounded-lg">
  {["What’s inside", "Use case", "Metrics", "Smart Assist"].map((item) => (
    <li
      key={item}
      className="relative cursor-pointer px-5 py-3 rounded-lg
                 hover:bg-gray-500"
    >
      {item}
    </li>
  ))}
</ul>


        </div>
        <div className='flex border border-black gap-2'>
        
          <Image src={appleLogo} width={28} height={28} alt="" className='bg-gray-700 rounded-lg'/>
          <Image src={playStore} width={28} height={28} alt="" className='bg-gray-700 rounded-lg'/>
        </div>
    </nav>
  );
};
