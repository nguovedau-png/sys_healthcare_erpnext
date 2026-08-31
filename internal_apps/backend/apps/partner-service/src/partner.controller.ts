import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PartnerService } from './partner.service';
import { PaginationDto } from '@app/common';

@Controller()
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) { }

    // --- Doctors ---
    @MessagePattern({ cmd: 'get_doctors' })
    getDoctors(@Payload() query: PaginationDto) {
        return this.partnerService.getDoctors(query);
    }

    @MessagePattern({ cmd: 'get_doctor' })
    getDoctor(@Payload() id: number) {
        return this.partnerService.getDoctor(id);
    }

    @MessagePattern({ cmd: 'create_doctor' })
    createDoctor(@Payload() data: any) {
        return this.partnerService.createDoctor(data);
    }

    @MessagePattern({ cmd: 'update_doctor' })
    updateDoctor(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateDoctor(id, data);
    }

    @MessagePattern({ cmd: 'delete_doctor' })
    deleteDoctor(@Payload() id: number) {
        return this.partnerService.deleteDoctor(id);
    }

    // --- Clinics ---
    @MessagePattern({ cmd: 'get_clinics' })
    getClinics(@Payload() query: PaginationDto) {
        return this.partnerService.getClinics(query);
    }

    @MessagePattern({ cmd: 'get_clinic' })
    getClinic(@Payload() id: number) {
        return this.partnerService.getClinic(id);
    }

    @MessagePattern({ cmd: 'create_clinic' })
    createClinic(@Payload() data: any) {
        return this.partnerService.createClinic(data);
    }

    @MessagePattern({ cmd: 'update_clinic' })
    updateClinic(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateClinic(id, data);
    }

    @MessagePattern({ cmd: 'delete_clinic' })
    deleteClinic(@Payload() id: number) {
        return this.partnerService.deleteClinic(id);
    }

    // --- Hospitals ---
    @MessagePattern({ cmd: 'get_hospitals' })
    getHospitals(@Payload() query: PaginationDto) {
        return this.partnerService.getHospitals(query);
    }

    @MessagePattern({ cmd: 'get_hospital' })
    getHospital(@Payload() id: number) {
        return this.partnerService.getHospital(id);
    }

    @MessagePattern({ cmd: 'create_hospital' })
    createHospital(@Payload() data: any) {
        return this.partnerService.createHospital(data);
    }

    @MessagePattern({ cmd: 'update_hospital' })
    updateHospital(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateHospital(id, data);
    }

    @MessagePattern({ cmd: 'delete_hospital' })
    deleteHospital(@Payload() id: number) {
        return this.partnerService.deleteHospital(id);
    }

    // --- Pharmacies ---
    @MessagePattern({ cmd: 'get_pharmacies' })
    getPharmacies(@Payload() query: PaginationDto) {
        return this.partnerService.getPharmacies(query);
    }

    @MessagePattern({ cmd: 'get_pharmacy' })
    getPharmacy(@Payload() id: number) {
        return this.partnerService.getPharmacy(id);
    }

    @MessagePattern({ cmd: 'create_pharmacy' })
    createPharmacy(@Payload() data: any) {
        return this.partnerService.createPharmacy(data);
    }

    @MessagePattern({ cmd: 'update_pharmacy' })
    updatePharmacy(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePharmacy(id, data);
    }

    @MessagePattern({ cmd: 'delete_pharmacy' })
    deletePharmacy(@Payload() id: number) {
        return this.partnerService.deletePharmacy(id);
    }

    // --- Pharmacists ---
    @MessagePattern({ cmd: 'get_pharmacists' })
    getPharmacists(@Payload() query: PaginationDto) {
        return this.partnerService.getPharmacists(query);
    }

    @MessagePattern({ cmd: 'get_pharmacist' })
    getPharmacist(@Payload() id: number) {
        return this.partnerService.getPharmacist(id);
    }

    @MessagePattern({ cmd: 'create_pharmacist' })
    createPharmacist(@Payload() data: any) {
        return this.partnerService.createPharmacist(data);
    }

    @MessagePattern({ cmd: 'update_pharmacist' })
    updatePharmacist(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePharmacist(id, data);
    }

    @MessagePattern({ cmd: 'delete_pharmacist' })
    deletePharmacist(@Payload() id: number) {
        return this.partnerService.deletePharmacist(id);
    }

    // --- Patients ---
    @MessagePattern({ cmd: 'get_patients' })
    getPatients(@Payload() query: PaginationDto) {
        return this.partnerService.getPatients(query);
    }

    @MessagePattern({ cmd: 'get_patient' })
    getPatient(@Payload() id: number) {
        return this.partnerService.getPatient(id);
    }

    @MessagePattern({ cmd: 'create_patient' })
    createPatient(@Payload() data: any) {
        return this.partnerService.createPatient(data);
    }

    @MessagePattern({ cmd: 'update_patient' })
    updatePatient(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updatePatient(id, data);
    }

    @MessagePattern({ cmd: 'delete_patient' })
    async deletePatient(@Payload() id: number) {
        return this.partnerService.deletePatient(id);
    }

    @MessagePattern({ cmd: 'get_pending_partners' })
    async getPendingPartners() {
        return this.partnerService.getPendingPartners();
    }

    // --- Search ---
    @MessagePattern({ cmd: 'search_diseases' })
    async searchDiseases(@Payload() query: any) {
        return this.partnerService.searchDiseases(query);
    }

    @MessagePattern({ cmd: 'search_medicines' })
    async searchMedicines(@Payload() query: any) {
        return this.partnerService.searchMedicines(query);
    }

    // --- Staff ---
    @MessagePattern({ cmd: 'get_staff_list' })
    getStaffList(@Payload() query: PaginationDto) {
        return this.partnerService.getStaffList(query);
    }

    @MessagePattern({ cmd: 'get_staff' })
    getStaff(@Payload() id: number) {
        return this.partnerService.getStaff(id);
    }

    @MessagePattern({ cmd: 'create_staff' })
    createStaff(@Payload() data: any) {
        return this.partnerService.createStaff(data);
    }

    @MessagePattern({ cmd: 'update_staff' })
    updateStaff(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateStaff(id, data);
    }

    @MessagePattern({ cmd: 'delete_staff' })
    deleteStaff(@Payload() id: number) {
        return this.partnerService.deleteStaff(id);
    }

    // --- Departments ---
    @MessagePattern({ cmd: 'get_departments' })
    getDepartments(@Payload() query: PaginationDto) {
        return this.partnerService.getDepartments(query);
    }

    @MessagePattern({ cmd: 'get_department' })
    getDepartment(@Payload() id: number) {
        return this.partnerService.getDepartment(id);
    }

    @MessagePattern({ cmd: 'create_department' })
    createDepartment(@Payload() data: any) {
        return this.partnerService.createDepartment(data);
    }

    @MessagePattern({ cmd: 'update_department' })
    updateDepartment(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateDepartment(id, data);
    }

    @MessagePattern({ cmd: 'delete_department' })
    deleteDepartment(@Payload() id: number) {
        return this.partnerService.deleteDepartment(id);
    }

    // --- ServiceItems ---
    @MessagePattern({ cmd: 'get_service_items' })
    getServiceItems(@Payload() query: PaginationDto) {
        return this.partnerService.getServiceItems(query);
    }

    @MessagePattern({ cmd: 'get_service_item' })
    getServiceItem(@Payload() id: number) {
        return this.partnerService.getServiceItem(id);
    }

    @MessagePattern({ cmd: 'create_service_item' })
    createServiceItem(@Payload() data: any) {
        return this.partnerService.createServiceItem(data);
    }

    @MessagePattern({ cmd: 'update_service_item' })
    updateServiceItem(@Payload() { id, data }: { id: number; data: any }) {
        return this.partnerService.updateServiceItem(id, data);
    }

    @MessagePattern({ cmd: 'delete_service_item' })
    deleteServiceItem(@Payload() id: number) {
        return this.partnerService.deleteServiceItem(id);
    }

    // --- Provinces & Wards (VN Administrative 2025) ---
    @MessagePattern({ cmd: 'get_provinces' })
    getProvinces() {
        return this.partnerService.getProvinces();
    }

    @MessagePattern({ cmd: 'get_province' })
    getProvince(@Payload() code: string) {
        return this.partnerService.getProvince(code);
    }

    @MessagePattern({ cmd: 'get_wards_by_province' })
    getWardsByProvince(@Payload() provinceCode: string) {
        return this.partnerService.getWardsByProvince(provinceCode);
    }

    @MessagePattern({ cmd: 'get_ward' })
    getWard(@Payload() code: string) {
        return this.partnerService.getWard(code);
    }
}
