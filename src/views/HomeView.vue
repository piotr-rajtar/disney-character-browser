<template>
  <v-main :class="style.mainContainer">
    <!-- MAIN BUTTON -->
    <v-container class="d-flex align-center justify-center">
      <v-btn 
        :class="style.button" 
        @click="mainButtonClickHandler"
      >
        {{ mainButtonCaption }}
      </v-btn>
    </v-container>

    <!-- INITIAL LOADER -->
    <v-container 
      v-if="isLoading" 
      class="d-flex align-center justify-center"
    >
      <data-loader  />
    </v-container>

    <!-- MAIN DATA CONTAINER -->
    <v-container v-else-if="isMainDataContainerVisible">
      <!-- FILTERS -->
      <v-container>
        <v-form validate-on="submit" @submit.prevent="debouncedOnFilterClick">
          <v-card
            class="mx-auto pa-5 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
          >
            <v-card-title class="text-center">Filters</v-card-title>

            <label for="nameSearch" class="text-subtitle-1 text-medium-emphasis">Character name</label>

            <v-text-field
              id="nameSearch"
              v-model="searchedCharacterName"
              clearable
              density="compact"
              placeholder="Enter character name"
              prepend-inner-icon="mdi-magnify"
            />

            <label for="slider" class="text-subtitle-1 text-medium-emphasis">Items per page</label>

            <v-slider
              id="slider"
              v-model="itemsPerPage"
              :max="MAX_ITEM_QUANTITY_PER_PAGE"
              :min="MIN_ITEM_QUANTITY_PER_PAGE"
              class="align-center"
              color="indigo-darken-4"
              hide-details
              step="1"
            >
              <template #append>
                <v-text-field
                  v-model="itemsPerPage"
                  :class="style.sliderInput"
                  :max="MAX_ITEM_QUANTITY_PER_PAGE"
                  :min="MIN_ITEM_QUANTITY_PER_PAGE"
                  density="compact"
                  hide-details
                  single-line
                  type="number"
                  @input="onQuantityInput"
                />
              </template>
            </v-slider>

            <v-card-actions 
              :class="style.filterButtonContainer" 
              class="d-flex align-center justify-center mt-5"
            >
              <v-btn 
                :class="style.button" 
                type="submit"
              >
                Filter
              </v-btn>
              <v-btn 
                :class="style.resetButton"
                color="red-darken-4"
                variant="text"  
                @click="debouncedOnFilterResetClick"
              >
                Clear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-container>

      <!-- FILTERS LOADER -->
      <v-container 
        v-if="isFilterLoading" 
        class="d-flex align-center justify-center"
      >
        <data-loader  />
      </v-container>

      <!-- CARDS AND PAGINATION CONTAINER-->
      <v-container v-else>
        <!-- CARDS -->
        <v-container
          :class="style.cardContainer"
          class="d-flex flex-wrap justify-sm-center justify-md-start"
        >
          <v-card
            v-for="character in characters"
            :key="character._id"
            class="mx-5 my-5"
            width="200"
          >
            <v-img
              :src="character.imageUrl"
              height="200px"
              cover
            />

            <v-card-title>
              {{ character.name }}
            </v-card-title>

            <v-card-actions>
              <a :href="character.sourceUrl" target="_blank">
                <v-btn
                  color="indigo-darken-4"
                  variant="text"
                >
                  Find out more
                </v-btn>
              </a>
            </v-card-actions>
          </v-card>
        </v-container>

        <!-- PAGINATION -->
        <v-container v-if="paginationLength > 1" class="mb-10">
          <v-pagination
            v-model="pageNumber"
            :disabled="isPageLoading"
            :length="paginationLength"
            color="indigo-darken-4"
            rounded="circle"
          />
        </v-container>
      </v-container>

      <!-- FILTER NO DATA -->
      <v-container 
        v-if="!isAnyCharacterFetched && !isFilterResetting" 
        class="d-flex align-center justify-center"
      >
        <no-data>NO DATA FILTERED</no-data>
      </v-container>
    </v-container>

    <!-- MAIN NO DATA -->
    <v-container 
      v-else-if="isMainNoDataComponentVisible" 
      class="d-flex align-center justify-center"
    >
      <no-data>NO DATA FETCHED</no-data>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { useStore } from 'vuex'
import { debounce } from 'lodash';

import DataLoader from '../components/DataLoader.vue';
import NoData from '../components/NoData.vue';
import { formatSearchString } from '../utils';
import type { Character, FetchCharactersPayload } from '../typings';

