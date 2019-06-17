import React from 'react';

export type StringChildren = {
  children: string
}

export type QuoteProps = {
  children: React.ReactElement<HTMLQuoteElement>
}

export type ImgProps = {
  src: string,
  alt: string,
  title?: string,
  children: undefined
}
export type AProps = {
  href: string,
} & StringChildren

export type MdxProps = {
  components: {
    h3: React.SFC<StringChildren>,
    blockquote: React.SFC<QuoteProps>,
    em: React.SFC<StringChildren>,
    img: React.SFC<ImgProps>,
    a: React.SFC<AProps>,
    inlineCode: React.SFC<StringChildren>,
  }
}