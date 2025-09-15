"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CogIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Patients", href: "/patients", icon: UsersIcon },
  { name: "Appointments", href: "/appointments", icon: CalendarIcon },
  { name: "Clinical", href: "/clinical", icon: HeartIcon },
  { name: "Billing", href: "/billing", icon: CreditCardIcon },
  { name: "Reports", href: "/reports", icon: DocumentTextIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
                <SidebarContent />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-xl">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex items-center space-x-3">
          <div className="medical-gradient rounded-lg p-2">
            <HeartIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">EHR Dashboard</h1>
            <p className="text-sm text-gray-500">Healthcare Integration</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-medical-primary text-white"
                        : "text-gray-700 hover:text-medical-primary hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
                    )}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href
                          ? "text-white"
                          : "text-gray-400 group-hover:text-medical-primary",
                        "h-6 w-6 shrink-0"
                      )}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
