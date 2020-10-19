<template>
  <v-container>
      <v-card>
          <v-card-title class="grey lighten-4">IP ADDRESS SETUP
            <v-spacer/>
            <v-switch v-model="dhcp" label="DHCP" hide-details></v-switch>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <form>
              <v-text-field
                v-model="ip"
                :error-messages="ipErrors"
                label="IP Address"
                @input="$v.ip.$touch()"
                @blur="$v.ip.$touch()"
                :disabled="dhcp"
              ></v-text-field>
              <v-text-field
                v-model="nm"
                :error-messages="nmErrors"
                label="Net Mask"
                @input="$v.nm.$touch()"
                @blur="$v.nm.$touch()"
                :disabled="dhcp"
              ></v-text-field>
              <v-text-field
                v-model="gw"
                :error-messages="gwErrors"
                label="Gate Way"
                @input="$v.gw.$touch()"
                @blur="$v.gw.$touch()"
                :disabled="dhcp"
              ></v-text-field>
              <v-spacer/>
              <v-btn class="mr-4" @click="submit" :disabled="dhcp">SUBMIT</v-btn>
            </form>
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { ipAddress, required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    ip: { ipAddress, required },
    nm: { ipAddress, required },
    gw: { ipAddress }
  },
  data: () => ({
    dhcp: false,
    ip: '',
    nm: '',
    gw: ''
  }),
  computed: {
    ipErrors () {
      const errors = []
      if (!this.$v.ip.$dirty) return errors
      !this.$v.ip.ipAddress && errors.push('Must be input ip address')
      !this.$v.ip.required && errors.push('Ip address is required')
      return errors
    },
    nmErrors () {
      const errors = []
      if (!this.$v.nm.$dirty) return errors
      !this.$v.nm.ipAddress && errors.push('Must be input ip address')
      !this.$v.nm.required && errors.push('Ip address is required')
      return errors
    },
    gwErrors () {
      const errors = []
      if (!this.$v.gw.$dirty) return errors
      !this.$v.gw.ipAddress && errors.push('Must be input gate way')
      return errors
    }
  },
  methods: {
    submit (value) {
      this.$v.$touch()
    }
  }
}
</script>
