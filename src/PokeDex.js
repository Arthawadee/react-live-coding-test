import "./App.css";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { PDFExport } from "@progress/kendo-react-pdf";
import Pagination from "@mui/material/Pagination";

import ModalContent from "./components/ModalContent";

const rowPerPage = 10;

function PokeDex() {
  const contentArea = useRef();

  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          rowPerPage * page
        }&limit=${rowPerPage}`
      )
      .then((res) => {
        setIsLoading(false);
        setPokemons(res.data.results);
        setTotalItem(res.data.count);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [page]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
      width: "50%",
      minWidth: "320px",
      height: "80vh",
    },
    overlay: { backgroundColor: "grey" },
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  const clickPokemonItemHandler = (pokemon) => {
    setIsLoading(true);
    axios
      .get(pokemon.url)
      .then((res) => {
        setIsLoading(false);
        setPokemonDetail(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const filterInputChangeHandler = (event) => {
    setFilterInput(event.target.value);
  };

  const filterPokemen = (allPokemon) => {
    return allPokemon.filter((pokemon) => pokemon.name.includes(filterInput));
  };

  const sortPokemon = (allPokemon) => {
    return allPokemon.sort((a, b) => {
      if (isAscending) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      } else {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
      }
    });
  };

  const handleExportWithComponent = () => {
    contentArea.current.save();
  };

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
                <ReactLoading
                  type="bubbles"
                  color="white"
                  height="20%"
                  width="20%"
                />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <b>Implement Pokedex list here</b>
            <div className="filterInput">
              <label htmlFor="filterInput">Search Input</label>
              <input
                type="text"
                id="filterInput"
                value={filterInput}
                onChange={filterInputChangeHandler}
                placeholder="search..."
              />
            </div>
            <button
              onClick={() => {
                setIsAscending((prevState) => !prevState);
              }}
            >
              Sort {isAscending ? "Ascending" : "Descending"}
            </button>
            <ul className="pokemonList">
              {sortPokemon(filterPokemen(pokemons)).map((pokemon, index) => (
                <li
                  key={index}
                  onClick={() => clickPokemonItemHandler(pokemon)}
                >
                  {pokemon.name}
                </li>
              ))}
            </ul>
            <div className="paginationContainer">
              <Pagination
                color="primary"
                count={Math.ceil(totalItem / rowPerPage)}
                page={page + 1}
                shape="rounded"
                onChange={(e, p) => {
                  setPage(p - 1);
                }}
              />
            </div>
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={!!pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <button onClick={handleExportWithComponent}>Download PDF</button>
          <PDFExport ref={contentArea} paperSize="A4">
            <ModalContent pokemonDetail={pokemonDetail} />
          </PDFExport>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
