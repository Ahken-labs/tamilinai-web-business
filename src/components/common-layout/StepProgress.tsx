type StepProgressProps = {
  currentStep: number;
  totalSteps?: number;
  text?: string[];
  lastStepActiveColor?: string;
};

export default function StepProgress({
  currentStep,
  totalSteps = 3,
  text,
  lastStepActiveColor,
}: StepProgressProps) {
  const steps = totalSteps;
  const activeIndex = currentStep - 1;

  return (
    <div className="flex flex-col max-[600px]:pt-2 pt-0">
      {/* Bars */}
      <div className="flex max-[600px]:gap-1.5 gap-2.5 sm:gap-4">
        {Array.from({ length: steps }, (_, i) => (
          <div
            key={i}
            className={`max-[500px]:h-1 h-2 flex-1 rounded-[27px] transition-all duration-200 ${
              i === activeIndex
                ? "max-[600px]:flex-[2] bg-[#B31B38]"
                : i < activeIndex
                ? "bg-[#B31B38]"
                : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>

      {/* Labels */}
      {text && (
        <div className="flex max-[600px]:gap-1.5 gap-2.5 sm:gap-4 max-[500px]:mt-0.5 leading-[100%] mt-1 md:mt-2">
          {text.map((label, i) => (
            <div
              key={i}
              className={`min-w-0 flex-1 text-center ${
                i === activeIndex ? "max-[600px]:flex-[2]" : "max-[600px]:invisible"
              }`}
            >
              <span
                className={`select-none whitespace-nowrap lang-ta:whitespace-normal font-poppins max-[500px]:text-[12px] text-[14px] lang-ta:max-[500px]:text-[10px] lang-ta:text-[12px] font-medium leading-[150%] ${
                  i < currentStep ? "text-[#B31B38]" : "text-secondary4"
                }`}
                style={
                  lastStepActiveColor && i === steps - 1 && i < currentStep
                    ? { color: lastStepActiveColor }
                    : undefined
                }
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
