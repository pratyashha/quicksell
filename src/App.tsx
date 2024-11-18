import { useEffect, useState } from "react";
import PopoverMenu from "./components/popover";
import HomePage from "./homepage";

export default function App() {
  const [data, setData] = useState<JSONResponse | undefined>(undefined);

  const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment#";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <div className="App-header">
        <PopoverMenu />
      </div>
      <HomePage data={data} />
    </div>
  );
}
