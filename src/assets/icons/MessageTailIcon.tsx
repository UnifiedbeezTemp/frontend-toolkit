import React from "react";

interface MessageTailIconProps {
  className?: string;
  color?: string;
  size?: number
  
}

const MessageTailIcon: React.FC<MessageTailIconProps> = ({
  size = 8,
  className,
  color = "white",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 8 7"
      fill="none"
      className={className}
    >
      <path
        d="M2.11426 3.72154C1.40951 4.88004 0.704753 5.80683 0 6.73363C0 6.73363 1.76399 6.7115 2.81901 6.63253C3.87404 6.55356 5.40311 5.65735 5.40311 5.65735C5.40311 5.65735 6.81261 6.73363 7.9872 6.73363V0H2.8218C2.82105 0.407706 2.82013 0.80081 2.81901 1.17284C2.81446 2.69229 2.28519 3.44056 2.11426 3.72154Z"
        fill={color}
      />
    </svg>
  );
};

export default MessageTailIcon;
