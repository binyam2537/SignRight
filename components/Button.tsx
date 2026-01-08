import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  
  const baseStyles = "relative font-bold py-3 px-6 rounded-xl transition-all active:translate-y-1 active:border-b-0 outline-none select-none";
  const widthStyles = fullWidth ? "w-full" : "";
  
  const variants = {
    // Updated shadow to Sky-700 approx
    primary: "bg-accent-primary text-white border-b-4 border-accent-shadow hover:brightness-110 shadow-[0_4px_0_0_rgba(3,105,161,0.5)]",
    secondary: "bg-gray-800 text-white border-b-4 border-gray-900 hover:bg-gray-700 shadow-[0_4px_0_0_rgba(17,24,39,0.5)]",
    danger: "bg-accent-error text-white border-b-4 border-red-900 hover:brightness-110 shadow-[0_4px_0_0_rgba(127,29,29,0.5)]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-none active:translate-y-0"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;