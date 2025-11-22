import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export interface IconItem {
  icon: React.ReactNode;
  href?: string;
  label?: string;
  onClick?: () => void;
}

interface IconListProps {
  icons: IconItem[];
  layout?: "horizontal" | "vertical" | "grid" | "marquee";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  rounded?: boolean;
  background?: boolean;
  className?: string;
}

const layoutClasses = {
  horizontal: "flex flex-row items-center",
  vertical: "flex flex-col items-center",
  grid: "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
  marquee: "flex relative",
};

const gapClasses = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
};

const sizeClasses = {
  xs: "w-[1rem] h-[1rem]",
  sm: "w-[14rem] h-[14rem]",
  md: "w-[16rem] h-[16rem]",
  lg: "w-[10rem] h-[10rem]",
  xl: "w-[10rem] h-[10rem]",
};

export default function IconList({
  icons,
  layout = "horizontal",
  size = "md",
  gap = "md",
  hover = true,
  rounded = false,
  background = false,
  className = "",
}: IconListProps) {
  const [popIndex, setPopIndex] = useState(-1);

  // Random pop animation for icons
  useEffect(() => {
    if (layout !== "marquee") return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setPopIndex(randomIndex);
      
      // Reset after animation
      setTimeout(() => setPopIndex(-1), 600);
    }, 3000); // Pop every 3 seconds

    return () => clearInterval(interval);
  }, [icons.length, layout]);

  const handleIconClick = (iconItem: IconItem, e: React.MouseEvent) => {
    if (iconItem.onClick) {
      e.preventDefault();
      iconItem.onClick();
    }
  };

  const renderIcon = (iconItem: IconItem, index: number, originalIndex?: number) => {
    const isPopping = originalIndex !== undefined && originalIndex === popIndex;
    
    const iconContent = (
      <div
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200",
          sizeClasses[size],
          hover && "hover:scale-110 active:scale-95 cursor-pointer",
          rounded && "rounded-full",
          background && "bg-primary border border-border shadow-sm",
          background && rounded && "p-2",
          isPopping && "animate-pop"
        )}
        aria-label={iconItem.label || `Icon ${index + 1}`}
      >
        {iconItem.icon}
      </div>
    );

    if (iconItem.href) {
      return (
        <a
          key={index}
          href={iconItem.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => handleIconClick(iconItem, e)}
          className="inline-block"
        >
          {iconContent}
        </a>
      );
    }

    if (iconItem.onClick) {
      return (
        <button
          key={index}
          onClick={(e) => handleIconClick(iconItem, e)}
          className="inline-block border-0 bg-transparent p-0"
        >
          {iconContent}
        </button>
      );
    }

    return <div key={index}>{iconContent}</div>;
  };

  if (layout === "marquee") {
    const marqueeIcons = [...icons, ...icons, ...icons];
    
    return (
      <div className={cn("pb-[1.4rem]", className)}>
        <div 
          className={cn(
            "flex items-center animate-marquee",
            gapClasses[gap]
          )}
          style={{ animationDuration: `${icons.length * 2}s` }}
        >
          {marqueeIcons.map((iconItem, index) => 
            renderIcon(iconItem, index, index % icons.length)
          )}
        </div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
          .animate-pop {
            animation: pop 0.6s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className={cn(layoutClasses[layout], gapClasses[gap], className)}
      role="list"
    >
      {icons.map((iconItem, index) => renderIcon(iconItem, index))}
    </div>
  );
}