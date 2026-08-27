import { Field, Float, ObjectType, registerEnumType, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-scalars';

// ==================== Enums ====================

export enum Roles {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User',
  Customer = 'Customer',
  Staff = 'Staff',
  BusinessOwner = 'BusinessOwner',
  BusinessManager = 'BusinessManager',
  CustomerSupport = 'CustomerSupport',
}
registerEnumType(Roles, { name: 'Roles' });

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Suspended = 'Suspended',
}
registerEnumType(Status, { name: 'Status' });

export enum TenantStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Locked = 'Locked',
  Deactivate = 'Deactivate',
}
registerEnumType(TenantStatus, { name: 'TenantStatus' });

export enum ThemeStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}
registerEnumType(ThemeStatus, { name: 'ThemeStatus' });

export enum VoucherStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Expired = 'Expired',
  Redeemed = 'Redeemed',
}
registerEnumType(VoucherStatus, { name: 'VoucherStatus' });

export enum GiftCardStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Expired = 'Expired',
}
registerEnumType(GiftCardStatus, { name: 'GiftCardStatus' });

export enum TaxAndFeeType {
  TAX = 'TAX',
  SERVICE_FEE = 'SERVICE_FEE',
}
registerEnumType(TaxAndFeeType, { name: 'TaxAndFeeType' });

export enum ReasonActionType {
  Cancel = 'cancel',
  Reschedule = 'reschedule',
  NoShow = 'no_show',
  Other = 'other',
}
registerEnumType(ReasonActionType, { name: 'ReasonActionType' });

export enum PriorityOption {
  Default = 'Default',
  YesterdayQueue = 'YesterdayQueue',
  SecondStaffRotation = 'SecondStaffRotation',
}
registerEnumType(PriorityOption, { name: 'PriorityOption' });

export enum TimeOffStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}
registerEnumType(TimeOffStatus, { name: 'TimeOffStatus' });

export enum OperationHoursDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}
registerEnumType(OperationHoursDay, { name: 'OperationHoursDay' });

export enum StaffIncomeStatus {
  UNCONFIRMED = 'UNCONFIRMED',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  APPROVED = 'APPROVED',
}
registerEnumType(StaffIncomeStatus, { name: 'StaffIncomeStatus' });

export enum PayrollPaymentMethod {
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  COMBINE = 'COMBINE',
}
registerEnumType(PayrollPaymentMethod, { name: 'PayrollPaymentMethod' });

export enum PayrollStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}
registerEnumType(PayrollStatus, { name: 'PayrollStatus' });

export enum ActivityLogPayrollType {
  STATUS_CHANGE = 'STATUS_CHANGE',
  FIELD_CHANGE = 'FIELD_CHANGE',
}
registerEnumType(ActivityLogPayrollType, { name: 'ActivityLogPayrollType' });

export enum PaymentType {
  Booking = 'Booking',
  Voucher = 'Voucher',
  GiftCard = 'GiftCard',
}
registerEnumType(PaymentType, { name: 'PaymentType' });

export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'CreditCard',
  Stripe = 'Stripe',
  Clover = 'Clover',
  Voucher = 'Voucher',
  GiftCard = 'GiftCard',
  Square = 'Square',
}
registerEnumType(PaymentMethod, { name: 'PaymentMethod' });

export enum PaymentStatus {
  Unpaid = 'Unpaid',
  Paid = 'Paid',
  Refunded = 'Refunded',
  PartialRefunded = 'PartialRefunded',
}
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

export enum OrderItemStatus {
  Booked = 'booked',
  Arrived = 'arrived',
  Started = 'started',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}
registerEnumType(OrderItemStatus, { name: 'OrderItemStatus' });

export enum OrderStatus {
  Booked = 'booked',
  Arrived = 'arrived',
  Started = 'started',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}
registerEnumType(OrderStatus, { name: 'OrderStatus' });

export enum OrderSourceType {
  WalkIn = 'walk_in',
  Booking = 'booking',
}
registerEnumType(OrderSourceType, { name: 'OrderSourceType' });

export enum OrderType {
  Booking = 'booking',
  Product = 'product',
}
registerEnumType(OrderType, { name: 'OrderType' });

export enum PaymentMethod_Order {
  Cash = 'cash',
  Card = 'card',
}
registerEnumType(PaymentMethod_Order, { name: 'PaymentMethod_Order' });

export enum PaymentStatus_Order {
  Unpaid = 'unpaid',
  Paid = 'paid',
  PartiallyPaid = 'partially_paid',
}
registerEnumType(PaymentStatus_Order, { name: 'PaymentStatus_Order' });

export enum PaymentMethodType {
  STRIPE = 'STRIPE',
  CLOVER = 'CLOVER',
  CASH = 'CASH',
  OTHER = 'OTHER',
}
registerEnumType(PaymentMethodType, { name: 'PaymentMethodType' });

export enum BranchStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
registerEnumType(BranchStatus, { name: 'BranchStatus' });

export enum SalaryType {
  HOUR = 'HOUR',
  MONTH = 'MONTH',
}
registerEnumType(SalaryType, { name: 'SalaryType' });

export enum ProductType {
  Simple = 'simple',
  Variable = 'variable',
  Service = 'service',
}
registerEnumType(ProductType, { name: 'ProductType' });

export enum DiscountType {
  Percentage = 'Percentage',
  Fixed = 'Fixed',
}
registerEnumType(DiscountType, { name: 'DiscountType' });

export enum CampaignStatus {
  Draft = 'Draft',
  Active = 'Active',
  Inactive = 'Inactive',
  Expired = 'Expired',
}
registerEnumType(CampaignStatus, { name: 'CampaignStatus' });

export enum NotificationTime {
  NOTHING = 'NOTHING',
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  ONE_HOUR = 'ONE_HOUR',
  TWO_HOURS = 'TWO_HOURS',
  ONE_DAY = 'ONE_DAY',
}
registerEnumType(NotificationTime, { name: 'NotificationTime' });

export enum HookEventStatus {
  New = 'New',
  Processing = 'Processing',
  Done = 'Done',
  Failed = 'Failed',
}
registerEnumType(HookEventStatus, { name: 'HookEventStatus' });

export enum TipModes {
  ON_SCREEN = 'ON_SCREEN',
  ON_PAPER = 'ON_PAPER',
  FLAT_TIP = 'FLAT_TIP',
  NO_TIP = 'NO_TIP',
}
registerEnumType(TipModes, { name: 'TipModes' });

export enum MessageTemplateStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}
registerEnumType(MessageTemplateStatus, { name: 'MessageTemplateStatus' });

export enum NewsStatus {
  DRAFT = 'draft',
  PUBLISH = 'publish',
  TRASH = 'trash',
}
registerEnumType(NewsStatus, { name: 'NewsStatus' });

export enum NewsShowIn {
  CUSTOMER_APP = 'customer_app',
  STAFF_APP = 'staff_app',
  BOTH_APP = 'both_app',
}
registerEnumType(NewsShowIn, { name: 'NewsShowIn' });

export enum InAppType {
  Customers = 'customers',
  Staffs = 'staffs',
  BothApp = 'both_app',
}
registerEnumType(InAppType, { name: 'InAppType' });

export enum JobStatus {
  OPEN = 'OPEN',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}
registerEnumType(JobStatus, { name: 'JobStatus' });

export enum JobTypes {
  ORDER_BOOKED = 'ORDER_BOOKED',
  STAFF_SALARY = 'STAFF_SALARY',
  BOOKING_SUMMARY = 'BOOKING_SUMMARY',
  SALE_SUMMARY = 'SALE_SUMMARY',
  REMINDER = 'REMINDER',
}
registerEnumType(JobTypes, { name: 'JobTypes' });

export enum AssetStatus {
  Draft = 'Draft',
  Done = 'Done',
  Deleted = 'Deleted',
}
registerEnumType(AssetStatus, { name: 'AssetStatus' });

export enum CycleStatus {
  Active = 'active',
  Ongoing = 'ongoing',
  Expired = 'expired',
}
registerEnumType(CycleStatus, { name: 'CycleStatus' });

