import React from 'react';
import { Ruler } from 'lucide-react';

interface HeightInputProps {
  unit: 'imperial' | 'metric';
  feet: string;
  inches: string;
  cm: string;
  onUnitChange: (unit: 'imperial' | 'metric') => void;
  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;
  onCmChange: (value: string) => void;
}

export function HeightInput({
  unit,
  feet,
  inches,
  cm,
  onUnitChange,
  onFeetChange,
  onInchesChange,
  onCmChange,
}: HeightInputProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
        <Ruler className="w-4 h-4" />
        Height
      </label>
      <div className="space-y-3">
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as 'imperial' | 'metric')}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all appearance-none bg-white"
        >
          <option value="imperial">Feet & Inches</option>
          <option value="metric">Centimeters</option>
        </select>

        {unit === 'imperial' ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={feet}
                onChange={(e) => onFeetChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all"
                placeholder="Feet"
                min="0"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={inches}
                onChange={(e) => onInchesChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all"
                placeholder="Inches"
                min="0"
                max="11"
              />
            </div>
          </div>
        ) : (
          <input
            type="number"
            value={cm}
            onChange={(e) => onCmChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all"
            placeholder="Enter height in centimeters"
            min="0"
          />
        )}
      </div>
    </div>
  );
}