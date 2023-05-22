<template>
  <b-overlay :show="show">
    <b-row>
      <b-col sm="12" md="9" lg="10">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docnumber") }}: </span>
                  <span>
                    <b> {{ HousingQueue.docnumber }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("docdate") }}: </span>
                  <span>
                    <b> {{ HousingQueue.docdate }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("dateofbirth") }}: </span>
                  <span>
                    <b> {{ HousingQueue.dateofbirth }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("housingoblastname") }}: </span>
                  <span>
                    <b> {{ HousingQueue.housingoblastname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("housingregionname") }}: </span>
                  <span>
                    <b> {{ HousingQueue.housingregionname }} </b>
                  </span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between">
                  <span> {{ $t("personname") }}: </span>
                  <span class="text-primary">
                    <b> {{ HousingQueue.personname }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col v-if="HousingQueue.statusid == 49" sm="12" md="6" lg="4">
              <b-list-group>
                <b-list-group-item>
                  <span> {{ $t("ordernumbers") }}: </span>
                  <span>
                    <b> {{ HousingQueue.ordernumber }} </b>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-card>
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
        <b-card>
          <b-button
            v-if="HousingQueue.isorphan"
            :variant="ChildRegActCollapse ? 'primary' : 'outline-primary'"
            class="mr-1"
            @click="ChangeChildRegAct"
          >
            {{ $t("childrenregact") }}
          </b-button>
          <b-button
            v-if="!HousingQueue.isorphan"
            :variant="
              ChildRegGuardinshipCollapse ? 'primary' : 'outline-primary'
            "
            class="mr-1"
            @click="ChangeChildRegGuardinship"
          >
            {{ $t("childrenregact") }}
          </b-button>
          <b-button
            :variant="HistoryCollapse ? 'primary' : 'outline-primary'"
            @click="ChangeHistory"
            class="mr-1"
          >
            {{ $t("History") }}
          </b-button>
          <b-button
            v-if="HousingQueue.CanExecuted"
            :variant="Decision ? 'primary' : 'outline-primary'"
            @click="ChangeDecision"
            class="mr-1"
          >
            {{ $t("Decision") }}
          </b-button>
          <b-button
            v-if="HousingQueue.CanWarranted"
            :variant="Order ? 'primary' : 'outline-primary'"
            @click="ChangeOrder"
            class="mr-1"
          >
            {{ $t("Order") }}
          </b-button>
          <b-button
            v-if="HousingQueue.CanFormalized"
            :variant="Registration ? 'primary' : 'outline-primary'"
            @click="ChangeRegistration"
          >
            {{ $t("Registration") }}
          </b-button>
        </b-card>
        <b-card
          v-if="
            ChildRegActCollapse ||
            ChildRegGuardinshipCollapse ||
            HistoryCollapse ||
            Decision ||
            Order ||
            Registration
          "
        >
          <b-collapse :visible="ChildRegActCollapse">
            <child-reg-act-component
              v-if="ChildRegActCollapse"
              :iscomponent="true"
              :id="HousingQueue.childregistrationactid"
            ></child-reg-act-component>
          </b-collapse>
          <b-collapse :visible="ChildRegGuardinshipCollapse">
            <child-reg-guardinship-component
              v-if="ChildRegGuardinshipCollapse"
              :iscomponent="true"
              :id="HousingQueue.childunderguardianshipid"
            ></child-reg-guardinship-component>
          </b-collapse>
          <b-collapse :visible="HistoryCollapse">
            <doc-history :data="HousingQueue.History"></doc-history>
          </b-collapse>
          <b-collapse :visible="Decision">
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("decisiondate")
                  }}</label>
                  <div class="col-sm-7">
                    <custom-date-picker
                      v-model="HousingQueueDecision.decisiondate"
                      @keyup="DecisionDate"
                      format="DD.MM.YYYY"
                      type="date"
                      :clearable="false"
                      :placeholder="$t('decisiondate')"
                    >
                    </custom-date-picker>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("Oblast")
                  }}</label>
                  <div class="col-sm-7">
                    <v-select
                      :options="OblastList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="HousingQueueDecision.oblastid"
                      @input="ChangeOblast"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("decisionnumber")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('decisionnumber')"
                      v-model="HousingQueueDecision.decisionnumber"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("regionname")
                  }}</label>
                  <div class="col-sm-7">
                    <v-select
                      :options="RegionList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="HousingQueueDecision.regionid"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("detail")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-textarea
                      :placeholder="$t('detail')"
                      v-model="HousingQueueDecision.detail"
                    >
                    </b-form-textarea>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("housenumber")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('housenumber')"
                      v-model="HousingQueueDecision.housenumber"
                    />
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col>
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
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("address")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('address')"
                      v-model="HousingQueueDecision.address"
                    />
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("apartmentnumber")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('apartmentnumber')"
                      v-model="HousingQueueDecision.apartmentnumber"
                    />
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col
                sm="6"
                md="3"
                lg="2"
                v-for="(item, index) in HousingQueueDecision.DecisionFiles"
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
              <b-col class="text-center mt-2">
                <b-button
                  v-if="HousingQueue.CanSaveDecision"
                  variant="success"
                  @click="AddtoData"
                >
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-collapse>
          <b-collapse :visible="Order">
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("orderdate")
                  }}</label>
                  <div class="col-sm-7">
                    <custom-date-picker
                      v-model="HousingQueueOrder.orderdate"
                      @keyup="OrderdateDate"
                      format="DD.MM.YYYY"
                      type="date"
                      :clearable="false"
                      :placeholder="$t('orderdate')"
                    >
                    </custom-date-picker>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("Oblast")
                  }}</label>
                  <div class="col-sm-7">
                    <v-select
                      :options="oblastList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="HousingQueueOrder.oblastid"
                      @input="ChangeOblastOrder"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("amount")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('amount')"
                      v-model="HousingQueueOrder.amount"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("orderNumber")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('orderNumber')"
                      v-model="HousingQueueOrder.ordernumber"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("regionname")
                  }}</label>
                  <div class="col-sm-7">
                    <v-select
                      :options="regionList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="HousingQueueOrder.regionid"
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("allocationtype")
                  }}</label>
                  <div class="col-sm-7">
                    <v-select
                      :options="allocationtypeList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="displayname"
                      v-model="HousingQueueOrder.allocationtypeid"
                    ></v-select>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("ordergivenorganization")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('ordergivenorganization')"
                      v-model="HousingQueueOrder.ordergivenorganization"
                    />
                  </div>
                </div>
              </b-col>

              <b-col>
                <div class="form-group form-row">
                  <label class="col-form-label col-sm-5" for>{{
                    $t("address")
                  }}</label>
                  <div class="col-sm-7">
                    <b-form-input
                      :placeholder="$t('address')"
                      v-model="HousingQueueOrder.address"
                    />
                  </div>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="12" lg="6" md="6">
                <span
                  ><b>{{ $t("OrderTable") }}</b></span
                >
              </b-col>
              <b-col class="text-right">
                <b-button
                  @click="OpenModalOrder"
                  size="sm"
                  variant="outline-primary"
                >
                  <feather-icon icon="PlusIcon"></feather-icon>
                  {{ $t("Add") }}
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" md="12" lg="12">
                <b-table
                  :fields="fields"
                  :items="HousingQueueOrder.OrderTable"
                  small
                  class="text-center"
                >
                  <template #cell(actions)="{ item }">
                    <div class="text-center">
                      <b-link>
                        <feather-icon
                          style="margin-right: 5px"
                          @click="EditTableOrder(item)"
                          icon="EditIcon"
                        ></feather-icon>
                      </b-link>
                      <b-link>
                        <feather-icon
                          @click="DeleteOrder(item)"
                          icon="Trash2Icon"
                        ></feather-icon>
                      </b-link>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-modal
              size="xl"
              v-model="ModalShowOrder"
              no-close-on-backdrop
              hide-footer
              :title="$t('OrderTable')"
            >
              <b-row>
                <b-col sm="12" md="12" lg="2">
                  <label>{{ $t("identitydocument") }}</label>
                  <div>
                    <v-select
                      :options="IdentityDocumentList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      label="name"
                      v-model="filter.identityDocumentId"
                      @input="ChangeIdentityDoc"
                    ></v-select>
                  </div>
                </b-col>
                <b-col sm="12" md="12" lg="2">
                  <label>{{ $t("documentseries") }}</label>
                  <div>
                    <v-select
                      v-if="filter.identityDocumentId == 1"
                      :options="DocumentSeriesList"
                      :reduce="(item) => item.name"
                      label="name"
                      :placeholder="$t('documentseries')"
                      v-model="filter.documentSeries"
                    >
                    </v-select>
                    <b-form-input
                      class="text-upper"
                      v-if="filter.identityDocumentId != 1"
                      :placeholder="$t('AA')"
                      v-model="filter.documentSeries"
                    />
                  </div>
                </b-col>
                <b-col sm="12" md="12" lg="2">
                  <label>{{ $t("documentnumber") }}</label>
                  <div>
                    <b-form-input
                      :placeholder="$t('documentnumber')"
                      v-model="filter.documentNumber"
                    />
                  </div>
                </b-col>

                <b-col
                  sm="12"
                  md="12"
                  lg="2"
                  v-if="
                    filter.identityDocumentId != 3 &&
                    filter.identityDocumentId != 4
                  "
                >
                  <label>{{ $t("dateofbirth") }}</label>
                  <div>
                    <custom-date-picker
                      v-model="filter.dateOfBirth"
                      @keyup="BindValue"
                      format="DD.MM.YYYY"
                      type="date"
                      :clearable="false"
                      :placeholder="$t('dateofbirth')"
                    >
                    </custom-date-picker>
                  </div>
                </b-col>
                <b-col sm="12" md="12" lg="2">
                  <label>{{ $t("kinshipdegree") }}</label>
                  <div>
                    <v-select
                      :options="kinshipdegreeList"
                      :reduce="(item) => item.id"
                      :placeholder="$t('ChooseBelow')"
                      @input="ChangeKinshipdegree"
                      label="name"
                      v-model="filter.kinshipdegreeid"
                    ></v-select>
                  </div>
                </b-col>
                <b-col
                  sm="12"
                  md="12"
                  lg="2"
                  v-if="
                    filter.identityDocumentId == 3 ||
                    filter.identityDocumentId == 4
                  "
                >
                  <label>{{ $t("pinfl") }}</label>
                  <div>
                    <b-form-input
                      :placeholder="$t('pinfl')"
                      v-model="filter.pinfl"
                    />
                  </div>
                </b-col>
                <b-col sm="12" md="12" lg="2">
                  <label for=""></label>
                  <div style="margin-top: 2px">
                    <b-button @click="getpersondata" variant="primary">
                      <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                      <b-spinner v-if="SearchLoading" small></b-spinner>
                      {{ $t("search") }}
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-2" v-if="Person.familyname">
                <b-col sm="12" md="4">
                  <b-card>
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("familyname") }} :</span>
                        <span>
                          <b> {{ Person.familyname }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("firstname") }} :</span>
                        <span>
                          <b> {{ Person.firstname }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("lastname") }} :</span>
                        <span>
                          <b> {{ Person.lastname }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("shortname") }} :</span>
                        <span>
                          <b> {{ Person.shortname }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col>
                <b-col sm="12" md="4">
                  <b-card>
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("fullname") }} :</span>
                        <span>
                          <b> {{ Person.fullname }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("dateofbirth") }} :</span>
                        <span>
                          <b> {{ Person.dateofbirth }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("gendername") }} :</span>
                        <span>
                          <b> {{ Person.gendername }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("pinfl") }} :</span>
                        <span>
                          <b> {{ Person.pinfl }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col>
                <!-- <b-col
                  sm="12"
                  md="4"
                  v-for="(item, index) in PersonList"
                  :key="index"
                >
                  <b-card>
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("identitydocumentname") }} :</span>
                        <span>
                          <b> {{ item.identitydocumentname }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("documentseries") }} :</span>
                        <span>
                          <b> {{ item.documentseries }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("documentnumber") }} :</span>
                        <span>
                          <b> {{ item.documentnumber }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("dateofissue") }} :</span>
                        <span>
                          <b> {{ item.dateofissue }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span>{{ $t("dateofexpire") }} :</span>
                        <span>
                          <b> {{ item.dateofexpire }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-card>
                </b-col> -->
              </b-row>
              <b-row class="mt-2">
                <b-col class="text-center">
                  <b-button
                    variant="danger"
                    @click="ModalShowOrder = false"
                    class="mr-1"
                  >
                    {{ $t("back") }}
                  </b-button>
                  <b-button variant="success" @click="AddData">
                    {{ $t("Save") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-modal>
            <b-row class="mt-2">
              <b-col class="text-center mt-2">
                <b-button
                  v-if="HousingQueue.CanSaveOrder"
                  variant="success"
                  @click="AddDataOrder"
                >
                  {{ $t("Save") }}
                </b-button>
              </b-col>
            </b-row>
          </b-collapse>
          <b-collapse :visible="Registration">
            <b-card
              v-for="(item, index) in HousingQueueRegistrationList"
              :key="index"
            >
              <b-row>
                <b-col sm="12" md="6" lg="6">
                  <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("Address") }}: </span>
                      <span>
                        <b> {{ item.Address }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("CadNumber") }}: </span>
                      <span>
                        <b> {{ item.CadNumber }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("Docs") }}: </span>
                      <span>
                        <b> {{ item.Docs }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("ObjectRight") }}: </span>
                      <span>
                        <b> {{ item.ObjectRight }} </b>
                      </span>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("ObjectType") }}: </span>
                      <span>
                        <b> {{ item.ObjectType }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("OblastName") }}: </span>
                      <span>
                        <b> {{ item.OblastName }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("RegionName") }}: </span>
                      <span>
                        <b> {{ item.RegionName }} </b>
                      </span>
                    </b-list-group-item>
                    <b-list-group-item class="d-flex justify-content-between">
                      <span> {{ $t("ResponseId") }}: </span>
                      <span>
                        <b> {{ item.ResponseId }} </b>
                      </span>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
                <b-col class="text-right" sm="12" md="12" lg="12">
                  <b-button
                    :variant="Subjects ? 'primary' : 'outline-primary'"
                    @click="ChangeRegistrationSubjects"
                    class="mt-3 mb-2"
                    >{{ $t("Subjects") }}</b-button
                  >
                </b-col>
                <b-collapse v-if="Subjects" :visible="Subjects">
                  <b-col
                    sm="12"
                    md="12"
                    lg="12"
                    v-for="(el, i) in item.Subjects"
                    :key="i + 'ghghg'"
                  >
                    <b-list-group>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span> {{ $t("Inn") }}: </span>
                        <span>
                          <b> {{ el.Inn }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span> {{ $t("Passport") }}: </span>
                        <span>
                          <b> {{ el.Passport }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span> {{ $t("Pinfl") }}: </span>
                        <span>
                          <b> {{ el.Pinfl }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span> {{ $t("SharePercent") }}: </span>
                        <span>
                          <b> {{ el.SharePercent }} </b>
                        </span>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between">
                        <span> {{ $t("SubjectName") }}: </span>
                        <span>
                          <b> {{ el.SubjectName }} </b>
                        </span>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-collapse>
              </b-row>
            </b-card>
            <b-card class="mt-2">
              <b-row class="mt-2">
                <b-col class="text-center mt-2">
                  <b-button
                    v-if="HousingQueue.CanSaveKadastr"
                    variant="success"
                    @click="RegistrationSave"
                  >
                    {{ $t("Registration") }}
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-collapse>
        </b-card>
      </b-col>
      <b-col sm="12" md="3" lg="2">
        <b-button
          block
          v-if="
            HousingQueue.CanCancelApproval &&
            $can('HousingQueueCancelApproval', 'permissions')
          "
          @click="$refs['CancelApprovalModal'].show()"
          variant="danger"
        >
          {{ $t("CancelApproval") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanDelete && $can('HousingQueueDelete', 'permissions')
          "
          @click="$refs['DeleteModal'].show()"
          variant="danger"
        >
          {{ $t("Delete") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanApprove &&
            $can('HousingQueueApprove', 'permissions')
          "
          @click="$refs['ApproveModal'].show()"
          variant="success"
        >
          {{ $t("Approve") }}
        </b-button>
        <b-button
          block
          v-if="HousingQueue.CanSend && $can('HousingQueueSend', 'permissions')"
          @click="$refs['SendModal'].show()"
          variant="info"
        >
          {{ $t("Send") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanAccept && $can('HousingQueueAccept', 'permissions')
          "
          @click="$refs['AcceptModal'].show()"
          variant="success"
        >
          {{ $t("Accept") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanCancel && $can('HousingQueueCancel', 'permissions')
          "
          @click="$refs['CancelModal'].show()"
          variant="danger"
        >
          {{ $t("Cancel") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanReject && $can('HousingQueueReject', 'permissions')
          "
          @click="$refs['RejectModal'].show()"
          variant="danger"
        >
          {{ $t("Reject") }}
        </b-button>
        <b-button
          block
          v-if="
            HousingQueue.CanPermit && $can('HousingQueuePermit', 'permissions')
          "
          @click="$refs['PermitModal'].show()"
          variant="primary"
        >
          {{ $t("Permit") }}
        </b-button>
      </b-col>
    </b-row>
    <b-modal
      :ref="'SendModal'"
      :title="$t('Send')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Send"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="SendLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantSend") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'PermitModal'"
      :title="$t('Permit')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Permit"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="PermitLoading" small></b-spinner>
        </h4>
        <h4>{{ $t("WantPermit") }}</h4>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'RejectModal'"
      :title="$t('Reject')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Reject"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="RejectLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantReject") }}</h5>
        <label for=""> {{ $t("description") }} </label>
        <b-form-textarea v-model="description"></b-form-textarea>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'CancelModal'"
      :title="$t('Cancel')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Cancel"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="CancelLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantCancel") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'AcceptModal'"
      :title="$t('Accept')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Accept"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="AcceptLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantAccept") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'ApproveModal'"
      :title="$t('Approve')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Approve"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="ApproveLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantApprove") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'CancelApprovalModal'"
      :title="$t('CancelApproval')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="CancelApproval"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="CancelApprovalLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantCancelApproval") }}</h5>
      </b-card-text>
    </b-modal>
    <b-modal
      :ref="'DeleteModal'"
      :title="$t('Delete')"
      :cancel-title="$t('no')"
      :ok-title="$t('yes')"
      cancel-variant="danger"
      ok-variant="success"
      @ok="Delete"
    >
      <b-card-text>
        <h4 class="text-primary">
          {{ HousingQueue.personname }}
          <b-spinner v-if="DeleteLoading" small></b-spinner>
        </h4>
        <h5>{{ $t("WantDelete") }}</h5>
      </b-card-text>
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
} from "bootstrap-vue";
import HousingQueueService from "@/services/document/housingqueue.service";
import DocHistory from "../../components/DocHistory.vue";
import ChildRegActComponent from "../childregistrationact/view.vue";
import ChildRegGuardinshipComponent from "../childunderguardianship/view.vue";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import OblastService from "@/services/info/oblast.service";
import RegionService from "@/services/info/region.service";
import AdmImageService from "@/services/others/admImage.service";
import HelperService from "@/services/others/helper.service";
import KinshipDegreeService from "@/services/info/kinshipdegree.service";
import IdentityDocumentService from "@/services/info/identitydocument.service";
import PersonService from "@/services/info/person.service";
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
    DocHistory,
    BFormTextarea,
    BCardText,
    BCollapse,
    ChildRegActComponent,
    ChildRegGuardinshipComponent,
    CustomDatePicker,
    BFormInput,
    BFormFile,
    BAvatar,
    BSpinner,
    BFormCheckbox,
    BInputGroupAppend,
    BInputGroup,
    BTable,
  },
  data() {
    return {
      HousingQueue: {},
      show: false,
      ApproveLoading: false,
      CancelApprovalLoading: false,
      SendLoading: false,
      AcceptLoading: false,
      CancelLoading: false,
      description: "",
      SearchLoading: false,
      RejectLoading: false,
      PermitLoading: false,
      DeleteLoading: false,
      ChildRegActCollapse: false,
      ChildRegGuardinshipCollapse: false,
      HistoryCollapse: false,
      Decision: false,
      kinshipdegreeList: [],
      HousingQueueRegistrationList: [],
      HousingQueueRegistrationSubjects: [],
      Order: false,
      DeleteItem: {
        id: 0,
        ownerid: 0,
        documentid: 0,
        ordernumber: 0,
        projectfileid: "",
        projectfiletext: "",
        projectfiletype: "",
        Status: 1,
        DownloadLoading: false,
      },
      filter: {
        documentSeries: "",
        documentNumber: "",
        pinfl: "",
        dateOfBirth: "",
        isStudent: true,
        INN: "",
        identityDocumentId: 0,
        kinshipdegreeid: 0,
        kinshipdegreename: "",
      },
      DeleteModalFile: false,
      file: [],
      OblastList: [],
      RegionList: [],
      oblastList: [],
      regionList: [],
      PersonList: [],
      Person: {},
      tabrow: {
        id: 0,
        ownerid: 0,
        kinshipdegreeid: 0,
        kinshipdegreename: "",
        familyname: "",
        firstname: "",
        lastname: "",
        shortname: "",
        fullname: "",
        dateofbirth: "",
        genderid: 0,
        gendername: "",
        pinfl: "",
        identitydocumentid: 0,
        identitydocumentname: "",
        documentseries: 0,
        documentnumber: 0,
        dateofissue: "",
        dateofexpire: "",
        Status: 1,
      },
      OrderTable: [],
      allocationtypeList: [],
      IdentityDocumentList: [],
      DocumentSeriesList: [],
      SearchFamilyLoading: false,
      fields: [
        {
          key: "kinshipdegreename",
          label: this.$t("kinshipdegree"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "fullname",
          label: this.$t("fullname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
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
          thClass: "text-center",
          sortable: true,
        },
      ],
      lang: "ru",
      Registration: false,
      Subjects: false,
      ModalShowOrder: false,
      HousingQueueDecision: {},
      HousingQueueOrder: {},
      editedIndex1: -1,
    };
  },
  created() {
    this.Refresh();
    console.log(this.actid);
    OblastService.GetAll(this.lang).then((res) => {
      this.OblastList = res.data;
      this.oblastList = res.data;
    });
    HelperService.GetAllocationTypeList(this.lang).then((res) => {
      this.allocationtypeList = res.data;
    });
    KinshipDegreeService.GetAll(this.lang, true).then((res) => {
      this.kinshipdegreeList = res.data;
    });
    IdentityDocumentService.GetAll(this.lang, true).then((res) => {
      this.IdentityDocumentList = res.data.result;
    });
    HelperService.GetAllIdentityDocSeries(1).then((res) => {
      this.DocumentSeriesList = res.data;
    });
  },
  methods: {
    ChangeKinshipdegree() {
      if (!!this.filter.kinshipdegreeid) {
        this.filter.kinshipdegreename = this.kinshipdegreeList.filter(
          (item) => item.id == this.filter.kinshipdegreeid
        )[0].name;
      }
    },
    ChangeIdentityDoc() {
      this.filter.documentSeries = "";
      this.filter.documentNumber = "";
      this.filter.pinfl = "";
      this.filter.dateOfBirth = "";
      this.filter.INN = "";
      this.filter.kinshipdegreeid = 0;
      this.filter.kinshipdegreename = "";
    },
    getpersondata() {
      var self = this;
      self.SearchLoading = true;
      if (self.filter.identityDocumentId != 1) {
        self.filter.documentSeries = self.filter.documentSeries.toUpperCase();
      }
      PersonService.GetFromGovData(
        self.filter.documentSeries,
        self.filter.documentNumber,
        self.filter.pinfl,
        self.filter.dateOfBirth,
        self.filter.isStudent,
        self.filter.INN,
        self.filter.identityDocumentId,
        self.filter.kinshipdegreeid,
        self.filter.kinshipdegreename
      )
        .then((res) => {
          self.SearchLoading = false;
          self.Person = res.data;
          self.personlocal = res.data;
          self.PersonList = res.data.DocumentTables;
          self.$emit("persondatachange", res.data);
        })
        .catch((error) => {
          self.SearchLoading = false;
          self.$makeToast(error.response.data.error, "danger");
        });
    },
    BindValue(value) {
      this.filter.dateOfBirth = value;
    },
    AddData() {
      if (this.editedIndex1 > -1) {
        Object.assign(
          this.HousingQueueOrder.OrderTable[this.editedIndex1],
          this.tabrow
        );
      } else {
        this.tabrow.kinshipdegreeid = this.filter.kinshipdegreeid;
        this.tabrow.kinshipdegreename = this.filter.kinshipdegreename;
        this.tabrow.id = this.Person.id;
        this.tabrow.familyname = this.Person.familyname;
        this.tabrow.firstname = this.Person.firstname;
        this.tabrow.lastname = this.Person.lastname;
        this.tabrow.fullname = this.Person.fullname;
        this.tabrow.shortname = this.Person.shortname;
        this.tabrow.dateofbirth = this.Person.dateofbirth;
        this.tabrow.genderid = this.Person.genderid;
        this.tabrow.gendername = this.Person.gendername;
        this.tabrow.pinfl = this.Person.pinfl;
        this.tabrow.identitydocumentid = this.PersonList[0].identitydocumentid;
        this.tabrow.identitydocumentname =
          this.PersonList[0].identitydocumentname;
        this.tabrow.documentseries = this.PersonList[0].documentseries;
        this.tabrow.documentnumber = this.PersonList[0].documentnumber;
        this.tabrow.dateofissue = this.PersonList[0].dateofissue;
        this.tabrow.dateofexpire = this.PersonList[0].dateofexpire;

        this.HousingQueueOrder.OrderTable.push(this.tabrow);
      }
      console.log(this.tabrow);
      this.ModalShowOrder = false;
      this.filter.kinshipdegreeid = 0;
      this.filter.dateOfBirth = "";
      this.filter.documentNumber = "";
      this.filter.documentSeries = "";
      this.Person = {};
    },
    ChangeChildRegGuardinship() {
      this.ChildRegGuardinshipCollapse = !this.ChildRegGuardinshipCollapse;
      this.HistoryCollapse = false;
      this.ChildRegActCollapse = false;
      this.Decision = false;
      this.Order = false;
      this.Registration = false;
    },
    OrderdateDate(value) {
      this.HousingQueueOrder.orderdate = value;
    },
    ChangeHistory() {
      this.HistoryCollapse = !this.HistoryCollapse;
      this.ChildRegActCollapse = false;
      this.ChildRegGuardinshipCollapse = false;
      this.Decision = false;
      this.Order = false;
      this.Registration = false;
    },
    ChangeChildRegAct() {
      this.ChildRegActCollapse = !this.ChildRegActCollapse;
      this.HistoryCollapse = false;
      this.ChildRegGuardinshipCollapse = false;
      this.Decision = false;
      this.Order = false;
      this.Registration = false;
    },
    ChangeDecision() {
      this.Decision = !this.Decision;
      this.ChildRegActCollapse = false;
      this.ChildRegGuardinshipCollapse = false;
      this.HistoryCollapse = false;
      this.Order = false;
      this.Registration = false;
      HousingQueueService.GetDecision(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HousingQueueDecision = res.data;
          this.ChangeOblast();
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeOrder() {
      this.Order = !this.Order;
      this.ChildRegActCollapse = false;
      this.ChildRegGuardinshipCollapse = false;
      this.HistoryCollapse = false;
      this.Decision = false;
      this.Registration = false;
      HousingQueueService.GetHouseOrder(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HousingQueueOrder = res.data;
          this.ChangeOblastOrder();
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeRegistration() {
      this.Registration = !this.Registration;
      this.ChildRegActCollapse = false;
      this.ChildRegGuardinshipCollapse = false;
      this.HistoryCollapse = false;
      this.Order = false;
      this.Decision = false;
      HousingQueueService.GetKadastrInfo(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HousingQueueRegistration = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    ChangeRegistrationSubjects() {
      this.Subjects = !this.Subjects;
    },
    // ChangeIdentityDocFamily() {
    //   (this.filter.documentseries = ""),
    //     (this.filter.documentnumber = ""),
    //     (this.filter.pinfl = ""),
    //     (this.filter.dateofbirth = "");
    // },
    AddDataOrder() {
      var data = {};
      data.id = this.HousingQueueOrder.id;
      HousingQueueService.UpdateHousingQueueHouseOrder(
        this.$route.params.id,
        this.HousingQueueOrder,
        this.Person
      )
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.Refresh();
          if (this.$route.query.tabIndex == 0) {
            this.$router.push({ name: `housingqueueSPON` });
          }
          if (this.$route.query.tabIndex == 1) {
            this.$router.push({ name: `housingqueue` });
          }
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
    Refresh() {
      this.show = true;
      HousingQueueService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.HousingQueue = res.data;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
      PersonService.Get(this.$route.params.id)
        .then((res) => {
          this.show = false;
          this.Person = res.data;
          this.PersonList = res.data.DocumentTables;
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
        });
    },
    RegistrationSave() {
      HousingQueueService.CheckKadastrData(this.$route.params.id).then(
        (res) => {
          this.show = false;
          this.HousingQueueRegistration = res.data.result;
          this.HousingQueueRegistrationList = res.data.result.Objects;
          if (res.data.result.IsChecked == false) {
            this.$makeToast(res.data.result.ErrorOnChecking, "danger");
          }
        }
      );
    },
    OpenChildRegActModal() {
      this.ChildRegActModal = true;
    },
    ChangeOblast() {
      if (!!this.HousingQueueDecision.oblastid) {
        RegionService.GetAll(
          this.lang,
          this.HousingQueueDecision.oblastid
        ).then((res) => {
          this.RegionList = res.data;
        });
      }
    },
    ChangeOblastOrder() {
      if (!!this.HousingQueueOrder.oblastid) {
        RegionService.GetAll(this.lang, this.HousingQueueOrder.oblastid).then(
          (res) => {
            this.regionList = res.data;
          }
        );
      }
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
          this.HousingQueueDecision.DecisionFiles.push({
            id: 0,
            ownerid: 0,
            tableid: 0,
            documentid: 0,
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
    DeleteAdmImage(item) {
      this.DeleteLoading = true;
      AdmImageService.Delete(item.projectfileid)
        .then((res) => {
          this.DeleteLoading = false;
          var self = this;
          self.HousingQueueDecision.DecisionFiles.forEach(function (el) {
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
    OpenDeleteModal(item) {
      this.DeleteModalFile = true;
      this.DeleteItem = item;
    },
    OpenModalOrder() {
      this.ModalShowOrder = true;
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
    AddtoData() {
      var data = {};
      data.id = this.HousingQueueDecision.id;
      HousingQueueService.UpdateHousingQueueDecision(
        this.$route.params.id,
        this.HousingQueueDecision
      )
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.Refresh();
          if (this.$route.query.tabIndex == 0) {
            this.$router.push({ name: `housingqueueSPON` });
          }
          if (this.$route.query.tabIndex == 1) {
            this.$router.push({ name: `housingqueue` });
          }
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
    Approve() {
      this.ApproveLoading = true;
      HousingQueueService.Approve(this.HousingQueue.id)
        .then((res) => {
          this.ApproveLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("ApproveSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.ApproveLoading = false;
        });
    },
    Permit() {
      this.PermitLoading = true;
      HousingQueueService.Permit(this.HousingQueue.id)
        .then((res) => {
          this.PermitLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("PermitSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.PermitLoading = false;
        });
    },
    CancelApproval() {
      this.CancelApprovalLoading = true;
      HousingQueueService.CancelApproval(this.HousingQueue.id)
        .then((res) => {
          this.CancelApprovalLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelApprovalSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelApprovalLoading = false;
        });
    },
    DecisionDate(value) {
      this.HousingQueueDecision.decisiondate = value;
    },
    Delete() {
      this.DeleteLoading = true;
      HousingQueueService.Delete(this.HousingQueue.id)
        .then((res) => {
          this.DeleteLoading = false;
          this.Refresh();
          this.$router.push({ name: "housingqueue" });
          this.$makeToast(this.$t("DeleteSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.DeleteLoading = false;
        });
    },
    Send() {
      this.SendLoading = true;
      HousingQueueService.Send(this.HousingQueue.id)
        .then((res) => {
          this.SendLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("SendSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.SendLoading = false;
        });
    },
    Accept() {
      this.AcceptLoading = true;
      HousingQueueService.Accept(this.HousingQueue.id)
        .then((res) => {
          this.AcceptLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("AcceptSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.AcceptLoading = false;
        });
    },
    Cancel() {
      this.CancelLoading = true;
      HousingQueueService.Cancel(this.HousingQueue.id)
        .then((res) => {
          this.CancelLoading = false;
          this.Refresh();
          this.$makeToast(this.$t("CancelSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.CancelLoading = false;
        });
    },
    Reject() {
      this.RejectLoading = true;
      HousingQueueService.Reject(this.HousingQueue.id, this.description)
        .then((res) => {
          this.RejectLoading = false;
          this.Refresh();
          this.$router.push({ name: "housingqueueSPON" });
          this.$makeToast(this.$t("RejectSuccess"), "success");
        })
        .catch((error) => {
          this.$makeToast(error.response.data.error, "danger");
          this.RejectLoading = false;
        });
    },
  },
};
</script>

<style>
</style>
