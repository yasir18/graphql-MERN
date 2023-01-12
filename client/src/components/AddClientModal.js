import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
import { ADD_CLLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { Alert } from "@mui/material";

export default function AddClientModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const [addClient] = useMutation(ADD_CLLIENT, {
    variables: { name, email, phone },
    // refetchQueries: [{ query: GET_CLIENTS }], ---> one way to update the result but it will lead another query which is not good
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.concat([addClient]),
        },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      setOpen(false);
      setError(true);
      return;
    }

    addClient(name, email, phone);
    setOpen(false);
    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <div>
      <div className="addClientDiv">
        <Button variant="contained" onClick={handleClickOpen}>
          Add new client
        </Button>
      </div>
      {error && (
        <Alert
          onClose={() => {
            setError(false);
          }}
          severity="error"
        >
          Please fill out all fields!
        </Alert>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter following lient details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
