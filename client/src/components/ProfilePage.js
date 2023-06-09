import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const ProfilePage = (props) => {
  const [user, setUser] = useState({
    email: "",
    games: [],
  });
  const userId = props.match.params.id;

  const getUserGames = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUser(body.user);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getUserGames();
  }, []);

  const userGames = user.games

  const chartData = [["Game Number", "Games"]];
  userGames.forEach((game) => {
    if(game.score > 0){
        chartData.push([game.id, game.score]);
     }
  });

    const options = {
    title: "Your Game Scores",
    curveType: "function",
    legend: { position: "bottom" },
    backgroundColor:  "1109eb",
    hAxis: {
        textStyle: {color: "fff"}
    },
    legendTextStyle: { color: '#FFF' },
    titleTextStyle: { color: '#FFF' },
    vAxis: {
        textStyle: {color: "fff"}
    },
    pointSize: 15,
    colors: ["fff"]

  };

  return (
    <div className="profile-page">
      <h1>{user.email}'s Scores</h1>
      <div style={{ width: "100%", height: "430px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
      <Chart
        chartType="ScatterChart"
        data={chartData}
        width="100%"
        height="400px"
        options={options}
      />
    </div>
    </div>
  );
};

export default ProfilePage;
