import axios from "axios";
import { ChangeEvent } from "react";

async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
  const formData = new FormData(e.target);
  const file = formData.get("file");

  if (!file) {
    return null;
  }

  // @ts-ignore
  const fileType = encodeURIComponent(file.type);
  const { data } = await axios.get(`/api/media?fileType=${fileType}`);
  const { uploadUrl, key } = data;
  console.log("data: ", data);
  await axios.put(uploadUrl, file);
  return key;
}

function Upload() {
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const key = await uploadToS3(e);
    console.log(key)
  }

  return (
    <>
      <p>Select file to upload</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpeg image/png" name="file" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default Upload;
