import React, { Component } from 'react';

class Test extends Component {
  state = {
    conuter: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.conuter !== nextState.conuter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({});
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <di>
        <button onClick={this.onClick}>클릭</button>
      </di>
    );
  }
}

export default Test;