const store = useStore();

const pageNumber = ref(1);

const isPageLoading: ComputedRef<boolean> = computed(() => store.state.isPageLoading);

watch(pageNumber, async () => {
  const payload: FetchCharactersPayload = {
    name: formatSearchString(searchedCharacterName.value),
    page: pageNumber.value,
    pageSize: itemsPerPage.value,
  };

  await store.dispatch('getChosenPage', payload);
  window.scrollTo(0, 0);
});

const isAnyCharacterFetched: ComputedRef<boolean> = computed(() => !!store.state.characters.length);
const characters: ComputedRef<Character[]> = computed(() => store.state.characters);
const isLoading: ComputedRef<boolean> = computed(() => store.state.isLoading);
const paginationLength: ComputedRef<number> = computed(() => store.state.totalPages);

//MAIN BUTTON FUNCTIONALITY

const wasFetchButtonEverClicked = ref(false);

const mainButtonCaption = computed(() => {
  return wasFetchButtonEverClicked.value
    ? 'Reset'
    : 'Fetch data'
});

const onReset = () => {
  store.commit('clearCharacters');
  clearFilterData();
  wasFetchButtonEverClicked.value = false;
  isFilteringActive.value = false;
};

const onFetchClick = async (): Promise<void> => {
  const payload: FetchCharactersPayload = {
    page: pageNumber.value,
    pageSize: itemsPerPage.value,
  };

  await store.dispatch('fetchCharacters', payload);
  wasFetchButtonEverClicked.value = true;
};

const debouncedOnFetchClick = debounce(onFetchClick, 300);

const mainButtonClickHandler = computed(() => {
  return wasFetchButtonEverClicked.value
    ? onReset
    : debouncedOnFetchClick
});

//FILTERING
const MAX_ITEM_QUANTITY_PER_PAGE = 50;
const MIN_ITEM_QUANTITY_PER_PAGE = 1;

const isFilteringActive = ref(false);
const isFilterResetting = ref(false);
const searchedCharacterName = ref('');
const itemsPerPage = ref(10);

const isFilterLoading = computed(() => store.state.isFilterLoading);

const clearFilterData = (): void => {
  itemsPerPage.value = 10;
  pageNumber.value = 1;
  searchedCharacterName.value = '';
};

const onQuantityInput = (event: InputEvent): void => {
  const quantity = Number((event.target as HTMLInputElement).value);

  if(quantity > 50) {
    itemsPerPage.value = 50;
  }

  if(quantity < 1) {
    itemsPerPage.value = 1;
  }
};

const onFilterClick = async (): Promise<void> => {
  isFilteringActive.value = true;

  const payload: FetchCharactersPayload = {
    name: formatSearchString(searchedCharacterName.value),
    pageSize: itemsPerPage.value,
  };

  await store.dispatch('filterCharacters', payload);
  pageNumber.value = 1;
};

const debouncedOnFilterClick = debounce(onFilterClick, 300);

const onFilterResetClick = async (): Promise<void> => {
  isFilterResetting.value = true;
  clearFilterData();

  const payload: FetchCharactersPayload = {
    name: formatSearchString(searchedCharacterName.value),
    pageSize: itemsPerPage.value,
  };

  await store.dispatch('filterCharacters', payload);
  isFilterResetting.value = false;
};

const debouncedOnFilterResetClick = debounce(onFilterResetClick, 300);

const isMainDataContainerVisible: ComputedRef<boolean> = computed(() => {
  return wasFetchButtonEverClicked.value && (isAnyCharacterFetched.value || isFilteringActive.value);
});

const isMainNoDataComponentVisible: ComputedRef<boolean> = computed(() => {
  return wasFetchButtonEverClicked.value && !isAnyCharacterFetched.value && !isFilteringActive.value;
});
</script>

<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/media';
@use '../scss/tokens';

.filterButtonContainer {
  @include media.mobile {
    flex-direction: column;
  }
}

.button.button {
  background: colors.$blue-gradient;

  font-family: fonts.$main-font;
  font-size: tokens.$font-size-default;
  color: colors.$white;

  @include media.mobile {
    width: 100%;
  }
}

.resetButton.resetButton {
  font-family: fonts.$main-font;
  font-size: tokens.$font-size-default;

  @include media.mobile {
    margin-top: 10px;
  }
}

.cardContainer {
  @include media.mobile {
    flex-direction: column;
    align-items: center;
  }
}

.sliderInput {
  width: 70px;
}
</style>
