<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("educationplacetypeid") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.childstudytypename }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("decisionsdate") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.decisionsdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("decisionsnumber") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.decisionsnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.docdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("pensionamount") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.pensionamount }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.docnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("guardianaddress") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.guardianaddress }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("guardianname") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.guardianname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("guardianshiptypename") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.guardianshiptypename }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("personname") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.personname }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("healthtypename") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.healthtypename }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("livingcondition") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.livingconditionname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("livingconditiontext") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.livingconditiontext }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("monitoringpersonname") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.monitoringpersonname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("phonenumber") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.phonenumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("trainingname") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.trainingname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("upcomingmonitoringdate") }}: </span>
                  <span>
                    <b> {{ ChildMonitoring.upcomingmonitoringdate }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <!-- <b-button
            :variant="ChildRegActCollapse ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeChildRegAct"
          >
            {{ $t("childrenregact") }}
          </b-button> -->
          <b-button
            :variant="
              ChildRegGuardinshipCollapse ? 'primary' : 'outline-primary'
            "
            class="mr-1"
            @click="ChangeChildRegGuardinship"
          >
            {{ $t("childrenregact") }}
          </b-button>
        </b-card>
        <b-card v-if="ChildRegGuardinshipCollapse">
          <b-collapse :visible="ChildRegGuardinshipCollapse">
            <child-reg-guardinship-component
              v-if="ChildRegGuardinshipCollapse"
              :iscomponent="true"
              :id="ChildMonitoring.childunderguardianshipid"
            ></child-reg-guardinship-component>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          block
          v-if="
            ChildMonitoring.CanApprove &&
            $can('ChildMonitoringApprove', 'permissions')
          "
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildMonitoring.CanCancelApprove &&
            $can('ChildMonitoringCancelApproval', 'permissions')
          "
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
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Approve"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildMonitoring.id }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantApprove") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'CancelApprovalModal'"
      :title="$t('CancelApproval')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="CancelApproval"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildMonitoring.id }}
          <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
        </h5>
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
import ChildMonitoringService from "@/services/document/childmonitoring.service";
import DocHistory from "../../components/DocHistory.vue";
import ChildRegActComponent from "../childregistrationact/view.vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildRegGuardinshipComponent from "../childunderguardianship/view.vue";
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
    CustomDatePicker,
    BFormInput,
    BFormFile,
    BAvatar,
    BSpinner,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    BTable,
    ChildRegGuardinshipComponent,
  },
  data() {
    return {
      show: false,
      ChildMonitoring: {},
      ChildRegActCollapse: false,
      ChildRegGuardinshipCollapse: false,
      ApproveLoading: false,
      CancelApprovalLoading: false,
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.show = true;
      ChildMonitoringService.GetDetail(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.ChildMonitoring = res.data.childmonitoringid.childMonitoring;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      ChildMonitoringService.Approve(this.ChildMonitoring.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
           this.$router.push({ name  : 'childmonitoring' })
          this.$makeToast(this.$t("ApproveSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      ChildMonitoringService.CancelApproval(
        this.ChildMonitoring.id
      )
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$router.push({ name  : 'childmonitoring' })
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },
    ChangeChildRegGuardinship() {
      this.ChildRegGuardinshipCollapse = !this.ChildRegGuardinshipCollapse;
      this.ChildRegActCollapse = false;
    },
    //  ChangeChildRegAct() {
    //   this.ChildRegActCollapse = !this.ChildRegActCollapse;
    //   this.ChildRegGuardinshipCollapse = false;
    // },
  },
};
</script>

<style>
</style>
