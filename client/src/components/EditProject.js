import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECT } from "../queries/ProjectQueries";

export default function EditProject({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const handleSubmit = (e) => {
    console.log(name, description, status);
    updateProject(name, description, status);
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      name,
      description,
      status,
      id: project.id,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });
  return (
    <div style={{ padding: "20px", width: "60%" }}>
      <p style={{ fontSize: "28px", fontWeight: "700" }}>
        Update Project Details
      </p>
      <TextField
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
        onChange={(e) => setStatus(e.target.value)}
        style={{ width: "50%" }}
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
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" onClick={handleSubmit}>
          submit
        </Button>
      </div>
    </div>
  );
}
