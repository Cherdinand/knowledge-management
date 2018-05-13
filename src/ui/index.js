import React from 'react';

const H3 = props => <h3 id={`/${props.children}`} style={{ color: 'tomato' }} {...props} />;

const InlineCode = props => <code id="codes" style={{ color: 'purple' }} {...props} />;

const Code = props => <code id="codes" style={{ fontWeight: 600 }} {...props} />;

export {
  H3,
  InlineCode,
  Code,
}