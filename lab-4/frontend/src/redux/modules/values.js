import entryAPI from 'api/entryAPI';
import { logout } from './auth';
import { setEntries, addEntry } from './table';

const SELECT_R = 'web-lab4/values/SELECT_R';
const SELECT_X = 'web-lab4/values/SELECT_X';
const CHANGE_Y = 'web-lab4/values/CHANGE_Y';
const CLEAR_CURRENT = 'web-lab4/values/CLEAR_CURRENT';

const initialState = {
  rValues: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
  rCurrent: 4,
  xValues: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
  xCurrent: 1,
  yMin: -5,
  yMax: 3,
  xMin: -4,
  xMax: 4,
  yCurrent: undefined
};

export default function valuesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT_R:
      return Object.assign(
        {},
        state,
        {
          rCurrent: action.value
        }
      );
    case SELECT_X:
      return Object.assign(
        {},
        state,
        {
          xCurrent: action.value
        }
      );
    case CHANGE_Y:
      return Object.assign(
        {},
        state,
        {
          yCurrent: action.value
        }
      );
    case CLEAR_CURRENT:
      return Object.assign(
        {},
        state,
        {
          rCurrent: 1,
          xCurrent: 1,
          yCurrent: undefined
        }
      );
    default:
      return state;
  }
}

export function selectR(value) {
  return { type: SELECT_R, value };
}

export function selectX(value) {
  return { type: SELECT_X, value };
}

export function changeY(value) {
  return { type: CHANGE_Y, value };
}

export function clearCurrent() {
  return { type: CLEAR_CURRENT };
}

export const checkEntry = () => (dispatch, getState) => {
  entryAPI.checkEntry(
    getState().values.xCurrent,
    getState().values.yCurrent,
    getState().values.rCurrent,
    JSON.parse(localStorage.getItem('userWl4')).jwt)
    .then(response => {
      if (response.status === 200) {
        dispatch(addEntry(response.data));
      } else {
        alert(`Непредвиденный ответ ${response.status} от сервера!`);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        alert(`Непредвиденный ответ ${error.response.status} от сервера!`);
      }
    });;
}

export const clearEntries = () => (dispatch) => {
  entryAPI.clearEntries(JSON.parse(localStorage.getItem('userWl4')).jwt)
    .then(response => {
      if (response.status === 200) {
        dispatch(setEntries([]));
      } else {
        alert(`Непредвиденный ответ ${response.status} от сервера!`);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        alert(`Непредвиденный ответ ${error.response.status} от сервера!`);
      }
    });;
}
