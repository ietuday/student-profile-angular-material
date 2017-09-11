import { Injectable } from '@angular/core';


/**
 *
 */
export interface IApiEndpoint {
  name: string;
  method?: string;
  url: string;
  restfull?: boolean;
}

/**
 *
 */
export enum ApiEndpointType {
  GET, PUT, POST, DELETE
}

/**
 *
 */
@Injectable()
export class EndpointService {

  private readonly baseUrl: string = 'http://dev-api.ereq.io';
  private endpoints: Array<IApiEndpoint> = [];

  constructor() {
    this.init();
  }

  /**
   * his.baseUrl
   * @param name
   */
  get(name: string): IApiEndpoint {

    const requiredEndpoint = this.endpoints.find((endpoint) => endpoint.name === name);

    if (requiredEndpoint && requiredEndpoint.url.indexOf(this.baseUrl) !== 0) {// check if endpoint url has the baseUrl already.
      requiredEndpoint.url = this.baseUrl + requiredEndpoint.url;
    }

    return requiredEndpoint;
  }
  private init() {

    this.endpoints = [
      /**
       * FOR LOGIN & LOGOUT
       */
      { name: 'LOGIN', url: '/v1/auth/login', method: 'POST' },
      { name: 'LOGOUT', url: '/v1/auth/logout', method: 'POST' },

      /**
       * FOR USERS
       */
      { name: 'GET_ALLUSERS', url: '/v1/users', method: 'GET' },
      { name: 'GET_LOGGEDINUSER', url: '/v1/users/me', method: 'GET' },
      { name: 'UPDATE_PROFILE', url: '/v1/users/me', method: 'PUT' },
      { name: 'GET_USER', url: '/v1/users/USERID', method: 'GET' },
      { name: 'ADD_USER', url: '/v1/users', method: 'POST' },
      { name: 'DELETE_USER', url: '/v1/users/USERID', method: 'DELETE' },
      { name: 'UPDATE_USER', url: '/v1/users/USERID', method: 'PUT' },
      { name: 'GET_ALLROLES', url: '/v1/roles', method: 'GET' },
      { name: 'VALIDATE_EMAIL', url: '/v1/users/email', method: 'POST' },
      { name: 'GET_RESOURCE', url: '/v1/users/USERID/resource', method: 'GET' },
      { name: 'ADD_RESOURCE', url: '/v1/resources', method: 'POST' },
      { name: 'UPDATE_RESOURCE', url: '/v1/resources/RESOURCESID', method: 'PUT' },


      /**
       * FOR OFFICES
       */
      { name: 'DELETE_OFFICE', url: '/v1/offices/OFFICEID', method: 'DELETE' },
      { name: 'ADD_OFFICE', url: '/v1/offices', method: 'POST' },
      { name: 'UPDATE_OFFICE', url: '/v1/offices/OFFICEID', method: 'PUT' },
      { name: 'GET_ALL_OFFICES', url: '/v1/offices', method: 'GET' },
      { name: 'GET_OFFICE', url: '/v1/offices/OFFICEID', method: 'GET' },



      /**
       * FOR LABS
       */
      { name: 'GET_ALL_LABS', url: '/v1/labs', method: 'GET' },
      { name: 'ADD_LAB', url: '/v1/labs', method: 'POST' },
      { name: 'UPDATE_LABS', url: '/v1/labs/LABID', method: 'PUT' },
      { name: 'DELETE_LAB', url: '/v1/labs/LABID', method: 'DELETE' },

      /**
       *  FOR HOSPITALS
       */
      { name: 'ADD_HOSPITAL', url: '/v1/hospitals', method: 'POST' },
      { name: 'UPDATE_HOSPITAL', url: '/v1/hospitals/HOSPITALID', method: 'PUT' },
      { name: 'DELETE_HOSPITAL', url: '/v1/hospitals/HOSPITALID', method: 'DELETE' },
      { name: 'GET_ALL_HOSPITALS', url: '/v1/hospitals', method: 'GET' },

      /**
       * FOR COLLECTION INFORMATION
       */
      { name: 'GET_COLLECTIONINFO', url: '/v1/requisitions/REQUISITIONID/collection-information', method: 'GET' },
      { name: 'ADD_COLLECTIONINFO', url: '/v1/requisitions/REQUISITIONID/collection-information', method: 'POST' },
      /**
       * FOR PATIENT INFORMATION
       */
      { name: 'GET_PATIENTINFORMATION', url: '/v1/requisitions/REQUISITIONID/patient-information', method: 'GET' },
      { name: 'ADD_PATIENT  INFO', url: '/v1/requisitions/REQUISITIONID/patient-information', method: 'POST' },

      /**
       * FOR AUTHORIZATION
       */
      { name: 'ADD_AUTHORIZATION', url: '/v1/requisitions/REQUISITIONID/patient-authorization', method: 'POST' },
      { name: 'GET_AUTHORIZATION', url: '/v1/requisitions/REQUISITIONID/patient-authorization', method: 'GET' },
      /**
       * FOR DIAGNOSIS CODES
       */
      { name: 'ADD_DIAGNOSISCODES', url: '/v1/requisitions/REQUISITIONID/diagnosis-codes', method: 'POST' },
      { name: 'GET_DIAGNOSISCODES', url: '/v1/requisitions/diagnosis-code/list', method: 'GET' },
      { name: 'LOAD_ALLDIAGNOSISCODES', url: '/v1/requisitions/REQUISITIONID/diagnosis-codes', method: 'GET' },

      /**
       * FOR REQUESTING PROVIDER
       */
      { name: 'ADD_REQUESTINGPROVIDER', url: '/v1/requisitions/REQUISITIONID/requesting-provider', method: 'POST' },
      { name: 'GET_REQUESTINGPROVIDER', url: '/v1/requisitions/REQUISITIONID/requesting-provider', method: 'GET' },
      { name: 'GET_ALLPHYSICIANS', url: '/v1/offices/OFFICEID/physicians', method: 'GET' },
      /**
       * FOR ELIGIBILITY CHECK
       */
      { name: 'ELIGIBILITY_CHECK', url: '/v1/eligibility/check', method: 'POST' },
      { name: 'GET_ALLPAYERS', url: '/v1/eligibility/payers', method: 'GET' },

      /**
       * FOR TEST MENU
       */
      { name: 'ADD_TESTMENU', url: '/v1/requisitions/REQUISITIONID/tests', method: 'POST' },
      { name: 'LOAD_TESTGROUPS', url: '/v1/requisitions/test-panel/list', method: 'GET' },
      { name: 'GET_TESTS', url: '/v1/requisitions/test-category/list', method: 'GET' },
      { name: 'LOAD_TESTS', url: '/v1/requisitions/REQUISITIONID/tests', method: 'GET' },

      /**
       *  FOR GETTING PHYCISIANS OFFICE OF A PARTICULAR PHYCISIAN ON LOGIN
       */
      { name: 'GET_OFFICES', url: '/v1/users/me/offices', method: 'GET' },

      /**
       * CREATE REQUISITIONs
       */
      { name: 'CREATE_REQUISITION', url: '/v1/requisitions', method: 'POST' },
      { name: 'ADD_REQUISITION', url: '/v1/requisitions/REQUISITIONID', method: 'POST' },
      { name: 'GET_REQUISITION', url: '/v1/requisitions/REQUISITIONID', method: 'GET' },
      /**
       * FOR REQUISITIONS TABLE
       */

      { name: 'LOADALL_REQUISITION', url: '/v1/requisitions/office/OFFICEID', method: 'GET' },
      { name: 'GET_TESTS', url: '/v1/requisition/test-categories', method: 'GET' },
      { name: 'GET_REPORTDATA', url: '/v1/requisitions/REQUITISIONID/report', method: 'GET' },

      /**
       * PENDING REQUISITIONS
       */
      { name: 'LOAD_PENDING_REQUISITIONS', url: '/v1/requisitions/office/OFFICEID', method: 'GET' },
      /**
       * Document Rules
       */
      { name: 'GET_ALL_DOCUMENTS', url: '/v1/documents', method: 'GET' },
      { name: 'GET_DOCUMENT', url: '/v1/documents/ID', method: 'GET' },
      { name: 'CREATE_DOCUMENTS', url: '/v1/documents', method: 'POST' },
      { name: 'UPDATE_DOCUMENTS', url: '/v1/documents/ID', method: 'PUT' },
      { name: 'DELETE_DOCUMENTS', url: '/v1/documents/ID', method: 'DELETE' },

      /**
       * FOR PENDING TASKS
       */
      { name: 'UPLOAD_FILE', url: '/v1/pending-tasks/DOCUMENTID/upload', method: 'POST' },
      { name: 'LOAD_PENDING_TASKS', url: '/v1/offices/OFFICEID/pending-tasks', method: 'GET' },
      { name: 'DELETE_PENDING_DOCUMENTS', url: '/v1/pending-tasks/DOCUMENTID/remove', method: 'DELETE' },

      { name: 'DELETE_REQUESTION_DOCUMENTS', url: '/v1/pending-tasks/DOCUMENTID/remove', method: 'DELETE' },

      /**
   * Notifications
   */
      { name: 'GET_NOTIFICATIONS', url: '/v1/offices/OFFICEID/notifications', method: 'GET' },
    ];

  }
}
