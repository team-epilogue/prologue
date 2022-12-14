import { useAppSelector } from "app/hooks";
import { Layout } from "react-grid-layout";
import {
  ComponentCheckConfig,
  ComponentConfig,
  selectUserCheckList,
  selectUserComponentLayoutList,
  selectUserComponentList,
} from "slices/settingSlice";

export interface defaultLayoutConfig {
  id: number;
  layout: Layout[];
  components: ComponentConfig[];
  checkList: ComponentCheckConfig;
  struct?: string;
}

interface layoutObjectConfig {
  a: Layout[];
  b: Layout[];
  c: Layout[];
}

export const sortJSON = (data: any) => {
  return data.sort(function (a: any, b: any) {
    const x = a["y"];
    const y = b["y"];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const DefaultLayoutStyles = () => {
  const custLayout = useAppSelector(selectUserComponentLayoutList);
  const custList = useAppSelector(selectUserComponentList);
  const custCheckList = useAppSelector(selectUserCheckList);
  // const [passComponents, setPassComponent] = useState("");

  const sortLayout = () => {
    const layoutObject: layoutObjectConfig = {
      a: [],
      b: [],
      c: [],
    };
    for (let i = 0; i < custLayout.length; i++) {
      switch (custLayout[i].x) {
        case 0:
          layoutObject.a.push(custLayout[i]);
          break;
        case 1:
          layoutObject.b.push(custLayout[i]);
          break;
        default:
          layoutObject.c.push(custLayout[i]);
      }
    }
    const sortedLayoutObject: any = new Object();
    sortedLayoutObject.a = sortJSON(layoutObject.a);
    sortedLayoutObject.b = sortJSON(layoutObject.b);
    sortedLayoutObject.c = sortJSON(layoutObject.c);
    return sortedLayoutObject;
  };

  const createDiv = () => {
    const divRowString = `<div className="display-row">`;
    const divColString = `<div className="display-column">`;
    const divClose = `</div>`;
    let tmpPassComponents = divRowString;

    const sortedLayoutObject = sortLayout();

    for (const idx in sortedLayoutObject) {
      if (sortedLayoutObject[idx].length != 0) {
        tmpPassComponents += divColString;
        for (let i = 0; i < sortedLayoutObject[idx].length; i++) {
          switch (sortedLayoutObject[idx][i].i) {
            case "????????? ??????":
              tmpPassComponents += "<Logo/>";
              break;
            case "?????????":
              tmpPassComponents += "<Profile/>";
              break;
            case "????????????":
              tmpPassComponents += "<Category/>";
              break;
            case "?????????":
              tmpPassComponents += "<Header/>";
              break;
            case "?????????":
              tmpPassComponents += "<Title/>";
              break;
            case "??? ??????":
              tmpPassComponents += "<Contents/>";
              break;
          }
        }
        tmpPassComponents += divClose; // col div close
      }
    }
    tmpPassComponents += divClose; // row div close

    return tmpPassComponents;
  };

  const DefaultLayoutList: defaultLayoutConfig[] = [
    {
      // ????????? ?????? ??????
      id: 0,
      layout: custLayout,
      components: custList,
      checkList: custCheckList,
      struct: createDiv(),
    },
    {
      id: 1,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "?????????", x: 0, y: 1, w: 5, h: 3, static: true },
        { i: "????????????", x: 0, y: 4, w: 1, h: 4 },
        { i: "??? ??????", x: 1, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "page" },
        { key: "?????????", id: "title" },
        { key: "????????????", id: "category" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        page: true,
        title: true,
        category: true,
        contents: true,
        profile: false,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <Title />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <Contents />
          <Category />
        </div>
      </div>`,
    },
    {
      id: 2,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "?????????", x: 0, y: 1, w: 5, h: 3, static: true },
        { i: "????????????", x: 4, y: 4, w: 1, h: 4 },
        { i: "??? ??????", x: 0, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "page" },
        { key: "?????????", id: "title" },
        { key: "????????????", id: "category" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        page: true,
        category: true,
        title: true,
        contents: true,
        profile: false,
      },

      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <Title />
      </div>
      <div className='display-row'>
        <div className='display-grid-r'>
          <Contents />
          <Category />
        </div>
      </div>`,
    },
    {
      id: 3,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "????????????", x: 0, y: 1, w: 1, h: 7 },
        { i: "?????????", x: 1, y: 1, w: 4, h: 3, static: true },
        { i: "??? ??????", x: 1, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "page" },
        { key: "????????????", id: "category" },
        { key: "?????????", id: "title" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        page: true,
        category: true,
        title: true,
        contents: true,
        profile: false,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <Category />
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
        </div>
      </div>`,
    },
    {
      id: 4,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "????????????", x: 4, y: 1, w: 1, h: 7 },
        { i: "?????????", x: 0, y: 1, w: 4, h: 3, static: true },
        { i: "??? ??????", x: 0, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "page" },
        { key: "????????????", id: "category" },
        { key: "?????????", id: "title" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        page: true,
        category: true,
        title: true,
        contents: true,
        profile: false,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div><div className='display-row'>
        <div className='display-grid-r'>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
          <Category />
        </div>
      </div>`,
    },
    {
      id: 5,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "?????????", x: 0, y: 1, w: 1, h: 2 },
        { i: "????????????", x: 0, y: 3, w: 1, h: 5 },
        { i: "?????????", x: 1, y: 1, w: 4, h: 3, static: true },
        { i: "??? ??????", x: 1, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "page" },
        { key: "?????????", id: "profile" },
        { key: "????????????", id: "category" },
        { key: "?????????", id: "title" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        profile: true,
        category: true,
        title: true,
        contents: true,
        page: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <div className='display-column'>
            <Profile />
            <Category />
          </div>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
        </div>
      </div>`,
    },
    {
      id: 6,
      layout: [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1, static: true },
        { i: "?????????", x: 4, y: 1, w: 1, h: 2 },
        { i: "????????????", x: 4, y: 3, w: 1, h: 5 },
        { i: "?????????", x: 0, y: 1, w: 4, h: 3, static: true },
        { i: "??? ??????", x: 0, y: 4, w: 4, h: 4, static: true },
      ],
      components: [
        { key: "????????? ??????", id: "logo" },
        { key: "?????????", id: "profile" },
        { key: "?????????", id: "page" },
        { key: "????????????", id: "category" },
        { key: "?????????", id: "title" },
        { key: "??? ??????", id: "contents" },
      ],
      checkList: {
        logo: true,
        page: true,
        profile: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-r'>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
          <div className='display-column'>
            <Profile />
            <Category />
          </div>
        </div>
      </div>`,
    },
  ];

  return DefaultLayoutList;
};

export default DefaultLayoutStyles;

/* [
        { i: "????????? ??????", x: 0, y: 0, w: 1, h: 1 },
        { i: "?????????", x: 0, y: 1, w: 1, h: 2 },
        { i: "????????????", x: 0, y: 3, w: 1, h: 4 },
        { i: "?????????", x: 1, y: 0, w: 4, h: 1 },
        { i: "?????????", x: 1, y: 1, w: 4, h: 3, static: true },
        { i: "??? ??????", x: 1, y: 4, w: 4, h: 4, static: true },
      ]*/
