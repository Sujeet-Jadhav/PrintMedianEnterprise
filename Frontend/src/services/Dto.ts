import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms"

export interface PageData {
  page?: any,
  content?: string[]
  pageable?: Pageable
  last?: boolean
  totalPages?: number
  totalElements?: number
  numberOfElements?: number
  first?: boolean
  size?: number
  number?: number
  sort?: Sort
  empty?: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
export interface PaginationRequest {
  search: string | null;
  pageSize: number;
  offset: number;
  sortBy?: string | null;
  sortDir?: string | null;
}

export interface DropDownData {
  id: string;
  text: string;
}

export interface DropDownDataOption {
  multiple: boolean;
  url: string;
  id: string;
  service: number;
  serverSide?: boolean;
}

export class Pattern {
  public static digit = '^[0-9]+(.[0-9]{0,4})?$';
  public static number = '^[0-9]*$';
  public static phone = '[- +()0-9]+';
  public static mobile = '^[0-9]{10}$';
  public static maxDegit = 999999999999;
  public static alfaNumric = '^[-_ a-zA-Z0-9]+$';
  public static entityName = '^[.,_a-zA-Z0-9&()\\s-]+$';
  public static zipCode = '^[1-9][0-9]{5}$';
  public static pan = '^[-_ a-zA-Z0-9]+$';
  public static aadhar = '^[2-9]{1}[0-9]{11}$';
  public static web = '^(?!.* .*)(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$';
  public static loginId = '^([_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,5}))|\\d+$';
  public static gstin = '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$';
}

export class GstItem {
  id?: string
  type?: string
  cess?: number = 0
  units: Unit[] = []
  gstRate?: GstRate[] = []
  maintainExpiry?: boolean = false
  maintainStockInBatch?: boolean = false
  taxableItem?: boolean = false
  stock?: any[]
  stockItem?: any[]
}

export class Unit {
  id?: string
  code?: string
}

export class GstRate {
  toValue?: number
  gstValue?: number
  fromValue?: number
}

export class Global {
  static key_token = 'token';
  static key_refresh_token = 'refreshToken';
  static key_permissions = 'permissions';
  static key_profile = 'profile';
  static key_location = 'location';
  static key_theme = 'theme';
  static key_latitude = 'latitude';
  static key_longitude = 'longitude';
}


export interface Address {
  id: string
  city: string
  type: string
  state: State
  status: string
  country: Country
  zipCode: string
  landmark: string
  faxNumber: string
  mobileNo: string
  addressLine1: string
  addressLine2: string
  email: string
  name?: string
  primaryContactTitle: string
  primaryContactLastName: string
  primaryContactFirstName: string
}

export interface State {
  id: string
  code: string
  name: string
}

export interface Country {
  id: string
  name: string
}

export interface ProductionTask {
  id: string
  status: string
  code: string
  name: string
  quantity: number
  unit: string
  deadLine: string
  requestedDate: string
  requestedBy: string
  operator: string
}

export interface ProductionLine {
  id: string
  name: string
  capacity: number
  description: string
  pending: ProductionTask[]
  inProgress: ProductionTask[]
  completed: ProductionTask[];
}

export class InputConfiguration {
  key!: string;
  label!: string;
  controlType !: string;
  order!: number;
  type?: string;
  options?: { key: string, value: string }[];
  validators?: Validators[]
  defaultValue?: any;
  dropDownUrl?: string;
}

export enum InputType {
  TEXT, CHECK_BOX, RADIO, SELECT, DROPDOWN, HIDDEN, TEXT_AREA, IMAGE
}
export const Status = [{ key: "ACTIVE", value: "Active" }, { key: "IN_ACTIVE", value: "In Active" }];

export const SectionType = [{ key: "TDS", value: "TDS" }, { key: "TCS", value: "TCS" }];

export interface GstProfile {
  id: string
  gstIncluding: any
  gstRegistrationType: string
  stateId: string
  tdsTcsApplicable: boolean
}


export class BankData {
  static banks = [
    { "name": "Bank of Baroda" },
    { "name": "Bank of India" },
    { "name": "Bank of Maharashtra" },
    { "name": "Canara Bank" },
    { "name": "Central Bank of India" },
    { "name": "Indian Bank" },
    { "name": "Indian Overseas Bank" },
    { "name": "Punjab & Sind Bank" },
    { "name": "Punjab National Bank" },
    { "name": "State Bank of India" },
    { "name": "UCO Bank" },
    { "name": "Union Bank of India" },

    { "name": "Axis Bank Ltd." },
    { "name": "Bandhan Bank Ltd." },
    { "name": "CSB Bank Ltd." },
    { "name": "City Union Bank Ltd." },
    { "name": "DCB Bank Ltd." },
    { "name": "Dhanlaxmi Bank Ltd." },
    { "name": "Federal Bank Ltd." },
    { "name": "HDFC Bank Ltd." },
    { "name": "ICICI Bank Ltd." },
    { "name": "Induslnd Bank Ltd." },
    { "name": "IDFC First Bank Ltd." },
    { "name": "Jammu & Kashmir Bank Ltd." },
    { "name": "Karnataka Bank Ltd." },
    { "name": "Karur Vysya Bank Ltd." },
    { "name": "Kotak Mahindra Bank Ltd." },
    { "name": "Nainital Bank Ltd." },
    { "name": "RBL Bank Ltd." },
    { "name": "South Indian Bank Ltd." },
    { "name": "Tamilnad Mercantile Bank Ltd." },
    { "name": "YES Bank Ltd." },
    { "name": "IDBI Bank Ltd." },

    { "name": "Au Small Finance Bank Limited" },
    { "name": "Capital Small Finance Bank Limited" },
    { "name": "Equitas Small Finance Bank Limited" },
    { "name": "Suryoday Small Finance Bank Limited" },
    { "name": "Ujjivan Small Finance Bank Limited" },
    { "name": "Utkarsh Small Finance Bank Limited" },
    { "name": "ESAF Small Finance Bank Limited" },
    { "name": "Fincare Small Finance Bank Limited" },
    { "name": "Jana Small Finance Bank Limited" },
    { "name": "North East Small Finance Bank Limited" },
    { "name": "Shivalik Small Finance Bank Limited" },
    { "name": "Unity Small Finance Bank Limited" },


    { "name": "India Post Payments Bank Limited" },
    { "name": "Fino Payments Bank Limited" },
    { "name": "Paytm Payments Bank Limited" },
    { "name": "Airtel Payments Bank Limited" },

    { "name": "Andhra Pragathi Grameena Bank" },
    { "name": "Andhra Pradesh Grameena Vikas Bank" },
    { "name": "Arunachal Pradesh Rural Bank" },
    { "name": "Aryavart Bank" },
    { "name": "Assam Gramin Vikash Bank" },
    { "name": "Bangiya Gramin Vikas Bank" },
    { "name": "Baroda Gujarat Gramin Bank" },
    { "name": "Baroda Rajasthan Kshetriya Gramin Bank" },
    { "name": "Baroda UP Bank" },
    { "name": "Chaitanya Godavari Grameena Bank" },
    { "name": "Chhattisgarh Rajya Gramin Bank" },
    { "name": "Dakshin Bihar Gramin Bank" },
    { "name": "Ellaquai Dehati Bank" },
    { "name": "Himachal Pradesh Gramin Bank" },
    { "name": "J&K Grameen Bank" },
    { "name": "Jharkhand Rajya Gramin Bank" },
    { "name": "Karnataka Gramin Bank" },
    { "name": "Karnataka Vikas Grameena Bank" },
    { "name": "Kerala Gramin Bank" },
    { "name": "Madhya Pradesh Gramin Bank" },
    { "name": "Madhyanchal Gramin Bank" },
    { "name": "Maharashtra Gramin Bank" },
    { "name": "Manipur Rural Bank" },
    { "name": "Meghalaya Rural Bank" },
    { "name": "Mizoram Rural Bank" },
    { "name": "Nagaland Rural Bank" },
    { "name": "Odisha Gramya Bank" },
    { "name": "Paschim Banga Gramin Bank" },
    { "name": "Prathama UP Gramin Bank" },
    { "name": "Puduvai Bharathiar Grama Bank" },
    { "name": "Punjab Gramin Bank" },
    { "name": "Rajasthan Marudhara Gramin Bank" },
    { "name": "Saptagiri Grameena Bank" },
    { "name": "Sarva Haryana Gramin Bank" },
    { "name": "Saurashtra Gramin Bank" },
    { "name": "Tamil Nadu Grama Bank" },
    { "name": "Telangana Grameena Bank" },
    { "name": "Tripura Gramin Bank" },
    { "name": "Utkal Grameen bank" },
    { "name": "Uttar Bihar Gramin Bank" },
    { "name": "Uttarakhand Gramin Bank" },
    { "name": "Uttarbanga Kshetriya Gramin Bank" },
    { "name": "Vidharbha Konkan Gramin Bank" },

    { "name": "AB Bank Ltd." },
    { "name": "American Express Banking Corporation" },
    { "name": "Australia and New Zealand Banking Group Ltd." },
    { "name": "Barclays Bank Plc." },
    { "name": "Bank of America" },
    { "name": "Bank of Bahrain & Kuwait BSC" },
    { "name": "Bank of Ceylon" },
    { "name": "Bank of China" },
    { "name": "Bank of Nova Scotia" },
    { "name": "BNP Paribas" },
    { "name": "Citibank N.A." },
    { "name": "Cooperatieve Rabobank U.A." },
    { "name": "Credit Agricole Corporate & Investment Bank" },
    { "name": "Credit Suisse A.G" },
    { "name": "CTBC Bank Co., Ltd." },
    { "name": "DBS Bank India Limited*" },
    { "name": "Deutsche Bank" },
    { "name": "Doha Bank Q.P.S.C" },
    { "name": "Emirates Bank NBD" },
    { "name": "First Abu Dhabi Bank PJSC" },
    { "name": "FirstRand Bank Ltd" },
    { "name": "HSBC Ltd" },
    { "name": "Industrial & Commercial Bank of China Ltd." },
    { "name": "Industrial Bank of Korea" },
    { "name": "J.P. Morgan Chase Bank N.A." },
    { "name": "JSC VTB Bank" },
    { "name": "KEB Hana Bank" },
    { "name": "Kookmin Bank" },
    { "name": "Krung Thai Bank Public Co. Ltd." },
    { "name": "Mashreq Bank PSC" },
    { "name": "Mizuho Bank Ltd." },
    { "name": "MUFG Bank, Ltd." },
    { "name": "NatWest Markets Plc" },
    { "name": "NongHyup Bank" },
    { "name": "PT Bank Maybank Indonesia TBK" },
    { "name": "Qatar National Bank (Q.P.S.C.)" },
    { "name": "Sberbank" },
    { "name": "SBM Bank (India) Limited*" },
    { "name": "Shinhan Bank" },
    { "name": "Societe Generale" },
    { "name": "AB Bank Ltd." },
    { "name": "Sonali Bank PLC" },
    { "name": "Standard Chartered Bank" },
    { "name": "Sumitomo Mitsui Banking Corporation" },
    { "name": "United Overseas Bank Ltd" },
    { "name": "Woori Bank" }
  ]

}


import { ValidationErrors } from '@angular/forms'

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    if (!password) {
      return { required: true };
    }

