<template>
  <b-card class="card" @click="showDetails(movie.id)">
    <div class="card__img-cont">
      <div class="card__rating">
        <b-badge>
          {{ ratingFixed }}
        </b-badge>
      </div>
      <b-card-img
        v-if="movie.poster_path !== null"
        class="card__img"
        :src="this.imgPath + movie.poster_path"
      ></b-card-img>
      <b-card-img
        v-else
        class="card__img card__img--no-image"
        :src="this.noImgPath"
      ></b-card-img>
    </div>

    <b-card-body class="card__body">
      <b-card-title>
        <h4 class="card__title">{{ movie.title }}</h4>
      </b-card-title>
      <b-card-sub-title>{{
        movie.release_date | moment("MMMM, YYYY")
      }}</b-card-sub-title>
    </b-card-body>
  </b-card>
</template>

<script>
import config from "../../Config.js";
export default {
  data() {
    return {
      imgPath: config.IMG_URL,
      noImgPath: config.NO_IMG_SRC,
    };
  },
  computed: {
    ratingFixed() {
      return this.$props.movie.vote_average.toFixed(1);
    },
  },
  methods: {
    showDetails(id) {
      this.$router.push(`/movies/${id}`);
    },
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card:hover {
  cursor: pointer;
  transition: all 0.5s ease-out;
  transform: scale(1.05);
  img {
    user-select: none;
  }
}

.card:hover .card__title {
  color: var(--green);
}

.card {
  transition: all 0.5s ease-out;
  &__title {
    color: var(--dark);
  }
  &__img-cont {
    position: relative;
  }

  &__img {
    width: 200px;
    height: 300px;
    border: 1px solid gray;
  }

  &__img--no-image {
    object-fit: contain;
  }

  &__body {
    max-width: 200px;
    padding: 0 !important;
    margin: 20px 0;
  }

  &__rating {
    .badge {
      background-color: var(--green) !important;
    }
    font-size: 25px;

    font-family: "Roboto" !important;
    position: absolute;
    z-index: 6;
    bottom: -2px;
    right: 0px;
  }
}
</style>
