import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Ruler } from 'lucide-react';

const UnitConverter: React.FC = () => {
  const [sqFt, setSqFt] = useState<number>(342.25);
  const [hillUnit, setHillUnit] = useState({ ropani: 0, aana: 0, paisa: 0, dam: 0 });
  const [teraiUnit, setTeraiUnit] = useState({ bigha: 0, kattha: 0, dhur: 0 });

  // Quick Converter State
  const [quickAana, setQuickAana] = useState<string>('1');
  const [quickDhur, setQuickDhur] = useState<string>('1.88'); 

  const convertUnits = (sqf: number) => {
    // Hill System
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

    // Terai System
    const totalDhur = sqf / 182.25;
    const bigha = Math.floor(totalDhur / 400); 
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

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Ruler size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Land Converter</h3>
            <p className="text-sm text-gray-500 font-medium">Standard Nepal Units</p>
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Input Area (Square Feet)</label>
        <input 
          type="number" 
          value={sqFt} 
          onChange={(e) => setSqFt(Math.max(0, Number(e.target.value)))}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-secondary focus:ring-0 outline-none text-gray-900 text-2xl font-bold bg-gray-50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow mb-8">
        {/* Hill System */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h4 className="font-serif font-bold text-blue-900 text-lg border-b-2 border-blue-200 pb-3 mb-4">Hill (Pahad)</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium text-sm">Ropani</span>
                <span className="text-xl text-primary font-bold">{hillUnit.ropani}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium text-sm">Aana</span>
                <span className="text-xl text-primary font-bold">{hillUnit.aana}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium text-sm">Paisa</span>
                <span className="text-xl text-primary font-bold">{hillUnit.paisa}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium text-sm">Dam</span>
                <span className="text-xl text-primary font-bold">{hillUnit.dam}</span>
            </div>
          </div>
        </div>

        {/* Terai System */}
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <h4 className="font-serif font-bold text-yellow-900 text-lg border-b-2 border-yellow-200 pb-3 mb-4">Terai (Madhesh)</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-yellow-100">
                <span className="text-gray-600 font-medium text-sm">Bigha</span>
                <span className="text-xl text-primary font-bold">{teraiUnit.bigha}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-yellow-100">
                <span className="text-gray-600 font-medium text-sm">Kattha</span>
                <span className="text-xl text-primary font-bold">{teraiUnit.kattha}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-yellow-100">
                <span className="text-gray-600 font-medium text-sm">Dhur</span>
                <span className="text-xl text-primary font-bold">{teraiUnit.dhur}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Converter */}
      <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
          <ArrowRightLeft size={18} className="text-secondary" /> Quick Convert
        </h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 font-bold block mb-2">AANA</label>
            <input 
              type="number" 
              value={quickAana}
              onChange={(e) => handleAanaChange(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
              placeholder="0"
            />
          </div>
          <div className="pt-6 text-gray-400 font-bold text-xl">=</div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 font-bold block mb-2">DHUR</label>
            <input 
              type="number" 
              value={quickDhur}
              onChange={(e) => handleDhurChange(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-secondary focus:ring-0 outline-none text-gray-900 font-bold bg-white"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;