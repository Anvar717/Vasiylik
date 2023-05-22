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
            class="mr-1"
            :to="{ name: 'EditUserMessageTemplate', params: { id: 0 } }"
          >
            <feather-icon icon="PlusIcon"></feather-icon> {{ $t("create") }}
          </b-button>
          <!-- <b-button variant="success" @click="OpenSendBulkMessage">
            <feather-icon icon="MailIcon"></feather-icon>
            {{ $t("SendBulkMessage") }}
          </b-button> -->
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
    <b-modal
      size="lg"
      v-model="SendbulkMessageModal"
      no-close-on-backdrop
      hide-footer
      :title="$t('SendBulkMessage')"
    >
      <div v-if="!isViewSendMessage">
        <b-row>
          <b-col sm="12" md="6" class="pb-1">
            <label for=""> {{ $t("Oblast") }} </label>
            <v-select
              :options="OblastList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="BulkMessage.oblastId"
              @input="ChangeOblast"
            ></v-select>
          </b-col>
          <b-col sm="12" md="6" class="pb-1">
            <label for=""> {{ $t("Region") }} </label>
            <v-select
              :options="RegionList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="BulkMessage.regionId"
              @input="ChangeRegion"
            ></v-select>
          </b-col>
          <b-col sm="12" md="12" class="pb-1">
            <label for=""> {{ $t("admissiontype") }} </label>
            <v-select
              :options="AdmissionTypeList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="shortname"
              v-model="BulkMessage.admissionTypeId"
              @input="ChangeAdmissionType"
            ></v-select>
          </b-col>
          <b-col sm="12" md="6" class="pb-1">
            <label for=""> {{ $t("quotatype") }} </label>
            <v-select
              :options="QuotaTypeList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="shortname"
              v-model="BulkMessage.quotaTypeId"
              @input="ChangeQuotatype"
            ></v-select>
          </b-col>
          <b-col sm="12" md="6" class="pb-1">
            <label for=""> {{ $t("status") }} </label>
            <v-select
              :options="StatusList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="BulkMessage.statusId"
              @input="ChangeStatus"
            ></v-select>
          </b-col>
          <b-col sm="12" md="12" class="pb-1">
            <label for=""> {{ $t("educationlanguage") }} </label>
            <v-select
              :options="EducationLanguageList"
              :reduce="(item) => item.id"
              :placeholder="$t('ChooseBelow')"
              label="name"
              v-model="BulkMessage.educationLanguageId"
              @input="ChangeEducationLanguage"
            ></v-select>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <label for=""> {{ $t("title") }} </label>
            <b-form-input v-model="BulkMessage.title"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <label for=""> {{ $t("webText") }} </label>
            <b-form-textarea v-model="BulkMessage.webText"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <label for=""> {{ $t("smsText") }} </label>
            <b-form-textarea v-model="BulkMessage.smsText"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <label for=""> {{ $t("mobileText") }} </label>
            <b-form-textarea v-model="BulkMessage.mobileText"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <!-- <label for=""> {{ $t("isautoqueue") }} </label> -->
            <b-form-checkbox v-model="BulkMessage.isautoqueue"> {{ $t("isautoqueue") }} </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-right">
            <b-button
              @click="SendbulkMessageModal = false"
              variant="danger"
              class="mr-1"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" @click="CountBulkMessage">
              <b-spinner v-if="CountBulkMessageLoading" small></b-spinner>
              {{ $t("CountBulkMessage") }}
            </b-button>
          </b-col>
        </b-row>
      </div>
      <div v-if="isViewSendMessage">
        <b-row>
          <b-col sm="12" md="6">
            <table>
              <tr>
                <td style="width: 50%">
                  <b> {{ $t("Oblast") }} : </b>
                </td>
                <td>
                  <span> {{ BulkMessage.oblastname }} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <b> {{ $t("quotatype") }} : </b>
                </td>
                <td>
                  <span> {{ BulkMessage.quotaTypename }} </span>
                </td>
              </tr>
            </table>
          </b-col>
          <b-col sm="12" md="6" class="mb-1">
            <table>
              <tr>
                <td>
                  <b> {{ $t("region") }} : </b>
                </td>
                <td>
                  <span> {{ BulkMessage.regionname }} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <b> {{ $t("status") }} : </b>
                </td>
                <td>
                  <b-badge variant="primary">
                    {{ BulkMessage.statusname }}
                  </b-badge>
                </td>
              </tr>
              <tr>
                <td style="width: 30%">
                  <b> {{ $t("educationlanguage") }} : </b>
                </td>
                <td>
                  <span> {{ BulkMessage.educationlanguagename }} </span>
                </td>
              </tr>
            </table>
          </b-col>
          <b-col sm="12">
            <table>
              <tr>
                <td class="pb-1">
                  <b> {{ $t("title") }} : </b>
                </td>
                <td class="pb-1">
                  <span> {{ BulkMessage.title }} </span>
                </td>
              </tr>
              <tr>
                <td class="pb-1">
                  <b> {{ $t("webText") }} : </b>
                </td>
                <td class="pb-1">
                  <span> {{ BulkMessage.webText }} </span>
                </td>
              </tr>
              <tr>
                <td class="pb-1">
                  <b> {{ $t("smsText") }} : </b>
                </td>
                <td class="pb-1">
                  <span> {{ BulkMessage.smsText }} </span>
                </td>
              </tr>
              <tr>
                <td class="pb-1">
                  <b> {{ $t("mobileText") }} : </b>
                </td>
                <td class="pb-1">
                  <span> {{ BulkMessage.mobileText }} </span>
                </td>
              </tr>
              <tr>
                <td style="width: 30%">
                  <b> {{ $t("SendSmsCount") }} : </b>
                </td>
                <td>
                  <span> {{ BulkMessage.count }} </span>
                </td>
              </tr>
              
            </table>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col class="text-right">
            <b-button
              @click="SendbulkMessageModal = false"
              variant="danger"
              class="mr-1"
            >
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" @click="SendBulkMessage">
              <b-spinner v-if="SendBulkMessageLoading" small></b-spinner>
              {{ $t("SendBulkMessage") }}
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-table
      ref="refInvoiceListTable"
      :items="items"
      responsive
      :fields="fields"
      primary-key="id"
      sticky-header="65vh"
      striped
      no-border-collapse
      :busy="isBusy"
      show-empty
      :empty-text="$t('NotFound')"
      class="position-relative"
      @sort-changed="SortChange"
    >
      <template #cell(status)="{ item }">
        <b-badge
          :variant="
            item.status == 'Утвержден'
              ? 'light-success'
              : item.status == 'Изменен'
              ? 'light-info'
              : item.status == 'Отменено'
              ? 'light-danger'
              : 'light-primary'
          "
        >
          {{ item.status }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <div class="text-center">
          <b-link
            :to="{ name: 'EditUserMessageTemplate', params: { id: item.id } }"
            v-b-tooltip.hover.top="$t('Edit')"
            style="margin-right: 5px"
          >
            <feather-icon icon="EditIcon"></feather-icon>
          </b-link>
          <b-link
            style="margin-right: 5px"
            @click="$refs['DeleteModal' + item.id].show()"
            v-b-tooltip.hover.top="$t('Delete')"
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
            <h5>{{ $t("admissiontype") }} : {{ item.admissiontypename }}</h5>
            <h5>{{ $t("WantDelete") }}</h5>
          </b-card-text>
        </b-modal>
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
  BRow,
  BSpinner,
  BCard,
  BTooltip,
  BBadge,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  VBTooltip,
  BModal,
  VBModal,
  BCardText,
  BLink,
  BFormTextarea,
  BFormCheckbox
} from "bootstrap-vue";
import UserMessageTemplateService from "@/services/info/usermessagetemplate.service";
import OblastService from "@/services/info/oblast.service";
import HelperService from "@/services/others/helper.service";
import RegionService from "@/services/info/region.service";
import EducationLanguageService from "@/services/info/educationlanguage.service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    BButton,
    BPagination,
    BTable,
    BCol,
    BRow,
    BSpinner,
    BCard,
    BTooltip,
    BBadge,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BModal,
    BCardText,
    BLink,
    BFormTextarea,
    BFormCheckbox
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: this.$t("id"),
          class: "text-center",
          sortable: true,
        },
         {
          key: "templateid",
          label: this.$t("Template"),
          class: "text-center",
          sortable: true,
        },
        {
          key: "webtext",
          label: this.$t("WebText"),
          class: "text-center",
          sortable: true,
        },
        {
          key: "smstext",
          label: this.$t("SmsText"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "mobiletext",
          label: this.$t("MobileText"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "title",
          label: this.$t("Title"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        // {
        //   key: "status",
        //   label: this.$t('status'),
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: true,
        // },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      filter: {
        Search: "",
        Sort: "",
        Order: "asc",
        perPage: 20,
        currentPage: 1,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
      SendbulkMessageModal: false,
      BulkMessage: {
        oblastId: 0,
        oblastname: "",
        regionId: 0,
        regionname: "",
        quotaTypeId: 0,
        quotaTypename: "",
        statusId: 0,
        statusname: "",
        title: "",
        webText: "",
        smsText: "",
        mobileText: "",
        admissionTypeId: 0,
        admissiontypename: "",
        educationLanguageId : 0,
        educationlanguagename : "",
        count: 0,
        isautoqueue : false
      },
      OblastList: [],
      RegionList: [],
      QuotaTypeList: [],
      StatusList: [],
      EducationLanguageList : [],
      CountBulkMessageLoading: false,
      SendBulkMessageLoading: false,
      isViewSendMessage: false,
      AdmissionTypeList: [],
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
    this.lang = localStorage.getItem("locale");
    // OblastService.GetAll(this.lang)
    //   .then((res) => {
    //     this.OblastList = res.data;
    //   })
    //   .catch((error) => {
    //     this.makeToast(error.response.data.error, "danger");
    //   });
    // HelperService.GetAllQuoteType()
    //   .then((res) => {
    //     this.QuotaTypeList = res.data;
    //   })
    //   .catch((error) => {
    //     this.makeToast(error.response.data.error, "danger");
    //   });
    // HelperService.GetAllAdmissionType()
    //   .then((res) => {
    //     this.AdmissionTypeList = res.data;
    //   })
    //   .catch((error) => {
    //     this.makeToast(error.response.data.error, "danger");
    //   });
    // EducationLanguageService.GetAll(this.lang)
    //   .then((res) => {
    //     this.EducationLanguageList = res.data;
    //   })
    //   .catch((error) => {
    //     this.makeToast(error.response.data.error, "danger");
    //   });
    this.Refresh();
  },
  methods: {
    SendBulkMessage() {
      this.SendBulkMessageLoading = true;
      UserMessageTemplateService.SendBulkMessage(this.BulkMessage)
        .then((res) => {
          this.SendBulkMessageLoading = false;
          this.makeToast(this.$t("SendSuccessMessage"), "success");
          this.SendbulkMessageModal = false;
        })
        .catch((err) => {
          this.SendBulkMessageLoading = false;
          this.makeToast(err.response.data.error, "success");
        });
    },
    makeToast(message, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon: variant == "success" ? "CheckSquareIcon" : "AlertTriangleIcon",
          variant: variant,
        },
      });
    },
    ChangeStatus() {
      if (!!this.BulkMessage.statusId) {
        this.BulkMessage.statusname = this.StatusList.filter(
          (item) => item.id == this.BulkMessage.statusId
        )[0].name;
      }
    },
    ChangeQuotatype() {
      if (!!this.BulkMessage.quotaTypeId) {
        this.BulkMessage.quotaTypename = this.QuotaTypeList.filter(
          (item) => item.id == this.BulkMessage.quotaTypeId
        )[0].shortname;
      }
    },
    ChangeEducationLanguage() {
      if (!!this.BulkMessage.educationLanguageId) {
        this.BulkMessage.educationlanguagename = this.EducationLanguageList.filter(
          (item) => item.id == this.BulkMessage.educationLanguageId
        )[0].name;
      }
    },
    ChangeAdmissionType() {
      HelperService.GetStatusList(this.BulkMessage.admissionTypeId)
      .then((res) => {
        this.StatusList = res.data;
      })
      .catch((error) => {
        this.makeToast(error.response.data.error, "danger");
      });
      if (!!this.BulkMessage.admissionTypeId) {
        this.BulkMessage.admissiontypename = this.AdmissionTypeList.filter(
          (item) => item.id == this.BulkMessage.admissionTypeId
        )[0].shortname;
      }
    },
    ChangeRegion() {
      if (!!this.BulkMessage.regionId) {
        this.BulkMessage.regionname = this.RegionList.filter(
          (item) => item.id == this.BulkMessage.regionId
        )[0].name;
      }
    },
    CountBulkMessage() {
      if (!this.BulkMessage.quotaTypeId) {
        this.makeToast("NotCorrectQuotaType", "danger");
        return false;
      }
      if (!this.BulkMessage.admissionTypeId) {
        this.makeToast("NotAdmissionType", "danger");
        return false;
      }
      if (!this.BulkMessage.statusId) {
        this.makeToast(this.$t("stateNotSelected"), "danger");
        return false;
      }
      if (!this.BulkMessage.title) {
        this.makeToast("NotCorrecttitle ", "danger");
        return false;
      }
      if (!this.BulkMessage.webText) {
        this.makeToast("NotCorrectwebText", "danger");
        return false;
      }
      if (!this.BulkMessage.smsText) {
        this.makeToast("NotCorrectsmsText", "danger");
        return false;
      }
      if (!this.BulkMessage.mobileText) {
        this.makeToast("NotCorrectmobileText", "danger");
        return false;
      }
      this.CountBulkMessageLoading = true;
      UserMessageTemplateService.CountBulkMessage(this.BulkMessage)
        .then((res) => {
          this.CountBulkMessageLoading = false;
          if (res.data.result == 0) {
            this.makeToast(this.$t("SendMessageCountis0"), "danger");
          }
          if (res.data.result != 0) {
            this.isViewSendMessage = true;
            this.BulkMessage.count = res.data.result;
          }
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
          this.CountBulkMessageLoading = false;
        });
    },
    ChangeOblast() {
      this.BulkMessage.regionId = 0;
      if (!!this.BulkMessage.oblastId) {
        this.BulkMessage.oblastname = this.OblastList.filter(
          (item) => item.id == this.BulkMessage.oblastId
        )[0].name;
        // RegionService.GetAll(this.lang, this.BulkMessage.oblastId).then(
        //   (res) => {
        //     this.RegionList = res.data;
        //   }
        // );
      }
    },
    OpenSendBulkMessage() {
      this.SendbulkMessageModal = true;
      this.BulkMessage = {
        oblastId: 0,
        oblastname: "",
        regionId: 0,
        regionname: "",
        quotaTypeId: 0,
        quotatypename: "",
        admissionTypeId: 0,
        admissiontypename: "",
        statusId: 0,
        statusname: "",
        title: "",
        webText: "",
        smsText: "",
        mobileText: "",
        count: 0,
        isautoqueue : false
      };
      this.isViewSendMessage = false;
    },
    SortChange(data) {
      this.filter.Sort = data.sortBy;
      this.filter.Order = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    Refresh() {
      this.isBusy = true;
      UserMessageTemplateService.GetList(
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
    Delete(item) {
      this.DeleteLoading = true;
      UserMessageTemplateService.Delete(item.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.Refresh();
          this.makeToast(this.$t("DeleteSuccess"), "success");
        })
        .catch((error) => {
          this.makeToast(error.response.data.error, "danger");
          this.DeleteLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>