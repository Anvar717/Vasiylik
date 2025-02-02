<template>
  <b-card no-body>
    <div class="m-2">
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <label>{{ $t("Entries") }}</label>
          <v-select
            v-model="filter.perPage"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="filter.perPageOptions"
            :clearable="false"
            @input="Refresh"
            class="per-page-selector d-inline-block ml-50 mr-1"
          />
          <b-button
            variant="primary"
            :to="{ name: 'EditChildListToFamily', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button>
        </b-col>
        <b-col md="2"></b-col>
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="Refresh" variant="primary">
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="SortChange"
    >
      <template #cell(statusname)="{ item }">
        <b-badge
          :variant="
            item.statusname == 'Отменено'
              ? 'light-danger'
              : item.statusname == 'Изменен'
              ? 'light-primary'
              : item.statusname == 'Создан'
              ? 'light-primary'
              : 'light-success'
          "
        >
          {{ item.statusname }}
        </b-badge>
      </template>
      <template v-slot:table-busy>
        <div
          class="text-center text-primary my-2"
          style="vertical-align: middle"
        >
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>{{ $t("Loading") }}</strong>
        </div>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{ name: 'EditChildListToFamily', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
            v-if="
              $can('ChildListToFamilyEdit', 'permissions') &&
              item.statusid !== 2
            "
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['ApproveModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Approve')"
            v-if="
              $can('ChildListToFamilyApprove', 'permissions') &&
              item.statusid !== 2
            "
            style="margin-right: 5px"
          >
            <feather-icon icon="CheckCircleIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['CancelModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('CancelApproval')"
            v-if="$can('ChildListToFamilyCancelApproval', 'permissions')"
            style="margin-right: 5px"
          >
            <feather-icon icon="XCircleIcon"></feather-icon>
          </b-link>
          <b-link
            :to="{
              name: 'ChildListToFamilyView',
              params: { id: item.id },
            }"
            v-b-tooltip.hover.top="$t('View')"
            style="margin-right: 5px"
          >
            <feather-icon icon="EyeIcon"></feather-icon>
          </b-link>
          <b-link
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
            v-if="
              $can('ChildListToFamilyDelete', 'permissions') &&
              item.statusid !== 2
            "
          >
            <feather-icon icon="Trash2Icon"></feather-icon>
          </b-link>
        </div>
        <b-modal
          :ref="'DeleteModal' + item.id"
          :title="$t('Delete')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Delete(item)"
        >
          <b-card-text>
            <h5>ID : {{ item.id }}</h5>
            <h5>{{ $t("WantDelete") }}</h5>
          </b-card-text>
        </b-modal>
        <b-modal
          :ref="'ApproveModal' + item.id"
          :title="$t('Approve')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="Approve(item)"
        >
          <b-card-text>
            <!-- <h5> {{ $t('admissiontype') }} :  {{ item.admissiontypename }} </h5> -->
            <h5>{{ $t("WantApprove") }}</h5>
          </b-card-text>
        </b-modal>
        <b-modal
          :ref="'CancelModal' + item.id"
          :title="$t('Approve')"
          :cancel-title="$t('Cancel')"
          :ok-title="$t('Accept')"
          cancel-variant="danger"
          ok-variant="success"
          @ok="CancelApprove(item)"
        >
          <b-card-text>
            <!-- <h5> {{ $t('admissiontype') }} :  {{ item.admissiontypename }} </h5> -->
            <h5>{{ $t("WantCancel") }}</h5>
          </b-card-text>
        </b-modal>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-start
          "
        >
          <span class="text-muted"
            >{{ $t("Showing") }} {{ firstNumber }} {{ $t("to") }}
            {{ lastNumber }} {{ $t("of") }} {{ filter.totalRows }}
            {{ $t("entries") }}</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
            v-model="filter.currentPage"
            :total-rows="filter.totalRows"
            :per-page="filter.perPage"
            first-number
            last-number
            @input="Refresh"
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import {
  BButton,
  BPagination,
  BTable,
  BCol,
  BLink,
  BRow,
  BSpinner,
  BCard,
  BTooltip,
  BModal,
  BBadge,
  BInputGroup,
  BCardText,
  BFormInput,
  BInputGroupAppend,
  VBTooltip,
} from "bootstrap-vue";
import ChildListToFamilyService from "@/services/document/childlisttofamily.service";
export default {
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BCardText,
    BRow,
    BSpinner,
    BCard,
    BModal,
    BTooltip,
    BLink,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: this.$t("id"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docdate",
          label: this.$t("docdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "docnumber",
          label: this.$t("UniqueCode"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("Person"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gendername"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationalityname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "statusname",
          label: this.$t("statusname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      filter: {
        Search: "",
        Sort: "",
        Order: "asc",
        currentPage: 1,
        perPage: 20,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
    };
  },
  computed: {
    firstNumber() {
      return (this.filter.currentPage - 1) * this.filter.perPage + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.perPage) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.currentPage * this.filter.perPage >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.currentPage * this.filter.perPage;
        }
      }
    },
  },
  created() {
    this.Refresh();
  },
  methods: {
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      ChildListToFamilyService.GetList(
        this.filter.Search,
        this.filter.Sort,
        this.filter.Order,
        this.filter.currentPage,
        this.filter.perPage
      ).then((res) => {
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
        this.isBusy = false;
      });
    },
    Approve(item) {
      this.ApproveLoading = true;
      ChildListToFamilyService.Approve(item.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
        })
        .catch((error) => {
          this.ApproveLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    CancelApprove(item) {
      this.CancelApproveLoading = true;
      ChildListToFamilyService.CancelApproval(item.id)
        .then((res) => {
          this.CancelLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
        })
        .catch((error) => {
          this.CancelLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    Delete(item) {
      this.DeleteLoading = true;
      ChildListToFamilyService.Delete(item.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("DeleteSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.DeleteLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/libs/vue-select.scss";
.per-page-selector {
  width: 90px;
}

.invoice-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>
