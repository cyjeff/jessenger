import { useEffect, useState } from "react";

export function Chat() {
  const [forecasts, SetForecasts] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response2 = await fetch("api/Chat");
      const data2 = await response2.json();
      console.log(data2);
    }
    getData();
  }, []);

  return <div className="container">{Chat.map}</div>;
}