    const errors: ValidationErrors = {};

    // Length check
    if (password.length < 8 || password.length > 12) {
      errors['passwordLength'] = true;
    }

    // Uppercase check
    if (!/[A-Z]/.test(password)) {
      errors['passwordUppercase'] = true;
    }

    // Lowercase check
    if (!/[a-z]/.test(password)) {
      errors['passwordLowercase'] = true;
    }

    // Number check
    if (!/[0-9]/.test(password)) {
      errors['passwordNumber'] = true;
    }

    // Special character check
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
      errors['passwordSpecialChar'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}

const STATUS_ICON_MAP: Record<string, string> = {
  PAID: 'ph-check-circle text-info',
  ACTIVE: 'ph-check-circle text-info',
  SENT: 'ph-check text-info',
  READY: 'ph-check-circle text-info',
  APPROVED: 'ph-checks text-warning',
  ACCEPTED: 'ph-target',
  CONFIRMED: 'ph-shield-check',
  PICKED: 'ph-shopping-cart',
  PACKED: 'ph-package',
  COMPLETED: 'ph-target text-danger',
  SUCCESS: 'ph-target text-danger',
  PENDING: 'ph-clock',
  READY_FOR_DISPATCH: 'ph-clock',
  WAITING: 'ph-clock',
  IN_PROGRESS: 'ph-clock',
  REJECTED: 'ph-prohibit',
  ERROR: 'ph-bug text-warning',
  FAILED: 'ph-warning text-warning',
  CANCELLED: 'ph-x',
  IN_ACTIVE: 'ph-x',
  UNPAID: 'ph-x',
  OVERDUE: 'ph-warning',
  DISPATCHED: 'ph-truck',
  DELIVERED: 'ph-truck',
  OUT: 'ph-truck',
  DRAFT: 'ph-note',
  PROCESSED: 'ph-arrows-clockwise',
  INVITED: 'ph-folder-lock',
  CLOSED: 'ph-folder-lock',
  OPENED: 'ph-envelope-open',
};

export function getStatusIcon(status: string): string {
  if (!status) {
    return 'ph-circle'; // Default fallback icon
  }
  return STATUS_ICON_MAP[status.toUpperCase()] || 'ph-circle';
}


const BADGE_CLASSES = {
  PRIMARY: 'badge bg-primary-subtle text-primary bg-opacity-20 border-0',
  INFO: 'badge bg-info-subtle text-info bg-opacity-20 border-0',
  WARNING: 'badge bg-warning-subtle text-warning bg-opacity-20 border-0',
  SECONDARY: 'badge bg-secondary-subtle text-secondary bg-opacity-20 border-0',
  DARK: 'badge bg-dark-subtle text-dark bg-opacity-20 border-0',
  DANGER: 'badge bg-danger-subtle text-danger bg-opacity-20 border-0',
  SUCCESS: 'badge bg-success-subtle text-success bg-opacity-20 border-0',
  PURPUL: 'badge bg-purple text-purple bg-opacity-20 border-0',
};
const STATUS_MAP: Record<string, string> = {
  COMPLETED: BADGE_CLASSES.PRIMARY,
  SENT: BADGE_CLASSES.PRIMARY,
  NEW: BADGE_CLASSES.PRIMARY,
  READY: BADGE_CLASSES.INFO,
  PROCESSED: BADGE_CLASSES.PURPUL,
  IN_PROGRESS: BADGE_CLASSES.PRIMARY,
  INVITED: BADGE_CLASSES.PRIMARY,
  OPENED: BADGE_CLASSES.INFO,
  DISPATCHED: BADGE_CLASSES.INFO,
  PICKED: BADGE_CLASSES.SECONDARY,
  PACKED: BADGE_CLASSES.PRIMARY,
  PENDING: BADGE_CLASSES.WARNING,
  WAITING: BADGE_CLASSES.WARNING,
  PARTIAL_DISPATCHED: BADGE_CLASSES.WARNING,
  OUT: BADGE_CLASSES.WARNING,
  PARTIALLY_APPROVED: BADGE_CLASSES.WARNING,
  DRAFT: BADGE_CLASSES.SECONDARY,
  CLOSED: BADGE_CLASSES.DARK,
  DELIVERED: BADGE_CLASSES.DARK,
  IN_ACTIVE: BADGE_CLASSES.DANGER,
  REJECTED: BADGE_CLASSES.DANGER,
  FAILED: BADGE_CLASSES.DANGER,
  CANCELLED: BADGE_CLASSES.DANGER,
  UNPAID: BADGE_CLASSES.DANGER,
  PAID: BADGE_CLASSES.SUCCESS,
  PARTIALLY_PAID: BADGE_CLASSES.WARNING,
  OVERDUE: BADGE_CLASSES.DANGER,
  NOT_CREATED: BADGE_CLASSES.WARNING,
  ERROR: BADGE_CLASSES.DANGER,
  INTERNAL_SERVER_ERROR: BADGE_CLASSES.DANGER,
};

export function getStatusBadge(status: string): string {
  if (!status) {
    return BADGE_CLASSES.WARNING;
  }
  return STATUS_MAP[status.toUpperCase()] || BADGE_CLASSES.SUCCESS;
}

export function getFormValidationErrors(control: AbstractControl, parentPath: string = ''): any[] {
  const errors: any[] = [];

  if (control instanceof FormGroup) {
    // Iterate over controls in the FormGroup
    Object.keys(control.controls).forEach(key => {
      const childControl = control.get(key);
      if (childControl) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        errors.push(...getFormValidationErrors(childControl, currentPath));
      }
    });
  } else if (control instanceof FormArray) {
    // Iterate over items (FormGroup or FormControl) in the FormArray
    control.controls.forEach((itemControl, index) => {
      const currentPath = parentPath ? `${parentPath}[${index}]` : `[${index}]`;
      errors.push(...getFormValidationErrors(itemControl, currentPath));
    });
  } else if (control instanceof FormControl) {
    // Check if the FormControl itself has errors
    if (control.invalid && control.errors) {
      for (const errorType in control.errors) {
        if (control.errors.hasOwnProperty(errorType)) {
          const errorMessage = getErrorMessage(parentPath, errorType, control.errors[errorType]);
          errors.push({
            controlName: parentPath, // The full path to the control
            errorType: errorType,
            errorMessage: errorMessage,
          });
        }
      }
    }
  }

