<template>
  <div class="container">
    <div class="personal-information">
      <div class="personal-information__left">
        <div class="user">
          <div class="user__foto">
            <img
              class="user__foto-img"
              src="../../public/images/non-img-user.png"
              alt=""
            />
          </div>

          <div class="user__inform">
            <div class="user__name">Ім’я користувача</div>
            <div class="user__email">kkuasd459@gmail.com</div>
          </div>
        </div>
        <div class="menu-for-user">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            @click.prevent="getPushingBtn(item)"
            :class="[
              'menu-for-user__list',
              item.current
                ? 'menu-for-user__list--true'
                : 'menu-for-user__list--false',
            ]"
            :value="item.name"
            :aria-current="item.current ? 'page' : undefined"
          >
            <div class="menu-for-user__circl">
              <img class="menu-for-user__img" :src="item.img" alt="" />
            </div>
            <div class="menu-for-user__text">{{ item.name }}</div>
          </a>
        </div>
      </div>
      <div class="personal-information__right">
        <div
          class="personal-information__first"
          v-if="getItem[0].href == 'My orders'"
        >
          <template v-for="item in myOrders">
            <a class=" " href="#" @click.prevent="goToFlavoring(item)">
              <div class="product-card">
                <div class="product-card-img">
                  <img :src="item.products.imageUrl" alt="title" />
                </div>
                <div class="product-card-info">
                  <div class="product-card-liked">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="23"
                      viewBox="0 0 27 23"
                      fill="none"
                    >
                      <path
                        class="st0"
                        d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                        :fill="item.products.liked ? '#EFCA00' : 'none'"
                        :stroke="item.products.liked ? 'none' : '#292929'"
                      />
                    </svg>
                  </div>
                  <div class="product-card-title">
                    <h3>{{ item.products.title }}</h3>
                  </div>
                  <div class="product-card-reviews">
                    <div class="product-card-reviews-stars">
                      <div class="reviews__stars">
                        <div
                          v-for="rating in [0, 1, 2, 3, 4]"
                          :key="rating"
                          :class="[
                            item.products.ratingVoid > rating
                              ? 'reviews__star--yellow'
                              : 'reviews__star--gray',
                            'reviews__star',
                          ]"
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="product-card-reviews-count">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                      >
                        <path
                          d="M1.76841 0.0686588C1.14568 0.230108 0.538323 0.718301 0.257708 1.27569C-0.0152185 1.82923 0.000157679 1.46789 0.000157679 7.08018V12.1351L0.0924146 12.3273C0.223112 12.6079 0.357653 12.7501 0.622892 12.8808C0.822782 12.9808 0.903506 13 1.13799 13C1.31482 13 1.48396 12.9769 1.5839 12.9347C1.67616 12.9001 2.26814 12.4811 2.90241 12.0044L4.05562 11.1356L9.01442 11.1164C13.5658 11.0972 13.9925 11.0895 14.2039 11.028C15.0649 10.782 15.7261 10.117 15.9337 9.2905C16.0221 8.94838 16.0221 2.13675 15.9337 1.79463C15.7223 0.964319 15.0342 0.276237 14.2039 0.0648146C13.8694 -0.0197544 2.09516 -0.0159101 1.76841 0.0686588ZM14.1001 1.39485C14.3692 1.52939 14.4999 1.66778 14.6421 1.96761L14.742 2.17904L14.7536 5.36959C14.7613 7.28392 14.7497 8.65624 14.7267 8.79847C14.6767 9.11368 14.5883 9.2905 14.3769 9.50577C14.0309 9.85558 14.4922 9.82483 8.803 9.84789L3.78653 9.86711L3.57511 9.96321C3.41751 10.0324 1.89142 11.1356 1.27638 11.6277C1.20334 11.6853 1.23025 2.24054 1.30329 2.03681C1.39939 1.77541 1.6185 1.53708 1.87989 1.40254L2.12207 1.27569H7.99191H13.8656L14.1001 1.39485Z"
                          fill="#292929"
                        />
                        <path
                          d="M5.27829 5.04669C4.8247 5.26964 4.83239 5.93466 5.28983 6.15761C5.56275 6.29216 5.83568 6.23834 6.05094 6.0077C6.21239 5.83856 6.2393 5.50413 6.10861 5.27733C5.94716 4.98903 5.58966 4.88908 5.27829 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M7.73825 5.04669C7.28466 5.26964 7.29235 5.93466 7.74979 6.15761C8.02271 6.29216 8.29564 6.23834 8.51091 6.0077C8.67236 5.83856 8.69926 5.50413 8.56857 5.27733C8.40712 4.98903 8.04962 4.88908 7.73825 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M10.1288 5.04291C9.88664 5.16592 9.82129 5.28508 9.82129 5.60798C9.82129 5.86169 9.82898 5.89244 9.93661 6.00776C10.1403 6.22303 10.4056 6.28838 10.6631 6.18074C10.9168 6.07311 11.0398 5.87706 11.036 5.5657C11.036 5.33121 10.9168 5.1467 10.7016 5.04291C10.5055 4.94681 10.3249 4.94681 10.1288 5.04291Z"
                          fill="#292929"
                        />
                      </svg>
                      <p>99+</p>
                    </div>
                  </div>
                  <div class="product-card-discount">
                    <div class="product-card-old-price">
                      {{
                        `${item.summ} од. х ${getTheSum(
                          item.products.newPrice
                        )}₴`
                      }}
                    </div>
                  </div>
                  <div class="product-card-price">
                    {{ getTheSum(+item.summ * +item.products.newPrice) }}₴
                  </div>
                </div>
              </div>
            </a>
          </template>
        </div>
        <div
          class="personal-information__first"
          v-else-if="getItem[0].href == 'Chosen'"
        >
          <template v-for="item in likeProducts">
            <a class=" " href="#" @click.prevent="goToFlavoring(item)">
              <div class="product-card">
                <div class="product-card-img">
                  <img :src="item.imageUrl" alt="title" />
                </div>
                <div class="product-card-info">
                  <div class="product-card-liked">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="23"
                      viewBox="0 0 27 23"
                      fill="none"
                    >
                      <path
                        class="st0"
                        d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                        :fill="item.liked ? '#EFCA00' : 'none'"
                        :stroke="item.liked ? 'none' : '#292929'"
                      />
                    </svg>
                  </div>
                  <div class="product-card-title">
                    <h3>{{ item.title }}</h3>
                  </div>
                  <div class="product-card-reviews">
                    <div class="product-card-reviews-stars">
                      <div class="reviews__stars">
                        <div
                          v-for="rating in [0, 1, 2, 3, 4]"
                          :key="rating"
                          :class="[
                            item.ratingVoid > rating
                              ? 'reviews__star--yellow'
                              : 'reviews__star--gray',
                            'reviews__star',
                          ]"
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="product-card-reviews-count">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                      >
                        <path
                          d="M1.76841 0.0686588C1.14568 0.230108 0.538323 0.718301 0.257708 1.27569C-0.0152185 1.82923 0.000157679 1.46789 0.000157679 7.08018V12.1351L0.0924146 12.3273C0.223112 12.6079 0.357653 12.7501 0.622892 12.8808C0.822782 12.9808 0.903506 13 1.13799 13C1.31482 13 1.48396 12.9769 1.5839 12.9347C1.67616 12.9001 2.26814 12.4811 2.90241 12.0044L4.05562 11.1356L9.01442 11.1164C13.5658 11.0972 13.9925 11.0895 14.2039 11.028C15.0649 10.782 15.7261 10.117 15.9337 9.2905C16.0221 8.94838 16.0221 2.13675 15.9337 1.79463C15.7223 0.964319 15.0342 0.276237 14.2039 0.0648146C13.8694 -0.0197544 2.09516 -0.0159101 1.76841 0.0686588ZM14.1001 1.39485C14.3692 1.52939 14.4999 1.66778 14.6421 1.96761L14.742 2.17904L14.7536 5.36959C14.7613 7.28392 14.7497 8.65624 14.7267 8.79847C14.6767 9.11368 14.5883 9.2905 14.3769 9.50577C14.0309 9.85558 14.4922 9.82483 8.803 9.84789L3.78653 9.86711L3.57511 9.96321C3.41751 10.0324 1.89142 11.1356 1.27638 11.6277C1.20334 11.6853 1.23025 2.24054 1.30329 2.03681C1.39939 1.77541 1.6185 1.53708 1.87989 1.40254L2.12207 1.27569H7.99191H13.8656L14.1001 1.39485Z"
                          fill="#292929"
                        />
                        <path
                          d="M5.27829 5.04669C4.8247 5.26964 4.83239 5.93466 5.28983 6.15761C5.56275 6.29216 5.83568 6.23834 6.05094 6.0077C6.21239 5.83856 6.2393 5.50413 6.10861 5.27733C5.94716 4.98903 5.58966 4.88908 5.27829 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M7.73825 5.04669C7.28466 5.26964 7.29235 5.93466 7.74979 6.15761C8.02271 6.29216 8.29564 6.23834 8.51091 6.0077C8.67236 5.83856 8.69926 5.50413 8.56857 5.27733C8.40712 4.98903 8.04962 4.88908 7.73825 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M10.1288 5.04291C9.88664 5.16592 9.82129 5.28508 9.82129 5.60798C9.82129 5.86169 9.82898 5.89244 9.93661 6.00776C10.1403 6.22303 10.4056 6.28838 10.6631 6.18074C10.9168 6.07311 11.0398 5.87706 11.036 5.5657C11.036 5.33121 10.9168 5.1467 10.7016 5.04291C10.5055 4.94681 10.3249 4.94681 10.1288 5.04291Z"
                          fill="#292929"
                        />
                      </svg>
                      <p class="product-card__void">99+</p>
                    </div>
                  </div>
                  <div class="product-card-discount">
                    <div class="product-card-old-price">
                      {{ getTheSum(item.oldPrice) }}₴
                    </div>
                    <!-- <div class="product-card-discount-info" v-if="discount > 0">
                    - {{ item?.discount.toFixed(0) }}%
                  </div> -->
                  </div>
                  <div class="product-card-price">
                    {{ getTheSum(item.newPrice) }}₴
                  </div>
                </div>
                <div class="add-to-cart" @click="addToCart()">
                  <img class="add-to-cart__img" src="/icons/cart.svg" alt="" />
                </div>
              </div>
            </a>
          </template>
        </div>
        <div class="personal-information__first" v-else>
          <template v-for="item in products">
            <a class=" " href="#" @click.prevent="goToFlavoring(item)">
              <div class="product-card">
                <div class="product-card-img">
                  <img :src="item.imageUrl" alt="title" />
                </div>
                <div class="product-card-info">
                  <div class="product-card-liked">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="23"
                      viewBox="0 0 27 23"
                      fill="none"
                    >
                      <path
                        class="st0"
                        d="M7.6,1.9C5.7,2.2,4,3.2,2.9,4.9C2.4,5.7,2,6.8,1.9,7.7c-0.1,0.6,0,1.9,0.1,2.4c0.3,1.3,1.1,2.8,2.2,4.2
	c1.9,2.4,5.2,5,8.8,7.2c0.5,0.3,0.6,0.3,0.8,0.3c0.2,0,0.3,0,0.8-0.3c1.3-0.8,3.1-2,4.3-2.9c4.1-3.2,6.5-6.3,6.9-9.1
	c0.1-0.6,0-1.9-0.1-2.4c-0.3-1.4-0.9-2.5-1.9-3.4c-0.8-0.8-1.6-1.2-2.6-1.5c-0.6-0.2-1.1-0.3-1.8-0.3c-0.4,0-0.8,0-1,0.1
	c-0.8,0.1-1.8,0.5-2.5,1c-0.5,0.3-1.3,1.1-1.6,1.6c-0.1,0.2-0.3,0.4-0.3,0.4c0,0-0.1-0.2-0.3-0.4c-0.3-0.5-1.2-1.3-1.7-1.6
	c-0.7-0.5-1.6-0.8-2.4-1C9.1,1.9,8,1.8,7.6,1.9z"
                        :fill="item.liked ? '#EFCA00' : 'none'"
                        :stroke="item.liked ? 'none' : '#292929'"
                      />
                    </svg>
                  </div>
                  <div class="product-card-title">
                    <h3>{{ item.title }}</h3>
                  </div>
                  <div class="product-card-reviews">
                    <div class="product-card-reviews-stars">
                      <div class="reviews__stars">
                        <div
                          v-for="rating in [0, 1, 2, 3, 4]"
                          :key="rating"
                          :class="[
                            item.ratingVoid > rating
                              ? 'reviews__star--yellow'
                              : 'reviews__star--gray',
                            'reviews__star',
                          ]"
                          aria-hidden="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="product-card-reviews-count">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                      >
                        <path
                          d="M1.76841 0.0686588C1.14568 0.230108 0.538323 0.718301 0.257708 1.27569C-0.0152185 1.82923 0.000157679 1.46789 0.000157679 7.08018V12.1351L0.0924146 12.3273C0.223112 12.6079 0.357653 12.7501 0.622892 12.8808C0.822782 12.9808 0.903506 13 1.13799 13C1.31482 13 1.48396 12.9769 1.5839 12.9347C1.67616 12.9001 2.26814 12.4811 2.90241 12.0044L4.05562 11.1356L9.01442 11.1164C13.5658 11.0972 13.9925 11.0895 14.2039 11.028C15.0649 10.782 15.7261 10.117 15.9337 9.2905C16.0221 8.94838 16.0221 2.13675 15.9337 1.79463C15.7223 0.964319 15.0342 0.276237 14.2039 0.0648146C13.8694 -0.0197544 2.09516 -0.0159101 1.76841 0.0686588ZM14.1001 1.39485C14.3692 1.52939 14.4999 1.66778 14.6421 1.96761L14.742 2.17904L14.7536 5.36959C14.7613 7.28392 14.7497 8.65624 14.7267 8.79847C14.6767 9.11368 14.5883 9.2905 14.3769 9.50577C14.0309 9.85558 14.4922 9.82483 8.803 9.84789L3.78653 9.86711L3.57511 9.96321C3.41751 10.0324 1.89142 11.1356 1.27638 11.6277C1.20334 11.6853 1.23025 2.24054 1.30329 2.03681C1.39939 1.77541 1.6185 1.53708 1.87989 1.40254L2.12207 1.27569H7.99191H13.8656L14.1001 1.39485Z"
                          fill="#292929"
                        />
                        <path
                          d="M5.27829 5.04669C4.8247 5.26964 4.83239 5.93466 5.28983 6.15761C5.56275 6.29216 5.83568 6.23834 6.05094 6.0077C6.21239 5.83856 6.2393 5.50413 6.10861 5.27733C5.94716 4.98903 5.58966 4.88908 5.27829 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M7.73825 5.04669C7.28466 5.26964 7.29235 5.93466 7.74979 6.15761C8.02271 6.29216 8.29564 6.23834 8.51091 6.0077C8.67236 5.83856 8.69926 5.50413 8.56857 5.27733C8.40712 4.98903 8.04962 4.88908 7.73825 5.04669Z"
                          fill="#292929"
                        />
                        <path
                          d="M10.1288 5.04291C9.88664 5.16592 9.82129 5.28508 9.82129 5.60798C9.82129 5.86169 9.82898 5.89244 9.93661 6.00776C10.1403 6.22303 10.4056 6.28838 10.6631 6.18074C10.9168 6.07311 11.0398 5.87706 11.036 5.5657C11.036 5.33121 10.9168 5.1467 10.7016 5.04291C10.5055 4.94681 10.3249 4.94681 10.1288 5.04291Z"
                          fill="#292929"
                        />
                      </svg>
                      <p>99+</p>
                    </div>
                  </div>
                  <div class="product-card-discount">
                    <div class="product-card-old-price">
                      {{ getTheSum(item.oldPrice) }}₴
                    </div>
                    <!-- <div class="product-card-discount-info" v-if="discount > 0">
                    - {{ item?.discount.toFixed(0) }}%
                  </div> -->
                  </div>
                  <div class="product-card-price">
                    {{ getTheSum(item.newPrice) }}₴
                  </div>
                </div>
                <div class="add-to-cart" @click="addToCart()">
                  <img src="/icons/cart.svg" alt="" />
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let navigation = [
  {
    name: "Мої замовлення",
    href: "My orders",
    current: true,
    img: "../../public/images/orders.png",
  },
  {
    name: "Обране",
    href: "Chosen",
    current: false,
    img: "../../public/images/like.png",
  },
  {
    name: "Переглянуті товари",
    href: "Reviewed products",
    current: false,
    img: "../../public/images/eye.png",
  },
];
export default {
  data() {
    return {
      navigation,
      myOrders: [],
      products: [
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: false,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: false,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
      ],
      likeProducts: [
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },

        {
          id: 1,
          ratingVoid: 5,
          userVoid: {
            id: 1,
            text: "text",
            ratingVoid: "5",
            user: { id: "1", name: "user1" },
            time: "26.10.2023",
          },
          imageUrl: "/images/product.png",
          liked: true,
          title: "Ароматизатор TBA Blueberry (Wild) (Дикая Черника)",
          isOnSale: true,
          oldPrice: 29999,
          newPrice: 249999,
          text: "Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки дальнейших направлений развития. Идейные соображения высшего порядка,",
          containerVolume: [
            { id: 1, value: "0.001", name: "0.001л" },
            { id: 2, value: "0.01", name: "0.01л" },
            { id: 3, value: "0.1", name: "0.1л" },
            { id: 4, value: "1", name: "1л" },
          ],
        },
      ],
    };
  },
  methods: {
    getPushingBtn(item) {
      this.navigation.map((point) =>
        point.name == item.name
          ? (point.current = true)
          : (point.current = false)
      );
    },
    goToFlavoring(item) {
      this.$router.push({
        path: `/flavoring/`,
        query: { flavoringId: item.id },
      });
    },
    addToCart() {},
    getTheSum(item) {
      return item
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3})/g, "$1 ")
        .split("")
        .reverse()
        .join("");
    },
  },
  computed: {
    getItem() {
      return this.navigation.filter((item) => item.current);
    },
  },
  created() {
    this.myOrders = JSON.parse(localStorage.getItem(`order`));
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-family: "tobacco";
  max-width: 1220px;
  margin: 66px auto 90px;
  padding: 0 10px;
}
.personal-information {
  display: grid;
  grid-template-columns: 23% 1fr;
  @media (max-width: 1040px) {
    grid-template-columns: 45% 1fr;
  }
  &__left {
  }
  &__right {
    position: relative;
    padding-left: 1.5em;
    margin-left: 3px;
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 25rem;
      background: rgba(0, 0, 0, 0.5);
      // margin: 0 auto;
      left: 0;
      top: 0;
      //   right: 0;
      //   bottom: 0;
    }
  }
  &__first {
    display: flex;
    gap: 65px;
    flex-wrap: wrap;
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 23px;
  padding-bottom: 1rem;
  margin-bottom: 1.5em;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.5);
    // margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__foto {
    width: 3.625rem;
    height: 3.625rem;
    background-color: #d9d9d9;
    padding: 10px;
    border-radius: 50%;
    @media (max-width: 570px) {
      padding: 7px;
      width: 2.25rem;
      height: 2.25rem;
    }
  }
  &__foto-img {
    width: 100%;
    height: 100%;
  }
  &__inform {
  }
  &__name {
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    margin-bottom: 0.6em;
    @media (max-width: 570px) {
      font-size: 0.6em;
    }
  }
  &__email {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    @media (max-width: 570px) {
      font-size: 0.5rem;
      line-height: 115.967%;
    }
  }
}
.menu-for-user {
  &__list {
    display: flex;
    // flex-direction: column;
    margin-bottom: 1.2em;
    align-items: center;
    height: 2.75rem;
    @media (max-width: 570px) {
      margin-bottom: 0.625rem;
    }
    &--true {
      border-radius: 10px;
      background: rgba(239, 202, 0, 0.5);
      max-width: 15.875rem;
    }
    &--false {
      .menu-for-user__circl {
        background-color: #d9d9d9;
        border-radius: 50%;
      }
    }
  }
  &__circl {
    width: 2.5rem;
    height: 2.5rem;
    padding: 9px;
    margin-right: 1.5rem;
    @media (max-width: 570px) {
      width: 1.5rem;
      height: 1.5rem;
      padding: 5px;
    }
  }
  &__img {
    // @media (max-width: 570px) {
    width: 100%;
    height: 100%;
    // }
  }
  &__text {
    font-size: 1em;
    font-style: normal;
    font-weight: 500;
    line-height: 115.967%;
    @media (max-width: 570px) {
      font-size: 0.6em;
    }
  }
}
.reviews {
  &__stars {
    display: flex;
    gap: 5px;
  }
  &__star {
    content: "★";
    height: 1.2em;
    width: 1.2em;
    &--yellow {
      color: #ffc107;
      //   background-color: yellow;
    }
    &--gray {
      color: gray;
      //   background-color: gray;
    }
    @media (max-width: 570px) {
      height: 0.5em;
      width: 0.5em;
    }
  }
}
.product-card {
  z-index: -1;
  max-width: 250px;
  position: relative;
  border-radius: 10px;
  background: #fff;
  box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);
  user-select: none;
  cursor: pointer;
  @media (max-width: 570px) {
    width: 150px;
  }
  &-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 27px;
    @media (max-width: 570px) {
      width: 67px;
      height: 67px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &-info {
    padding: 0 16px;
  }
  &__void {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.28px;
    @media (max-width: 570px) {
      font-size: 0.5em;
    }
  }
  &-liked {
    cursor: pointer;
    position: absolute;
    top: 17.5px;
    right: 17.5px;
  }

  &-title {
    color: #292929;
    font-family: tobacco;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 12px;
    user-select: none;
    @media (max-width: 570px) {
      font-size: 0.5rem;
    }
  }

  &-discount {
    display: flex;
    flex-direction: row;

    &-info {
      color: red;
      font-family: tobacco;
      font-weight: 800;
    }
  }

  &-old-price {
    color: rgba(41, 41, 41, 0.5);
    font-family: tobacco;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.32px;
    margin-right: 10px;
    @media (max-width: 570px) {
      font-size: 0.5em;
    }
  }

  &-price {
    color: #292929;
    font-family: tobacco;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.48px;
    padding-bottom: 20.5px;
    @media (max-width: 570px) {
      font-size: 0.75rem;
    }
  }
}
.add-to-cart {
  @media (max-width: 570px) {
    display: none;
  }
}
</style>
