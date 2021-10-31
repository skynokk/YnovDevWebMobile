import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "myFirstIonicApp",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      showSpinner: true,
      launchAutoHide: false,
    },
  },
};

export default config;
