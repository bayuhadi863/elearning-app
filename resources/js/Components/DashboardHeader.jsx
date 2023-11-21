import { useState, React } from 'react';
import { Link } from '@inertiajs/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import Dropdown from '@/Components/Dropdown';
import defaultProfile from '/public/assets/defaultProfile.png';

const DashboardHeader = ({ auth, setSidebarOpen, headerTitle }) => {
  return (
    <header className="p-4 w-full lg:w-5/6 ml-auto">
      <nav
        className={`bg-white rounded-xl shadow-md flex h-16 items-center justify-between px-6`}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <AiOutlineMenu className="lg:hidden" />
          </button>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600">
            {headerTitle}
          </p>
        </div>

        <div className="sm:flex sm:items-center sm:ml-6">
          <div className="ml-3 relative">
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                  >
                    <img
                      src={
                        auth.user.profile_picture
                          ? `/profile_picture/${auth.user.profile_picture}`
                          : defaultProfile
                      }
                      alt="logo"
                      className="h-8 w-8 rounded-full object-cover"
                    />

                    <svg
                      className="ml-2 -mr-0.5 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </Dropdown.Trigger>

              <Dropdown.Content>
                <p className="p-2 text-gray-900 text-center text-sm border-b border-gray-600">
                  {auth.user.name}
                </p>
                <Dropdown.Link
                  href={route(
                    auth.user.role === 'admin'
                      ? 'adminProfile.show'
                      : auth.user.role === 'teacher'
                      ? 'teacherProfile.index'
                      : 'studentProfile.show'
                  )}
                >
                  <AiOutlineUser />
                  Profile
                </Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button">
                  <BiLogOutCircle />
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
