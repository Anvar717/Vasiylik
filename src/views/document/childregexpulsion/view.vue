<template>
  <div>
    <b-overlay :show="previewshow">
      <b-row>
        <b-col sm="12" md="9" lg="10">
          <b-card>
            <b-row>
              <b-col sm="12" md="6" lg="4">
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("docnumber") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.docnumber }} </b>
                    </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("docdate") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.docdate }} </b>
                    </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("detailinfo") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.detailinfo }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col sm="12" md="6" lg="4" v-if="ChildRegExpulsionList.hasdecision == true">
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("decisionsnumber") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.decisionsnumber }} </b>
                    </span>
                  </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("decisionsdate") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.decisionsdate }} </b>
                    </span>
                  </b-list-group-item>
                   <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("decisionsorgname") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.decisionsorgname }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col sm="12" md="6" lg="4">
                 <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("childexpulsiontypename") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.childexpulsiontypename }} </b>
                    </span>
                  </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("personname") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.personname }} </b>
                    </span>
                  </b-list-group-item>
                   <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("organizationname") }}: </span>
                    <span>
                      <b> {{ ChildRegExpulsionList.organizationname }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card>
          <b-card>
            <b-row>
              <b-col sm="12" md="6">
                <doc-history
                  :data="ChildRegExpulsionList.History"
                ></doc-history>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col sm="12" md="3" lg="2">
          <b-button
            v-if="
              $can('ChildRegistrationActApprove', 'permissions') &&
              ChildRegExpulsionList.CanApprove
            "
            @click="OpenApproveModal"
            variant="success"
            block
          >
            {{ $t("Approve") }}
          </b-button>
          <b-button
            v-if="
              $can('ChildRegistrationActCancelApproval', 'permissions') &&
              ChildRegExpulsionList.CanCancelApprove
            "
            @click="OpenCancelApprovalModal"
            variant="danger"
            block
          >
            {{ $t("CancelApproval") }}
          </b-button>
        </b-col>
      </b-row>
      <b-modal
        v-model="ApproveModal"
        no-close-on-backdrop
        hide-footer
        :title="$t('Approve')"
      >
        <h4>{{ $t("WantApprove") }}</h4>
        <b-row>
          <b-col class="text-right">
            <b-button
              variant="danger"
              @click="ApproveModal = false"
              class="mr-1"
            >
              {{ $t("no") }}
            </b-button>
            <b-button @click="Approve" variant="success">
              <b-spinner v-if="ApproveLoading" small></b-spinner>
              {{ $t("yes") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal
        v-model="CancelApprovalModal"
        no-close-on-backdrop
        hide-footer
        :title="$t('CancelApproval')"
      >
        <h4>{{ $t("WantCancelApproval") }}</h4>
        <b-row>
          <b-col class="text-right">
            <b-button
              variant="danger"
              @click="CancelApprovalModal = false"
              class="mr-1"
            >
              {{ $t("no") }}
            </b-button>
            <b-button @click="CancelApproval" variant="success">
              <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
              {{ $t("yes") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </b-overlay>
  </div>
</template>
<script>
import ChildRegExpulsionService from "@/services/document/childregexpulsion.service";
import {
  BRow,
  BCol,
  BCard,
  BButton,
  BSpinner,
  BModal,
  BTable,
  BBadge,
  BFormInput,
  BTabs,
  BTab,
  BAvatar,
  BOverlay,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";
import DocHistory from "../../components/DocHistory.vue";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSpinner,
    BTable,
    BModal,
    BBadge,
    BFormInput,
    BTabs,
    BTab,
    BAvatar,
    BOverlay,
    BListGroup,
    BListGroupItem,
    DocHistory,
  },
  data() {
    return {
      ChildRegExpulsionList: {},
      ApproveLoading: false,
      CancelApprovalLoading: false,
      ApproveModal: false,
      CancelApprovalModal: false,
      config: { dateFormat: "d.m.Y" },
      previewshow: false,
    };
  },
  created() {
    this.previewshow = true;
    ChildRegExpulsionService.Get(this.$route.params.id)
      .then((res) => {
        this.ChildRegExpulsionList = res.data;
        this.previewshow = false;
      })
      .catch((err) => {
        this.$makeToast(err.response.data.error, "danger");
      });
  },
  methods: {
    // DownLoad(item) {
    //   item.DownloadLoading = true;
    //   AdmImageService.Get(item.projectfileid)
    //     .then((res) => {
    //       item.DownloadLoading = false;
    //       this.downloadFile(res, item);
    //     })
    //     .catch((error) => {
    //       item.DownloadLoading = false;
    //       this.$makeToast(error.response.data.error, "danger");
    //     });
    // },
    // downloadFile(response, item) {
    //   var blob = new Blob([response.data]);
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", item.projectfiletext);
    //   document.body.appendChild(link);
    //   link.click();
    // },
    // Edit() {
    //   this.$router.push({
    //     name: "editadmregapplicationbyadmin",
    //     params: { id: this.$route.params.id },
    //   });
    // },
    OpenApproveModal() {
      this.ApproveModal = true;
    },
    Approve() {
      this.AcceptLoading = true;
      ChildRegExpulsionService.Approve(this.$route.params.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.ApproveModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childregexpulsion" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    OpenCancelApprovalModal() {
      this.CancelApprovalModal = true;
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      ChildRegExpulsionService.CancelApproval(this.$route.params.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.CancelApprovalModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childregexpulsion" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.spes-card .card-body {
  padding-bottom: 6px;
}
</style>