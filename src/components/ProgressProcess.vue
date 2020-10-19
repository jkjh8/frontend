<template>
  <v-card color="rgb(0, 0, 0, 0)" flat>
    <v-card-title>
      PROCESSING...
    </v-card-title>
    <v-card-text>
      <v-container class="text-center">
        <v-progress-circular
          size="150"
          width="10"
          color="primary"
          indeterminate
        >
        </v-progress-circular>
      </v-container>
    </v-card-text>
  </v-card>
</template>