export enum ActivityLogAction {
  Created = 'Created',
  Updated = 'Updated',
  Deleted = 'Deleted',
  UpdatePayment = 'UpdatePayment',
  TenantPayment = 'TenantPayment',
  Booked = 'Booked',
  Confirmed = 'Confirmed',
  Upcoming = 'Upcoming',
  Arrived = 'Arrived',
  Started = 'Started',
  Completed = 'Completed',
  Archived = 'Archived',
  Refunded = 'Refunded',
  Refunding = 'Refunding',
  Inprogress = 'Inprogress',
  Failed = 'Failed',
  Canceled = 'Canceled',
  NoShow = 'No-Show',
  MarkDone = 'MarkDone',
  Assigned = 'Assigned',
  Unassigned = 'Unassigned',
}
registerEnumType(ActivityLogAction, { name: 'ActivityLogAction' });

// ==================== Base Entity ====================

export type BaseDocument = HydratedDocument<BaseEntity>;

@ObjectType()
@Schema({ timestamps: true })
export class BaseEntity {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

// ==================== Activity Log ====================

export type ActivityLogDocument = HydratedDocument<ActivityLog>;

@ObjectType()
@Schema({ collection: 'activity_logs', timestamps: true })
export class ActivityLog extends BaseEntity {
  @Field(() => ActivityLogAction)
  @Prop({ enum: ActivityLogAction, required: true })
  action: ActivityLogAction;

  @Field()
  @Prop({ required: true })
  entity: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  entityId: Types.ObjectId;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch' })
  branchId?: Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  text?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  performedById?: Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  performedBy?: string;

  @Field()
  @Prop({ default: Date.now })
  date: Date;
}
export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);

// ==================== Activity Log Payroll ====================

@ObjectType()
export class LogStatusChange {
  @Field(() => StaffIncomeStatus)
  status: string;

  @Field(() => StaffIncomeStatus)
  oldStatus: string;
}

@ObjectType()
export class FieldChange {
  @Field()
  field: string;

  @Field()
  value: number;

  @Field()
  oldValue: number;
}

export type ActivityLogPayrollDocument = HydratedDocument<ActivityLogPayroll>;

@ObjectType()
@Schema({ collection: 'activity_logs_payroll', timestamps: true })
export class ActivityLogPayroll extends BaseEntity {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  staffId: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  createBy: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  branchId: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  staffIncomeId: Types.ObjectId;

  @Field(() => ActivityLogPayrollType)
  @Prop({ enum: ActivityLogPayrollType, required: true })
  type: ActivityLogPayrollType;

  @Field({ nullable: true })
  @Prop()
  text?: string;

  @Field(() => LogStatusChange, { nullable: true })
  @Prop({ type: Object })
  statusChange?: LogStatusChange;

  @Field(() => StaffIncomeStatus, { nullable: true })
  @Prop({ enum: StaffIncomeStatus })
  currentStatus?: StaffIncomeStatus;

  @Field(() => FieldChange, { nullable: true })
  @Prop({ type: Object })
  fieldChange?: FieldChange;

  @Field()
  @Prop({ required: true })
  date: Date;
}
export const ActivityLogPayrollSchema = SchemaFactory.createForClass(ActivityLogPayroll);

// ==================== App Setting ====================

export type AppSettingDocument = HydratedDocument<AppSetting>;

@ObjectType()
@Schema({ collection: 'app_settings', timestamps: true })
export class AppSetting extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  key: string;

  @Field()
  @Prop({ required: true })
  value: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const AppSettingSchema = SchemaFactory.createForClass(AppSetting);

// ==================== Tenant Config ====================

export type TenantConfigDocument = HydratedDocument<TenantConfig>;

@ObjectType()
@Schema({ collection: 'tenant_configs', timestamps: true, minimize: false })
export class TenantConfig extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.Mixed, required: true, default: {} })
  adminWebConfigs: any;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.Mixed, required: true, default: {} })
  customerWebConfigs: any;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.Mixed, required: true, default: {} })
  mobileConfigs: any;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.Mixed, required: true, default: {} })
  backendConfigs: any;

  @Prop({ default: false })
  isDeleted: boolean;
}
export const TenantConfigSchema = SchemaFactory.createForClass(TenantConfig);

// ==================== Asset ====================

@ObjectType()
export class AssetDetail {
  @Field()
  @Prop()
  type: string;

  @Field({ nullable: true })
  @Prop()
  width?: string;

  @Field({ nullable: true })
  @Prop()
  height?: string;

  @Field({ nullable: true })
  @Prop()
  size?: string;
}

export type AssetDocument = HydratedDocument<Asset>;

@ObjectType()
@Schema({ collection: 'assets', timestamps: true })
export class Asset extends BaseEntity {
  @Field()
  @Prop({ default: '' })
  entity: string;

  @Field()
  @Prop({ default: '' })
  entityId: string;

  @Field()
  @Prop()
  area: string;

  @Field()
  @Prop()
  url: string;

  @Field()
  @Prop()
  filePath: string;

  @Field(() => AssetDetail)
  @Prop({ type: AssetDetail })
  details: AssetDetail;

  @Field(() => AssetStatus)
  @Prop({ type: String, enum: AssetStatus, default: AssetStatus.Draft })
  status: AssetStatus;
}
export const AssetSchema = SchemaFactory.createForClass(Asset);

// ==================== User Device ====================

export type UserDeviceDocument = HydratedDocument<UserDevice>;

@ObjectType()
@Schema({ collection: 'user_devices', timestamps: true })
export class UserDevice extends BaseEntity {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  userAgent: string;

  @Field()
  @Prop({ default: false })
  isLogout: boolean;
}
export const UserDeviceSchema = SchemaFactory.createForClass(UserDevice);

// ==================== Branch ====================

@ObjectType()
export class SalaryRate {
  @Field({ nullable: true })
  @Prop()
  amount?: number;

  @Field(() => SalaryType, { nullable: true })
  @Prop({ type: String, enum: SalaryType, default: SalaryType.HOUR })
  salaryType?: SalaryType;
}

@ObjectType()
export class RangerTime {
  @Field()
  @Prop()
  openAtMinutes: number;

  @Field()
  @Prop()
  closeAtMinutes: number;
}

@ObjectType()
export class OperationHours {
  @Field()
  @Prop()
  day: string;

  @Field(() => [RangerTime], { defaultValue: [] })
  @Prop({ type: [Object], default: [] })
  rangerTimes?: RangerTime[];

  @Field({ nullable: true })
  @Prop()
  status?: string;
}

export type BranchDocument = HydratedDocument<Branch>;

@ObjectType()
@Schema({ collection: 'branches', timestamps: true })
export class Branch extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  address?: string;

  @Field({ nullable: true })
  @Prop()
  phoneNumber?: string;

  @Field(() => BranchStatus)
  @Prop({ type: String, enum: BranchStatus, default: BranchStatus.Active })
  status: BranchStatus;

  @Field({ nullable: true })
  @Prop({ default: 'UTC' })
  timezone?: string;

  @Field(() => [OperationHours], { defaultValue: [] })
  @Prop({ type: [Object], default: [] })
  operationHours?: OperationHours[];

  @Field(() => SalaryRate, { nullable: true })
  @Prop({ type: Object })
  salaryRate?: SalaryRate;

  @Field({ nullable: true, defaultValue: false })
  @Prop({ default: false })
  isIncludedTax?: boolean;
}
export const BranchSchema = SchemaFactory.createForClass(Branch);

// ==================== Brand ====================

export type BrandDocument = HydratedDocument<Brand>;

@ObjectType()
@Schema({ collection: 'brands', timestamps: true })
export class Brand extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  logo?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);

// ==================== Business Fee ====================

export type BusinessFeeDocument = HydratedDocument<BusinessFee>;

@ObjectType()
@Schema({ collection: 'business_fees', timestamps: true })
export class BusinessFee extends BaseEntity {
  @Field()
  @Prop({ required: true })
  tenantId: string;

  @Field()
  @Prop({ required: true, default: 0 })
  setupFee: number;

  @Field()
  @Prop({ required: true, default: 0 })
  serviceFee: number;

  @Field()
  @Prop({ required: true, default: 0 })
  smsFee: number;

  @Field(() => CycleStatus)
  @Prop({ type: String, enum: CycleStatus, default: CycleStatus.Ongoing })
  cycleStatus: CycleStatus;

  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  endDate: Date;

  @Field({ nullable: true })
  @Prop()
  paymentStatus?: string;

  @Field({ nullable: true })
  totalServiceFee?: number;

  @Field({ nullable: true })
  totalSetupFee?: number;

  @Field({ nullable: true })
  totalSmsFee?: number;

  @Field({ nullable: true })
  totalFee?: number;
}
export const BusinessFeeSchema = SchemaFactory.createForClass(BusinessFee);

