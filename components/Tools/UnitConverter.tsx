import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';

// Hill System:
// 1 Ropani = 16 Aana
// 1 Aana = 4 Paisa
// 1 Paisa = 4 Dam
// 1 Aana = 342.25 Sq Ft

// Terai System:
// 1 Bigha = 20 Kattha
// 1 Kattha = 20 Dhur
// 1 Dhur = 182.25 Sq Ft (Approx standard)

const UnitConverter: React.FC = () => {
  const [sqFt, setSqFt] = useState<number>(342.25);
  const [hillUnit, setHillUnit] = useState({ ropani: 0, aana: 0, paisa: 0, dam: 0 });
  const [teraiUnit, setTeraiUnit] = useState({ bigha: 0, kattha: 0, dhur: 0 });

  // Quick Converter State
  const [quickAana, setQuickAana] = useState<string>('1');
  const [quickDhur, setQuickDhur] = useState<string>('1.88'); // 342.25 / 182.25

  const convertUnits = (sqf: number) => {
    // Hill System Calculation
    const totalAana = sqf / 342.25;
    const ropani = Math.floor(totalAana / 16);
    const remAana = totalAana % 16;
    const aana = Math.floor(remAana);
    const remPaisa = (remAana - aana) * 4;
    const paisa = Math.floor(remPaisa);
    const dam = (remPaisa - paisa) * 4;

    setHillUnit({ 
      ropani, 
      aana, 
      paisa, 
      dam: Number(dam.toFixed(2)) 
    });

    // Terai System Calculation
    // 1 Dhur is approx 182.25 sq ft. 
    const totalDhur = sqf / 182.25;
    const bigha = Math.floor(totalDhur / 400); // 20 * 20 = 400 Dhur in a Bigha
    const remDhurForKattha = totalDhur % 400;
    const kattha = Math.floor(remDhurForKattha / 20);
    const dhur = remDhurForKattha % 20;

    setTeraiUnit({
      bigha,
      kattha,
      dhur: Number(dhur.toFixed(2))
    });
  };

  useEffect(() => {
    convertUnits(sqFt);
  }, [sqFt]);

  // Handlers for Quick Converter
  const handleAanaChange = (val: string) => {
    setQuickAana(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      // 1 Aana = 342.25 sqft
      // 1 Dhur = 182.25 sqft
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

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary h-full flex flex-col">
      <h3 className="text-2xl font-bold text-primary mb-6">Nepal Land Converter</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Area in Square Feet</label>
        <input 
          type="number" 
          value={sqFt} 
          onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)))}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow mb-6">
        {/* Hill System */}
        <div className="space-y-3 bg-blue-50 p-6 rounded-lg">
          <h4 className="font-serif font-bold text-primary border-b border-blue-200 pb-2 mb-2">Hill Region (Pahad)</h4>
          <div className="flex justify-between items-center border-b border-blue-100 pb-1">
            <span className="text-gray-600">Ropani</span>
            <span className="text-lg text-primary font-bold">{hillUnit.ropani}</span>
          </div>
          <div className="flex justify-between items-center border-b border-blue-100 pb-1">
            <span className="text-gray-600">Aana</span>
            <span className="text-lg text-primary font-bold">{hillUnit.aana}</span>
          </div>
          <div className="flex justify-between items-center border-b border-blue-100 pb-1">
            <span className="text-gray-600">Paisa</span>
            <span className="text-lg text-primary font-bold">{hillUnit.paisa}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dam</span>
            <span className="text-lg text-primary font-bold">{hillUnit.dam}</span>
          </div>
        </div>

        {/* Terai System */}
        <div className="space-y-3 bg-yellow-50 p-6 rounded-lg">
          <h4 className="font-serif font-bold text-primary border-b border-yellow-200 pb-2 mb-2">Terai Region (Madhesh)</h4>
          <div className="flex justify-between items-center border-b border-yellow-200 pb-1">
            <span className="text-gray-600">Bigha</span>
            <span className="text-lg text-primary font-bold">{teraiUnit.bigha}</span>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-200 pb-1">
            <span className="text-gray-600">Kattha</span>
            <span className="text-lg text-primary font-bold">{teraiUnit.kattha}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Dhur</span>
            <span className="text-lg text-primary font-bold">{teraiUnit.dhur}</span>
          </div>
        </div>
      </div>

      {/* Quick Converter Aana <-> Dhur */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
          <ArrowRightLeft size={16} /> Quick Convert: Aana ↔ Dhur
        </h4>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">Aana</label>
            <input 
              type="number" 
              value={quickAana}
              onChange={(e) => handleAanaChange(e.target.value)}
              className="w-full p-2 border rounded text-sm"
              placeholder="Aana"
            />
          </div>
          <div className="pt-4 text-gray-400">=</div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">Dhur</label>
            <input 
              type="number" 
              value={quickDhur}
              onChange={(e) => handleDhurChange(e.target.value)}
              className="w-full p-2 border rounded text-sm"
              placeholder="Dhur"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-400">
        Note: 1 Aana ≈ 342.25 Sq.ft | 1 Dhur ≈ 182.25 Sq.ft
      </div>
    </div>
  );
};

export default UnitConverter;