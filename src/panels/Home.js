import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import getRandomCatImage from "../helpers/getRandomCatImage";

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
} from "@vkontakte/vkui";
import getRandomGoodText from "../helpers/getRandomGoodText";

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
      {fetchedUser && (
        <Group header={<Header mode="secondary">Кто нажмет на котика?</Header>}>
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            after={<Counter mode="primary">{clickCounter}</Counter>}
            subtitle={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group>
        <Div>
          <Title level="1" weight="bold" style={{ textAlign: "center" }}>
            {getRandomGoodText()}
          </Title>
          <Paragraph>
            С каждым нажатием на котика твой счет увеличивается на 1. Но каждое
            нажатие требует просмотра рекламы. Но даже если ты не нажмешь на
            котика, ты все равно большой молодец, и у тебя все получится.
          </Paragraph>
          <center>
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={randomCat.current}
              alt="Котик"
              onClick={() => {
                console.log("click on cat", clickCounter);
                setClickCounter((prev) => prev + 1);
                if (isNativeAds) {
                  showAd();
                  isNativeAdsAvailableCheck();
                }
                //openAction();
              }}
            />
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
