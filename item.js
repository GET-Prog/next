Vue.component("item", {
  props: ["data", "votable"],
  template: `
    <div>
        <div class="columns is-vcentered">
            <div class="column is-12-mobile is-4-tablet is-4-desktop is-3-widescreen is-3-fullhd is-offset-2 is-offset-1-mobile">
                <div class="buttons has-addons">
                    <button class="button" v-on:click="removeButton">
                        <span class="icon has-text-danger">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                    <button class="button" v-on:click="negativeButton" :disabled="!votable">
                        <span class="icon">
                            <i class="fas fa-angle-down"></i>
                        </span>
                    </button>
                    <button class="button" v-on:click="positiveButton" :disabled="!votable">
                        <span class="icon has-text-success">
                            <i class="fas fa-angle-up"></i>
                        </span>
                    </button>
                    <button class="button" v-on:click="doneButton">
                        <span class="icon has-text-link">
                            <i v-bind:class="{ 'fas fa-check-square': this.data.done, 'far fa-square': !this.data.done }"></i>
                        </span>
                    </button>
                    <button class="button" v-on:click="selectButton" v-show="!this.data.selected">
                        <span class="icon has-text-link">
                            <i class="far fa-bookmark"></i>
                        </span>
                    </button>
                    <button class="button" v-on:click="selectButton" v-show="this.data.selected">
                        <span class="icon has-text-link">
                            <i class="fas fa-bookmark"></i>
                        </span>
                    </button>
                    <button class="button is-static" :disabled="!votable">
                        {{ this.data.positiveVotes - this.data.negativeVotes }}
                    </button>
                </div>
            </div>
            <div class="column is-offset-1-mobile">
                {{data.content}}
            </div>
        </div>
    </div>
  `,
  methods: {
    positiveButton() {
        this.$emit('vote-event', this.data, true);
    },
    negativeButton() {
        this.$emit('vote-event', this.data, false);
    },
    removeButton() {
        Bulma().alert({
            type: 'danger',
            title: 'Deseja deletar este item?',
            body: this.data.content,
            confirm: {
                label: 'Sim, Deletar',
                onClick: () => this.$emit('remove-event', this.data),
            },
            cancel: 'Não'
        });
    },
    doneButton() {
        this.$emit('done-event', this.data);
    },
    selectButton() {
        this.$emit('select-event', this.data);
    },
  },
});
