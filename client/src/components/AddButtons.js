import AddClientModal from "./AddClientModal";
import AddProjectModal from "./AddProjectModal";

export default function AddButtons() {
  return (
    <>
      <div className="addButtonsDiv">
        <AddProjectModal />
        <AddClientModal />
      </div>
    </>
  );
}
