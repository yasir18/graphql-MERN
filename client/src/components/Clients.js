import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div>Loading</div>;
  if (error) return <div> Error</div>;

  return (
    <>
      {data.clients.map((d) => {
        return (
          <div>
            <p>{d.name}</p>
            <p>{d.email}</p>
            <p>{d.phone}</p>
          </div>
        );
      })}
    </>
  );
}

export default Clients;
