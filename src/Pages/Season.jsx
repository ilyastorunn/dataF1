import { useEffect } from "react";
import { useState } from "react";

export default function Season() {
  const [season, setSeason] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/2024.json/")
      .then((res) => res.json())
      .then((data) => setSeason(data.MRData.SeasonTable.Seasons[0]))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        2024 Formula 1 Season
      </h1>
      {season ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-xl font-semibold">Season: {season.season}</p>
          <p className="text-lg text-gray-700">
            Starts:{" "}
            {season.url ? (
              <a
                href={season.url}
                target="_blank"
                className="text-blue-500 underline"
              >
                Details:
              </a>
            ) : (
              "No Info"
            )}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
