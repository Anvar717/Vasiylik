<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("docnumber") }}</label>
          <b-form-input
            :placeholder="$t('docnumber')"
            v-model="ChildRegExpulsion.docnumber"
            disabled
          />
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("docdate") }}</label>
          <b-form-input
            :placeholder="$t('docdate')"
            v-model="ChildRegExpulsion.docdate"
          />
        </b-col>
        <b-col sm="12" md="12" lg="6">
          <label for="textarea-default">{{ $t("detailinfo") }}</label>
          <b-form-textarea
            id="textarea-default"
            :placeholder="$t('detailinfo')"
            v-model="ChildRegExpulsion.detailinfo"
          />
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("hasdecision") }} </label>
          <b-form-checkbox switch v-model="ChildRegExpulsion.hasdecision" />
        </b-col>
        <b-col
          v-if="ChildRegExpulsion.hasdecision == true"
          sm="12"
          md="12"
          lg="3"
        >
          <label for>{{ $t("decisionsnumber") }}</label>
          <b-form-input
            :placeholder="$t('decisionsnumber')"
            v-model="ChildRegExpulsion.decisionsnumber"
          />
        </b-col>
        <b-col
          v-if="ChildRegExpulsion.hasdecision == true"
          sm="12"
          md="12"
          lg="3"
        >
          <label for>{{ $t("decisionsorg") }} </label>
          <v-select
            :options="DecisionsorgList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildRegExpulsion.decisionsorgid"
          ></v-select>
        </b-col>
        <b-col
          v-if="ChildRegExpulsion.hasdecision == true"
          sm="12"
          md="12"
          lg="3"
        >
          <label for>{{ $t("decisionsdate") }} </label>
          <custom-date-picker
            v-model="ChildRegExpulsion.decisionsdate"
            @keyup="DecisionsdateValue"
            format="DD.MM.YYYY"
            type="date"
            :clearable="false"
            :placeholder="$t('decisionsdate')"
          >
          </custom-date-picker>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col sm="12" md="12" lg="3">
          <label for>{{ $t("childexpulsiontype") }} </label>
          <v-select
            @input="changeChildExpulsionType"
            :options="ChildexpulsiontypeList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildRegExpulsion.childexpulsiontypeid"
          ></v-select>
        </b-col>
        <b-col sm="12" md="12" lg="3">
          <label for=""> {{ $t("childregistrationact") }} </label>
          <b-input-group>
            <b-form-input
              v-model="ChildRegExpulsion.personname"
              disabled
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="OpenChildRegActModal">
                <feather-icon icon="MoreHorizontalIcon"></feather-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col sm="12" md="12" lg="3" v-if="isChildorphanagemovement">
          <label for>{{ $t("childorphanagemovementid") }} </label>
          <v-select
            :options="ChildorphanagemovementList"
            :reduce="(item) => item.id"
            :placeholder="$t('ChooseBelow')"
            label="name"
            v-model="ChildRegExpulsion.childorphanagemovementid"
          ></v-select>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for
              >{{ $t("childrenguardianfile") }}
            </label>
            <div class="col-sm-7">
              <b-form-file
                v-model="file"
                :placeholder="$t('importfile')"
                drop-placeholder="Drop file here..."
                @change="ChangeFile"
                accept=".pdf,.jpg,.png,.jpeg"
                :browse-text="$t('select')"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="6">
          <h4 class="d-flex align-items-center">
            <span style="color: red"> * </span>
            <span> {{ $t("maxsize5mb") }} </span>
          </h4>
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-col
        sm="6"
        md="3"
        lg="2"
        v-for="(item, index) in ChildRegExpulsion.File"
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
              <feather-icon
                class="cursor-pointer"
                @click="OpenDeleteModal(item)"
                size="20"
                icon="TrashIcon"
              ></feather-icon>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col>
        <b-card class="w-100">
          <b-row>
            <b-col sm="12" md="12" lg="12" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      v-model="ChildRegActModal"
      size="xl"
      hide-footer
      no-close-on-backdrop
    >
      <child-registration-act-component
        @row-selected="SelectedItem"
        @row-dblclick="AddData"
      ></child-registration-act-component>
      <b-row>
        <b-col class="text-center">
          <b-button
            variant="danger"
            @click="ChildRegActModal = false"
            class="mr-1"
          >
            {{ $t("close") }}
          </b-button>
          <b-button variant="success" @click="AddData(childregactvalue)">
            {{ $t("Add") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      v-model="DeleteModal"
      :title="$t('Delete')"
      no-close-on-backdrop
      hide-footer
    >
      <b-card-text>
        <h5>{{ DeleteItem.projectfiletext }}</h5>
        <h5>{{ $t("WantDelete") }}</h5>
      </b-card-text>
      <b-row>
        <b-col class="text-right">
          <b-button @click="DeleteModal = false" class="mr-1" variant="danger">
            {{ $t("no") }}
          </b-button>
          <b-button @click="Delete(DeleteItem)" variant="success">
            <b-spinner v-if="DeleteLoading" small></b-spinner> {{ $t("yes") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
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
  BSpinner,
  BFormTextarea,
  BFormFile,
  BAvatar,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildRegExpulsionService from "@/services/document/childregexpulsion.service";
import DecisionsOrgService from "@/services/info/decisionsorg.service";
import HelperService from "@/services/others/helper.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import ChildExpulsionTypeService from "@/services/info/childexpulsiontype.service";
import AdmImageService from "@/services/others/admImage.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import ChildRegistrationActComponent from "@/views/components/ChildRegistrationActComponent.vue";
import ChildOrphanageMovementService from "@/services/document/childorphanagemovement.service";
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
    CustomDatePicker,
    BPagination,
    BSpinner,
    BFormTextarea,
    ChildRegistrationActComponent,
    BFormFile,
    BAvatar,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      ChildRegActModal: false,
      DeleteModal: false,
      DeleteLoading: false,
      show: false,
      isChange: false,
      items: [],
      ChildRegExpulsion: {},
      ChildexpulsiontypeList: [],
      DecisionsorgList: [],
      ChildorphanagemovementList: [],
      file: [],
      DeleteItem: {
        id: 0,
        ownerid: 0,
        ordernumber: 0,
        projectfileid: 0,
        projectfiletext: "",
        projectfiletype: "",
        Status: 1,
        DownloadLoading: false,
      },
      hasdecision: false,
      filterFamily: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        pinfl: "",
        identityDocumentId: 0,
        documentSeries: "",
        documentNumber: "",
        dateofbirth: "",
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      isBusy: false,
      SearchFamilyLoading: false,
      IdentityDocumentList: [],
      DocumentSeriesList: [],
      ChildRegExpulsionModal: false,
      StateList: [],
      SearchLoading: false,
      fields: [
        {
          key: "selected",
        },
        {
          key: "childregistrationactdocdate",
          label: this.$t("childregistrationactdocdate"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
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
          key: "dateofbirth",
          label: this.$t("dateofbirth"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "gendername",
          label: this.$t("gender"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "nationalityname",
          label: this.$t("nationality"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "citizenship",
          label: this.$t("citizenship"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "identitydocumentname",
          label: this.$t("identitydocument"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      childregactvalue: {},
      isChildorphanagemovement: false,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildRegExpulsionService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.ChildRegExpulsion = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    ChildExpulsionTypeService.GetAll(this.lang, null).then((res) => {
      this.ChildexpulsiontypeList = res.data;
    });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
    DecisionsOrgService.GetAll(this.lang).then((res) => {
      this.DecisionsorgList = res.data;
    });
  },
  directives: {
    Ripple,
  },
  methods: {
    AddData(data) {
      this.ChildRegExpulsion.personid = data.personid;
      this.ChildRegExpulsion.personname = data.personname;
      this.ChildRegExpulsion.childregistrationactid =
        data.childregistrationactid;
      this.ChildRegActModal = false;
      ChildOrphanageMovementService.GetAll(data.childregistrationactid).then(
        (res) => {
          this.ChildorphanagemovementList = res.data;
        }
      );
    },
    SelectedItem(data) {
      this.childregactvalue = data;
    },
    OpenChildRegActModal() {
      this.ChildRegActModal = true;
    },
    DecisionsdateValue(value) {
      this.ChildRegExpulsion.decisionsdate = value;
    },
    Delete(item) {
      this.DeleteLoading = true;
      AdmImageService.Delete(item.projectfileid)
        .then((res) => {
          this.DeleteLoading = false;
          var self = this;
          self.ChildRegExpulsion.File.forEach(function (el) {
            if (item.projectfileid == el.projectfileid) {
              el.Status = 3;
            }
          });
          this.$makeToast(this.$t("DeleteSuccess"), "success");
          this.DeleteModal = false;
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    OpenChildRegExpulsion() {
      this.ChildRegExpulsionModal = true;
      this.Refresh();
    },
    ChangeFile(data) {
      console.log(data.target.files[0]);
      if (data.target.files.length > 0 && data.target.files[0].size > 5242880) {
        this.$makeToast(this.$t("morethen5mb"), "danger");
        return false;
      }
      var formData = new FormData();
      formData.append("attachfile", data.target.files[0]);
      this.show = true;
      AdmImageService.AttachImage(formData)
        .then((res) => {
          this.show = false;
          this.ChildRegExpulsion.File.push({
            id: 0,
            ownerid: 0,
            ordernumber: 0,
            projectfileid: res.data.id,
            projectfiletext: res.data.pfiletext,
            projectfiletype: res.data.pfiletype,
            Status: 1,
            DownloadLoading: false,
          });
        })
        .catch((error) => {
          this.show = false;
          this.$makeToast(error.response.data.error, "danger");
        });
      this.file = [];
    },
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
      link.setAttribute("download", item.projectfiletext); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    OpenDeleteModal(item) {
      this.DeleteModal = true;
      this.DeleteItem = item;
    },
    changeChildExpulsionType(id) {
      this.isChildorphanagemovement = this.ChildexpulsiontypeList.filter(
        (item) => item.id == id
      )[0].istoorphanage;
    },
    SaveData() {
      ChildRegExpulsionService.Update(this.ChildRegExpulsion)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childregexpulsion` });
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
