export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
}
