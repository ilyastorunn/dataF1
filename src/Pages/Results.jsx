import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useState } from "react";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/2024/results.json?limit=1000")
      .then((res) => res.json())
      .then((data) => setResults(data.MRData.RaceTable.Races))
      .catch((err) => console.error("Error fetching race results:", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🏎️ 2024 Formula 1 Race Results
      </h1>
      {results.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>Race</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Standings</TableHead>
                <TableHead>Pilot</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((race) =>
                race.Results.map((result, idx) => (
                  <TableRow
                    key={`${race.raceName}-${idx}`}
                    className="odd:bg-background even:bg-muted"
                  >
                    <TableCell>{race.raceName}</TableCell>
                    <TableCell>{race.date}</TableCell>
                    <TableCell className="text-center font-semibold">
                      {result.position}
                    </TableCell>
                    <TableCell>{`${result.Driver.givenName} ${result.Driver.familyName}`}</TableCell>
                    <TableCell>{result.Constructor.name}</TableCell>
                    <TableCell>{result.Time?.time || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-600">⏳ Loading...</p>
      )}
    </div>
  );
}
