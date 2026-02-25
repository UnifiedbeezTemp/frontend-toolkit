interface BackgroundBlursProps {
  position?: 'bottom-right' | 'top-left';
  className?: string;
}

export default function BackgroundBlurs({ 
  position = 'bottom-right', 
  className = '' 
}: BackgroundBlursProps) {
  const isTopLeft = position === 'top-left';
  
  return (
    <div className={className}>
      <div 
        className={`absolute ${
          isTopLeft 
            ? 'top-[-300px] left-[-200px]' 
            : 'bottom-[-300px] right-[-200px]'
        } w-[700px] h-[400px] rounded-full bg-[#59cb59] opacity-20 blur-[53px] z-0`} 
      />
      
      <div 
        className={`absolute ${
          isTopLeft 
            ? 'top-[50px] left-[-500px]' 
            : 'bottom-[50px] right-[-500px]'
        } w-[500px] h-[300px] rounded-full bg-brand-secondary opacity-60 blur-[90px] z-0`} 
      />
    </div>
  );
}