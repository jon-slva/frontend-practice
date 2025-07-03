import { NasaNEOData, NearEarthObject } from "../../types";

interface LazyRowProps {
  axiosData: NasaNEOData;
}

const LazyRow: React.FC<LazyRowProps> = ({ axiosData }) => {
  return (
    <>
      {axiosData &&
        axiosData.near_earth_objects &&
        Object.values(axiosData.near_earth_objects).flatMap((NEOs) => {
          return NEOs.map((neo: NearEarthObject) => {
            return (
              <tr key={neo.id}>
                <td>{neo.id}</td>
                <td>{neo.name}</td>
                <td>{neo.absolute_magnitude_h}</td>
                <td>{neo.absolute_magnitude_h}</td>
                <td>{neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</td>
                <td>
                  {neo.close_approach_data?.[0]?.close_approach_date || "N/A"}
                </td>
              </tr>
            );
          });
        })}
    </>
  );
};

export default LazyRow;
