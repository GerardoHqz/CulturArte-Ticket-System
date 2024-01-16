import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { AiOutlineCalendar } from "react-icons/ai";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../../assets/DatePicker.css";
dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  // No se pueden seleccionar días anteriores a hoy y hoy
  return current && current < dayjs().endOf("day");
};

const onChange = (date, dateString) => {
  console.log(dateString);
  localStorage.setItem("EventDate", dateString)
};

function DatePickerComponent(params) {
  const dateFormat = "YYYY/MM/DD";
  return (
    <div class="w-full">
      <DatePicker
        onChange={onChange}
        format="YYYY-MM-DD"
        disabledDate={disabledDate}
        defaultValue={dayjs(params.date, dateFormat)}
        suffixIcon={<AiOutlineCalendar size={28} color={"#9d9d9d"} />}
        style={{ width: "14vw" }}
      />
    </div>
  );
}

export default DatePickerComponent;
