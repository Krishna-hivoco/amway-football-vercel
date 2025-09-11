import React from "react";

interface button {
  title: string;
  bgcolor?: string;
  onClick?:()=>void
}
function Button({ title, onClick }: button) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full  p-2 w-full bg-white text-black quantico-bold `}
    >
      {title}
    </button>
  );
}

export default Button;
