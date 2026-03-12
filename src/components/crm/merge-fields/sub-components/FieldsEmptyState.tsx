export default function FieldsEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-[6rem] px-[2rem] text-center">
      <p className="text-[1.4rem] text-muted font-medium max-w-[32rem]">
        {message}
      </p>
    </div>
  );
}
