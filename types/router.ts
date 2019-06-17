import { MdxProps } from '@/types/ui';

export type RouteType = {
  path: string,
  menuName: string,
  anchors?: string[],
  component?: (props: MdxProps) => JSX.Element,
  redirectTo?: boolean,
  container?: React.ComponentClass,
}

export type RouterType = {
  es6: RouteType[],
  css: RouteType[],
  react: RouteType[],
  webpack: RouteType[],
  others: RouteType[],
  cherComponents: RouteType[],
  framework: RouteType[],
  movies: RouteType[],
  read: RouteType[],
  games: RouteType[],
}