  return errors;
}
function getErrorMessage(controlPath: string, errorType: string, errorValue: any): string {
  // Make the control name more readable (e.g., "name", "addresses Item 0 Street")
  const readableControlName = controlPath.split('.')
    .map(segment => segment.replace(/\[(\d+)\]/, ' Item $1'))
    .join(' ') || 'Field';

  switch (errorType) {
    case 'required':
      return `${readableControlName} is required.`;
    case 'minlength':
      return `${readableControlName} must be at least ${errorValue.requiredLength} characters (current: ${errorValue.actualLength}).`;
    case 'maxlength':
      return `${readableControlName} must be no more than ${errorValue.requiredLength} characters (current: ${errorValue.actualLength}).`;
    case 'email':
      return `${readableControlName} must be a valid email address.`;
    case 'pattern':
      return `${readableControlName} does not match the required pattern.`;
    case 'min':
      return `${readableControlName} must be at least ${errorValue.min}.`;
    case 'max':
      return `${readableControlName} must be at most ${errorValue.max}.`;
    // Add custom validator messages here
    case 'matchPassword': // Example for a custom validator
      return 'Passwords do not match.';
    default:
      // Fallback for unknown error types or for debugging
      return `${readableControlName}: Validation failed for '${errorType}'.`;
  }
}
