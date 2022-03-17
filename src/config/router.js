import { lazy } from "react";

const lazyLoader = (path) =>
  lazy(() =>
    import(/* webpackChunkName: "chunk-[request]" */ `../pages/${path}`)
  );

export const MENU = [
  {
    title: "demo exploration",
    key: "demo exploration",
    children: [
      {
        title: "Manual Recording",
        key: "Manual Recording",
        path: "/demo1",
        component: lazyLoader("demo1"),
      },
      {
        title: "Automatic Recording",
        key: "Automatic Recording",
        path: "/demo2",
        component: lazyLoader("demo2"),
      },
      {
        title: "Capture error",
        key: "Capture error",
        path: "/demo3",
        component: lazyLoader("demo3"),
      },
      {
        title: "Sampling Strategy",
        key: "Sampling Strategy",
        path: "/demo4",
        component: lazyLoader("demo4"),
      },
      {
        title: "Recording console",
        key: "Recording console",
        path: "/demo5",
        component: lazyLoader("demo5"),
      },
      {
        title: "Recording Video & Audio",
        key: "Recording Video & Audio",
        path: "/demo6",
        component: lazyLoader("demo6"),
      },
      {
        title: "Link Jump",
        key: "Link Jump",
        path: "/demo7",
        component: lazyLoader("demo7"),
      },
    ],
  },
  {
    title: "Log Management",
    key: "Log Management",
    children: [
      {
        title: "List List",
        key: "Log List",
        path: "/list",
        component: lazyLoader("list"),
      },
    ],
  },
];

export const ROUTE = (() => {
  const getTarget = ({ children, route }) => {
    let list = [];
    children.forEach((child) => {
      if (child.children) {
        list = [
          ...list,
          ...getTarget({ ...child, route: [...route, child.key] }),
        ];
      } else {
        list.push({ ...child, route: [...route, child.key] });
      }
    });
    return list;
  };
  return MENU.map((item) => getTarget({ ...item, route: [item.key] })).flat();
})();
