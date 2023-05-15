<template>
  <v-main>
    <v-container class="d-flex align-center justify-center">
      <v-btn :class="style.button" @click="onFetchClick">
        Fetch data
      </v-btn>
    </v-container>

    <v-container 
      class="d-flex flex-wrap flex-sm-column flex-md-row align-sm-center justify-md-start"
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

import type { FetchCharactersPayload } from '../typings';

const store = useStore();

const itemsPerPage = ref(10);
const pageNumber = ref(1);

const characters = computed(() => store.state.characters);

const onFetchClick = (): void => {
  const payload: FetchCharactersPayload = {
    page: pageNumber.value,
    pageSize: itemsPerPage.value,
  };

  store.dispatch('fetchCharacters', payload);
}
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
}

.cardContainer {
  @include media.mobile {
    flex-direction: column;
    align-items: center;
  }
}
</style>
