Vue.component("list", {
  props: ["items", "showdone", "votable"],
  template: `
      <div>
        <div class="column is-full">
            <div class="field has-addons" style="display: flex; justify-content: center">
                <p class="control" style="width: 60%">
                  <input v-model="queryText" id="queryText" class="input" placeholder='Buscar'></input>
                </p>
                <p class="control">
                  <a class="button is-static">{{ lengthItems }} Itens</a>
                </p>
            </div>
        </div>
        <div class="column is-full">
          <div v-for="item in filterdItems">
              <item v-if='showdone == item.done && item.selected' @vote-event="onVote" @remove-event="onRemove" @select-event="onSelect" @done-event="onDone" v-bind:data="item" v-bind:votable="votable"></item>
          </div>
          <hr>
          <div v-for="item in filterdItems">
              <item v-if='showdone == item.done && !item.selected' @vote-event="onVote" @remove-event="onRemove" @select-event="onSelect" @done-event="onDone" v-bind:data="item" v-bind:votable="votable"></item>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
      queryText: undefined,
    };
  },
  methods: {
    onVote(item, isPositive) {
      this.$emit('vote-event', item, isPositive);
    },
    onRemove(item) {
      this.$emit('remove-event', item);
    },
    onDone(item) {
      this.$emit('done-event', item);
    },
    onSelect(item) {
      this.$emit('select-event', item);
    },
  },
  computed: {
    filterdItems() {
      if(this.queryText) {
        return this.items.filter(item => {
          return this.queryText.toLowerCase().split(' ').every(w => item.content.toLowerCase().includes(w));
        });
      }
      return this.items;
    },
    lengthItems() {
      return this.filterdItems.filter(item => item.done == this.showdone).length
    }
  }
});
