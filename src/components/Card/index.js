import React, { useState, useEffect } from "react";
import "./index.css";
import { fetchPokemon } from "../../utils/api";
import capitalize from "../../utils/capitalize";
import colors from "../../utils/colors";

const getType = (types) => {
  if (types.length) {
    return types[0].type?.name;
  }
};

const structuredStats = (stats) => {
  if (!stats) return undefined;
  const retStats = {
    type: capitalize(getType(stats.types)) || "N/A",
    hp: stats.stats[0]?.base_stat || "N/A",
    image: stats.sprites?.other["official-artwork"]?.front_default,
    abilities:
      stats.abilities?.map((ability) => capitalize(ability?.ability?.name)) ||
      "N/A",
  };
  return retStats;
};

const Card = ({ name, url }) => {
  const [stats, setStats] = useState(undefined);

  const handleFetchPokemon = async (_url) => {
    const res = await fetchPokemon(_url);
    setStats(structuredStats(res));
  };

  useEffect(() => {
    if (!url) return;
    handleFetchPokemon(url);
  }, [url]);

  const getBackgroundColor = (type) => {
    return colors[type.toLowerCase()];
  };

  if (!stats) {
    return <></>;
  }

  return (
    <div
      className="container"
      style={{
        backgroundColor: getBackgroundColor(stats.type) || "#fff",
        border: getBackgroundColor(stats.type) ? null : "4px solid gray",
      }}
    >
      <div className="header">
        <p className="type">{stats.type}</p>
        <p className="name">{capitalize(name)}</p>
        <p className={"hp"}>hp {stats.hp}</p>
      </div>
      <div className={"image-container"}>
        <img className="image" src={stats.image} />
      </div>
      <div className="abilities">
        {stats.abilities.map((ability) => (
          <p key={ability}>{ability}</p>
        ))}
      </div>
    </div>
  );
};

export default Card;
