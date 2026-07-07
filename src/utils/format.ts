// Display digits with thousands separators (e.g. "12000" -> "12,000") while the
// underlying state stays plain digits — only numbers are ever accepted as input.
export function formatThousands(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalizeFirst(value: string): string {
  return value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
