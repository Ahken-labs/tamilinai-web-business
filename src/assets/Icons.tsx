import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function Logo({ className = "w-6 h-6 shrink-0", ...props }: IconProps) {
  return (
    <div className="flex max-[500px]:w-9 w-10 max-[500px]:h-9 h-10 items-center justify-center rounded-[20px] bg-[#BA0453] shrink-0 max-[500px]:pt-[6px] pt-[7px] max-[500px]:pb-[8px] pb-[9px] max-[500px]:pr-[8px] pr-[9px] max-[500px]:pl-[6px] pl-[7px]" >
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

export function EditIcon({ className = "w-4 h-4 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M8.83958 2.39884L3.36624 8.19217C3.15958 8.41217 2.95958 8.84551 2.91958 9.14551L2.67291 11.3055C2.58624 12.0855 3.14624 12.6188 3.91958 12.4855L6.06624 12.1188C6.36624 12.0655 6.78624 11.8455 6.99291 11.6188L12.4662 5.82551C13.4129 4.82551 13.8396 3.68551 12.3662 2.29218C10.8996 0.912176 9.78624 1.39884 8.83958 2.39884Z" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.92969 3.36768C8.21635 5.20768 9.70969 6.61434 11.563 6.80101" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 14.668H14" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ className = "w-4 h-4 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M9.5 11.998C9.5 12.6611 9.23661 13.297 8.76777 13.7658C8.29893 14.2347 7.66304 14.498 7 14.498C6.33696 14.498 5.70107 14.2347 5.23223 13.7658C4.76339 13.297 4.5 12.6611 4.5 11.998C4.5 11.335 4.76339 10.6991 5.23223 10.2303C5.70107 9.76144 6.33696 9.49805 7 9.49805C7.66304 9.49805 8.29893 9.76144 8.76777 10.2303C9.23661 10.6991 9.5 11.335 9.5 11.998Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M14.498 6.49805L9.49805 9.99805M14.498 17.498L9.49805 13.998" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.4961 18.5C19.4961 19.163 19.2327 19.7989 18.7639 20.2678C18.295 20.7366 17.6591 21 16.9961 21C16.3331 21 15.6972 20.7366 15.2283 20.2678C14.7595 19.7989 14.4961 19.163 14.4961 18.5C14.4961 17.837 14.7595 17.2011 15.2283 16.7322C15.6972 16.2634 16.3331 16 16.9961 16C17.6591 16 18.295 16.2634 18.7639 16.7322C19.2327 17.2011 19.4961 17.837 19.4961 18.5ZM19.4961 5.5C19.4961 6.16304 19.2327 6.79893 18.7639 7.26777C18.295 7.73661 17.6591 8 16.9961 8C16.3331 8 15.6972 7.73661 15.2283 7.26777C14.7595 6.79893 14.4961 6.16304 14.4961 5.5C14.4961 4.83696 14.7595 4.20107 15.2283 3.73223C15.6972 3.26339 16.3331 3 16.9961 3C17.6591 3 18.295 3.26339 18.7639 3.73223C19.2327 4.20107 19.4961 4.83696 19.4961 5.5Z" stroke={stroke} strokeWidth="1.5" />
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

export function DeleteIcon({ className = "w-6 h-6 shrink-0", stroke = "#8D5900", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M21 5.97852C17.67 5.64852 14.32 5.47852 10.98 5.47852C9 5.47852 7.02 5.57852 5.04 5.77852L3 5.97852" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.50195 4.96805L8.72195 3.65805C8.88195 2.70805 9.00195 1.99805 10.692 1.99805H13.312C15.002 1.99805 15.132 2.74805 15.282 3.66805L15.502 4.96805" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.998 6L18.198 19.2099C18.088 20.7799 17.9979 21.9999 15.2079 21.9999H8.78795C5.99795 21.9999 5.90795 20.7799 5.79795 19.2099L4.99805 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.3301 16.5H13.6601" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.49805 12.498H14.498" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

export function ClockIcon({ className = "w-3.5 h-3.5 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={className} {...props}>
      <path d="M12.8327 6.99984C12.8327 10.2198 10.2193 12.8332 6.99935 12.8332C3.77935 12.8332 1.16602 10.2198 1.16602 6.99984C1.16602 3.77984 3.77935 1.1665 6.99935 1.1665C10.2193 1.1665 12.8327 3.77984 12.8327 6.99984Z" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.1632 8.856L7.35487 7.77684C7.03987 7.59017 6.7832 7.141 6.7832 6.7735V4.38184" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function QualificationIcon({ className = "w-3.5 h-3.5 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={className} {...props}>
      <path d="M5.86776 1.47543L2.35609 3.76793C1.23026 4.50293 1.23026 6.14793 2.35609 6.88293L5.86776 9.17543C6.49776 9.58959 7.53609 9.58959 8.16609 9.17543L11.6603 6.88293C12.7803 6.14793 12.7803 4.50876 11.6603 3.77376L8.16609 1.48126C7.53609 1.06126 6.49776 1.06126 5.86776 1.47543Z" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.27927 7.62891L3.27344 10.3647C3.27344 11.1056 3.8451 11.8989 4.5451 12.1322L6.40594 12.7506C6.72677 12.8556 7.2576 12.8556 7.58427 12.7506L9.4451 12.1322C10.1451 11.8989 10.7168 11.1056 10.7168 10.3647V7.65807" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.4824 8.75V5.25" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareerIcon({ className = "w-3.5 h-3.5 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className={className} {...props}>
      <path d="M8.97724 3.03754L9.79972 4.68253C9.91055 4.91003 10.2081 5.12587 10.4589 5.17253L11.9464 5.41753C12.8972 5.57503 13.1189 6.26337 12.4364 6.9517L11.2756 8.11254C11.0831 8.30504 10.9722 8.6842 11.0364 8.95837L11.3689 10.3934C11.6314 11.525 11.0247 11.9684 10.0272 11.3734L8.63305 10.545C8.38222 10.3934 7.96223 10.3934 7.71139 10.545L6.31722 11.3734C5.31972 11.9625 4.71306 11.525 4.97556 10.3934L5.30806 8.95837C5.37223 8.69004 5.2614 8.31087 5.0689 8.11254L3.90807 6.9517C3.22557 6.2692 3.44723 5.58086 4.39807 5.41753L5.88556 5.17253C6.13639 5.1317 6.43389 4.91003 6.54473 4.68253L7.36723 3.03754C7.80473 2.14504 8.52807 2.14504 8.97724 3.03754Z" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.66602 2.9165H1.16602" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.91602 11.0835H1.16602" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.74935 7H1.16602" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppLineIcon({ className = "w-5 h-5 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M4.60065 13.7335C5.60065 14.3335 6.80065 14.6668 8.00065 14.6668C11.6673 14.6668 14.6673 11.6668 14.6673 8.00016C14.6673 4.3335 11.6673 1.3335 8.00065 1.3335C4.33398 1.3335 1.33398 4.3335 1.33398 8.00016C1.33398 9.20016 1.66732 10.3335 2.20065 11.3335L1.59091 13.6787C1.47732 14.1155 1.88169 14.5103 2.31573 14.3863L4.60065 13.7335Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 9.899C11 10.007 10.976 10.118 10.9249 10.226C10.8738 10.334 10.8077 10.436 10.7206 10.532C10.5734 10.694 10.4111 10.811 10.2278 10.886C10.0476 10.961 9.85228 11 9.64196 11C9.3355 11 9.00801 10.928 8.66249 10.781C8.31698 10.634 7.97146 10.436 7.62894 10.187C7.28343 9.935 6.95593 9.656 6.64347 9.347C6.334 9.035 6.05458 8.708 5.80521 8.366C5.55884 8.024 5.36054 7.682 5.21632 7.343C5.07211 7.001 5 6.674 5 6.362C5 6.158 5.03605 5.963 5.10816 5.783C5.18027 5.6 5.29444 5.432 5.45368 5.282C5.64597 5.093 5.85628 5 6.07862 5C6.16274 5 6.24687 5.018 6.32198 5.054C6.4001 5.09 6.4692 5.144 6.52329 5.222L7.22033 6.203C7.27441 6.278 7.31347 6.347 7.34051 6.413C7.36755 6.476 7.38257 6.539 7.38257 6.596C7.38257 6.668 7.36154 6.74 7.31948 6.809C7.28042 6.878 7.22334 6.95 7.15123 7.022L6.92288 7.259C6.88983 7.292 6.87481 7.331 6.87481 7.379C6.87481 7.403 6.87782 7.424 6.88383 7.448C6.89284 7.472 6.90185 7.49 6.90786 7.508C6.96194 7.607 7.05508 7.736 7.18728 7.892C7.32248 8.048 7.4667 8.207 7.62293 8.366C7.78518 8.525 7.94141 8.672 8.10065 8.807C8.25689 8.939 8.38608 9.029 8.48823 9.083C8.50325 9.089 8.52128 9.098 8.54231 9.107C8.56635 9.116 8.59039 9.119 8.61743 9.119C8.6685 9.119 8.70756 9.101 8.74061 9.068L8.96895 8.843C9.04407 8.768 9.11617 8.711 9.18528 8.675C9.25438 8.633 9.32349 8.612 9.3986 8.612C9.45568 8.612 9.51577 8.624 9.58187 8.651C9.64797 8.678 9.71708 8.717 9.79219 8.768L10.7867 9.473C10.8648 9.527 10.9189 9.59 10.9519 9.665C10.982 9.74 11 9.815 11 9.899Z" fill="white" />
    </svg>
  );
}

export function ExpandIcon({ className = "w-4 h-4 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M1.33463 9.81986V12.9982C1.33463 13.9187 2.08083 14.6649 3.0013 14.6649H6.16348M14.6602 6.17505V3.00602C14.6602 2.08555 13.914 1.33936 12.9935 1.33936H9.83724" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BoostIcon({ className = "w-5 h-5 shrink-0", stroke = "white", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path d="M5.63537 11.892L8.10141 14.358M5.63537 11.892C5.63537 11.892 7.09136 8.25253 9.16387 5.72689M5.63537 11.892C0.272761 10.5511 5.09079 5.72689 9.16387 5.72689M8.10141 14.358C8.10141 14.358 11.7409 12.902 14.2665 10.8295M8.10141 14.358C9.44232 19.7196 14.2665 14.9026 14.2665 10.8295M9.16387 5.72689C11.26 3.17249 14.7155 2.02783 17.9656 2.02783C17.9656 5.27787 16.8209 8.73238 14.2665 10.8295M12.5197 7.37811L13.2462 6.65166M3.34298 14.693C2.36479 15.516 2.03906 17.9595 2.03906 17.9595C2.03906 17.9595 4.47633 17.6327 5.29732 16.6525C5.7597 16.1038 5.75354 15.2612 5.23875 14.7516C4.98424 14.5123 4.65108 14.3743 4.30195 14.3636C3.95282 14.3528 3.61177 14.4699 3.34298 14.693Z" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BoostIconFilled({ className = "w-5 h-5 shrink-0", fill = "white", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className} {...props}>

      <path d="M8.10141 14.358L5.63537 11.892C0.272761 10.5511 5.09079 5.72689 9.16387 5.72689C11.26 3.17249 14.7155 2.02783 17.9656 2.02783C17.9656 5.27787 16.8209 8.73238 14.2665 10.8295C14.2665 14.9026 9.44232 19.7196 8.10141 14.358Z" fill="white" />
      <path d="M2.03906 17.9595C2.03906 17.9595 2.36479 15.516 3.34298 14.693C3.61177 14.4699 3.95282 14.3528 4.30195 14.3636C4.65108 14.3743 4.98424 14.5123 5.23875 14.7516C5.75354 15.2612 5.7597 16.1038 5.29732 16.6525C4.47633 17.6327 2.03906 17.9595 2.03906 17.9595Z" fill="white" />
      <path d="M5.63537 11.892L8.10141 14.358M5.63537 11.892C5.63537 11.892 7.09136 8.25253 9.16387 5.72689M5.63537 11.892C0.272761 10.5511 5.09079 5.72689 9.16387 5.72689M8.10141 14.358C8.10141 14.358 11.7409 12.902 14.2665 10.8295M8.10141 14.358C9.44232 19.7196 14.2665 14.9026 14.2665 10.8295M9.16387 5.72689C11.26 3.17249 14.7155 2.02783 17.9656 2.02783C17.9656 5.27787 16.8209 8.73238 14.2665 10.8295M3.34298 14.693C2.36479 15.516 2.03906 17.9595 2.03906 17.9595C2.03906 17.9595 4.47633 17.6327 5.29732 16.6525C5.7597 16.1038 5.75354 15.2612 5.23875 14.7516C4.98424 14.5123 4.65108 14.3743 4.30195 14.3636C3.95282 14.3528 3.61177 14.4699 3.34298 14.693Z" stroke="#B31B38" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5234 7.37782L13.2499 6.65137" stroke="#B31B38" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6 shrink-0", stroke = "#525252", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M4 6H20M4 12H20M4 18H20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SettingsIcon({ className = "w-4 h-4 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M8 9.99902C9.10457 9.99902 10 9.10359 10 7.99902C10 6.89445 9.10457 5.99902 8 5.99902C6.89543 5.99902 6 6.89445 6 7.99902C6 9.10359 6.89543 9.99902 8 9.99902Z" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.33594 8.58776V7.41443C1.33594 6.7211 1.9026 6.14776 2.6026 6.14776C3.80927 6.14776 4.3026 5.29443 3.69594 4.24776C3.34927 3.64776 3.55594 2.86776 4.1626 2.5211L5.31594 1.8611C5.8426 1.54776 6.5226 1.73443 6.83594 2.2611L6.90927 2.38776C7.50927 3.43443 8.49594 3.43443 9.1026 2.38776L9.17594 2.2611C9.48927 1.73443 10.1693 1.54776 10.6959 1.8611L11.8493 2.5211C12.4559 2.86776 12.6626 3.64776 12.3159 4.24776C11.7093 5.29443 12.2026 6.14776 13.4093 6.14776C14.1026 6.14776 14.6759 6.71443 14.6759 7.41443V8.58776C14.6759 9.2811 14.1093 9.85443 13.4093 9.85443C12.2026 9.85443 11.7093 10.7078 12.3159 11.7544C12.6626 12.3611 12.4559 13.1344 11.8493 13.4811L10.6959 14.1411C10.1693 14.4544 9.48927 14.2678 9.17594 13.7411L9.1026 13.6144C8.5026 12.5678 7.51594 12.5678 6.90927 13.6144L6.83594 13.7411C6.5226 14.2678 5.8426 14.4544 5.31594 14.1411L4.1626 13.4811C3.55594 13.1344 3.34927 12.3544 3.69594 11.7544C4.3026 10.7078 3.80927 9.85443 2.6026 9.85443C1.9026 9.85443 1.33594 9.2811 1.33594 8.58776Z" stroke={stroke} strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoutIcon({ className = "w-6 h-6 shrink-0", stroke = "#8D5900", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M5.92969 5.03918C6.13635 2.63918 7.36969 1.65918 10.0697 1.65918H10.1564C13.1364 1.65918 14.3297 2.85251 14.3297 5.83251V10.1792C14.3297 13.1592 13.1364 14.3525 10.1564 14.3525H10.0697C7.38969 14.3525 6.15635 13.3858 5.93635 11.0258" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.0007 8H2.41406" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.8974 5.76562L1.66406 7.99896L3.8974 10.2323" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CameraIcon({ className = "w-4 h-4 shrink-0", fill = "#242424", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={className} {...props}>
      <path d="M9.55469 2C10.2167 2 10.799 2.42326 11.0088 3.04102L11.083 3.29297C11.293 3.91031 11.8744 4.333 12.5361 4.33301H12.7979C13.8305 4.33301 14.668 5.17047 14.668 6.20312V11C14.668 13.6667 14.0007 14.333 11.334 14.333H4.66797C2.0013 14.333 1.33398 13.6667 1.33398 11V6.26367C1.33398 5.1978 2.19878 4.33301 3.26465 4.33301H3.44141C4.17242 4.33295 4.8205 3.86238 5.0459 3.16699C5.27125 2.47144 5.91925 2 6.65039 2H9.55469ZM8.00098 6.33301C6.52822 6.33301 5.33398 7.52724 5.33398 9C5.33398 10.4728 6.52822 11.667 8.00098 11.667C9.47374 11.667 10.668 10.4728 10.668 9C10.668 7.52724 9.47374 6.33301 8.00098 6.33301Z" fill={fill} />
    </svg>
  );
}

export function BusinessNameIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M3.00977 11.2202V15.7102C3.00977 20.2002 4.80977 22.0002 9.29977 22.0002H14.6898C19.1798 22.0002 20.9798 20.2002 20.9798 15.7102V11.2202" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0005 12C13.8305 12 15.1805 10.51 15.0005 8.68L14.3405 2H9.67048L9.00048 8.68C8.82048 10.51 10.1705 12 12.0005 12Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.3108 12C20.3308 12 21.8108 10.36 21.6108 8.35L21.3308 5.6C20.9708 3 19.9708 2 17.3508 2H14.3008L15.0008 9.01C15.1708 10.66 16.6608 12 18.3108 12Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.64037 12C7.29037 12 8.78037 10.66 8.94037 9.01L9.16037 6.8L9.64037 2H6.59037C3.97037 2 2.97037 3 2.61037 5.6L2.34037 8.35C2.14037 10.36 3.62037 12 5.64037 12Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17C10.33 17 9.5 17.83 9.5 19.5V22H14.5V19.5C14.5 17.83 13.67 17 12 17Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BioIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M3.66992 2.5V14.47C3.66992 15.45 4.12992 16.38 4.91992 16.97L10.1299 20.87C11.2399 21.7 12.7699 21.7 13.8799 20.87L19.0899 16.97C19.8799 16.38 20.3399 15.45 20.3399 14.47V2.5H3.66992Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M2 2.5H22" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M8 8H16" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13H16" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppRowIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M6.9 20.6C8.4 21.5 10.2 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.3 17L2.44044 20.306C2.24572 21.0549 2.93892 21.7317 3.68299 21.5191L6.9 20.6Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 14.8485C16.5 15.0105 16.4639 15.177 16.3873 15.339C16.3107 15.501 16.2116 15.654 16.0809 15.798C15.86 16.041 15.6167 16.2165 15.3418 16.329C15.0714 16.4415 14.7784 16.5 14.4629 16.5C14.0033 16.5 13.512 16.392 12.9937 16.1715C12.4755 15.951 11.9572 15.654 11.4434 15.2805C10.9251 14.9025 10.4339 14.484 9.9652 14.0205C9.501 13.5525 9.08187 13.062 8.70781 12.549C8.33826 12.036 8.04081 11.523 7.82449 11.0145C7.60816 10.5015 7.5 10.011 7.5 9.543C7.5 9.237 7.55408 8.9445 7.66224 8.6745C7.77041 8.4 7.94166 8.148 8.18052 7.923C8.46895 7.6395 8.78443 7.5 9.11793 7.5C9.24412 7.5 9.37031 7.527 9.48297 7.581C9.60015 7.635 9.70381 7.716 9.78493 7.833L10.8305 9.3045C10.9116 9.417 10.9702 9.5205 11.0108 9.6195C11.0513 9.714 11.0739 9.8085 11.0739 9.894C11.0739 10.002 11.0423 10.11 10.9792 10.2135C10.9206 10.317 10.835 10.425 10.7268 10.533L10.3843 10.8885C10.3348 10.938 10.3122 10.9965 10.3122 11.0685C10.3122 11.1045 10.3167 11.136 10.3257 11.172C10.3393 11.208 10.3528 11.235 10.3618 11.262C10.4429 11.4105 10.5826 11.604 10.7809 11.838C10.9837 12.072 11.2 12.3105 11.4344 12.549C11.6778 12.7875 11.9121 13.008 12.151 13.2105C12.3853 13.4085 12.5791 13.5435 12.7323 13.6245C12.7549 13.6335 12.7819 13.647 12.8135 13.6605C12.8495 13.674 12.8856 13.6785 12.9261 13.6785C13.0028 13.6785 13.0613 13.6515 13.1109 13.602L13.4534 13.2645C13.5661 13.152 13.6743 13.0665 13.7779 13.0125C13.8816 12.9495 13.9852 12.918 14.0979 12.918C14.1835 12.918 14.2737 12.936 14.3728 12.9765C14.472 13.017 14.5756 13.0755 14.6883 13.152L16.18 14.2095C16.2972 14.2905 16.3783 14.385 16.4279 14.4975C16.473 14.61 16.5 14.7225 16.5 14.8485Z" stroke={stroke} strokeWidth="1.5" strokeMiterlimit="10" />
    </svg>
  );
}

export function RouteIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M2.07006 4.59988C2.87006 1.13988 8.08006 1.13988 8.87006 4.59988C9.34006 6.62988 8.05006 8.34988 6.93006 9.41988C6.11006 10.1999 4.82006 10.1899 4.00006 9.41988C2.89006 8.34988 1.60006 6.62988 2.07006 4.59988Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M15.07 16.5999C15.87 13.1399 21.11 13.1399 21.91 16.5999C22.38 18.6299 21.09 20.3499 19.96 21.4199C19.14 22.1999 17.84 22.1899 17.02 21.4199C15.89 20.3499 14.6 18.6299 15.07 16.5999Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M11.9997 5H14.6797C16.5297 5 17.3897 7.29 15.9997 8.51L8.0097 15.5C6.6197 16.71 7.4797 19 9.3197 19H11.9997" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.48573 5.5H5.49728" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.4857 17.5H18.4973" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4V2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20V22" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H22" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LocationIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12.0009 13.4299C13.724 13.4299 15.1209 12.0331 15.1209 10.3099C15.1209 8.58681 13.724 7.18994 12.0009 7.18994C10.2777 7.18994 8.88086 8.58681 8.88086 10.3099C8.88086 12.0331 10.2777 13.4299 12.0009 13.4299Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function ServiceAreaIcon({ className = "w-6 h-6 shrink-0", stroke = "#222222", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M22 9.00002V15C22 17.5 21.5 19.25 20.38 20.38L14 14L21.73 6.27002C21.91 7.06002 22 7.96002 22 9.00002Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.73 6.27L6.26999 21.73C3.25999 21.04 2 18.96 2 15V9C2 4 4 2 9 2H15C18.96 2 21.04 3.26 21.73 6.27Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.3795 20.38C19.2495 21.5 17.4995 22 14.9995 22H8.99954C7.95954 22 7.05953 21.91 6.26953 21.73L13.9995 14L20.3795 20.38Z" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.23929 7.98021C6.91929 5.05021 11.3193 5.05021 11.9993 7.98021C12.3893 9.70021 11.3093 11.1602 10.3593 12.0602C9.66928 12.7202 8.5793 12.7202 7.8793 12.0602C6.9293 11.1602 5.83929 9.70021 6.23929 7.98021Z" stroke={stroke} strokeWidth="1.5" />
      <path d="M9.09412 8.7002H9.1031" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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


export function ReviewStarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14.4123 8.71931L12.3818 2.22173C12.2648 1.84748 11.7352 1.84748 11.6182 2.22173L9.58772 8.71931C9.53553 8.8863 9.38088 9 9.20592 9H2.17605C1.79411 9 1.62943 9.48418 1.93216 9.71705L7.27888 13.8299C7.41174 13.9321 7.46678 14.1063 7.41679 14.2663L5.35546 20.8625C5.24106 21.2286 5.65763 21.5303 5.96975 21.3073L11.7675 17.1661C11.9066 17.0667 12.0934 17.0667 12.2325 17.1661L18.0302 21.3073C18.3424 21.5303 18.7589 21.2286 18.6445 20.8625L16.5832 14.2663C16.5332 14.1063 16.5883 13.9321 16.7211 13.8299L22.0678 9.71705C22.3706 9.48418 22.2059 9 21.824 9H14.7941C14.6191 9 14.4645 8.8863 14.4123 8.71931Z"
        fill="#FFBF43"
        stroke="#FFBF43"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function GoogleStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.005 7.26625L10.313 1.85161C10.2155 1.53973 9.77409 1.53973 9.67663 1.85161L7.98456 7.26625C7.94107 7.40541 7.81219 7.50016 7.66639 7.50016H1.80817C1.48988 7.50016 1.35265 7.90364 1.60493 8.0977L6.06053 11.5251C6.17124 11.6102 6.21711 11.7554 6.17545 11.8887L4.45768 17.3856C4.36234 17.6907 4.70949 17.942 4.96958 17.7563L9.80105 14.3052C9.91695 14.2224 10.0726 14.2224 10.1885 14.3052L15.02 17.7563C15.2801 17.942 15.6272 17.6907 15.5319 17.3856L13.8141 11.8887C13.7725 11.7554 13.8183 11.6102 13.9291 11.5251L18.3847 8.0977C18.6369 7.90364 18.4997 7.50016 18.1814 7.50016H12.3232C12.1774 7.50016 12.0485 7.40541 12.005 7.26625Z" fill="#FFBF43" />
    </svg>
  );
}

export function GoogleEmptyStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.005 7.26625L10.313 1.85161C10.2155 1.53973 9.77409 1.53973 9.67663 1.85161L7.98456 7.26625C7.94107 7.40541 7.81219 7.50016 7.66639 7.50016H1.80817C1.48988 7.50016 1.35265 7.90364 1.60493 8.0977L6.06053 11.5251C6.17124 11.6102 6.21711 11.7554 6.17545 11.8887L4.45768 17.3856C4.36234 17.6907 4.70949 17.942 4.96958 17.7563L9.80105 14.3052C9.91695 14.2224 10.0726 14.2224 10.1885 14.3052L15.02 17.7563C15.2801 17.942 15.6272 17.6907 15.5319 17.3856L13.8141 11.8887C13.7725 11.7554 13.8183 11.6102 13.9291 11.5251L18.3847 8.0977C18.6369 7.90364 18.4997 7.50016 18.1814 7.50016H12.3232C12.1774 7.50016 12.0485 7.40541 12.005 7.26625Z" fill="#E0E0E0" />
    </svg>
  );
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M14.1663 11.1673V13.6673C14.1663 17.0007 12.8329 18.334 9.49959 18.334H6.33293C2.99959 18.334 1.66626 17.0007 1.66626 13.6673V10.5007C1.66626 7.16732 2.99959 5.83398 6.33293 5.83398H9.49959C12.077 5.83398 14.1663 7.924 14.1663 10.5007V11.1673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.93628 3.60932C6.58836 2.26758 7.91532 1.69141 10.1065 1.69141H13.2732C16.6178 1.69141 17.9399 3.03006 17.9399 7.02474V9.52474C17.9399 11.3297 17.5489 12.5483 16.6611 13.2863" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopiedCheckIcon({ className, ...props }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M3.5 10.5L7.5 14.5L16.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GoogleHalfStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M12.0128 7.26528L10.3208 1.85063C10.2233 1.53875 9.78191 1.53875 9.68444 1.85063L7.99237 7.26528C7.94888 7.40444 7.82 7.49919 7.67421 7.49919H1.81598C1.4977 7.49919 1.36046 7.90267 1.61274 8.09673L6.06834 11.5241C6.17905 11.6093 6.22493 11.7544 6.18326 11.8877L4.46549 17.3846C4.37015 17.6897 4.7173 17.9411 4.9774 17.7553L9.80886 14.3042C9.92476 14.2215 10.0805 14.2215 10.1964 14.3042L15.0278 17.7553C15.2879 17.9411 15.6351 17.6897 15.5397 17.3846L13.8219 11.8877C13.7803 11.7544 13.8262 11.6093 13.9369 11.5241L18.3925 8.09673C18.6447 7.90267 18.5075 7.49919 18.1892 7.49919H12.331C12.1852 7.49919 12.0563 7.40444 12.0128 7.26528Z" fill="#FFBF43" />
      <path d="M12.0102 7.26528L10.2932 1.77067C10.2419 1.6067 10 1.64362 10 1.81541V13.9943C10 14.102 10.052 14.203 10.1396 14.2656L15.0252 17.7553C15.2853 17.9411 15.6325 17.6897 15.5371 17.3846L13.8193 11.8877C13.7777 11.7544 13.8236 11.6093 13.9343 11.5241L18.3899 8.09673C18.6421 7.90267 18.5049 7.49919 18.1866 7.49919H12.3284C12.1826 7.49919 12.0537 7.40444 12.0102 7.26528Z" fill="#D9D9D9" />
    </svg>
  );
}


export function TrustpilotIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" {...props}>
      <path d="M40.3047 18.038H26.5578L22.3117 5.18457L18.0505 18.039L4.30469 18.0251L15.4377 25.9761L11.1787 38.8156L22.3117 30.8774L33.4318 38.8156L29.1856 25.9761L40.3047 18.038Z" fill="#04DA8D" />
      <path d="M30.1412 28.8841L29.1854 25.9771L22.3125 30.8783L30.1412 28.8841Z" fill="#126849" />
    </svg>
  );
}

export function TrustpilotStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M20 0H0V20H20V0Z" fill="#04DA8D" />
      <path d="M10 13.4792L13.0417 12.7083L14.3125 16.625L10 13.4792ZM17 8.41667H11.6458L10 3.375L8.35417 8.41667H3L7.33333 11.5417L5.6875 16.5833L10.0208 13.4583L12.6875 11.5417L17 8.41667Z" fill="white" />
    </svg>
  );
}

