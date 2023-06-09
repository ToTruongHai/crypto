"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  userInfo: {};
  handleLogout: () => {} | void;
};

const UserInterface = ({ userInfo, handleLogout }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        cy-profile="user"
        className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-300 hover:bg-gray-400 focus:outline-none"
        onClick={toggleDropdown}
      >
        <svg
          className="h-6 w-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M3 3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3zm2-1h14a1 1 0 0 1 1 1v1H4V3a1 1 0 0 1 1-1zm1.5 9a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zM9 11a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7zm6 0a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7z"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-color border border-secondary-color rounded shadow-lg">
          <ul>
            <li className="hover:text-secondary-color">
              <Link
                href={`/profile/${userInfo}`}
                className="px-4 py-2 block w-full h-full"
              >
                User Profile
              </Link>
            </li>
            <li className="hover:text-secondary-color">
              <Link href="/wallet" className="px-4 py-2 block w-full h-full">
                Wallet
              </Link>
            </li>
            <li className="hover:text-secondary-color">
              <Link
                href="#"
                onClick={handleLogout}
                className=" px-4 py-2 block w-full h-full"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
