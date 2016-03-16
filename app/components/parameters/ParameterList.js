import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Column from '../Column';

export default class ParamterList extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired
  }

  render() {
    const { children, name } = this.props;
    return (
      <Column width={33} style={{ padding: '5px' }}>
        <Card className="parameter-list">
          <CardTitle title={name}/>
          <CardText>
            {children}
          </CardText>
        </Card>
      </Column>
     );
  }
}
