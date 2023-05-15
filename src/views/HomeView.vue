<template>
  <v-main>
    <v-container class="d-flex align-center justify-center">
      <v-btn :class="style.button" @click="mainButtonClickHandler">
        {{ mainButtonCaption }}
      </v-btn>
    </v-container>

    <v-container v-if="isAnyCharacterFetched">
      <v-form validate-on="submit" @submit.prevent="onFilter">
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
              ></v-text-field>
            </template>
          </v-slider>

          <v-card-actions class="d-flex align-center justify-center mt-5">
            <v-btn type="submit" :class="style.button">
              Filter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>

    <v-container 
      class="d-flex flex-wrap justify-sm-center justify-md-start"
      :class="style.cardContainer"
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
  </v-main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import { debounce } from 'lodash';

import type { FetchCharactersPayload } from '../typings';

const store = useStore();

const MAX_ITEM_QUANTITY_PER_PAGE = 50;
const MIN_ITEM_QUANTITY_PER_PAGE = 1;

const itemsPerPage = ref(10);
const pageNumber = ref(1);

const searchedCharacterName = ref('');

const characters = computed(() => store.state.characters);

const isAnyCharacterFetched = computed(() => store.state.characters.length);

const mainButtonCaption = computed(() => {
  return isAnyCharacterFetched.value
    ? 'Reset'
    : 'Fetch data'
});

const onReset = () => {
  store.commit('clearCharacters');
};

const onFetchClick = (): void => {
  const payload: FetchCharactersPayload = {
    page: pageNumber.value,
    pageSize: itemsPerPage.value,
  };

  store.dispatch('fetchCharacters', payload);
};

const debouncedOnFetchClick = debounce(onFetchClick, 300);

const mainButtonClickHandler = computed(() => {
  return isAnyCharacterFetched.value
    ? onReset
    : debouncedOnFetchClick
});

const onQuantityInput = (event: InputEvent) => {
  const quantity = Number((event.target as HTMLInputElement).value);

  if(quantity > 50) {
    itemsPerPage.value = 50;
  }

  if(quantity < 1) {
    itemsPerPage.value = 1;
  }
};

const onFilter = () => {
  //TODO: FILTER HANDLING
  console.log('filter');
};
</script>

<style lang="scss" module="style">
@use '../scss/colors';
@use '../scss/fonts';
@use '../scss/media';
@use '../scss/tokens';

.button.button {
  background: colors.$blue-gradient;

  font-family: fonts.$main-font;
  font-size: tokens.$font-size-default;
  color: colors.$white;

  @include media.mobile {
    width: 100%;
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
