import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProjectCard(props) {
  const {
    project: { id, name, status },
  } = props;

  return (
    <div style={{ width: "300px", height: "200px" }}>
      <Card
        sx={{
          minWidth: 200,
          height: "150px",
          backgroundColor: "#f2f2f2",
          boxShadow: "5px 5px lightgray",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }} variant="h5" gutterBottom>
            {name}
          </Typography>

          <Typography variant="body2">Status: {status}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <a href={`/project/${id}`} style={{ textDecoration: "none" }}>
            <Button size="small">View</Button>
          </a>
        </CardActions>
      </Card>
    </div>
  );
}
