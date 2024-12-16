'use client';
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const DropdownContext = createContext();

function useDropdown() {
  const context = useContext(DropdownContext);

  if (context === undefined)
    throw new Error('DropdownContext was used outside of the DropdownProvider');

  return context;
}

function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>{children}</DropdownContext.Provider>
  );
}

function DropdownTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen, setIsOpen } = useDropdown();
  return (
    <button onClick={() => setIsOpen(cur => !cur)} className={className}>
      {children}
    </button>
  );
}

function DropdownContent({ children, className }: { children: ReactNode; className?: string }) {
  const { isOpen } = useDropdown();

  if (isOpen) return <div className={twMerge('', className)}>{children}</div>;
}

export { Dropdown, DropdownContent, DropdownTrigger, useDropdown };
