import Fallback from "@/components/UI/Fallback";
export default function Loading() {
  return (
    <div className="backdrop-blur-0 h-screen w-full flex items-center justify-center">
      <Fallback />
    </div>
  );
}
