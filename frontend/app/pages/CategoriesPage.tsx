import React, { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Card, Input, List, message, Space } from "antd";
import type { GetProps } from "antd";
import type CategoryModel from "~/models/CategoryModel";
import { Repository } from "~/common/Repository";

const SortableListItem: React.FC<
  GetProps<typeof List.Item> & { itemKey: number }
> = (props) => {
  const { itemKey, style, ...rest } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemKey,
  });

  const listStyle: React.CSSProperties = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <List.Item
      {...rest}
      ref={setNodeRef}
      style={listStyle}
      {...attributes}
      {...listeners}
    />
  );
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingCrateC, setIsLoadingCreateC] = useState<boolean>(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over) {
      return;
    }
    if (active.id !== over.id) {
      setCategories((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  useEffect(() => {
    Repository.instance.getCategories().then((data: CategoryModel[]) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  const onClickCreateCategory = () => {
    if (categoryName.trim() === "") {
      message.error("Category name cannot be empty!");
      return;
    }
    setIsLoadingCreateC(true);
    Repository.instance
      .saveCategory({ name: categoryName, id: undefined })
      .then(() => {
        setIsLoadingCreateC(false);
        message.success("Category Created!");
        setCategoryName("");

        setIsLoading(true);
        Repository.instance.getCategories().then((data: CategoryModel[]) => {
          setCategories(data);
          setIsLoading(false);
        });
      });
  };

  return (
    <>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          disabled={isLoadingCrateC}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
          value={categoryName}
        />
        <Button
          type="primary"
          onClick={onClickCreateCategory}
          disabled={isLoadingCrateC}
        >
          {isLoadingCrateC ? "Creating..." : "Create"}
        </Button>
      </Space.Compact>
      {isLoading ? (
        <div>Loading categories...</div>
      ) : (
        <>
          <div style={{ padding: "8px" }}></div>
          <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            id="list-grid-drag-sorting"
          >
            <SortableContext items={categories.map((item) => item.id!)}>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={categories}
                renderItem={(item) => (
                  <SortableListItem key={item.id} itemKey={item.id!}>
                    <Card>{item.name}</Card>
                  </SortableListItem>
                )}
              />
            </SortableContext>
          </DndContext>
        </>
      )}
    </>
  );
};

export default CategoriesPage;
