import React, { useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import SelectCategories from "./SelectCategories";
import TextArea from "antd/es/input/TextArea";
import { Repository } from "~/common/Repository";

type CreateBookProps = {
  open: boolean;
  onClose: () => void;
  editMode: boolean;
};

const CreateBook: React.FC<CreateBookProps> = ({ open, onClose, editMode }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishedOn, setPublishedOn] = useState<Date | null>(null);

  const handleOk = async () => {
    setConfirmLoading(true);
    await Repository.instance.saveBook({
      id: null,
      title,
      description,
      authorName,
      publishedOn,
      createdAt: Date(),
    });
    onClose();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        style={{
          minHeight: "80vh",
        }}
        title={editMode ? "Edit Book" : "Create New Book"}
        okText={editMode ? "Update" : "Create"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* Title */}
        <Input
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ height: 16 }} />

        {/* Description */}
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter book description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />

        <div style={{ height: 16 }} />

        {/* Select Categories */}
        <SelectCategories />

        <div style={{ height: 16 }} />

        {/* Author Name */}
        <Input
          placeholder="Enter author name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <div style={{ height: 16 }} />

        {/* Published at date */}
        <DatePicker
          placeholder="Enter published at date"
          value={publishedOn}
          onChange={(e) => setPublishedOn(e)}
          type="date"
        />
      </Modal>
    </>
  );
};

export default CreateBook;
