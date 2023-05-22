<template>
  <b-card>
    <b-row>
      <b-col sm="12" md="6" lg="6">
        <div class="form-group form-row">
          <label for>{{ $t("docnumber") }}</label>
          <div class="col-sm-7">
            <span
              ><b> {{ WaitingListPropertyList.docnumber }}</b></span
            >
          </div>
        </div>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <div class="form-group form-row">
          <label for>{{ $t("docdate") }}</label>
          <div class="col-sm-7">
            <span
              ><b> {{ WaitingListPropertyList.docdate }}</b></span
            >
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col sm="12" md="12" lg="12">
        <b-table
          :fields="fieldsTable"
          :items="WaitingListPropertyList.Table"
          small
          class="text-center"
          :tbody-tr-class="rowClass"
        >
        </b-table>
      </b-col>
    </b-row>
    <!-- <b-row class="m-2">
      <b-col sm="12" md="12" >
        <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      striped
      no-border-collapse
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
    >
      <template #cell(status)="{ item }">
        <b-badge
          :variant="item.status == 'Утвержден' ? 'light-success' : item.status == 'Изменен' ? 'light-info' : item.status == 'Отменено' ? 'light-danger' : 'light-primary'"
        >
          {{ item.status }}
        </b-badge>
      </template>
    </b-table>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col class="text-right">
        <b-button
          v-if="
            $can('WaitingListPropertyApprove', 'permissions') &&
            WaitingListPropertyList.CanApprove
          "
          @click="OpenApproveModal"
          variant="outline-success"
          class="mr-1"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="
            $can('WaitingListPropertyCancelApproval', 'permissions') &&
            WaitingListPropertyList.CanCancelApprove
          "
          @click="OpenCancelApprovalModal"
          variant="outline-danger"
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
          <b-button variant="danger" @click="ApproveModal = false" class="mr-1">
            {{ $t("no") }}
          </b-button>
          <b-button @click="Approve" variant="success">
            <b-spinner v-if="ApproveLoading" small></b-spinner> {{ $t("yes") }}
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
      <!-- <b-row class="mb-2">
        <b-col>
          <label for=""> {{ $t("description") }} </label>
          <b-form-input
            :placeholder="$t('description')"
            v-model="Description"
          ></b-form-input>
        </b-col>
      </b-row> -->
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
  </b-card>
</template>
<script>
import WaitingListPropertyService from "@/services/document/waitinglistproperty.service";
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
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
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
    flatPickr,
    BFormInput,
    BTabs,
    BTab,
  },
  data() {
    return {
      WaitingListPropertyList: {},
      items: [],
      ApproveLoading: false,
      CancelApprovalLoading: false,
      ApproveModal: false,
      CancelApprovalModal: false,
      fieldsTable: [
        {
          key: "sequencenumber",
          label: this.$t("sequencenumber"),
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("person"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveoblastname",
          label: this.$t("liveoblast"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveregionname",
          label: this.$t("liveregion"),
          tdClass: "text-left",
          sortable: true,
        },
        {
          key: "liveaddress",
          label: this.$t("liveaddress"),
          tdClass: "text-left",
          sortable: true,
        },
      ],
    };
  },
  created() {
    WaitingListPropertyService.Get(this.$route.params.id)
      .then((res) => {
        this.WaitingListPropertyList = res.data;
        this.items = res.data.Tables;
        // this.Person = res.data.result.Children;
        // this.Guardian = res.data.result.Guardian;
      })
      .catch((err) => {
        this.$makeToast(err.response.data.error, "danger");
      });
  },
  methods: {
    OpenApproveModal() {
      this.ApproveModal = true;
    },
    Approve() {
      this.AcceptLoading = true;
      WaitingListPropertyService.Approve(this.$route.params.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.ApproveModal = false;
          setTimeout(() => {
            this.$router.push({ name: "waitinglistproperty" });
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
      WaitingListPropertyService.CancelApproval(this.$route.params.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.CancelApprovalModal = false;
          setTimeout(() => {
            this.$router.push({ name: "waitinglistproperty" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
          this.CancelLoading = false;
        });
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>