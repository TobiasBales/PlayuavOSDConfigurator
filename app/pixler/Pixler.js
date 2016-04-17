import React, { Component, PropTypes } from 'react';
import { setPixel } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from './Editor';
import Column from '../components/Column';
import Output from './Output';

class Pixler extends Component {
  static propTypes = {
    setPixel: PropTypes.func.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    wide: PropTypes.bool.isRequired,
  }

  render() {
    const { outline, shape, wide } = this.props;
    return (
      <div>
        <Column width={50}>
          <Editor setPixel={this.props.setPixel} outline={outline} shape={shape} wide={wide} />
        </Column>
        <Column width={30}>
          <Output outline={outline} shape={shape} />
        </Column>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.pixler.toJS();
}

function mapDispatchersToProps(dispatch) {
  return bindActionCreators({ setPixel }, dispatch);
}

export default connect(mapStateToProps, mapDispatchersToProps)(Pixler);
