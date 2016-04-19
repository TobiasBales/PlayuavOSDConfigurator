import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

export default function ParamterList(props) {
  const { children, name } = props;
  const contentStyle = { padding: 0 };
  return (
    <div className="parameter-list">
      <Card>
        <CardTitle title={name} />
        <CardText style={contentStyle}>
          {children}
        </CardText>
      </Card>
    </div>
   );
}

ParamterList.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
};
