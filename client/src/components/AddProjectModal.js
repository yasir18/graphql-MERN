import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/ClientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { Alert } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [client, setClient] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId: client },
    // refetchQueries: [{ query: GET_PROJECTS }],
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const setAllFieldsToEmpty = () => {
    setName("");
    setDescription("");
    setStatus("");
    setClient("");
  };

  const handleClose = () => {
    setOpen(false);
    setAllFieldsToEmpty();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(name, description, status, client);
    if (name === "" || description === "" || status === "" || client === "") {
      setShowAlert(true);
    } else {
      addProject(name, description, status, client);
    }
    setAllFieldsToEmpty();
    setOpen(false);
  };

  if (loading) return null;
  if (error) {
    console.log("error");
    return '"Something went wrong whle fetching clientIds"';
  }

  console.log(data);
  return (
    <>
      {!loading && !error && (
        <div>
          <div className="addClientDiv">
            <Button variant="contained" onClick={handleClickOpen}>
              Add new Project
            </Button>
          </div>
          {showAlert && (
            <Alert
              onClose={() => {
                setShowAlert(false);
              }}
              severity="error"
            >
              Please fill out all fields!
            </Alert>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new Project</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>New Project</DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Project Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Project Description"
                type="text"
                fullWidth
                multiline
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <InputLabel id="demo-simple-select-autowidth-label">
                Select Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Status"
                value={status}
                onChange={handleChangeStatus}
                style={{ width: "80%" }}
              >
                <MenuItem disabled value="hghfh gh ">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem key="1" value="new">
                  Not Started
                </MenuItem>
                <MenuItem key="2" value="progress">
                  In Progress
                </MenuItem>
                <MenuItem key="3" value="completed">
                  Completed
                </MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-autowidth-label">
                Select Client
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Client"
                value={client}
                onChange={handleChangeClient}
                style={{ width: "80%" }}
              >
                <MenuItem disabled value="hghfh gh ">
                  <em>Select Client</em>
                </MenuItem>

                {data.clients.map((client) => {
                  return (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
