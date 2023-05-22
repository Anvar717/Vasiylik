<template>
  <div>
    <b-overlay :show="previewshow">
      <b-row>
        <b-col sm="12" md="9" lg="10">
          <b-card>
            <b-row>
              <b-col class="text-center mb-2 mt-1">
                <h4>{{ $t("ApplicantInformation") }}</h4>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="12" md="6" lg="4">
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("fullname") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.fullname }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("documentseries") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.documentseries }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("documentnumber") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.documentnumber }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("dateofbirth") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.dateofbirth }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col sm="12" md="6" lg="4">
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("gendername") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.gendername }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("pinfl") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.pinfl }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("dateofissue") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.dateofissue }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("dateofexpire") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.dateofexpire }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col sm="12" md="6" lg="4">
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("guardianshiptypename") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.guardianshiptypename }} </b>
                    </span>
                  </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("mobilenumber") }}: </span>
                    <span>
                      <b> {{ AdoptionPermissionList.mobilenumber }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col sm="12" md="3" lg="2">
          <b-button
            @click="OpenRejectModal"
            v-if="
              AdoptionPermissionList.CanRejected == true &&
              $can('AdoptionPermissionReject', 'permissions')
            "
            variant="success"
            block
          >
            {{ $t("Reject") }}
          </b-button>
          <b-button
            @click="OpenRefusedModal"
            v-if="
              AdoptionPermissionList.CanRefused == true &&
              $can('AdoptionPermissionRefuse', 'permissions')
            "
            variant="danger"
            block
          >
            {{ $t("Refused") }}
          </b-button>
          <b-button
            @click="ChangeForDiscussion"
            v-if="
              AdoptionPermissionList.CanForDiscussion == true &&
              $can('AdoptionPermissionForDiscussion', 'permissions')
            "
            variant="primary"
            block
          >
            {{ $t("ForDiscussion") }}
          </b-button>
        </b-col>
        <!-- <b-col sm="12" md="9" lg="10">
          <b-card>
            <b-row>
              <b-col class="text-center mb-2 mt-1">
                <h4>{{ $t("KadastrData") }}</h4>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                v-for="(itemKadastir, KadastrIndex) in KadastrData"
                :key="KadastrIndex"
                sm="12"
                md="6"
                lg="6"
              >
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("DistrictName") }}: </span>
                    <span>
                      <b> {{ itemKadastir.DistrictName }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("CadNumber") }}: </span>
                    <span>
                      <b> {{ itemKadastir.CadNumber }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("Docs") }}: </span>
                    <span style="text-align: right">
                      <b> {{ itemKadastir.Docs }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("ObjectInfoRight") }}: </span>
                    <span>
                      <b> {{ itemKadastir.ObjectInfoRight }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("RegionName") }}: </span>
                    <span>
                      <b> {{ itemKadastir.RegionName }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col> -->
        <!-- <b-col sm="12" md="9" lg="10">
          <b-card>
            <b-row>
              <b-col class="text-center mb-2 mt-1">
                <h4>{{ $t("Marriage") }}</h4>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col
                v-for="(itemMarriage, MarriageIndex) in MarriageData"
                :key="MarriageIndex"
                sm="12"
                md="6"
                lg="4"
              >
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("certnumber") }}: </span>
                    <span>
                      <b> {{ itemMarriage.certnumber }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("certseries") }}: </span>
                    <span>
                      <b> {{ itemMarriage.certseries }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("docdate") }}: </span>
                    <span>
                      <b> {{ itemMarriage.docdate }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("haddress") }}: </span>
                    <span>
                      <b> {{ itemMarriage.haddress }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("hbirthday") }}: </span>
                    <span>
                      <b> {{ itemMarriage.hbirthday }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("hfamilyafter") }}: </span>
                    <span>
                      <b> {{ itemMarriage.hfamilyafter }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("hfirstname") }}: </span>
                    <span>
                      <b> {{ itemMarriage.hfirstname }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("hpnfl") }}: </span>
                    <span>
                      <b> {{ itemMarriage.hpnfl }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("waddress") }}: </span>
                    <span>
                      <b> {{ itemMarriage.waddress }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("wbirthday") }}: </span>
                    <span>
                      <b> {{ itemMarriage.wbirthday }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("wfamilyafter") }}: </span>
                    <span>
                      <b> {{ itemMarriage.wfamilyafter }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("wfirstname") }}: </span>
                    <span>
                      <b> {{ itemMarriage.wfirstname }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("wpatronym") }}: </span>
                    <span>
                      <b> {{ itemMarriage.wpatronym }} </b>
                    </span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between">
                    <span> {{ $t("wpnfl") }}: </span>
                    <span>
                      <b> {{ itemMarriage.wpnfl }} </b>
                    </span>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col> -->
      </b-row>
      <b-row>
        <b-col sm="12" md="9" lg="10">
          <b-card>
            <b-button
              :variant="Information ? 'primary' : 'outline-primary'"
              class="mr-1"
              @click="ChangeInformation"
            >
              {{ $t("Information") }}
            </b-button>
            <b-button
              :variant="AttachFile ? 'primary' : 'outline-primary'"
              class="mr-1"
              @click="ChangeAttachFile"
            >
              {{ $t("ApplicantDocuments") }}
            </b-button>
            <b-button
              :variant="ResidenceInformation ? 'primary' : 'outline-primary'"
              class="mr-1"
              @click="ChangeResidenceInformation"
            >
              {{ $t("ResidenceInformation") }}
            </b-button>
            <b-button
              :variant="FamilyMembers ? 'primary' : 'outline-primary'"
              class="mr-1"
              @click="ChangeFamilyMembers"
            >
              {{ $t("FamilyMembers") }}
            </b-button>
            <b-button
              :variant="AttachtheRecommendation ? 'primary' : 'outline-primary'"
              class="mr-1"
              @click="ChangeAttachtheRecommendation"
            >
              {{ $t("AttachtheRecommendation") }}
            </b-button>
          </b-card>
          <b-card
            v-if="
              Information ||
              AttachtheRecommendation ||
              ResidenceInformation ||
              FamilyMembers ||
              AttachFile
            "
          >
            <b-collapse :visible="Information">
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span>
                        <h5>{{ $t("InformationFromAnExternalSystem") }}</h5>
                      </span>
                    </b-col>
                  </b-row>
                  <b-row class="mt-1">
                    <b-col
                      v-if="(AdoptionPermission.IsAddict = true)"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <b-card bg-variant="success">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ $t("HeRegisteredPsychiatricInstitution") }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #6eb05b"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                    <b-col
                      v-if="(AdoptionPermission.IsChecked = true)"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <b-card bg-variant="success">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ $t("HeAccountNarcologicalInstitution") }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #6eb05b"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col
                      v-if="(AdoptionPermission.IsAddict = false)"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <b-card style="background-color: #df5356">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ $t("SheRegisteredPsychiatricInstitution") }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #df5356"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                    <b-col
                      v-if="(AdoptionPermission.IsChecked = false)"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <b-card style="background-color: #df5356">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ $t("HeRegisteredarcologyInstitute") }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #df5356"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>{{ $t("CadastralInformation") }}</h5></span
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-card
                    bg-variant="success"
                    text-variant="white"
                    class="mt-1"
                  >
                    <b-row>
                      <b-col
                        v-for="(itemKadastir, KadastrIndex) in KadastrData"
                        :key="KadastrIndex"
                      >
                        <div>
                          <span> {{ $t("Docs") }}: </span>
                          <span>
                            <b> {{ itemKadastir.Docs }} </b>
                          </span>
                        </div>
                        <div>
                          <span> {{ $t("CadNumber") }}: </span>
                          <span>
                            <b> {{ itemKadastir.CadNumber }} </b>
                          </span>
                        </div>
                        <div>
                          <span> {{ $t("AreaBino") }}: </span>
                          <span>
                            <b> {{ itemKadastir.AreaBino }} </b>
                          </span>
                        </div>
                        <div>
                          <span> {{ $t("AreaJilaya") }}: </span>
                          <span>
                            <b> {{ itemKadastir.AreaJilaya }} </b>
                          </span>
                        </div>
                        <b-row>
                          <b-col
                            v-for="(
                              itemSubjects, SubjectsIndex
                            ) in itemKadastir.Subjects"
                            :key="SubjectsIndex"
                          >
                            <div>
                              <span> {{ $t("SubjectName") }}: </span>
                              <span>
                                <b> {{ itemSubjects.SubjectName }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("Pinfl") }}: </span>
                              <span>
                                <b> {{ itemSubjects.Pinfl }} </b>
                              </span>
                            </div>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
              <b-row v-if="MarriageData.ErrorOnChecking !== null">
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>{{ $t("MarriageCertificate") }}</h5></span
                      >
                    </b-col>
                  </b-row>
                  <b-card  bg-variant="danger" class="mt-1">
                    <b-row>
                      <b-col>
                        <h4 style="color: white">
                          {{ MarriageData.ErrorOnChecking }}
                        </h4>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
              <b-row v-if="MarriageData.ErrorOnChecking === null">
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>{{ $t("MarriageCertificate") }}</h5></span
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row v-if="MarriageData.ErrorOnChecking === null">
                <b-col sm="12" md="9" lg="10">
                  <b-card
                    bg-variant="success"
                    text-variant="white"
                    class="mt-1"
                  >
                    <b-row>
                      <b-col
                        v-for="(
                          itemMarriage, MarriageIndex
                        ) in MarriageData.marriageInfo"
                        :key="MarriageIndex"
                      >
                        <b-row>
                          <b-col sm="12" md="4" lg="4">
                            <div>
                              <span> {{ $t("certseries") }}: </span>
                              <span>
                                <b> {{ itemMarriage.certseries }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("docdate") }}: </span>
                              <span>
                                <b> {{ itemMarriage.docdate }} </b>
                              </span>
                            </div>
                          </b-col>
                          <b-col sm="12" md="4" lg="4">
                            <div>
                              <span> {{ $t("certnumber") }}: </span>
                              <span>
                                <b> {{ itemMarriage.certnumber }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("docnum") }}: </span>
                              <span>
                                <b> {{ itemMarriage.docnum }} </b>
                              </span>
                            </div>
                          </b-col>
                          <b-col sm="12" md="4" lg="4">
                            <div>
                              <span> {{ $t("certdate") }}: </span>
                              <span>
                                <b> {{ itemMarriage.certdate }} </b>
                              </span>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col sm="12" md="6" lg="6">
                            <span>
                              <h4 class="mt-1" style="color: white">
                                {{ $t("Spouse") }}
                              </h4>
                            </span>
                            <div>
                              <span> {{ $t("hfamily") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hfamily }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("hfamilyafter") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hfamilyafter }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("hfirstname") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hfirstname }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("hpatronym") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hpatronym }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("hbirthday") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hbirthday }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("hpnfl") }}: </span>
                              <span>
                                <b> {{ itemMarriage.hpnfl }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("haddress") }}: </span>
                              <span>
                                <b> {{ itemMarriage.haddress }} </b>
                              </span>
                            </div>
                          </b-col>
                          <b-col sm="12" md="6" lg="6">
                            <span>
                              <h4 class="mt-1" style="color: white">
                                {{ $t("Wife") }}
                              </h4>
                            </span>
                            <div>
                              <span> {{ $t("wfamily") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wfamily }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("wfamilyafter") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wfamilyafter }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("wfirstname") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wfirstname }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("wpatronym") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wpatronym }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("wbirthday") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wbirthday }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("wpnfl") }}: </span>
                              <span>
                                <b> {{ itemMarriage.wpnfl }} </b>
                              </span>
                            </div>
                            <div>
                              <span> {{ $t("waddress") }}: </span>
                              <span>
                                <b> {{ itemMarriage.waddress }} </b>
                              </span>
                            </div>
                          </b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
              <!-- <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span><h5>Ish joyidan daromadi haqida ma'lumot</h5></span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row> -->
              <!-- <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-card
                    style="background-color: #6eb05b; color: white"
                    class="mt-1"
                  >
                    <div>
                      <span> {{ $t("waddress") }}: </span>
                      <span>
                        <b> {{ itemMarriage.waddress }} </b>
                      </span>
                    </div>
                  </b-card>
                </b-col>
              </b-row> -->
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>
                          <!-- Sog'lig'i haqida tibbiy xulosa(sil kasalligiga qarshi
                          kurash va teri-tanosil muassasalari ma'lumotnomalari) -->
                          {{ $t("MedicalReportOnHealth") }}
                        </h5></span
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-1">
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col sm="12" md="12" lg="12">
                      <b-card bg-variant="success">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ VtekData.ErrorOnChecking }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #6eb05b"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>
                          {{ $t("InformationConviction") }}
                          <!-- Sudlanmaganligi haqida ma'lumot -->
                        </h5></span
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-1">
                <!-- <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col sm="12" md="12" lg="12">
                      <b-card style="background-color: #f4c764">
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4 style="color: white; margin-top: 7px">
                              {{ SudCheckData.ErrorOnChecking }}
                            </h4>
                          </div>
                          <div>
                            <b-avatar style="background-color: white">
                              <feather-icon
                                style="color: #6eb05b"
                                size="21"
                                icon="CheckIcon"
                              />
                            </b-avatar>
                          </div>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col> -->
                <b-col
                  sm="12"
                  md="9"
                  lg="10"
                  v-if="
                    SudCheckData.IsChecked &&
                    !!SudCheckData.records &&
                    SudCheckData.records.length > 0
                  "
                >
                  <b-card bg-variant="danger" text-variant="white">
                    <div
                      class="
                        d-flex
                        justfiy-content-between
                        w-100
                        align-items-center
                      "
                    >
                      <h6 class="m-0 p-0 w-100">{{ $t("ShaxsSudlangan") }}</h6>
                      <b-icon-exclamation-triangle-fill
                        scale="2.0"
                      ></b-icon-exclamation-triangle-fill>
                    </div>
                  </b-card>
                </b-col>
                <b-col
                  sm="12"
                  md="9"
                  lg="10"
                  v-if="
                    SudCheckData.IsChecked &&
                    !!SudCheckData.records &&
                    SudCheckData.records.length == 0
                  "
                >
                  <b-card bg-variant="success" text-variant="white">
                    <div
                      class="
                        d-flex
                        justfiy-content-between
                        w-100
                        align-items-center
                      "
                    >
                      <h4 class="m-0 p-0 w-100" style="color: white">
                        {{ SudCheckData.ErrorOnChecking }}
                      </h4>
                      <b-icon-check-circle-fill
                        scale="2.0"
                      ></b-icon-check-circle-fill>
                    </div>
                  </b-card>
                </b-col>
                <b-col
                  sm="12"
                  md="12"
                  class="mt-3"
                  v-if="!SudCheckData.IsChecked"
                >
                  <b-card bg-variant="warning" text-variant="white">
                    <div
                      class="
                        d-flex
                        justfiy-content-between
                        w-100
                        align-items-center
                      "
                    >
                      <h6 class="m-0 p-0 w-100">
                        {{ SudCheckData.ErrorOnChecking }}
                      </h6>
                      <b-icon-exclamation-triangle-fill
                        scale="2.0"
                      ></b-icon-exclamation-triangle-fill>
                    </div>
                  </b-card>
                </b-col>
              </b-row>
              <!-- <b-row
                v-for="(
                  PhysicalSalaryItem, PhysicalSalaryIndex
                ) in PhysicalSalary"
                :key="PhysicalSalaryIndex"
                class="mt-1"
              >
                <b-col sm="12" md="9" lg="10">
                  <b-card bg-variant="success" text-variant="white">
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.orgname }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.orgtin }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.salaryperiod }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.salaryyear }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.salarytaxsum }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.inpssum }}</b></span
                      >
                    </div>
                    <div>
                      <span
                        ><b>{{ PhysicalSalaryItem.inpssum }}</b></span
                      >
                    </div>
                  </b-card>
                </b-col>
              </b-row> -->
              <b-row>
                <b-col sm="12" md="9" lg="10">
                  <b-row>
                    <b-col>
                      <span
                        ><h5>
                          {{ $t("PhysicalSalary") }}
                          <!-- Sudlanmaganligi haqida ma'lumot -->
                        </h5></span
                      >
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row class="mt-1">
                <b-col sm="12" md="9" lg="10">
                  <b-table
                    ref="refInvoiceListTable"
                    :items="PhysicalSalary"
                    responsive
                    :fields="fieldsphysicalsalary"
                    primary-key="id"
                    sticky-header="65vh"
                    no-border-collapse
                    :busy="isBusy"
                    show-empty
                    :empty-text="$t('NotFound')"
                    class="position-relative"
                    @sort-changed="SortChange"
                  >
                  </b-table>
                </b-col>
              </b-row>
            </b-collapse>
            <b-collapse :visible="AttachtheRecommendation">
              <b-row v-if="AdoptPermisConclusionList == null">
                <b-col sm="12" md="4" class="mt-2">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("docnumber")
                    }}</label>
                    <div class="col-sm-7">
                      <b-form-input
                        :placeholder="$t('docnumber')"
                        v-model="
                          AdoptPermisConclusionUpdate.adoptPermisConclusion
                            .docnumber
                        "
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for>{{
                      $t("docdate")
                    }}</label>
                    <div class="col-sm-7">
                      <custom-date-picker
                        v-model="
                          AdoptPermisConclusionUpdate.adoptPermisConclusion
                            .docdate
                        "
                        @keyup="DocdateValue"
                        format="DD.MM.YYYY"
                        type="date"
                        :clearable="false"
                        :placeholder="$t('docdate')"
                      >
                      </custom-date-picker>
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="4" class="mt-2">
                  <div class="form-group form-row">
                    <label class="col-form-label col-sm-5" for
                      >{{ $t("childrenactfile") }}
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
                  <div class="form-group form-row">
                    <label
                      for="textarea-default"
                      class="text-nowrap col-form-label col-sm-5"
                      >{{ $t("commenttext") }}</label
                    >
                    <div class="col-sm-7">
                      <b-form-textarea
                        id="textarea-default"
                        :placeholder="$t('commenttext')"
                        v-model="
                          AdoptPermisConclusionUpdate.adoptPermisConclusion
                            .commenttext
                        "
                      />
                    </div>
                  </div>
                </b-col>
                <b-col sm="12" md="4">
                  <div class="mt-2 text-right">
                    <b-button
                      @click="ChangePermit"
                      v-if="AdoptionPermissionList.CanPermitted"
                      variant="success"
                    >
                      {{ $t("Permit") }}
                    </b-button>
                  </div>
                </b-col>
                <b-col class="mt-2">
                  <b-badge
                    v-if="
                      AdoptPermisConclusionUpdate.adoptPermisConclusion
                        .projectfiletext
                    "
                    style="cursor: pointer"
                    variant="primary"
                  >
                    <feather-icon icon="DownloadIcon"></feather-icon>
                    {{
                      AdoptPermisConclusionUpdate.adoptPermisConclusion
                        .projectfiletext
                    }}
                  </b-badge>
                </b-col>
              </b-row>
              <b-row v-if="AdoptPermisConclusionList != null">
                <b-col sm="12" md="5" class="mt-1">
                  <table>
                    <tr>
                      <td class="pt-1">{{ $t("docdate") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ AdoptPermisConclusionList.docdate }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("docnumber") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ AdoptPermisConclusionList.docnumber }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("commenttext") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ AdoptPermisConclusionList.commenttext }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("projectfiletext") }}:</td>
                      <td class="pl-1 pt-1">
                        <b-badge
                          v-if="AdoptPermisConclusionList.projectfiletext"
                          style="cursor: pointer"
                          variant="primary"
                        >
                          <feather-icon icon="DownloadIcon"></feather-icon>
                          {{ AdoptPermisConclusionList.projectfiletext }}
                        </b-badge>
                      </td>
                    </tr>
                  </table>
                </b-col>
              </b-row>
            </b-collapse>
            <b-collapse :visible="ResidenceInformation">
              <b-row>
                <b-col class="text-center" sm="12" md="6">
                  <h3>{{ $t("Doimiy") }}</h3>
                </b-col>
                <b-col class="text-center" sm="12" md="6">
                  <h3>{{ $t("Vaqtincha") }}</h3>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  v-for="(
                    item, index
                  ) in AdoptionPermissionList.ParentCitizensInfo"
                  :key="index"
                  class="mt-1 mb-1"
                  sm="12"
                  md="6"
                >
                  <table>
                    <tr>
                      <td class="pt-1">{{ $t("countryname") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.countryname }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("oblastname") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.oblastname }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("regionname") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.regionname }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("address") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.address }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("cadastre") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.cadastre }}</b>
                      </td>
                    </tr>
                  </table>
                </b-col>
              </b-row>
            </b-collapse>
            <b-collapse :visible="FamilyMembers">
              <b-row>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.FamilyMembers"
                  :key="index"
                  class="mt-1 mb-1"
                  sm="12"
                  md="4"
                >
                  <table>
                    <tr>
                      <td class="pt-1">{{ $t("fullname") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.fullname }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("kinshipdegreename") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.kinshipdegreename }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("documentseries") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.documentseries }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("documentnumber") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.documentnumber }}</b>
                      </td>
                    </tr>
                    <tr>
                      <td class="pt-1">{{ $t("dateofbirth") }}:</td>
                      <td class="pl-1 pt-1">
                        <b>{{ item.dateofbirth }}</b>
                      </td>
                    </tr>
                  </table>
                </b-col>
              </b-row>
            </b-collapse>
            <b-collapse :visible="AttachFile">
              <b-row>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles1"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles1")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles5"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles5")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles2"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles2")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles6"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles7")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles3"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles3")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles7"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles6")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col
                  v-for="(item, index) in AdoptionPermissionList.AttachedFiles4"
                  :key="index"
                  sm="12"
                  md="6"
                >
                  <b-card>
                    <b-row>
                      <b-col sm="12" md="12">
                        <span style="font-size: 20px; font-weight: 500">{{
                          $t("AttachedFiles4")
                        }}</span>
                      </b-col>
                      <b-col sm="12" md="12">
                        <b-badge
                          @click="DownLoad(item)"
                          class="cursor-pointer mt-2"
                          variant="info"
                        >
                          <div class="d-flex">
                            <div>
                              <b-avatar variant="light-primary" size="25">
                                <feather-icon size="21" icon="PaperclipIcon" />
                              </b-avatar>
                            </div>
                            <div>
                              <h3 class="mb-25 font-weight-bolder">
                                {{ item.projectfiletext }}
                              </h3>
                            </div>
                          </div>
                        </b-badge>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-collapse>
          </b-card>
        </b-col>
      </b-row>
      <b-modal
        size="lg"
        v-model="RejectModal"
        no-close-on-backdrop
        hide-footer
        :title="$t('Reject')"
      >
        <h4>{{ $t("WantReject") }}</h4>
        <div class="form-group form-row mt-2 mb-2">
          <label class="col-form-label col-sm-5" for>{{ $t("Reason") }}</label>
          <div class="col-sm-7">
            <b-form-input
              :placeholder="$t('Reason')"
              v-model="AdoptionPermissionReject.Reason"
            />
          </div>
        </div>
        <b-row>
          <b-col class="text-right">
            <b-button
              variant="danger"
              @click="RejectModal = false"
              class="mr-1"
            >
              {{ $t("no") }}
            </b-button>
            <b-button @click="Reject" variant="success">
              <b-spinner v-if="RejectLoading" small></b-spinner>
              {{ $t("yes") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-modal
        size="lg"
        v-model="RefusedModal"
        no-close-on-backdrop
        hide-footer
        :title="$t('Refused')"
      >
        <h4>{{ $t("WantRefused") }}</h4>
        <div class="form-group form-row mt-2 mb-2">
          <label class="col-form-label col-sm-5" for>{{ $t("Refused") }}</label>
          <div class="col-sm-7">
            <b-form-input
              :placeholder="$t('Refused')"
              v-model="AdoptionPermissionReject.Refused"
            />
          </div>
        </div>
        <b-row>
          <b-col class="text-right">
            <b-button
              variant="danger"
              @click="RefusedModal = false"
              class="mr-1"
            >
              {{ $t("no") }}
            </b-button>
            <b-button @click="Refused" variant="success">
              <b-spinner v-if="RefusedLoading" small></b-spinner>
              {{ $t("yes") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </b-overlay>
  </div>
</template>
<script>
import AdoptionPermissionService from "@/services/document/adoptionpermission.service";
import AdmImageService from "@/services/others/admImage.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
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
  BFormFile,
  BFormTextarea,
  BCollapse,
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
    CustomDatePicker,
    BFormFile,
    BFormTextarea,
    BCollapse,
  },
  props: {
    iscomponent: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      lang: localStorage.getItem("locale") || "ru",
      AdoptionPermissionList: {},
      AdoptionPermission: {},
      KadastrData: {},
      MarriageData: {},
      AdoptPermisConclusionList: {},
      fieldsphysicalsalary: [
        {
          key: "orgname",
          label: this.$t("organizationname"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "orgtin",
          label: this.$t("orgtin"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "salaryperiod",
          label: this.$t("salaryperiod"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "salaryyear",
          label: this.$t("salaryyear"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "salary",
          label: this.$t("salary"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "salarytaxsum",
          label: this.$t("salarytaxsum"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
        {
          key: "inpssum",
          label: this.$t("inpssum"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      AdoptPermisConclusionUpdate: {
        adoptPermisId: this.$route.params.id,
        adoptPermisConclusion: {
          id: "",
          adoptionpermissionid: "",
          docnumber: "",
          docdate: "",
          projectfileid: "",
          projectfiletext: "",
          projectfiletype: "",
          commenttext: "",
          organizationid: 0,
          statusid: 0,
        },
      },
      // filter:{

      // },
      AdoptionPermissionReject: {
        AdoptPermisId: 0,
        Reason: "",
      },
      items: [],
      RejectLoading: false,
      RefusedLoading: false,
      RejectModal: false,
      RefusedModal: false,
      config: { dateFormat: "d.m.Y" },
      previewshow: false,
      file: [],
      Information: false,
      AttachtheRecommendation: false,
      ResidenceInformation: false,
      FamilyMembers: false,
      AttachFile: false,
    };
  },
  async created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.previewshow = true;
    var id = 0;
    id = !!this.iscomponent ? this.id : this.$route.params.id;
    await AdoptionPermissionService.Get(id)
      .then((res) => {
        this.AdoptionPermissionList = res.data.result.AdoptionPermission;
        this.AdoptPermisConclusionList = res.data.result.AdoptPermisConclusion;
        this.AdoptionPermission = res.data.result.AdoptionPermission.HealthData;
        this.KadastrData =
          res.data.result.AdoptionPermission.KadastrData.Objects;
        this.PhysicalSalary =
          res.data.result.AdoptionPermission.PhysicalSalary.PhysicalSalarys;
        this.MarriageData = res.data.result.AdoptionPermission.Marriage;
        this.VtekData = res.data.result.AdoptionPermission.Vtek;
        this.SudCheckData = res.data.result.AdoptionPermission.SudCheck;
        this.previewshow = false;
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
    ChangeInformation() {
      this.Information = !this.Information;
      this.AttachtheRecommendation = false;
      this.ResidenceInformation = false;
      this.FamilyMembers = false;
      this.AttachFile = false;
    },
    ChangeAttachtheRecommendation() {
      this.AttachtheRecommendation = !this.AttachtheRecommendation;
      this.Information = false;
      this.ResidenceInformation = false;
      this.FamilyMembers = false;
      this.AttachFile = false;
      this.adoptPermisConclusion = {
        id: "",
        adoptionpermissionid: "",
        docnumber: "",
        docdate: "",
        projectfileid: "",
        projectfiletext: "",
        projectfiletype: "",
        commenttext: "",
        organizationid: 0,
        statusid: 0,
      };
    },
    ChangeResidenceInformation() {
      this.ResidenceInformation = !this.ResidenceInformation;
      this.Information = false;
      this.AttachtheRecommendation = false;
      this.FamilyMembers = false;
      this.AttachFile = false;
    },
    ChangeFamilyMembers() {
      this.FamilyMembers = !this.FamilyMembers;
      this.Information = false;
      this.AttachtheRecommendation = false;
      this.ResidenceInformation = false;
      this.AttachFile = false;
    },
    ChangeAttachFile() {
      this.AttachFile = !this.AttachFile;
      this.Information = false;
      this.AttachtheRecommendation = false;
      this.ResidenceInformation = false;
      this.FamilyMembers = false;
    },
    Edit() {
      this.$router.push({
        name: "editadmregapplicationbyadmin",
        params: { id: this.$route.params.id },
      });
    },
    OpenRejectModal() {
      this.RejectModal = true;
    },
    check() {
      if (
        this.adoptPermisConclusion.docnumber === 0 ||
        this.adoptPermisConclusion.docnumber === null ||
        this.adoptPermisConclusion.docnumber === undefined ||
        this.adoptPermisConclusion.docnumber === ""
      ) {
        this.$makeToast(this.$t("docnumberNotSelected"), "danger");
        return false;
      }
      if (
        this.adoptPermisConclusion.docdate === 0 ||
        this.adoptPermisConclusion.docdate === null ||
        this.adoptPermisConclusion.docdate === undefined ||
        this.adoptPermisConclusion.docdate === ""
      ) {
        this.$makeToast(this.$t("docdateNotSelected"), "danger");
        return false;
      }
      if (
        this.adoptPermisConclusion.commenttext === 0 ||
        this.adoptPermisConclusion.commenttext === null ||
        this.adoptPermisConclusion.commenttext === undefined ||
        this.adoptPermisConclusion.commenttext === ""
      ) {
        this.$makeToast(this.$t("commenttextNotSelected"), "danger");
        return false;
      }
      return true;
    },
    ChangeFile(data) {
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
          (this.AdoptPermisConclusionUpdate.adoptPermisConclusion.projectfileid =
            res.data.id),
            (this.AdoptPermisConclusionUpdate.adoptPermisConclusion.projectfiletext =
              res.data.pfiletext),
            (this.AdoptPermisConclusionUpdate.adoptPermisConclusion.projectfiletype =
              res.data.pfiletype);
        })
        .catch((error) => {
          this.show = false;
          this.$makeToast(error.response.data.error, "danger");
        });
      this.file = [];
    },
    ChangeForDiscussion() {
      AdoptionPermissionService.ForDiscussion(this.$route.params.id)
        .then((res) => {
          this.$makeToast(this.$t("SuccessCancel"), "success");
          setTimeout(() => {
            this.$router.push({ name: "adoptionpermission" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
        });
    },
    DocdateValue(value) {
      this.AdoptPermisConclusionUpdate.adoptPermisConclusion.docdate = value;
    },
    OpenRefusedModal() {
      this.RefusedModal = true;
    },
    ChangePermit() {
      // if (!this.check()) {
      //   return false;
      // }
      console.log(this.AdoptPermisConclusion);
      // var data = {
      //   adoptPermisConclusion: this.AdoptPermisConclusion,
      //   adoptPermisId: this.$route.params.id,
      // };
      this.AdoptPermisConclusionUpdate.adoptPermisConclusion.adoptionpermissionid =
        this.$route.params.id;
      AdoptionPermissionService.Permit(this.AdoptPermisConclusionUpdate)
        .then((res) => {
          this.$makeToast(this.$t("SuccessCancel"), "success");
          setTimeout(() => {
            this.$router.push({ name: "adoptionpermission" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
        });
    },
    Reject() {
      this.RejectLoading = true;
      this.AdoptionPermissionReject.AdoptPermisId = this.$route.params.id;
      AdoptionPermissionService.Reject(this.AdoptionPermissionReject)
        .then((res) => {
          this.RejectLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.RejectModal = false;
          setTimeout(() => {
            this.$router.push({ name: "adoptionpermission" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
          this.RejectLoading = false;
        });
    },
    Refused() {
      this.AdoptionPermissionReject.AdoptPermisId = this.$route.params.id;
      this.RefusedLoading = true;
      AdoptionPermissionService.Refused(this.AdoptionPermissionReject)
        .then((res) => {
          this.RefusedLoading = false;
          this.$makeToast(this.$t("SuccessCancel"), "success");
          this.RefusedModal = false;
          setTimeout(() => {
            this.$router.push({ name: "adoptionpermission" });
          }, 500);
        })
        .catch((err) => {
          this.$makeToast(err.response.data.error, "danger");
          this.RefusedLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.spes-card .card-body {
  padding-bottom: 6px;
}
</style>