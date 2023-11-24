import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";

const useBannerAds = (vkBridgeStatus) => {
  useEffect(() => {
    if (vkBridgeStatus === "INITIALIZED") {
      bridge.send("VKWebAppInit").then(() => {
        bridge
          .send("VKWebAppShowBannerAd", {
            banner_location: 'bottom',
          })
          .then((data) => {
            if (data.result) {
              // Баннерная реклама отобразилась
              console.log("show banner ad", data);
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });
      });
    }
  }, [vkBridgeStatus]);
};

export default useBannerAds;
