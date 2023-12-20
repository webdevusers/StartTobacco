<template>
  <div class="action" :style="scrollStyle">
    <!-- {{ categories }} -->
    <div class="action__wrap wrap">
      <div class="action-top">
        <div class="action-categories no-mobile-version">
          <div class="action-categories-icon">
            <img src="/icons/burger-menu.svg" alt="" />
          </div>
          <div class="action-categories-title">
            <router-link to="/">{{ $t('topCategories') }}</router-link>
          </div>
        </div>
        <div class="action-categories mobile-version" @click="isMenu = !isMenu">
          <div class="action-categories-icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/starttobacco-6ed2b.appspot.com/o/menu-burger-horizontal-svgrepo-com%20(1).svg?alt=media&token=80aa83b0-2a71-473e-a3b3-6816c794c673&_gl=1*1qk6mze*_ga*MTI3NjI3MzY0LjE2OTY0MjI4NDY.*_ga_CW55HF8NVT*MTY5OTE1NTc5OS4xMi4xLjE2OTkxNTU4ODQuNTMuMC4w"
              alt="" />
          </div>
          <div class="action-categories-title">
            <a>Категорії</a>
          </div>
        </div>
        <!-- v-model:model-value="responsSerch" -->
        <base-inpute-search v-model:fuzzySearch="fuzzySearch" :options="optionsForSearch" />
        <div class="action-personal">
          <div @click="openModalLang = !openModalLang" style="color: white; margin-right: 10px;
          font-size: 18px; font-family: tobacco; cursor: pointer; user-select: none;">UA</div>
          <button class="action-personal-item" @click="getUser" style="cursor: pointer">
            <img src="/icons/personal.svg" alt="" />
          </button>
          <button class="action-personal-item" @click="goToFlavoring">
            <img src="/icons/liked.svg" alt="" />
          </button>
          <button class="action-personal-item" @click="cartContent = !cartContent" style="cursor: pointer">
            <img src="/icons/cart.svg" alt="" />
          </button>
          <template v-if="openModalLang === true">
            <ul class="modalLang">
              <li @click="changeLocale('ua')" style="user-select: none; cursor: pointer;"><a href="/">UA</a></li>
              <li @click="changeLocale('ru')" style="user-select: none; cursor: pointer;"><a href="/">RU</a></li>
            </ul>
          </template>
        </div>
      </div>

      <div class="action-bottom">
        <div class="action-bottom-items">
          <template v-for="(item, idx) in categories" :key="item._id">
            <div class="action-bottom-item" @mouseleave="showCategory = ''">
              <div class="action-bottom-name" @mouseenter="showCategory = item.title">
                <a class="action-bottom-name__title" @click.prevent="getUserCategory(item)">
                  {{ item.title }}
                </a>
                <div class="action-bottom-name__icon" v-if="item?.sections.length > 0">
                  <ChevronDownIcon class="" aria-hidden="true" />
                </div>
              </div>
              <div class="" v-if="item?.sections">
                <template v-if="showCategory === item.title" @mouseenter="showCategory = item.title">
                  <div class="action-bottom-relative">
                    <div class="action-bottom-subcategories">
                      <div class="action-bottom-subcategories__link">
                        <a v-for="itm in item.sections" :key="itm._id" @click.prevent="getUserSectinId(itm)">
                          <div class="action-bottom-subcategories__text">
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
    </div>
    <div class="" v-if="!user">
      <regModal v-if="regContent" @modal="(regContent = !regContent), (authContent = true)"
        v-model:regContent="regContent" />
      <authModal v-if="authContent" @modal="(authContent = !authContent), (regContent = true)"
        v-model:authContent="authContent" />
    </div>
    <div class="" v-else>
      <user-modal @modal="userContent = !userContent" v-model:userContent="userContent" v-if="userContent" />
    </div>
    <cart v-if="cartContent" @cart="cartContent = !cartContent" />
    <div class="menu-mobile" v-if="isMenu" @click="isMenu = false">
      <div class="menu-mobile-bottom" @click.stop>
        <nav class="header-links">
          <a href="/" class="header-link-item">{{ $t('homelink')}}</a>
          <a href="/about" class="header-link-item">{{ $t('aboutlink')}}</a>
          <a href="/contacts" class="header-link-item">{{ $t('contactlink')}}</a>
          <a href="/cooperation" class="header-link-item">{{ $t('cooperationlink')}}</a>
        </nav>
        <div class="menu-mobile-bottom-items">
          <div class="menu-mobile-bottom__title">{{ $t('allCategories')}}</div>
          <template v-for="(item, idx) in categories" :key="item._id">
            <div class="menu-mobile-bottom-item" @mouseleave="showCategory = ''">
              <div class="menu-mobile-bottom-name" @mouseenter="showCategory = item.title">
                <a class="menu-mobile-bottom-name__title" @click.prevent="getUserCategory(item)">
                  {{ item.title }}
                </a>
                <div class="menu-mobile-bottom-name__icon" v-if="item?.sections.length > 0">
                  <ChevronDownIcon class="" aria-hidden="true" />
                </div>
              </div>
              <div class="" v-if="item?.sections">
                <template v-if="showCategory === item.title" @mouseenter="showCategory = item.title">
                  <div class="menu-mobile-bottom-relative">
                    <div class="menu-mobile-bottom-subcategories">
                      <div class="menu-mobile-bottom-subcategories__link">
                        <a v-for="itm in item.sections" :key="itm._id" @click.prevent="getUserSectinId(itm)">
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
        <div class="menu-mobile-personal">
          <div class="menu-mobile-personal-icon">
            <button class="menu-mobile-personal-item" @click="getUser" style="cursor: pointer">
              <img src="/icons/personal.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">
                {{ $t('lk') }}
              </div>
            </button>
            <button class="menu-mobile-personal-item" @click="goToFlavoring">
              <img src="/icons/liked.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">{{ $t('chosen')}}</div>
            </button>
            <button class="menu-mobile-personal-item" @click="(isMenu = false), (cartContent = !cartContent)"
              style="cursor: pointer">
              <img src="/icons/cart.svg" alt="" />
              <div class="menu-mobile-personal-btn-title">{{ $t('cart')}}</div>
            </button>
          </div>
        </div>
        <div class="contacts">
          <div class="contacts__title">{{ $t('contacts')}}</div>
          <div class="contacts__item">
            <img class="contacts__icon" src="../../../public/images/phone.png" />
            <a class="contacts__text" href="tel:">+38 (068) 657 18 28</a>
          </div>
          <div class="contacts__item">
            <img class="contacts__icon" src="../../../public/images/phone.png" />
            <a class="contacts__text" href="tel:">+38 (099) 449 04 52</a>
          </div>
          <div class="contacts__item">
            <img class="contacts__icon" src="../../../public/images/mail.png" />
            <a class="contacts__text" href="mailto:tobaccostart@gmail.com">tobaccostart@gmail.com</a>
          </div>
          <div class="contacts__item">
            <img class="contacts__icon" src="../../../public/images/telegram.png" />
            <a class="contacts__text" href="https://t.me/starttobacco">Telegram</a>
          </div>
          <div class="contacts__item">
            <svg class="contacts__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none">
              <path
                d="M9.41967 0.00811005C9.40559 0.0174961 9.01124 0.0456524 8.53708 0.0597305C8.06293 0.0785027 7.64981 0.101967 7.62164 0.111351C7.58878 0.120737 7.28832 0.139507 6.94562 0.158279C6.60291 0.172358 6.27898 0.195822 6.21795 0.205208C6.15692 0.214592 5.90811 0.233364 5.66399 0.252134C5.41987 0.270906 5.18514 0.289677 5.14758 0.299063C5.11003 0.303755 4.90816 0.322527 4.7016 0.341297C3.83779 0.41169 3.29791 0.557165 2.65945 0.890352C2.28857 1.08276 1.62663 1.61773 1.3919 1.91807C1.32618 1.99785 1.22759 2.11986 1.17595 2.18556C0.875498 2.54221 0.523403 3.40568 0.410733 4.05329C0.340314 4.46156 0.185392 6.24482 0.0680268 7.97176C-0.0540328 9.75971 -0.00239221 15.7477 0.147835 17.1931C0.157224 17.2963 0.180697 17.5497 0.194781 17.7562C0.227643 18.2349 0.269895 18.7088 0.288673 18.859C0.298062 18.9247 0.321535 19.1453 0.335619 19.3517C0.4389 20.6704 0.833246 21.5574 1.69236 22.4021C2.21815 22.9136 2.78151 23.2468 3.481 23.4532C3.97863 23.5987 4.07252 23.6128 5.14758 23.716C5.28842 23.7301 5.51376 23.7489 5.64052 23.763C6.21795 23.8193 7.8282 23.9272 8.59811 23.9601C10.2929 24.0351 15.3208 23.9976 16.3911 23.9037C16.471 23.8991 16.7761 23.8803 17.0719 23.8615C17.3676 23.8427 17.6962 23.8193 17.7995 23.8099C17.9028 23.8005 18.1235 23.777 18.2925 23.763C20.0952 23.6222 20.621 23.5096 21.3393 23.1247C22.4002 22.5475 23.1373 21.6324 23.4706 20.478C23.5833 20.0932 23.6396 19.7131 23.7147 18.859C23.7288 18.6901 23.7523 18.446 23.7664 18.3193C23.9307 16.5642 23.9823 15.2221 23.9964 12.4299C24.0058 10.8156 23.9964 9.22004 23.9729 8.88685C23.9541 8.54897 23.9213 7.99053 23.9072 7.64326C23.8884 7.296 23.865 6.93465 23.8556 6.84549C23.8462 6.75633 23.8227 6.48884 23.8086 6.25889C23.757 5.50336 23.5974 4.01105 23.5457 3.79518C23.4284 3.28836 23.0622 2.46713 22.8134 2.15271C22.6631 1.96031 22.0247 1.33147 21.8322 1.1813C21.7007 1.07806 20.9966 0.716721 20.7243 0.608786C20.2736 0.435154 19.3394 0.317833 17.1423 0.162971C16.6024 0.120737 16.0109 0.0785027 15.8278 0.0644245C15.41 0.0315742 9.45253 -0.0200462 9.41967 0.00811005ZM12.8467 4.78067C14.3678 4.85575 15.5931 5.04346 16.1752 5.28749C16.8935 5.59252 17.7244 6.25889 18.2549 6.95342C18.7901 7.66673 18.992 8.25332 19.1891 9.66116C19.2736 10.2571 19.2736 12.444 19.1891 13.04C19.053 14.0395 18.9168 14.5886 18.7009 15.0297C18.2408 15.9823 17.3723 16.8458 16.3911 17.3339C15.917 17.5685 15.6259 17.6436 14.7152 17.775C13.7763 17.9158 12.9923 17.9674 11.9219 17.9674H10.9595L10.0863 18.8637L9.20841 19.7647L8.96899 19.7835C8.69201 19.8116 8.48075 19.7225 8.354 19.5301C8.28358 19.4221 8.2648 19.2579 8.24602 18.493L8.22255 17.5826L7.93618 17.4793C6.87989 17.0945 5.63113 15.9026 5.21331 14.8701C4.73446 13.6969 4.58423 11.0174 4.88938 9.16842C5.01614 8.41288 5.10533 8.09846 5.31659 7.66673C5.86586 6.53107 7.17565 5.41419 8.26949 5.14201C8.91265 4.98246 10.0722 4.83229 11.0299 4.78536C11.4196 4.7619 11.7857 4.74312 11.8374 4.74312C11.889 4.73843 12.3444 4.7572 12.8467 4.78067Z"
                fill="#6F3FAA" />
              <path
                d="M10.8982 6.12297C9.47569 6.24029 8.6025 6.39984 8.15651 6.63448C7.51805 6.97236 6.80447 7.68097 6.5181 8.26288C5.93597 9.45484 5.92658 13.1903 6.50401 14.4245C6.8655 15.2035 7.73869 15.959 8.68231 16.3204L8.80906 16.372V17.7282C8.80906 18.9014 8.81845 19.0891 8.88417 19.1454C8.9452 19.1971 9.12829 19.0281 10.2315 17.9018L11.5038 16.5973L11.6915 16.6207C12.2314 16.6958 14.6069 16.4846 15.3111 16.2969C16.1092 16.0904 17.0575 15.288 17.4706 14.4714C18.0715 13.2748 18.0809 9.46423 17.4847 8.28165C17.1279 7.56834 16.4378 6.90666 15.696 6.56409C15.1562 6.31068 13.837 6.14174 12.2596 6.11828C11.6399 6.11358 11.0296 6.11358 10.8982 6.12297ZM12.8934 7.74198C14.1562 8.05639 15.2313 9.14512 15.4989 10.384C15.5881 10.8111 15.6538 11.5056 15.6115 11.6229C15.5505 11.7872 15.2829 11.8106 15.2219 11.6558C15.2078 11.6182 15.1749 11.3601 15.1468 11.0832C15.0294 9.91943 14.5224 9.08881 13.5929 8.52567C13.222 8.30042 12.8229 8.17371 12.269 8.10801C12.0296 8.07986 11.7995 8.03762 11.7573 8.01416C11.6399 7.95315 11.654 7.75606 11.776 7.67159C11.9028 7.58242 12.3582 7.61058 12.8934 7.74198ZM9.64939 8.07047C9.82309 8.13148 10.2926 8.69461 10.6446 9.26244C10.8137 9.53931 10.8747 9.68009 10.8747 9.81618C10.8747 10.0602 10.8183 10.1541 10.4944 10.4591C10.1658 10.7688 10.1611 10.8157 10.3724 11.3038C10.7151 12.0828 11.2456 12.6553 11.9591 13.012C12.5554 13.3123 12.6539 13.3076 12.9873 12.951C13.4567 12.4535 13.5976 12.4441 14.2407 12.8806C14.8135 13.2701 15.2735 13.6314 15.3346 13.744C15.5411 14.1288 14.9731 14.9689 14.3581 15.1988C14.0999 15.2974 14.0811 15.2974 13.8323 15.2223C13.4802 15.1143 12.5131 14.6497 12.0249 14.3541C10.3348 13.3311 9.24096 12.0171 8.39124 9.96635C8.17529 9.45484 8.15651 9.26244 8.29265 8.96679C8.41471 8.704 8.82784 8.30042 9.14238 8.14086C9.42405 8.00008 9.44283 8.00008 9.64939 8.07047ZM12.776 8.6383C13.8698 8.86355 14.6773 9.86311 14.6773 10.9941C14.6773 11.2569 14.6632 11.3085 14.5787 11.3554C14.405 11.4446 14.2548 11.3413 14.2548 11.1302C14.2548 10.8439 14.1327 10.3465 13.9966 10.0837C13.7243 9.5487 13.1469 9.1545 12.4662 9.04657C12.0624 8.98087 12.0014 8.94333 12.0014 8.765C12.0014 8.53506 12.1563 8.5069 12.776 8.6383ZM13.1281 9.69887C13.4661 9.86781 13.6586 10.1494 13.7337 10.5764C13.7947 10.9331 13.7525 11.0692 13.5741 11.0692C13.4145 11.0692 13.3347 10.9659 13.2971 10.7125C13.283 10.5952 13.222 10.4216 13.1656 10.3324C13.0577 10.1541 12.7666 9.99451 12.5554 9.98982C12.4333 9.98982 12.2361 9.84904 12.2361 9.76456C12.2361 9.74579 12.269 9.68009 12.3112 9.61909C12.3817 9.52054 12.4145 9.51116 12.6305 9.53931C12.7619 9.55808 12.9873 9.62847 13.1281 9.69887Z"
                fill="#6B4096" />
              <path
                d="M10.7576 4.83184C9.59331 4.91162 8.42905 5.09933 7.92203 5.29643C6.74369 5.75632 5.5137 7.00929 5.15222 8.13087C4.8189 9.15859 4.66867 11.444 4.84237 12.8987C5.04894 14.6961 5.31653 15.3249 6.27423 16.2822C6.82819 16.836 7.26948 17.1504 7.86569 17.4085L8.26943 17.5821L8.2929 18.4878C8.31168 19.2528 8.33046 19.417 8.40088 19.5202C8.50886 19.6798 8.66847 19.7502 8.94076 19.7502L9.1614 19.7549L10.0534 18.8351L10.95 17.92H12.0251C13.4241 17.92 14.8325 17.7839 15.6916 17.568C16.0672 17.4695 16.7479 17.1269 17.1281 16.8407C17.8746 16.2775 18.5929 15.3484 18.8323 14.6491C19.1046 13.8326 19.2501 12.467 19.2172 11.0028C19.1797 9.37445 19.0154 8.41713 18.6492 7.66628C18.1656 6.69018 17.1141 5.70939 16.1188 5.30581C15.1752 4.9257 12.673 4.70514 10.7576 4.83184ZM13.1049 6.0942C13.9828 6.15521 15.025 6.30068 15.4287 6.4227C16.1939 6.65264 17.1141 7.45511 17.5131 8.24349C18.0952 9.39323 18.1093 13.2319 17.5366 14.438C17.2079 15.1278 16.4286 15.874 15.6916 16.2118C15.2127 16.4277 13.9217 16.6013 12.504 16.6389L11.4805 16.667L10.2552 17.9247C9.02996 19.1871 8.87034 19.3185 8.79053 19.112C8.77645 19.0697 8.76236 18.4409 8.76236 17.7088V16.3808L8.58866 16.3198C7.78589 16.0617 6.86105 15.2404 6.4667 14.438C6.11461 13.7247 5.93152 11.4627 6.10522 9.97982C6.2132 9.02719 6.30239 8.65177 6.51834 8.20595C6.67796 7.87277 6.78594 7.73668 7.18498 7.33779C7.94081 6.58694 8.31638 6.41331 9.53697 6.23968C10.781 6.06135 11.8984 6.01442 13.1049 6.0942Z"
                fill="white" />
              <path
                d="M11.7666 7.70832C11.7384 7.74586 11.7196 7.82564 11.729 7.88665C11.7431 7.9805 11.7806 7.99927 12.0248 8.03212C12.5693 8.10252 13.0529 8.21514 13.3064 8.32777C13.9261 8.59995 14.4941 9.13962 14.8134 9.74968C15.0387 10.1814 15.1326 10.5287 15.1842 11.1247C15.2265 11.5939 15.2828 11.7253 15.433 11.7253C15.588 11.7253 15.6208 11.5752 15.5645 11.0824C15.5035 10.5005 15.4518 10.28 15.3016 9.89516C14.8509 8.75951 13.8181 7.92888 12.5881 7.71302C12.0717 7.62385 11.8417 7.62385 11.7666 7.70832Z"
                fill="white" />
              <path
                d="M9.15215 8.18249C8.65452 8.43121 8.25079 8.95211 8.24609 9.34161C8.24609 9.54809 8.47613 10.1253 8.86109 10.8808C9.61222 12.3638 10.5558 13.3962 11.9454 14.2549C12.6074 14.6679 13.6543 15.1607 14.0017 15.2264C14.4617 15.3108 15.3349 14.4943 15.3349 13.9781C15.3349 13.7528 15.2786 13.6824 14.8091 13.3305C14.1096 12.8049 13.7904 12.6172 13.612 12.6172C13.3914 12.6172 13.2881 12.6829 12.9783 13.0067C12.7154 13.2882 12.7154 13.2882 12.4994 13.2601C12.2928 13.2319 11.7999 13.0067 11.5088 12.8096C10.9032 12.3966 10.1052 11.1718 10.1944 10.7917C10.2084 10.726 10.3587 10.543 10.523 10.3834C10.8187 10.1065 10.8281 10.0925 10.8281 9.8672C10.8281 9.6701 10.7906 9.57625 10.5981 9.26183C10.3023 8.78317 9.87981 8.25288 9.71081 8.14964C9.53711 8.03701 9.43383 8.04171 9.15215 8.18249Z"
                fill="white" />
              <path
                d="M12.1146 8.61841C12.0301 8.67473 12.0066 8.80143 12.0629 8.88121C12.0958 8.92344 12.2554 8.97506 12.4385 9.00322C13.5042 9.16747 14.1473 9.83384 14.2553 10.8616C14.2976 11.2698 14.3351 11.3496 14.4994 11.3496C14.6309 11.3496 14.6872 11.1807 14.6544 10.8897C14.5511 9.96055 14.0863 9.24724 13.3446 8.8859C12.908 8.67003 12.2507 8.52456 12.1146 8.61841Z"
                fill="white" />
              <path
                d="M12.3348 9.63188C12.2409 9.74455 12.3395 9.94173 12.4803 9.94173C12.9075 9.94173 13.2267 10.2093 13.3206 10.6318C13.3911 10.9558 13.4333 11.0215 13.5788 11.0215C13.7244 11.0215 13.7619 10.8666 13.6915 10.5379C13.6117 10.153 13.4192 9.88539 13.1188 9.73516C12.7855 9.57555 12.424 9.52391 12.3348 9.63188Z"
                fill="white" />
            </svg>
            <a href="" class="contacts__text">+380 (68) 657 18 28</a>
          </div>
        </div>
        <div class="lang">
          <ul style="display: flex;
          flex-direction: row; grid-gap: 15px; justify-content: center;">
            <li style="background: #29292930; padding: 12px; border-radius: 5px; font-family: tobacco; font-size: 16px;" @click="changeLocale('ua')"><a href="/">UA</a></li>
            <li style="background: #29292930; padding: 12px; border-radius: 5px; font-family: tobacco; font-size: 16px;" @click="changeLocale('ru')"><a href="/">RU</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import regModal from "./authComponents/regModal.vue";
