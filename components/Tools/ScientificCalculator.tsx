import React, { useState, useRef, useEffect } from 'react';
import { History, Trash2, Delete, Activity } from 'lucide-react';

const Btn = ({ 
  label, 
  onClick, 
  subLabel = null, 
  variant = 'dark',
  active = false,
  cols = 1
}: { 
  label: React.ReactNode, 
  onClick?: () => void, 
  subLabel?: string | null,
  variant?: 'dark' | 'primary' | 'secondary' | 'accent' | 'danger' | 'light',
  active?: boolean,
  cols?: number
}) => {
  const baseStyles = "relative h-14 rounded-lg font-bold text-lg transition-all active:scale-95 flex flex-col items-center justify-center shadow-sm border-b-4 active:border-b-0 active:translate-y-1 select-none";
  
  const variants = {
    dark: "bg-slate-700 text-white border-slate-900 hover:bg-slate-600",
    primary: "bg-blue-600 text-white border-blue-800 hover:bg-blue-500",
    secondary: "bg-yellow-500 text-slate-900 border-yellow-700 hover:bg-yellow-400",
    accent: "bg-indigo-600 text-white border-indigo-800 hover:bg-indigo-500",
    danger: "bg-red-500 text-white border-red-700 hover:bg-red-400",
    light: "bg-gray-200 text-slate-900 border-gray-400 hover:bg-white"
  };

  const activeStyle = "bg-yellow-400 text-slate-900 border-yellow-600 translate-y-1 border-b-0 shadow-inner";
  const style = active ? activeStyle : (variants[variant] || variants.dark);
  
  // Explicit col classes map to ensure Tailwind works without dynamic class names
  const colClasses: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5'
  };
  const colClass = colClasses[cols] || 'col-span-1';

  return (
    <button onClick={onClick} className={`${baseStyles} ${style} ${colClass}`} style={{ gridColumn: `span ${cols}` }}>
      {subLabel && <span className={`text-[10px] absolute top-1 left-1.5 leading-none ${variant === 'light' ? 'text-slate-500' : 'text-yellow-400'} opacity-90 font-normal`}>{subLabel}</span>}
      <span className={subLabel ? 'mt-3' : ''}>{label}</span>
    </button>
  );
};

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  
  const [isRad, setIsRad] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [isHyp, setIsHyp] = useState(false);
  
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastResult, setLastResult] = useState<string>('');
  const [resetOnInput, setResetOnInput] = useState(false);
  
  const displayRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [display]);

  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  const scope = {
    pi: Math.PI,
    e: Math.E,
    // Trig
    sin: (x: number) => isRad ? Math.sin(x) : Math.sin(toRad(x)),
    cos: (x: number) => isRad ? Math.cos(x) : Math.cos(toRad(x)),
    tan: (x: number) => isRad ? Math.tan(x) : Math.tan(toRad(x)),
    asin: (x: number) => isRad ? Math.asin(x) : toDeg(Math.asin(x)),
    acos: (x: number) => isRad ? Math.acos(x) : toDeg(Math.acos(x)),
    atan: (x: number) => isRad ? Math.atan(x) : toDeg(Math.atan(x)),
    // Hyp
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    asinh: Math.asinh,
    acosh: Math.acosh,
    atanh: Math.atanh,
    // Logs & Exp
    log: Math.log10,
    ln: Math.log,
    exp: Math.exp,
    pow10: (x: number) => Math.pow(10, x),
    // Roots & Powers
    sqrt: Math.sqrt,
    cbrt: Math.cbrt,
    pow: Math.pow,
    sq: (x: number) => x * x,
    cb: (x: number) => x * x * x,
    inv: (x: number) => 1 / x,
    // Misc
    abs: Math.abs,
    fact: factorial,
    random: Math.random
  };

  const handleInput = (val: string) => {
    if (resetOnInput) {
      if (['+', '-', '×', '÷', '%', '^'].includes(val)) {
        setDisplay(prev => prev + val);
        setResetOnInput(false);
      } else {
        setDisplay(val);
        setResetOnInput(false);
      }
    } else {
      setDisplay(prev => (prev === '0' && val !== '.') ? val : prev + val);
    }
  };

  const handleFunction = (baseFn: string) => {
    let fn = baseFn;
    
    // Logic for Shift/Hyp modifiers
    if (isShift) {
      const shiftMap: Record<string, string> = {
        'sin': 'asin', 'cos': 'acos', 'tan': 'atan',
        'ln': 'exp', 'log': 'pow10',
        'sqrt': 'sq', '^': 'rt', // Custom handling for root
        '(': 'inv', ')': 'fact'
      };
      if (shiftMap[baseFn]) fn = shiftMap[baseFn];
    } else if (isHyp) {
      const hypMap: Record<string, string> = {
        'sin': 'sinh', 'cos': 'cosh', 'tan': 'tanh'
      };
      if (hypMap[baseFn]) fn = hypMap[baseFn];
    }

    // Custom Input formatting
    if (fn === 'sq') { handleInput('sq('); return; }
    if (fn === 'cb') { handleInput('cb('); return; }
    if (fn === 'inv') { handleInput('inv('); return; }
    if (fn === 'fact') { handleInput('fact('); return; }
    if (fn === 'rt') { handleInput('^(1/'); return; } // y root x -> x^(1/y) - simplified as power fraction

    handleInput(`${fn}(`);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setResetOnInput(false);
  };

  const handleBackspace = () => {
    if (resetOnInput) {
      handleClear();
      return;
    }
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const calculate = () => {
    try {
      let expr = display;
      
      // Pre-processing
      let evalString = expr
        .replace(/Ans/g, lastResult || '0')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/\^/g, '**') 
        .replace(/√\(/g, 'sqrt(');

      // Handle implicit multiplication: 2pi, 2(3), )2
      evalString = evalString.replace(/(\d)(pi|e|[a-z]{2,}[(])/g, '$1*$2');
      evalString = evalString.replace(/(\))(\d|[a-z]{2,}[(])/g, '$1*$2');

      // Map functions to scope
      const functions = Object.keys(scope);
      functions.forEach(fn => {
        const regex = new RegExp(`\\b${fn}\\(`, 'g');
        evalString = evalString.replace(regex, `scope.${fn}(`);
      });

      // Execute safely
      // eslint-disable-next-line no-new-func
      const func = new Function('scope', `with(scope) { return ${evalString} }`);
      const resultVal = func(scope);

      if (!isFinite(resultVal) || isNaN(resultVal)) {
        throw new Error("Math Error");
      }

      let resultStr = '';
      // Formatting
      if (Math.abs(resultVal) > 1e9 || (Math.abs(resultVal) < 1e-7 && resultVal !== 0)) {
        resultStr = resultVal.toExponential(6).replace('e+', 'e');
      } else {
        // limit decimals to prevent overflow but keep precision
        resultStr = parseFloat(resultVal.toFixed(10)).toString();
      }

      setExpression(`${display} =`);
      setDisplay(resultStr);
      setLastResult(resultStr);
      setHistory(prev => [`${display} = ${resultStr}`, ...prev].slice(0, 20));
      setResetOnInput(true);

    } catch (e) {
      setExpression('Error');
      setResetOnInput(true);
    }
  };

  // Removed h-full and replaced with h-auto and w-full to prevent layout breakage in new grid
  return (
    <div className="bg-slate-800 p-4 rounded-2xl shadow-2xl border-t-4 border-secondary w-full h-auto flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-600">
        <div className="flex items-center gap-3">
          <div className="bg-secondary p-2 rounded-lg text-primary shadow-lg">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Engineering Calc</h3>
            <p className="text-[10px] text-gray-400 tracking-wider">Advanced Mode</p>
          </div>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded transition ${showHistory ? 'text-secondary bg-white/10' : 'text-gray-400 hover:text-white'}`}>
            <History size={20} />
        </button>
      </div>

      {/* Display */}
      <div className="bg-[#c9dcc5] p-3 rounded-lg mb-4 shadow-inner border-4 border-slate-600 flex flex-col justify-between h-28 relative font-mono">
        <div className="text-[10px] font-bold text-slate-700 flex gap-2 opacity-80">
           <span className={isShift ? "bg-slate-800 text-yellow-400 px-1 rounded" : ""}>SHIFT</span>
           <span className={isHyp ? "bg-slate-800 text-yellow-400 px-1 rounded" : ""}>HYP</span>
           <span>{isRad ? 'RAD' : 'DEG'}</span>
        </div>
        <div className="text-slate-600 text-sm text-right overflow-hidden whitespace-nowrap min-h-[20px]">
          {expression}
        </div>
        <input 
            ref={displayRef}
            type="text" 
            value={display} 
            readOnly 
            className="w-full bg-transparent border-none outline-none text-3xl text-slate-900 text-right font-bold tracking-widest" 
        />
      </div>

      {/* History Drawer */}
      {showHistory && (
          <div className="absolute top-28 left-4 right-4 bottom-4 bg-slate-900/95 backdrop-blur z-20 rounded-xl p-4 overflow-hidden flex flex-col border border-slate-600 shadow-2xl animate-in fade-in slide-in-from-top-4">
             <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700">
                 <span className="text-secondary font-bold text-sm">Calculation Tape</span>
                 <button onClick={() => setHistory([])} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
             </div>
             <div className="overflow-y-auto flex-grow space-y-2 pr-1 custom-scrollbar">
                 {history.length === 0 && <p className="text-gray-500 text-xs text-center mt-10">No history yet</p>}
                 {history.map((item, idx) => (
                     <div key={idx} className="bg-slate-800 p-2 rounded border border-slate-700 hover:border-secondary cursor-pointer" onClick={() => { handleInput(item.split('=')[1].trim()); setShowHistory(false); }}>
                         <div className="text-xs text-gray-400 mb-1">{item.split('=')[0]}</div>
                         <div className="text-right text-lg font-bold text-secondary">{item.split('=')[1]}</div>
                     </div>
                 ))}
             </div>
             <button onClick={() => setShowHistory(false)} className="mt-3 w-full py-2 bg-slate-700 text-white rounded text-xs font-bold hover:bg-slate-600">CLOSE</button>
          </div>
      )}

      {/* Keypad Grid - 5 Columns */}
      <div className="grid grid-cols-5 gap-2 md:gap-2.5 content-end">
        {/* Row 1 - Modifiers */}
        <Btn label="SHIFT" onClick={() => setIsShift(!isShift)} active={isShift} variant="accent" />
        <Btn label={isRad ? "RAD" : "DEG"} onClick={() => setIsRad(!isRad)} variant="dark" />
        <Btn label="hyp" onClick={() => setIsHyp(!isHyp)} active={isHyp} variant="dark" />
        <Btn label="(" subLabel="1/x" onClick={() => handleFunction('(')} variant="dark" />
        <Btn label=")" subLabel="x!" onClick={() => handleFunction(')')} variant="dark" />

        {/* Row 2 - Trig & Clear */}
        <Btn label="sin" subLabel="sin⁻¹" onClick={() => handleFunction('sin')} variant="dark" />
        <Btn label="cos" subLabel="cos⁻¹" onClick={() => handleFunction('cos')} variant="dark" />
        <Btn label="tan" subLabel="tan⁻¹" onClick={() => handleFunction('tan')} variant="dark" />
        <Btn label="C" onClick={handleClear} variant="danger" />
        <Btn label={<Delete size={22}/>} onClick={handleBackspace} variant="danger" />

        {/* Row 3 - Advanced Math */}
        <Btn label="x²" subLabel="√" onClick={() => isShift ? handleInput('√(') : handleInput('sq(')} variant="dark" />
        <Btn label="^" subLabel="y√x" onClick={() => handleFunction('^')} variant="dark" />
        <Btn label="log" subLabel="10ˣ" onClick={() => handleFunction('log')} variant="dark" />
        <Btn label="ln" subLabel="eˣ" onClick={() => handleFunction('ln')} variant="dark" />
        <Btn label="√" subLabel="x³" onClick={() => isShift ? handleInput('cb(') : handleInput('sqrt(')} variant="dark" />

        {/* Row 4 - Numbers & Ops */}
        <Btn label="7" onClick={() => handleInput('7')} variant="light" />
        <Btn label="8" onClick={() => handleInput('8')} variant="light" />
        <Btn label="9" onClick={() => handleInput('9')} variant="light" />
        <Btn label="÷" onClick={() => handleInput('÷')} variant="primary" />
        <Btn label="×" onClick={() => handleInput('×')} variant="primary" />

        {/* Row 5 */}
        <Btn label="4" onClick={() => handleInput('4')} variant="light" />
        <Btn label="5" onClick={() => handleInput('5')} variant="light" />
        <Btn label="6" onClick={() => handleInput('6')} variant="light" />
        <Btn label="-" onClick={() => handleInput('-')} variant="primary" />
        <Btn label="+" onClick={() => handleInput('+')} variant="primary" />

        {/* Row 6 */}
        <Btn label="1" onClick={() => handleInput('1')} variant="light" />
        <Btn label="2" onClick={() => handleInput('2')} variant="light" />
        <Btn label="3" onClick={() => handleInput('3')} variant="light" />
        <Btn label="π" onClick={() => handleInput('pi')} variant="dark" />
        <Btn label="e" onClick={() => handleInput('e')} variant="dark" />

        {/* Row 7 */}
        <Btn label="0" onClick={() => handleInput('0')} variant="light" cols={2} />
        <Btn label="." onClick={() => handleInput('.')} variant="light" />
        <Btn label="Ans" onClick={() => handleInput('Ans')} variant="secondary" />
        <Btn label="=" onClick={calculate} variant="secondary" />
      </div>
    </div>
  );
};

export default ScientificCalculator;
