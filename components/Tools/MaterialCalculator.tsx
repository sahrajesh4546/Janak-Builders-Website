import React, { useState } from 'react';
import { Calculator, DollarSign, Hammer } from 'lucide-react';

const MaterialCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csa' | 'brick' | 'steel'>('csa');

  // --- CSA STATE ---
  const [csaDim, setCsaDim] = useState({ l: 100, w: 100, t: 0.5 }); // feet
  const [mix, setMix] = useState('M20'); 
  const [csaType, setCsaType] = useState<'concrete' | 'plaster' | 'mortar'>('concrete');
  
  // --- BRICK STATE ---
  const [brickDim, setBrickDim] = useState({ l: 100, h: 10, thick: 9 }); 
  
  // --- STEEL STATE ---
  const [steel, setSteel] = useState({ dia: 12, len: 40, count: 50 }); 

  // --- RATES STATE (NPR) ---
  const [rates, setRates] = useState({ 
    cement: 850, sand: 90, agg: 85, brick: 18, steel: 115   
  });

  const calculateCSA = () => {
    const vol = csaDim.l * csaDim.w * csaDim.t; 
    let cementBags = 0, sandVol = 0, aggVol = 0, dryVol = 0;

    if (csaType === 'concrete') {
      dryVol = vol * 1.54; 
      let ratio = [1, 1.5, 3];
      if (mix === 'M15') ratio = [1, 2, 4];
      if (mix === 'M10') ratio = [1, 3, 6];
      const sum = ratio[0] + ratio[1] + ratio[2];
      cementBags = (ratio[0] / sum) * dryVol / 1.226; 
      sandVol = (ratio[1] / sum) * dryVol;
      aggVol = (ratio[2] / sum) * dryVol;
    } else if (csaType === 'plaster') {
      dryVol = vol * 1.33; 
      const ratio = [1, 5];
      const sum = 6;
      cementBags = (ratio[0] / sum) * dryVol / 1.226;
      sandVol = (ratio[1] / sum) * dryVol;
    } else {
      dryVol = vol * 1.30; 
      const ratio = [1, 6]; 
      const sum = 7;
      cementBags = (ratio[0] / sum) * dryVol / 1.226;
      sandVol = (ratio[1] / sum) * dryVol;
    }

    return {
      cement: Math.ceil(cementBags),
      sand: parseFloat(sandVol.toFixed(1)),
      agg: parseFloat(aggVol.toFixed(1)),
      totalCost: (Math.ceil(cementBags) * rates.cement) + (sandVol * rates.sand) + (aggVol * rates.agg)
    };
  };

  const calculateBrick = () => {
    const wallArea = brickDim.l * brickDim.h;
    const multiplier = brickDim.thick === 9 ? 13.5 : 5;
    const bricksCount = Math.ceil(wallArea * multiplier);
    const cementBags = Math.ceil(bricksCount / 350);
    const sandVol = cementBags * 1.226 * 6; 

    return {
      bricks: bricksCount,
      cement: cementBags,
      sand: parseFloat(sandVol.toFixed(1)),
      totalCost: (bricksCount * rates.brick) + (cementBags * rates.cement) + (sandVol * rates.sand)
    };
  };

  const calculateSteel = () => {
    const lenMeters = steel.len * 0.3048;
    const weightPerBar = (Math.pow(steel.dia, 2) / 162.2) * lenMeters;
    const totalWeight = weightPerBar * steel.count;
    return {
      weight: parseFloat(totalWeight.toFixed(2)),
      cost: totalWeight * rates.steel
    };
  };

  const csa = calculateCSA();
  const brick = calculateBrick();
  const rebar = calculateSteel();

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Hammer size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Material Analysis</h3>
            <p className="text-sm text-gray-500 font-medium">Standard Nepal Estimates</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
        <button onClick={() => setActiveTab('csa')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'csa' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Concrete/Plaster</button>
        <button onClick={() => setActiveTab('brick')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'brick' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Bricks</button>
        <button onClick={() => setActiveTab('steel')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'steel' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Steel</button>
      </div>

      {/* Concrete / CSA Content */}
      {activeTab === 'csa' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex gap-4">
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-800 uppercase mb-2">Type</label>
                <select className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-medium focus:border-secondary outline-none bg-white" value={csaType} onChange={(e:any) => setCsaType(e.target.value)}>
                    <option value="concrete">RCC Concrete</option>
                    <option value="plaster">Plastering</option>
                    <option value="mortar">Mortar Only</option>
                </select>
             </div>
             {csaType === 'concrete' && (
                <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-800 uppercase mb-2">Mix Ratio</label>
                    <select className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-medium focus:border-secondary outline-none bg-white" value={mix} onChange={(e) => setMix(e.target.value)}>
                        <option value="M20">M20 (1:1.5:3)</option>
                        <option value="M15">M15 (1:2:4)</option>
                        <option value="M10">M10 (1:3:6)</option>
                    </select>
                </div>
             )}
          </div>
          <div className="grid grid-cols-3 gap-4">
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Length (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={csaDim.l} onChange={e=>setCsaDim({...csaDim, l: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Width (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={csaDim.w} onChange={e=>setCsaDim({...csaDim, w: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Thick (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={csaDim.t} onChange={e=>setCsaDim({...csaDim, t: Number(e.target.value)})}/></div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl space-y-3 shadow-lg">
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Cement (50kg):</span> <span className="text-white font-mono font-bold text-lg">{csa.cement} bags</span></div>
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Sand:</span> <span className="text-white font-mono font-bold text-lg">{csa.sand} cu.ft</span></div>
             {csaType === 'concrete' && <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Aggregate:</span> <span className="text-white font-mono font-bold text-lg">{csa.agg} cu.ft</span></div>}
             <div className="border-t border-slate-600 pt-3 mt-3 flex justify-between text-secondary font-bold text-xl">
                <span>Est. Cost:</span>
                <span>Rs. {csa.totalCost.toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Brick Content */}
      {activeTab === 'brick' && (
        <div className="space-y-6 animate-in fade-in">
           <div className="grid grid-cols-3 gap-4">
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Length (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={brickDim.l} onChange={e=>setBrickDim({...brickDim, l: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Height (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={brickDim.h} onChange={e=>setBrickDim({...brickDim, h: Number(e.target.value)})}/></div>
             <div>
               <label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Wall Type</label>
               <select className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-medium focus:border-secondary outline-none bg-white h-[50px]" value={brickDim.thick} onChange={e=>setBrickDim({...brickDim, thick: Number(e.target.value)})}>
                 <option value={9}>9" Full</option>
                 <option value={4}>4" Half</option>
               </select>
             </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl space-y-3 shadow-lg">
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Total Bricks:</span> <span className="text-white font-mono font-bold text-lg">{brick.bricks} pcs</span></div>
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Mortar Cement:</span> <span className="text-white font-mono font-bold text-lg">{brick.cement} bags</span></div>
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Mortar Sand:</span> <span className="text-white font-mono font-bold text-lg">{brick.sand} cu.ft</span></div>
             <div className="border-t border-slate-600 pt-3 mt-3 flex justify-between text-secondary font-bold text-xl">
                <span>Est. Cost:</span>
                <span>Rs. {brick.totalCost.toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Steel Content */}
      {activeTab === 'steel' && (
        <div className="space-y-6 animate-in fade-in">
           <div className="grid grid-cols-3 gap-4">
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Dia (mm)</label>
               <select className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-medium focus:border-secondary outline-none bg-white h-[50px]" value={steel.dia} onChange={e=>setSteel({...steel, dia: Number(e.target.value)})}>
                 <option value={8}>8mm</option>
                 <option value={10}>10mm</option>
                 <option value={12}>12mm</option>
                 <option value={16}>16mm</option>
                 <option value={20}>20mm</option>
                 <option value={25}>25mm</option>
               </select>
             </div>
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Length (ft)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={steel.len} onChange={e=>setSteel({...steel, len: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold text-gray-700 uppercase mb-2 block">Qty (Pcs)</label><input type="number" className="w-full border-2 border-gray-300 p-3 rounded-lg text-gray-900 font-bold focus:border-secondary outline-none bg-white" value={steel.count} onChange={e=>setSteel({...steel, count: Number(e.target.value)})}/></div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl space-y-3 shadow-lg">
             <div className="flex justify-between text-base"><span className="font-bold text-gray-300">Total Weight:</span> <span className="text-white font-mono font-bold text-lg">{rebar.weight} kg</span></div>
             <div className="text-xs text-gray-400 text-right italic">Formula: D²/162 * Length</div>
             <div className="border-t border-slate-600 pt-3 mt-3 flex justify-between text-secondary font-bold text-xl">
                <span>Est. Cost:</span>
                <span>Rs. {Math.round(rebar.cost).toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Rate Config */}
      <div className="mt-8 pt-6 border-t border-gray-100">
         <details className="group">
            <summary className="text-sm font-bold text-gray-500 cursor-pointer hover:text-primary list-none flex items-center gap-2 select-none">
               <div className="bg-gray-200 p-1 rounded"><DollarSign size={14}/></div> Edit Market Rates (NPR)
            </summary>
            <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
               <div><label className="text-xs font-bold text-gray-600 block mb-1">Cement (Bag)</label><input type="number" className="w-full border rounded p-2 text-gray-900 bg-white" value={rates.cement} onChange={e=>setRates({...rates, cement: Number(e.target.value)})}/></div>
               <div><label className="text-xs font-bold text-gray-600 block mb-1">Sand (Cu.ft)</label><input type="number" className="w-full border rounded p-2 text-gray-900 bg-white" value={rates.sand} onChange={e=>setRates({...rates, sand: Number(e.target.value)})}/></div>
               <div><label className="text-xs font-bold text-gray-600 block mb-1">Agg. (Cu.ft)</label><input type="number" className="w-full border rounded p-2 text-gray-900 bg-white" value={rates.agg} onChange={e=>setRates({...rates, agg: Number(e.target.value)})}/></div>
               <div><label className="text-xs font-bold text-gray-600 block mb-1">Brick (Pc)</label><input type="number" className="w-full border rounded p-2 text-gray-900 bg-white" value={rates.brick} onChange={e=>setRates({...rates, brick: Number(e.target.value)})}/></div>
               <div><label className="text-xs font-bold text-gray-600 block mb-1">Steel (Kg)</label><input type="number" className="w-full border rounded p-2 text-gray-900 bg-white" value={rates.steel} onChange={e=>setRates({...rates, steel: Number(e.target.value)})}/></div>
            </div>
         </details>
      </div>
    </div>
  );
};

export default MaterialCalculator;