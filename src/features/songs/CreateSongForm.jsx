import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useCreateSong } from "./useCreateSong";
import toast from "react-hot-toast";

function CreateSongForm() {
  const { handleSubmit, formState, register, reset } = useForm();
  const { errors } = formState;

  const { createSong, isCreating } = useCreateSong();

  function onSubmit(data) {
    const url = typeof data.url === "string" ? data.url : data.url[0];

    createSong(
      { ...data, url: url },
      {
        onSuccess: () => {
          reset();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  function onError(errors) {
    toast.error(errors.message);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Song name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Artist" error={errors?.artist?.message}>
        <Input type="text" id="artist" {...register("artist", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Duration" error={errors?.duration?.message}>
        <Input type="number" id="duration" {...register("duration", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Song URL">
        <FileInput id="url" accept="audio/*" {...register("url", { required: "This field is required" })} />
      </FormRow>

      <Button $variation="primary" size="medium">
        Create new song
      </Button>
    </Form>
  );
}

export default CreateSongForm;
