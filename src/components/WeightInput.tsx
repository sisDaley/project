import React from 'react';
import { Weight } from 'lucide-react';

interface WeightInputProps {
  weight: string;
  unit: 'lbs' | 'kg';
  onWeightChange: (value: string) => void;
  onUnitChange: (unit: 'lbs' | 'kg') => void;
}

export function WeightInput({ weight, unit, onWeightChange, onUnitChange }: WeightInputProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
        <Weight className="w-4 h-4" />
        Weight
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={weight}
          onChange={(e) => onWeightChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all"
          placeholder="Enter your weight"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as 'lbs' | 'kg')}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all appearance-none bg-white"
        >
          <option value="lbs">lbs</option>
          <option value="kg">kg</option>
        </select>
      </div>
    </div>
  );
}