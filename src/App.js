import bridge from "@vkontakte/vk-bridge";
import {
  AdaptivityProvider,
  Alert,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import React, { useEffect, useState } from "react";
import useBannerAds from "./hooks/useBannerAds";

import Home from "./panels/Home";

const App = () => {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null); //useState(<ScreenSpinner size='large' />);

  const [isNativeAds, setIsNativeAds] = useState(false);

  useEffect(() => {
    isNativeAdsAvailableCheck();
  }, []);

  const isNativeAdsAvailableCheck = async () => {
    try {
      const data = await bridge.send("VKWebAppCheckNativeAds", {
        ad_format: "reward",
      });
      if (data.result) {
        setIsNativeAds(true);
        return true;
      } else {
        setIsNativeAds(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const showAd = async () => {
    try {
      const data = await bridge.send("VKWebAppShowNativeAds", {
        ad_format: "reward",
      });

      if (data.result)
        // Успех
        console.log("Реклама показана");
      // Ошибка
      else console.log("Ошибка при показе");
    } catch (error) {
      console.log(error); /* Ошибка */
    }
  };

  const openAction = () => {
    setPopout(
      <Alert
        actions={[
          {
            title: "Да, я знал",
            mode: "destructive",
            autoClose: true,
            action: () => setPopout(null),
          },
          {
            title: "Теперь я знаю",
            autoClose: true,
            action: () => setPopout(null),
            mode: "cancel",
          },
        ]}
        actionsLayout="vertical"
        onClose={() => setPopout(null)}
        header="Вы нажали на котика"
        text="Вы знаете что вы молодец?"
      />
    );
  };

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useBannerAds("INITIALIZED");

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home
                  isNativeAds={isNativeAds}
                  isNativeAdsAvailableCheck={isNativeAdsAvailableCheck}
                  showAd={showAd}
                  id="home"
                  fetchedUser={fetchedUser}
                  openAction={openAction}
                />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
