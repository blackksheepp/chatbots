"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Navbar = () => {
  const [menu, setMenu] = useState(false)

  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    if (menu) {
      setMenu(false);
      setTimeout(() => setIsVisible(false), 200); // Matches the duration of your transition
    } else {
      setIsVisible(true);
      setMenu(true);
    }
  };

  useEffect(() => {
    if (menu) {
      setIsVisible(true);
    }
  }, [menu]);
  
  return (
    <nav style={{ border: "1px solid var(--border)", userSelect: "none" }} className={`${menu ? 'h-40 md:h-12' : 'h-12'} py-[8px] transition-all ease-in-out duration-500 w-auto ~mx-5/96 bg-background backdrop-blur-sm mt-7 sticky rounded-lg`}>
      <div className="flex flex-col items-center justify-between">
        <div className={`w-full h-full flex flex-row items-start justify-between`}>
          <ul className="flex flex-row items-center ~gap-1/2 mx-3">
            <li>
              <Image
                src={"/img/logo.svg"}
                alt='logo'
                width={100}
                height={100}
                sizes="100vw"
                className='w-7 h-auto'
              />
            </li>
            <li className="font-[600]">Chatbot</li>
          </ul>

          <ul className="hidden md:flex flex-row py-[6px] ~gap-4/7 ~text-xs/sm">
            <li><button>Our Bots</button></li>
            <li><button>Features</button></li>
            <li><button>Pricing</button></li>
            <li><button>Contact</button></li>
          </ul>
          <div className="flex flex-row items-center justify-center gap-3 mx-3">
            <i onClick={() => setMenu(!menu)} className="ri-menu-4-fill md:hidden text-2xl"></i>
            <ul className="hidden md:flex flex-row ~gap-1/4 ~text-xs/sm">
              <li><button className="bg-secondary text-white ~px-2/3 py-1 rounded">Log in</button></li>
              <li><button className="bg-primary text-bg-solid ~px-2/3 py-1 rounded">Sign up</button></li>
            </ul>
          </div>
        </div>
        <div className="w-full grid place-items-center md:hidden">
          <ul className={`w-[80%] ${menu ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all ease-in delay-200 duration-200 grid grid-cols-2 place-items-center gap-2 py-[10px] text-sm`}>
            <li><button>Our Bots</button></li>
            <li><button>Features</button></li>
            <li><button>Pricing</button></li>
            <li><button>Contact</button></li>
            <li><button className="bg-secondary text-white ~px-2/3 py-1 rounded">Log in</button></li>
            <li><button className="bg-primary text-bg-solid ~px-2/3 py-1 rounded">Sign up</button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar