import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCreatePlaylist } from "./useCreatePlaylist";
import { useUpdatePlaylist } from "./useUpdatePlaylist";

function CreatePlaylistForm({ playlistToUpdate = {}, id: updateId, onCloseModal }) {
  const { handleSubmit, formState, register, reset } = useForm();
  const { errors } = formState;

  const { createPlaylist, isCreating } = useCreatePlaylist();
  const { updatePlaylist, isUpdating } = useUpdatePlaylist();

  const isWorking = isCreating || isUpdating;
  const { ...updateValue } = playlistToUpdate;
  const isUpdateSession = Boolean(updateId);

  function onSubmit(data) {
    if (isUpdateSession) {
      updatePlaylist(
        { newPlaylistData: { ...data }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
      return null;
    } else
      createPlaylist(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }

  function onError(errors) {
    toast.error(errors.message);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Playlist name" error={errors?.name?.message}>
        <Input type="text" id="playlistName" {...register("playlistName", { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <button className="btn primary medium">{isUpdateSession ? "Edit playlist" : "Create new playlist"}</button>
    </Form>
  );
}

export default CreatePlaylistForm;
