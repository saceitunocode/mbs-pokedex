interface PokedexHeaderProps {
  title?: string;
  rightElements?: React.ReactNode;
  searchBar?: React.ReactNode;
  filters?: React.ReactNode;
  disabled?: boolean;
}

export function PokedexHeader({ title, rightElements, searchBar, filters, disabled = false }: PokedexHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 drop-shadow-2xl">
      <div className="bg-red-600 border-b-[6px] border-red-900 pt-3 md:pt-4 pb-4">
        {/* Title row */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-3">
          <div className="flex items-center justify-between">
            {/* Left side: Blue circle + Title */}
            <div className="flex items-center gap-3 md:gap-4 z-10">
              {/* Large blue circle */}
              <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full shadow-xl border-3 border-white shrink-0">
                <div className="relative w-full h-full">
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 md:w-6 md:h-6 bg-blue-600 rounded-full opacity-40"></div>
                </div>
              </div>
              
              {/* Title */}
              {title && (
                <h1 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg tracking-tight">
                  {title}
                </h1>
              )}
            </div>
            
            {/* Right side: Selectors + Decorative circles */}
            <div className="flex items-center gap-3 md:gap-4 z-10">
              {rightElements}
              
              {/* Decorative circles */}
              <div className="hidden sm:flex items-center gap-1.5 md:gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-yellow-400 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filters row */}
        {(searchBar || filters) && (
          <div className={`max-w-7xl mx-auto px-4 md:px-8 transition-all duration-300 ${disabled ? 'opacity-40 pointer-events-none blur-[1px] select-none' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full items-start">
              {searchBar && (
                <div className="w-full md:col-span-2">
                  {searchBar}
                </div>
              )}
              {filters}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PokedexFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 drop-shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
      <div className="bg-red-600 h-12 border-t-[6px] border-red-900">
      </div>
    </div>
  );
}
