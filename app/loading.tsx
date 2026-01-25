export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ paddingTop: '11rem', paddingBottom: '2.5rem' }}>
      <div className="relative w-16 h-16 animate-spin">
        {/* Pokéball structure */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-900 dark:border-gray-100">
          {/* Top half - Red */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-red-500 to-red-600"></div>
          
          {/* Bottom half - White */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-b from-white to-gray-100"></div>
          
          {/* Middle black line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-900 dark:bg-gray-100 -translate-y-1/2"></div>
        </div>
        
        {/* Center button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-gray-900 dark:border-gray-100 shadow-lg">
          <div className="absolute inset-1 rounded-full bg-linear-to-br from-gray-200 to-white"></div>
        </div>
      </div>
    </div>
  );
}
