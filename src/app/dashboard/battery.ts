export function calcBatteryPercent(battery: number) {
  const maxBattery = 5.2;
  const minBattery = 3.3;
  const batteryRange = maxBattery - minBattery;
  const batteryDecimal = (battery - minBattery) / batteryRange;
  let batteryPercent = batteryDecimal * 100;
  if (batteryPercent > 100) batteryPercent = 100;
  if (batteryPercent < 0) batteryPercent = 0;

  return batteryPercent;
}

export async function fetchRobotBattery() {
  const data = await fetch("/api/dashboard/robot/battery/by-id", {
    method: "GET",
  });
  const battery = (await data.json()).battery;
  const batteryPercent = calcBatteryPercent(battery);
  return batteryPercent;
}

export async function fetchAllLatestRobotBatteryInClass() {
  const data = await fetch("/api/dashboard/robot/battery/by-class", {
    method: "GET",
  });
  const batteryArr = (await data.json()).battery;
  return batteryArr;
}
