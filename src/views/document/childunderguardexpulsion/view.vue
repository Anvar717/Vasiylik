<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("departmentname") }}: </span>
                  <span>
                    <b>
                      {{ ChildUnderGuardExpulsion.childexpulsiontypename }}
                    </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("decisionsdate") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.decisionsdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("decisionsnumber") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.decisionsnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("decisionsorgname") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.decisionsorgname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("detailinfo") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.detailinfo }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.docdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.docnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("expulsiondate") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.expulsiondate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("organizationname") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.organizationname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("personname") }}: </span>
                  <span>
                    <b> {{ ChildUnderGuardExpulsion.personname }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-col
            sm="6"
            md="3"
            lg="2"
            v-for="(item, index) in ChildUnderGuardExpulsion.File"
            :key="index"
            v-show="item.Status != 3"
          >
            <b-card class="text-center">
              <b-avatar class="mb-1" variant="light-primary" size="45">
                <feather-icon size="21" icon="PaperclipIcon" />
              </b-avatar>
              <div class="truncate">
                <h3 class="mb-25 font-weight-bolder">
                  {{ item.projectfiletext }}
                </h3>
                <div>
                  <feather-icon
                    v-if="!item.DownloadLoading"
                    class="cursor-pointer mr-1"
                    @click="DownLoad(item)"
                    size="20"
                    icon="DownloadIcon"
                  ></feather-icon>
                  <b-spinner v-if="item.DownloadLoading" small></b-spinner>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          v-if="
            $can('ChildUnderGuardExpulsionApprove', 'permissions') &&
            ChildUnderGuardExpulsion.CanApprove
          "
          block
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="
            $can('ChildUnderGuardExpulsionCancelApproval', 'permissions') &&
            ChildUnderGuardExpulsion.CanCancelApprove
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
          {{ ChildUnderGuardExpulsion.personname }}
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
          {{ ChildUnderGuardExpulsion.personname }}
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
import ChildUnderGuardExpulsionService from "@/services/document/childunderguardexpulsion.service";
import DocHistory from "../../components/DocHistory.vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import AdmImageService from "@/services/others/admImage.service";
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
      ChildUnderGuardExpulsion: {},
      show: false,
      ApproveLoading: false,
      CancelApprovalLoading: false,
      DownloadLoading: false,
      SearchLoading: false,
      SearchFamilyLoading: false,
      lang: "ru",
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    DownLoad(item) {
      item.DownloadLoading = true;
      AdmImageService.Get(item.projectfileid)
        .then((res) => {
          item.DownloadLoading = false;
          this.downloadFile(res, item);
        })
        .catch((error) => {
          item.DownloadLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    downloadFile(response, item) {
      var blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.projectfiletext);
      document.body.appendChild(link);
      link.click();
    },
    Refresh() {
      this.show = true;
      ChildUnderGuardExpulsionService.GetDetail(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.ChildUnderGuardExpulsion = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },

    Approve() {
      this.ApproveLoading = true;
      ChildUnderGuardExpulsionService.Approve(this.ChildUnderGuardExpulsion.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
          this.$router.push({ name: `childunderguardexpulsion` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      ChildUnderGuardExpulsionService.CancelApproval(
        this.ChildUnderGuardExpulsion.id
      )
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
          this.$router.push({ name: `childunderguardexpulsion` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },
  },
};
</script>

<style>
</style>
