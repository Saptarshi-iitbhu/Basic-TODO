import React from 'react';
import { cn } from '../utils';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 border border-transparent",
        secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-2 flex items-center justify-center",
    };

    return (
        <button
            ref={ref}
            disabled={isLoading || props.disabled}
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";
