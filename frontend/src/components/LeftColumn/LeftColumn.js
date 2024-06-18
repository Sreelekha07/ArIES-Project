import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import Logo from "../../images/logo.svg";
import "./LeftColumn.styles.css";
import { UilSearch } from "@iconscout/react-unicons";
import { getAllUser } from "../../api/User";
import UserConnectionsCard from "../UserConnectionsCard/UserConnectionsCard";
import { useSelector } from "react-redux";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import { useParams } from "react-router-dom";

const LeftSide = () => {
  const them = useMantineTheme();
  const params = useParams()
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <div className="ProfileSide">
      <div className="LogoSearch">
        <img style={{ width: "60px" }} src={Logo} alt="" />
        <p>Social Nest</p>
      </div>

      <ProfileDetails />

      {params.id ? null : <UserProfileCard location="homepage" />}
      <div className="UserConnectionsCard">
        <h3>People you may know</h3>

        {persons.map((person, id) => {
          if (person._id !== user._id) return <UserConnectionsCard person={person} key={id} />;
        })}
        <span onClick={() => setModalOpened(true)}>Show more</span>

        <Modal
          overlayColor={
            them.colorScheme === "dark"
              ? them.colors.dark[9]
              : them.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
          size="55%"
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
        >
          <h3>People you may know</h3>

          {persons.map((person, id) => {
            if (person._id !== user._id)
              return <UserConnectionsCard person={person} key={id} />;
          })}
        </Modal>
      </div>
    </div>
  );
};

export default LeftSide;
