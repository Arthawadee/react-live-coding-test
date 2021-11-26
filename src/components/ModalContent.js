import Table from "./Table";
import BarChart from "./BarChart";

const ModalContent = (props) => {
  return (
    <div className="modalContainer">
      Requirement:
      <ul>
        <li>show the sprites front_default as the pokemon image</li>
        <li>
          Show the stats details - only stat.name and base_stat is required in
          tabular format
        </li>
        <li>Create a bar chart based on the stats above</li>
        <li>
          Create a buttton to download the information generated in this modal
          as pdf. (images and chart must be included)
        </li>
      </ul>
      <img
        src={props.pokemonDetail.sprites.front_default}
        alt="pokemon avatar"
        width="60%"
      />
      <Table data={props.pokemonDetail.stats} />
      <BarChart data={props.pokemonDetail.stats} />
    </div>
  );
};

export default ModalContent;
