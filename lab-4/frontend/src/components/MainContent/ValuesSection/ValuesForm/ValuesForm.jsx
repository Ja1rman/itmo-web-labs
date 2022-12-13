import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ValuesForm.module.css';
import ControlButton from 'components/common/ControlButton/ControlButton';
import InfoMessage from './InfoMessage/InfoMessage';
import TextField from './TextField/TextField';
import SelectField from './SelectField/SelectField'

const CHECK = 'check';
const CLEAR = 'clear';

const validateForm = values => {
  let isNumeric = num => {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  if (!isNumeric(values.rCurrent) || !values.rValues.includes(parseFloat(values.rCurrent))) {
    return 'Выберите значение R!';
  }

  if (!isNumeric(values.xCurrent) || values.xCurrent < values.xMin || values.xCurrent > values.xMax ) {
    return 'Выберите значение X!';
  }

  if (!isNumeric(values.yCurrent) || values.yCurrent < values.yMin || values.yCurrent > values.yMax) {
    return `Введите значение Y от ${values.yMin} до ${values.yMax}!`;
  }

  return '';
}

const ValuesForm = (props) => {
  const [infoMessage, setInfoMessage] = useState('Введите координаты точки');
  const [action, setAction] = useState(undefined);

  const handleCheckCLick = () => {
    setAction(CHECK);
  }

  const handleClearCLick = () => {
    setAction(CLEAR);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (action) {
      case CHECK:
        let message = validateForm(props);
        if (message === '') {
          props.checkEntry();
        }
        break;
      case CLEAR:
        props.clearEntries();
        break;
      default:
        alert('Неверный Action в ValuesForm!');
    }
  }

  useEffect(() => {
    let message = validateForm(props);
    setInfoMessage(message === '' ? 'Введите координаты точки' : message);
  }, [props]);

  return (
    <form styleName="values-form" onSubmit={(e) => handleSubmit(e)}>
      <InfoMessage message={infoMessage} />

      <div styleName="values-form__container">
        <label styleName="values-form__label" className="theme">
          <span className="values-form__label-text">
            R
          </span>
        </label>
        <div styleName="values-form__control">
          <SelectField value={props.rCurrent} selectValue={props.selectR}/>
        </div>
      </div>

      <div styleName="values-form__container">
        <label styleName="values-form__label" className="theme">
          <span className="values-form__label-text">
            X
          </span>
        </label>
        <div styleName="values-form__control">
          <SelectField value={props.xCurrent} selectValue={props.selectX}/>
        </div>
      </div>

      <div styleName="values-form__container">
        <label styleName="values-form__label" htmlFor="y-text" className="theme">
          <span className="values-form__label-text">
            Y
          </span>
        </label>
        <div styleName="values-form__control">
          <TextField value={props.yCurrent} changeValue={props.changeY} maxLength="7" placeholder="Число от -5 до 3" />
        </div>
      </div>

      <div styleName="values-form__control-container">
        <ControlButton text="Проверить" action={handleCheckCLick} />
        <ControlButton text="Очистить" action={handleClearCLick} />
      </div>
    </form>
  );
}

export default CSSModules(ValuesForm, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });