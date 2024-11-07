import React from 'react';

interface MacroResultsProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function MacroResults({ calories, protein, carbs, fat }: MacroResultsProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Daily Macros</h2>
        <p className="text-gray-600">Based on your 40/30/30 split</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Daily Calories</span>
            <span className="text-xl font-bold text-gray-800">{calories} kcal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#3c5925] h-2 rounded-full w-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Protein (40%)</span>
            <span className="text-xl font-bold text-gray-800">{protein}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#3c5925] h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Carbs (30%)</span>
            <span className="text-xl font-bold text-gray-800">{carbs}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#3c5925] h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Fat (30%)</span>
            <span className="text-xl font-bold text-gray-800">{fat}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#3c5925] h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}