// ==================== Business Category ====================

export type BusinessCategoryDocument = HydratedDocument<BusinessCategory>;

@ObjectType()
@Schema({ collection: 'business_categories', timestamps: true })
export class BusinessCategory extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;
}
export const BusinessCategorySchema = SchemaFactory.createForClass(BusinessCategory);

// ==================== Campaign ====================

@ObjectType()
@Schema({ _id: true })
export class CampaignItem {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  discountGroupName?: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field(() => DiscountType)
  @Prop({ enum: DiscountType, default: DiscountType.Percentage })
  discountType: DiscountType;

  @Field(() => Float, { nullable: true })
  @Prop({ default: 0 })
  discountPercent?: number;

  @Field(() => Float)
  @Prop({ required: true })
  discountValue: number;

  @Field(() => [ID])
  @Prop({ type: [Types.ObjectId], required: true })
  serviceIds: Types.ObjectId[];
}

export type CampaignDocument = HydratedDocument<Campaign>;

@ObjectType()
@Schema({ collection: 'campaigns', timestamps: true })
export class Campaign extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop({ unique: true, sparse: true })
  slugUrl?: string;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  banners: string[];

  @Field(() => [ID])
  @Prop({ type: [Types.ObjectId], required: true })
  branchIds: Types.ObjectId[];

  @Field(() => [CampaignItem], { defaultValue: [] })
  @Prop({ type: [CampaignItem], default: [] })
  items: CampaignItem[];

  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field({ nullable: true })
  @Prop()
  endDate?: Date;

  @Field(() => CampaignStatus)
  @Prop({ enum: CampaignStatus, default: CampaignStatus.Inactive })
  status: CampaignStatus;

  @Field(() => NotificationTime, { defaultValue: NotificationTime.NOTHING })
  @Prop({ enum: NotificationTime, default: NotificationTime.NOTHING })
  notificationTimeBeforeStart?: NotificationTime;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  useVoucher: boolean;

  @Field({ nullable: true })
  @Prop()
  deepLink?: string;
}
export const CampaignSchema = SchemaFactory.createForClass(Campaign);

// ==================== Care Tips ====================

export type CareTipsDocument = HydratedDocument<CareTips>;

@ObjectType()
@Schema({ collection: 'care_tips', timestamps: true })
export class CareTips extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  title: string;

  @Field({ nullable: true })
  @Prop()
  short_description?: string;

  @Field({ nullable: true })
  @Prop()
  content?: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [Types.ObjectId], ref: 'Product' })
  serviceIds?: string[];

  @Field(() => InAppType, { defaultValue: InAppType.BothApp })
  @Prop({ type: String, enum: InAppType, default: InAppType.BothApp })
  inApp: InAppType;

  @Field(() => Status, { defaultValue: Status.Active })
  @Prop({ type: String, enum: Status, default: Status.Active })
  status: Status;

  @Field({ nullable: true })
  @Prop()
  datetime?: Date;

  @Field({ nullable: true })
  summary?: string;
}

@ObjectType()
export class PaginatedCareTips {
  @Field(() => [CareTips])
  items: CareTips[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const CareTipsSchema = SchemaFactory.createForClass(CareTips);

// ==================== Category ====================

export type CategoryDocument = HydratedDocument<Category>;

@ObjectType()
@Schema({ collection: 'categories', timestamps: true })
export class Category extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

// ==================== Chat ====================

@ObjectType()
@Schema()
export class ChatMessage {
  @Field()
  @Prop()
  senderId: string;

  @Field()
  @Prop()
  content: string;

  @Field()
  @Prop({ default: Date.now })
  sentAt: Date;
}
const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

export type ChatDocument = HydratedDocument<Chat>;

@ObjectType()
@Schema({ collection: 'chats', timestamps: true })
export class Chat extends BaseEntity {
  @Field(() => [String])
  @Prop({ type: [String], required: true })
  participantIds: string[];

  @Field()
  @Prop({ required: true, index: true })
  tenantId: string;

  @Field(() => [ChatMessage])
  @Prop({ type: [ChatMessageSchema], default: [] })
  messages: ChatMessage[];
}
export const ChatSchema = SchemaFactory.createForClass(Chat);

// ==================== CMSPage ====================

export type CMSPageDocument = HydratedDocument<CMSPage>;

@ObjectType()
@Schema({ collection: 'cms_pages', timestamps: true })
export class CMSPage extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  slug: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Prop()
  content?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isPublished: boolean;
}
export const CMSPageSchema = SchemaFactory.createForClass(CMSPage);

// ==================== Currency ====================

export type CurrencyDocument = HydratedDocument<Currency>;

@ObjectType()
@Schema({ collection: 'currencies', timestamps: true })
export class Currency extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  code: string;

  @Field()
  @Prop({ required: true })
  symbol: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const CurrencySchema = SchemaFactory.createForClass(Currency);

// ==================== Custom Message ====================

export type CustomMessageDocument = HydratedDocument<CustomMessage>;

@ObjectType()
@Schema({ collection: 'custom_messages', timestamps: true })
export class CustomMessage extends BaseEntity {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'MessageTemplate', required: true })
  templateId: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}

@ObjectType()
export class PaginatedCustomMessage {
  @Field(() => [CustomMessage])
  items: CustomMessage[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const CustomMessageSchema = SchemaFactory.createForClass(CustomMessage);

// ==================== Favorite ====================

export type FavoriteDocument = HydratedDocument<Favorite>;

@ObjectType()
@Schema({ collection: 'favorites', timestamps: true })
export class Favorite extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  customerId: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  serviceId?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchId?: string;
}
export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

// ==================== Gift Card ====================

export type GiftCardDocument = HydratedDocument<GiftCard>;

@ObjectType()
@Schema({ collection: 'gift_cards', timestamps: true })
export class GiftCard extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  code: string;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  customerId: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchId?: Types.ObjectId;

  @Field(() => Float)
  @Prop({ required: true, default: 0 })
  price: number;

  @Field(() => Float)
  @Prop({ required: true, default: 0 })
  value: number;

  @Field(() => Float)
  @Prop({ required: true, default: 0 })
  remained: number;

  @Field(() => Float)
  @Prop({ default: 0 })
  redeemed: number;

  @Field({ nullable: true })
  @Prop()
  startDate?: Date;

  @Field({ nullable: true })
  @Prop()
  expireDate?: Date;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isNeverExpireDate: boolean;

  @Field(() => GiftCardStatus)
  @Prop({ enum: GiftCardStatus, default: GiftCardStatus.Inactive })
  status: GiftCardStatus;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isDeleted: boolean;
}
export const GiftCardSchema = SchemaFactory.createForClass(GiftCard);

// ==================== Clover Setting ====================

@ObjectType()
@InputType('TransactionSettingsInput')
export class TransactionSettings {
  @Field()
  @Prop({ default: false })
  disableDuplicatePaymentChecking: boolean;

  @Field()
  @Prop({ default: false })
  disableDevicePrinting: boolean;

  @Field()
  @Prop({ default: false })
  disableReceiptOptionsScreen: boolean;

  @Field()
  @Prop({ default: false })
  alwaysPrintReceipt: boolean;
}

@ObjectType()
@InputType('TipSuggestionInput')
export class TipSuggestion {
  @Field()
  @Prop()
  label: string;

  @Field()
  @Prop()
  percentage: number;

  @Field()
  @Prop({ default: false })
  isEnable: boolean;
}

@ObjectType()
@InputType('TipsSettingsInput')
export class TipsSettings {
  @Field(() => TipModes)
  @Prop({ type: String, enum: TipModes })
  tipsMode: TipModes;

  @Field(() => [TipSuggestion])
  @Prop({ type: [TipSuggestion], default: [] })
  tipsSuggestions: TipSuggestion[];
}

export type CloverSettingDocument = HydratedDocument<CloverSetting>;

@ObjectType()
@Schema({ collection: 'clover_setting', timestamps: true })
export class CloverSetting extends BaseEntity {
  @Field()
  @Prop({ unique: true })
  branchId: string;

  @Field()
  @Prop()
  applicationId: string;

  @Field()
  @Prop()
  uri: string;

  @Field()
  @Prop({ default: false })
  isConnected: boolean;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isSelected: boolean;

  @Field({ nullable: true })
  @Prop()
  posName?: string;

  @Field({ nullable: true })
  @Prop()
  serialNumber?: string;

  @Field({ nullable: true })
  @Prop()
  authToken?: string;

  @Field({ nullable: true })
  @Prop()
  pairingCode?: string;

  @Field(() => TransactionSettings)
  @Prop({ type: TransactionSettings })
  transactionSettings: TransactionSettings;

  @Field(() => TipsSettings)
  @Prop({ type: TipsSettings })
  tipSettings: TipsSettings;
}
export const CloverSettingSchema = SchemaFactory.createForClass(CloverSetting);

// ==================== Hook Event ====================

export type HookEventDocument = HydratedDocument<HookEvent>;

@ObjectType()
@Schema({ collection: 'hook_events', timestamps: true })
export class HookEvent extends BaseEntity {
  @Field()
  @Prop({ required: true })
  eventName: string;

  @Field(() => HookEventStatus)
  @Prop({ type: String, enum: HookEventStatus, default: HookEventStatus.New })
  status: HookEventStatus;

  @Field(() => String, { nullable: true })
  @Prop({ type: MongooseSchema.Types.Map, of: MongooseSchema.Types.Mixed })
  data?: any;

  @Field({ nullable: true })
  @Prop()
  error?: string;
}
export const HookEventSchema = SchemaFactory.createForClass(HookEvent);

// ==================== Job ====================

export type JobDocument = HydratedDocument<Job>;

@ObjectType()
@Schema({ collection: 'jobs', timestamps: true })
export class Job extends BaseEntity {
  @Field()
  @Prop({ required: true })
  key: string;

  @Field(() => JobStatus)
  @Prop({ enum: JobStatus, default: JobStatus.OPEN })
  status: JobStatus;

  @Field({ nullable: true })
  @Prop()
  jobErrorMessage?: string;

  @Field(() => JobTypes)
  @Prop({ enum: JobTypes, default: JobTypes.ORDER_BOOKED })
  jobType: JobTypes;

  @Field()
  @Prop({ required: true })
  scheduledDate: Date;

  @Field(() => String, { nullable: true })
  @Prop({ type: Object })
  data?: any;
}
export const JobSchema = SchemaFactory.createForClass(Job);

// ==================== Label ====================

export type LabelDocument = HydratedDocument<Label>;

@ObjectType()
@Schema({ collection: 'labels', timestamps: true })
export class Label extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: MongooseSchema.Types.Mixed })
  jsonLabelConfig?: any;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  labelImgs?: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Field({ defaultValue: 'Active' })
  @Prop({ default: 'Active' })
  status: string;
}
export const LabelSchema = SchemaFactory.createForClass(Label);

// ==================== Location ====================

@ObjectType()
export class Country extends BaseEntity {
  @Field()
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop({ unique: true })
  code: string;

  @Field()
  @Prop()
  dialCode: string;

  @Field()
  @Prop()
  currency: string;
}
export type CountryDocument = HydratedDocument<Country>;
export const CountrySchema = SchemaFactory.createForClass(Country);

@ObjectType()
export class Timezone {
  @Field()
  name: string;

  @Field()
  label: string;

  @Field()
  offset: string;
}

@ObjectType()
export class Language {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  nativeName?: string;
}

// ==================== Manufacturer ====================

export type ManufacturerDocument = HydratedDocument<Manufacturer>;

@ObjectType()
@Schema({ collection: 'manufacturers', timestamps: true })
export class Manufacturer extends BaseEntity {
  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;
}

@ObjectType()
export class PaginatedManufacturer {
  @Field(() => [Manufacturer])
  items: Manufacturer[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);

// ==================== Membership Tier ====================

export type MembershipTierDocument = HydratedDocument<MembershipTier>;

@ObjectType()
@Schema({ collection: 'membership_tiers', timestamps: true })
export class MembershipTier extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Float)
  @Prop({ required: true })
  discountPercentage: number;

  @Field(() => Float)
  @Prop({ required: true })
  minSpending: number;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const MembershipTierSchema = SchemaFactory.createForClass(MembershipTier);

// ==================== Message Template ====================

export type MessageTemplateDocument = HydratedDocument<MessageTemplate>;

@ObjectType()
@Schema({ collection: 'message_templates', timestamps: true })
export class MessageTemplate extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  title?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => MessageTemplateStatus, { defaultValue: MessageTemplateStatus.Draft })
  @Prop({ type: String, enum: MessageTemplateStatus, default: MessageTemplateStatus.Draft })
  status: MessageTemplateStatus;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [Types.ObjectId], ref: 'Tenant', default: [] })
  tenantIds: string[];
}

@ObjectType()
export class PaginatedMessageTemplate {
  @Field(() => [MessageTemplate])
  items: MessageTemplate[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const MessageTemplateSchema = SchemaFactory.createForClass(MessageTemplate);

// ==================== Notification Message Template ====================

export type NotificationMessageTemplateDocument = HydratedDocument<NotificationMessageTemplate>;

@ObjectType()
@Schema({ collection: 'notification_message_templates', timestamps: true })
export class NotificationMessageTemplate extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field()
  @Prop({ required: true })
  type: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const NotificationMessageTemplateSchema = SchemaFactory.createForClass(NotificationMessageTemplate);

// ==================== News ====================

export type NewsDocument = HydratedDocument<News>;

@ObjectType()
@Schema({ collection: 'news', timestamps: true })
export class News extends BaseEntity {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  slug: string;

  @Field({ nullable: true })
  @Prop()
  summary?: string;

  @Field({ nullable: true })
  @Prop()
  content?: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field({ nullable: true })
  @Prop()
  thumbnail?: string;

  @Field({ nullable: true })
  @Prop()
  publishedAt?: Date;

  @Field(() => NewsStatus, { defaultValue: NewsStatus.DRAFT })
  @Prop({ enum: NewsStatus, default: NewsStatus.DRAFT })
  status: NewsStatus;

  @Field(() => NewsShowIn, { defaultValue: NewsShowIn.BOTH_APP })
  @Prop({ enum: NewsShowIn, default: NewsShowIn.BOTH_APP })
  showIn: NewsShowIn;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isPin: boolean;

  @Field({ nullable: true })
  @Prop()
  pinTime?: Date;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [Types.ObjectId], default: [] })
  categoryIds: Types.ObjectId[];

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId })
  authorId?: Types.ObjectId;
}
export const NewsSchema = SchemaFactory.createForClass(News);

// ==================== Order ====================

@ObjectType()
@Schema()
export class OrderItem {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  serviceId: string;

  @Field(() => Product, { nullable: true })
  service?: Product;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  staffId?: string;

  @Field(() => User, { nullable: true })
  staff?: User;

  @Field()
  @Prop()
  price: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  cost: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  tax: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  fee: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  discount: number;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isIncludedTax: boolean;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  customTaxIds?: string[];

  @Field({ defaultValue: 1 })
  @Prop({ default: 1 })
  quantity: number;

  @Field(() => OrderItemStatus)
  @Prop({ enum: OrderItemStatus, default: OrderItemStatus.Booked })
  status: OrderItemStatus;
}
const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

export type OrderDocument = HydratedDocument<Order>;

@ObjectType()
@Schema({ collection: 'orders', timestamps: true })
export class Order extends BaseEntity {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: string;

  @Field({ nullable: true })
  @Prop()
  shortId?: string;

  @Field(() => Branch, { nullable: true })
  branch?: Branch;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  customerId?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Voucher' })
  voucherId?: string;

  @Field(() => User, { nullable: true })
  customer?: User;

  @Field(() => [OrderItem])
  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Field()
  @Prop({ required: true })
  totalPrice: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  taxTotal: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  discountAmount: number;

  @Field(() => OrderStatus)
  @Prop({ enum: OrderStatus, default: OrderStatus.Booked })
  status: OrderStatus;

  @Field(() => PaymentStatus_Order)
  @Prop({ enum: PaymentStatus_Order, default: PaymentStatus_Order.Unpaid })
  paymentStatus: PaymentStatus_Order;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field({ nullable: true })
  @Prop()
  paymentDate?: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

// ==================== Order Transaction ====================

export type OrderTransactionDocument = HydratedDocument<OrderTransaction>;

@ObjectType()
@Schema({ collection: 'order_transactions', timestamps: true })
export class OrderTransaction extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  orderId?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'GiftCard' })
  giftCardId?: string;

  @Field({ nullable: true })
  @Prop()
  orderNumber?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  customerId?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  staffId?: string;

  @Field(() => ID, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch' })
  branchId?: string;

  @Field(() => PaymentType)
  @Prop({ enum: PaymentType, default: PaymentType.Booking })
  type: PaymentType;

  @Field(() => PaymentMethod)
  @Prop({ enum: PaymentMethod, default: PaymentMethod.Cash })
  paymentMethod: PaymentMethod;

  @Field(() => PaymentStatus)
  @Prop({ enum: PaymentStatus, default: PaymentStatus.Unpaid })
  paymentStatus: PaymentStatus;

  @Field({ nullable: true })
  @Prop()
  amount?: number;

  @Field({ nullable: true })
  @Prop()
  orderPrice?: number;

  @Field({ nullable: true })
  @Prop()
  subTotal?: number;

  @Field({ nullable: true })
  @Prop()
  tipAmount?: number;

  @Field({ nullable: true })
  @Prop()
  commissionAmount?: number;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  taxTotal?: number;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  serviceFeeTotal?: number;

  @Field({ nullable: true })
  @Prop()
  paymentDate?: Date;

  @Field({ nullable: true })
  @Prop()
  refundAmount?: number;

  @Field({ nullable: true })
  @Prop()
  stripeFeeAmount?: number;

  @Field({ nullable: true })
  @Prop()
  netAmount?: number;
}
export const OrderTransactionSchema = SchemaFactory.createForClass(OrderTransaction);

// ==================== Payment ====================

export type PaymentDocument = HydratedDocument<Payment>;

@ObjectType()
@Schema({ collection: 'payments', timestamps: true })
export class Payment extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => PaymentMethodType)
  @Prop({ enum: PaymentMethodType, required: true })
  type: PaymentMethodType;

  @Field({ nullable: true })
  @Prop()
  publicKey?: string;

  @Field({ nullable: true })
  @Prop()
  secretKey?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);

// ==================== Payroll ====================

export type PayrollDocument = HydratedDocument<Payroll>;

@ObjectType()
@Schema({ collection: 'payrolls', timestamps: true })
export class Payroll extends BaseEntity {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  staffId: string;

  @Field(() => Float)
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  periodStart: Date;

  @Field()
  @Prop({ required: true })
  periodEnd: Date;

  @Field(() => PayrollStatus)
  @Prop({ enum: PayrollStatus, default: PayrollStatus.PENDING })
  status: PayrollStatus;
}
export const PayrollSchema = SchemaFactory.createForClass(Payroll);

// ==================== Payroll Transaction ====================

export type PayrollTransactionDocument = HydratedDocument<PayrollTransaction>;

@ObjectType()
@Schema({ collection: 'payroll_transactions', timestamps: true })
export class PayrollTransaction extends BaseEntity {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  staffId: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true, ref: 'Branch' })
  branchId: Types.ObjectId;

  @Field(() => [String])
  @Prop({ type: [Types.ObjectId], default: [] })
  staffIncomeIds: Types.ObjectId[];

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  paidById: Types.ObjectId;

  @Field(() => Float)
  @Prop({ default: 0 })
  amountPaidByCash: number;

  @Field(() => Float)
  @Prop({ default: 0 })
  amountPaidByCheque: number;
}
export const PayrollTransactionSchema = SchemaFactory.createForClass(PayrollTransaction);

// ==================== Permission ====================

@ObjectType()
export class PermissionModule {
  @Field()
  @Prop({ unique: true })
  name: string;

  @Field(() => [String])
  @Prop()
  permissions: string[];
}

export type PermissionDocument = HydratedDocument<Permission>;

@ObjectType()
@Schema({ collection: 'permissions', timestamps: true })
export class Permission extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => [PermissionModule])
  @Prop({ type: [Object] })
  modules: PermissionModule[];
}
export const PermissionSchema = SchemaFactory.createForClass(Permission);

// ==================== Product ====================

export type ProductDocument = HydratedDocument<Product>;

@ObjectType()
@Schema({ collection: 'products', timestamps: true })
export class Product extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  title: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true })
  price: number;

  @Field({ nullable: true })
  @Prop()
  sku?: string;

  @Field(() => ProductType)
  @Prop({ type: String, enum: ProductType, default: ProductType.Simple })
  productType: ProductType;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Category' })
  categoryIds?: string[];

  @Field(() => [String], { nullable: true })
  @Prop()
  images?: string[];

  @Field({ nullable: true })
  @Prop({ default: true })
  isActive?: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

// ==================== Reason Action ====================

export type ReasonActionDocument = HydratedDocument<ReasonAction>;

@ObjectType()
@Schema({ collection: 'reason_actions', timestamps: true })
export class ReasonAction extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => ReasonActionType)
  @Prop({ type: String, enum: ReasonActionType, required: true })
  type: ReasonActionType;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  locked: boolean;
}
export const ReasonActionSchema = SchemaFactory.createForClass(ReasonAction);

// ==================== Reason Refund ====================

export type ReasonRefundDocument = HydratedDocument<ReasonRefund>;

@ObjectType()
@Schema({ collection: 'reason_refunds', timestamps: true })
export class ReasonRefund extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  name: string;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  locked: boolean;
}
export const ReasonRefundSchema = SchemaFactory.createForClass(ReasonRefund);

// ==================== Rating Review ====================

export type RatingReviewDocument = HydratedDocument<RatingReview>;

@ObjectType()
@Schema({ collection: 'rating_reviews', timestamps: true })
export class RatingReview extends BaseEntity {
  @Field(() => Float)
  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Field({ nullable: true })
  @Prop()
  review?: string;

  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: string;

  @Field({ nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userTargetId?: string;

  @Field({ nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  bookingId?: string;

  @Field({ nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  reviewerId?: string;
}
export const RatingReviewSchema = SchemaFactory.createForClass(RatingReview);

// ==================== Service Category ====================

export type ServiceCategoryDocument = HydratedDocument<ServiceCategory>;

@ObjectType()
@Schema({ collection: 'service_categories', timestamps: true })
export class ServiceCategory extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop({ default: '#C3E1FC' })
  color?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;
}
export const ServiceCategorySchema = SchemaFactory.createForClass(ServiceCategory);

// ==================== Skill ====================

export type SkillDocument = HydratedDocument<Skill>;

@ObjectType()
@Schema({ collection: 'skills', timestamps: true })
export class Skill extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Status, { defaultValue: Status.Active })
  @Prop({ type: String, enum: Status, default: Status.Active })
  status: Status;
}

@ObjectType()
export class PaginatedSkill {
  @Field(() => [Skill])
  items: Skill[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const SkillSchema = SchemaFactory.createForClass(Skill);

// ==================== SmsConfig ====================

export type SmsConfigDocument = HydratedDocument<SmsConfig>;

@ObjectType()
@Schema({ collection: 'sms_configs', timestamps: true })
export class SmsConfig extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  countryCode: string;

  @Field(() => Float)
  @Prop({ required: true })
  feePerSMS: number;

  @Field(() => Int, { defaultValue: 0 })
  @Prop({ default: 0 })
  limitNumberSMSByMonth: number;

  @Field(() => Status, { defaultValue: Status.Active })
  @Prop({ type: String, enum: Status, default: Status.Active })
  status: Status;
}

@ObjectType()
export class PaginatedSmsConfig {
  @Field(() => [SmsConfig])
  items: SmsConfig[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const SmsConfigSchema = SchemaFactory.createForClass(SmsConfig);

// ==================== Staff ====================

export enum StaffIncomeStatusLegacy {
  UNCONFIRMED = 'UNCONFIRMED',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  APPROVED = 'APPROVED',
}

export type StaffIncomeDocument = HydratedDocument<StaffIncome>;

@ObjectType()
@Schema({ collection: 'staff_incomes', timestamps: true })
export class StaffIncome extends BaseEntity {
  @Field()
  @Prop({ required: true })
  date: Date;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  staffId: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  branchId: Types.ObjectId;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  salary: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  workingHour: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  customerTip: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  tip: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  netTip: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  receptionFee: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  commission: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  sale: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  cost: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  serviceCount: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  paid: number;

  @Field(() => PayrollPaymentMethod, { nullable: true })
  @Prop({ type: String, enum: PayrollPaymentMethod })
  paymentMethod?: PayrollPaymentMethod;

  @Field(() => StaffIncomeStatus, { defaultValue: StaffIncomeStatus.UNCONFIRMED })
  @Prop({ default: StaffIncomeStatus.UNCONFIRMED })
  status: StaffIncomeStatus;
}
export const StaffIncomeSchema = SchemaFactory.createForClass(StaffIncome);

// ==================== Staff Salary ====================

export type StaffSalaryDocument = HydratedDocument<StaffSalary>;

@ObjectType()
@Schema({ collection: 'staff_salary', timestamps: true })
export class StaffSalary extends BaseEntity {
  @Field()
  @Prop({ required: true })
  date: Date;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  staffId: Types.ObjectId;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, required: true })
  branchId: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  workingHour: number;

  @Field()
  @Prop({ required: true })
  hourlyWage: number;
}
export const StaffSalarySchema = SchemaFactory.createForClass(StaffSalary);

// ==================== Staff Shift ====================

export type StaffShiftDocument = HydratedDocument<StaffShift>;

@ObjectType()
export class ShiftTime {
  @Field()
  @Prop({ required: true, min: 0, max: 1439 })
  startAtMinutes: number;

  @Field()
  @Prop({ required: true, min: 0, max: 1439 })
  endAtMinutes: number;
}
const ShiftTimeSchema = SchemaFactory.createForClass(ShiftTime);

@ObjectType()
export class Shift {
  @Field(() => OperationHoursDay)
  @Prop({ enum: OperationHoursDay, required: true })
  day: OperationHoursDay;

  @Field(() => [ShiftTime])
  @Prop({ type: [ShiftTimeSchema], default: [] })
  shiftTimes: ShiftTime[];
}
const ShiftSchema = SchemaFactory.createForClass(Shift);

@ObjectType()
@Schema({ collection: 'staff_shifts', timestamps: true })
export class StaffShift extends BaseEntity {
  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field({ nullable: true })
  @Prop()
  endDate?: Date;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  staffId: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: string;

  @Field(() => [Shift])
  @Prop({ type: [ShiftSchema], default: [] })
  shifts: Shift[];

  @Prop({ required: true })
  startDateFormatted: string;
}
export const StaffShiftSchema = SchemaFactory.createForClass(StaffShift);

// ==================== Exception Day ====================

export type ExceptionDayDocument = HydratedDocument<ExceptionDay>;

@ObjectType()
@Schema({ collection: 'exception_days', timestamps: true })
export class ExceptionDay extends BaseEntity {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  staffId: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field(() => [ShiftTime])
  @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })
  shiftTimes: ShiftTime[];

  @Prop({ required: true })
  dateFormatted: string;
}
export const ExceptionDaySchema = SchemaFactory.createForClass(ExceptionDay);

// ==================== Time Off ====================

export type TimeOffDocument = HydratedDocument<TimeOff>;

@ObjectType()
@Schema({ collection: 'time_offs', timestamps: true })
export class TimeOff extends BaseEntity {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  staffId: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: true })
  branchId: string;

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TimeOffType', required: true })
  timeOffTypeId: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true, min: 0, max: 1439 })
  startAtMinutes: number;

  @Field()
  @Prop({ required: true, min: 0, max: 1439 })
  endAtMinutes: number;

  @Field(() => TimeOffStatus)
  @Prop({ enum: TimeOffStatus, default: TimeOffStatus.Pending })
  status: TimeOffStatus;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isOffAllDay: boolean;

  @Prop({ required: true })
  dateFormatted: string;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  requestFromStaff: boolean;
}
export const TimeOffSchema = SchemaFactory.createForClass(TimeOff);

// ==================== Staff Priority ====================

export type StaffPriorityDocument = HydratedDocument<StaffPriority>;

@ObjectType()
export class PriorityItem {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  staffId: string;

  @Field(() => Int)
  @Prop({ required: true })
  position: number;
}

@ObjectType()
@Schema({ collection: 'staff_priority', timestamps: true })
export class StaffPriority extends BaseEntity {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  branchId: string;

  @Field(() => [PriorityItem])
  @Prop({ type: [{ staffId: MongooseSchema.Types.ObjectId, position: Number }], default: [] })
  priority: PriorityItem[];

  @Field(() => PriorityOption)
  @Prop({ type: String, enum: PriorityOption, required: true })
  option: PriorityOption;

  @Field()
  @Prop({ default: false })
  isApplied: boolean;
}

@ObjectType()
export class PaginatedStaffPriority {
  @Field(() => [StaffPriority])
  items: StaffPriority[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const StaffPrioritySchema = SchemaFactory.createForClass(StaffPriority);

// ==================== Staff Turn Queue ====================

@ObjectType()
export class Turn {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  staffId: string;

  @Field()
  @Prop({ required: true })
  position: number;

  @Field({ defaultValue: 0 })
  @Prop({ default: 0 })
  count?: number;
}

export type StaffTurnQueueDocument = HydratedDocument<StaffTurnQueue>;

@ObjectType()
@Schema({ collection: 'staff_turn_queues', timestamps: true })
export class StaffTurnQueue extends BaseEntity {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, unique: true })
  branchId: string;

  @Field(() => [Turn])
  @Prop({ type: [Turn], default: [] })
  turnBegin: Turn[];

  @Field(() => [Turn])
  @Prop({ type: [Turn], default: [] })
  turnEnd: Turn[];
}
export const StaffTurnQueueSchema = SchemaFactory.createForClass(StaffTurnQueue);

// ==================== Preferred Staff ====================

export type PreferredStaffDocument = HydratedDocument<PreferredStaff>;

@ObjectType()
@Schema({ collection: 'preferred_staff', timestamps: true })
export class PreferredStaff extends BaseEntity {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  orderId: string;

  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  customerId: string;

  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  staffId: string;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isPreferStaff: boolean;

  @Field({ nullable: true })
  @Prop()
  role?: string;
}
export const PreferredStaffSchema = SchemaFactory.createForClass(PreferredStaff);

// ==================== Staff Review Customer ====================

export type StaffReviewCustomerDocument = HydratedDocument<StaffReviewCustomer>;

@ObjectType()
@Schema({ collection: 'staff_review_customers', timestamps: true })
export class StaffReviewCustomer extends BaseEntity {
  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  reviewerId: string;

  @Field(() => String)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userTargetId: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  bookingId?: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchId?: string;

  @Field(() => Int)
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Field({ nullable: true })
  @Prop()
  comment?: string;
}

@ObjectType()
export class PaginatedStaffReviewCustomer {
  @Field(() => [StaffReviewCustomer])
  items: StaffReviewCustomer[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

@ObjectType()
export class CountStaffReviewCustomerResponse {
  @Field(() => Int)
  rating: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class StaffReviewCustomerStats {
  @Field(() => Int)
  totalReview: number;

  @Field(() => Float)
  averageRating: number;
}
export const StaffReviewCustomerSchema = SchemaFactory.createForClass(StaffReviewCustomer);

// ==================== Summaries ====================

export type BookingsBranchSummaryDocument = HydratedDocument<BookingsBranchSummary>;

@ObjectType()
@Schema({ collection: 'bookings_branch_summary', timestamps: true })
export class BookingsBranchSummary extends BaseEntity {
  @Field()
  @Prop({ required: true })
  branchId: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalCompletedBookings: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalBookingValue: number;
}
export const BookingsBranchSummarySchema = SchemaFactory.createForClass(BookingsBranchSummary);

export type BookingsSummaryDocument = HydratedDocument<BookingsSummary>;

@ObjectType()
@Schema({ collection: 'bookings_summary', timestamps: true })
export class BookingsSummary extends BaseEntity {
  @Field()
  @Prop({ required: true })
  branchId: string;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalCompletedBookings: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalServices: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalCancelation: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalBookingValue: number;

  @Field()
  @Prop({ required: true, default: 0 })
  percentCancelation: number;

  @Field()
  @Prop({ required: true, default: 0 })
  averageBookingValue: number;
}
export const BookingsSummarySchema = SchemaFactory.createForClass(BookingsSummary);

export type OrderTransactionSummaryDocument = HydratedDocument<OrderTransactionSummary>;

@ObjectType()
@Schema({ collection: 'order_transaction_summary', timestamps: true })
export class OrderTransactionSummary extends BaseEntity {
  @Field()
  @Prop({ type: MongooseSchema.Types.ObjectId })
  branchId: string;

  @Field()
  @Prop({ type: Date, required: true })
  paymentDate: Date;

  @Field(() => PaymentType)
  @Prop({ type: String, enum: PaymentType, default: PaymentType.Booking })
  type: PaymentType;

  @Field({ nullable: true })
  @Prop()
  paymentMethod?: string;

  @Field({ nullable: true })
  @Prop()
  paymentStatus?: string;

  @Field()
  @Prop({ default: 0 })
  amount: number;

  @Field({ nullable: true })
  @Prop()
  stripeFeeAmount?: number;

  @Field()
  @Prop({ required: true, unique: true })
  key: string;
}
export const OrderTransactionSummarySchema = SchemaFactory.createForClass(OrderTransactionSummary);

export type PaymentSummaryDocument = HydratedDocument<PaymentSummary>;

@ObjectType()
@Schema({ collection: 'payment_summary', timestamps: true })
export class PaymentSummary extends BaseEntity {
  @Field()
  @Prop({ required: true })
  branchId: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field({ nullable: true })
  @Prop()
  paymentMethod?: string;

  @Field()
  @Prop({ required: true, default: 0 })
  totalNumberTransaction: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalPaymentAmount: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalNumberRefund: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalRefundAmount: number;

  @Field()
  @Prop({ required: true, default: 0 })
  netPaymentAmount: number;
}
export const PaymentSummarySchema = SchemaFactory.createForClass(PaymentSummary);

export type PromotionalDiscountStatisticDocument = HydratedDocument<PromotionalDiscountStatistic>;

@ObjectType()
@Schema({ collection: 'promotional_discount_statistics', timestamps: true })
export class PromotionalDiscountStatistic extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Prop()
  tenantId?: string;

  @Field(() => String)
  @Prop({ required: true })
  branchId: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalAmount: number;
}
export const PromotionalDiscountStatisticSchema = SchemaFactory.createForClass(PromotionalDiscountStatistic);

export type SalesSummaryDocument = HydratedDocument<SalesSummary>;

@ObjectType()
@Schema({ collection: 'sales_summary', timestamps: true })
export class SalesSummary extends BaseEntity {
  @Field()
  @Prop({ required: true })
  branchId: string;

  @Field()
  @Prop({ required: true })
  serviceId: string;

  @Field()
  @Prop({ required: true })
  serviceName: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalBookings: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalGrossSales: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalDiscount: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalTax: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalFee: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalNetSales: number;
}
export const SalesSummarySchema = SchemaFactory.createForClass(SalesSummary);

export type TaxSummaryReportDocument = HydratedDocument<TaxSummaryReport>;

@ObjectType()
@Schema({ collection: 'tax_summary_report', timestamps: true })
export class TaxSummaryReport extends BaseEntity {
  @Field()
  @Prop({ required: true })
  branchId: string;

  @Field()
  @Prop({ required: true })
  date: Date;

  @Field()
  @Prop({ required: true })
  month: number;

  @Field()
  @Prop({ required: true })
  year: number;

  @Field()
  @Prop({ required: true })
  taxName: string;

  @Field()
  @Prop({ required: true })
  value: number;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isPercent: boolean;

  @Field()
  @Prop({ required: true, default: 0 })
  totalService: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalTaxes: number;

  @Field()
  @Prop({ required: true, default: 0 })
  totalNetSale: number;
}
export const TaxSummaryReportSchema = SchemaFactory.createForClass(TaxSummaryReport);

// ==================== Supplier ====================

export type SupplierDocument = HydratedDocument<Supplier>;

@ObjectType()
@Schema({ collection: 'suppliers', timestamps: true })
export class Supplier extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  contactName?: string;

  @Field({ nullable: true })
  @Prop()
  email?: string;

  @Field({ nullable: true })
  @Prop()
  phone?: string;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const SupplierSchema = SchemaFactory.createForClass(Supplier);

// ==================== System Variable Config ====================

export type SystemVariableConfigDocument = HydratedDocument<SystemVariableConfig>;

@ObjectType()
@Schema({ collection: 'variable_configs', timestamps: true })
export class SystemVariableConfig extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  type: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  value: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;
}
export const SystemVariableConfigSchema = SchemaFactory.createForClass(SystemVariableConfig);

// ==================== Tax ====================

export type TaxDocument = HydratedDocument<Tax>;

@ObjectType()
@Schema({ collection: 'taxes', timestamps: true })
export class Tax extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => Float)
  @Prop({ required: true })
  rate: number;

  @Field({ defaultValue: true })
  @Prop({ default: true })
  isActive: boolean;
}
export const TaxSchema = SchemaFactory.createForClass(Tax);

// ==================== Tax And Fee ====================

export type TaxAndFeeDocument = HydratedDocument<TaxAndFee>;

@ObjectType()
@Schema({ collection: 'tax_and_service_fees', timestamps: true })
export class TaxAndFee extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ default: false })
  isPercent: boolean;

  @Field(() => TaxAndFeeType)
  @Prop({ type: String, enum: TaxAndFeeType, default: TaxAndFeeType.TAX })
  type: TaxAndFeeType;
}
export const TaxAndFeeSchema = SchemaFactory.createForClass(TaxAndFee);

// ==================== Tax And Fee Group ====================

@ObjectType()
export class TaxFeeGroupTotal {
  @Field({ nullable: true })
  totalPercent?: number;

  @Field({ nullable: true })
  totalAmount?: number;
}

export type TaxAndFeeGroupDocument = HydratedDocument<TaxAndFeeGroup>;

@ObjectType()
@Schema({ collection: 'tax_and_fee_group', timestamps: true })
export class TaxAndFeeGroup extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => [String])
  @Prop({ type: [String], required: true })
  ids: string[];

  @Field(() => TaxAndFeeType)
  @Prop({ type: String, enum: TaxAndFeeType, default: TaxAndFeeType.TAX })
  type: TaxAndFeeType;

  @Field()
  @Prop({ default: false })
  isDefault: boolean;

  @Field({ nullable: true })
  @Prop()
  taxAndFeeText?: string;

  @Field(() => TaxFeeGroupTotal, { nullable: true })
  @Prop({ type: Object })
  taxFeeGroupTotal?: TaxFeeGroupTotal;
}
export const TaxAndFeeGroupSchema = SchemaFactory.createForClass(TaxAndFeeGroup);

// ==================== Tenant ====================

@ObjectType()
export class TenantAddress {
  @Field({ nullable: true })
  @Prop()
  country?: string;

  @Field({ nullable: true })
  @Prop()
  city?: string;

  @Field({ nullable: true })
  @Prop()
  state?: string;

  @Field({ nullable: true })
  @Prop()
  postal?: string;

  @Field({ nullable: true })
  @Prop()
  address1?: string;

  @Field({ nullable: true })
  @Prop()
  address2?: string;
}

export type TenantDocument = HydratedDocument<Tenant>;

@ObjectType()
@Schema({ collection: 'tenants' })
export class Tenant extends BaseEntity {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  domain: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => TenantStatus)
  @Prop({ type: String, enum: TenantStatus, default: TenantStatus.Inactive })
  status: TenantStatus;

  @Field()
  @Prop({ required: true })
  logoUrl1: string;

  @Field()
  @Prop({ required: true })
  logoUrl2: string;

  @Field()
  @Prop({ required: true })
  logoUrl3: string;

  @Field({ nullable: true })
  @Prop()
  slogan?: string;

  @Field(() => TenantAddress, { nullable: true })
  @Prop({ type: TenantAddress })
  address?: TenantAddress;

  @Field({ nullable: true })
  @Prop()
  timezone?: string;

  @Field({ nullable: true })
  @Prop()
  currency?: string;

  @Field({ nullable: true })
  @Prop()
  language?: string;

  @Field({ nullable: true })
  @Prop()
  smsByMonthRemaining?: number;

  @Field({ nullable: true })
  @Prop()
  limitNumberSMSByMonth?: number;
}
export const TenantSchema = SchemaFactory.createForClass(Tenant);

// ==================== Closed Period ====================

export type ClosedPeriodDocument = HydratedDocument<ClosedPeriod>;

@ObjectType()
@Schema({ collection: 'closed_periods', timestamps: true })
export class ClosedPeriod extends BaseEntity {
  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  endDate: Date;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field(() => [ID], { defaultValue: [] })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Branch', default: [] })
  branchIds: string[];

  @Field({ defaultValue: false, nullable: true })
  @Prop({ default: false })
  isAppliedToAllBranches?: boolean;
}
export const ClosedPeriodSchema = SchemaFactory.createForClass(ClosedPeriod);

// ==================== Tenant Setting ====================

export type TenantSettingDocument = HydratedDocument<TenantSetting>;

