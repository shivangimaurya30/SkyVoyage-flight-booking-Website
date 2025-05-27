// import React from 'react';
// import { Plane } from 'lucide-react';

// interface LogoProps {
//   className?: string;
// }

// export const SkyVoyageLogo: React.FC<LogoProps> = ({ className = '' }) => {
//   return (
//     <div className={`flex items-center ${className}`}>
//       <div className="relative">
//         <div className="bg-accent-500 rounded-full p-1.5">
//           <Plane className="h-5 w-5 text-white transform rotate-45" />
//         </div>
//         <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary-600 border-2 border-white"></div>
//       </div>
//       <span className="ml-2 text-xl font-bold">SkyVoyage</span>
//     </div>
//   );
// };
import React from 'react';
import { Plane } from 'lucide-react';

export const SkyVoyageLogo = () => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="bg-blue-500 rounded-full p-2">
          <Plane className="h-5 w-5 text-white rotate-45" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-blue-700 border-2 border-white"></div>
      </div>
      <span className="ml-2 text-xl font-bold">SkyVoyage</span>
    </div>
  );
};
