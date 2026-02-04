import React, { useState, useEffect } from "react";
import { DatePicker, Input, Modal, Form } from "antd";
import SelectCategories from "./SelectCategories";
import TextArea from "antd/es/input/TextArea";
import { Repository } from "~/common/Repository";
import type { BookModel } from "~/models/BookModel";
import dayjs, { type Dayjs } from "dayjs";
import type CategoryModel from "~/models/CategoryModel";

type CreateBookProps = {
  open: boolean;
  onClose: () => void;
  editMode: boolean;
  book?: BookModel | null;
};

const CreateBook: React.FC<CreateBookProps> = ({ open, onClose, editMode, book }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishedOn, setPublishedOn] = useState<Dayjs | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    if (editMode && book) {
      setTitle(book.title || "");
      setDescription(book.description || "");
      setAuthorName(book.authorName || "");
      setSelectedCategories(book.categories);
      setPublishedOn(book.publishedOn ? dayjs(book.publishedOn) : null);
    } else {
      setTitle("");
      setDescription("");
      setAuthorName("");
      setPublishedOn(null);
    }
  }, [editMode, book]);

  const handleOk = async () => {
    setConfirmLoading(true);
    await Repository.instance.saveBook({
      id: editMode && book?.id ? book?.id : null,
      title,
      description,
      authorName,
      categories: selectedCategories,
      publishedOn: publishedOn ? publishedOn.toDate() : null,
      createdAt: null,
    });
    onClose();
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={editMode ? "Edit Book" : "Create New Book"}
      okText={editMode ? "Update" : "Create"}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            placeholder="Enter book title"
            maxLength={255}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea
            value={description}
            maxLength={1023}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Form.Item label="Categories" >

        <SelectCategories 
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
  </Form.Item>

        <Form.Item label="Author Name">
          <Input
            placeholder="Enter author name"
            maxLength={255}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Published Date">
          <DatePicker
            placeholder="Select published date"
            value={publishedOn}
            onChange={(date) => setPublishedOn(date)}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBook;