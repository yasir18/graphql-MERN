import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { GET_PROJECT, GET_PROJECTS } from "../queries/ProjectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { useQuery, useMutation } from "@apollo/client";
import spinner from "../assets/spinner.gif";
import { useNavigate } from "react-router-dom";
import EditProject from "../components/EditProject";

export default function Project() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
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

  const deleteProjectCB = () => {
    deleteProject(id);
  };

  return (
    <>
      <Header />
      <div className="projectCard">
        <p style={{ textAlign: "right", paddingRight: "10%" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            {" "}
            <Button>Back</Button>
          </a>
        </p>
        <h3>{data.project.name}</h3>
        <p>{data.project.description}</p>
        <h4> Project Status : {data.project.status}</h4>

        <div>
          <p>
            <b>Client Information</b>
          </p>
          <div className="classInfo">
            <p>
              <PersonIcon /> {data.project.client.name}
            </p>
            <p>
              <EmailIcon /> {data.project.client.email}
            </p>
            <p>
              <PhoneIcon /> {data.project.client.phone}
            </p>
          </div>
          <EditProject project={data.project} />
          <Button
            variant="contained"
            color="error"
            style={{ margin: "10px" }}
            onClick={deleteProjectCB}
          >
            Delete Project
          </Button>
        </div>
      </div>
    </>
  );
}
