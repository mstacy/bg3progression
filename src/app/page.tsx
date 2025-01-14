// import Image from "next/image";
import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import styles from "./page.module.css";
import progression from "../../progression.json";

type region = {
  name: string;
  link: string;
  locations: location[];
};

type location = {
  name: string;
  link: string;
  quests: quest[];
  items: item[];
};

type quest = {
  name: string;
  link: string;
};

type item = {
  name: string;
  link: string;
};

export default function Home() {
  const buildRegion = (region: region) => {
    return (
      <Accordion key={region.name}>
        <AccordionSummary>
          <h2>{region.name}</h2>
        </AccordionSummary>

        <AccordionDetails>
          {region.locations.map((location) => buildLocation(location))}
        </AccordionDetails>
      </Accordion>
    );
  };

  const buildLocation = (location: location) => {
    return (
      <Accordion key={location.name}>
        <AccordionSummary>
          <h3>{location.name}</h3>
        </AccordionSummary>

        <AccordionDetails>
          {!!location.quests.length && (
            <div>
              <h4>Quests</h4>
              {buildQuests(location.quests)}
            </div>
          )}

          {!!location.items.length && (
            <div>
              <h4>Items</h4>
              {buildItems(location.items)}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const buildQuests = (quests: quest[]) => {
    return (
      <>
        {quests.map((quest: quest) => (
          <FormControlLabel
            label={quest.name}
            control={<Checkbox />}
            key={quest.name}
          />
        ))}
      </>
    );
  };

  const buildItems = (items: item[]) => {
    return (
      <>
        {items.map((item: item) => (
          <FormControlLabel
            label={item.name}
            control={<Checkbox />}
            key={item.name}
          />
        ))}
      </>
    );
  };
  return <div>{buildRegion(progression.act1[0])}</div>;
}
