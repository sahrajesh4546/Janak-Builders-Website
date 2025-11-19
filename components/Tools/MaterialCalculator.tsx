import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';

const MaterialCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'csa' | 'brick' | 'steel'>('csa');

  // --- CSA STATE ---
  const [csaDim, setCsaDim] = useState({ l: 100, w: 100, t: 0.5 }); // feet
  const [mix, setMix] = useState('M20'); // M20 = 1:1.5:3
  const [csaType, setCsaType] = useState<'concrete' | 'plaster' | 'mortar'>('concrete');
  
  // --- BRICK STATE ---
  const [brickDim, setBrickDim] = useState({ l: 100, h: 10, thick: 9 }); // feet, inches
  const [brickSize, setBrickSize] = useState('standard'); // Standard Nepal 230x110x55mm

  // --- STEEL STATE ---
  const [steel, setSteel] = useState({ dia: 12, len: 40, count: 50 }); // mm, feet, number

  // --- RATES STATE (NPR) ---
  const [rates, setRates] = useState({ 
    cement: 850, // per bag
    sand: 90,    // per cu.ft
    agg: 85,     // per cu.ft
    brick: 18,   // per piece
    steel: 115   // per kg
  });

  // --- CALCULATIONS ---
  
  const calculateCSA = () => {
    const vol = csaDim.l * csaDim.w * csaDim.t; // Wet Volume in Cu.ft
    
    let cementBags = 0, sandVol = 0, aggVol = 0;
    let dryVol = 0;

    if (csaType === 'concrete') {
      dryVol = vol * 1.54; // Safety factor for concrete
      let ratio = [1, 1.5, 3];
      if (mix === 'M15') ratio = [1, 2, 4];
      if (mix === 'M10') ratio = [1, 3, 6];
      const sum = ratio[0] + ratio[1] + ratio[2];

      cementBags = (ratio[0] / sum) * dryVol / 1.226; // 1 bag cement = 1.226 cu.ft
      sandVol = (ratio[1] / sum) * dryVol;
      aggVol = (ratio[2] / sum) * dryVol;
    } else if (csaType === 'plaster') {
      // Assuming 12mm plaster
      dryVol = vol * 1.33; // Safety factor for mortar
      // Ratio 1:4 for ceiling/external, 1:6 for internal. Let's avg 1:5
      const ratio = [1, 5];
      const sum = 6;
      cementBags = (ratio[0] / sum) * dryVol / 1.226;
      sandVol = (ratio[1] / sum) * dryVol;
      aggVol = 0;
    } else {
      // Mortar
      dryVol = vol * 1.30; 
      const ratio = [1, 6]; // Standard brickwork mortar
      const sum = 7;
      cementBags = (ratio[0] / sum) * dryVol / 1.226;
      sandVol = (ratio[1] / sum) * dryVol;
      aggVol = 0;
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
    // Multiplier per sq.ft (Standard Nepal Brick size approx 9"x4.5"x2.5")
    // 9" Wall ~ 12.5 - 13.5 bricks per sq.ft
    // 4" Wall ~ 4.5 - 5 bricks per sq.ft
    const multiplier = brickDim.thick === 9 ? 13.5 : 5;
    
    const bricksCount = Math.ceil(wallArea * multiplier);
    
    // Mortar Calculation: Approx 25-30% of wall vol for 9"
    // Rule of thumb: 1 Bag cement for ~350 bricks in 1:6 mortar
    const cementBags = Math.ceil(bricksCount / 350);
    const sandVol = cementBags * 1.226 * 6; // 1:6 ratio

    return {
      bricks: bricksCount,
      cement: cementBags,
      sand: parseFloat(sandVol.toFixed(1)),
      totalCost: (bricksCount * rates.brick) + (cementBags * rates.cement) + (sandVol * rates.sand)
    };
  };

  const calculateSteel = () => {
    // Weight formula: (D^2 / 162) * L (where D in mm, L in meters)
    // We have L in feet
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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
            <Calculator size={24} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-primary">Material & Rate Analysis</h3>
            <p className="text-xs text-gray-500">Nepal Standard Estimates</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('csa')} className={`flex-1 py-2 text-sm font-bold ${activeTab === 'csa' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}>Concrete/Plaster</button>
        <button onClick={() => setActiveTab('brick')} className={`flex-1 py-2 text-sm font-bold ${activeTab === 'brick' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}>Bricks</button>
        <button onClick={() => setActiveTab('steel')} className={`flex-1 py-2 text-sm font-bold ${activeTab === 'steel' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}>Steel</button>
      </div>

      {/* Concrete / CSA Content */}
      {activeTab === 'csa' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex gap-2 mb-2">
             <select className="border p-2 rounded text-sm flex-1" value={csaType} onChange={(e:any) => setCsaType(e.target.value)}>
                <option value="concrete">RCC Concrete</option>
                <option value="plaster">Plastering</option>
                <option value="mortar">Mortar Only</option>
             </select>
             {csaType === 'concrete' && (
               <select className="border p-2 rounded text-sm flex-1" value={mix} onChange={(e) => setMix(e.target.value)}>
                  <option value="M20">M20 (1:1.5:3)</option>
                  <option value="M15">M15 (1:2:4)</option>
                  <option value="M10">M10 (1:3:6)</option>
               </select>
             )}
          </div>
          <div className="grid grid-cols-3 gap-2">
             <div><label className="text-xs font-bold">Length (ft)</label><input type="number" className="w-full border p-2 rounded" value={csaDim.l} onChange={e=>setCsaDim({...csaDim, l: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold">Width (ft)</label><input type="number" className="w-full border p-2 rounded" value={csaDim.w} onChange={e=>setCsaDim({...csaDim, w: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold">Thick (ft)</label><input type="number" className="w-full border p-2 rounded" value={csaDim.t} onChange={e=>setCsaDim({...csaDim, t: Number(e.target.value)})}/></div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-gray-800">
             <div className="flex justify-between text-sm"><span className="font-bold">Cement (50kg Bags):</span> <span>{csa.cement} bags</span></div>
             <div className="flex justify-between text-sm"><span className="font-bold">Sand:</span> <span>{csa.sand} cu.ft</span></div>
             {csaType === 'concrete' && <div className="flex justify-between text-sm"><span className="font-bold">Aggregate:</span> <span>{csa.agg} cu.ft</span></div>}
             <div className="border-t border-blue-200 pt-2 mt-2 flex justify-between text-gray-900 font-bold">
                <span>Est. Material Cost:</span>
                <span>Rs. {csa.totalCost.toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Brick Content */}
      {activeTab === 'brick' && (
        <div className="space-y-4 animate-in fade-in">
           <div className="grid grid-cols-3 gap-2">
             <div><label className="text-xs font-bold">Length (ft)</label><input type="number" className="w-full border p-2 rounded" value={brickDim.l} onChange={e=>setBrickDim({...brickDim, l: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold">Height (ft)</label><input type="number" className="w-full border p-2 rounded" value={brickDim.h} onChange={e=>setBrickDim({...brickDim, h: Number(e.target.value)})}/></div>
             <div>
               <label className="text-xs font-bold">Wall Type</label>
               <select className="w-full border p-2 rounded h-[42px]" value={brickDim.thick} onChange={e=>setBrickDim({...brickDim, thick: Number(e.target.value)})}>
                 <option value={9}>9" (Full Brick)</option>
                 <option value={4}>4" (Half Brick)</option>
               </select>
             </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg space-y-2 text-gray-800">
             <div className="flex justify-between text-sm"><span className="font-bold">Total Bricks:</span> <span>{brick.bricks} pcs</span></div>
             <div className="flex justify-between text-sm"><span>(Mortar Est.) Cement:</span> <span>{brick.cement} bags</span></div>
             <div className="flex justify-between text-sm"><span>(Mortar Est.) Sand:</span> <span>{brick.sand} cu.ft</span></div>
             <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between text-gray-900 font-bold">
                <span>Est. Material Cost:</span>
                <span>Rs. {brick.totalCost.toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Steel Content */}
      {activeTab === 'steel' && (
        <div className="space-y-4 animate-in fade-in">
           <div className="grid grid-cols-3 gap-2">
             <div><label className="text-xs font-bold">Diameter (mm)</label>
               <select className="w-full border p-2 rounded" value={steel.dia} onChange={e=>setSteel({...steel, dia: Number(e.target.value)})}>
                 <option value={8}>8mm</option>
                 <option value={10}>10mm</option>
                 <option value={12}>12mm</option>
                 <option value={16}>16mm</option>
                 <option value={20}>20mm</option>
                 <option value={25}>25mm</option>
               </select>
             </div>
             <div><label className="text-xs font-bold">Len/Bar (ft)</label><input type="number" className="w-full border p-2 rounded" value={steel.len} onChange={e=>setSteel({...steel, len: Number(e.target.value)})}/></div>
             <div><label className="text-xs font-bold">Quantity</label><input type="number" className="w-full border p-2 rounded" value={steel.count} onChange={e=>setSteel({...steel, count: Number(e.target.value)})}/></div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-800">
             <div className="flex justify-between text-sm"><span className="font-bold">Total Weight:</span> <span>{rebar.weight} kg</span></div>
             <div className="text-xs text-gray-500 text-right">Based on D²/162 formula</div>
             <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-gray-900 font-bold">
                <span>Est. Steel Cost:</span>
                <span>Rs. {Math.round(rebar.cost).toLocaleString()}</span>
             </div>
          </div>
        </div>
      )}

      {/* Rate Config Toggle */}
      <div className="mt-6 pt-4 border-t border-gray-100">
         <details className="group">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-primary list-none flex items-center gap-1">
               <DollarSign size={12}/> Edit Market Rates (NPR)
            </summary>
            <div className="grid grid-cols-2 gap-2 mt-2 bg-gray-50 p-2 rounded text-xs">
               <div><label>Cement (Bag)</label><input type="number" className="w-full border rounded p-1" value={rates.cement} onChange={e=>setRates({...rates, cement: Number(e.target.value)})}/></div>
               <div><label>Sand (Cu.ft)</label><input type="number" className="w-full border rounded p-1" value={rates.sand} onChange={e=>setRates({...rates, sand: Number(e.target.value)})}/></div>
               <div><label>Agg. (Cu.ft)</label><input type="number" className="w-full border rounded p-1" value={rates.agg} onChange={e=>setRates({...rates, agg: Number(e.target.value)})}/></div>
               <div><label>Brick (Pc)</label><input type="number" className="w-full border rounded p-1" value={rates.brick} onChange={e=>setRates({...rates, brick: Number(e.target.value)})}/></div>
               <div><label>Steel (Kg)</label><input type="number" className="w-full border rounded p-1" value={rates.steel} onChange={e=>setRates({...rates, steel: Number(e.target.value)})}/></div>
            </div>
         </details>
      </div>
    </div>
  );
};

export default MaterialCalculator;