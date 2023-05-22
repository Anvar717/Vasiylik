<template>
  <b-overlay :show="show">
    <b-card>
      <b-row>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docnumber")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('docnumber')"
                v-model="HrAcceptanceWork.docnumber"
              />
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("docdate")
            }}</label>
            <div class="col-sm-7">
              <custom-date-picker
                v-model="HrAcceptanceWork.docdate"
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
        <b-col sm="12" md="4" lg="4">
          <div class="form-group form-row">
            <label class="col-form-label col-sm-5" for>{{
              $t("detailinfo")
            }}</label>
            <div class="col-sm-7">
              <b-form-input
                :placeholder="$t('detailinfo')"
                v-model="HrAcceptanceWork.detailinfo"
              />
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="mt-1" sm="12" lg="6" md="6"></b-col>
        <b-col class="text-right mt-1">
          <b-button
            @click="OpenModalTables"
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
            :items="HrAcceptanceWork.Tables"
            small
            class="text-center"
            :tbody-tr-class="rowClass"
          >
            <template #cell(actions)="{ item }">
              <div class="text-center">
                <b-link>
                  <feather-icon
                    style="margin-right: 5px"
                    @click="EditTable(item)"
                    icon="EditIcon"
                  ></feather-icon>
                </b-link>
                <b-link>
                  <feather-icon
                    @click="Delete(item)"
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
        v-model="Modalshow"
        no-close-on-backdrop
        hide-footer
        :title="$t('HrAcceptanceWork')"
      >
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("hrempappointordertype")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="HrempappointordertypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.hrempappointordertypeid"
                  @input="hrempappointordertypechange"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col
            v-if="tabrow.hrempappointordertypeid !== 1"
            sm="12"
            md="4"
            lg="4"
          >
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("Employee")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('personname')"
                  v-model="tabrow.personname"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col
            v-if="tabrow.hrempappointordertypeid !== 1"
            sm="12"
            md="4"
            lg="4"
          >
            <div>
              <b-button @click="Openperson" variant="primary">
                <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchLoading" small></b-spinner>
                {{ $t("selection") }}
              </b-button>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col>
            <span
              ><hr
                style="
                  margin: 10px 0;
                  padding: 0;
                  height: 0;
                  border: none;
                  box-shadow: 0 0 10px 1px #d3d3d3;
                "
            /></span>
          </b-col>
        </b-row>
        <b-row v-if="tabrow.hrempappointordertypeid === 1">
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("startdate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  :disabled-date="DisabledStartDate"
                  v-model="tabrow.startdate"
                  @keyup="StartdateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  @input="startdatechange"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("department")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="DepartmentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                  @input="departmentchange"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("enddate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.enddate"
                  @keyup="EnddateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('enddate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("position")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="positionchange"
                  v-model="tabrow.positionid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("detailinfo")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('detailinfo')"
                  v-model="tabrow.detailinfo"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("employmenttype")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="EmploymenttypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.employmenttypeid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("Employee")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('personname')"
                  v-model="tabrow.personname"
                  disabled
                />
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div>
              <b-button @click="Openperson" variant="primary">
                <feather-icon v-if="!SearchLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchLoading" small></b-spinner>
                {{ $t("selection") }}
              </b-button>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("workschedule")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="WorkscheduleList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.workscheduleid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("ratecount")
              }}</label>
              <div class="col-sm-7">
                <span style="color: blue">{{ ratecount }}</span>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
           <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("employmentrate")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('employmentrate')"
                  v-model="tabrow.employmentrate"
                  type="number"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="tabrow.hrempappointordertypeid === 2">
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("startdate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.startdate"
                  @keyup="StartdateValue"
                  @input="startdatechange"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div
              v-if="
                tabrow.fromdepartmentname === null &&
                tabrow.fromdepartmentname === '' &&
                tabrow.fromdepartmentname === 0 &&
                tabrow.fromdepartmentname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("fromdepartmentname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("department")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="DepartmentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                  @input="departmentchange"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("employmenttype")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="EmploymenttypeList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.employmenttypeid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("enddate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.enddate"
                  @keyup="EnddateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('enddate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div
              v-if="
                tabrow.frompositionidname === null &&
                tabrow.frompositionidname === '' &&
                tabrow.frompositionidname === 0 &&
                tabrow.frompositionidname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("frompositionidname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.frompositionidname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("position")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="positionchange"
                  v-model="tabrow.positionid"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("workschedule")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="WorkscheduleList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.workscheduleid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("detailinfo")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('detailinfo')"
                  v-model="tabrow.detailinfo"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("fromemploymentrate")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="tabrow.hrempappointordertypeid === 3">
          <b-col sm="12" md="4" lg="4">
            <div
              v-if="
                tabrow.fromdepartmentname === null &&
                tabrow.fromdepartmentname === '' &&
                tabrow.fromdepartmentname === 0 &&
                tabrow.fromdepartmentname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("fromdepartmentname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("startdate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.startdate"
                  @input="startdatechange"
                  @keyup="StartdateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                >
                </custom-date-picker>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div
              v-if="
                tabrow.frompositionidname === null &&
                tabrow.frompositionidname === '' &&
                tabrow.frompositionidname === 0 &&
                tabrow.frompositionidname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("frompositionidname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.frompositionidname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("detailinfo")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('detailinfo')"
                  v-model="tabrow.detailinfo"
                />
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("fromemploymentrate")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="tabrow.hrempappointordertypeid === 4">
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("startdate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.startdate"
                  @input="startdatechange"
                  @keyup="StartdateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('startdate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div
              v-if="
                tabrow.fromdepartmentname === null &&
                tabrow.fromdepartmentname === '' &&
                tabrow.fromdepartmentname === 0 &&
                tabrow.fromdepartmentname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("fromdepartmentname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromdepartmentname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("department")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="DepartmentList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.departmentid"
                  @input="departmentchange"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("employmenttype")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="EmploymenttypeList"
                  @input="ChangeEmploymenttype"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.employmenttypeid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("enddate")
              }}</label>
              <div class="col-sm-7">
                <custom-date-picker
                  v-model="tabrow.enddate"
                  @keyup="EnddateValue"
                  format="DD.MM.YYYY"
                  type="date"
                  :clearable="false"
                  :placeholder="$t('enddate')"
                >
                </custom-date-picker>
              </div>
            </div>
            <div
              v-if="
                tabrow.frompositionidname === null &&
                tabrow.frompositionidname === '' &&
                tabrow.frompositionidname === 0 &&
                tabrow.frompositionidname === undefined
              "
              class="form-group form-row"
            >
              <label class="col-form-label col-sm-5" for>{{
                $t("frompositionidname")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.frompositionidname }}</p>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("position")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="positionlist"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  @input="positionchange"
                  v-model="tabrow.positionid"
                ></v-select>
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("workschedule")
              }}</label>
              <div class="col-sm-7">
                <v-select
                  :options="WorkscheduleList"
                  :reduce="(item) => item.id"
                  :placeholder="$t('ChooseBelow')"
                  label="name"
                  v-model="tabrow.workscheduleid"
                ></v-select>
              </div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("detailinfo")
              }}</label>
              <div class="col-sm-7">
                <b-form-input
                  :placeholder="$t('detailinfo')"
                  v-model="tabrow.detailinfo"
                />
              </div>
            </div>
            <div class="form-group form-row">
              <label class="col-form-label col-sm-5" for>{{
                $t("fromemploymentrate")
              }}</label>
              <div class="col-sm-7">
                <p style="color: blue">{{ tabrow.fromemploymentrate }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col class="text-center">
            <b-button variant="danger" @click="Modalshow = false" class="mr-1">
              {{ $t("back") }}
            </b-button>
            <b-button variant="success" @click="AddData">
              {{ $t("Save") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
    </b-card>
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
      no-close-on-backdrop
      hide-footer
      size="xl"
      v-model="PersonModal"
      :title="$t('Employee')"
    >
      <b-row>
        <b-col sm="12" md="2" lg="2">
          <div>
            <b-form-input :placeholder="$t('inn')" v-model="filter.inn" />
          </div>
        </b-col>
        <b-col sm="12" md="2" lg="2">
          <div>
            <b-form-input :placeholder="$t('pinfl')" v-model="filter.pinfl" />
          </div>
        </b-col>
        <b-col cols="12" md="4">
          <b-input-group class="text-right">
            <b-form-input v-model="filter.Search" :placeholder="$t('search')" />
            <b-input-group-append>
              <b-button @click="GetpersonPersondata" variant="primary">
                <feather-icon v-if="!SearchPersonLoading" icon="SearchIcon" />
                <b-spinner v-if="SearchPersonLoading" small></b-spinner>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col class="text-right" sm="12" md="4">
          <b-button variant="primary" @click="OpenModalEmployee()"
            ><feather-icon icon="PlusIcon"></feather-icon>
            {{ $t("Add") }}</b-button
          >
        </b-col>
      </b-row>
      <b-modal
        no-close-on-backdrop
        hide-footer
        size="xl"
        v-model="EmployeeModal"
        :title="$t('Employee')"
      >
        <b-row>
          <b-col>
            <hr-acceptance-work-component
              :iscomponent="true"
              :person-data="Person"
              :is-student="false"
              ref="personcomp"
              @persondatachange="persondatachange($event)"
            ></hr-acceptance-work-component>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-2">
          <b-col sm="12" md="12" lg="12" class="text-right">
            <b-button
              @click="SaveDataEmployee"
              size="sm"
              variant="outline-success"
            >
              <feather-icon icon="CheckIcon"></feather-icon> {{ $t("Save") }}
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-row>
        <b-col sm="12" md="12">
          <b-table
            ref="refInvoiceListTable"
            :items="items"
            responsive
            :fields="fieldsPerson"
            primary-key="id"
            sticky-header="65vh"
            no-border-collapse
            :busy="isBusy"
            show-empty
            :empty-text="$t('NotFound')"
            class="position-relative mt-1"
            @sort-changed="SortChange"
            @row-dblclicked="PersonChange"
            @row-selected="onRowSelected"
            select-mode="single"
            selectable
          >
            <template v-slot:head(selected)>
              <div style="cursor: pointer"></div>
            </template>
            <template #cell(selected)="{ rowSelected }">
              <template v-if="rowSelected">
                <!-- <feather-icon icon="CheckIcon"> </feather-icon> -->
                <span aria-hidden="true">&check;</span>
              </template>
              <template v-else>
                <span aria-hidden="true">&nbsp;</span>
                <span class="sr-only">Not selected</span>
              </template>
            </template>
          </b-table>
        </b-col>
        <div class="mx-2 mb-2 w-100">
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
                v-model="filter.PageNumber"
                :total-rows="filter.totalRows"
                :per-page="filter.PageLimit"
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
      </b-row>
      <b-row>
        <b-col class="text-center">
          <b-button variant="danger" @click="PersonModal = false" class="mr-1">
            {{ $t("back") }}
          </b-button>
          <b-button variant="success" @click="AddPersonData()">
            {{ $t("Save") }}
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
} from "bootstrap-vue";
import HrAcceptanceWorkComponent from "@/views/components/HrAcceptanceWorkComponent.vue";
import HrAcceptanceWorkService from "@/services/document/hracceptancework.service";
import EmployeeManageService from "@/services/others/employeemanage.service";
import WorkScheduleService from "@/services/info/workschedule.service";
import CustomDatePicker from "@/views/components/customDatePicker.vue";
import PositionService from "@/services/info/position.service";
import HelperService from "@/services/others/helper.service";
import DepartmentService from "@/services/info/department.service";
import HROrgStructureService from "@/services/document/hrorgstructure.service";
// import PersonService from "@/services/others/person.service";
import PersonService from "@/services/info/person.service";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
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
    HrAcceptanceWorkComponent,
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-modal": VBModal,
  },
  data() {
    return {
      show: false,
      isChange: false,
      HrAcceptanceWork: {
        canSave: true,
      },
      StateList: [],
      DepartmentList: [],
      positionlist: [],
      EmploymenttypeList: [],
      FromdepartmentList: [],
      FrompositionList: [],
      items: [],
      WorkscheduleList: [],
      HrempappointordertypeList: [],
      Modalshow: false,
      Person: {},
      ratecount: 0,
      tabrow: {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        employmenttypeid: 0,
        employmentrate: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        employeeenrolmentid: 0,
        ordernumber: 0,
        fromdepartmentid: 0,
        fromdepartmentname: "",
        frompositionid: 0,
        frompositionidname: "",
        fromemployeeenrolmentid: 0,
        workscheduleid: 0,
        workschedulename: "",
        fromemploymentrate: 0,
        employmenttype: "",
        hrempappointordertypeid: 1,
        hrempappointordertypename: "",
        Status: 1,
      },
      lang: "uz_latn",
      config: {
        dateFormat: "d.m.Y",
      },
      fields: [
        {
          key: "ordernumber",
          label: this.$t("ordernumber"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "hrempappointordertypename",
          label: this.$t("hrempappointordertypename"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "departmentname",
          label: this.$t("departmentname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "personname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "positionidname",
          label: this.$t("positionidname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "employmenttype",
          label: this.$t("employmenttype"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "employmentrate",
          label: this.$t("employmentrate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "startdate",
          label: this.$t("startdate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "enddate",
          label: this.$t("enddate"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "detailinfo",
          label: this.$t("detailinfo"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "workschedulename",
          label: this.$t("workschedulename"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("actions"),
          thClass: "text-center",
          sortable: true,
        },
      ],
      fieldsPerson: [
        {
          key: "selected",
        },
        {
          key: "inn",
          label: this.$t("inn"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "fullname",
          label: this.$t("personname"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentseries",
          label: this.$t("documentseries"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "documentnumber",
          label: this.$t("documentnumber"),
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
          key: "gender",
          label: this.$t("gender"),
          thClass: "text-center",
          sortable: true,
        },
        {
          key: "pinfl",
          label: this.$t("pinfl"),
          thClass: "text-center",
          tdClass: "text-center",
          sortable: true,
        },
      ],
      PersonModal: false,
      EmployeeModal: false,
      filter: {
        inn: "",
        pinfl: "",
        Search: "",
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 20,
        IsAllEmployee: false,
        perPageOptions: [10, 20, 50, 100],
        totalRows: 0,
      },
      SearchPersonLoading: false,
      SearchLoading: false,
      selected: [],
      isBusy: false,
      editedIndex: -1,
    };
  },
  created() {
    this.lang = localStorage.getItem("locale") || "ru";
    this.show = true;
    HrAcceptanceWorkService.Get(this.$route.params.id)
      .then((res) => {
        this.show = false;
        this.HrAcceptanceWork = res.data;
      })
      .catch((error) => {
        this.$makeToast(error.response.data.error, "danger");
      });
    DepartmentService.GetAll(this.lang).then((res) => {
      this.DepartmentList = res.data;
      this.FromdepartmentList = res.data;
    });
    PositionService.GetAll(
      this.departmentId,
      this.tariffScaleTypeId,
      this.isByOrganization,
      this.staffTypeBasicTariffId
    ).then((res) => {
      this.positionlist = res.data;
      this.FrompositionList = res.data;
    });
    HelperService.GetEmploymentType(this.lang).then((res) => {
      this.EmploymenttypeList = res.data;
    });
    WorkScheduleService.GetAll(this.lang).then((res) => {
      this.WorkscheduleList = res.data;
    });
    HelperService.HrEmpAppointOrderType(this.lang).then((res) => {
      this.HrempappointordertypeList = res.data;
    });
  },
  computed: {
    firstNumber() {
      return (this.filter.PageNumber - 1) * this.filter.PageLimit + 1;
    },
    lastNumber() {
      if (this.filter.totalRows < this.filter.PageLimit) {
        return this.filter.totalRows;
      } else {
        if (
          this.filter.PageNumber * this.filter.PageLimit >
          this.filter.totalRows
        ) {
          return this.filter.totalRows;
        } else {
          return this.filter.PageNumber * this.filter.PageLimit;
        }
      }
    },
  },
  directives: {
    Ripple,
  },
  methods: {
    check() {
      if (
        this.tabrow.personname === 0 ||
        this.tabrow.personname === null ||
        this.tabrow.personname === undefined ||
        this.tabrow.personname === ""
      ) {
        this.$makeToast(this.$t("personnameNotSelected"), "danger");
        return false;
      }
      return true;
    },
    GetpersonPersondata() {
      this.SearchPersonLoading = true;
      PersonService.GetEmployeeList(
        this.filter.inn,
        this.filter.pinfl,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.IsAllEmployee
      ).then((res) => {
        this.SearchPersonLoading = false;
        this.items = res.data.rows;
      });
    },
    getemployee() {
      var self = this;

      EmployeeManageService.GetAllInHRAcceptanceWork(
        "",
        "",
        self.tabrow.startdate,
        self.tabrow.fromdepartmentid,
        self.tabrow.hrempappointordertypeid
      ).then((res) => {
        self.employeelist = res.data;
        self.employeechange();
      });
    },
    hrempappointordertypechange() {
      var self = this;
      if (self.tabrow.hrempappointordertypeid === 4) {
        self.tabrow.employmenttypeid = 0;
        // self.tabrow.employmentrate = 0.5;
      }
      self.tabrow.personname = "";
      self.tabrow.fromdepartmentid = 0;
      self.tabrow.fromdepartmentname = "";
      self.tabrow.frompositionid = 0;
      self.tabrow.frompositionidname = "";
      self.tabrow.fromemploymentrate = 0;
    },
    // ChangeEmploymenttype(){

    //      this.tabrow.employmenttypeid = 0 ;

    // },
    employeechange() {
      var self = this;
      if (self.tabrow.fromemployeeenrolmentid > 0) {
        self.tabrow.fromemployeeenrolmentid = "";
      }
      self.employeelist;
      self.tabrow.fromemployeeenrolmentid = self.employeelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employeeenrolmentid;
      self.tabrow.fromemploymentrate = self.employeelist.filter(function (
        item
      ) {
        if (item.id === self.tabrow.personid) return item;
      })[0].employmentrate;

      if (self.tabrow.hrempappointordertypeid !== 1) {
        self.tabrow.frompositionid;
        self.tabrow.frompositionidname;
        self.tabrow.frompositionid = self.employeelist.filter(function (item) {
          if (item.id === self.tabrow.personid) return item;
        })[0].positionid;

        self.tabrow.frompositionid;
        self.tabrow.frompositionidname = self.frompositionlist.filter(function (
          item
        ) {
          if (item.positionid === self.tabrow.frompositionid) return item;
        })[0].positionidname;
        self.tabrow.frompositionid;
        self.tabrow.frompositionidname;
      }
      if (self.tabrow.hrempappointordertypeid === 4) {
        self.tabrow.workscheduleid = self.employeelist.filter(function (item) {
          if (item.id === self.tabrow.personid) return item;
        })[0].workscheduleid;
      }
    },
    persondatachange(data) {
      this.Person = data;
    },
    startdatechange() {
      var self = this;

      self.getposition();
      self.getfromposition();
      self.calculatehremploymentrate();
      self.getemployee();
    },
    DisabledStartDate(date) {
      var arr = this.tabrow.startdate.split(".");
      return date < new Date(arr[2], arr[1] - 1, arr[0]);
    },
    // getposition() {
    //   var self = this;

    //   if (self.tabrow.departmentid > 0) {
    //     HROrgStructureService.GetAll(
    //       self.tabrow.departmentid,
    //       self.tabrow.startdate
    //     ).then((res) => {
    //       self.positionlist = res.data;
    //     });
    //   }
    // },
    getfromposition() {
      var self = this;

      if (self.tabrow.fromdepartmentid > 0) {
        HROrgStructureService.GetAll(
          self.tabrow.fromdepartmentid,
          self.tabrow.startdate
        ).then((res) => {
          self.frompositionlist = res.data;
        });
      }
    },
    calculatehremploymentrate() {
      var self = this;
      var tableemploymentrate = 0;
      self.HrAcceptanceWork.Tables.forEach(function (item) {
        if (
          item.departmentid === self.tabrow.departmentid &&
          item.positionid === self.tabrow.positionid
        ) {
          item.enddate;
          if (item.enddate === "" || item.enddate > self.tabrow.startdate)
            tableemploymentrate = tableemploymentrate + item.employmentrate;
        }
        if (
          item.fromdepartmentid === self.tabrow.departmentid &&
          item.frompositionid === self.tabrow.positionid
        ) {
          if (item.startdate <= self.tabrow.startdate)
            tableemploymentrate = tableemploymentrate - item.fromemploymentrate;
        }
      });
      if (self.tabrow.departmentid > 0 && self.tabrow.positionid > 0) {
        EmployeeManageService.GetHRAcceptedRateCount(
          self.tabrow.startdate,
          self.tabrow.departmentid,
          self.tabrow.positionid
        ).then((res) => {
          self.hremploymentrate = res.data + tableemploymentrate;
        });
      }
    },
    departmentchange() {
      this.getposition();
      console.log(this.positionchange)
      this.positionchange();
    },
    positionchange() {
      this.calculatehremploymentrate();
      this.ratecount =
        this.positionlist.length > 0
          ? this.positionlist.filter(item => item.positionid == this.tabrow.positionid)[0]?.ratecount
          : 0;

      // self.isfixedratecount =
      //   self.positionlist.length > 0
      //     ? self.positionlist.filter(function (item) {
      //         if (item.positionid === self.tabrow.positionid) return item;
      //       })[0].isfixedratecount
      //     : 0;
    },
    Refresh() {
      this.isBusy = true;
      PersonService.GetEmployeeList(
        this.filter.inn,
        this.filter.pinfl,
        this.filter.Search,
        this.filter.SortColumn,
        this.filter.OrderType,
        this.filter.PageNumber,
        this.filter.PageLimit,
        this.filter.IsAllEmployee
      ).then((res) => {
        this.SearchFamilyLoading = false;
        this.isBusy = false;
        this.items = res.data.rows;
        this.filter.totalRows = res.data.total;
      });
    },
    onRowSelected(item) {
      this.selected = item;
      console.log(this.selected);
    },
    AddPersonData() {
      this.tabrow.personid = this.selected[0].id;
      this.tabrow.personname = this.selected[0].fullname;
      this.PersonModal = false;
    },

    // check() {
    //   if (
    //     this.tabrow.fromdepartmentname === 0 ||
    //     this.tabrow.fromdepartmentname === null ||
    //     this.tabrow.fromdepartmentname === undefined ||
    //     this.tabrow.fromdepartmentname === ""
    //   ) {
    //     this.$makeToast(this.$t("fromdepartmentnameNotSelected"), "danger");
    //     return false;
    //   }
    //   if (
    //     this.tabrow.frompositionidname === 0 ||
    //     this.tabrow.frompositionidname === null ||
    //     this.tabrow.frompositionidname === undefined ||
    //     this.tabrow.frompositionidname === ""
    //   ) {
    //     this.$makeToast(this.$t("frompositionidnameNotSelected"), "danger");
    //     return false;
    //   }
    //   return true;
    // },
    PersonChange(item) {
      this.tabrow.personid = item.id;
      this.tabrow.personname = item.fullname;
      this.PersonModal = false;
    },
    AddData() {
      if (!this.check()) {
        return false;
      }
      if (this.tabrow.hrempappointordertypeid === 1) {
        this.tabrow.hrempappointordertypename =
          this.HrempappointordertypeList.length > 0
            ? this.HrempappointordertypeList.filter(
                (item) => this.tabrow.hrempappointordertypeid === item.id
              )[0].name
            : "";
        this.tabrow.departmentname =
          this.DepartmentList.length > 0
            ? this.DepartmentList.filter(
                (item) => this.tabrow.departmentid === item.id
              )[0].name
            : "";
        this.tabrow.positionidname =
          this.positionlist.length > 0
            ? this.positionlist.filter(
                (item) => this.tabrow.positionid === item.id
              )[0].name
            : "";
        this.tabrow.employmenttype =
          this.EmploymenttypeList.length > 0
            ? this.EmploymenttypeList.filter(
                (item) => this.tabrow.employmenttypeid === item.id
              )[0].name
            : "";
        this.tabrow.workschedulename =
          this.WorkscheduleList.length > 0
            ? this.WorkscheduleList.filter(
                (item) => this.tabrow.workscheduleid === item.id
              )[0].name
            : "";
      }
      if (this.tabrow.hrempappointordertypeid === 2) {
        this.tabrow.hrempappointordertypename =
          this.HrempappointordertypeList.length > 0
            ? this.HrempappointordertypeList.filter(
                (item) => this.tabrow.hrempappointordertypeid === item.id
              )[0].name
            : "";
        this.tabrow.departmentname =
          this.DepartmentList.length > 0
            ? this.DepartmentList.filter(
                (item) => this.tabrow.departmentid === item.id
              )[0].name
            : "";
        this.tabrow.positionidname =
          this.positionlist.length > 0
            ? this.positionlist.filter(
                (item) => this.tabrow.positionid === item.id
              )[0].name
            : "";
        this.tabrow.employmenttype =
          this.EmploymenttypeList.length > 0
            ? this.EmploymenttypeList.filter(
                (item) => this.tabrow.employmenttypeid === item.id
              )[0].name
            : "";
        this.tabrow.workschedulename =
          this.WorkscheduleList.length > 0
            ? this.WorkscheduleList.filter(
                (item) => this.tabrow.workscheduleid === item.id
              )[0].name
            : "";
      }
      if (this.tabrow.hrempappointordertypeid === 3) {
        this.tabrow.hrempappointordertypename =
          this.HrempappointordertypeList.length > 0
            ? this.HrempappointordertypeList.filter(
                (item) => this.tabrow.hrempappointordertypeid === item.id
              )[0].name
            : "";
      }
      if (this.tabrow.hrempappointordertypeid === 4) {
        this.tabrow.hrempappointordertypename =
          this.HrempappointordertypeList.length > 0
            ? this.HrempappointordertypeList.filter(
                (item) => this.tabrow.hrempappointordertypeid === item.id
              )[0].name
            : "";
        this.tabrow.departmentname =
          this.DepartmentList.length > 0
            ? this.DepartmentList.filter(
                (item) => this.tabrow.departmentid === item.id
              )[0].name
            : "";
        this.tabrow.positionidname =
          this.positionlist.length > 0
            ? this.positionlist.filter(
                (item) => this.tabrow.positionid === item.id
              )[0].name
            : "";
        this.tabrow.employmenttype =
          this.EmploymenttypeList.length > 0
            ? this.EmploymenttypeList.filter(
                (item) => this.tabrow.employmenttypeid === item.id
              )[0].name
            : "";
        this.tabrow.workschedulename =
          this.WorkscheduleList.length > 0
            ? this.WorkscheduleList.filter(
                (item) => this.tabrow.workscheduleid === item.id
              )[0].name
            : "";
      }
      if (this.editedIndex > -1) {
        Object.assign(
          this.HrAcceptanceWork.Tables[this.editedIndex],
          this.tabrow
        );
      } else {
        this.HrAcceptanceWork.Tables.push(this.tabrow);
      }
      this.Modalshow = false;
      this.Refresh();
    },
    EditTable(item) {
      if (item.Status == 0) {
        item.Status = 2;
      }
      this.editedIndex = this.HrAcceptanceWork.Tables.indexOf(item);
      this.positionchange();
      this.tabrow = Object.assign({}, item);
      this.Modalshow = true;
    },
    rowClass(item) {
      if (item.Status === 3) return "d-none";
    },
    Delete(item) {
      item.Status = 3;
    },
    OpenModalTables() {
      this.Modalshow = true;
      this.tabrow = {
        id: 0,
        ownerid: 0,
        personid: 0,
        personname: "",
        departmentid: 0,
        departmentname: "",
        positionid: 0,
        positionidname: "",
        employmenttypeid: 0,
        employmentrate: "",
        startdate: "",
        enddate: "",
        detailinfo: "",
        employeeenrolmentid: 0,
        ordernumber: 0,
        fromdepartmentid: 0,
        fromdepartmentname: "",
        frompositionid: 0,
        frompositionidname: "",
        fromemployeeenrolmentid: 0,
        workscheduleid: 0,
        workschedulename: "",
        fromemploymentrate: 0,
        employmenttype: "",
        hrempappointordertypeid: 1,
        hrempappointordertypename: "",
        Status: 1,
      };
      this.editedIndex = -1;
    },
    StartdateValue(value) {
      this.tabrow.startdate = value;
    },
    DocdateValue(value) {
      this.HrAcceptanceWork.docdate = value;
    },
    EnddateValue(value) {
      this.tabrow.enddate = value;
    },
    OpenModalEmployee() {
      this.EmployeeModal = true;
    },
    Openperson() {
      this.PersonModal = true;
      this.selected = [];
      this.Refresh();
    },
    SortChange(data) {
      this.filter.SortColumn = data.sortBy;
      this.filter.OrderType = data.sortDesc ? "desc" : "asc";
      this.Refresh();
    },
    SaveDataEmployee() {
      PersonService.Update(this.Person , this.Person.employeetypeid = 3)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.EmployeeModal = false;
          this.Refresh();
          console.log(this.Person);
        })
        .catch((err) => {
          this.$makeToast(this.$t(err.response.data.error), "danger");
        });
    },
    SaveData() {
      HrAcceptanceWorkService.Update(this.HrAcceptanceWork)
        .then((res) => {
          this.$makeToast(this.$t("SaveSuccess"), "success");
          this.$router.push({ name: `hracceptancework` });
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
