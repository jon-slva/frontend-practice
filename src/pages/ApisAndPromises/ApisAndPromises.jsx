import './ApisAndPromises.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import apiCards from '../../data/api_type_cards.json';

const thenCatchCards = apiCards[0].thenCatchCards;
const asyncAwaitCards = apiCards[1].asyncAwaitCards;
const preEs6Cards = apiCards[2].preEs6Cards;

const ApisAndPromises = () => {
	const [axiosData, setAxiosData] = useState(null);
	const [fetchApiData, setFetchApiData] = useState(null);
	const [cardToggle, setCardToggle] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("https://api.publicAndPromises.org/entries");
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


			<h1>APIs & Promises</h1>
			<section className="top">
				<h2>Here are some different ways we can query APIs:</h2>
				<h3>Select Request Type:</h3>

				<button className="promise-toggle" onClick={() => setCardToggle("async/await")}>
					async/await
				</button>
				<button className="promise-toggle" onClick={() => setCardToggle("then/catch")}>
					then/catch
				</button>
				<button className="promise-toggle" onClick={() => setCardToggle("pre-ES6")}>
					pre-ES2

				</button>
			</section>
			{
				<>
					< h2 >
						{(cardToggle === "async/await" ? apiCards[1]
							: cardToggle === "then/catch" ? apiCards[0]
								: apiCards[2]).categoryTitle
						}
					</h2>

					<aside className="card-container">
						{(cardToggle === "async/await" ? asyncAwaitCards
							: cardToggle === "then/catch" ? thenCatchCards
								: preEs6Cards)
							.map((card, index) => (
								<article className="card" key={index}>
									<div className="card__top">
										<h2 className="card__title">{card.name}</h2>
										<h3 className="card__title">{card.subtitle}</h3>
										<p className="card__description">{card.description}</p>
									</div>
									<div className="card__image" style={{
										backgroundImage: `url(${card.image})`,
										backgroundPosition: `${cardToggle === "pre-ES6" ? "top" : "center"}`
									}}>
									</div>
								</article>
							))}
					</aside>
				</>
			}

			<h2>To mess with these APIs, we are going to use https://api.publicapis.org/</h2>
			<p><a href="https://api.publicapis.org/">https://api.publicapis.org/</a> is an API that lists public APIs</p>
			<p>It returns a ton of data which is great for figuring out different ways of handling it all, and is great prep for interviews</p>


		</main >
	)
}

export default ApisAndPromises
