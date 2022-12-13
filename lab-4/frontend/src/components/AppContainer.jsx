import { connect } from 'react-redux';
import App from './App';
import { initializeAuth } from 'redux/modules/auth';

function mapStateToProps(state) {
  return {
    loggedUser: state.auth.loggedUser,
    isLoading: state.auth.isLoading
  };
}

function mapDispatchToProps(disptach) {
  return {
    initializeAuth: () => disptach(initializeAuth())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
