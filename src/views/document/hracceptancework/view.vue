<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("detailinfo") }}: </span>
                  <span>
                    <b> {{ HrAcceptanceWork.detailinfo }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ HrAcceptanceWork.docnumber }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ HrAcceptanceWork.docdate }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          v-if=" $can('HrAcceptanceWorkApprove', 'permissions') && HrAcceptanceWork.CanApprove"
          block
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
         v-if="$can('HrAcceptanceWorkCancelApproval', 'permissions') && HrAcceptanceWork.CanCancelApprove"
          block
          @click="$refs['CancelApprovalModal'].show()"
          variant="danger"
        >
          {{ $t("CancelApproval") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col
              v-for="(item, index) in HrAcceptanceWork.Tables"
              :key="index"
              sm="12"
              md="6"
              lg="6"
              class="mb-2"
            >
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("departmentname") }}: </span>
                  <span>
                    <b> {{ item.departmentname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("employmenttype") }}: </span>
                  <span>
                    <b> {{ item.employmenttype }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("fromdepartmentname") }}: </span>
                  <span>
                    <b> {{ item.fromdepartmentname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("frompositionidname") }}: </span>
                  <span>
                    <b> {{ item.frompositionidname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("hrempappointordertypename") }}: </span>
                  <span>
                    <b> {{ item.hrempappointordertypename }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("personname") }}: </span>
                  <span>
                    <b> {{ item.personname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("positionidname") }}: </span>
                  <span>
                    <b> {{ item.positionidname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("startdate") }}: </span>
                  <span>
                    <b> {{ item.startdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("workschedulename") }}: </span>
                  <span>
                    <b> {{ item.workschedulename }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
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
          {{ HrAcceptanceWork.personname }}
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
          {{ HrAcceptanceWork.personname }}
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
import HrAcceptanceWorkService from "@/services/document/hracceptancework.service";
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
      HrAcceptanceWork: {},
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
      HrAcceptanceWorkService.GetDetail(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HrAcceptanceWork = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },

    Approve() {
      this.ApproveLoading = true;
      HrAcceptanceWorkService.Approve(this.HrAcceptanceWork.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
          this.$router.push({ name: `hracceptancework` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      HrAcceptanceWorkService.CancelApproval(this.HrAcceptanceWork.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
          this.$router.push({ name: `hracceptancework` });
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
