import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './SelectField.module.css';

const SelectField = (props) => {
  return (
    <select styleName="button-list" value={props.value}
            onChange={(e) => props.selectValue(e.target.value)}>
      <option value="-4">-4</option>
      <option value="-3">-3</option>
      <option value="-2">-2</option>
      <option value="-1">-1</option>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  );
}

export default CSSModules(SelectField, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
