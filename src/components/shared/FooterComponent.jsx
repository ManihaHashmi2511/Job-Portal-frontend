import React from "react";
import 'boxicons';
import './style.css';

export default function FooterComponent() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="p-4">
          <h1 className="text-3xl font-bold text-black">
            Job<span className="text-rose-500">Hunt</span>
          </h1>
        </div>
        <div className="p-4">
          <ul className="flex gap-4 text-[18px] font-medium ">
            <li className="pt-2"><a href="#" className="flex justify-center items-center p-1.5  border border-[#1152D1] rounded-[10px] hover:shadow-[0_0_5px_#1152D1] icon-color"><box-icon type='logo' color='#1152D1' name='facebook-circle'></box-icon></a></li>
            <li className="pt-2"><a href="#" className="flex justify-center items-center p-1.5  border border-[#642983] rounded-[10px] hover:shadow-[0_0_5px_#642983] icon-color"><box-icon type='logo' color='#642983' name='github'></box-icon></a></li>
            <li className="pt-2"><a href="#" className="flex justify-center items-center p-1.5  border border-rose-500 rounded-[10px] hover:shadow-[0_0_5px_#EC003F] icon-color"><box-icon type='logo'  color='#EC003F' name='instagram'></box-icon></a></li>
            <li className="pt-2"><a href="#" className="flex justify-center items-center p-1.5  border border-[#000] rounded-[10px] hover:shadow-[0_0_5px_#000] icon-color"><box-icon type='logo' color='#000' name='linkedin-square'></box-icon></a></li>
          </ul>
        </div>
      </div>
      <div className="h-16 w-full text-center border-t border-rose-200">
        <p className="text-center text-rose-500 text-[16px] mt-2.5">
          &copy; 2025 JobHunt. All rights reserved.
        </p>
      </div>
    </div>
  );
}
