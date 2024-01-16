import React, { useState, useEffect } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

import { getAllSponsorships } from "../../services/Sponsor";
const token = localStorage.getItem("token"); 

function SelectSponsor({ selectSponsors, updateSponsorsList  }) {
  const [allSponsors, setAllSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState('Seleccionar patrocinador');

  useEffect(() => {
    getAllSponsorships(token)
      .then((data) => {
        setAllSponsors(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [allSponsors]);

  const handleMenuClick = (event) => {
    const selectedSponsorName = allSponsors.find(
      (sponsor) => sponsor.sponsorshipId === event.key
    )?.nameSponsorship;
    const selectedSponsorId = allSponsors.find(
      (sponsor) => sponsor.sponsorshipId === event.key
    )?.sponsorshipId;
    setSelectedSponsor(selectedSponsorName || "Seleccionar patrocinador");
    selectSponsors(selectedSponsorId);

    updateSponsorsList();
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {allSponsors.map((sponsor) => (
        <Menu.Item key={sponsor.sponsorshipId}>{sponsor.nameSponsorship}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="mb-3">
      <Dropdown overlay={menu}>
        <Button style={{ width: '14vw', height: '4vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedSponsor}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default SelectSponsor;

