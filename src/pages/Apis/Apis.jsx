import './Apis.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiTypes from '../../data/api_type_cards.json';

const Apis = () => {
	const [axiosData, setAxiosData] = useState(null);
	const [fetchApiData, setFetchApiData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.publicapis.org/entries");
				setAxiosData(response.data);
				console.log("Axios", axiosData);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.publicapis.org/entries");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setFetchApiData(data);
				console.log("Fetch API", fetchApiData);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	useEffect(function () {
		function fetchData() {
			fetch("https://api.publicapis.org/entries")
				.then(function (response) {
					if (!response.ok) {
						throw new Error("HTTP error! status: " + response.status);
					}
					return response.json();
				})
				.then(function (data) {
					setFetchApiData(data);
					console.log("Fetch API", fetchApiData);
				})
				.catch(function (error) {
					console.error(error);
				});
		}

		fetchData();
	}, []);



	return (
		<main>
			<h1>APIs</h1>
			<h3>Here are some different ways we can query APIs:</h3>
			<aside className="card-container">
				{apiTypes.map((apiType, index) => (

					<article className="card" key={index}>
						<div className="card__top">
							<h2 className="card__title">{apiType.name}</h2>
							<p className="card__description">{apiType.description}</p>
						</div>
						<div className="card__image" style={{
							backgroundImage: `url(${apiType.image})`,
							width: '100%',
							height: '50%',
							// overflow: 'hidden',
							backgroundSize: '120%',
							backgroundPosition: '50% 50%',
							flexGrow: '1',
						}}>
						</div>
					</article>

				))}
			</aside>

			<h2>To mess with these APIs, we are going to use https://api.publicapis.org/</h2>
			<p><a href="https://api.publicapis.org/">https://api.publicapis.org/</a> is an API that lists public APIs</p>
			<p>It returns a ton of data which is great for figuring out different ways of handling it all, and is great prep for interviews</p>


		</main >
	)
}

export default Apis
