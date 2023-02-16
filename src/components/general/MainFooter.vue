<template>
  <b-container class="footer__container">
    <b-row>
      <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        <a
          rel="noindex nofollow"
          href="https://developers.themoviedb.org/3/getting-started/introduction"
        >
          <b-img class="footer__logo" :src="logo"></b-img>
        </a>
        <b-navbar-nav class="header__nav nav">
          <b-nav-item class="nav__el" to="/popular">Popular</b-nav-item>
          <b-nav-item class="nav__el" to="/toprated">Top Rated</b-nav-item>
          <b-nav-item class="nav__el" to="/upcoming">Upcoming</b-nav-item>
        </b-navbar-nav>
      </div>
      <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
        <h4 class="footer__title text-uppercase">About site</h4>
        <p class="footer__descr">
          This site is based on
          <a
            href="https://developers.themoviedb.org/3/getting-started/introduction"
            rel="noindex nofollow"
            class="footer__link"
            >"The movie DB"</a
          >
          API. This is a site for searching movies by filters or by title. You
          can also watch the most popular movies, top rated movies or new
          releases.
        </p>
      </div>

      <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
        <h4 class="footer__title text-uppercase fw-bold mb-4">Contact</h4>
        <h6 class="footer__title">Mail</h6>
        <p>
          <a
            rel="noindex nofollow"
            href="mailto:someone@yoursite.com"
            class="footer__link"
            >maxbusters1387@gmail.com</a
          >
        </p>
        <h6 class="footer__title">Github</h6>
        <p>
          <a
            rel="noindex nofollow"
            href="https://github.com/maxbusters/"
            class="footer__link"
            >maxbusters</a
          >
        </p>
      </div>
    </b-row>
    <div class="text-center p-4 footer__copy">
      © {{ currYear }} Copyright:
      <a
        class="fw-bold footer__link"
        href="https://maxbusters.github.io/homework/01/"
        >Max Skvortsov</a
      >
    </div>
  </b-container>
</template>

<script>
import config from "@/Config.js";
export default {
  data() {
    return {
      logo: config.FOOTER_LOGO,
    };
  },
  computed: {
    currYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
.footer {
  &__container {
    padding-top: 50px;
  }
  background-color: var(--green);
  &__logo {
    width: 100%;
  }
  &__descr,
  &__title {
    color: white;
  }
  .nav {
    &__el {
      .nav-link {
        color: rgba(255, 255, 255, 0.5);
        font-family: "Raleway";
        font-weight: 300;
        font-size: 18px;
        letter-spacing: 0.2px;
        text-transform: uppercase;
      }
    }
    &__el:hover {
      .nav-link {
        font-size: 20px;
        color: white;
      }
    }

    &__el > .--active {
      color: white !important;
    }
  }

  &__copy {
    color: white;
  }

  &__link {
    color: black;
  }

  &__link:hover {
    text-decoration: none;
    color: yellow;
  }
}
</style>
