import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/ClientQueries";
import spinner from "../assets/spinner.gif";
import AddClientModal from "./AddClientModal";

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading)
    return (
      <div>
        <img
          src={spinner}
          alt="Loading..."
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        />
      </div>
    );
  if (error) return <div> Error in fetching data from graphql</div>;

  return (
    <>
      <div className="clientHeader">Clients</div>
      <AddClientModal />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((d) => {
            return <ClientRow key={d.id} data={d} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export default Clients;
