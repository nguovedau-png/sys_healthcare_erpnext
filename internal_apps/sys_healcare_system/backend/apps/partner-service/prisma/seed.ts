import { PrismaClient } from '../../../node_modules/.prisma/client-partner-service';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding specialties...');
  const specialties = [
    { name: 'Nội khoa', code: 'NOIKHOA', type: 'doctor' },
    { name: 'Ngoại khoa', code: 'NGOAIKHOA', type: 'doctor' },
    { name: 'Nhi khoa', code: 'NHIKHOA', type: 'doctor' },
    { name: 'Sản phụ khoa', code: 'SANPHUKHOA', type: 'doctor' },
    { name: 'Da liễu', code: 'DALIEU', type: 'doctor' },
    { name: 'Mắt', code: 'MAT', type: 'doctor' },
    { name: 'Tai Mũi Họng', code: 'TAIMUIHONG', type: 'doctor' },
    { name: 'Răng Hàm Mặt', code: 'RANGHAMMAT', type: 'doctor' },
    { name: 'Tâm thần', code: 'TAMTHAN', type: 'doctor' },
    { name: 'Hồi sức cấp cứu', code: 'HOISUCCAPCUU', type: 'doctor' },
    { name: 'Y học cổ truyền', code: 'YHOCOTRUYEN', type: 'doctor' },
    { name: 'Phục hồi chức năng', code: 'PHUCHOICHUCNANG', type: 'doctor' },
    { name: 'Xét nghiệm', code: 'XETNGHIEM', type: 'general' },
    { name: 'Chẩn đoán hình ảnh', code: 'CHANDOANHINHANH', type: 'general' },
  ];

  for (const s of specialties) {
    await prisma.specialty.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
  }

  console.log('Seeding academic degrees...');
  const degrees = [
    { name: 'Giáo sư', abbreviation: 'GS', type: 'academic' },
    { name: 'Phó Giáo sư', abbreviation: 'PGS', type: 'academic' },
    { name: 'Tiến sĩ', abbreviation: 'TS', type: 'degree' },
    { name: 'Thạc sĩ', abbreviation: 'ThS', type: 'degree' },
    { name: 'Bác sĩ Chuyên khoa II', abbreviation: 'BSCKII', type: 'degree' },
    { name: 'Bác sĩ Chuyên khoa I', abbreviation: 'BSCKI', type: 'degree' },
    { name: 'Bác sĩ', abbreviation: 'BS', type: 'degree' },
    { name: 'Dược sĩ', abbreviation: 'DS', type: 'degree' },
    { name: 'Cử nhân', abbreviation: 'CN', type: 'degree' },
  ];

  for (const d of degrees) {
    // Upsert by name for degrees since no unique code
    const existing = await prisma.academicDegree.findFirst({ where: { name: d.name } });
    if (!existing) {
      await prisma.academicDegree.create({ data: d });
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
