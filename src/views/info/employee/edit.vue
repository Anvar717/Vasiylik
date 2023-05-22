<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col>
          <hr-acceptance-work-component
            :iscomponent="true"
            :person-data="Person"
            :is-student="false"
            ref="personcomp"
            @persondatachange="persondatachange($event)"
          ></hr-acceptance-work-component>
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-2">
        <b-col sm="12" md="12" lg="12" class="text-right">
          <b-button
            @click="SaveDataEmployee"
            size="sm"
            variant="outline-success"
          >
            <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTabs,
  BTab,
  BButton,
  BTable,
  BLink,
  BFormGroup,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BFormCheckbox,
  BAlert,
  BInputGroupAppend,
  BInputGroup,
  BTr,
  BTd,
  BPagination,
} from "bootstrap-vue";
import HrAcceptanceWorkComponent from "@/views/components/HrAcceptanceWorkComponent.vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import PersonService from "@/services/others/person.service";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BTable,
    BLink,
    flatPickr,
    BFormGroup,
    BModal,
    BCardText,
    BFormCheckbox,
    BAlert,
    BInputGroupAppend,
    BInputGroup,
    BTr,
    BTd,
    BPagination,
    HrAcceptanceWorkComponent,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      lang: "uz_latn",
      config: {
        dateFormat: "d.m.Y",
      },
      Person: {},
    };
  },
  created() {
    PersonService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.Person = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
  },
  computed: {},
  directives: {
    Ripple,
  },
  methods: {
    persondatachange(data) {
      this.Person = data;
    },
    SaveDataEmployee() {
      PersonService.Update(this.Person , this.Person.employeetypeid = 3)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `employee` });
          this.Refresh();
          console.log(this.Person);
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
