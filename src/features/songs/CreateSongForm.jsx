import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";

function CreateSongForm() {
  const { handleSubmit, formState } = useForm();
  const { errors } = formState;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Song name" error={errors?.name?.message}>
        <Input type="text" id="name" />
      </FormRow>

      <FormRow label="Artist" error={errors?.artist?.message}>
        <Input type="text" id="artist" />
      </FormRow>

      <FormRow label="Song URL">
        <FileInput id="url" />
      </FormRow>
    </Form>
  );
}

export default CreateSongForm;
