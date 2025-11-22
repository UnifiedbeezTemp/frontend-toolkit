export default function DotsMenu() {
  return (
    <div className="flex items-center gap-[0.3rem]">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[0.5rem] h-[0.5rem] rounded-full bg-inactive-color"
        ></div>
      ))}
    </div>
  );
}
