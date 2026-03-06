export default function DotsMenu() {
  return (
    <button className="flex items-center gap-[0.3rem]">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[5px] h-[5px] rounded-full bg-inactive-color"
        ></div>
      ))}
    </button>
  );
}