export function getRestictedNumberString(value) {
  return value.replace(/[^\d]/g, '') || '';
}