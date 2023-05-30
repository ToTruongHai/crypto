"use client";
import { isBoolean, isEmpty } from "@/ultis/helpers";
import { useRef } from "react";

type FieldValue = {
  [name: string | number]: () => true;
};
type FieldData = object[] | boolean | void | any;

type CallBackType = (isValid?: boolean) => {} | void | undefined;

const useRefForm = () => {
  const formRef = useRef(null);
  const dataRef = useRef({} as any);

  // const setFieldsValue = (fieldValue?: FieldValue) =>
  //   (dataRef.current = {
  //     ...dataRef.current,
  //     ...fieldValue,
  //   });

  const setFieldsValue = (formData: any) => {
    const { current = {} as any } = formRef ?? {};
    const { current: dataC = {} as any } = dataRef ?? {};

    if (current === null) return;

    dataRef.current = {
      ...dataC,
      ...formData,
    };

    const _cForm = Object.keys(current?.elements) ?? [];
    _cForm?.forEach((e: any) => {
      const item = current.elements?.[e];

      if (!isEmpty(item?.name)) {
        const getDataByName = dataRef.current?.[item?.name];
        if (getDataByName === undefined) {
          const _getDataByName = formData?.[item?.name];
          return (item.value = _getDataByName ?? "");
        }
        return (item.value = getDataByName ?? "");
      }
    });
  };

  const getFieldsValue = (fieldData?: FieldData) => {
    const { current = {} as any } = formRef ?? {};
    const { current: dataC = {} as any } = dataRef ?? {};
    const isGetAll = isBoolean(fieldData) && fieldData === true;
    const isGetExist = isEmpty(fieldData);

    if (isGetAll) return dataC;
    if (isGetExist) {
      const _cForm = Object.keys(current?.elements) ?? [];
      const newData = {};
      _cForm?.forEach((e: any) => {
        const item = current.elements?.[e];
        if (!isEmpty(item?.name)) {
          Object.assign(newData, {
            [item.name]: item.value,
          });
        }
      });
      dataRef.current = {
        ...dataRef.current,
        ...newData,
      };
      return dataRef.current;
    }

    if (Array.isArray(fieldData))
      return fieldData?.map((fieldName: any) => {
        const findData = dataC?.[fieldName] ?? "";
        return {
          [fieldName as any]: findData,
        };
      });
  };

  const DisplayValidating = async () => {
    const { current = {} as any } = formRef ?? {};
    const data = Object.keys(current.elements) ?? [];
    const validData = await Promise.all(
      data?.map(async (e: any) => {
        const item = await current.elements?.[e];
        item.focus();
        item.blur();
        return "isHaveError" in Object.values(item.classList);
      })
    );

    const isValid = validData.every((e: any) => e === false);

    return isValid;
  };

  return [
    {
      formRef,
      dataRef,
      setFieldsValue,
      getFieldsValue,
      DisplayValidating,
      // setEditedFieldValue,
    },
  ];
};

export default useRefForm;
