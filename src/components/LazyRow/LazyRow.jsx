import React from 'react'

const LazyRow = ({ axiosData }) => {
	return (
		<>
			{axiosData && axiosData.near_earth_objects && Object.values(axiosData.near_earth_objects).flatMap((neos) => {
				return neos.map((neo, index) => {
					return (
						<tr key={index}>
							<td>{neo.id}</td>
							<td>{neo.name}</td>
							<td>{neo.absolute_magnitude_h}</td>
							<td>{neo.absolute_magnitude_h}</td>
							<td>{neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}</td>
							<td>{neo.close_approach_data[0].close_approach_date}</td>
						</tr>
					)
				});
			})}
		</>
	)
}

export default LazyRow