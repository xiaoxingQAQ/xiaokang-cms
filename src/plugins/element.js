import Vue from 'vue'
import { 
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  Tabs,
  TabPane,
  MenuItem,
  Popover,
  RadioButton,
  RadioGroup,
  MenuItemGroup,
  Submenu,
  Message,
  Row,
  Col,
  Card,
  Dialog,
  Tag,
  Upload,
  Select,
  Option,
  DatePicker,
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Slider,
  TimeSelect,
} from 'element-ui'

Vue.use(TimeSelect)
Vue.use(Slider)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(MenuItem)
Vue.use(Popover)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Tag)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm 