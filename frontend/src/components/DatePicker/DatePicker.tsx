import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import { IoCalendarNumberOutline } from "react-icons/io5";

interface ICustomDate {
  onDateChange?: Function;
  icon?: string;
  width?: string;
}

const CustomDatePicker: React.FC<ICustomDate> = ({
  onDateChange,
  icon,
  width,
}) => {
  const now = new Date();
  const [date, setDate] = useState(now);

  const handleChange = (val: Date) => {
    setDate(val);
    onDateChange?.(date);
  };

  return (
    <div className={styles.container} style={{ width }}>
      {icon ? (
        <img src={icon} alt="" />
      ) : (
        <IoCalendarNumberOutline color="#7D7D7D" className={styles.cal} />
      )}
      <DatePicker
        selected={date}
        onChange={(val: Date) => handleChange(val)}
        placeholderText={new Date().toDateString()}
        dropdownMode="select"
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
      />
    </div>
  );
};

export default CustomDatePicker;
