const Table = (props) => {
  return (
    <table className="pokemonTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Base Stat</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => {
          return (
            <tr key={item.stat.name}>
              <td>{item.stat.name}</td>
              <td style={{ textAlign: "center" }}>{item.base_stat}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
