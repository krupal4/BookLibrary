import React, { use, useEffect, useState } from "react";
import { Select, type InputRef } from "antd";
import { Repository } from "~/common/Repository";
import type CategoryModel from "~/models/CategoryModel";
import menu from "antd/es/menu/menu";

type SelectCategoriesProps = {
  onChangeSelected: (selectedIds: string[]) => void;
};
import { Divider, Input, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";

let index = 1;
const SelectCategories: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<CategoryModel[]    >([]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => { 
    Repository.instance.getCategories().then((data: CategoryModel[]) => {
        setItems(data);
        setIsLoading(false);
    });
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setItems([...items, {name: name || `New item ${index++}`, id: undefined}]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

if (isLoading) {
    return <div>Loading categories...</div>;
}

  return (
    <Select
      mode="multiple"
      onInputKeyDown={(e) => { e.stopPropagation(); }}
      style={{ width: 300 }}
      placeholder="Select categories"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      popupRender={(menu) => (
        <>
          {menu}
          {/* TODO: */}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter category name"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem} disabled={true}> 
              Add Category
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item.name, value: item.id! }))}
    />
  );
};

export default SelectCategories;
