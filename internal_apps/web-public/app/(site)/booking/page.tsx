'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineCheckCircle as CheckCircleOutlined } from 'react-icons/ai';
import { BookingData, Service, Provider, TimeSlot, PatientInfo } from '@/types/booking.types';
import { bookingService } from '@/services/bookingService';
import SelectService from './SelectService';
import SelectProvider from './SelectProvider';
import SelectDateTime from './SelectDateTime';
import PatientInfoForm from './PatientInfo';
import Confirmation from './Confirmation';
import BookingSummary from './BookingSummary';

const BookingPage = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({});
    const [services, setServices] = useState<Service[]>([]);
    const [doctors, setDoctors] = useState<Provider[]>([]);
    const [hospitals, setHospitals] = useState<Provider[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [bookingId, setBookingId] = useState<string>();
    const [success, setSuccess] = useState(false);

    const totalSteps = 5;

    useEffect(() => { loadServices(); }, []);
    useEffect(() => { if (bookingData.service) loadProviders(); }, [bookingData.service]);
    useEffect(() => { if (bookingData.provider && bookingData.date) loadTimeSlots(); }, [bookingData.provider, bookingData.date]);

    const loadServices = async () => {
        setLoading(true);
        try {
            const data = await bookingService.getServices();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadProviders = async () => {
        setLoading(true);
        try {
            const [doctorsData, hospitalsData] = await Promise.all([
                bookingService.getDoctors(bookingData.service?.id),
                bookingService.getHospitals(bookingData.service?.id)
            ]);
            setDoctors(doctorsData);
            setHospitals(hospitalsData);
        } catch (error) {
            console.error('Error loading providers:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadTimeSlots = async () => {
        if (!bookingData.provider || !bookingData.date) return;
        setLoading(true);
        try {
            const slots = await bookingService.getAvailableSlots(bookingData.provider.id, bookingData.date);
            setTimeSlots(slots);
        } catch (error) {
            console.error('Error loading time slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleServiceSelect = (service: Service) => { setBookingData({ ...bookingData, service }); setCurrentStep(2); };
    const handleProviderSelect = (provider: Provider) => { setBookingData({ ...bookingData, provider }); setCurrentStep(3); };
    const handleDateSelect = (date: Date) => { setBookingData({ ...bookingData, date, timeSlot: undefined }); };
    const handleTimeSlotSelect = (timeSlot: TimeSlot) => { setBookingData({ ...bookingData, timeSlot }); };
    const handlePatientInfoSubmit = (patientInfo: PatientInfo) => { setBookingData({ ...bookingData, patientInfo }); setCurrentStep(5); };

    const handleSubmitBooking = async () => {
        setSubmitting(true);
        try {
            const response = await bookingService.createBooking(bookingData);
            if (response.success) {
                setBookingId(response.bookingId);
                router.push(`/payment?bookingId=${response.bookingId}`);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditStep = (step: number) => { setCurrentStep(step); setSuccess(false); };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return !!bookingData.service;
            case 2: return !!bookingData.provider;
            case 3: return !!bookingData.date && !!bookingData.timeSlot;
            case 4: return !!bookingData.patientInfo;
            default: return true;
        }
    };

    const nextStep = () => { if (canProceed() && currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const stepLabels = ['Dịch vụ', 'Chuyên gia', 'Thời gian', 'Thông tin', 'Xác nhận'];

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Đặt lịch khám bệnh</h1>
                        <p className="text-slate-500 font-medium">Lựa chọn chuyên gia và thời gian khám phù hợp nhất với bạn chỉ trong vài phút.</p>
                    </div>
                    {!success && (
                        <div className="text-sm font-bold text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                            Bước <span className="text-indigo-600">{currentStep}</span> / {totalSteps}
                        </div>
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form Content */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Progress Stepper */}
                        {!success && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="flex items-center justify-between relative">
                                    {/* Line background */}
                                    <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 z-0"></div>
                                    
                                    {stepLabels.map((label, index) => {
                                        const stepNumber = index + 1;
                                        const isActive = stepNumber === currentStep;
                                        const isCompleted = stepNumber < currentStep;

                                        return (
                                            <div key={stepNumber} className="relative z-10 flex flex-col items-center flex-1 group">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 border-2 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100' :
                                                        isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-110' :
                                                            'bg-white border-slate-100 text-slate-400'
                                                        }`}>
                                                    {isCompleted ? <CheckCircleOutlined className="text-xl" /> : stepNumber}
                                                </div>
                                                <span className={`text-[10px] mt-3 font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-indigo-600' : isCompleted ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    {label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
                            {/* Step Content */}
                            <div className="flex-1 transition-all duration-500 ease-in-out">
                                {currentStep === 1 && (
                                    <SelectService services={services} selectedService={bookingData.service} onSelect={handleServiceSelect} loading={loading} />
                                ) || currentStep === 2 && (
                                    <SelectProvider doctors={doctors} hospitals={hospitals} selectedProvider={bookingData.provider} onSelect={handleProviderSelect} loading={loading} />
                                ) || currentStep === 3 && (
                                    <SelectDateTime selectedDate={bookingData.date} selectedTimeSlot={bookingData.timeSlot} timeSlots={timeSlots} onDateSelect={handleDateSelect} onTimeSlotSelect={handleTimeSlotSelect} loading={loading} />
                                ) || currentStep === 4 && (
                                    <PatientInfoForm patientInfo={bookingData.patientInfo} onSubmit={handlePatientInfoSubmit} />
                                ) || currentStep === 5 && (
                                    <Confirmation bookingData={bookingData} onEdit={handleEditStep} bookingId={bookingId} success={success} />
                                )}
                            </div>

                            {/* Navigation Buttons for step < 5 and not success */}
                            {!success && currentStep < 5 && (
                                <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                                    <button onClick={prevStep} disabled={currentStep === 1} className={`px-8 py-3 rounded-xl font-bold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                                        Quay lại
                                    </button>
                                    <button onClick={nextStep} disabled={!canProceed()} className={`px-10 py-3 rounded-xl font-bold transition-all ${canProceed() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'}`}>
                                        Tiếp tục
                                    </button>
                                </div>
                            )}

                            {/* Final Submit Button on Step 5 */}
                            {currentStep === 5 && !success && (
                                <div className="flex justify-center mt-12 pt-8 border-t border-slate-100">
                                    <button
                                        onClick={handleSubmitBooking}
                                        disabled={submitting}
                                        className="px-12 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all hover:shadow-xl hover:shadow-emerald-100 disabled:opacity-50"
                                    >
                                        {submitting ? 'Đang xử lý...' : 'Xác nhận & Hoàn tất'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <BookingSummary data={bookingData} step={currentStep} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
