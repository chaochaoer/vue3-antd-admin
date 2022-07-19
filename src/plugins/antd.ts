import {
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Col,
  Row,
  Select,
  DatePicker,
  Button,
  Breadcrumb,
  MenuItem,
  SubMenu,
  Popconfirm,
  Layout,
  LayoutSider,
  LayoutContent,
  ConfigProvider,
  Divider,
  Spin,
  TabPane,
  Tabs,
  Result
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'dayjs/locale/zh-cn';

export function setupAntd(app: any) {
  app
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(Button)
    .use(Breadcrumb)
    .use(MenuItem)
    .use(SubMenu)
    .use(Popconfirm)
    .use(Layout)
    .use(LayoutSider)
    .use(LayoutContent)
    .use(ConfigProvider)
    .use(Divider)
    .use(Spin)
    .use(TabPane)
    .use(Tabs)
    .use(Result)
    .use(DatePicker)
  return app
}
