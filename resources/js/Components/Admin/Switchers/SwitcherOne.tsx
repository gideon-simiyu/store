import { useState } from "react";

interface SwitcherOneProps {
  id: string;
  checked?: boolean;
  itemChange: () => void;
  label: string | null;
}

const SwitcherOne = ({ id, checked, itemChange, label }: SwitcherOneProps) => {

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            onChange={itemChange}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              checked && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
        <span className="ms-2">{ label }</span>
      </label>
    </div>
  );
};

export default SwitcherOne;
