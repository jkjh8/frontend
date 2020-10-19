<template>
  <v-container>
      <v-card>
          <v-card-title class="grey lighten-4">IP ADDRESS SETUP</v-card-title>
          <v-divider/>
          <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-title>IP Address</v-list-item-title>
                  <v-text-field hide-details label="IP"></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Net Mask</v-list-item-title>
                  <v-text-field hide-details></v-text-field>
                </v-list-item>
                <v-list-item class="mb-6">
                  <v-list-item-title>Gate Way</v-list-item-title>
                  <v-text-field hide-details></v-text-field>
                </v-list-item>
                <v-divider/>
                <v-list-item>
                    <v-list-item-title>Controller IP</v-list-item-title>
                    <v-text-field hide-details></v-text-field>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Controller Port</v-list-item-title>
                    <v-text-field hide-details></v-text-field>
                </v-list-item>
              </v-list>
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
export default {
  //
}
</script>
