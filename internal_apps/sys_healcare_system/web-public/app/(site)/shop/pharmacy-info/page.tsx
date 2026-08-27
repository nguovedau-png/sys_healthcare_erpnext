import React from 'react';

export default function PharmacyInfoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4F7FB] to-white py-14 font-sans">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 inline-block relative border-b-4 border-primary/20 pb-2">
                        Thông Tin <span className="text-primary">Hệ Thống</span>
                    </h1>
                    <p className="text-gray-500 mt-4 text-lg">Đổi mới sức khỏe, chia sẻ niềm tin</p>
                </div>

                <div className="space-y-10">
                    {/* About */}
                    <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Giới Thiệu Chung</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg mb-4">
                            Hệ thống nhà thuốc của chúng tôi là thương hiệu uy tín hàng đầu Việt Nam, với hơn 500 chi nhánh trải dài trên toàn quốc. 
                            Chúng tôi cam kết cung cấp các sản phẩm dược phẩm, thực phẩm chức năng và thiết bị y tế chính hãng, chất lượng cao với mức giá hợp lý nhất.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Với đội ngũ được đào tạo bài bản, các dược sĩ chuyên nghiệp, tận tâm của chúng tôi luôn sẵn sàng lắng nghe, tư vấn và hỗ trợ khách hàng mọi lúc, mọi nơi 24/7.
                        </p>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Chứng Nhận & Giấy Phép</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['Chứng Nhận GPP', 'ISO 9001:2015', 'Giấy Phép Bộ Y Tế', 'Chuẩn FDA'].map((cert, idx) => (
                                <div key={idx} className="group bg-gray-50/80 rounded-lg p-6 text-center border border-gray-100 hover:bg-white hover:border-primary hover:shadow-md transition-all">
                                    <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <i className="fi flaticon-certificate text-3xl text-primary drop-shadow-sm"></i>
                                    </div>
                                    <p className="font-bold text-gray-800 text-sm group-hover:text-primary transition-colors">{cert}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-[#1C2C5E] to-primary rounded-[2rem] p-10 shadow-xl border border-blue-900 overflow-hidden relative">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                        
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 relative z-10">Liên Hệ Chúng Tôi</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                                    <svg className="w-6 h-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-blue-200 mb-1 text-sm uppercase tracking-wider">Trụ Sở Chính</p>
                                    <p className="text-white text-lg font-medium leading-relaxed">123 Nguyễn Trãi, P.Bến Thành, Quận 1, TP.Hồ Chí Minh</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                                    <svg className="w-6 h-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-teal-200 mb-1 text-sm uppercase tracking-wider">Hotline Tư Vấn</p>
                                    <p className="text-white text-xl font-bold">1900 6868 <span className="text-sm font-normal text-white/70">(24/7)</span></p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                                    <svg className="w-6 h-6 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-purple-200 mb-1 text-sm uppercase tracking-wider">Hỗ Trợ Email</p>
                                    <p className="text-white text-lg font-medium">support@pharmacy.vn</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 border border-white/20">
                                    <svg className="w-6 h-6 text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-yellow-200 mb-1 text-sm uppercase tracking-wider">Giờ Làm Việc</p>
                                    <p className="text-white text-lg font-medium">08:00 - 22:00 <span className="text-sm text-white/70 font-normal">(Thứ 2 - Chủ Nhật)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-[2rem] p-4 shadow-lg border border-gray-100">
                        <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                            {/* Dummy Map Visual for mock */}
                            <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=10.7712,106.6917&zoom=15&size=800x400&maptype=roadmap&key=dummy')] bg-cover bg-center"></div>
                            <div className="relative z-10 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-white/50 flex flex-col items-center">
                                <i className="fi flaticon-location text-3xl text-primary mb-2"></i>
                                <span className="font-bold text-gray-800">Trụ sở Pharmacy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