import authModal from "./authComponents/authModal.vue";
import userModal from "./authComponents/userModal.vue";
import cart from "./cart.vue";
import axios from "axios";
import BaseInputeSearch from "../UI/BaseInputeSearch.vue";

export default {
  data() {
    return {
      request: "",
      showCategory: "",
      regContent: false,
      authContent: false,
      cartContent: false,
      userContent: false,
      isOpen: false,
      products: [],
      categories: [],
      user: [],
      isMenu: false,
      responsSerch: "",
      fuzzySearch: "",
      optionsForSearch: [],
      openModalLang: false,
      scrollStyle: {
        position: 'relative'
      }
    };
  },
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChevronDownIcon,
    userModal,
    BaseInputeSearch,
    regModal,
    authModal,
    cart,
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', locale);
    },
    clearCategory() {
      this.showCategory = null;
    },
    getUserSectinId(item) {
      this.isMenu = false;
      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item.category, sectinId: item._id },
      });
    },
    getUserCategory(item) {
      this.isMenu = false;

      this.$router.push({
        path: `/subcategory/`,
        query: { categoryId: item._id },
      });
    },
    getUser() {
      this.isMenu = false;
      this.regContent = true;
      this.userContent = true;
    },
    goToFlavoring(item) {
      this.isMenu = false;
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
    async fetchSearch(request) {
      try {
        let urlStr = `https://eshopbackend-72da33f36405.herokuapp.com/items/search/${request}`;
        const response = await axios.get(urlStr, {});
        this.optionsForSearch = response.data.products;
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 200) {
        this.scrollStyle.position = 'fixed';
        this.scrollStyle.top = 0;
      } else {
        this.scrollStyle.position = 'relative'
      }
    }
  },
  watch: {
    async fuzzySearch(newValue) {
      setTimeout(async () => {
        await this.fetchSearch(newValue);
      }, 1000);
    },
    regContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
      }, 2000);
    },
    authContent(newValue) {
      setTimeout(() => {
        this.user = JSON.parse(localStorage.getItem(`user`));
      }, 2000);
    },
  },
  mounted() {
    this.$nextTick(async () => {
      let urlStr;

      if (this.$i18n.locale === 'ua') {
        urlStr = "https://eshopbackend-72da33f36405.herokuapp.com/items/actions";
      } else {
        urlStr = "https://starttobacco-ru-2065f143b724.herokuapp.com/items/actions";
      }

      try {
        const response = await axios.get(urlStr, {});
        this.categories = response.data;
      } catch (error) {
        throw error;
      }
    });

    window.addEventListener('scroll', this.handleScroll);
  },
  async created() {
    this.user = await JSON.parse(localStorage.getItem(`user`));
    if (this.user?.name == undefined) {
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>

<style lang="scss" scoped>
.modalLang {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  bottom: 50px;
  font-family: tobacco;
  font-size: 16px;
  grid-gap: 15px;
  background: white;
  width: 150px;
}
.contacts {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  padding-bottom: 30px;

  &__title {
    margin: 0 auto;
    font-size: 18px;
    font-weight: 700;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 5px 20px;
  }

  &__icon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}

.header-links {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;

  a {
    padding: 5px 20px;
  }
}

.action {
  background: #292929;
  z-index: 13;
  width: 100%;

  &__wrap {
    display: flex;
    flex-direction: column;
    padding: 15px 20px;
  }

  &-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 570px) {
      // margin-top: 30px;
      row-gap: 30px;
      // order: 3;
    }
  }

  &-categories {
    user-select: none;
    cursor: pointer;
    border-radius: 5px;
    background: rgba(90, 89, 89, 0.5);
    padding: 7.5px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    // @media (max-width: 970px) {
    //   display: none;
    // }
    @media (max-width: 765px) {
      max-width: 130px;
    }

    &-icon {
      max-width: 24px;
      width: 100%;

      img {
        width: 100%;
      }

      margin-right: 15px;

      @media (max-width: 570px) {
        margin-right: 0;
      }
    }

    &-title {
      font-family: tobacco;
      font-size: 15px;

      @media (max-width: 765px) {
        font-size: 9px;
      }

      @media (max-width: 570px) {
        display: none;
      }

      a {
        color: white;
        text-decoration: none;
      }

      font-size: 18px;
    }
  }

  &-search {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 570px) {
      // margin-top: 30px;
      row-gap: 30px;
      // order: 3;
    }

    &-input {
      input {
        border-radius: 5px 0px 0px 5px;
        width: 545px;

        padding: 8px 12px;
        border: none;

        &:focus {
          outline: none;
          border: none;
        }

        @media (max-width: 1220px) {
          max-width: 545px;
        }

        @media (max-width: 970px) {
          max-width: 0px;
        }

        @media (max-width: 570px) {
          min-width: 290px;
        }
      }
    }

    &-button {
      background: #efca00;
      border-radius: 0px 5px 5px 0px;
      padding: 8px 20px;
      cursor: pointer;
      user-select: none;
    }
  }

  &-personal {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 970px) {
      display: none;
    }

    &-item {
      padding: 7.5px;
      transition: 0.3s;

      &:hover {
        scale: (1.25);
      }
    }
  }

  &-bottom {
    @media (max-width: 970px) {
      display: none;
    }

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

  .menu-mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: none;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    z-index: 100;
    flex-direction: column;
    animation: load 0.7s;

    &-bottom {
      position: absolute;
      top: 0;
      left: 0;
      width: 80%;
      height: 100vh;
      background: #ffffff;
      box-shadow: 5px 5px 25px 0px rgba(0, 0, 0, 0.2);

      &-items {
        margin: 20px 10px;

        @media (max-width: 1040px) {
          column-gap: 10px;
          row-gap: 15px;
        }
      }

      &__title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
      }

      &-item {
        padding: 10px 20px;
      }

      &-name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-family: tobacco;
        cursor: pointer;

        &__title {
          font-size: 18px;
          font-weight: 700;

          &:active {
            background: #5a595980;
            border-radius: 10px;
          }
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
        // position: absolute;
        display: flex;
        // flex-direction: column;
        // align-items: center;
        // padding: 5px 10px;
        // background: #292929;
        border-radius: 0px 0px 5px 5px;
        width: 100%;

        &__text {
          // color: #ffffff;
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

    &-personal {
      background: rgba(0, 0, 0, 0.25);
      padding: 15px 10px;

      &-icon {
        display: flex;
        flex-direction: column;
      }

      &-item {
        display: flex;
        column-gap: 10px;
        padding: 10px 20px;
      }

      &-btn-title {
        color: #ffffff;
      }
    }
  }
}

.menu-mobile-bottom {
  overflow-y: auto;
}

.mobile-version {
  display: none;

  @media (max-width: 970px) {
    display: flex;
  }
}

.no-mobile-version {
  display: flex;

  @media (max-width: 970px) {
    display: none;
  }
}

@keyframes load {
  from {
    left: -350px;
  }

  to {
    left: 0;
  }
}
</style>
