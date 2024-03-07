import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem"
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPerson, IoPersonOutline, IoTodayOutline } from "react-icons/io5"
import { BiCookie, BiLogoProductHunt } from "react-icons/bi"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect, useRouter } from 'next/navigation';
import { LogOutButton } from "./LogOutButton"



const menuItem = [
  {
    icon: <IoCalendarOutline size={25} />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline size={25} />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoTodayOutline size={25} />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <BiCookie size={25} />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <BiLogoProductHunt size={25} />,
    title: 'Products',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline size={25} />,
    title: 'Profile',
    path: '/dashboard/profile'
  },
]

export const Sidebar = async () => {


  const session = await getServerSession(authOptions);


  const sessionImg = session?.user?.image
    ? session.user.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  const sessionName = session?.user?.name ?? "No Name"
  const userRoles = session?.user?.roles ?? ['client']


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">

          <Link href="/dashboard" title="home">

            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" height={50} width={50} className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">

          <Image src={sessionImg} alt="user_image" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={150} height={150} />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{sessionName}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItem.map(menu => (

              <SidebarItem key={menu.path} {...menu} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogOutButton />
      </div>
    </aside>
  )
}
