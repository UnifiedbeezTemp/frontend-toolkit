import { DeviceInfo } from "../types/deviceInfoTypes";

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  let ipAddress = "unknown";

  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    ipAddress = ipData.ip;
  } catch (error) {
    console.log("Could not fetch IP:", error);
  }

  return {
    device_type: "web",
    device_name: navigator.platform,
    user_agent: navigator.userAgent,
    ip_address: ipAddress,
  };
};
