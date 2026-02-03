// import React, { useEffect, useState } from "react";
// import { Avatar, Button, List, Skeleton } from "antd";
// import type { BookModel as BM } from "~/models/BookModel";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { Repository } from "~/common/Repository";

// type BookModel = BM & {
//   loading: boolean;
// };

// const PAGE_SIZE = 3;

// const BookList: React.FC = () => {
//   // const [initLoading, setInitLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   // const [data, setData] = useState<BookModel[]>([]);
//   // const [list, setList] = useState<BookModel[]>([]);
//   const [pageIndex, setPageIndex] = useState(0);


//     const queryClient = useQueryClient();
//   const key = ["books"];
  
//   const {
//     data,
//     error,
//     isLoading,
//   } = useQuery<BookModel[], Error>({
//     queryKey: key,
//     queryFn: fetchBooks,
//     keepPre
//   });

//   const fetchBooks = async (): Promise<BookModel> => {
//     return (await Repository.instance.getBooks(pageIndex)).map((book) => {
//       ...book,
//       loading: false
//     });
//   }


//   // const onLoadMore = () => {
//   //   setLoading(true);
//   //   setList(
//   //     data.concat(
//   //       Array.from({ length: PAGE_SIZE }).map(() => ({
//   //         loading: true,
//   //         authorName: "",
//   //         createdAt: Date(),
//   //         description: "",
//   //         id: null,
//   //         publishedOn: null,
//   //         title: "",
//   //       })),
//   //     ),
//   //   );
//   //   const nextPage = page + 1;
//   //   setPage(nextPage);
//   //   fetchData(nextPage).then((res) => {
//   //     const results = Array.isArray(res) ? res : [];
//   //     const newData = data.concat(results);
//   //     setData(newData);
//   //     setList(newData);
//   //     setLoading(false);
//   //     // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//   //     // In real scene, you can using public method of react-virtualized:
//   //     // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
//   //     window.dispatchEvent(new Event("resize"));
//   //   });
//   // };

//   const loadMore =
//     !initLoading && !loading ? (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: 12,
//           height: 32,
//           lineHeight: "32px",
//         }}
//       >
//         <Button onClick={onLoadMore}>Load More</Button>
//       </div>
//     ) : null;

//   return (
//     <List
//       className="demo-loadmore-list"
//       loading={initLoading}
//       itemLayout="horizontal"
//       loadMore={loadMore}
//       dataSource={list}
//       renderItem={(item) => (
//         <List.Item
//           actions={[
//             <a key="list-loadmore-edit">edit</a>,
//             <a key="list-loadmore-more">more</a>,
//           ]}
//         >
//           <Skeleton avatar title={false} loading={item.loading} active>
//             <List.Item.Meta
//               title={item.title}
//               description={item.description}
//             />
//           </Skeleton>
//         </List.Item>
//       )}
//     />
//   );
// };

// export default BookList;
