import React, { useState, useEffect } from 'react';
import { Ruler, ArrowRightLeft, Scale, Thermometer, Box, Gauge } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'land' | 'length' | 'weight' | 'pressure' | 'temp' | 'volume'>('land');
  
  // --- Land State (Nepal) ---
  const [sqFt, setSqFt] = useState<number>(342.25);
  const [hillUnit, setHillUnit] = useState({ ropani: 0, aana: 0, paisa: 0, dam: 0 });
  const [teraiUnit, setTeraiUnit] = useState({ bigha: 0, kattha: 0, dhur: 0 });
  const [quickAana, setQuickAana] = useState<string>('1');
  const [quickDhur, setQuickDhur] = useState<string>('1.88'); 

  // --- General Converter State ---
  const [inputValue, setInputValue] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<string>('');
  const [outputUnit, setOutputUnit] = useState<string>('');
  const [result, setResult] = useState<number>(0);

  // Constants for conversion (Base unit is usually metric)
  const lengthRates: Record<string, number> = { 'm': 1, 'cm': 100, 'mm': 1000, 'km': 0.001, 'ft': 3.28084, 'in': 39.3701, 'yd': 1.09361, 'mi': 0.000621371 };
  const weightRates: Record<string, number> = { 'kg': 1, 'g': 1000, 'mg': 1000000, 'lb': 2.20462, 'oz': 35.274, 'ton': 0.001 };
  const pressureRates: Record<string, number> = { 'bar': 1, 'psi': 14.5038, 'pa': 100000, 'atm': 0.986923 };
  const volumeRates: Record<string, number> = { 'l': 1, 'ml': 1000, 'gal': 0.264172, 'm3': 0.001, 'ft3': 0.0353147 };

  // Initial setup for standard converters
  useEffect(() => {
    if (activeTab === 'length') { setInputUnit('m'); setOutputUnit('ft'); }
    if (activeTab === 'weight') { setInputUnit('kg'); setOutputUnit('lb'); }
    if (activeTab === 'pressure') { setInputUnit('bar'); setOutputUnit('psi'); }
    if (activeTab === 'volume') { setInputUnit('l'); setOutputUnit('gal'); }
    if (activeTab === 'temp') { setInputUnit('C'); setOutputUnit('F'); }
  }, [activeTab]);

  // Land Conversion Logic
  useEffect(() => {
    // Hill System
    const totalAana = sqFt / 342.25;
    const ropani = Math.floor(totalAana / 16);
    const remAana = totalAana % 16;
    const aana = Math.floor(remAana);
    const remPaisa = (remAana - aana) * 4;
    const paisa = Math.floor(remPaisa);
    const dam = (remPaisa - paisa) * 4;

    setHillUnit({ ropani, aana, paisa, dam: Number(dam.toFixed(2)) });

    // Terai System
    const totalDhur = sqFt / 182.25;
    const bigha = Math.floor(totalDhur / 400); 
    const remDhurForKattha = totalDhur % 400;
    const kattha = Math.floor(remDhurForKattha / 20);
    const dhur = remDhurForKattha % 20;

    setTeraiUnit({ bigha, kattha, dhur: Number(dhur.toFixed(2)) });
  }, [sqFt]);

  // Standard Conversion Logic
  useEffect(() => {
    if (activeTab === 'land') return;

    if (activeTab === 'temp') {
      let val = inputValue;
      if (inputUnit === 'C' && outputUnit === 'F') val = (val * 9/5) + 32;
      else if (inputUnit === 'F' && outputUnit === 'C') val = (val - 32) * 5/9;
      else if (inputUnit === 'C' && outputUnit === 'K') val = val + 273.15;
      else if (inputUnit === 'K' && outputUnit === 'C') val = val - 273.15;
      else val = inputValue; // same unit
      setResult(Number(val.toFixed(4)));
      return;
    }

    let rateMap: Record<string, number> = {};
    if (activeTab === 'length') rateMap = lengthRates;
    else if (activeTab === 'weight') rateMap = weightRates;
    else if (activeTab === 'pressure') rateMap = pressureRates;
    else if (activeTab === 'volume') rateMap = volumeRates;

    if (rateMap[inputUnit] && rateMap[outputUnit]) {
      // Convert to base, then to target
      // Base = input / rate_input
      // Target = Base * rate_target
      const base = inputValue / rateMap[inputUnit];
      const target = base * rateMap[outputUnit];
      setResult(Number(target.toFixed(5)));
    }
  }, [inputValue, inputUnit, outputUnit, activeTab]);

  // Quick Land Logic
  const handleAanaChange = (val: string) => {
    setQuickAana(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const sq = num * 342.25;
      const d = sq / 182.25;
      setQuickDhur(d.toFixed(3));
    } else {
      setQuickDhur('');
    }
  };

  const handleDhurChange = (val: string) => {
    setQuickDhur(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const sq = num * 182.25;
      const a = sq / 342.25;
      setQuickAana(a.toFixed(3));
    } else {
      setQuickAana('');
    }
  };

  const tabs = [
    { id: 'land', label: 'Nepal Land', icon: <Ruler size={16}/> },
    { id: 'length', label: 'Length', icon: <ArrowRightLeft size={16}/> },
    { id: 'weight', label: 'Weight', icon: <Scale size={16}/> },
    { id: 'volume', label: 'Volume', icon: <Box size={16}/> },
    { id: 'pressure', label: 'Pressure', icon: <Gauge size={16}/> },
    { id: 'temp', label: 'Temp', icon: <Thermometer size={16}/> },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <ArrowRightLeft size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Universal Converter</h3>
            <p className="text-sm text-gray-500 font-medium">Engineering & Land Units</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-4 custom-scrollbar">
        {tabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${
               activeTab === tab.id 
                 ? 'bg-primary text-white shadow-md' 
                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
             }`}
           >
             {tab.icon} {tab.label}
           </button>
        ))}
      </div>

      {activeTab === 'land' ? (
        <div className="animate-in fade-in">
          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Input Area (Square Feet)</label>
            <input 
              type="number" 
              value={sqFt} 
              onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)))}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 text-2xl font-bold bg-gray-50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-serif font-bold text-blue-900 text-lg border-b-2 border-blue-200 pb-3 mb-4">Hill (Pahad)</h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Ropani</span><span className="text-xl text-gray-900 font-bold">{hillUnit.ropani}</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Aana</span><span className="text-xl text-gray-900 font-bold">{hillUnit.aana}</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Paisa</span><span className="text-xl text-gray-900 font-bold">{hillUnit.paisa}</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Dam</span><span className="text-xl text-gray-900 font-bold">{hillUnit.dam}</span></div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
              <h4 className="font-serif font-bold text-yellow-900 text-lg border-b-2 border-yellow-200 pb-3 mb-4">Terai (Madhesh)</h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Bigha</span><span className="text-xl text-gray-900 font-bold">{teraiUnit.bigha}</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Kattha</span><span className="text-xl text-gray-900 font-bold">{teraiUnit.kattha}</span></div>
                 <div className="flex justify-between items-center"><span className="text-gray-700 font-bold text-sm">Dhur</span><span className="text-xl text-gray-900 font-bold">{teraiUnit.dhur}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
            <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
              Quick Convert: Aana ↔ Dhur
            </h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input 
                  type="number" 
                  value={quickAana}
                  onChange={(e) => handleAanaChange(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
                  placeholder="Aana"
                />
                <label className="text-[10px] text-gray-600 font-bold block mt-1 text-center">AANA</label>
              </div>
              <div className="text-gray-400 font-bold text-xl">=</div>
              <div className="flex-1">
                <input 
                  type="number" 
                  value={quickDhur}
                  onChange={(e) => handleDhurChange(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
                  placeholder="Dhur"
                />
                <label className="text-[10px] text-gray-600 font-bold block mt-1 text-center">DHUR</label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center animate-in fade-in">
           <div className="grid grid-cols-5 gap-4 items-center mb-8">
              <div className="col-span-2">
                 <label className="block text-xs font-bold text-gray-800 uppercase mb-2">From</label>
                 <input 
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary outline-none text-gray-900 font-bold text-xl bg-white"
                 />
                 <select 
                   value={inputUnit}
                   onChange={(e) => setInputUnit(e.target.value)}
                   className="w-full mt-2 p-2 bg-gray-100 rounded-lg font-bold text-gray-800 border-none outline-none"
                 >
                    {activeTab === 'length' && Object.keys(lengthRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'weight' && Object.keys(weightRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'pressure' && Object.keys(pressureRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'volume' && Object.keys(volumeRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'temp' && ['C','F','K'].map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
              </div>

              <div className="col-span-1 flex justify-center text-gray-400">
                  <ArrowRightLeft size={32} />
              </div>

              <div className="col-span-2">
                 <label className="block text-xs font-bold text-gray-800 uppercase mb-2">To</label>
                 <div className="w-full p-4 bg-slate-800 rounded-xl text-secondary font-bold text-xl h-[64px] flex items-center overflow-hidden">
                    {result}
                 </div>
                 <select 
                   value={outputUnit}
                   onChange={(e) => setOutputUnit(e.target.value)}
                   className="w-full mt-2 p-2 bg-gray-100 rounded-lg font-bold text-gray-800 border-none outline-none"
                 >
                    {activeTab === 'length' && Object.keys(lengthRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'weight' && Object.keys(weightRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'pressure' && Object.keys(pressureRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'volume' && Object.keys(volumeRates).map(u => <option key={u} value={u}>{u}</option>)}
                    {activeTab === 'temp' && ['C','F','K'].map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;