<template>
<v-card
  class="mx-5 my-5"
  width="200"
>
  <v-img
    :src="imageUrl"
    height="200px"
    cover
  />

  <v-card-title>
    {{ name }}
  </v-card-title>
  
  <v-card-actions>
    <a :href="sourceUrl" target="_blank">
      <v-btn
        color="indigo-darken-4"
        variant="text"
      >
        Find out more
      </v-btn>
    </a>
  </v-card-actions>
</v-card>
</template>

<script lang="ts" setup>
defineProps<{
  imageUrl: string;
  name: string;
  sourceUrl: string;
}>();
</script>