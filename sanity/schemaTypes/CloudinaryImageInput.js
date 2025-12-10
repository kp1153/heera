import { useCallback, useState } from "react";
import { Stack, Button, Card, Text, Spinner, Flex } from "@sanity/ui";
import { set, unset } from "sanity";
import { TrashIcon } from "@sanity/icons";

export default function CloudinaryImageInput(props) {
  const { onChange, value } = props;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // value string ya object ho sakta hai
  const imageUrl = typeof value === "string" ? value : value?.url;

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "heeralal");
        formData.append("folder", "sanity-images");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dbwcrpdtd/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(set(data.secure_url));
      } catch (err) {
        setError("अपलोड विफल रहा। पुनः प्रयास करें।");
        console.error("Cloudinary upload error:", err);
      } finally {
        setUploading(false);
        event.target.value = "";
      }
    },
    [onChange]
  );

  const handleDelete = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  return (
    <Stack space={3}>
      {imageUrl && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "4px",
              }}
            />
            <Text size={1} muted>
              URL: {imageUrl}
            </Text>
            <Flex gap={2}>
              <Button
                as="label"
                mode="ghost"
                text="नई तस्वीर चुनें"
                tone="primary"
                disabled={uploading}
                style={{ flex: 1 }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  disabled={uploading}
                />
              </Button>
              <Button
                mode="ghost"
                text="डिलीट करें"
                tone="critical"
                icon={TrashIcon}
                onClick={handleDelete}
                disabled={uploading}
              />
            </Flex>
          </Stack>
        </Card>
      )}

      {!imageUrl && (
        <Button
          as="label"
          mode="ghost"
          text={uploading ? "अपलोड हो रहा है..." : "तस्वीर चुनें"}
          tone="primary"
          disabled={uploading}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </Button>
      )}

      {uploading && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={2}>
            <Spinner />
            <Text size={1}>Cloudinary पर अपलोड हो रहा है...</Text>
          </Stack>
        </Card>
      )}

      {error && (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}
    </Stack>
  );
}
