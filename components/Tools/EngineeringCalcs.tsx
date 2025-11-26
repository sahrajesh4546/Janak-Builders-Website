import React, { useState } from 'react';
import { Settings, Zap, Droplets, Sun, Battery, HardHat, TrendingUp, Anchor, Triangle, Wrench, Wind, Activity, Database, Ruler } from 'lucide-react';

type CalcType = 'ohms' | 'battery' | 'solar' | 'pump' | 'gear' | 'beam' | 'column' | 'soil' | 
                'bolt' | 'shaft' | 'hvac' | 'led' | 'wire' | 'pipe' | 'mat_prop' | 'tolerance';

const EngineeringCalcs: React.FC = () => {
  const [calcType, setCalcType] = useState<CalcType>('tolerance');

  // Input States
  const [ohms, setOhms] = useState({ v: 0, i: 0, r: 0 });
  const [battery, setBattery] = useState({ v: 12, ah: 150, load: 500, eff: 0.8 });
  const [solar, setSolar] = useState({ usage: 10, sun: 5, panel: 400 }); // usage in kWh
  const [pump, setPump] = useState({ q: 500, h: 50, sg: 1, eff: 0.75 }); // gpm, ft
  const [gear, setGear] = useState({ t1: 20, t2: 60 });
  
  // Civil States
  const [beam, setBeam] = useState({ span: 5, load: 20, width: 230, depth: 350 }); // m, kN/m, mm, mm
  const [column, setColumn] = useState({ width: 300, depth: 300, fck: 20, steel: 4 }); // mm, mm, M20, 4 bars of 16mm (approx area input or bar count)
  const [soil, setSoil] = useState({ type: 'soft_clay', depth: 1.5 });

  // New Tools States
  const [bolt, setBolt] = useState({ dia: 12, grade: '8.8' }); // mm
  const [shaft, setShaft] = useState({ power: 10, rpm: 1440, stress: 40 }); // kW, rpm, MPa
  const [hvac, setHvac] = useState({ area: 500, people: 4, windows: 3 }); // sqft
  const [led, setLed] = useState({ vs: 12, vf: 3.3, if: 20 }); // V, V, mA
  const [wire, setWire] = useState({ i: 10, len: 50, volt: 220, drop: 3 }); // A, m, V, %
  const [pipe, setPipe] = useState({ flow: 100, dia: 50, len: 100, f: 0.02 }); // LPM, mm, m, friction
  const [matProp, setMatProp] = useState('mild_steel');
  
  // Updated Tolerance State
  const [tolerance, setTolerance] = useState({ fit: 'H7g6', dia: 25 });

  // Results Logic
  const getOhmsResult = () => {
    if (ohms.v === 0 && ohms.i > 0 && ohms.r > 0) return `Voltage (V) = ${(ohms.i * ohms.r).toFixed(2)} V`;
    if (ohms.i === 0 && ohms.v > 0 && ohms.r > 0) return `Current (I) = ${(ohms.v / ohms.r).toFixed(2)} A`;
    if (ohms.r === 0 && ohms.v > 0 && ohms.i > 0) return `Resistance (R) = ${(ohms.v / ohms.i).toFixed(2)} Ω`;
    return "Enter any two values.";
  };

  const getBatteryResult = () => {
    const time = (battery.ah * battery.v * battery.eff) / battery.load;
    return `Backup Time: ${time.toFixed(2)} Hours`;
  };

  const getSolarResult = () => {
    const dailyWh = solar.usage * 1000;
    const reqWatts = (dailyWh / solar.sun) * 1.3;
    const panels = Math.ceil(reqWatts / solar.panel);
    return `System Size: ${(reqWatts/1000).toFixed(2)} kW\nPanels Needed: ${panels} (${solar.panel}W each)`;
  };

  const getPumpResult = () => {
    const hp = (pump.q * pump.h * pump.sg) / (3960 * pump.eff);
    return `Pump Power: ${hp.toFixed(2)} HP`;
  };

  const getGearResult = () => {
    const ratio = gear.t2 / gear.t1;
    return `Gear Ratio: 1 : ${ratio.toFixed(2)}`;
  };

  const getBeamResult = () => {
    const M = (beam.load * Math.pow(beam.span, 2)) / 8; // kNm
    const M_Nmm = M * 1000000;
    const stress = (6 * M_Nmm) / (beam.width * Math.pow(beam.depth, 2));
    return `Max Moment: ${M.toFixed(2)} kNm\nBending Stress: ${stress.toFixed(2)} N/mm²`;
  };

  const getColumnResult = () => {
    const Asc = column.steel * 201; 
    const Ag = column.width * column.depth;
    const Ac = Ag - Asc;
    const fy = 500;
    const Pu = (0.4 * column.fck * Ac) + (0.67 * fy * Asc); // Newtons
    const Pu_kN = Pu / 1000;
    return `Axial Capacity: ${Pu_kN.toFixed(1)} kN\n(approx ${Math.floor(Pu_kN/10)} tons)`;
  };

  const getSoilResult = () => {
    const sbcMap: Record<string, number> = {
        'soft_clay': 50, 'stiff_clay': 150, 'medium_sand': 200,
        'dense_sand': 300, 'soft_rock': 500, 'hard_rock': 3000
    };
    let sbc = sbcMap[soil.type] || 100;
    if (soil.type.includes('sand') && soil.depth > 1) sbc += (soil.depth - 1) * 10;
    return `Safe Bearing Capacity: ~${sbc} kN/m²\n(Allowable Soil Pressure)`;
  };

  const getBoltResult = () => {
    const gradeMap: any = { '4.6': { y: 240 }, '8.8': { y: 640 }, '10.9': { y: 900 }, '12.9': { y: 1100 } };
    const yieldStrength = gradeMap[bolt.grade]?.y || 640;
    const stressArea = 0.7854 * Math.pow(bolt.dia - (0.938 * 1.5), 2); // approx pitch 1.5
    const preload = 0.75 * stressArea * yieldStrength * 0.85; // 75% proof
    const torque = 0.2 * (bolt.dia/1000) * preload; // Nm
    const shear = 0.6 * yieldStrength * stressArea; // Shear strength approx 0.6 * Yield * Area
    return `Rec. Torque: ${torque.toFixed(1)} Nm\nMax Shear: ${(shear/1000).toFixed(1)} kN`;
  };

  const getShaftResult = () => {
    const P_watts = shaft.power * 1000;
    const T = (P_watts * 60) / (2 * Math.PI * shaft.rpm); // Nm
    const T_Nmm = T * 1000;
    const dia = Math.pow( (16 * T_Nmm) / (Math.PI * shaft.stress), 1/3 );
    return `Torque: ${T.toFixed(1)} Nm\nMin Diameter: ${dia.toFixed(2)} mm`;
  };

  const getHvacResult = () => {
    const baseBTU = (hvac.area * 30); // 30 BTU per sqft avg
    const peopleBTU = hvac.people * 400;
    const windowBTU = hvac.windows * 1000;
    const totalBTU = baseBTU + peopleBTU + windowBTU;
    const tons = totalBTU / 12000;
    return `Cooling Load: ${Math.ceil(totalBTU).toLocaleString()} BTU/hr\nRequired Capacity: ${tons.toFixed(1)} Tons`;
  };

  const getLedResult = () => {
    const i_amps = led.if / 1000;
    const r = (led.vs - led.vf) / i_amps;
    const p = Math.pow(i_amps, 2) * r;
    return `Resistor: ${Math.ceil(r)} Ω\nPower: ${p.toFixed(2)} W`;
  };

  const getWireResult = () => {
    const v_loss = (wire.drop / 100) * wire.volt;
    const rho = 0.0175; // Cu
    const area = (2 * rho * wire.len * wire.i) / v_loss;
    return `Max Voltage Drop: ${v_loss.toFixed(1)} V\nMin Wire Area: ${area.toFixed(2)} mm²`;
  };

  const getPipeResult = () => {
    const d_m = pipe.dia / 1000;
    const area = (Math.PI/4) * d_m * d_m;
    const q_m3s = pipe.flow / 60000;
    const v = q_m3s / area;
    const rho = 1000; // Water
    const dp = pipe.f * (pipe.len / d_m) * (rho * v * v) / 2;
    const bar = dp / 100000;
    return `Velocity: ${v.toFixed(2)} m/s\nPressure Drop: ${bar.toFixed(3)} bar`;
  };

  const getMaterialData = () => {
    const db: Record<string, string> = {
        'mild_steel': 'Density: 7850 kg/m³\nYield: 250 MPa\nModulus: 200 GPa',
        'stainless_304': 'Density: 8000 kg/m³\nYield: 215 MPa\nModulus: 193 GPa',
        'aluminum_6061': 'Density: 2700 kg/m³\nYield: 276 MPa\nModulus: 69 GPa',
        'concrete_m20': 'Density: 2400 kg/m³\nCompressive: 20 MPa\nModulus: 22 GPa',
        'copper': 'Density: 8960 kg/m³\nYield: 70 MPa\nModulus: 117 GPa',
        'glass': 'Density: 2500 kg/m³\nStrength: ~50 MPa\nModulus: 70 GPa',
    };
    return db[matProp] || 'Select Material';
  };

  const getToleranceResult = () => {
    const dia = tolerance.dia;
    // Simplified lookup for H7 Hole (values in microns)
    let h7_upper = 0;
    if (dia <= 3) h7_upper = 10;
    else if (dia <= 6) h7_upper = 12;
    else if (dia <= 10) h7_upper = 15;
    else if (dia <= 18) h7_upper = 18;
    else if (dia <= 30) h7_upper = 21;
    else if (dia <= 50) h7_upper = 25;
    else if (dia <= 80) h7_upper = 30;
    else h7_upper = 35; // > 80

    // Shaft Lookups (microns)
    let s_upper = 0, s_lower = 0;
    
    if (tolerance.fit === 'H7g6') {
        // g6
        if (dia <= 3) { s_upper = -2; s_lower = -8; }
        else if (dia <= 6) { s_upper = -4; s_lower = -12; }
        else if (dia <= 10) { s_upper = -5; s_lower = -14; }
        else if (dia <= 18) { s_upper = -6; s_lower = -17; }
        else if (dia <= 30) { s_upper = -7; s_lower = -20; }
        else if (dia <= 50) { s_upper = -9; s_lower = -25; }
        else { s_upper = -10; s_lower = -29; }
    } else if (tolerance.fit === 'H7k6') {
        // k6
        if (dia <= 3) { s_upper = 6; s_lower = 0; }
        else if (dia <= 6) { s_upper = 9; s_lower = 1; }
        else if (dia <= 10) { s_upper = 10; s_lower = 1; }
        else if (dia <= 18) { s_upper = 12; s_lower = 1; }
        else if (dia <= 30) { s_upper = 15; s_lower = 2; }
        else if (dia <= 50) { s_upper = 18; s_lower = 2; }
        else { s_upper = 21; s_lower = 2; }
    } else if (tolerance.fit === 'H7p6') {
        // p6
        if (dia <= 3) { s_upper = 12; s_lower = 6; }
        else if (dia <= 6) { s_upper = 20; s_lower = 12; }
        else if (dia <= 10) { s_upper = 24; s_lower = 15; }
        else if (dia <= 18) { s_upper = 29; s_lower = 18; }
        else if (dia <= 30) { s_upper = 35; s_lower = 22; }
        else if (dia <= 50) { s_upper = 42; s_lower = 26; }
        else { s_upper = 51; s_lower = 32; }
    } else if (tolerance.fit === 'H11c11') {
         // rough approx for loose fit
         h7_upper = h7_upper * 10; // H11 is huge
         s_upper = -1 * h7_upper;
         s_lower = -2 * h7_upper;
    }

    const h_min = dia;
    const h_max = dia + (h7_upper/1000);
    const s_max = dia + (s_upper/1000);
    const s_min = dia + (s_lower/1000);

    const fitType = tolerance.fit === 'H7g6' ? 'Clearance (Running)' : tolerance.fit === 'H7k6' ? 'Transition (Locational)' : tolerance.fit === 'H7p6' ? 'Interference (Press)' : 'Loose Running';

    return `
      Fit Type: ${fitType}
      ---------------------------
      Hole (H7): ${h_min.toFixed(3)} to ${h_max.toFixed(3)} mm (+${h7_upper} / 0 μm)
      Shaft (${tolerance.fit.slice(2)}): ${s_min.toFixed(3)} to ${s_max.toFixed(3)} mm (${s_lower} / ${s_upper} μm)
    `;
  };

  const calculators = [
    { id: 'tolerance', label: 'Tolerance & Fits', icon: <Ruler size={18}/> },
    { id: 'beam', label: 'Beam Design', icon: <TrendingUp size={18}/> },
    { id: 'column', label: 'Column Load', icon: <Anchor size={18}/> },
    { id: 'soil', label: 'Soil Bearing', icon: <HardHat size={18}/> },
    { id: 'bolt', label: 'Bolt Strength', icon: <Wrench size={18}/> },
    { id: 'shaft', label: 'Shaft Design', icon: <Settings size={18}/> },
    { id: 'hvac', label: 'HVAC Load', icon: <Wind size={18}/> },
    { id: 'led', label: 'LED Resistor', icon: <Zap size={18}/> },
    { id: 'wire', label: 'Wire Sizing', icon: <Activity size={18}/> },
    { id: 'ohms', label: "Ohm's Law", icon: <Zap size={18}/> },
    { id: 'battery', label: 'Battery Backup', icon: <Battery size={18}/> },
    { id: 'solar', label: 'Solar Sizing', icon: <Sun size={18}/> },
    { id: 'pipe', label: 'Pipe Pressure', icon: <Droplets size={18}/> },
    { id: 'pump', label: 'Pump HP', icon: <Droplets size={18}/> },
    { id: 'gear', label: 'Gear Ratio', icon: <Settings size={18}/> },
    { id: 'mat_prop', label: 'Material DB', icon: <Database size={18}/> },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-t-8 border-secondary h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Settings size={28} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gray-900">Engineering Toolbox</h3>
            <p className="text-sm text-gray-500 font-medium">Civil, Mech, Elec & General</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">Select Tool</label>
        <select 
            value={calcType} 
            onChange={(e) => setCalcType(e.target.value as CalcType)}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-secondary outline-none text-gray-900 font-bold text-lg bg-gray-50"
        >
            {calculators.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <div className="flex-grow space-y-6 animate-in fade-in">
        {/* CIVIL TOOLS */}
        {calcType === 'beam' && (
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-sm text-gray-500 italic mb-2">Simply Supported Beam Analysis (UDL)</div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Span (m)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={beam.span} onChange={e=>setBeam({...beam, span: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Load (kN/m)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={beam.load} onChange={e=>setBeam({...beam, load: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Width (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={beam.width} onChange={e=>setBeam({...beam, width: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Depth (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={beam.depth} onChange={e=>setBeam({...beam, depth: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getBeamResult()}</div>
            </div>
        )}

        {calcType === 'column' && (
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-sm text-gray-500 italic mb-2">Short Axial Column Capacity (IS 456)</div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Width (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={column.width} onChange={e=>setColumn({...column, width: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Depth (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={column.depth} onChange={e=>setColumn({...column, depth: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Concrete (fck)</label><select className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={column.fck} onChange={e=>setColumn({...column, fck: Number(e.target.value)})}>
                    <option value={15}>M15</option>
                    <option value={20}>M20</option>
                    <option value={25}>M25</option>
                    <option value={30}>M30</option>
                </select></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Rebar (16mm pcs)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={column.steel} onChange={e=>setColumn({...column, steel: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getColumnResult()}</div>
            </div>
        )}

        {calcType === 'soil' && (
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-sm text-gray-500 italic mb-2">Presumptive Safe Bearing Capacity</div>
                <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">Soil Type</label>
                    <select className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={soil.type} onChange={e=>setSoil({...soil, type: e.target.value})}>
                        <option value="soft_clay">Soft Clay / Silt</option>
                        <option value="stiff_clay">Stiff Clay</option>
                        <option value="medium_sand">Medium Sand</option>
                        <option value="dense_sand">Dense Sand / Gravel</option>
                        <option value="soft_rock">Soft Rock</option>
                        <option value="hard_rock">Hard Rock</option>
                    </select>
                </div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Depth (m)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={soil.depth} onChange={e=>setSoil({...soil, depth: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getSoilResult()}</div>
            </div>
        )}

        {/* MECHANICAL TOOLS */}
        {calcType === 'bolt' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Bolt Dia (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={bolt.dia} onChange={e=>setBolt({...bolt, dia: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Grade</label><select className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={bolt.grade} onChange={e=>setBolt({...bolt, grade: e.target.value})}>
                    <option value="4.6">4.6</option>
                    <option value="8.8">8.8</option>
                    <option value="10.9">10.9</option>
                    <option value="12.9">12.9</option>
                </select></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getBoltResult()}</div>
            </div>
        )}

        {calcType === 'shaft' && (
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-sm text-gray-500 italic mb-2">Power Transmission Shaft</div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Power (kW)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={shaft.power} onChange={e=>setShaft({...shaft, power: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Speed (RPM)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={shaft.rpm} onChange={e=>setShaft({...shaft, rpm: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Max Shear (MPa)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={shaft.stress} onChange={e=>setShaft({...shaft, stress: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getShaftResult()}</div>
            </div>
        )}

        {calcType === 'hvac' && (
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-sm text-gray-500 italic mb-2">Cooling Load Estimation</div>
                <div className="col-span-2"><label className="text-xs font-bold text-gray-700 block mb-1">Room Area (sq. ft)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={hvac.area} onChange={e=>setHvac({...hvac, area: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Occupancy</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={hvac.people} onChange={e=>setHvac({...hvac, people: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Windows</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={hvac.windows} onChange={e=>setHvac({...hvac, windows: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getHvacResult()}</div>
            </div>
        )}

        {/* ELECTRICAL TOOLS */}
        {calcType === 'led' && (
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="text-xs font-bold text-gray-700 block mb-1">Source Voltage (Vs)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={led.vs} onChange={e=>setLed({...led, vs: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">LED Voltage (Vf)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={led.vf} onChange={e=>setLed({...led, vf: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">LED Current (mA)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={led.if} onChange={e=>setLed({...led, if: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getLedResult()}</div>
            </div>
        )}

        {calcType === 'wire' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Current (Amps)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={wire.i} onChange={e=>setWire({...wire, i: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Length (m)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={wire.len} onChange={e=>setWire({...wire, len: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Voltage (V)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={wire.volt} onChange={e=>setWire({...wire, volt: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Max Drop (%)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={wire.drop} onChange={e=>setWire({...wire, drop: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getWireResult()}</div>
            </div>
        )}

        {calcType === 'ohms' && (
            <div className="grid grid-cols-3 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Volts (V)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={ohms.v} onChange={e=>setOhms({...ohms, v: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Amps (I)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={ohms.i} onChange={e=>setOhms({...ohms, i: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Ohms (R)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={ohms.r} onChange={e=>setOhms({...ohms, r: Number(e.target.value)})}/></div>
                <div className="col-span-3 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-xl shadow-md">{getOhmsResult()}</div>
            </div>
        )}

        {calcType === 'battery' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Battery (Ah)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={battery.ah} onChange={e=>setBattery({...battery, ah: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Volts (V)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={battery.v} onChange={e=>setBattery({...battery, v: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Total Load (Watts)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={battery.load} onChange={e=>setBattery({...battery, load: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Efficiency (0-1)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={battery.eff} onChange={e=>setBattery({...battery, eff: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-xl shadow-md">{getBatteryResult()}</div>
            </div>
        )}

        {calcType === 'solar' && (
             <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="text-xs font-bold text-gray-700 block mb-1">Daily Usage (kWh)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={solar.usage} onChange={e=>setSolar({...solar, usage: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Peak Sun Hours</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={solar.sun} onChange={e=>setSolar({...solar, sun: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Panel Size (W)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={solar.panel} onChange={e=>setSolar({...solar, panel: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getSolarResult()}</div>
            </div>
        )}

        {/* FLUID TOOLS */}
        {calcType === 'pipe' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Flow (LPM)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pipe.flow} onChange={e=>setPipe({...pipe, flow: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Dia (mm)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pipe.dia} onChange={e=>setPipe({...pipe, dia: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Length (m)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pipe.len} onChange={e=>setPipe({...pipe, len: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Friction (f)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pipe.f} onChange={e=>setPipe({...pipe, f: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-xl shadow-md">{getPipeResult()}</div>
            </div>
        )}

        {calcType === 'pump' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Flow (GPM)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pump.q} onChange={e=>setPump({...pump, q: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Head (ft)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pump.h} onChange={e=>setPump({...pump, h: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Specific Gravity</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pump.sg} onChange={e=>setPump({...pump, sg: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Efficiency (0-1)</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={pump.eff} onChange={e=>setPump({...pump, eff: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-xl shadow-md">{getPumpResult()}</div>
            </div>
        )}

        {/* GENERAL TOOLS */}
        {calcType === 'gear' && (
             <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Driver Teeth</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={gear.t1} onChange={e=>setGear({...gear, t1: Number(e.target.value)})}/></div>
                <div><label className="text-xs font-bold text-gray-700 block mb-1">Driven Teeth</label><input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={gear.t2} onChange={e=>setGear({...gear, t2: Number(e.target.value)})}/></div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-xl shadow-md">{getGearResult()}</div>
            </div>
        )}

        {calcType === 'mat_prop' && (
             <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Select Material</label>
                    <select className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={matProp} onChange={e=>setMatProp(e.target.value)}>
                        <option value="mild_steel">Mild Steel (Grade 250)</option>
                        <option value="stainless_304">Stainless Steel 304</option>
                        <option value="aluminum_6061">Aluminum 6061</option>
                        <option value="concrete_m20">Concrete M20</option>
                        <option value="copper">Copper (Pure)</option>
                        <option value="glass">Glass (Plate)</option>
                    </select>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getMaterialData()}</div>
            </div>
        )}

        {calcType === 'tolerance' && (
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Nominal Dia (mm)</label>
                    <input type="number" className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={tolerance.dia} onChange={e=>setTolerance({...tolerance, dia: Number(e.target.value)})}/>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Standard Fit (Hole Basis)</label>
                    <select className="w-full p-3 border rounded text-gray-900 font-bold bg-white" value={tolerance.fit} onChange={e=>setTolerance({...tolerance, fit: e.target.value})}>
                        <option value="H7g6">H7/g6 (Precision Running)</option>
                        <option value="H7k6">H7/k6 (Transition)</option>
                        <option value="H7p6">H7/p6 (Interference)</option>
                        <option value="H11c11">H11/c11 (Loose)</option>
                    </select>
                </div>
                <div className="col-span-2 bg-slate-800 p-4 rounded-xl text-secondary font-bold text-center text-lg whitespace-pre-line shadow-md">{getToleranceResult()}</div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EngineeringCalcs;