export function TrustpilotHalfStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M20 0H0V20H20V0Z" fill="#D9D9D9" />
      <path d="M10.0994 0H0V20H10.0994V0Z" fill="#04DA8D" />
      <path d="M10 13.4792L13.0417 12.7083L14.3125 16.625L10 13.4792ZM17 8.41667H11.6458L10 3.375L8.35417 8.41667H3L7.33333 11.5417L5.6875 16.5833L10.0208 13.4583L12.6875 11.5417L17 8.41667Z" fill="white" />
    </svg>
  );
}

export function TrustpilotEmptyStarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M20 0H0V20H20V0Z" fill="#D9D9D9" />
      <path d="M10 13.4792L13.0417 12.7083L14.3125 16.625L10 13.4792ZM17 8.41667H11.6458L10 3.375L8.35417 8.41667H3L7.33333 11.5417L5.6875 16.5833L10.0208 13.4583L12.6875 11.5417L17 8.41667Z" fill="white" />
    </svg>
  );
}

//our inai logo
export function InaiReviewIcon(props: IconProps) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4.30469" y="4" width="36" height="36" rx="18" fill="#BA0453" />
      <path d="M31.6435 14.6338C31.286 13.7887 30.7745 13.0297 30.1231 12.3783C29.4717 11.7271 28.7129 11.2155 27.8676 10.858C26.9921 10.4876 26.0625 10.2998 25.105 10.2998C24.1474 10.2998 23.2179 10.4876 22.3422 10.858C21.4971 11.2155 20.7383 11.7271 20.0869 12.3783C19.4355 13.0297 18.9239 13.7887 18.5665 14.6338C18.196 15.5095 18.0082 16.4388 18.0082 17.3966V17.7065H17.6983C16.7408 17.7065 15.8112 17.8943 14.9356 18.2645C14.0904 18.622 13.3316 19.1337 12.6802 19.785C12.0288 20.4364 11.5173 21.1953 11.1598 22.0405C10.7894 22.9161 10.6016 23.8455 10.6016 24.803C10.6016 25.7606 10.7894 26.6901 11.1598 27.5658C11.5173 28.4109 12.0288 29.1699 12.6802 29.8213C13.3316 30.4726 14.0904 30.9841 14.9356 31.3416C15.8112 31.712 16.7408 31.8998 17.6983 31.8998H30.3791C31.2586 31.8998 31.9944 31.2739 32.1646 30.4442C32.1707 30.4146 32.1759 30.3848 32.1806 30.3546C32.1852 30.3244 32.189 30.2941 32.1922 30.2634C32.1985 30.2023 32.2016 30.1402 32.2016 30.0774V17.3966C32.2016 16.4388 32.0138 15.5095 31.6435 14.6338ZM17.6983 29.6913C15.0029 29.6913 12.81 27.4985 12.81 24.803C12.81 22.1076 15.0029 19.9149 17.6983 19.9149H18.0082V27.2812C18.0082 27.91 18.1366 28.5201 18.39 29.0947C18.4813 29.3019 18.5873 29.501 18.7076 29.6913H17.6983ZM25.4154 27.2812C25.4154 28.6103 24.2677 29.6913 22.8568 29.6913H22.7753C21.3646 29.6913 20.2167 28.5435 20.2167 27.1327V19.9149H25.4154V27.2812ZM29.9931 29.6913H26.9247C27.0449 29.501 27.151 29.3019 27.2424 29.0947C27.4955 28.5201 27.6239 27.91 27.6239 27.2812V19.922C28.9467 20.0193 29.9931 21.1264 29.9931 22.4736V29.6913ZM29.9931 18.4495C29.2878 17.999 28.4757 17.7435 27.6239 17.7104V17.356C27.6239 16.9886 27.5663 16.6259 27.4528 16.278L27.4467 16.2799C27.1257 15.2933 26.1972 14.5781 25.105 14.5781C23.7474 14.5781 22.643 15.6826 22.643 17.0402C22.643 17.2711 22.6749 17.4944 22.7347 17.7065H20.2167V17.3966C20.2167 14.7011 22.4096 12.5083 25.105 12.5083C27.8004 12.5083 29.9931 14.7011 29.9931 17.3966V18.4495Z" fill="white" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" {...props}>
      <path opacity="0.987" fillRule="evenodd" clipRule="evenodd" d="M20.7833 4.15531C22.715 3.94693 23.858 3.94693 25.9336 4.15531C29.6077 4.68037 33.0136 6.32015 35.6589 8.83752C33.8713 10.4689 32.1073 12.1241 30.3673 13.8027C27.0349 11.0757 23.3154 10.4463 19.2086 11.9144C16.196 13.2522 14.0982 15.42 12.9152 18.418C10.9819 17.0284 9.07392 15.6063 7.19194 14.1526C7.06115 14.0861 6.91176 14.0618 6.76562 14.0831C9.75513 8.51765 14.4268 5.20752 20.7806 4.15274" fill="#F44336" />
      <path opacity="0.997" fillRule="evenodd" clipRule="evenodd" d="M6.76138 14.0819C6.91236 14.0596 7.05535 14.0828 7.19035 14.1514C9.07233 15.6051 10.9804 17.0272 12.9136 18.4168C12.6094 19.585 12.4176 20.7777 12.3407 21.9799C12.4064 23.1428 12.5974 24.2842 12.9136 25.4041L6.90526 30.022C4.28877 24.743 4.24081 19.4296 6.76138 14.0819Z" fill="#FFC107" />
      <path opacity="0.999" fillRule="evenodd" clipRule="evenodd" d="M35.3688 35.6142C33.498 34.0212 31.5394 32.5269 29.5017 31.1378C31.5444 29.7452 32.7843 27.8346 33.2213 25.406H23.2109V18.694C28.9839 18.6477 34.7542 18.6948 40.5218 18.8355C41.616 24.5724 40.3522 29.7452 36.7303 34.3536C36.2997 34.7957 35.8435 35.2164 35.3688 35.6142Z" fill="#448AFF" />
      <path opacity="0.993" fillRule="evenodd" clipRule="evenodd" d="M12.9146 25.4062C15.0994 30.6493 19.105 33.0967 24.9312 32.7486C26.5667 32.5658 28.1348 32.0141 29.5087 31.1381C31.5479 32.5308 33.5036 34.0229 35.3758 35.6145C32.4094 38.1883 28.6271 39.7155 24.6461 39.9468C23.7417 40.0166 22.8329 40.0166 21.9284 39.9468C15.1465 39.175 10.1391 35.8666 6.90625 30.0216L12.9146 25.4062Z" fill="#43A047" />
    </svg>
  );
}

