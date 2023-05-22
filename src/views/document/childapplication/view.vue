<template>
<div>
<b-overlay>
      <b-row>
         <b-col sm="12" md="12">
             <b-card>
                 <b-row>
                   <b-col sm="12" md="3">
                     <table>
                        <tr>
                         <td>{{ $t("docdate") }}:</td>
                         <td class="pl-1"><b>{{ childSelectApplication.docdate }}</b></td>
                     </tr>
                     </table>
                   </b-col>
                    <b-col sm="12" md="3">
                     <table>
                        <tr>
                         <td>{{ $t("docnumber") }}:</td>
                         <td class="pl-1"><b>{{ childSelectApplication.docnumber }}</b></td>
                     </tr>
                     </table>
                   </b-col>
                    <b-col sm="12" md="3">
                     <table>
                        <tr>
                         <td>{{ $t("statusname") }}:</td>
                         <td class="pl-1"><b>{{ childSelectApplication.statusname }}</b></td>
                     </tr>
                     </table>
                   </b-col>
                      <b-col sm="12" md="3">
                     <table>
                       <tr>
                          <td>
                            <b-button
                            @click="ChangeMetWithTheChild"
                             v-if="childSelectApplication.CanMetWithTheChild === true"
                              variant="success"
                              block
                              >
                              {{ $t("MetWithTheChild") }}
                            </b-button>
                          </td>
                       </tr>
                     </table>
                   </b-col>
                 </b-row>
             </b-card>
         </b-col>
     </b-row>
    <b-row>
       <b-col>
         <b-card class="spes-card">
            <b-tabs v-model="tabIndex" justified pills>
              <b-tab active>
                <template #title>
                  <feather-icon icon="UserIcon"></feather-icon> {{ $t('CandidateInformation') }} <span> <b> : {{ AdoptionPermission.fullname  }} </b> </span>
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="UserIcon"></feather-icon> {{ $t('ChildInformation') }}   <span> <b> : {{ childRegistrationAct.fullname }} - <span>{{childSelectApplication.childdocnumber}}</span> </b> </span>
                </template>
              </b-tab>
            </b-tabs>
         </b-card>
       </b-col>
     </b-row>
     <b-row v-if="tabIndex == 0">
        <b-col sm="12" md="4">
         <b-card> 
                   <b-row>
                     <b-col class="text-center mb-2">
                       <span><b>{{$t("PersonalInformation")}}</b></span>
                     </b-col>
                  </b-row>                
                 <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("guardianshiptypename") }} :</span>
                      <span> <b> {{ AdoptionPermission.guardianshiptypename }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("fullname") }} :</span>
                      <span> <b> {{ AdoptionPermission.fullname  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("pinfl") }} :</span>
                      <span> <b> {{ AdoptionPermission.pinfl  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("dateofbirth") }} :</span>
                      <span> <b> {{ AdoptionPermission.dateofbirth  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("gendername") }} :</span>
                      <span> <b> {{ AdoptionPermission.gendername  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("identitydocumentname") }} :</span>
                      <span> <b> {{ AdoptionPermission.identitydocumentname  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span>{{ $t("documentnumber") }} :</span>
                      <span> <b> {{ AdoptionPermission.documentnumber  }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between" v-for="(item , index) in AdoptionPermission.ParentCitizensInfo" :key="index">
                      <span class="w-50">{{ $t("address") }} :</span>
                      <span > <b> {{ item.address  }} </b> </span>
                    </b-list-group-item>
                </b-list-group>
         </b-card>
        </b-col>
        <b-col sm="12" md="4">
          <b-card> 
                 <b-row>
                     <b-col class="text-center mb-2">
                       <span><b>{{$t("DocumentsSubmitted")}}</b></span>
                     </b-col>
                  </b-row>       
                <b-list-group >
                    <b-list-group-item class="d-grid cursor-pointer"  @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles1" :key="index + 'one'">
                      <div>
                         <span>{{ $t("AttachedFiles1") }} :</span>
                      </div>
                     <div>
                         <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                            <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                     </div>
                    </b-list-group-item>
                    <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles2" :key="index + 'two'">
                     <div>
                        <span>{{ $t("AttachedFiles2") }} :</span>
                     </div>
                       <div>
                           <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                              <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                       </div>
                    </b-list-group-item>
                    <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles3" :key="index + 'three'">
                     <div>
                        <span>{{ $t("AttachedFiles3") }} :</span>
                     </div>
                      <!-- <span> <b> {{ item.projectfiletext }} </b> </span> -->
                       <div>
                          <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                             <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                       </div>
                    </b-list-group-item>
                     <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles4" :key="index + 'four'">
                     <div>
                          <span>{{ $t("AttachedFiles4") }} :</span>
                     </div>
                      <!-- <span> <b> {{ item.projectfiletext }} </b> </span> -->
                     <div>
                          <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                             <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                     </div>
                    </b-list-group-item>
                     <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles5" :key="index + 'five'">
                      <div>
                         <span>{{ $t("AttachedFiles5") }} :</span>
                      </div>
                      <!-- <span> <b> {{ item.projectfiletext }} </b> </span> -->
                      <div>
                          <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                             <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                      </div>
                    </b-list-group-item>
                    <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles6" :key="index + 'six'">
                    <div>
                        <span>{{ $t("AttachedFiles6") }} :</span>
                    </div>
                      <!-- <span> <b> {{ item.projectfiletext }} </b> </span> -->
                    <div>
                          <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                             <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                    </div>
                    </b-list-group-item>
                     <b-list-group-item class="d-grid cursor-pointer" @click="DownLoad(item)" v-for="(item, index) in AdoptionPermission.AttachedFiles7" :key="index + 'seven'">
                    <div>  <span>{{ $t("AttachedFiles7") }} :</span></div>
                      <!-- <span> <b> {{ item.projectfiletext }} </b> </span> -->
                      <div>
                          <b-badge  @click="DownLoad(item)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                            <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                      </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
        <b-col sm="12" md="4">
           <b-card>
                    <b-row>
                     <b-col class="text-center mb-2">
                       <span><b>{{$t("ApplicationSummary")}}</b></span>
                     </b-col>
                  </b-row>       
                <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span>{{ $t("docdate") }} :</span>
                    <span> <b> {{ AdoptPermisConclusion.docdate }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span>{{ $t("docnumber") }} :</span>
                    <span> <b> {{ AdoptPermisConclusion.docnumber }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span>{{ $t("commenttext") }} :</span>
                    <span> <b> {{ AdoptPermisConclusion.commenttext }} </b> </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-grid cursor-pointer">
                    <div>
                      <span>{{ $t("projectfiletext") }} :</span>
                    </div>
                    <!-- <span> <b> {{ AdoptPermisConclusion.projectfiletext }} </b> </span> -->
                   <div>
                       <b-badge  @click="DownLoad(AdoptPermisConclusion)" class="cursor-pointer mt-1" variant="info">
                          <div class="d-flex ">
                         <div>
                           <b-avatar variant="light-primary" size="25">
                             <feather-icon size="21" icon="PaperclipIcon" />
                            </b-avatar>
                         </div>
                         <div>
                             <h3 style="font-size:20px" class="mb-25 font-weight-bolder">
                                {{ AdoptPermisConclusion.projectfiletext }}
                            </h3>
                         </div>
                      </div>
                     </b-badge>
                   </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
     </b-row>
     <b-row v-if="tabIndex == 1">
         <b-col sm="12">
             <child-registration-act iscomponent :id="childRegAct.id"></child-registration-act>
         </b-col>
     </b-row>
</b-overlay>
</div>
</template>
<script>
import ChildApplicationService from "@/services/document/childapplication.service";
import AdmImageService from "@/services/others/admImage.service";
import ChildRegistrationAct from '../../document/childregistrationact/view.vue'
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
    BListGroupItem,
    ChildRegistrationAct
  },
  data() {
    return {
      childApplication: {},
      AdoptionPermission : {},
      childSelectApplication : {},
      childRegistrationAct : {},
      childRegAct : {},
      AdoptPermisConclusion : {},
      config: { dateFormat: "d.m.Y" },
      personTabIndex : 0,
      previewshow : false,
      tabIndex: 0,
    };
  },
  created() {
    this.previewshow = true
    ChildApplicationService.GetDetail(this.$route.params.id)
      .then((res) => {
        this.childApplication = res.data;
        this.AdoptionPermission = res.data.childApplication.AdoptionPermission
        this.AdoptPermisConclusion = res.data.childApplication.AdoptPermisConclusion
        this.childRegistrationAct = res.data.childApplication.childRegistrationAct.person
        this.childRegAct = res.data.childApplication.childRegistrationAct
        this.childSelectApplication = res.data.childApplication.childSelectApplication
        this.previewshow = false
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
      ChangeMetWithTheChild(){
      ChildApplicationService.MetWithTheChild(this.$route.params.id)
      .then((res) => {
          this.$makeToast(this.$t("SuccessCancel"), "success");
          setTimeout(() => {
            this.$router.push({ name: "childapplication" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.spes-card .card-body{
  padding-bottom: 6px;
}
</style>