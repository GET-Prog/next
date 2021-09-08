import "./list.js";
import "./item.js";
import firebaseConfig from "./database.js";
import { Item } from "./models.js";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const Tabs = {
  TOPICS: 1,
  ARTICLES: 2,
};

const Titles = {
  [Tabs.TOPICS]: 'Tópicos',
  [Tabs.ARTICLES]: 'Artigos',
}

const app = new Vue({
  el: "#app",
  data() {
    return {
      Tabs: Tabs,
      Titles: Titles,
      currentTab: Tabs.TOPICS,
      inputText: undefined,
      showDone: false,
      lists: {
        [Tabs.TOPICS]: [],
        [Tabs.ARTICLES]: [],
      },
    };
  },
  methods: {
    addButton() {
      if (!this.inputText) return;
      const value = { ...Item, uuid: uuid.v4(), content: this.inputText };
      database.ref(this.currentTab).child(value.uuid).set(value);
      this.inputText = undefined;
    },
    sortButton() {
      [Tabs.TOPICS, Tabs.ARTICLES].forEach((tab) => {
        this.lists[tab].sort((a, b) => (b.positiveVotes - b.negativeVotes) - (a.positiveVotes - a.negativeVotes))
      });
    },
    onVote(item, isPositive) {
      if(isPositive) item.positiveVotes++;
      else item.negativeVotes++;
      database.ref(this.currentTab).child(item.uuid).set(item);
    },
    onRemove(item) {
      database.ref(this.currentTab).child(item.uuid).remove();
    },
    onDone(item) {
      item.done = !item.done;
      database.ref(this.currentTab).child(item.uuid).set(item);
    },
    onSelect(item) {
      item.selected = !item.selected;
      database.ref(this.currentTab).child(item.uuid).set(item);
    },
  },
  created() {
    [Tabs.TOPICS, Tabs.ARTICLES].forEach((tab) => {
      database.ref(tab).on("value", (s) => {
        const values = s.val();
        this.lists[tab] = Object.keys(values).map(k => values[k]);
      });
    });
  },
});
