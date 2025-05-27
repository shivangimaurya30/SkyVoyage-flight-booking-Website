// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Plane } from 'lucide-react';

// interface DestinationCardProps {
//   city: string;
//   country: string;
//   price: number;
//   image: string;
// }

// const DestinationCard: React.FC<DestinationCardProps> = ({ city, country, price, image }) => {
//   return (
//     <Link to="/search\" className="group block">
//       <div className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
//         <div className="relative h-60 w-full overflow-hidden">
//           <img
//             src={image}
//             alt={`${city}, ${country}`}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
//           <div className="absolute bottom-0 left-0 w-full p-4 text-white">
//             <h3 className="text-xl font-semibold">{city}</h3>
//             <p className="text-sm text-white/80">{country}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-between p-4 bg-white">
//           <div className="flex items-center gap-2">
//             <Plane className="h-4 w-4 text-primary-600" />
//             <span className="text-sm text-neutral-600">One way from</span>
//           </div>
//           <div className="text-lg font-semibold text-primary-600">${price}</div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default DestinationCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

interface DestinationCardProps {
  city: string;
  country: string;
  price: number;
  image: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ city, country, price, image }) => {
  return (
    <Link to="/search" className="group block">
      <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
        {/* Image section */}
        <div className="relative h-60 w-full">
          <img
            src={image}
            alt={`${city}, ${country}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <h3 className="text-xl font-semibold">{city}</h3>
            <p className="text-sm text-white/80">{country}</p>
          </div>
        </div>

        {/* Price section */}
        <div className="flex justify-between items-center p-4 bg-white">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-gray-600">One way from</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">${price}</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
