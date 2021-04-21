import React, { useState } from 'react';
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './SelectComponent.css'
import {idContext} from './Fine.js'
import FormHelperText from '@material-ui/core/FormHelperText';  


const SelectComponent = (props) => {
  const [val,setVal] = useState("");

  const idCon = React.useContext(idContext)

  // console.log(idCon)

  const options = props.sort ? (props.options?.sort((a,b)=>{ return a.name.localeCompare(b.name)})) : (props.options)

  

React.useEffect(()=>{
  if(props.setId)
    props.setId(val)
},[val,props])
  

  const handleChange = (event) => {
    setVal(event.target.value);
    if(idCon)
    idCon?.setShowFineButton(false)
  };

  const minimalSelectClasses = useMinimalSelectStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon}/>
    )};

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null
  };


  return (
    <FormControl>
    
      <FormHelperText>{ props.Label}</FormHelperText>
      <Select
        disableUnderline
        classes={{ root: minimalSelectClasses.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={val}
        onChange={handleChange}
      > 
        {
          options?.map((option,index) => (
            <MenuItem value={option?.id} key={option?.id}>{option?.name}</MenuItem>
          ))
        }

      </Select>
    </FormControl>
  );
};


export default SelectComponent;