<template>
  <b-overlay :show="show">
    <b-modal
      v-model="DeleteModalFile"
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
          <b-button
            @click="DeleteModalFile = false"
            class="mr-1"
            variant="danger"
          >
            {{ $t("no") }}
          </b-button>
          <b-button @click="DeleteAdmImage(DeleteItem)" variant="success">
            <b-spinner v-if="DeleteLoading" small></b-spinner>
            {{ $t("yes") }}
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
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
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.docnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.docdate }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("childname") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.fullname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("documentseries") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.documentseries }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("documentnumber") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.documentnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("dateofbirth") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.dateofbirth }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("gendername") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.gendername }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("pinfl") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.pinfl }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("dateofissue") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.dateofissue }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("dateofexpire") }}: </span>
                  <span>
                    <b> {{ AdoptionPermission.dateofexpire }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          v-if="courtApplication.CanAccept"
          block
          @click="$refs['AcceptModal'].show()"
          variant="success"
        >
          {{ $t("Accept") }}
        </b-button>
        <b-button
          v-if="courtApplication.CanReject"
          block
          @click="$refs['RejectModal'].show()"
          variant="danger"
        >
          {{ $t("Reject") }}
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-button
            :variant="ChildRegActCollapse ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeChildRegAct"
          >
            {{ $t("childrenregact") }}
          </b-button>
          <!-- <b-button
            :variant="ApplicantDocuments ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeApplicantDocuments"
          >
            {{ $t("ApplicantDocuments") }}
          </b-button> -->
          <!-- <b-button
            :variant="SummarySPON ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeSummarySPON"
          >
            {{ $t("SummarySPON") }}
          </b-button> -->
          <!-- <b-button
            :variant="CourtDecision ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeCourtDecision"
          >
            {{ $t("CourtDecision") }}
          </b-button> -->
          <b-button
            :variant="
              AdoptionPermissionCollapse ? 'primary' : 'outline-primary'
            "
            class="mr-1"
            @click="ChangeAdoptionPermission"
          >
            {{ $t("AdoptionPermissionCollapse") }}
          </b-button>
        </b-card>
        <b-card v-if="ChildRegActCollapse || AdoptionPermissionCollapse">
          <b-collapse :visible="ChildRegActCollapse">
            <child-reg-act-component
              :iscomponent="true"
              :id="childRegistrationActList.id"
            ></child-reg-act-component>
          </b-collapse>
          <!-- <b-collapse :visible="ApplicantDocuments">
            <b-row>
              <b-col sm="12" md="9" lg="10">
                <b-row>
                  <b-col
                    v-for="(item, index) in AdoptionPermission.AttachedFiles1"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles2"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles3"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles4"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles5"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles6"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
                    v-for="(item, index) in AdoptionPermission.AttachedFiles7"
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
                                  <feather-icon
                                    size="21"
                                    icon="PaperclipIcon"
                                  />
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
              </b-col>
            </b-row>
          </b-collapse> -->
          <!-- <b-collapse :visible="SummarySPON">
            <b-row>
              <b-col sm="12" md="9" lg="10">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="12" md="6" lg="6">
                      <b-list-group>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("commenttext") }}: </span>
                          <span>
                            <b> {{ AdoptPermisConclusion.commenttext }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("docdate") }}: </span>
                          <span>
                            <b> {{ AdoptPermisConclusion.docdate }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("docnumber") }}: </span>
                          <span>
                            <b> {{ AdoptPermisConclusion.docnumber }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("projectfiletext") }}: </span>
                          <span>
                            <b-badge
                              @click="DownLoad(item)"
                              class="cursor-pointer"
                              variant="info"
                            >
                              <div class="d-flex">
                                <div>
                                  <b-avatar variant="light-primary" size="25">
                                    <feather-icon
                                      size="21"
                                      icon="PaperclipIcon"
                                    />
                                  </b-avatar>
                                </div>
                                <div>
                                  <h3
                                    style="font-size: 20px"
                                    class="mb-25 font-weight-bolder"
                                  >
                                    {{ AdoptPermisConclusion.projectfiletext }}
                                  </h3>
                                </div>
                              </div>
                            </b-badge>
                          </span>
                        </b-list-group-item>
                      </b-list-group>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-collapse> -->
          <!-- <b-collapse :visible="CourtDecision">
            <b-row>
              <b-col sm="12" md="9" lg="10">
                <b-card>
                  <b-row class="mb-2">
                    <b-col
                      v-for="(item, index) in courtApplicationList"
                      :key="index"
                      sm="12"
                      md="6"
                      lg="6"
                    >
                      <b-list-group>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("decisiondate") }}: </span>
                          <span>
                            <b> {{ item.decisiondate }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("decisiondetail") }}: </span>
                          <span>
                            <b> {{ item.decisiondetail }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("decisionnumber") }}: </span>
                          <span>
                            <b> {{ item.decisionnumber }} </b>
                          </span>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between"
                        >
                          <span> {{ $t("projectfiletext") }}: </span>
                          <span>
                            <b-badge
                              @click="DownLoad(item)"
                              class="cursor-pointer"
                              variant="info"
                            >
                              <div class="d-flex">
                                <div>
                                  <b-avatar variant="light-primary" size="25">
                                    <feather-icon
                                      size="21"
                                      icon="PaperclipIcon"
                                    />
                                  </b-avatar>
                                </div>
                                <div>
                                  <h3
                                    style="font-size: 20px"
                                    class="mb-25 font-weight-bolder"
                                  >
                                    {{ item.projectfiletext }}
                                  </h3>
                                </div>
                              </div>
                            </b-badge>
                          </span>
                        </b-list-group-item>
                      </b-list-group>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-collapse> -->
          <b-collapse :visible="AdoptionPermissionCollapse">
            <adoption-permission-component
              iscomponent
              :id="AdoptionPermission.id"
            ></adoption-permission-component>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      :ref="'AcceptModal'"
      :title="$t('Sud qarori')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Accept"
      size="lg"
    >
      <b-row>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisiondate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="item.decisiondate"
                @keyup="DecisionDateValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('decisiondate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisionnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('decisionnumber')"
                v-model="item.decisionnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisiondetail")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('decisiondetail')"
                v-model="item.decisiondetail"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="6">
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
        </b-col>
      </b-row>
      <b-row>
        <b-col
          sm="6"
          md="6"
          lg="3"
          v-for="(item, index) in courtApplication.Files"
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
    </b-modal>
    <b-modal
      :ref="'RejectModal'"
      :title="$t('Reject')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Reject"
      size="lg"
    >
      <b-row>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisiondate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="item.decisiondate"
                @keyup="DecisionDateValue"
                format="DD.MM.YYYY"
                type="date"
                :clearable="false"
                :placeholder="$t('decisiondate')"
              >
              </custom-date-picker>
            </div>
          </div>
        </b-col>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisionnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('decisionnumber')"
                v-model="item.decisionnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col
          v-for="(item, index) in courtApplication.Files"
          :key="index"
          sm="12"
          md="6"
          lg="6"
        >
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("decisiondetail")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('decisiondetail')"
                v-model="item.decisiondetail"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="6">
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
        </b-col>
      </b-row>
      <b-row>
        <b-col
          sm="6"
          md="6"
          lg="3"
          v-for="(item, index) in courtApplication.Files"
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
  BCollapse,
  BFormInput,
  BFormFile,
  BAvatar,
  BSpinner,
  BFormCheckbox,
  BInputGroupAppend,
  BInputGroup,
  BTable,
  BBadge,
} from "bootstrap-vue";
import CourtApplicationService from "@/services/document/courtapplication.service";
import AdmImageService from "@/services/others/admImage.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import ChildRegActComponent from "../childregistrationact/view.vue";
import AdoptionPermissionComponent from "../adoptionpermission/view.vue";
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
    BFormTextarea,
    BCardText,
    BCollapse,
    BFormInput,
    BFormFile,
    BAvatar,
    BSpinner,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    BTable,
    CustomDatePicker,
    BBadge,
    ChildRegActComponent,
    AdoptionPermissionComponent,
  },
  data() {
    return {
      show: false,
      CourtApplication: {},
      CourtApplicationList: {},
      UpdateCourtApplicationFile: {},
      AdoptionPermission: {},
      AdoptPermisConclusion: {},
      childRegistrationAct: {},
      courtApplication: {},
      AcceptLoading: false,
      RejectLoading: false,
      file: [],
      DeleteModalFile: false,
      DeleteLoading: false,
      DeleteItem: {
        id: 0,
        ownerid: 0,
        tableid: 0,
        documentid: 0,
        ordernumber: 0,
        projectfileid: "",
        projectfiletext: "",
        projectfiletype: "",
        decisiondate: "",
        decisionnumber: "",
        decisiondetail: "",
        responsibleperson: "",
        Status: 1,
        DownloadLoading: false,
      },
      ChildRegActCollapse: false,
      AdoptionPermissionCollapse: false,
    };
  },
  created() {
    this.Refresh();
  },
  methods: {
    Refresh() {
      this.show = true;
      CourtApplicationService.GetCourtApplicationFile(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.CourtApplication = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
      CourtApplicationService.GetDetail(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.AdoptionPermission =
            res.data.result.adoptionPermissionForCommission.AdoptionPermission;
          this.AdoptPermisConclusion =
            res.data.result.adoptionPermissionForCommission.AdoptPermisConclusion;
          this.childRegistrationAct =
            res.data.result.childRegistrationAct.person;
          this.courtApplication = res.data.result.courtApplication;
          this.courtApplicationList = res.data.result.courtApplication.Files;
          this.childRegistrationActList = res.data.result.childRegistrationAct;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeChildRegAct() {
      this.ChildRegActCollapse = !this.ChildRegActCollapse;
      this.AdoptionPermissionCollapse = false;
    },
    // ChangeApplicantDocuments() {
    //   this.ApplicantDocuments = !this.ApplicantDocuments;
    //   this.ChildRegActCollapse = false;
    //   this.SummarySPON = false;
    //   this.CourtDecision = false;
    //   this.AdoptionPermissionCollapse = false;
    // },
    // ChangeSummarySPON() {
    //   this.SummarySPON = !this.SummarySPON;
    //   this.ChildRegActCollapse = false;
    //   this.ApplicantDocuments = false;
    //   this.CourtDecision = false;
    //   this.AdoptionPermissionCollapse = false;
    // },
    // ChangeCourtDecision() {
    //   this.CourtDecision = !this.CourtDecision;
    //   this.ChildRegActCollapse = false;
    //   this.ApplicantDocuments = false;
    //   this.SummarySPON = false;
    //   this.AdoptionPermissionCollapse = false;
    // },
    ChangeAdoptionPermission() {
      this.AdoptionPermissionCollapse = !this.AdoptionPermissionCollapse;
      this.ChildRegActCollapse = false;
    },
    ChangeFile(data) {
      console.log(data.target.files.length);
      console.log(data.target.files[0].size);
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
          console.log(this.CourtApplicationList);
          this.courtApplication.Files.push({
            id: "",
            ownerid: "",
            ordernumber: 0,
            projectfileid: res.data.id,
            projectfiletext: res.data.pfiletext,
            projectfiletype: res.data.pfiletype,
            decisiondate: "",
            decisionnumber: "",
            decisiondetail: "",
            responsibleperson: "",
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
      this.DeleteModalFile = true;
      this.DeleteItem = item;
    },
    DeleteAdmImage(item) {
      this.DeleteLoading = true;
      AdmImageService.Delete(item.projectfileid)
        .then((res) => {
          this.DeleteLoading = false;
          var self = this;
          self.courtApplication.Files.forEach(function (el) {
            if (item.projectfileid == el.projectfileid) {
              el.Status = 3;
            }
          });
          this.$makeToast(this.$t("DeleteSuccess"), "success");
          this.DeleteModalFile = false;
        })
        .catch((error) => {
          this.DeleteLoading = false;
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    DecisionDateValue(value) {
      this.item.decisiondate = value;
    },
    Accept() {
      this.AcceptLoading = true;
      var CourtApplicationData = {
        id: this.$route.params.id,
        docnumber: this.courtApplication.docnumber,
        docdate: this.courtApplication.docdate,
        childselectapplicationid:
          this.courtApplication.childselectapplicationid,
        adoptionpermissionid: this.AdoptionPermission.id,
        childregistrationactid: this.childRegistrationAct.id,
        statusid: 0,
      };
      CourtApplicationData.files = this.courtApplication.Files;
      CourtApplicationService.Accept(CourtApplicationData)
        .then((res) => {
          this.AcceptLoading = false;
          this.Refresh();
          this.$router.push({ name: "courtapplication" });
          this.$makeToast(this.$t("AcceptSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.AcceptLoading = false;
        });
    },
    Reject() {
      this.RejectLoading = true;
      var CourtApplicationData = {
        id: this.$route.params.id,
        docnumber: this.courtApplication.docnumber,
        docdate: this.courtApplication.docdate,
        childselectapplicationid:
          this.courtApplication.childselectapplicationid,
        adoptionpermissionid: this.AdoptionPermission.id,
        childregistrationactid: this.childRegistrationAct.id,
        statusid: 0,
      };
      CourtApplicationData.files = this.courtApplication.Files;
      CourtApplicationService.Reject(CourtApplicationData)
        .then((res) => {
          this.RejectLoading = false;
          this.Refresh();
          this.$router.push({ name: "courtapplication" });
          this.$makeToast(this.$t("AcceptSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.RejectLoading = false;
        });
    },
    BindValue(value) {
      this.CourtApplication.docdate = value;
    },
  },
};
</script>

<style>
</style>
