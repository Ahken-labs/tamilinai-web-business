import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Logo({ className = "w-6 h-6 shrink-0", ...props}: IconProps) {
  return (
    <div className="flex w-10 h-10 items-center justify-center rounded-[20px] bg-[#BA0453] shrink-0 pt-[7px] pb-[9px] pr-[9px] pl-[7px]" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
        <path d="M23.3799 4.81556C22.9827 3.87651 22.4144 3.03322 21.6906 2.30943C20.9668 1.58584 20.1237 1.01746 19.1844 0.620249C18.2117 0.208678 17.1789 0 16.1149 0C15.051 0 14.0182 0.208678 13.0452 0.620249C12.1061 1.01746 11.263 1.58584 10.5393 2.30943C9.81546 3.03322 9.24708 3.87651 8.84988 4.81556C8.4383 5.78853 8.22963 6.82115 8.22963 7.88529V8.22963H7.88529C6.82135 8.22963 5.78853 8.4383 4.81556 8.84968C3.87651 9.24688 3.03342 9.81546 2.30963 10.5391C1.58584 11.2628 1.01746 12.1061 0.620249 13.0452C0.208678 14.0182 0 15.0508 0 16.1147C0 17.1787 0.208678 18.2115 0.620249 19.1844C1.01746 20.1235 1.58584 20.9668 2.30963 21.6906C3.03342 22.4142 3.87651 22.9825 4.81556 23.3798C5.78853 23.7913 6.82135 24 7.88529 24H21.9751C22.9522 24 23.7698 23.3045 23.9589 22.3826C23.9657 22.3497 23.9715 22.3166 23.9767 22.2831C23.9818 22.2496 23.986 22.2159 23.9896 22.1817C23.9966 22.1139 24 22.0449 24 21.9751V7.88529C24 6.82115 23.7913 5.78853 23.3799 4.81556ZM7.88529 21.5461C4.89037 21.5461 2.45387 19.1096 2.45387 16.1147C2.45387 13.1198 4.89037 10.6835 7.88529 10.6835H8.22963V18.8682C8.22963 19.5669 8.37227 20.2448 8.65377 20.8832C8.75531 21.1134 8.87302 21.3347 9.00668 21.5461H7.88529ZM16.4599 18.8682C16.4599 20.3449 15.1846 21.5461 13.617 21.5461H13.5264C11.9589 21.5461 10.6835 20.2707 10.6835 18.7032V10.6835H16.4599V18.8682ZM21.5461 21.5461H18.1369C18.2703 21.3347 18.3882 21.1134 18.4898 20.8832C18.7711 20.2448 18.9137 19.5669 18.9137 18.8682V10.6913C20.3834 10.7994 21.5461 12.0295 21.5461 13.5264V21.5461ZM21.5461 9.05516C20.7625 8.55461 19.8601 8.27072 18.9137 8.23402V7.8402C18.9137 7.43202 18.8497 7.02903 18.7236 6.64239L18.7168 6.64459C18.3601 5.54833 17.3285 4.75372 16.1149 4.75372C14.6065 4.75372 13.3794 5.98085 13.3794 7.48928C13.3794 7.74584 13.4149 7.99402 13.4813 8.22963H10.6835V7.88529C10.6835 4.89037 13.12 2.45387 16.1149 2.45387C19.1098 2.45387 21.5461 4.89037 21.5461 7.88529V9.05516Z" fill="white" />
      </svg>
    </div>
  );
}

export function TamilLanguageIcon({className = "w-6 h-6 shrink-0", color = "#525252", ...props}: IconProps & { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
      <path d="M22.2437 22L17.232 12L12.2202 22M13.5362 19.3742H20.9277" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.21282 2.17939C6.21282 2.17939 9.64319 1.50768 9.64319 7.35371C9.64319 9.39815 8.58874 12 5.91628 12C2.89651 12 1.19435 7.35323 2.37992 7.35323C3.56548 7.35323 11.3555 7.35323 11.3555 7.35323M11.4393 2V12M7.68843 3.72287C7.68843 4.57755 6.99558 5.27041 6.1409 5.27041C5.28622 5.27041 4.59336 4.57755 4.59336 3.72287C4.59336 2.86819 5.28622 2.17534 6.1409 2.17534C6.99558 2.17534 7.68843 2.86819 7.68843 3.72287Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BackChevronIcon({className = "w-6 h-6 shrink-0", strokeWidth = "1.5", stroke = "#525252", ...props}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
      <path d="M14.4609 4.08105L7.24805 11.2939C6.85753 11.6845 6.85753 12.3176 7.24805 12.7082L14.4609 19.921" stroke={stroke} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImagePlaceholderIcon({className = "w-9 h-9 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" className={className} {...props} >
      <path d="M12.851 34.86H23.009C31.474 34.86 34.86 31.474 34.86 23.009V12.851C34.86 4.386 31.474 1 23.009 1H12.851C4.386 1 1 4.386 1 12.851V23.009C1 31.474 4.386 34.86 12.851 34.86Z" fill="white" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.8547 14.544C14.7248 14.544 16.2407 13.028 16.2407 11.158C16.2407 9.28794 14.7248 7.77197 12.8547 7.77197C10.9847 7.77197 9.46875 9.28794 9.46875 11.158C9.46875 13.028 10.9847 14.544 12.8547 14.544Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.14062 29.6973L10.4871 24.0935C11.8246 23.1962 13.7546 23.2978 14.9566 24.3305L15.5153 24.8215C16.8359 25.9558 18.969 25.9558 20.2896 24.8215L27.3325 18.7775C28.653 17.6432 30.7862 17.6432 32.1067 18.7775L34.8663 21.1477" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4 shrink-0", stroke = "#B31B38", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props} >
      <path d="M4 8.00033L6.82843 10.8288L12.485 5.17188" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ open, className = "w-4 h-3.5 md:h-4 shrink-0 transition-transform duration-200", strokeWidth = "2", stroke = "#222", ...props }: { open: boolean } & IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={`${className} ${open ? "rotate-180" : ""}`} aria-hidden="true" {...props} >
      <path d="M13.2801 5.9668L8.93343 10.3135C8.42009 10.8268 7.58009 10.8268 7.06676 10.3135L2.72009 5.9668" stroke={stroke} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

