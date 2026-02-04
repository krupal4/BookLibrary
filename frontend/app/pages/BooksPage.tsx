import type { FunctionComponent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookModel } from "../models/BookModel";
import { Input } from 'antd';
import { Button, FloatButton, List, Popconfirm } from "antd";

const { Search } = Input;

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CreateBook from "~/widgets/CreateBook";
import { useState } from "react";
import { Repository } from "~/common/Repository";

interface BooksPageProps { }

const BooksPage: FunctionComponent<BooksPageProps> = () => {
  const [isCreateBookOpen, setCreateBookOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookModel | null>(null);
  const queryClient = useQueryClient();
  const key = ["books"];

  const {
    data: books,
    error,
    isLoading,
  } = useQuery<BookModel[], Error>({
    queryKey: key,
    queryFn: () => Repository.instance.getBooks(),
  });

  const onCloseCreateBook = () => {
    setCreateBookOpen(false);
    setEditingBook(null);
    queryClient.invalidateQueries({ queryKey: key });
  };

  const onEditBook = (book: BookModel) => {
    setEditingBook(book);
    setCreateBookOpen(true);
  };

  const onClickCopyBook = async (book: BookModel) => {
    const copiedBook = structuredClone(book);
    copiedBook.id = null;
    copiedBook.title = `Copy of ${book.id} ~ ${book.title}`;
    await Repository.instance.saveBook(copiedBook);
    queryClient.invalidateQueries({ queryKey: key });
  }

  const onDeleteBook = async (book: BookModel) => {
    await Repository.instance.deleteBook(book.id!);
    queryClient.invalidateQueries({ queryKey: key });
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
        <>
        
    {/* <Search placeholder="Search book by title or author name"
      enterButton="Search"
      size="large"
      loading={loadingSearchData}
      onSearch={(searchValue) => onSearchBooks(searchValue)}/> */}

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
                <Popconfirm
                  title={`Delete book ${item.title}?`}
                  description="This action cannot be undone"
                  onConfirm={() => onDeleteBook(item)}
                  okText="Delete"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    type="text"
                  >
                    Delete
                  </Button>
                </Popconfirm>,
                <Button
                  onClick={() => onClickCopyBook(item)}
                >
                  Copy
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </div>
                }
                description={
                  <>
                    <div
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </div>
                    <div style={{ color: "#888", marginTop: "4px" }}>
                      Author: {item.authorName}
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
        
        </>
      )}

      {isCreateBookOpen && (
        <CreateBook
          open={isCreateBookOpen}
          editMode={editingBook !== null}
          book={editingBook}
          onClose={() => onCloseCreateBook()}
        />
      )}

      <FloatButton
        type="primary"
        className="create-floating-button"
        content="Create Book"
        shape="square"
        onClick={() => setCreateBookOpen(true)}
      >
      </FloatButton>
    </>
  );
};

export default BooksPage;