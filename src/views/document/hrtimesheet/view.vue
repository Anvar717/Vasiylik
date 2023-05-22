<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("departmentname") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.departmentname }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("detailinfo") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.detailinfo }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.docdate }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.docnumber }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("formonth") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.formonth }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("organizationaccount") }}: </span>
                  <span>
                    <b> {{ HRTimeSheet.organizationaccount }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          v-if="
            $can('HRTimesheetApprove', 'permissions') && HRTimeSheet.CanApprove
          "
          block
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="
            $can('HRTimesheetCancelApproval', 'permissions') &&
            HRTimeSheet.CanCancelApprove
          "
          block
          @click="$refs['CancelApprovalModal'].show()"
          variant="danger"
        >
          {{ $t("CancelApproval") }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      :ref="'ApproveModal'"
      :title="$t('Approve')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Approve"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HRTimeSheet.personname }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantApprove") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'CancelApprovalModal'"
      :title="$t('CancelApproval')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="CancelApproval"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HRTimeSheet.personname }}
          <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantCancelApproval") }}</h5>
      </b-card-text>
    </b-modal>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
  BRow,
  BCol,
  BButton,
  BModal,
  BListGroup,
  BListGroupItem,
  BFormTextarea,
  BCardText,
  BCollapse,
  BFormInput,
  BFormFile,
  BAvatar,
  BSpinner,
  BFormCheckbox,
  BInputGroupAppend,
  BInputGroup,
  BTable,
} from "bootstrap-vue";
import HRTimeSheetService from "@/services/document/hrtimesheet.service";
import DocHistory from "../../components/DocHistory.vue";
import ChildRegActComponent from "../childregistrationact/view.vue";
import ChildRegGuardinshipComponent from "../childunderguardianship/view.vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
export default {
  components: {
    BOverlay,
    BCard,
    BRow,
    BCol,
    BButton,
    BModal,
    BListGroup,
    BListGroupItem,
    DocHistory,
    BFormTextarea,
    BCardText,
    BCollapse,
    ChildRegActComponent,
    ChildRegGuardinshipComponent,
    CustomDatePicker,
    BFormInput,
    BFormFile,
    BAvatar,
    BSpinner,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    BTable,
  },
  data() {
    return {
      HRTimeSheet: {},
      show: false,
      ApproveLoading: false,
      CancelApprovalLoading: false,
      SearchLoading: false,
      SearchFamilyLoading: false,
      lang: "ru",
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.show = true;
      HRTimeSheetService.GetDetail(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HRTimeSheet = res.data.HRTimeSheet;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },

    Approve() {
      this.ApproveLoading = true;
      HRTimeSheetService.Approve(this.HRTimeSheet.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
          this.$router.push({ name: `hrtimesheet` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      HRTimeSheetService.CancelApproval(this.HRTimeSheet.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
          this.$router.push({ name: `hrtimesheet` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },

    // Delete() {
    //   this.DeleteLoading = true;
    //   HousingQueueService.Delete(this.HousingQueue.id)
    //     .then((res) => {
    //       this.DeleteLoading = false;
    //       this.Refresh();
    //       this.$router.push({ name: "housingqueue" });
    //       this.$makeToast(this.$t("DeleteSuccess"), "success");
    //     })
    //     .catch((error) => {
    //       this.$makeToast(error.response.data.error, "danger");
    //       this.DeleteLoading = false;
    //     });
    // },
  },
};
</script>

<style>
</style>
