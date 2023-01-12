import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";

function ClientRow({ data }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: data.id },
    // refetchQueries: [{ query: GET_CLIENTS }], ---> one way to update the result but it will lead another query which is not good
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td>
        <button onClick={deleteClient}>
          <DeleteForeverTwoToneIcon color="primary" />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
