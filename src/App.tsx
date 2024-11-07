import React, { useState } from 'react';
import { Calculator, ChevronDown, Activity, User2 } from 'lucide-react';
import { WeightInput } from './components/WeightInput';
import { HeightInput } from './components/HeightInput';
import { MacroResults } from './components/MacroResults';

interface MacroResults {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function App() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [age, setAge] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState<string>('');
  const [inches, setInches] = useState<string>('');
  const [cm, setCm] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [results, setResults] = useState<MacroResults | null>(null);

  const calculateMacros = () => {
    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);
    const activityMultiplier = parseFloat(activityLevel);
    
    // Calculate height in cm
    let heightInCm: number;
    if (heightUnit === 'imperial') {
      const feetNum = parseFloat(feet) || 0;
      const inchesNum = parseFloat(inches) || 0;
      heightInCm = (feetNum * 30.48) + (inchesNum * 2.54);
    } else {
      heightInCm = parseFloat(cm);
    }
    
    if (!weightNum || !heightInCm || !ageNum || isNaN(weightNum) || isNaN(heightInCm) || isNaN(ageNum)) return;

    // Convert pounds to kg if needed
    const weightInKg = weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;

    // Mifflin-St Jeor Equation for BMR
    let bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // Total Daily Energy Expenditure (TDEE)
    const tdee = Math.round(bmr * activityMultiplier);

    // Macro split (40/30/30)
    const proteinCals = tdee * 0.4;
    const carbsCals = tdee * 0.3;
    const fatCals = tdee * 0.3;

    setResults({
      calories: tdee,
      protein: Math.round(proteinCals / 4), // 4 calories per gram of protein
      carbs: Math.round(carbsCals / 4),     // 4 calories per gram of carbs
      fat: Math.round(fatCals / 9),         // 9 calories per gram of fat
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c5925]/10 to-[#3c5925]/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-[#3c5925]" />
            <h1 className="text-3xl font-bold text-gray-800">Macro Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <User2 className="w-4 h-4" />
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                      gender === 'male'
                        ? 'bg-[#3c5925] text-white border-[#3c5925]'
                        : 'border-gray-300 text-gray-600 hover:border-[#3c5925]/50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                      gender === 'female'
                        ? 'bg-[#3c5925] text-white border-[#3c5925]'
                        : 'border-gray-300 text-gray-600 hover:border-[#3c5925]/50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all"
                  placeholder="Enter your age"
                  min="0"
                />
              </div>

              <HeightInput
                unit={heightUnit}
                feet={feet}
                inches={inches}
                cm={cm}
                onUnitChange={setHeightUnit}
                onFeetChange={setFeet}
                onInchesChange={setInches}
                onCmChange={setCm}
              />

              <WeightInput
                weight={weight}
                unit={weightUnit}
                onWeightChange={setWeight}
                onUnitChange={setWeightUnit}
              />

              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Activity className="w-4 h-4" />
                  Activity Level
                </label>
                <div className="relative">
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3c5925] focus:ring-2 focus:ring-[#3c5925]/20 transition-all appearance-none"
                  >
                    <option value="1.2">Sedentary (office job)</option>
                    <option value="1.375">Light Exercise (1-2 days/week)</option>
                    <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                    <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                    <option value="1.9">Athlete (2x per day)</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                onClick={calculateMacros}
                className="w-full bg-[#3c5925] text-white py-3 px-6 rounded-lg hover:bg-[#3c5925]/90 transition-colors font-medium"
              >
                Calculate Macros
              </button>
              
            </div>

            {results && <MacroResults {...results} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;