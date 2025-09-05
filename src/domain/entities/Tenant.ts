import { createTenantId } from "@/domain/services/CreateTenantId";
export class Tenant {
  id?: string;
  name: string;
  email: string;
  loginEmail?: string;
  cpfCnpj: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  city: number;
  state: string;
  complement: string;
  province: string;
  postalCode: string;
  password: string;
  isSubscriber?: boolean;

  constructor(
    name: string,
    email: string,
    cpfCnpj: string,
    mobilePhone: string,
    address: string,
    addressNumber: string,
    city: number,
    state: string,
    complement: string,
    province: string,
    postalCode: string,
    password: string
  ) {
    if (!this.id) {
      this.id = createTenantId();
    }
    this.name = name;
    this.email = email;
    this.loginEmail = email;
    this.cpfCnpj = cpfCnpj;
    this.mobilePhone = mobilePhone;
    this.password = password;
    this.address = address;
    this.addressNumber = addressNumber;
    this.complement = complement;
    this.city = city;
    this.state = state;
    this.province = province;
    this.postalCode = postalCode;
    this.isSubscriber = false;
  }
}
