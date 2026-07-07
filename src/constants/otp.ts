export const OTP_LENGTH = 6;

// TODO: remove once the real OTP API is wired up
export const DUMMY_OTP = "123456";

// Escalating resend cooldowns: 1st resend 60s, 2nd 120s, 3rd 300s.
// After that, further resends are blocked for this session.
export const RESEND_COOLDOWNS = [60, 120, 300];
