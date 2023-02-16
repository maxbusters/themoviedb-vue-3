<template>
  <div class="filter-sidebar">
    <b-button size="md" class="ml-2" v-b-toggle.filter-sidebar
      >Filter search</b-button
    >
    <b-sidebar
      id="filter-sidebar"
      class="filter"
      title="Filter search"
      backdrop
      shadow
    >
      <div class="px-4 py-4">
        <b-form>
          <h6>Limit by release year</h6>
          <b-form-group style="width: 100%">
            <datepicker
              :open-date="new Date()"
              :value="filter.year"
              v-model="filter.year"
              :format="'yyyy'"
              placeholder="Click to select a year"
              minimum-view="year"
              name="release-year"
              id="release-year"
              input-class="form-control"
              :disabled-dates="disabledDates"
            ></datepicker>
          </b-form-group>
          <b-form-group id="genres-group">
            <h6>Genres</h6>
            <multiselect
              v-model="filter.genres"
              id="genres"
              label="name"
              track-by="id"
              placeholder="Type to search"
              open-direction="bottom"
              :options="allGenres"
              :multiple="true"
              :searchable="true"
              :bootstrap-styling="true"
              :internal-search="true"
              :clear-on-select="false"
              :close-on-select="false"
              :preserve-search="true"
              :max-height="300"
              :hide-selected="true"
            >
              <template slot="tag" slot-scope="{ option, remove }"
                ><span class="custom__tag"
                  ><span>{{ option.name }}</span
                  ><span class="custom__remove" @click="remove(option)"
                    >x</span
                  ></span
                ></template
              >
            </multiselect>
          </b-form-group>
          <b-form-group>
            <h6>Rating</h6>
            {{ filter.rating }}
            <b-form-input
              id="rating-range"
              v-model="filter.rating"
              type="range"
              min="0"
              max="10"
              step="0.1"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <h6>Sort by</h6>
            <b-select
              :options="sort.options"
              v-model="filter.sortBy"
              class="filter__sort"
            >
            </b-select>
          </b-form-group>
          <b-button @click="startFilter">Filter</b-button>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Multiselect,
    Datepicker,
  },
  data() {
    return {
      sort: {
        options: [
          { text: "By popularity", value: "popularity.desc" },
          { text: "By rating", value: "vote_average.desc" },
          { text: "By release date", value: "release_date.desc" },
        ],
      },
      filter: {
        year: "",
        genres: [],
        rating: 0,
        sortBy: "",
      },
      isValid: false,
      disabledDates: {
        from: new Date(),
      },
    };
  },
  mounted() {
    this.startComponent();
  },
  computed: {
    allGenres() {
      return this.$store.getters.GENRES;
    },
  },
  watch: {
    $route(to) {
      if (to.path !== "/filter") {
        this.resetFilter();
      }
    },
  },
  methods: {
    startComponent() {
      this.$store.dispatch("GET_ALL_GENRES");
      this.filter = this.$store.getters.FILTER;
      if (this.$route.name !== "FilterResult") {
        this.resetFilter();
      }
    },
    startFilter() {
      this.$store.commit("SET_DATA", { name: "filter", value: this.filter });
      this.$store.dispatch("GET_FILTERED_MOVIES_BY_PAGE", 1);
      this.$router.push("/filter", () => {});
    },
    resetFilter() {
      this.$store.commit("SET_DATA", {
        name: "filter",
        value: {
          year: new Date(),
          genres: [],
          rating: 10,
          sortBy: "",
        },
      });
      this.filter = this.$store.getters.FILTER;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.filter {
  input[type="range"]::-webkit-slider-thumb {
    background-color: var(--green);
  }

  .vdp-datepicker {
    &__calendar {
      width: 270px !important;
    }

    &__calendar .cell:not(.blank):not(.disabled).day:hover,
    &__calendar .cell:not(.blank):not(.disabled).month:hover,
    &__calendar .cell:not(.blank):not(.disabled).year:hover {
      border: 1px solid var(--green) !important;
    }
    &__calendar .cell.selected {
      background: var(--green) !important;
      color: white;
    }
    &__calendar .cell.selected:hover {
      background: var(--green) !important;
    }
    &__calendar .cell.selected.highlighted {
      background: var(--green) !important;
    }
  }

  .multiselect {
    &__tags-wrap {
      display: flex;
      flex-wrap: wrap;
    }
    &__option--highlight {
      background: var(--green);
    }
    &__option--highlight::after {
      background: var(--green);
    }
  }
  .custom {
    &__tag {
      background-color: var(--green);
      color: white;
      border-radius: 3px;
      padding: 1px 5px;
      margin-left: 5px;
      margin-bottom: 5px;
    }

    &__remove {
      color: black;
      padding-left: 5px;
    }

    &__remove:hover {
      cursor: pointer;
    }
  }
}
</style>
