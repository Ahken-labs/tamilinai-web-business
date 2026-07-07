import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Logo({ className = "w-6 h-6 shrink-0", ...props }: IconProps) {
  return (
    <div className="flex w-10 h-10 items-center justify-center rounded-[20px] bg-[#BA0453] shrink-0 pt-[7px] pb-[9px] pr-[9px] pl-[7px]" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
        <path d="M23.3799 4.81556C22.9827 3.87651 22.4144 3.03322 21.6906 2.30943C20.9668 1.58584 20.1237 1.01746 19.1844 0.620249C18.2117 0.208678 17.1789 0 16.1149 0C15.051 0 14.0182 0.208678 13.0452 0.620249C12.1061 1.01746 11.263 1.58584 10.5393 2.30943C9.81546 3.03322 9.24708 3.87651 8.84988 4.81556C8.4383 5.78853 8.22963 6.82115 8.22963 7.88529V8.22963H7.88529C6.82135 8.22963 5.78853 8.4383 4.81556 8.84968C3.87651 9.24688 3.03342 9.81546 2.30963 10.5391C1.58584 11.2628 1.01746 12.1061 0.620249 13.0452C0.208678 14.0182 0 15.0508 0 16.1147C0 17.1787 0.208678 18.2115 0.620249 19.1844C1.01746 20.1235 1.58584 20.9668 2.30963 21.6906C3.03342 22.4142 3.87651 22.9825 4.81556 23.3798C5.78853 23.7913 6.82135 24 7.88529 24H21.9751C22.9522 24 23.7698 23.3045 23.9589 22.3826C23.9657 22.3497 23.9715 22.3166 23.9767 22.2831C23.9818 22.2496 23.986 22.2159 23.9896 22.1817C23.9966 22.1139 24 22.0449 24 21.9751V7.88529C24 6.82115 23.7913 5.78853 23.3799 4.81556ZM7.88529 21.5461C4.89037 21.5461 2.45387 19.1096 2.45387 16.1147C2.45387 13.1198 4.89037 10.6835 7.88529 10.6835H8.22963V18.8682C8.22963 19.5669 8.37227 20.2448 8.65377 20.8832C8.75531 21.1134 8.87302 21.3347 9.00668 21.5461H7.88529ZM16.4599 18.8682C16.4599 20.3449 15.1846 21.5461 13.617 21.5461H13.5264C11.9589 21.5461 10.6835 20.2707 10.6835 18.7032V10.6835H16.4599V18.8682ZM21.5461 21.5461H18.1369C18.2703 21.3347 18.3882 21.1134 18.4898 20.8832C18.7711 20.2448 18.9137 19.5669 18.9137 18.8682V10.6913C20.3834 10.7994 21.5461 12.0295 21.5461 13.5264V21.5461ZM21.5461 9.05516C20.7625 8.55461 19.8601 8.27072 18.9137 8.23402V7.8402C18.9137 7.43202 18.8497 7.02903 18.7236 6.64239L18.7168 6.64459C18.3601 5.54833 17.3285 4.75372 16.1149 4.75372C14.6065 4.75372 13.3794 5.98085 13.3794 7.48928C13.3794 7.74584 13.4149 7.99402 13.4813 8.22963H10.6835V7.88529C10.6835 4.89037 13.12 2.45387 16.1149 2.45387C19.1098 2.45387 21.5461 4.89037 21.5461 7.88529V9.05516Z" fill="white" />
      </svg>
    </div>
  );
}

