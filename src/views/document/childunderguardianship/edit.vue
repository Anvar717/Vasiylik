<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('docnumber')"
                v-model="ChildUnderGuardianship.docnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="6">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docdate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="ChildUnderGuardianship.docdate"
                @keyup="BindValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('docdate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
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
    <b-card>
      <b-tabs pills v-model="tabIndex">
        <b-tab active :title="$t('Person')">
          <b-tabs pills class="mx-1">
            <b-tab :title="$t('AdditionalInformation')">
              <b-row>
                <b-col>
                  <edit-person-component
                    iscomponent
                    :person-data="ChildUnderGuardianship.Children"
                    :is-student="true"
                    ref="personcomp"
                    @persondatachange="persondatachange($event)"
                  >
                  </edit-person-component>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('ParametersInfo')">
              <b-row>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("guardianshiplessreason")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="guardianshiplessreasonList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="
                          ChildUnderGuardianship.guardianshiplessreasonid
                        "
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("healthtype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="healthtypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="ChildUnderGuardianship.healthtypeid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("guardianshiptype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="guardianshiptypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="ChildUnderGuardianship.guardianshiptypeid"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("educationplacetype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="educationplacetypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="ChildUnderGuardianship.educationplacetypeid"
                      ></v-select>
                    </div>
                  </div>
                  <div
                    v-if="ChildUnderGuardianship.healthtypeid == 3"
                    class="form-group form-row"
                  >
                    <label class="col-form-label col-sm-5" for>{{
                      $t("invalidtype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="invalidtypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="shortname"
                        v-model="ChildUnderGuardianship.invalidtypeid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-tab>
        <b-tab :title="$t('Guardianship')">
          <b-tabs pills class="mx-1">
            <b-tab :title="$t('AdditionalInformation')">
              <b-row>
                <b-col>
                  <edit-person-component
                    iscomponent
                    :person-data="ChildUnderGuardianship.Guardian"
                    :is-student="false"
                    ref="personcomp"
                    @persondatachange="persondatachangeGuardinship($event)"
                  >
                  </edit-person-component>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab :title="$t('ParametersInfo')">
              <b-row>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("ishasparentscertificate")
                    }}</label>
                    <div class="col-sm-7">
                      <b-form-checkbox
                        v-model="ChildUnderGuardianship.ishasparentscertificate"
                        name="check-button1"
                        switch
                      >
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("propertytype")
                    }}</label>
                    <div class="col-sm-7">
                      <v-select
                        :options="propertytypeList"
                        :reduce="(item) => item.id"
                        :placeholder="$t('ChooseBelow')"
                        label="name"
                        v-model="ChildUnderGuardianship.propertytypeid"
                      ></v-select>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-tab>
        
        <b-tab :title="$t('Basicdocuments')">
          <b-row>
            <b-col sm="12" md="6" lg="6">
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsorg")
                }}</label>
                <div class="col-sm-7">
                  <v-select
                    :options="decisionsorgList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="ChildUnderGuardianship.decisionsorgid"
                  ></v-select>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsdate")
                }}</label>
                <div class="col-sm-7">
                  <custom-date-picker
                    v-model="ChildUnderGuardianship.decisionsdate"
                    @keyup="BinddValue"
                    format="DD.MM.YYYY"
                    type="date"
                    :clearable="false"
                    :placeholder="$t('decisionsdate')"
                  >
                  </custom-date-picker>
                </div>
              </div>
              <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisionsnumber")
                }}</label>
                <div class="col-sm-7">
                  <b-form-input
                    :placeholder="$t('decisionsnumber')"
                    v-model="ChildUnderGuardianship.decisionsnumber"
                  />
                </div>
              </div>
               <div class="form-group form-row">
                 <label
                  for="textarea-default"
                  class="text-nowrap col-form-label col-sm-5"
                  >{{$t("decisiontext")}}</label>
                  <div class="col-sm-7">
                   <b-form-textarea
                   id="textarea-default"
                   :placeholder="$t('decisiontext')"
                   v-model="ChildUnderGuardianship.decisiontext"
                   />
                  </div>
               </div>
                <div class="form-group form-row">
                <label class="col-form-label col-sm-5" for>{{
                  $t("decisiontext")
                }}</label>
                <div class="col-sm-7">
                  <v-select
                    :options="decisiontextList"
                    :reduce="(item) => item.id"
                    :placeholder="$t('ChooseBelow')"
                    label="name"
                    v-model="ChildUnderGuardianship.decisiontextid"
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab :title="$t('ChildrenGuardianFiles')">
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
        </b-tab>
        <b-tab :title="$t('sadadsad')">
          <b-card>
            <b-row>
              <b-col sm="12" md="6" lg="6">
                <div div class="form-group form-row mb-0">
                  <label
                    class="col-form-label col-sm-5 d-flex align-items-center"
                    for
                    >{{ $t("needproperty") }}</label
                  >
                  <div class="col-sm-7">
                    <b-form-checkbox
                      @input="ClearIsinwaitinglist"
                      v-model="ChildUnderGuardianship.needproperty"
                      name="check-button1"
                      switch
                    >
                    </b-form-checkbox>
                  </div>
                </div>
                <div
                  v-if="ChildUnderGuardianship.needproperty == true"
                  class="form-group form-row mb-0"
                >
                  <label
                    class="col-form-label col-sm-5 d-flex align-items-center"
                    for
                    >{{ $t("isinwaitinglist") }}</label
                  >
                  <div class="col-sm-7">
                    <b-form-checkbox
                      @input="ClearIsinwaitinglist"
                      v-model="ChildUnderGuardianship.isinwaitinglist"
                      name="check-button1"
                      switch
                    >
                    </b-form-checkbox>
                  </div>
                </div>
              </b-col>
              <b-col
                sm="12"
                md="6"
                lg="6"
                v-if="
                  ChildUnderGuardianship.needproperty &&
                  ChildUnderGuardianship.isinwaitinglist
                "
              >
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("waitinglistnumber")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('waitinglistnumber')"
                      v-model="ChildUnderGuardianship.waitinglistnumber"
                    />
                  </div>
                </div>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("waitinglistdate")
                  }}</label>
                  <div class="col-sm-7">
                    <custom-date-picker
                      v-model="ChildUnderGuardianship.waitinglistdate"
                      @keyup="waitinglistdateValue"
                      format="DD.MM.YYYY"
                      type="date"
                      :clearable="false"
                      :placeholder="$t('date')"
                    >
                    </custom-date-picker>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-row v-if="tabIndex == 3">
      <b-col
        sm="6"
        md="3"
        lg="2"
        v-for="(item, index) in ChildUnderGuardianship.File"
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
    <b-row>
      <b-col>
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="6" class="text-left"> </b-col>
            <b-col sm="12" md="6" lg="6" class="text-right">
              <b-button @click="SaveData" size="sm" variant="outline-success">
                <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
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
  BInputGroup,
  BInputGroupAppend,
  BFormFile,
  BSpinner,
  BAvatar,
  BFormTextarea,
} from "bootstrap-vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildUnderGuardianshipService from "@/services/document/childunderguardianship.service";
import GuardianshiplessReasonService from "@/services/info/guardianshiplessreason.service";
import HelperService from "@/services/others/helper.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import DecisionsOrgService from "@/services/info/decisionsorg.service";
import GuardianshipList from "@/views/components/GuardianshipList.vue";
import ChildrenList from "@/views/components/ChildrenList.vue";
import PropertyTypeService from "@/services/info/propertytype.service";
import editPersonComponent from "../../info/person/edit.vue";
import ParentList from "@/views/components/ParentList.vue";
import AdmImageService from "@/services/others/admImage.service";
import DecisionTextService from "@/services/info/decisiontext.service";
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
    ChildrenList,
    BFormGroup,
    BModal,
    BCardText,
    BFormCheckbox,
    editPersonComponent,
    BAlert,
    BInputGroup,
    BInputGroupAppend,
    CustomDatePicker,
    GuardianshipList,
    ParentList,
    BFormFile,
    BSpinner,
    BAvatar,
    BFormTextarea,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      ParentModal: false,
      ChildUnderGuardianship: {
        Children: {},
        Guardian: {},
      },
      PersonModal: false,
      show: false,
      isChange: false,
      Guardian: {},
      Children: {},
      healthtypeList: [],
      educationplacetypeList: [],
      invalidtypeList: [],
      canSave: true,
      childrenList: [],
      children: [],
      guardianList: [],
      propertytypeList: [],
      file: [],
      guardianshiplessreasonList: [],
      guardianshiptypeList: [],
      decisionsorgList: [],
      decisiontextList: [],
      lang: "ru",
      config: {
        dateFormat: "d.m.Y",
      },
      filter: {
        DocumentNumber: "",
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        IsAllStudent: false,
      },
      filter1: {
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
      },
      filter3: {
        oblastid: 0,
        regionid: 0,
        isfarmfy: false,
      },
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
      isinvalid: false,
      DeleteModal: false,
      DeleteLoading: false,
      tabIndex: 0,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    ChildUnderGuardianshipService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.ChildUnderGuardianship = res.data.result;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });

    PropertyTypeService.GetAll(this.lang).then((res) => {
      this.propertytypeList = res.data;
    });
    GuardianshiplessReasonService.GetAll(this.lang).then((res) => {
      this.guardianshiplessreasonList = res.data;
    });
    HelperService.GetGuardianshipTypeList().then((res) => {
      this.guardianshiptypeList = res.data;
    });
    DecisionsOrgService.GetAll(this.lang).then((res) => {
      this.decisionsorgList = res.data;
    });
    HelperService.GetInvalidTypeList().then((res) => {
      this.invalidtypeList = res.data;
    });
    HelperService.GetHealthTypeList().then((res) => {
      this.healthtypeList = res.data;
    });
    HelperService.GetEducationPlaceTypeList().then((res) => {
      this.educationplacetypeList = res.data;
    });
    DecisionTextService.GetAll(this.lang).then((res)=>{
      this.decisiontextList = res.data;
    })
  },
  directives: {
    Ripple,
  },
  methods: {
    ClearIsinwaitinglist() {
      this.ChildUnderGuardianship.waitinglistnumber = "";
      this.ChildUnderGuardianship.waitinglistdate = "";
    },
    waitinglistdateValue(value) {
      this.ChildUnderGuardianship.waitinglistdate = value;
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
          this.ChildUnderGuardianship.File.push({
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
    Delete(item) {
      this.DeleteLoading = true;
      AdmImageService.Delete(item.projectfileid)
        .then((res) => {
          this.DeleteLoading = false;
          var self = this;
          self.ChildUnderGuardianship.File.forEach(function (el) {
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
    OpenDeleteModal(item) {
      this.DeleteModal = true;
      this.DeleteItem = item; 
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
    persondatachange(data) {
      this.Children = data;
      this.ChildUnderGuardianship.Children = data;
    },
    persondatachangeGuardinship(data) {
      this.Guardian = data;
      this.ChildUnderGuardianship.Guardian = data;
    },
    BindValue(value) {
      this.ChildUnderGuardianship.docdate = value;
    },
    BinddValue(value) {
      this.ChildUnderGuardianship.decisionsdate = value;
    },

    check() {
      // if (
      //     this.SchoolAdmissionQuota.ondate === 0 ||
      //     this.SchoolAdmissionQuota.ondate === null ||
      //     this.SchoolAdmissionQuota.ondate === undefined ||
      //     this.SchoolAdmissionQuota.ondate === ""
      // ) {
      //     this.$makeToast(
      //         this.$t("ondateNotSelected"),
      //         "danger"
      //     );
      //     return false;
      // }
      if (
        this.ChildUnderGuardianship.Children.nationalityid === 0 ||
        this.ChildUnderGuardianship.Children.nationalityid === null ||
        this.ChildUnderGuardianship.Children.nationalityid === undefined ||
        this.ChildUnderGuardianship.Children.nationalityid === ""
      ) {
        this.$makeToast(this.$t("nationalityNotSelected"), "danger");
        return false;
      }
      if (
        this.ChildUnderGuardianship.Guardian.nationalityid === 0 ||
        this.ChildUnderGuardianship.Guardian.nationalityid === null ||
        this.ChildUnderGuardianship.Guardian.nationalityid === undefined ||
        this.ChildUnderGuardianship.Guardian.nationalityid === ""
      ) {
        this.$makeToast(this.$t("nationalityNotSelected"), "danger");
        return false;
      }
      // if (
      //     this.SchoolAdmissionQuota.oblastid === 0 ||
      //     this.SchoolAdmissionQuota.oblastid === null ||
      //     this.SchoolAdmissionQuota.oblastid === undefined ||
      //     this.SchoolAdmissionQuota.oblastid === ""
      // ) {
      //     this.$makeToast(
      //         this.$t("oblastNotSelected"),
      //         "danger"
      //     );
      //     return false;
      // }
      // if (
      //     this.SchoolAdmissionQuota.regionid === 0 ||
      //     this.SchoolAdmissionQuota.regionid === null ||
      //     this.SchoolAdmissionQuota.regionid === undefined ||
      //     this.SchoolAdmissionQuota.regionid === ""
      // ) {
      //     this.$makeToast(
      //         this.$t("regionNotSelected"),
      //         "danger"
      //     );
      //     return false;
      // }
      // if (
      //     this.SchoolAdmissionQuota.organizationid === 0 ||
      //     this.SchoolAdmissionQuota.organizationid === null ||
      //     this.SchoolAdmissionQuota.organizationid === undefined ||
      //     this.SchoolAdmissionQuota.organizationid === ""
      // ) {
      //     this.$makeToast(
      //         this.$t("organizationNotSelected"),
      //         "danger"
      //     );
      //     return false;
      // }
      // return true
    },
    SaveData() {
      ChildUnderGuardianshipService.Update(this.ChildUnderGuardianship)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `childunderguardianship` });
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
      if (!this.check()) {
        return false;
      }
    },
  },
};
</script>

<style class="nav-item" lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
