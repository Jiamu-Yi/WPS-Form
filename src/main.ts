import App from './App.vue'
import router from './router'
import headerCom from "@/components/HeaderCom.vue";
import {createApp} from 'vue'
import {key, store} from './store'
//引入图标
import '@/assets/fonts/iconfont.css';
//引入ant
import {
    Avatar,
    Button,
    Checkbox,
    DatePicker,
    Dropdown,
    Input,
    Menu,
    Modal,
    Pagination,
    Radio,
    Rate,
    Skeleton,
    Spin,
    TimePicker,
    Upload
} from 'ant-design-vue';

const app = createApp(App);

app.use(store)
    .use(router)
    .use(Button).use(Dropdown).use(Checkbox).use(DatePicker).use(Input).use(Radio).use(Pagination)
    .use(Rate).use(TimePicker).use(Upload).use(Modal).use(Skeleton).use(Spin).use(Menu).use(Avatar)
    .use(store, key)
    .component(headerCom.name, headerCom)
    .mount('#app')
