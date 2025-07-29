import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateSongForm from "./CreateSongForm";

function AddSong() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="song-form">
          <Button $variation="primary" size="medium">
            Add new Song
          </Button>
        </Modal.Open>

        <Modal.Window name="song-form">
          <CreateSongForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddSong;
