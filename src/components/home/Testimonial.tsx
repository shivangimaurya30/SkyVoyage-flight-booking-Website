// import React from 'react';
// import { Star } from 'lucide-react';

// interface TestimonialProps {
//   name: string;
//   location: string;
//   quote: string;
//   avatar: string;
//   rating: number;
// }

// const Testimonial: React.FC<TestimonialProps> = ({ name, location, quote, avatar, rating }) => {
//   return (
//     <div className="card hover:shadow-lg transition-shadow">
//       <div className="flex items-center gap-4 mb-4">
//         <img
//           src={avatar}
//           alt={name}
//           className="h-16 w-16 rounded-full object-cover"
//         />
//         <div>
//           <h3 className="font-semibold">{name}</h3>
//           <p className="text-sm text-neutral-500">{location}</p>
//         </div>
//       </div>
      
//       <div className="flex mb-3">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star
//             key={i}
//             className={`h-5 w-5 ${
//               i < rating ? 'fill-accent-500 text-accent-500' : 'text-neutral-300'
//             }`}
//           />
//         ))}
//       </div>
      
//       <blockquote className="text-neutral-700">
//         "{quote}"
//       </blockquote>
//     </div>
//   );
// };

// export default Testimonial;

import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  location,
  quote,
  avatar,
  rating,
}) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-3">
        <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-700">"{quote}"</p>
    </div>
  );
};

export default Testimonial;
