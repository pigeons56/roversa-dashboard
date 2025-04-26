export function calcBatteryPercent(battery: number) {
  const batteryDecimal = (battery - 3.4) / 0.25;
  let batteryPercent = batteryDecimal * 100;
  if (batteryPercent > 100) batteryPercent = 100;
  if (batteryPercent < 0) batteryPercent = 0;

  return batteryPercent;
}
