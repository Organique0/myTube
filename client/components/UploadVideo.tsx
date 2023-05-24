import { Button, Group, Modal, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import { ArrowBigUpLine } from "tabler-icons-react";

export default function UploadVideo() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="upload video"
        size={"xl"}
      >
        <Dropzone
          onDrop={(files) => {}}
          accept={[MIME_TYPES.mp4]}
          multiple={false}
        >
          <Group>
            <ArrowBigUpLine />
            <Text>Drag video here or click to find</Text>
          </Group>
        </Dropzone>
      </Modal>

      <Button onClick={() => setOpened(true)}>Upload video</Button>
    </>
  );
}
