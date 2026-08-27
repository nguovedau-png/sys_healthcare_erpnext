import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@app/common';

@Controller('partners')
export class PartnerController {
    constructor(@Inject('PARTNER_SERVICE') private readonly client: ClientProxy) { }

    // --- Doctors ---
    @Get('doctors')
    getDoctors(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_doctors' }, query);
    }

    @Get('doctors/:id')
    getDoctor(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_doctor' }, parseInt(id));
    }

    @Post('doctors')
    createDoctor(@Body() data: any) {
        return this.client.send({ cmd: 'create_doctor' }, data);
    }

    @Put('doctors/:id')
    updateDoctor(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_doctor' }, { id: parseInt(id), data });
    }

    @Delete('doctors/:id')
    deleteDoctor(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_doctor' }, parseInt(id));
    }

    // --- Clinics ---
    @Get('clinics')
    getClinics(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_clinics' }, query);
    }

    @Get('clinics/:id')
    getClinic(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_clinic' }, parseInt(id));
    }

    @Post('clinics')
    createClinic(@Body() data: any) {
        return this.client.send({ cmd: 'create_clinic' }, data);
    }

    @Put('clinics/:id')
    updateClinic(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_clinic' }, { id: parseInt(id), data });
    }

    @Delete('clinics/:id')
    deleteClinic(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_clinic' }, parseInt(id));
    }

    // --- Hospitals ---
    @Get('hospitals')
    getHospitals(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_hospitals' }, query);
    }

    @Get('hospitals/:id')
    getHospital(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_hospital' }, parseInt(id));
    }

    @Post('hospitals')
    createHospital(@Body() data: any) {
        return this.client.send({ cmd: 'create_hospital' }, data);
    }

    @Put('hospitals/:id')
    updateHospital(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_hospital' }, { id: parseInt(id), data });
    }

    @Delete('hospitals/:id')
    deleteHospital(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_hospital' }, parseInt(id));
    }

    // --- Pharmacies ---
    @Get('pharmacies')
    getPharmacies(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_pharmacies' }, query);
    }

    @Get('pharmacies/:id')
    getPharmacy(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_pharmacy' }, parseInt(id));
    }

    @Post('pharmacies')
    createPharmacy(@Body() data: any) {
        return this.client.send({ cmd: 'create_pharmacy' }, data);
    }

    @Put('pharmacies/:id')
    updatePharmacy(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_pharmacy' }, { id: parseInt(id), data });
    }

    @Delete('pharmacies/:id')
    deletePharmacy(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_pharmacy' }, parseInt(id));
    }

    // --- Pharmacists ---
    @Get('pharmacists')
    getPharmacists(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_pharmacists' }, query);
    }

    @Get('pharmacists/:id')
    getPharmacist(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_pharmacist' }, parseInt(id));
    }

    @Post('pharmacists')
    createPharmacist(@Body() data: any) {
        return this.client.send({ cmd: 'create_pharmacist' }, data);
    }

    @Put('pharmacists/:id')
    updatePharmacist(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_pharmacist' }, { id: parseInt(id), data });
    }

    @Delete('pharmacists/:id')
    deletePharmacist(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_pharmacist' }, parseInt(id));
    }

    // --- Patients ---
    @Get('patients')
    getPatients(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_patients' }, query);
    }

    @Get('patients/:id')
    getPatient(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_patient' }, parseInt(id));
    }

    @Post('patients')
    createPatient(@Body() data: any) {
        return this.client.send({ cmd: 'create_patient' }, data);
    }

    @Put('patients/:id')
    updatePatient(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_patient' }, { id: parseInt(id), data });
    }

    @Delete('patients/:id')
    deletePatient(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_patient' }, parseInt(id));
    }

    @Get('pending')
    getPendingPartners() {
        return this.client.send({ cmd: 'get_pending_partners' }, {});
    }

    // --- Search ---
    @Get('search/diseases')
    searchDiseases(@Query() query: any) {
        return this.client.send({ cmd: 'search_diseases' }, query);
    }

    @Get('search/medicines')
    searchMedicines(@Query() query: any) {
        return this.client.send({ cmd: 'search_medicines' }, query);
    }

    // --- Staff ---
    @Get('staff')
    getStaffList(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_staff_list' }, query);
    }

    @Get('staff/:id')
    getStaff(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_staff' }, parseInt(id));
    }

    @Post('staff')
    createStaff(@Body() data: any) {
        return this.client.send({ cmd: 'create_staff' }, data);
    }

    @Put('staff/:id')
    updateStaff(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_staff' }, { id: parseInt(id), data });
    }

    @Delete('staff/:id')
    deleteStaff(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_staff' }, parseInt(id));
    }

    // --- Departments ---
    @Get('departments')
    getDepartments(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_departments' }, query);
    }

    @Get('departments/:id')
    getDepartment(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_department' }, parseInt(id));
    }

    @Post('departments')
    createDepartment(@Body() data: any) {
        return this.client.send({ cmd: 'create_department' }, data);
    }

    @Put('departments/:id')
    updateDepartment(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_department' }, { id: parseInt(id), data });
    }

    @Delete('departments/:id')
    deleteDepartment(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_department' }, parseInt(id));
    }

    // --- ServiceItems ---
    @Get('service-items')
    getServiceItems(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_service_items' }, query);
    }

    @Get('service-items/:id')
    getServiceItem(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_service_item' }, parseInt(id));
    }

    @Post('service-items')
    createServiceItem(@Body() data: any) {
        return this.client.send({ cmd: 'create_service_item' }, data);
    }

    @Put('service-items/:id')
    updateServiceItem(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_service_item' }, { id: parseInt(id), data });
    }

    @Delete('service-items/:id')
    deleteServiceItem(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_service_item' }, parseInt(id));
    }

    // --- VN Administrative 2025 (Provinces & Wards) ---
    @Get('provinces')
    getProvinces() {
        return this.client.send({ cmd: 'get_provinces' }, {});
    }

    @Get('test-provinces')
    testProvinces() {
        return { status: 'ok', message: 'Test endpoint works' };
    }

    @Get('provinces/:code')
    getProvince(@Param('code') code: string) {
        return this.client.send({ cmd: 'get_province' }, code);
    }

    @Get('provinces/:code/wards')
    getWardsByProvince(@Param('code') code: string) {
        return this.client.send({ cmd: 'get_wards_by_province' }, code);
    }

    @Get('wards/:code')
    getWard(@Param('code') code: string) {
        return this.client.send({ cmd: 'get_ward' }, code);
    }
}
