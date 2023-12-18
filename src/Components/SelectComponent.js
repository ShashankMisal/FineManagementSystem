import React, { useState } from "react";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./SelectComponent.css";
import FormHelperText from "@material-ui/core/FormHelperText";

const SelectComponent = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const options =
    props.sort === "name"
      ? props.options?.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      : props.options.sort(
        (a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()
      );

  React.useEffect(() => {
    if (props.setId) props.setId(selectedValue);
  }, [selectedValue, props]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (props.setShowFineButton) 
     return props?.setShowFineButton(false);
  };

  const minimalSelectClasses = useMinimalSelectStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  return (
    <FormControl>
      <FormHelperText>{props.Label}</FormHelperText>
      <Select
        disableUnderline
        classes={{ root: minimalSelectClasses.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={selectedValue}
        onChange={handleChange}
      >
        {options?.map((option, index) => (
          <MenuItem value={option?.id} key={option?.id}>
            {option?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
