"use client";
import { isEmpty } from "@/ultis/helpers";
import React, {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

type Props = {
  cols?: [] | any;
  draggable?: boolean;
  handleDragCols: (newCols: any) => {} | void;
  setDragOver?: any;
  dragOver?: any;
  classList?: any;
  selectable: boolean;
  handleChecked: ({ item, currentSelectedID, type, checked }: any) => {} | void;
  className?: string;
};

type RefFowardTypeHandle = {
  allChkboxRef: MutableRefObject<null>;
};

const TableHeader = forwardRef<RefFowardTypeHandle, Props>(
  (
    {
      cols,
      draggable = true,
      handleDragCols = () => {},
      dragOver,
      classList,
      selectable,
      handleChecked,
      className,
    }: Props,
    ref
  ) => {
    const allChkboxRef = useRef(null);
    const handleDragStart = (e: any) => {
      const { id } = e.target;
      const idx = cols.map((e: any) => e.title).indexOf(id);
      dragOver = id;
      e.dataTransfer.setData("colIdx", idx);
    };

    useImperativeHandle(ref, () => ({
      allChkboxRef,
    }));

    const handleDragOver = (e: any) => e.preventDefault();
    const handleDragEnter = (e: any) => {
      if (isEmpty(dragOver)) return;
      return e.target.classList.add(`${classList.thover}`);
    };
    const handleDragLeave = (e: any) => {
      return e.target.classList.remove(`${classList.thover}`);
    };

    const handleOnDrop = (e: any) => {
      const { id } = e.target;
      const droppedColIdx = cols.map((e: any) => e.title).indexOf(id);
      const draggedColIdx = e.dataTransfer.getData("colIdx");
      if (isEmpty(draggedColIdx))
        return e.target.classList.remove(`${classList.thover}`);
      const tempCols = [...cols];
      tempCols[draggedColIdx] = cols[droppedColIdx];
      tempCols[droppedColIdx] = cols[draggedColIdx];
      e.target.classList.remove(`${classList.thover}`);
      handleDragCols(tempCols);
      dragOver = "";
    };

    const handleRenderHeader = useMemo(() => {
      if (isEmpty(cols)) return;
      return cols?.map((item: any) => (
        <th
          className={item?.customThCss}
          drag-over={(item.title === dragOver).toString()}
          id={item?.title}
          key={item?.dataIndex}
          draggable={draggable}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {item?.title}
        </th>
      ));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cols]);

    const processingSelectData = (e: any) => {
      const isChecked = e.target.checked;
      return handleChecked({ type: "all", checked: isChecked });
    };

    return (
      <thead className={`${className}`}>
        <tr>
          {draggable && <th className="text-center p-1">#</th>}
          {selectable && (
            <th>
              <input
                ref={allChkboxRef}
                type="checkbox"
                onChange={processingSelectData}
              />
            </th>
          )}
          {handleRenderHeader}
        </tr>
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";

export default TableHeader;
