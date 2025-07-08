import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useCreatePlaylist } from "./useCreatePlaylist";
import toast from "react-hot-toast";

function CreatePlaylistForm({ onCloseModal }) {
  const { handleSubmit, formState, register, reset } = useForm();
  const { errors } = formState;

  const { createPlaylist, isCreating } = useCreatePlaylist();

  function onSubmit(data) {
    createPlaylist(
      { ...data },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    toast.error(errors.message);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Playlist name" error={errors?.name?.message}>
        <Input type="text" id="playlistName" {...register("playlistName", { required: "This field is required" })} disabled={isCreating} />
      </FormRow>

      <Button $variation="primary" size="medium">
        Create new playlist
      </Button>
    </Form>
  );
}

export default CreatePlaylistForm;
