import React from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { PassengerInfo } from '../../types';

interface PassengerFormProps {
  passenger: PassengerInfo;
  index: number;
  onChange: (passenger: PassengerInfo) => void;
  isPrimaryContact: boolean;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ 
  passenger, 
  index, 
  onChange, 
  isPrimaryContact 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    onChange({
      ...passenger,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleDateChange = (date: Date | null) => {
    onChange({
      ...passenger,
      dateOfBirth: date ? date.toISOString() : '',
    });
  };
  
  return (
    <div className="border border-neutral-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">
          Passenger {index + 1} {isPrimaryContact && '(Primary Contact)'}
        </h3>
        {!isPrimaryContact && (
          <span className="text-sm text-neutral-500">
            Contact information is only required for the primary passenger
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`firstName-${index}`} className="label">
            First Name
          </label>
          <input
            id={`firstName-${index}`}
            name="firstName"
            type="text"
            value={passenger.firstName}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor={`lastName-${index}`} className="label">
            Last Name
          </label>
          <input
            id={`lastName-${index}`}
            name="lastName"
            type="text"
            value={passenger.lastName}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor={`gender-${index}`} className="label">
            Gender
          </label>
          <select
            id={`gender-${index}`}
            name="gender"
            value={passenger.gender}
            onChange={handleChange}
            className="input appearance-none"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="label">Date of Birth</label>
          <div className="relative">
            <DatePicker
              selected={passenger.dateOfBirth ? new Date(passenger.dateOfBirth) : null}
              onChange={handleDateChange}
              className="input w-full"
              dateFormat="MMM d, yyyy"
              placeholderText="Select date"
              maxDate={new Date()}
              showYearDropdown
              dropdownMode="select"
              required
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          </div>
        </div>
        
        <div>
          <label htmlFor={`passportNumber-${index}`} className="label">
            Passport Number (Optional)
          </label>
          <input
            id={`passportNumber-${index}`}
            name="passportNumber"
            type="text"
            value={passenger.passportNumber}
            onChange={handleChange}
            className="input"
          />
        </div>
        
        {isPrimaryContact && (
          <>
            <div>
              <label htmlFor={`email-${index}`} className="label">
                Email Address
              </label>
              <input
                id={`email-${index}`}
                name="email"
                type="email"
                value={passenger.email || ''}
                onChange={handleChange}
                className="input"
                placeholder="example@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`phone-${index}`} className="label">
                Phone Number
              </label>
              <input
                id={`phone-${index}`}
                name="phone"
                type="tel"
                value={passenger.phone || ''}
                onChange={handleChange}
                className="input"
                placeholder="+1 (555) 555-5555"
                required
              />
            </div>
          </>
        )}
      </div>
      
      <div className="mt-4 border-t border-neutral-200 pt-4">
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <label className="flex items-center gap-2 cursor-pointer mb-2 sm:mb-0">
            <input
              type="checkbox"
              name="specialAssistance"
              checked={passenger.specialAssistance}
              onChange={handleChange}
              className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
            />
            <span className="text-sm">Special assistance needed</span>
          </label>
          
          <div className="flex items-center gap-2">
            <label htmlFor={`mealPreference-${index}`} className="text-sm">
              Meal Preference:
            </label>
            <select
              id={`mealPreference-${index}`}
              name="mealPreference"
              value={passenger.mealPreference}
              onChange={handleChange}
              className="text-sm border border-neutral-300 rounded px-2 py-1 focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="Regular">Regular</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Kosher">Kosher</option>
              <option value="Halal">Halal</option>
              <option value="Gluten Free">Gluten Free</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;