export function TamilLanguageIcon({ className = "w-6 h-6 shrink-0", color = "#525252", ...props }: IconProps & { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
      <path d="M22.2437 22L17.232 12L12.2202 22M13.5362 19.3742H20.9277" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.21282 2.17939C6.21282 2.17939 9.64319 1.50768 9.64319 7.35371C9.64319 9.39815 8.58874 12 5.91628 12C2.89651 12 1.19435 7.35323 2.37992 7.35323C3.56548 7.35323 11.3555 7.35323 11.3555 7.35323M11.4393 2V12M7.68843 3.72287C7.68843 4.57755 6.99558 5.27041 6.1409 5.27041C5.28622 5.27041 4.59336 4.57755 4.59336 3.72287C4.59336 2.86819 5.28622 2.17534 6.1409 2.17534C6.99558 2.17534 7.68843 2.86819 7.68843 3.72287Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BackChevronIcon({ className = "w-6 h-6 shrink-0", strokeWidth = "1.5", stroke = "#525252", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props} >
      <path d="M14.4609 4.08105L7.24805 11.2939C6.85753 11.6845 6.85753 12.3176 7.24805 12.7082L14.4609 19.921" stroke={stroke} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImagePlaceholderIcon({ className = "w-9 h-9 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" className={className} {...props} >
      <path d="M12.851 34.86H23.009C31.474 34.86 34.86 31.474 34.86 23.009V12.851C34.86 4.386 31.474 1 23.009 1H12.851C4.386 1 1 4.386 1 12.851V23.009C1 31.474 4.386 34.86 12.851 34.86Z" fill="white" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.8547 14.544C14.7248 14.544 16.2407 13.028 16.2407 11.158C16.2407 9.28794 14.7248 7.77197 12.8547 7.77197C10.9847 7.77197 9.46875 9.28794 9.46875 11.158C9.46875 13.028 10.9847 14.544 12.8547 14.544Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.14062 29.6973L10.4871 24.0935C11.8246 23.1962 13.7546 23.2978 14.9566 24.3305L15.5153 24.8215C16.8359 25.9558 18.969 25.9558 20.2896 24.8215L27.3325 18.7775C28.653 17.6432 30.7862 17.6432 32.1067 18.7775L34.8663 21.1477" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MultiPhotoPlaceholderIcon({ className = "w-[52px] h-[52px] shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" fill="none" className={className} {...props} >
      <path d="M18.7268 35.8559L28.203 39.5147C36.0998 42.5636 40.4782 40.6245 43.5271 32.7277L47.1859 23.2515C50.2349 15.3547 48.2958 10.9763 40.3989 7.92735L30.9227 4.26857C23.0259 1.21959 18.6476 3.15873 15.5986 11.0556L11.9398 20.5317C8.89086 28.4286 10.83 32.8069 18.7268 35.8559Z" fill="white" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.0477 16.9013C27.7922 17.5749 29.7524 16.7067 30.426 14.9622C31.0996 13.2177 30.2314 11.2574 28.4869 10.5839C26.7423 9.91029 24.7821 10.7785 24.1085 12.523C23.435 14.2675 24.3032 16.2277 26.0477 16.9013Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5885 27.1798L20.3932 24.9584C21.9641 24.603 23.728 25.393 24.4774 26.7893L24.8217 27.4486C25.6451 28.9824 27.6351 29.7507 29.2755 29.1682L38.0227 26.0666C39.6631 25.4841 41.6531 26.2524 42.4765 27.7862L44.1971 30.9913" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.851 50.4562H23.009C31.474 50.4562 34.86 47.0702 34.86 38.6052V28.4472C34.86 19.9822 31.474 16.5962 23.009 16.5962H12.851C4.386 16.5962 1 19.9822 1 28.4472V38.6052C1 47.0702 4.386 50.4562 12.851 50.4562Z" fill="white" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.8547 30.1402C14.7248 30.1402 16.2407 28.6242 16.2407 26.7542C16.2407 24.8841 14.7248 23.3682 12.8547 23.3682C10.9847 23.3682 9.46875 24.8841 9.46875 26.7542C9.46875 28.6242 10.9847 30.1402 12.8547 30.1402Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.14062 45.2935L10.4871 39.6897C11.8246 38.7924 13.7546 38.894 14.9566 39.9267L15.5153 40.4177C16.8359 41.552 18.969 41.552 20.2896 40.4177L27.3325 34.3737C28.653 33.2394 30.7862 33.2394 32.1067 34.3737L34.8663 36.7439" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4 shrink-0", strokeWidth = "2", stroke = "#B31B38", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props} >
      <path d="M4 8.00033L6.82843 10.8288L12.485 5.17188" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4 shrink-0", stroke = "white", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props} >
      <path d="M9.61719 3.95361L13.6639 8.00028L9.61719 12.0469" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.33594 8H13.5559" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-8 h-8 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" fill="none" className={className} {...props} >
      <path d="M0 53.2427L3.75229 39.5715C1.43193 35.5579 0.219493 31.0112 0.229945 26.381C0.229945 11.8317 12.0721 0 26.6214 0C33.6765 0 40.3031 2.74889 45.2887 7.73452C50.2744 12.7201 53.0128 19.3467 53.0128 26.4019C53.0023 40.9511 41.1602 52.7829 26.6214 52.7829H26.6109C22.1897 52.7829 17.8521 51.6749 13.9953 49.5741L0 53.2427Z" fill="white" />
      <path d="M26.4779 4.43168C14.4879 4.43168 4.74473 14.2171 4.73438 26.2487C4.73438 30.3563 5.89403 34.3807 8.06838 37.8644L8.58609 38.6859L6.39103 46.7347L14.6122 44.5717L15.4094 45.0397C18.7434 47.0259 22.5744 48.0762 26.4676 48.0762H26.4779C38.4576 48.0762 48.2007 38.2907 48.2111 26.2591C48.2318 20.4669 45.9435 14.9138 41.8537 10.827C37.7845 6.72985 32.2451 4.42128 26.4779 4.43168Z" fill="#25D366" />
      <path fillRule="evenodd" clipRule="evenodd" d="M19.954 15.2738C19.4673 14.1819 18.9496 14.1611 18.4837 14.1403L17.2309 14.1299C16.796 14.1299 16.0919 14.2963 15.4914 14.9514C14.8908 15.6065 13.2031 17.1976 13.2031 20.4213C13.2031 23.6449 15.5431 26.7646 15.8745 27.2014C16.2058 27.6382 20.3888 34.4703 27.0362 37.1012C32.5549 39.285 33.6731 38.8482 34.8742 38.7443C36.0753 38.6299 38.7362 37.1532 39.285 35.6246C39.8338 34.0959 39.8338 32.7752 39.6681 32.5049C39.5024 32.2345 39.0676 32.0681 38.4153 31.7353C37.763 31.4026 34.5532 29.8219 33.9527 29.6036C33.3521 29.3852 32.9173 29.2708 32.4824 29.9363C32.0475 30.5915 30.7947 32.0681 30.4116 32.5049C30.0285 32.9416 29.6454 32.9936 28.9931 32.6713C28.3408 32.3385 26.2389 31.6522 23.7436 29.4164C21.797 27.6797 20.4924 25.5272 20.1093 24.872C19.7262 24.2169 20.0679 23.8633 20.3992 23.5306C20.6891 23.2394 21.0515 22.761 21.3828 22.3763C21.7142 21.9915 21.8177 21.7211 22.0351 21.2844C22.2526 20.8476 22.149 20.4629 21.9834 20.1301C21.797 19.8181 20.5338 16.5736 19.954 15.2738Z" fill="white" />
    </svg>
  );
}

export function EyeOffIcon({ className = "w-5 h-5 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path d="M12.1073 7.89307L7.89063 12.1097C7.34896 11.5681 7.01562 10.8264 7.01562 10.0014C7.01562 8.3514 8.34896 7.01807 9.99896 7.01807C10.824 7.01807 11.5656 7.3514 12.1073 7.89307Z" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.8479 4.80889C13.3896 3.70889 11.7229 3.10889 9.99792 3.10889C7.05625 3.10889 4.31458 4.84222 2.40625 7.84222C1.65625 9.01722 1.65625 10.9922 2.40625 12.1672C3.06458 13.2006 3.83125 14.0922 4.66458 14.8089" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.01562 16.2746C7.96563 16.6746 8.97396 16.8912 9.99896 16.8912C12.9406 16.8912 15.6823 15.1579 17.5906 12.1579C18.3406 10.9829 18.3406 9.00791 17.5906 7.83291C17.3156 7.39958 17.0156 6.99124 16.7073 6.60791" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.9281 10.5825C12.7115 11.7575 11.7531 12.7159 10.5781 12.9325" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.88906 12.1094L1.66406 18.3344" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3344 1.6665L12.1094 7.8915" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeOnIcon({ className = "w-5 h-5 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path d="M12.9823 10.0014C12.9823 11.6514 11.649 12.9847 9.99896 12.9847C8.34896 12.9847 7.01562 11.6514 7.01562 10.0014C7.01562 8.3514 8.34896 7.01807 9.99896 7.01807C11.649 7.01807 12.9823 8.3514 12.9823 10.0014Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.99792 16.8908C12.9396 16.8908 15.6813 15.1575 17.5896 12.1575C18.3396 10.9825 18.3396 9.00745 17.5896 7.83245C15.6813 4.83245 12.9396 3.09912 9.99792 3.09912C7.05625 3.09912 4.31458 4.83245 2.40625 7.83245C1.65625 9.00745 1.65625 10.9825 2.40625 12.1575C4.31458 15.1575 7.05625 16.8908 9.99792 16.8908Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XIcon({ className = "w-4 h-4 shrink-0", stroke = "#525252", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props} >
      <path d="M5.17188 5.17188L10.8287 10.8287" strokeWidth="1" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.17127 10.8287L10.8281 5.17188" strokeWidth="1" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = "w-8 h-8 shrink-0", stroke = "#B31B38", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={className} {...props} >
      <path d="M8 15.999H24" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 23.998V7.99805" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ className = "w-5 h-5 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className} {...props} >
      <path d="M17.4922 4.97624C14.7172 4.70124 11.9255 4.55957 9.14219 4.55957C7.49219 4.55957 5.84219 4.6429 4.19219 4.80957L2.49219 4.97624" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.08594 4.1332L7.26927 3.04154C7.4026 2.24987 7.5026 1.6582 8.91094 1.6582H11.0943C12.5026 1.6582 12.6109 2.2832 12.7359 3.04987L12.9193 4.1332" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.8229 4.99512L15.1562 16.0034C15.0645 17.3117 14.9895 18.3284 12.6645 18.3284H7.3145C4.9895 18.3284 4.9145 17.3117 4.82284 16.0034L4.15625 4.99512" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.60156 13.7471H11.3766" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.91406 10.4102H12.0807" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

