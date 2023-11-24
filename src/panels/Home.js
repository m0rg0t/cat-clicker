import PropTypes from "prop-types";
import React from "react";

import {
  Avatar,
  Cell,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";

const Home = ({ id, fetchedUser, openAction }) => (
  <Panel id={id}>
    <PanelHeader>Котокликер</PanelHeader>
    {fetchedUser && (
      <Group
        header={
          <Header mode="secondary">User Data Fetched with VK Bridge</Header>
        }
      >
        <Cell
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
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

    <Group header={<Header mode="secondary">Нажми на котика</Header>}>
      <Div>
        <center>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            src="/576.png"
            alt="Котик"
            onClick={() => {
              console.log("on click on cat");
              openAction();
            }}
          />
        </center>
      </Div>
    </Group>

    {/*<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>*/}
  </Panel>
);

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
