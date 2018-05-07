import React, {Component} from 'react';
import Class from 'markdown/class';
import {Code, H3, InlineCode} from "../ui";

export default class Class extends Component {
  render() {
    return (
      <Class
        components={{
          h3: H3,
          code: Code,
          inlineCode: InlineCode
        }}
      >
      </Class>
    )
  }
}
