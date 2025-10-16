import Modal from "../../ui/Modal";
import CreateSongForm from "./CreateSongForm";

function AddSong() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="song-form">
          <button className="btn primary small">Add new Song</button>
        </Modal.Open>

        <Modal.Window name="song-form">
          <CreateSongForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddSong;
