<template>
  <form>
    <v-alert :type="alertType" :value="errmsg" transition="scroll-y-transition">
      {{ this.alertMessage }}
    </v-alert>
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
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { ipAddress, required } from 'vuelidate/lib/validators'

export default {
  props: ['dhcp'],
  mixins: [validationMixin],
  validations: {
    ip: { ipAddress, required },
    nm: { ipAddress },
    gw: { ipAddress }
  },
  watch: {
    errmsg (val) {
      if (!val) return
      setTimeout(() => (this.errmsg = false), 2000)
    },
    playerSetup (value) {
      this.ip = this.playerSetup.ip
      this.nm = this.playerSetup.nm
      this.gw = this.playerSetup.gw
    }
  },
  data: () => ({
    ip: '',
    nm: '',
    gw: '',
    alertType: 'success',
    alertMessage: '',
    errmsg: false
  }),
  computed: {
    ...mapState(['playerSetup']),
    ipErrors () {
      const errors = []
      if (!this.$v.ip.$dirty) return errors
      !this.$v.ip.ipAddress && errors.push('Must be input ip address')
      !this.$v.ip.required && errors.push('Name is required.')
      return errors
    },
    nmErrors () {
      const errors = []
      if (!this.$v.nm.$dirty) return errors
      !this.$v.nm.ipAddress && errors.push('Must be input ip address')
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
    submit () {
      if (this.$v.$anyError === true) {
        this.alertType = 'error'
        this.alertMessage = 'Check your ip address!'
        this.errmsg = true
      } else {
        const rtdata = [
          { ip: this.ip },
          { nm: this.nm },
          { gw: this.gw }
        ]
        this.$store.commit('updateObjPlayerSetup', rtdata)
        this.alertType = 'success'
        this.alertMessage = 'Apply after reboot'
        this.errmsg = true
        this.$http.post('/setup', this.playerSetup)
      }
    }
  }
}
</script>
