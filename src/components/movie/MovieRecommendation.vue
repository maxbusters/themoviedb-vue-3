<template>
  <div class="recommendation">
    <div v-if="recommendations.length">
      <div
        class="d-flex flex-row flex-nowrap recommendation__cards cards"
        @mousedown="onCardsMousedown"
        @mouseleave="onCardsMouseleave"
        @mouseup="onCardsMouseup"
        @mousemove="onCardsMousemove"
      >
        <movie-card
          v-for="(movie, inx) in recommendations"
          :key="inx"
          :movie="movie"
        ></movie-card>
      </div>
    </div>
    <div v-else>
      <h4 class="text-center mt-4 mb-4">recommendations are not available</h4>
    </div>
  </div>
</template>

<script>
import config from "@/Config";
import MovieCard from "./MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  created() {
    this.startComponent();
  },
  data() {
    return {
      imgPath: config.IMG_URL,
      noImgPath: config.NO_IMG_SRC,
      isDown: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  computed: {
    recommendations() {
      return this.$store.getters.RECOMMENDATIONS;
    },
    slider() {
      return document.querySelector(".recommendation__cards");
    },
  },
  methods: {
    imagePath(name) {
      if (name === null) {
        return "";
      }
      return config.IMG_URL + name;
    },
    setNoImage(path) {
      if (path === null) {
        return "No image avaliable";
      }
    },
    openMovie(id) {
      this.$router.push(`/movies/${id}`, () => {});
    },
    startComponent() {
      this.$store.dispatch("GET_RECOMMENDATIONS_BY_ID", this.$route.params.id);
    },
    onCardsMousedown(e) {
      this.isDown = true;
      this.slider.classList.add("active");
      this.startX = e.pageX - this.slider.offsetLeft;
      this.scrollLeft = this.slider.scrollLeft;
    },
    onCardsMouseleave() {
      this.isDown = false;
      this.slider.classList.remove("active");
    },
    onCardsMouseup() {
      this.isDown = false;
      this.slider.classList.remove("active");
    },
    onCardsMousemove(e) {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.slider.offsetLeft;
      const walk = (x - this.startX) * 2; //scroll-fast
      this.slider.scrollLeft = this.scrollLeft - walk;
    },
  },
};
</script>

<style lang="scss">
.cards {
  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  transition: all 0.2s;
  transform: scale(1);
  will-change: transform;
  user-select: none;
  cursor: pointer;
}

.cards.active {
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1.02);
}

.card {
  min-width: 250px !important;
  min-height: 200px;
}
</style>
