import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useCreateSong } from "./useCreateSong";
import { useUpdateSong } from "./useUpdateSong";

function CreateSongForm({ songToUpdate = {}, id: updateId, onCloseModal }) {
  const { playlistId } = useParams();
  const [showForm, setShowForm] = useState(true);

  const { createSong, isCreating } = useCreateSong();
  const { isUpdating, updateSong } = useUpdateSong();

  const isWorking = isCreating || isUpdating;

  const { ...updateValue } = songToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { handleSubmit, formState, register, reset } = useForm({ defaultValues: isUpdateSession ? updateValue : {} });
  const { errors } = formState;

  if (!showForm) return null;

  function handleClose() {
    onCloseModal?.();
    setShowForm(false);
  }

  function onSubmit(data) {
    const url = typeof data.url === "string" ? data.url : data.url[0];

    if (isUpdateSession) {
      updateSong(
        { newSongData: { ...data, url }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
      return null;
    } else
      createSong(
        { ...data, url: url, toPlaylistId: Number(playlistId) },
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
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Song name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Artist" error={errors?.artist?.message}>
        <Input type="text" id="artist" {...register("artist", { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Duration" error={errors?.duration?.message}>
        <Input type="number" id="duration" {...register("duration", { required: "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow label="Song URL">
        <FileInput id="url" accept="audio/*" {...register("url", { required: isUpdateSession ? false : "This field is required" })} disabled={isWorking} />
      </FormRow>

      <FormRow>
        <button className="btn secondary medium" type="reset" onClick={handleClose}>
          Cancle
        </button>

        <button className="btn primary medium" disabled={isWorking}>
          {isUpdateSession ? "Edit song" : "Create new song"}
        </button>
      </FormRow>
    </Form>
  );
}

export default CreateSongForm;
