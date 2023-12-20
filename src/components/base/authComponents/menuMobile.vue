<template>
  <div class="menu-mobile-bottom">
    фыв
    <div class="menu-mobile-bottom-items">
      <template v-for="(item, idx) in categories" :key="item._id">
        <div class="menu-mobile-bottom-item" @mouseleave="showCategory = ''">
          <div
            class="menu-mobile-bottom-name"
            @mouseenter="showCategory = item.title"
          >
            <a
              class="menu-mobile-bottom-name__title"
              @click.prevent="getUserCategory(item)"
            >
              {{ item.title }}
            </a>
            <div
              class="menu-mobile-bottom-name__icon"
              v-if="item?.sections.length > 0"
            >
              <ChevronDownIcon class="" aria-hidden="true" />
            </div>
          </div>
          <div class="" v-if="item?.sections">
            <template
              v-if="showCategory === item.title"
              @mouseenter="showCategory = item.title"
            >
              <div class="menu-mobile-bottom-relative">
                <div class="menu-mobile-bottom-subcategories">
                  <div class="menu-mobile-bottom-subcategories__link">
                    <a
                      v-for="itm in item.sections"
                      :key="itm._id"
                      @click.prevent="getUserSectinId(itm)"
                    >
                      <div class="menu-mobile-bottom-subcategories__text">
                        {{ itm.sectionName }}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clearCategory() {
      this.showCategory = null;
    },
    getUserSectinId(item) {
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item.category, sectinId: item._id },
      });
    },
    getUserCategory(item) {
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item._id },
      });
    },
    getUser() {
      this.regContent = true;
      this.userContent = true;
    },
    goToFlavoring(item) {
      if (this.user?.name == undefined) {
        this.regContent = true;
        this.userContent = true;
      } else {
        this.$router.push({
          path: `/personal-information`,
          query: { navigation: "chosen" },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-mobile {
  background: #292929;
  position: relative;

  &-bottom {
    margin-top: 34px;
    @media (max-width: 570px) {
      padding: 0 28px;
    }
    &-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      @media (max-width: 1040px) {
        column-gap: 10px;
        row-gap: 15px;
      }
    }
    &-item {
      user-select: none;

      @media (max-width: 1220px) {
        margin-right: 25px;
      }
    }

    &-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: white;
      font-size: 18px;
      font-family: tobacco;
      cursor: pointer;

      &__title {
        font-size: 18px;
      }

      &__icon {
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        width: 1.25rem;
        height: 1.25rem;

        &:hover {
          color: #f3f4f6;
        }
      }
    }
    &-relative {
      position: relative;
    }
    &-subcategories {
      z-index: 11;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 10px;
      background: #292929;
      border-radius: 0px 0px 5px 5px;
      width: 100%;
      @media (max-width: 1220px) {
        padding: 20px 5px;
      }

      &__text {
        color: #ffffff;
        padding: 10px;
        transition: 0.3s;
        white-space: pre;
        &:hover {
          background: #5a595980;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
