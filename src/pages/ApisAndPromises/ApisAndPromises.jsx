import "./ApisAndPromises.scss";
import axios from "axios";
import { useEffect, useState, Suspense, lazy } from "react";
import apiCards from "../../data/api_type_cards.json";
const LazyRow = lazy(() => import("../../components/LazyRow/LazyRow"));
import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // ensure JS grammar is loaded

const VITE_NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const thenCatchCards = apiCards[0].thenCatchCards;
const asyncAwaitCards = apiCards[1].asyncAwaitCards;
const preEs6Cards = apiCards[2].preEs6Cards;

const ApisAndPromises = () => {
  const [axiosData, setAxiosData] = useState({
    links: {},
    element_count: "",
    near_earth_objects: {},
  });
  const [cardToggle, setCardToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-04-01&end_date=2024-04-08&api_key=${VITE_NASA_API_KEY}`,
        );
        // console.log(data)
        setAxiosData(data);
        console.log(data.near_earth_objects);
        // console.log(axiosData.element_count) // this doesnt even work because the useState data is still stale
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const yourCodeString = `
// -------------------------
// 1. Axios (Promise-based)
// -------------------------
function fetchDataWithAxios() {
  axios
    .get("https://api.publicAndPromises.org/")
    .then(response => {
      console.log("Axios (Promise)", response.data);
      // set your state here
    })
    .catch(error => console.error(error));
}

// ---------------------------------
// 2. Axios (async/await + try/catch)
// ---------------------------------
async function fetchDataWithAxiosAsync() {
  try {
    const response = await axios.get("https://api.publicAndPromises.org/");
    console.log("Axios (Async/Await)", response.data);
    // set your state here
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------
// 3. Fetch API (Promise-based)
// ----------------------------
function fetchDataWithFetch() {
  fetch("https://api.publicAndPromises.org/")
    .then(response => response.json())
    .then(data => {
      console.log("Fetch (Promise)", data);
      // set your state here
    })
    .catch(error => console.error(error));
}

// ---------------------------------------
// 4. Fetch API (async/await + try/catch)
// ---------------------------------------
async function fetchDataWithFetchAsync() {
  try {
    const response = await fetch("https://api.publicAndPromises.org/");
    const data = await response.json();
    console.log("Fetch (Async/Await)", data);
    // set your state here
  } catch (error) {
    console.error(error);
  }
}
    `;

  return (
    <main>
      <h1>APIs & Promises</h1>
      <section className="top">
        <h2>Here are some different ways we can query APIs:</h2>
        <h3>Select Request Type:</h3>

        <button
          className="promise-toggle"
          onClick={() => setCardToggle("async/await")}
        >
          async/await
        </button>
        <button
          className="promise-toggle"
          onClick={() => setCardToggle("then/catch")}
        >
          then/catch
        </button>
        <button
          className="promise-toggle"
          onClick={() => setCardToggle("pre-ES6")}
        >
          pre-ES6
        </button>
      </section>
      {
        <>
          <h2>
            {
              (cardToggle === "async/await"
                ? apiCards[1]
                : cardToggle === "then/catch"
                  ? apiCards[0]
                  : apiCards[2]
              ).categoryTitle
            }
          </h2>

          <aside className="card-container">
            {(cardToggle === "async/await"
              ? asyncAwaitCards
              : cardToggle === "then/catch"
                ? thenCatchCards
                : preEs6Cards
            ).map((card, index) => (
              <article className="card" key={index}>
                <div className="card__top">
                  <h2 className="card__title">{card.name}</h2>
                  <h3 className="card__title">{card.subtitle}</h3>
                  <p className="card__description">{card.description}</p>
                </div>
                <div
                  className="card__image"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundPosition: `${cardToggle === "pre-ES6" ? "top" : "center"}`,
                  }}
                ></div>
              </article>
            ))}
          </aside>
        </>
      }

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <pre
          style={{
            backgroundColor: "#000",
            padding: "16px",
            borderRadius: "4px",
            overflowX: "auto",
            textAlign: "left",
            width: "fit-content",
            justifyItems: "center",
          }}
        >
          <code
            className="language-javascript"
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              textAlign: "left",
            }}
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                yourCodeString,
                Prism.languages.javascript,
                "javascript",
              ),
            }}
          />
        </pre>
      </div>

      <h2>Here is some data from NASAs database on Near Earth Objects</h2>

      <h3>{axiosData.element_count}</h3>

      <p
        style={{
          // position: 'absolute',
          width: "100%",
          left: "0",
        }}
      >
        These elements below implement Suspense and inside that, a component
        with LazyLoading to increase performance
      </p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Abs Magnitude</th>
            <th>Est Diameter</th>
            <th>Is Hazardous</th>
            <th>Close Approach Date</th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyRow axiosData={axiosData} />
          </Suspense>
        </tbody>
      </table>
    </main>
  );
};

export default ApisAndPromises;
