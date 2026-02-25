import Image from "next/image";

interface UserAvatarProps {
  profilePhoto?: string | null;
  fullName?: string | null;
  className?: string; 
  size?: number; 
  textClassName?: string;
}

export default function UserAvatar({
  profilePhoto,
  fullName,
  className = "w-[40px] h-[40px]",
  size = 40,
  textClassName = "text-[1.4rem]",
}: UserAvatarProps) {
  if (profilePhoto) {
    return (
      <div className={`relative rounded-full overflow-hidden ${className}`}>
        <Image
          src={profilePhoto}
          alt={fullName || "User Avatar"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const initials = fullName?.[0] || "?";

  return (
    <div
      className={`bg-purple text-brand-primary font-[700] flex items-center justify-center rounded-full ${className} ${textClassName}`}
    >
      {initials}
    </div>
  );
}
