import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import getRandomCatImage from "../helpers/getRandomCatImage";
import bridge from "@vkontakte/vk-bridge";

import {
  Avatar,
  Cell,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
  Paragraph,
  Counter,
  Title,
  Button,
  Input,
} from "@vkontakte/vkui";
import getRandomGoodText from "../helpers/getRandomGoodText";
import "./Home.css";

const Home = ({
  id,
  fetchedUser,
  openAction,
  showAd,
  isNativeAds,
  isNativeAdsAvailableCheck,
}) => {
  const [clickCounter, setClickCounter] = useState(0);
  const randomCat = useRef(getRandomCatImage());
  console.log("randomCat", randomCat.current);

  return (
    <Panel id={id}>
      <PanelHeader>Котокликер</PanelHeader>
      {
        <Group header={<Header mode="secondary">Кто нажмет на котика?</Header>}>
          <Cell
            before={
              fetchedUser?.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            after={<Counter mode="primary">{clickCounter}</Counter>}
            subtitle={
              fetchedUser?.city && fetchedUser.city?.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser?.first_name || "Хороший"} ${
              fetchedUser?.last_name || "человек"
            }`}
          </Cell>
        </Group>
      }

      <Group>
        <Div>
          <div id="mainCatBlock">
            <div id="mainCatBlock_texts">
              <Title level="1" weight="bold" style={{ textAlign: "center" }}>
                {getRandomGoodText()}
              </Title>
              <Paragraph>
                С каждым нажатием на котика твой счет увеличивается на 1. Но
                нажатие иногда вызывает рекламу. Но даже если ты не нажмешь на котика, ты все равно 
                <strong> большой молодец, и у тебя все получится.</strong>
              </Paragraph>
            </div>
            <div id="mainCatBlock_cats">
              <img id='mainCatImg'
                src={randomCat.current}
                alt="Котик"
                onClick={() => {
                  console.log("click on cat", clickCounter);
                  setClickCounter((prev) => prev + 1);
                  if (isNativeAds && (clickCounter + 1) % 3 === 0) {
                    showAd();
                    isNativeAdsAvailableCheck();
                  }
                  //openAction();
                }}
              />
            </div>
          </div>
          <center>
            <div id='sharing'>
              <Paragraph>
                И если хочешь, введи столько кликов по котику, сколько ты хочешь</Paragraph>
                <Input type='number' onChange={(e) => {
                  if (Number(e.target.value) < 0) {
                    setClickCounter(0);
                    return;
                  }
                  setClickCounter(Number(e.target.value));
                } } value={clickCounter} />
            <Button
              onClick={() => {
                const text = `Я нажал на котика вот столько раз: ${clickCounter}

				${getRandomGoodText()}
				
				#котокликер`;

                bridge
                  .send("VKWebAppShowWallPostBox", {
                    message: text,
                    attachments: "https://vk.com/app51801283",
                  })
                  .then((data) => {
                    if (data.post_id) {
                      // Запись размещена
                    }
                  })
                  .catch((error) => {
                    // Ошибка
                    console.log(error);
                  });
              }}
            >
              Поделиться!
            </Button>
            </div>
          </center>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  openAction: PropTypes.func,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
