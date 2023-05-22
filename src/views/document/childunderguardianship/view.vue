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
          <b-col sm="12" :md="iscomponent ? 10 : 8">
            <b-card style="min-height:200px">
              <table>
                <tr>
                  <th class="text-primary h1 " v-if="tabIndex == 0"><span>{{ Person.familyname }} </span><span>{{ Person.firstname }}</span> <span>{{ Person.lastname }}</span></th>
                  <th class="text-primary h1" v-if="tabIndex == 1"><span>{{ Guardian.familyname }} </span><span>{{ Guardian.firstname }}</span> <span>{{ Guardian.lastname }}</span></th>
                </tr>
              </table>
              <table class="my-2">
                <tr>
                  <td>{{ $t("docnumber") }}:</td>
                  <td class="ml-4">
                    <b> {{ ChildUnderGuardianshipList.docnumber }}</b>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t("docdate") }}:</td>
                  <td><b>{{ ChildUnderGuardianshipList.docdate }}</b></td>
                </tr>
                <tr>
                  <td>{{ $t("organizationname") }}:</td>
                  <td><b>{{ ChildUnderGuardianshipList.organizationname }}</b></td>
                </tr>
              </table>
            </b-card>
          </b-col>
          <b-col sm="12" md="2" v-if="!iscomponent">
         <b-button
          v-if="
            $can('ChildUnderGuardianshipApprove', 'permissions') &&
            ChildUnderGuardianshipList.CanApprove
          "
          @click="OpenApproveModal"
          variant="success"
          block
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          v-if="
            $can('ChildUnderGuardianshipCancelApproval', 'permissions') &&
            ChildUnderGuardianshipList.CanCancelApprove
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
                  <feather-icon icon="UserIcon"></feather-icon>{{ $t('Person') }}
                </template>
              </b-tab>


              
              <b-tab>
                <template #title>
                  <feather-icon icon="UsersIcon"></feather-icon>{{ $t('Guardianship') }}
                </template>
              </b-tab>
              <b-tab>
                 <template #title>
                  <feather-icon icon="FolderIcon"></feather-icon>{{ $t('Basicdocuments') }}
                </template>
              </b-tab>
              <b-tab>
                <template #title>
                  <feather-icon icon="PaperclipIcon"></feather-icon>{{ $t('ChildUnderGuardianshipFiles') }}
                </template>
              </b-tab>
              <b-tab>
                 <template #title>
                  <feather-icon icon="HomeIcon"></feather-icon>{{ $t('sadadsad') }}
                </template>
              </b-tab>
           </b-tabs>
         </b-card>
       </b-col>
     </b-row>
     
     <b-row  v-if="tabIndex == 0">
       <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("dateofbirth") }}:</span>
                <span><b>{{ Person.dateofbirth }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("gender") }}:</span>
                <span><b>{{ Person.gendername }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("pinfl") }}:</span>
                <span><b>{{ Person.pinfl }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
        <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("Country") }}:</span>
                <span><b>{{ Person.birthcountryname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("oblast") }}:</span>
                <span><b>{{ Person.birthoblastname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("region") }}:</span>
                <span><b>{{ Person.birthregionname }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
        <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("citizenship") }}:</span>
                <span><b>{{ Person.citizenshipname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("nationality") }}:</span>
                <span><b>{{ Person.nationalityname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("contactinfo") }}:</span>
                <span><b>{{ Person.contactinfo }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
       <b-col sm="12" md="3">
        <b-card class="cursor-pointer" @click="personTabIndex = 0" :bg-variant="personTabIndex == 0 ? 'info' : ''" >  <h3 :class="{'text-white' : personTabIndex == 0,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="BookOpenIcon"></feather-icon> {{ $t("DocumentTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="personTabIndex = 1" :bg-variant="personTabIndex == 1 ? 'info' : ''" > <h3 :class="{'text-white' : personTabIndex == 1,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="UsersIcon"></feather-icon> {{ $t("PersonRelativeTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="personTabIndex = 2" :bg-variant="personTabIndex == 2 ? 'info' : ''"> <h3 :class="{'text-white' : personTabIndex == 2,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="HomeIcon"></feather-icon> {{ $t("LivePlaceTables") }} </h3> </b-card>
       </b-col>
        <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="personTabIndex = 3" :bg-variant="personTabIndex == 3 ? 'info' : ''"> <h3 :class="{'text-white' : personTabIndex == 3,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="UserPlusIcon"></feather-icon> {{ $t("ParametersInfo") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3"  v-show="personTabIndex == 0" v-for="(item1,i1) in Person.DocumentTables" :key="i1">
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
       <b-col sm="12" md="3" v-show="personTabIndex == 1" v-for="(item2,i2) in Person.PersonRelativeTables" :key="i2">
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
       <b-col sm="12" md="3" v-show="personTabIndex == 2" v-for="(item3,i3) in Person.LivePlaceTables" :key="i3">
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
       <b-col sm="12" md="3" v-show="personTabIndex == 3">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("guardianshiplessreason")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.guardianshiplessreasonname}}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("healthtypename")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.healthtypename}}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("guardianshiptype")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.guardianshiptypename}}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("educationplacetype")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.educationplacetypename}}</b> </span>
              </b-list-group-item>
                 <b-list-group-item v-if="ChildUnderGuardianshipList.healthtypeid == 3" class="d-flex justify-content-between">
                <span>{{$t("invalidtypename")}}</span>
                <span> <b>{{ ChildUnderGuardianshipList.invalidtypename }}</b> </span>
              </b-list-group-item>
            </b-list-group>
         </b-card>
       </b-col>
     </b-row>
     <!-- <b-row v-if="tabIndex == 1">
       <b-col>
         <b-card>
           <h1 class="mb-0 text-primary"> {{ Guardian.fullname }} </h1>
         </b-card>
       </b-col>
     </b-row> -->
     <b-row v-if="tabIndex == 1">
        <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("dateofbirth") }}:</span>
                <span><b>{{ Guardian.dateofbirth }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("gender") }}:</span>
                <span><b>{{ Guardian.gendername }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("pinfl") }}:</span>
                <span><b>{{ Guardian.pinfl }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
        <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("Country") }}:</span>
                <span><b>{{ Guardian.birthcountryname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("oblast") }}:</span>
                <span><b>{{ Guardian.birthoblastname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("region") }}:</span>
                <span><b>{{ Guardian.birthregionname }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
        <b-col sm="12" md="4">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("citizenship") }}:</span>
                <span><b>{{ Guardian.citizenshipname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("nationality") }}:</span>
                <span><b>{{ Guardian.nationalityname }}</b></span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{ $t("contactinfo") }}:</span>
                <span><b>{{ Guardian.contactinfo }}</b></span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
       </b-col>
        <b-col sm="12" md="3">
        <b-card class="cursor-pointer" @click="guardianTabIndex = 0" :bg-variant="guardianTabIndex == 0 ? 'info' : ''" >  <h3 :class="{'text-white' : guardianTabIndex == 0,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="BookOpenIcon"></feather-icon> {{ $t("DocumentTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="guardianTabIndex = 1" :bg-variant="guardianTabIndex == 1 ? 'info' : ''" > <h3 :class="{'text-white' : guardianTabIndex == 1,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="UsersIcon"></feather-icon> {{ $t("PersonRelativeTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="guardianTabIndex = 2" :bg-variant="guardianTabIndex == 2 ? 'info' : ''"> <h3 :class="{'text-white' : guardianTabIndex == 2,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="HomeIcon"></feather-icon> {{ $t("LivePlaceTables") }} </h3> </b-card>
       </b-col>
       <b-col sm="12" md="3">
         <b-card class="cursor-pointer" @click="guardianTabIndex = 3" :bg-variant="guardianTabIndex == 3 ? 'info' : ''"> <h3 :class="{'text-white' : guardianTabIndex == 3,' m-0 p-0 ' : true}"> <feather-icon size="20" icon="HomeIcon"></feather-icon> {{ $t("ParametersInfo") }} </h3> </b-card>
       </b-col>
        <b-col sm="12" md="3"  v-show="guardianTabIndex == 0" v-for="(item1,i1) in Guardian.DocumentTables" :key="i1">
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
       <b-col sm="12" md="3" v-show="guardianTabIndex == 1" v-for="(item2,i2) in Guardian.PersonRelativeTables" :key="i2">
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
        <b-col sm="12" md="3" v-show="guardianTabIndex == 2" v-for="(item3,i3) in Guardian.LivePlaceTables" :key="i3">
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
           <b-col sm="12" md="3" v-show="guardianTabIndex == 3">
          <b-card>
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("ishasparentscertificate")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.ishasparentscertificate}}</b> </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between">
                <span>{{$t("propertytype")}}</span>
                <span> <b>{{ChildUnderGuardianshipList.propertytypename}}</b> </span>
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
           <span><b>{{ChildUnderGuardianshipList.decisionsorgname}}</b></span>
         </b-list-group-item>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisionsdate")}} :</span>
           <span><b>{{ChildUnderGuardianshipList.decisionsdate}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-card>
     </b-col>
     <b-col sm="12" md="4">
     <b-card>
         <b-list-group>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisionsnumber")}} :</span>
           <span><b>{{ChildUnderGuardianshipList.decisionsnumber}}</b></span>
         </b-list-group-item>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisiontext")}} :</span>
           <span><b>{{ChildUnderGuardianshipList.decisiontextname}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-card>
     </b-col>
     <b-col sm="12" md="4">
        <b-list-group>
         <b-list-group-item class="d-flex justify-content-between">
           <span>{{$t("decisiontext")}} :</span>
           <span><b>{{ChildUnderGuardianshipList.decisiontext}}</b></span>
         </b-list-group-item>
       </b-list-group>
     </b-col>
     </b-row>
     <b-row v-if="tabIndex == 3">
        <b-col
          sm="6"
          md="3"
          lg="2"
          v-for="(item, index) in ChildUnderGuardianshipList.File"
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
  <b-row v-if="tabIndex == 4">
  <b-col sm="12" md="4">
    <b-card>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between">
         <span>{{ $t("needproperty") }}</span>
         <span> <b-badge
                    :variant="
                    ChildUnderGuardianshipList.needproperty == true
                    ? 'light-success'
                    : 'light-danger'
                    "
                    >{{
                    ChildUnderGuardianshipList.needproperty
                            ? $t("yes")
                            : $t("no")
                    }}</b-badge>
            </span>
        </b-list-group-item>
      </b-list-group>
      <b-list-group>
        <b-list-group-item  v-if="ChildUnderGuardianshipList.needproperty == true" class="d-flex justify-content-between">
          <span>{{ $t("isinwaitinglist") }}</span>
          <span>  <b-badge
                    :variant="
                      ChildUnderGuardianshipList.isinwaitinglist == true
                        ? 'light-success'
                        : 'light-danger'
                    "
                  >
                    {{
                      ChildUnderGuardianshipList.isinwaitinglist
                        ? $t("yes")
                        : $t("no")
                    }}
                  </b-badge></span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-col>
  <b-col sm="12" md="4" v-if="ChildUnderGuardianshipList.isinwaitinglist == true">
    <b-card>
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between">
          <span>{{$t("waitinglistnumber")}}</span>
          <span><b>{{ ChildUnderGuardianshipList.waitinglistnumber }}</b></span>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between">
          <span>{{$t("waitinglistdate")}}</span>
          <span><b> {{ ChildUnderGuardianshipList.waitinglistdate }}</b></span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-col>
  </b-row>
    <b-row>
      <b-col class="text-right">
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
import ChildUnderGuardianshipService from "@/services/document/childunderguardianship.service";
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
      personTabIndex: 0,
      guardianTabIndex: 0,
      previewshow : false,
      ChildUnderGuardianshipList: {},
      ApproveLoading: false,
      CancelApprovalLoading: false,
      ApproveModal: false,
      CancelApprovalModal: false,
      DownloadLoading: false,
      Person: {},
      tabIndex: 0,
    };
  },
  created() {
    this.previewshow = true
    var id = 0
    id = !!this.iscomponent ? this.id : this.$route.params.id
    ChildUnderGuardianshipService.Get(id)
      .then((res) => {
        this.ChildUnderGuardianshipList = res.data.result;
        this.Person = res.data.result.Children;
        this.Guardian = res.data.result.Guardian;
        this.previewshow = false
      })
      .catch((err) => {
        this.makeToast(err.response.data.error, "danger");
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
    OpenApproveModal() {
      this.ApproveModal = true;
    },
    Approve() {
      this.ApproveLoading = true;
      ChildUnderGuardianshipService.Approve(this.$route.params.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.ApproveModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childunderguardianship" });
          }, 500);
        })
         .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    OpenCancelApprovalModal() {
      this.CancelApprovalModal = true;
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      ChildUnderGuardianshipService.CancelApproval(this.$route.params.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.CancelApprovalModal = false;
          setTimeout(() => {
            this.$router.push({ name: "childunderguardianship" });
          }, 500);
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    }
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>