export function ReceiptFileIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.332 4.99984V7.0165C18.332 8.33317 17.4987 9.1665 16.182 9.1665H13.332V3.3415C13.332 2.4165 14.0904 1.6665 15.0154 1.6665C15.9237 1.67484 16.757 2.0415 17.357 2.6415C17.957 3.24984 18.332 4.08317 18.332 4.99984Z" stroke="white" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.66797 5.83317V17.4998C1.66797 18.1915 2.4513 18.5832 3.0013 18.1665L4.4263 17.0998C4.75964 16.8498 5.2263 16.8832 5.5263 17.1832L6.90964 18.5748C7.23464 18.8998 7.76797 18.8998 8.09297 18.5748L9.49297 17.1748C9.78463 16.8832 10.2513 16.8498 10.5763 17.0998L12.0013 18.1665C12.5513 18.5748 13.3346 18.1832 13.3346 17.4998V3.33317C13.3346 2.4165 14.0846 1.6665 15.0013 1.6665H5.83464H5.0013C2.5013 1.6665 1.66797 3.15817 1.66797 4.99984V5.83317Z" stroke="white" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.22656 11.4416L9.77656 6.8916" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.93553 11.2502H9.94301" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.16209 7.08317H5.16957" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UploadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5105 15.1099V15.2399C21.5105 19.7099 19.7205 21.4999 15.2505 21.4999H8.74047C4.27047 21.4999 2.48047 19.7099 2.48047 15.2399V15.1099" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15.0001V3.62012" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.3484 5.85L11.9984 2.5L8.64844 5.85" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export function PromoIcon({ className = "w-6 h-6 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 14.75L15 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.9945 14.75H15.0035" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.99451 9.25H9.00349" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20Z" fill="#888888" />
      <path d="M6.69922 13.298L13.2992 6.698" stroke="white" strokeWidth="1.93907" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2992 13.298L6.69922 6.698" stroke="white" strokeWidth="1.93907" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export function ReceiptDocIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" fill="#FFD2DB" />
      <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" fill="#BD8993" />
      <path d="M7 13H13" stroke="#BD8993" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 17H11" stroke="#BD8993" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export function ReuploadIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.8971 8.12533C14.8971 11.8628 11.8638 14.8962 8.1263 14.8962C4.3888 14.8962 2.10703 11.1316 2.10703 11.1316M2.10703 14.517V11.1316H5.16745M1.35547 8.12533C1.35547 4.38783 4.36172 1.35449 8.1263 1.35449C12.6424 1.35449 14.8971 5.11908 14.8971 5.11908M11.8909 5.11908H14.8971V1.73366" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InterestLockIcon({ className = "w-6 h-6 shrink-0", stroke = "#B31B38", }: { className?: string; stroke?: string; }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7.20703 10.3996V8.80075C7.20703 6.15469 8.00644 4.00427 12.0035 4.00427C16.0006 4.00427 16.8 6.15469 16.8 8.80075V10.3996" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.999 19.9949H8.00488C4.80723 19.9949 4.00781 19.1955 4.00781 15.9978V14.399C4.00781 11.2013 4.80723 10.4019 8.00488 10.4019H15.999C19.1967 10.4019 19.9961 11.2013 19.9961 14.399V15.9978C19.9961 19.1955 19.1967 19.9949 15.999 19.9949Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className = "w-4 md:w-5 h-4 md:h-5 shrink-0", ...props }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...props}>
      <path d="M14.167 17.0832H5.83366C3.33366 17.0832 1.66699 15.8332 1.66699 12.9165V7.08317C1.66699 4.1665 3.33366 2.9165 5.83366 2.9165H14.167C16.667 2.9165 18.3337 4.1665 18.3337 7.08317V12.9165C18.3337 15.8332 16.667 17.0832 14.167 17.0832Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5003 4.5835L11.5587 9.5836C10.7003 10.2669 9.29199 10.2669 8.43365 9.5836C8.43365 9.5836 3.93235 5.39709 2.91699 4.5835" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export function WpIcon({ className = "w-5 h-5 shrink-0", stroke = "#222222", fill = "#222222", strokeWidth = "1.2", ...props
}: IconProps & { stroke?: string; fill?: string; strokeWidth?: string; }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={className}  {...props} >
      <path d="M5.7474 17.1647C6.9974 17.9147 8.4974 18.3314 9.9974 18.3314C14.5807 18.3314 18.3307 14.5814 18.3307 9.99807C18.3307 5.41473 14.5807 1.66473 9.9974 1.66473C5.41406 1.66473 1.66406 5.41473 1.66406 9.99807C1.66406 11.4981 2.08073 12.9147 2.7474 14.1647L2.0311 16.9197C1.86883 17.5438 2.4465 18.1078 3.06655 17.9307L5.7474 17.1647Z" stroke={stroke} strokeWidth={strokeWidth} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.75 12.3718C13.75 12.5068 13.72 12.6456 13.6561 12.7806C13.5923 12.9156 13.5096 13.0431 13.4007 13.1631C13.2167 13.3656 13.0139 13.5118 12.7848 13.6056C12.5595 13.6993 12.3153 13.7481 12.0525 13.7481C11.6694 13.7481 11.26 13.6581 10.8281 13.4743C10.3962 13.2906 9.96432 13.0431 9.53618 12.7318C9.10428 12.4168 8.69492 12.0681 8.30433 11.6818C7.9175 11.2918 7.56823 10.8831 7.25651 10.4556C6.94855 10.0281 6.70068 9.60058 6.52041 9.17683C6.34014 8.74933 6.25 8.34058 6.25 7.95058C6.25 7.69558 6.29507 7.45183 6.3852 7.22683C6.47534 6.99808 6.61805 6.78808 6.8171 6.60058C7.05746 6.36433 7.32036 6.24808 7.59827 6.24808C7.70343 6.24808 7.80859 6.27058 7.90248 6.31558C8.00013 6.36058 8.0865 6.42808 8.15411 6.52558L9.02541 7.75183C9.09301 7.84558 9.14184 7.93183 9.17564 8.01433C9.20944 8.09308 9.22822 8.17183 9.22822 8.24308C9.22822 8.33308 9.20193 8.42308 9.14935 8.50933C9.10053 8.59558 9.02917 8.68558 8.93903 8.77558L8.65361 9.07183C8.61229 9.11308 8.59352 9.16183 8.59352 9.22183C8.59352 9.25183 8.59727 9.27808 8.60478 9.30808C8.61605 9.33808 8.62732 9.36058 8.63483 9.38308C8.70243 9.50683 8.81885 9.66808 8.9841 9.86308C9.1531 10.0581 9.33337 10.2568 9.52867 10.4556C9.73147 10.6543 9.92677 10.8381 10.1258 11.0068C10.3211 11.1718 10.4826 11.2843 10.6103 11.3518C10.6291 11.3593 10.6516 11.3706 10.6779 11.3818C10.7079 11.3931 10.738 11.3968 10.7718 11.3968C10.8356 11.3968 10.8845 11.3743 10.9258 11.3331L11.2112 11.0518C11.3051 10.9581 11.3952 10.8868 11.4816 10.8418C11.568 10.7893 11.6544 10.7631 11.7482 10.7631C11.8196 10.7631 11.8947 10.7781 11.9773 10.8118C12.06 10.8456 12.1463 10.8943 12.2402 10.9581L13.4834 11.8393C13.581 11.9068 13.6486 11.9856 13.6899 12.0793C13.7275 12.1731 13.75 12.2668 13.75 12.3718Z" fill={fill} />
    </svg>
  );
}

export function VerifiedCheckCircleIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.0013 29.3332C23.3346 29.3332 29.3346 23.3332 29.3346 15.9998C29.3346 8.6665 23.3346 2.6665 16.0013 2.6665C8.66797 2.6665 2.66797 8.6665 2.66797 15.9998C2.66797 23.3332 8.66797 29.3332 16.0013 29.3332Z" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.332 15.9999L14.1054 19.7732L21.6654 12.2266" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}