// components/Loading.tsx

export default function Loading() {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="text-white text-xl">Loading...</div>
        <div className="ml-4 animate-spin h-10 w-10 border-4 border-t-4 border-white rounded-full"></div>
      </div>
    );
  }
  