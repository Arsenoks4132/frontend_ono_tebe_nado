import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import AppState from './components/model/AppState';
import Page from './components/view/Page';
import { Modal } from './components/common/Modal';
import Basket from './components/common/Basket';
import Tabs from './components/common/Tabs';
import Order from './components/view/Order';


const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#preview');
const auctionTemplate = ensureElement<HTMLTemplateElement>('#auction');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#bid');
const bidsTemplate = ensureElement<HTMLTemplateElement>('#bids');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const tabsTemplate = ensureElement<HTMLTemplateElement>('#tabs');
const soldTemplate = ensureElement<HTMLTemplateElement>('#sold');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalTemplate = ensureElement<HTMLElement>('#modal-container');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(modalTemplate, events);

// Переиспользуемые части интерфейса
const bids = new Basket(cloneTemplate(bidsTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const tabs = new Tabs(cloneTemplate(tabsTemplate), {
  onClick: (name) => {
    if (name === 'closed') events.emit('basket:open');
    else events.emit('bids:open');
  }
});
const order = new Order(cloneTemplate(orderTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно


// Получаем лоты с сервера
api.getLotList()
    .then(result => {
        // вместо лога поместите данные в модель
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });


