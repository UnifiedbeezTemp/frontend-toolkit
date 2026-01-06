import Image from "next/image"
import { AvatarGroupProps } from "./types"
import { isFunction } from "../../utils/is"

export function AvatarGroup({
  items,
  size = 31,
  overlap = 10,
  onItemClick,
  overlapDirection = "right",
}: AvatarGroupProps) {
  return (
    <div
      className="flex items-center"
      style={
        overlapDirection === "right"
          ? { paddingLeft: overlap }
          : { paddingRight: overlap }
      }
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() => isFunction(onItemClick) && onItemClick(item)}
          className="relative rounded-full border-2 border-white shadow-sm bg-primary-50 overflow-hidden flex items-center justify-center font-medium"
          style={{
            width: size,
            height: size,
            ...(overlapDirection === "right"
              ? {
                  marginLeft: index === 0 ? 0 : -overlap,
                  zIndex: items.length - index,
                }
              : {
                  marginRight: index === items.length - 1 ? 0 : -overlap,
                }),
            background: item.type === "initial" ? item.bgColor : undefined,
            color:
              item.type === "initial" ? item.textColor ?? "#fff" : undefined,
          }}
        >
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt={item.alt}
              width={size}
              height={size}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}
