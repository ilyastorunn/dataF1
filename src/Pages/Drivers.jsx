import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/2024/drivers.json")
      .then((res) => res.json())
      .then((data) => setDrivers(data.MRData.DriverTable.Drivers))
      .catch((err) => console.error("API Hatası:", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        2024 Formula 1 Pilots
      </h1>
      {drivers.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Surname</TableHead>
                <TableHead>Birth</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Wiki</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver, index) => (
                <TableRow
                  key={driver.driverId}
                  className="odd:bg-background even:bg-muted"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{driver.givenName}</TableCell>
                  <TableCell>{driver.familyName}</TableCell>
                  <TableCell>{driver.dateOfBirth}</TableCell>
                  <TableCell>{driver.nationality}</TableCell>
                  <TableCell>
                    <a
                      href={driver.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Wiki
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
