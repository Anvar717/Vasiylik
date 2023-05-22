<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.docnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.docdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("detailinfo") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.detailinfo }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <!-- <h3> {{ $t('toorganization') }} </h3>
                            <hr> -->
              <b-list-group>
                <b-list-group-item class="text-center">
                  <h3 class="m-0 p-0">
                    <feather-icon size="20" icon="ArrowUpIcon"></feather-icon>
                    {{ $t("OutOrg") }}
                  </h3>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("fromoblastname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.fromoblastname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("fromregionname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.fromregionname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("fromorganizationname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.fromorganizationname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("personname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.personname }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="text-center">
                  <h3 class="m-0 p-0">
                    <feather-icon size="20" icon="ArrowDownIcon"></feather-icon>
                    {{ $t("InOrg") }}
                  </h3>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("tooblastname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.tooblastname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("toregionname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.toregionname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("toorganizationname") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.toorganizationname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("expulsiondate") }}: </span>
                  <span>
                    <b> {{ ChildOrphanageMovement.expulsiondate }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card>
          <b-row>
            <b-col sm="12" md="6">
              <doc-history :data="ChildOrphanageMovement.History"></doc-history>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanCancelApproval &&
            $can('ChildOrphanageMovementCancelApproval', 'permissions')
          "
          @click="$refs['CancelApprovalModal'].show()"
          variant="danger"
        >
          {{ $t("CancelApproval") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanDelete &&
            $can('ChildOrphanageMovementDelete', 'permissions')
          "
          @click="$refs['DeleteModal'].show()"
          variant="danger"
        >
          {{ $t("Delete") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanApprove &&
            $can('ChildOrphanageMovementApprove', 'permissions')
          "
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanSend &&
            $can('ChildOrphanageMovementSend', 'permissions')
          "
          @click="$refs['SendModal'].show()"
          variant="info"
        >
          {{ $t("Send") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanAccept &&
            $can('ChildOrphanageMovementAccept', 'permissions')
          "
          @click="$refs['AcceptModal'].show()"
          variant="success"
        >
          {{ $t("Accept") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanCancel &&
            $can('ChildOrphanageMovementCancel', 'permissions')
          "
          @click="$refs['CancelModal'].show()"
          variant="danger"
        >
          {{ $t("Cancel") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanReject &&
            $can('ChildOrphanageMovementReject', 'permissions')
          "
          @click="$refs['RejectModal'].show()"
          variant="danger"
        >
          {{ $t("Reject") }}
        </b-button>
        <b-button
          block
          v-if="
            ChildOrphanageMovement.CanPermit &&
            $can('ChildOrphanageMovementPermit', 'permissions')
          "
          @click="$refs['PermitModal'].show()"
          variant="primary"
        >
          {{ $t("Permit") }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      :ref="'SendModal'"
      :title="$t('Send')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Send"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="SendLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantSend") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'PermitModal'"
      :title="$t('Permit')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Permit"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="PermitLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantPermit") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'RejectModal'"
      :title="$t('Reject')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Reject"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="RejectLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantReject") }}</h5>
        <label for=""> {{ $t("description") }} </label>
        <b-form-textarea v-model="description"></b-form-textarea>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'CancelModal'"
      :title="$t('Cancel')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Cancel"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="CancelLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantCancel") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'AcceptModal'"
      :title="$t('Accept')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Accept"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="AcceptLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantAccept") }}</h5>
      </b-card-text>
    </b-modal>
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
          ID : {{ ChildOrphanageMovement.id }}
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
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantCancelApproval") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'DeleteModal'"
      :title="$t('Delete')"
      :cancel-title="$t('Cancel')"
      :ok-title="$t('Accept')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Delete"
    >
      <b-card-text>
        <h5>
          ID : {{ ChildOrphanageMovement.id }}
          <b-spinner v-if="DeleteLoading" small></b-spinner>
        </h5>
        <h5>{{ $t("WantDelete") }}</h5>
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
} from "bootstrap-vue";
import ChildOrphanageMovementService from "@/services/document/childorphanagemovement.service";
import DocHistory from "../../components/DocHistory.vue";
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
  },
  data() {
    return {
      ChildOrphanageMovement: {},
      show: false,
      ApproveLoading: false,
      CancelApprovalLoading: false,
      SendLoading: false,
      AcceptLoading: false,
      CancelLoading: false,
      description: "",
      RejectLoading: false,
      PermitLoading: false,
      DeleteLoading: false,
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.show = true;
      ChildOrphanageMovementService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.ChildOrphanageMovement = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      ChildOrphanageMovementService.Approve(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    Permit() {
      this.PermitLoading = true;
      ChildOrphanageMovementService.Permit(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.PermitLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("PermitSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.PermitLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      ChildOrphanageMovementService.CancelApproval(
        this.ChildOrphanageMovement.id
      )
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },
    Delete() {
      this.DeleteLoading = true;
      ChildOrphanageMovementService.Delete(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.Refresh();
          this.$router.push({ name: "childorphanagemovement" });
          this.$makeToast(this.$t("DeleteSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.DeleteLoading = false;
        });
    },
    Send() {
      this.SendLoading = true;
      ChildOrphanageMovementService.Send(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.SendLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("SendSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.SendLoading = false;
        });
    },
    Accept() {
      this.AcceptLoading = true;
      ChildOrphanageMovementService.Accept(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.AcceptLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("AcceptSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.AcceptLoading = false;
        });
    },
    Cancel() {
      this.CancelLoading = true;
      ChildOrphanageMovementService.Cancel(this.ChildOrphanageMovement.id)
        .then((res) => {
          this.CancelLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelLoading = false;
        });
    },
    Reject() {
      this.RejectLoading = true;
      ChildOrphanageMovementService.Cancel(
        this.ChildOrphanageMovement.id,
        this.description
      )
        .then((res) => {
          this.RejectLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("RejectSuccess"), "success");
          this.$router.push({ name: `childorphanagemovement` });
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.RejectLoading = false;
        });
    },
  },
};
</script>

<style>
</style>