import { PrismaClient } from '../../../node_modules/.prisma/client-partner-service';

const prisma = new PrismaClient();

const vnAdministrativeData = {
  provinces: [
    { code: '01', name: 'Thành phố Hà Nội', nameEn: 'Hanoi City' },
    { code: '02', name: 'Tỉnh Hà Giang', nameEn: 'Hà Giang Province' },
    { code: '04', name: 'Tỉnh Cao Bằng', nameEn: 'Cao Bằng Province' },
    { code: '06', name: 'Tỉnh Bắc Kạn', nameEn: 'Bắc Kạn Province' },
    { code: '08', name: 'Tỉnh Tuyên Quang', nameEn: 'Tuyên Quang Province' },
    { code: '10', name: 'Tỉnh Lào Cai', nameEn: 'Lào Cai Province' },
    { code: '12', name: 'Tỉnh Lạng Sơn', nameEn: 'Lạng Sơn Province' },
    { code: '14', name: 'Tỉnh Quảng Ninh', nameEn: 'Quảng Ninh Province' },
    { code: '15', name: 'Tỉnh Hòa Bình', nameEn: 'Hòa Bình Province' },
    { code: '17', name: 'Tỉnh Hà Nam', nameEn: 'Hà Nam Province' },
    { code: '19', name: 'Tỉnh Nam Định', nameEn: 'Nam Định Province' },
    { code: '20', name: 'Tỉnh Ninh Bình', nameEn: 'Ninh Bình Province' },
    { code: '22', name: 'Tỉnh Thanh Hóa', nameEn: 'Thanh Hóa Province' },
    { code: '24', name: 'Tỉnh Nghệ An', nameEn: 'Nghệ An Province' },
    { code: '26', name: 'Tỉnh Hà Tĩnh', nameEn: 'Hà Tĩnh Province' },
    { code: '27', name: 'Tỉnh Quảng Bình', nameEn: 'Quảng Bình Province' },
    { code: '29', name: 'Tỉnh Quảng Trị', nameEn: 'Quảng Trị Province' },
    { code: '31', name: 'Tỉnh Thừa Thiên Huế', nameEn: 'Thừa Thiên Huế Province' },
    { code: '33', name: 'Thành phố Đà Nẵng', nameEn: 'Da Nang City' },
    { code: '35', name: 'Tỉnh Quảng Nam', nameEn: 'Quảng Nam Province' },
    { code: '37', name: 'Tỉnh Quảng Ngãi', nameEn: 'Quảng Ngãi Province' },
    { code: '39', name: 'Tỉnh Bình Định', nameEn: 'Bình Định Province' },
    { code: '41', name: 'Tỉnh Phú Yên', nameEn: 'Phú Yên Province' },
    { code: '43', name: 'Tỉnh Khánh Hòa', nameEn: 'Khánh Hòa Province' },
    { code: '45', name: 'Tỉnh Ninh Thuận', nameEn: 'Ninh Thuận Province' },
    { code: '47', name: 'Tỉnh Bình Thuận', nameEn: 'Bình Thuận Province' },
    { code: '49', name: 'Tỉnh Kon Tum', nameEn: 'Kon Tum Province' },
    { code: '51', name: 'Tỉnh Gia Lai', nameEn: 'Gia Lai Province' },
    { code: '53', name: 'Tỉnh Đắk Lắk', nameEn: 'Đắk Lắk Province' },
    { code: '54', name: 'Tỉnh Đắk Nông', nameEn: 'Đắk Nông Province' },
    { code: '56', name: 'Tỉnh Lâm Đồng', nameEn: 'Lâm Đồng Province' },
    { code: '58', name: 'Tỉnh Bình Phước', nameEn: 'Bình Phước Province' },
    { code: '60', name: 'Tỉnh Tây Ninh', nameEn: 'Tây Ninh Province' },
    { code: '62', name: 'Tỉnh Bình Dương', nameEn: 'Bình Dương Province' },
    { code: '64', name: 'Tỉnh Đồng Nai', nameEn: 'Đồng Nai Province' },
    { code: '66', name: 'Tỉnh Bà Rịa - Vũng Tàu', nameEn: 'Bà Rịa - Vũng Tàu Province' },
    { code: '67', name: 'Thành phố Hồ Chí Minh', nameEn: 'Ho Chi Minh City' },
    { code: '68', name: 'Tỉnh Cần Thơ', nameEn: 'Cần Thơ Province' },
    { code: '70', name: 'Tỉnh Hậu Giang', nameEn: 'Hậu Giang Province' },
    { code: '72', name: 'Tỉnh Sóc Trăng', nameEn: 'Sóc Trăng Province' },
    { code: '74', name: 'Tỉnh Bạc Liêu', nameEn: 'Bạc Liêu Province' },
    { code: '76', name: 'Tỉnh Cà Mau', nameEn: 'Cà Mau Province' },
  ],
  wards: [
    { code: '00001', name: 'Phường Phúc Xá', provinceCode: '01' },
    { code: '00004', name: 'Phường Trúc Bạch', provinceCode: '01' },
    { code: '00008', name: 'Phường Liễu Giai', provinceCode: '01' },
    { code: '00013', name: 'Phường Quán Thánh', provinceCode: '01' },
    { code: '00028', name: 'Phường Kim Mã', provinceCode: '01' },
    { code: '00037', name: 'Phường Phúc Tân', provinceCode: '01' },
    { code: '00040', name: 'Phường Đồng Xuân', provinceCode: '01' },
    { code: '00178', name: 'Phường Cát Linh', provinceCode: '01' },
    { code: '00241', name: 'Phường Nguyễn Du', provinceCode: '01' },
    { code: '00301', name: 'Phường Thanh Trì', provinceCode: '01' },
    { code: '00640', name: 'Thị trấn Văn Điển', provinceCode: '01' },
    { code: '00688', name: 'Phường Quang Trung', provinceCode: '02' },
    { code: '00700', name: 'Xã Ngọc Đường', provinceCode: '02' },
    { code: '00946', name: 'Xã Phương Độ', provinceCode: '02' },
    { code: '02489', name: 'Phường Duy Tân', provinceCode: '04' },
    { code: '02491', name: 'Xã Bảo Toàn', provinceCode: '04' },
    { code: '04806', name: 'Phường Đức Xuân', provinceCode: '06' },
    { code: '04816', name: 'Xã Yên Thịnh', provinceCode: '06' },
    { code: '07204', name: 'Phường Tân Quang', provinceCode: '08' },
    { code: '07210', name: 'Xã Đại Yên', provinceCode: '08' },
    { code: '10668', name: 'Phường Hòa Hiệp', provinceCode: '10' },
    { code: '10672', name: 'Xã Yên Mỹ', provinceCode: '10' },
    { code: '14185', name: 'Phường Lê Hồng Phong', provinceCode: '12' },
    { code: '14191', name: 'Xã Yên Sơn', provinceCode: '12' },
    { code: '17021', name: 'Phường Quang Trung', provinceCode: '14' },
    { code: '17074', name: 'Phường Hạ Long', provinceCode: '14' },
    { code: '20557', name: 'Phường Tân Thịnh', provinceCode: '15' },
    { code: '20561', name: 'Xã Thống Nhất', provinceCode: '15' },
    { code: '23776', name: 'Phường Bà Triệu', provinceCode: '17' },
    { code: '23779', name: 'Phường Lê Đình', provinceCode: '17' },
    { code: '26956', name: 'Phường Năng Tĩnh', provinceCode: '19' },
    { code: '26958', name: 'Xã Yên Trang', provinceCode: '19' },
    { code: '29545', name: 'Phường Lam Sơn', provinceCode: '20' },
    { code: '29567', name: 'Xã Yên Mỹ', provinceCode: '20' },
    { code: '33145', name: 'Phường Đông Vệ', provinceCode: '22' },
    { code: '33157', name: 'Xã Đông Hưng', provinceCode: '22' },
    { code: '38205', name: 'Phường Cửa Nam', provinceCode: '24' },
    { code: '38233', name: 'Xã Hưng Đông', provinceCode: '24' },
    { code: '42699', name: 'Phường Bắc Nghĩa', provinceCode: '26' },
    { code: '42704', name: 'Xã Đức Ninh', provinceCode: '26' },
    { code: '47915', name: 'Phường 1', provinceCode: '27' },
    { code: '47918', name: 'Xã Quảng Phương', provinceCode: '27' },
    { code: '52201', name: 'Phường Thuận Phước', provinceCode: '29' },
    { code: '52206', name: 'Xã Thuận Đông', provinceCode: '29' },
    { code: '56064', name: 'Phường Phú Nhuận', provinceCode: '31' },
    { code: '56071', name: 'Xã Phú Dự', provinceCode: '31' },
    { code: '64411', name: 'Phường Thạc Gián', provinceCode: '33' },
    { code: '64425', name: 'Xã Hòa Liên', provinceCode: '33' },
    { code: '72142', name: 'Phường Cẩm Phô', provinceCode: '35' },
    { code: '72149', name: 'Xã Cẩm Chàm', provinceCode: '35' },
    { code: '75865', name: 'Phường Lê Hồng Phong', provinceCode: '37' },
    { code: '75875', name: 'Xã Tịnh An', provinceCode: '37' },
    { code: '77887', name: 'Phường Bùi Thị Xuân', provinceCode: '39' },
    { code: '77901', name: 'Xã Mỹ Lợi', provinceCode: '39' },
    { code: '81606', name: 'Phường 1', provinceCode: '41' },
    { code: '81611', name: 'Xã Hòa Tân Tây', provinceCode: '41' },
    { code: '85325', name: 'Phường Lộc Thọ', provinceCode: '43' },
    { code: '85331', name: 'Xã Suối Hiệp', provinceCode: '43' },
    { code: '88974', name: 'Phường Đô Vinh', provinceCode: '45' },
    { code: '88978', name: 'Xã Ma Nới', provinceCode: '45' },
    { code: '92465', name: 'Phường Hải Ninh', provinceCode: '47' },
    { code: '92471', name: 'Xã Hòa Thắng', provinceCode: '47' },
    { code: '95226', name: 'Phường Nguyễn Trãi', provinceCode: '49' },
    { code: '95235', name: 'Xã Đắk Tô', provinceCode: '49' },
    { code: '98623', name: 'Phường Ia Kram', provinceCode: '51' },
    { code: '98635', name: 'Xã Kông Yang', provinceCode: '51' },
    { code: '100696', name: 'Phường EaTan', provinceCode: '53' },
    { code: '100710', name: 'Xã CưM\'gar', provinceCode: '53' },
    { code: '102721', name: 'Phường 1', provinceCode: '54' },
    { code: '102727', name: 'Xã Đắk Mamt', provinceCode: '54' },
    { code: '105394', name: 'Phường 2', provinceCode: '56' },
    { code: '105412', name: 'Xã Đạ Mài', provinceCode: '56' },
    { code: '111721', name: 'Phường Hố Nai', provinceCode: '58' },
    { code: '111731', name: 'Xã Long Bình', provinceCode: '58' },
    { code: '114502', name: 'Phường 1', provinceCode: '60' },
    { code: '114526', name: 'Xã Bàu Bàng', provinceCode: '60' },
    { code: '117541', name: 'Phường Dĩ An', provinceCode: '62' },
    { code: '117556', name: 'Xã Tân Định', provinceCode: '62' },
    { code: '119737', name: 'Phường Quang Vinh', provinceCode: '64' },
    { code: '119748', name: 'Xã Xuân Quế', provinceCode: '64' },
    { code: '122833', name: 'Phường Phước Bửu', provinceCode: '66' },
    { code: '122845', name: 'Xã Bình Ba', provinceCode: '66' },
    { code: '15505', name: 'Phường Bến Nghé', provinceCode: '67' },
    { code: '15515', name: 'Phường Cầu Kho', provinceCode: '67' },
    { code: '15671', name: 'Phường An Khánh', provinceCode: '67' },
    { code: '15680', name: 'Xã An Nhơn', provinceCode: '67' },
    { code: '12940', name: 'Phường Cái Khế', provinceCode: '68' },
    { code: '12946', name: 'Xã Tân Phú', provinceCode: '68' },
    { code: '13327', name: 'Phường Khoái Đông', provinceCode: '70' },
    { code: '13339', name: 'Xã Vị Tân', provinceCode: '70' },
    { code: '14587', name: 'Phường 2', provinceCode: '72' },
    { code: '14597', name: 'Xã Long Bửu', provinceCode: '72' },
    { code: '14986', name: 'Phường 1', provinceCode: '74' },
    { code: '14992', name: 'Xã Hiệp Thành', provinceCode: '74' },
    { code: '16321', name: 'Phường 5', provinceCode: '76' },
    { code: '16337', name: 'Xã Định An', provinceCode: '76' },
  ]
};

async function main() {
  console.log('Loading Vietnam Administrative Divisions 2025...');

  await prisma.$transaction([
    prisma.ward.deleteMany({}),
    prisma.province.deleteMany({}),
  ]);

  await prisma.province.createMany({
    data: vnAdministrativeData.provinces,
  });

  await prisma.ward.createMany({
    data: vnAdministrativeData.wards,
  });

  const provinceCount = await prisma.province.count();
  const wardCount = await prisma.ward.count();

  console.log(`✅ Seeded ${provinceCount} provinces and ${wardCount} wards`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });