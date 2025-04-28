export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 border-[5px] border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
