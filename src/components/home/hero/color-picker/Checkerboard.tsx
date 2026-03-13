export default function Checkerboard() {
  return (
    <div
      className="absolute inset-0 rounded-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h4v4H0z' fill='%23ccc'/%3E%3Cpath d='M4 0h4v4H4z' fill='%23fff'/%3E%3Cpath d='M0 4h4v4H0z' fill='%23fff'/%3E%3Cpath d='M4 4h4v4H4z' fill='%23ccc'/%3E%3C/svg%3E")`,
        backgroundSize: "8px 8px",
      }}
    />
  );
}