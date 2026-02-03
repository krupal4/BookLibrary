import type { FunctionComponent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "~/common/ApiClient";
import type { BookModel } from "../models/BookModel";
import { Button, Flex, FloatButton, List, Skeleton } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import CreateBook from "~/widgets/CreateBook";
import { useState } from "react";
import { Repository } from "~/common/Repository";

interface BooksPageProps {}

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const [isCreateBookOpen, setCreateBookOpen] = useState(false);
  const queryClient = useQueryClient();
  const key = ["books"];

  const {
    data: books,
    error,
    isLoading,
  } = useQuery<BookModel[], Error>({
    queryKey: key,
    queryFn: () => Repository.instance.getBooks(0),
  });

  const onCloseCreateBook = () => {
    setCreateBookOpen(false);
    queryClient.invalidateQueries({ queryKey: key });
  };

  const onEditBook = (book: BookModel) => {};

  const onDeleteBook = (book: BookModel) => {
//     <Popconfirm
//   title="Delete book?"
//   description="This action cannot be undone"
//   onConfirm={() => {
//     // Repository.(item)
//   }
// >
//   <Button danger type="text">Delete</Button>
// </Popconfirm>
  };

  if (isLoading) {
    return <div>Fetching books...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <>
      {!books || books.length === 0 ? (
        <div>No books available.</div>
      ) : (
        <List
          className=""
          dataSource={books}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "12px",
              }}
              actions={[
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={() => onEditBook(item)}
                >
                  Edit
                </Button>,
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  type="text"
                  onClick={() => onDeleteBook(item)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={
                  <>
                    <div>{item.description}</div>
                    <div style={{ color: "#888" }}>
                      Author: {item.authorName}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}

      {isCreateBookOpen && (
        <CreateBook
          open={isCreateBookOpen}
          editMode={false}
          onClose={() => onCloseCreateBook()}
        />
      )}

      <FloatButton
        type="primary"
        className="create-floating-button"
        content="Create Book"
        // icon={<SearchOutlined />}TODO: Change icon
        onClick={() => setCreateBookOpen(true)}
      />
    </>
  );
};

export default BooksPage;
