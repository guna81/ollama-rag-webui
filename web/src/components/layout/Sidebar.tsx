import React from "react";
import styles from "@/styles/Sidebar.module.css";
import Image from "next/image";

import logo from "../../../assets/logo/ollama.png";
// import Ollama from "./ModelSelect";
// import Document from "../Sidebar/Document";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "react-bootstrap/Dropdown";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className={styles.title}>Ollama Web</h1>
      </div>

      <div className={styles.sidebarBody}>{/* <Document /> */}</div>

      <div className={styles.sidebarFooter}>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            style={{
              width: "100%",
              backgroundColor: "#fff",
              border: "none",
            }}
          >
            <div className={styles.settingsBtn}>
              <FontAwesomeIcon
                style={{ marginRight: "12px", fontSize: "18px" }}
                icon={faGear}
              />
              Settings
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item disabled href="#/action-1">
              Profile
            </Dropdown.Item>
            <Dropdown.Item disabled href="#/action-2">
              Models Library
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
