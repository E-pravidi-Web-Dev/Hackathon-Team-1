"use client"


import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Users, 
  Package, 
  BarChart3
} from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';


interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeItem = ''
}) => {
  const pathname = usePathname()
  const [active,setActive] = useState(activeItem)
  const router = useRouter()
  const navItems = [
    {
      id: 'quotations',
      label: 'Quotations',
      icon: FileText,
      href: '/customer/quotes'
    },

    {
      id: 'products',
      label: 'Products',
      icon: Package,
      href: '/customer/products'
    },
  ];

  const handleItemClick = (itemId:string, href:string) => {
      router.push(href);
      setActive(itemId)

  };

  useEffect(()=>{
    navItems.map((item)=>{
      if(item.href==pathname){
        setActive(item.id)
      }
    })
  },[])

  

  if(pathname=="/" || pathname=="/customer/login" || pathname=="/customer/signup"){
    return;
  }

  

  return (
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">

        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">QuoteFlow</h1>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id, item.href)}
                    className={`w-full flex cursor-pointer items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

  );
};

export default Sidebar;