@ObjectType()
@Schema({ collection: 'tenant_settings', timestamps: true })
export class TenantSetting extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  tenantId: string;

  @Field({ description: 'Time in minutes to auto-cancel a booking' })
  @Prop({ required: true, default: 1440 })
  autoCancelTime: number;

  @Field({ description: 'Status of staff chat for the tenant' })
  @Prop({ required: true, default: false })
  staffChatStatusTenant: boolean;

  @Field({ defaultValue: false, description: 'Indicates if upfront payment is enabled' })
  @Prop({ required: true, default: false })
  isUpfront: boolean;

  @Field({ defaultValue: 0, description: 'Time in minutes to auto-cancel a booking with upfront payment' })
  @Prop({ required: true, default: 0 })
  autoCancelTimeUpfront: number;

  @Field({ defaultValue: 0, description: 'Total bill amount required for upfront payment' })
  @Prop({ required: true, default: 0 })
  totalBillUpfront: number;

  @Field({ defaultValue: 0, description: 'Total number of services required for upfront payment' })
  @Prop({ required: true, default: 0 })
  totalServicesUpfront: number;

  @Field({ defaultValue: 0, description: 'Percentage of the total bill required for upfront payment' })
  @Prop({ required: true, default: 0 })
  percentUpfront: number;

  @Field({ defaultValue: false, description: 'Indicates if custom upfront payment is applied to services' })
  @Prop({ required: true, default: false })
  isApplyServicesCustomUpfront: boolean;

  @Field({ defaultValue: false, description: 'Status of the membership' })
  @Prop({ required: true, default: false })
  isMembership: boolean;

  @Field({ defaultValue: 12, description: 'Membership cycle in months' })
  @Prop({ required: true, default: 12 })
  membershipCycle: number;

  @Field({ defaultValue: 30 })
  @Prop({ required: true, default: 30 })
  bookingLimitDays: number;

  @Field({ defaultValue: false, description: 'Indicates if auto sms reminder' })
  @Prop({ required: true, default: false })
  isAutoSmsReminder: boolean;

  @Field({ defaultValue: false, description: 'Indicates if auto email reminder' })
  @Prop({ required: true, default: false })
  isAutoEmailReminder: boolean;

  @Field({ defaultValue: 0, description: 'Hours required prior to appointment' })
  @Prop({ required: false, default: 0 })
  hoursRequiredPrior: number;
}
export const TenantSettingSchema = SchemaFactory.createForClass(TenantSetting);

// ==================== UI Theme ====================

export type UIThemeDocument = HydratedDocument<UITheme>;

@ObjectType()
@Schema({ collection: 'ui_themes', timestamps: true })
export class UITheme extends BaseEntity {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  jsonThemeConfigCus?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  jsonThemeConfigBO?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  jsonThemeConfigCusApp?: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Prop({ type: Object })
  jsonThemeConfigStaffApp?: any;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  cusThemeImgs: string[];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  boThemeImgs: string[];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  cusAppThemeImgs: string[];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  staffAppThemeImgs: string[];

  @Field(() => ThemeStatus, { defaultValue: ThemeStatus.Draft })
  @Prop({ type: String, enum: ThemeStatus, default: ThemeStatus.Draft })
  status: ThemeStatus;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isDeleted: boolean;
}

@ObjectType()
export class PaginatedUITheme {
  @Field(() => [UITheme])
  items: UITheme[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
export const UIThemeSchema = SchemaFactory.createForClass(UITheme);

// ==================== User ====================

@ObjectType()
export class UserPhone {
  @Field()
  @Prop()
  countryCode: string;

  @Field()
  @Prop()
  phoneNumber: string;

  @Field({ nullable: true })
  @Prop()
  dialCode?: string;
}

@ObjectType()
export class UserAddress {
  @Field({ nullable: true })
  @Prop()
  country?: string;

  @Field({ nullable: true })
  @Prop()
  city?: string;

  @Field({ nullable: true })
  @Prop()
  state?: string;

  @Field({ nullable: true })
  @Prop()
  postal?: string;

  @Field({ nullable: true })
  @Prop()
  address1?: string;

  @Field({ nullable: true })
  @Prop()
  address2?: string;
}

export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({ collection: 'users', timestamps: true })
export class User extends BaseEntity {
  @Field({ nullable: true })
  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Field({ nullable: true })
  @Prop()
  firstName?: string;

  @Field({ nullable: true })
  @Prop()
  lastName?: string;

  @Field(() => Roles)
  @Prop({ type: String, enum: Roles, default: Roles.Customer })
  role: Roles;

  @Field(() => Status)
  @Prop({ type: String, enum: Status, default: Status.Inactive })
  status: Status;

  @Field(() => UserPhone, { nullable: true })
  @Prop({ type: UserPhone })
  phone?: UserPhone;

  @Field({ nullable: true })
  @Prop()
  gender?: string;

  @Field({ nullable: true })
  @Prop()
  birthday?: Date;

  @Field(() => UserAddress, { nullable: true })
  @Prop({ type: UserAddress })
  address?: UserAddress;

  @Field({ nullable: true })
  @Prop()
  qrCodeLink?: string;

  @Field({ nullable: true })
  @Prop()
  source?: string;

  @Field({ nullable: true })
  @Prop()
  reason?: string;

  @Field({ nullable: true })
  @Prop()
  otherReason?: string;

  @Field({ nullable: true })
  @Prop()
  externalId?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  branchIds?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  skillIds?: string[];

  @Field({ nullable: true })
  @Prop()
  workAsStaff?: boolean;

  @Field({ nullable: true })
  @Prop()
  associatedUserId?: string;

  @Field({ nullable: true })
  @Prop()
  supervisorId?: string;

  @Field({ nullable: true })
  @Prop()
  avatarUrl?: string;

  @Field({ nullable: true })
  @Prop({ default: false })
  enableTwoFa?: boolean;

  @Field({ nullable: true })
  @Prop()
  secretTwoFa?: string;

  @Field({ nullable: true })
  @Prop()
  twoFaMethod?: string;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isDeleted: boolean;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  avg_rating?: number;

  @Field({ nullable: true })
  @Prop({ default: 0 })
  total_review?: number;
}
export const UserSchema = SchemaFactory.createForClass(User);

// ==================== Variable Config ====================

export type VariableConfigDocument = HydratedDocument<VariableConfig>;

@ObjectType()
@Schema({ collection: 'variable_configs', timestamps: true })
export class VariableConfig extends BaseEntity {
  @Field(() => GraphQLJSONObject)
  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  jsonVariableConfig: any;

  @Field()
  @Prop({ required: true })
  type: string;
}
export const VariableConfigSchema = SchemaFactory.createForClass(VariableConfig);

// ==================== Voucher ====================

export type VoucherDocument = HydratedDocument<Voucher>;

@ObjectType()
@Schema({ collection: 'vouchers', timestamps: true })
export class Voucher extends BaseEntity {
  @Field()
  @Prop({ required: true, unique: true })
  code: string;

  @Field(() => Float)
  @Prop({ required: true, default: 0 })
  value: number;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isPercent: boolean;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ default: 0 })
  minBookingAmount: number;

  @Field(() => Float, { nullable: true })
  @Prop()
  maxDiscountedAmount?: number;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ default: 0 })
  totalRedemption: number;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ default: 0 })
  redemptionPerCustomer: number;

  @Field(() => Float, { defaultValue: 0 })
  @Prop({ default: 0 })
  redeemedTimes: number;

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [Types.ObjectId], default: [] })
  customerIds: Types.ObjectId[];

  @Field()
  @Prop({ required: true })
  startDate: Date;

  @Field()
  @Prop({ required: true })
  expireDate: Date;

  @Field(() => VoucherStatus)
  @Prop({ enum: VoucherStatus, default: VoucherStatus.Inactive })
  status: VoucherStatus;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  isDeleted: boolean;
}
export const VoucherSchema = SchemaFactory.createForClass(Voucher);

// ==================== Web Config ====================

@ObjectType()
export class WebConfigCountry {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  phoneCode: string;

  @Field({ nullable: true })
  flag?: string;
}

export type WebConfigDocument = HydratedDocument<WebConfig>;

@ObjectType()
@Schema({ collection: 'web_configs', timestamps: true })
export class WebConfig extends BaseEntity {
  @Field(() => [WebConfigCountry], { defaultValue: [] })
  @Prop({ type: Array, default: [] })
  countries: WebConfigCountry[];

  @Field(() => [String], { defaultValue: [] })
  @Prop({ type: [String], default: [] })
  languages: string[];

  @Field({ nullable: true })
  @Prop()
  defaultCountry?: string;
}
export const WebConfigSchema = SchemaFactory.createForClass(WebConfig);
