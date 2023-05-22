<template>
 <div>
   <b-overlay :show="previewshow">
     <b-row>
       <b-col sm="12" md="2">
         <b-card class="d-flex justify-content-center text-center">
           <img v-if="Person.genderid == 2" src="@/assets/images/163802.svg" width="80%" alt="">
           <img v-if="Person.genderid != 2" src="@/assets/images/163807.svg" width="80%" alt="">
         </b-card>
       </b-col>
       <b-col sm="12" :md="iscomponent ? 10 : 8" >
         <b-card style="min-height:200px">
           <table>
             <tr>
                <th class="text-primary h1"><span>{{ Person.familyname }} </span><span>{{ Person.firstname }}</span> <span>{{ Person.lastname }}</span></th>
              </tr>
           </table>
            <table class="my-2">
              
              <tr>
                <td style="width:50%">{{ $t("docnumber") }}:</td>
                <td style="width:50%" class="ml-4" >
                  <b>{{ ChildRegistrationActList.docnumber }}</b>
                </td>
              </tr>
              <tr>
                <td style="width:40%">{{ $t("docdate") }}:</td>
                <td style="width:60%" class="ml-4"> <b> {{ ChildRegistrationActList.docdate }} </b> </td>
              </tr>
              <tr>
                <td>{{ $t("organizationname") }}:</td>
                <td> <b> {{ ChildRegistrationActList.organizationname }} </b> </td>
              </tr>
            </table>
         </b-card>
       </b-col>
       <b-col sm="12" md="2" v-if="!iscomponent">
         <b-button
            v-if="
              $can('ChildRegistrationActApprove', 'permissions') &&
              ChildRegistrationActList.CanApprove && ChildRegistrationActList.dateofexpulsion == null
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
              ChildRegistrationActList.CanCancelApprove && ChildRegistrationActList.dateofexpulsion == null
            "
            @click="OpenCancelApprovalModal"
            variant="danger"
            block
          >
            {{ $t("CancelApproval") }}
          </b-button>
       </b-col>
     </b-row>
     <b-row>
       <b-col>
         <b-card class="spes-card">
            <b-tabs v-model="tabIndex" justified pills>
              <b-tab active>
                <template #title>
                  <feather-icon icon="UserIcon"></feather-icon> {{ $t('AdditionalInformation') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="PlusIcon"></feather-icon> {{ $t('ParametersInfo') }}
                </template>
              </b-tab>
              <b-tab>
                 <template #title>
                  <feather-icon icon="FolderIcon"></feather-icon>{{ $t('Basicdocuments') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="HomeIcon"></feather-icon> {{ $t('sadadsad') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="HomeIcon"></feather-icon> {{ $t('RegistrationActTables') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="PaperclipIcon"></feather-icon> {{ $t('ChildrenActFiles') }}
                </template>
              </b-tab>
            </b-tabs>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 0">
       <b-col sm="12" md="4">
         <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("dateofbirth") }} :</span>
              <span> <b> {{ Person.dateofbirth }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("gender") }} :</span>
              <span> <b> {{ Person.gendername  }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("pinfl") }} :</span>
              <span> <b> {{ Person.pinfl  }} </b> </span>
            </b-list-group-item>
          </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("Country") }} :</span>
              <span> <b> {{ Person.birthcountryname   }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("oblast") }} :</span>
              <span> <b> {{ Person.birthoblastname }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("region") }} :</span>
              <span> <b> {{ Person.birthregionname  }} </b> </span>
            </b-list-group-item>
          </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("citizenship") }} :</span>
              <span> <b> {{ Person.citizenshipname }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("nationality") }} :</span>
              <span> <b> {{ Person.nationalityname    }} </b> </span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between">
              <span>{{ $t("contactinfo") }} :</span>
              <span> <b> {{ Person.contactinfo }} </b> </span>
            </b-list-group-item>
          </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card class="cursor-pointer" @click="personTabIndex = 0" :bg-variant="personTabIndex == 0 ? 'info' : ''" >  <h3 :class="{'text-white' : personTabIndex == 0,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="BookOpenIcon"></feather-icon> {{ $t("DocumentTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card class="cursor-pointer" @click="personTabIndex = 1" :bg-variant="personTabIndex == 1 ? 'info' : ''" > <h3 :class="{'text-white' : personTabIndex == 1,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="UsersIcon"></feather-icon> {{ $t("PersonRelativeTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="4">
         <b-card class="cursor-pointer" @click="personTabIndex = 2" :bg-variant="personTabIndex == 2 ? 'info' : ''"> <h3 :class="{'text-white' : personTabIndex == 2,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="HomeIcon"></feather-icon> {{ $t("LivePlaceTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="4" v-show="personTabIndex == 0" v-for="(item1,i1) in Person.DocumentTables" :key="i1 + 'i1'">
         <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("identitydocument") }} :</span>
                <span> <b> {{ item1.identitydocumentname }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("document") }} :</span>
                <span> <b> {{ item1.documentseries }}  {{ item1.documentnumber }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("dateofissue") }} :</span>
                <span> <b> {{ item1.dateofissue }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("state") }} :</span>
                <span>  <b-badge :variant="item1.statename == 'Актив' ? 'light-success' : 'light-danger'"> {{ item1.statename }} </b-badge> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4" v-show="personTabIndex == 1" v-for="(item2,i2) in Person.PersonRelativeTables" :key="i2 + 'i2'">
         <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("kinshipdegreename") }} :</span>
                <span> <b> {{ item2.kinshipdegreename }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("familyname") }} :</span>
                <span> <b> {{ item2.familyname }}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("firstname") }} :</span>
                <span> <b> {{ item2.firstname }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("lastname") }} :</span>
                <span> <b> {{ item2.lastname }} </b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="4" v-show="personTabIndex == 2" v-for="(item3,i3) in Person.LivePlaceTables" :key="i3 + 'i3'">
         <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("oblastname") }} :</span>
                <span> <b> {{ item3.oblastname }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("regionname") }} :</span>
                <span> <b> {{ item3.regionname }}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("mfyname") }} :</span>
                <span> <b> {{ item3.mfyname }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("address") }} :</span>
                <span> <b> {{ item3.address }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("state") }} :</span>
                <span>  <b-badge :variant="item3.statename == 'Актив' ? 'light-success' : 'light-danger'"> {{ item3.statename }} </b-badge> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 1">
       <b-col sm="12" md="6">
         <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("childcharacter") }} :</span>
                <span> <b> {{ tabrow.childcharacter }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("guardianshiplessreason") }} :</span>
                <span> <b> {{ tabrow.guardianshiplessreasonname }}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("healthtypeid") }} :</span>
                <span> <b> {{ tabrow.healthtypename }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("educationplacetypeid") }} :</span>
                <span> <b> {{ tabrow.educationplacetypename }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between" v-if="tabrow.healthtypeid == 3">
                <span>{{ $t("invalidtypename") }} :</span>
                <span> <b> {{ tabrow.invalidtypename }} </b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("childweight") }} :</span>
                <span> <b> {{ tabrow.childweight }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("childheight") }} :</span>
                <span> <b> {{ tabrow.childheight  }}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("childeyecolor") }} :</span>
                <span> <b> {{ tabrow.childeyecolor }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("childhaircolor") }} :</span>
                <span> <b> {{ tabrow.childhaircolor }} </b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
       
     </b-row>
      <b-row v-if="tabIndex == 2">
     <b-col sm="12" md="4">
     <b-card>
         <b-list-group>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisionsorg")}} :</span>
           <span><b>{{ChildRegistrationActList.decisionsorgname}}</b></span>
         </b-list-group-item>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisionsdate")}} :</span>
           <span><b>{{ChildRegistrationActList.decisionsdate}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-card>
     </b-col>
     <b-col sm="12" md="4">
     <b-card>
         <b-list-group>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisionsnumber")}} :</span>
           <span><b>{{ChildRegistrationActList.decisionsnumber}}</b></span>
         </b-list-group-item>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisiontext")}} :</span>
           <span><b>{{ChildRegistrationActList.decisiontextname}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-card>
     </b-col>
       <b-col sm="12" md="4">
        <b-list-group>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisiontext")}} :</span>
           <span><b>{{ChildRegistrationActList.decisiontext}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-col>
     </b-row>
     <b-row v-if="tabIndex == 4">
       <b-col sm="12" md="4" v-for="(itemAct,indexAct) in ChildRegistrationActList.RegistrationActTables" :key="indexAct + 'indexAct'"> 
         <b-card>
           <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("propertytype") }} :</span>
                <span> <b> {{ itemAct.propertytypename }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("propertyright") }} :</span>
                <span> <b> {{ itemAct.propertyrightname  }}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("address") }} :</span>
                <span> <b> {{ itemAct.address }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("totalarea") }} :</span>
                <span> <b> {{ itemAct.totalarea }} </b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("cadastralnumber") }} :</span>
                <span> <b> {{ itemAct.cadastralnumber }} </b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 3">
       <b-col sm="12" md="4">
         <b-card>
           <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("needproperty") }} :</span>
                <b-badge :variant="ChildRegistrationActList.needproperty == true ? 'light-success' : 'light-danger'">
                  {{ ChildRegistrationActList.needproperty ? $t("yes") : $t("no") }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item v-if="ChildRegistrationActList.needproperty == true" class="d-flex justify-content-between">
                <span>{{ $t("isinwaitinglist") }} :</span>
                <b-badge :variant="ChildRegistrationActList.isinwaitinglist == true ? 'light-success' : 'light-danger'">
                  {{ ChildRegistrationActList.isinwaitinglist ? $t("yes") : $t("no") }}
                </b-badge>
              </b-list-group-item>
              <b-list-group-item v-if="ChildRegistrationActList.isinwaitinglist == true" class="d-flex justify-content-between">
                <span>{{ $t("waitinglistnumber") }} :</span>
                <span> <b> {{ ChildRegistrationActList.waitinglistnumber }} </b> </span>
              </b-list-group-item>
              <b-list-group-item v-if="ChildRegistrationActList.isinwaitinglist == true" class="d-flex justify-content-between">
                <span>{{ $t("waitinglistdate") }} :</span>
                <span> <b> {{ ChildRegistrationActList.waitinglistdate }} </b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 5">
       <b-col
          sm="6"
          md="3"
          lg="2"
          v-for="(item, index) in ChildRegistrationActList.File"
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
import ChildRegistrationActService from "@/services/document/childregistrationact.service";
import AdmImageService from "@/services/others/admImage.service";
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
  BListGroupItem
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
    BAvatar,
    BOverlay,
    BListGroup,
    BListGroupItem
  },
  props : {
    iscomponent : {
      type : Boolean,
      default : false
    },
    id : {
      type : Number
    }
  },
  data() {
    return {
      ChildRegistrationActList: {},
      tabrow: {
        id: 0,
        ownerid: 0,
        childweight: 0,
        childheight: 0,
        childeyecolor: "",
        childhaircolor: "",
        childhealthinformation: "",
        childcharacter: "",
        guardianshiplessreasonid: 0,
        guardianshiplessreasonname: "",
        childmeasurestakenforadoption: "",
        needproperty: false,
        isinwaitinglist: false,
      },

      tabrow2: {
        id: 0,
        ownerid: 0,
        propertytypeid: 0,
        propertytypename: "",
        propertyrightname: "",
        propertyrightid: 0,
        address: "",
        totalarea: 0,
        cadastralnumber: "",
        Status: 1,
      },
      items: [],
      ApproveLoading: false,
      CancelApprovalLoading: false,
      ApproveModal: false,
      CancelApprovalModal: false,
      config: { dateFormat: "d.m.Y" },
      Person: {},
      tabrow3: {},
      tabIndex: 0,
      personTabIndex : 0,
      previewshow : false
    };
  },
  created() {
    this.previewshow = true
    var id = 0
    console.log(this.id)
    console.log(this.$route.params.id)
    id = !!this.iscomponent ? this.id : this.$route.params.id
    ChildRegistrationActService.Get(id)
      .then((res) => {
        this.ChildRegistrationActList = res.data.result;
        this.previewshow = false
        this.Person = res.data.result.person;
        this.items = res.data.result.Tables;
        this.tabrow = res.data.result.ParametersInfo;
        this.tabrow3 = res.data.result.RegistrationActTables;
      })
      .catch((err) => {
        this.$makeToast(err.response.data.error, "danger");
      });
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
    Edit() {
      this.$router.push({
        name: "editadmregapplicationbyadmin",
        params: { id: this.$route.params.id },
      });
    },
    OpenApproveModal() {
      this.ApproveModal = true;
    },
    Approve() {
      this.AcceptLoading = true;
      ChildRegistrationActService.Approve(this.$route.params.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.ApproveModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childregistrationact" });
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
      ChildRegistrationActService.CancelApproval(this.$route.params.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.CancelApprovalModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childregistrationact" });
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
.spes-card .card-body{
  padding-bottom: 6px;
}
</style>