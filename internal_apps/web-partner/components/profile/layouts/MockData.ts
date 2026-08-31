
export const USER_TYPE_EXTENDED = {
  doctor: "bác sĩ",
  hospital: "bệnh viện",
  clinic: "phòng khám",
  pharmacy: "nhà thuốc",
  pharmacist: "dược sĩ",
  user: "người dùng"
};

export const ADDITIONAL_USERS = [
  {
    userId: "clin-001",
    userType: "clinic",
    name: "Phòng khám Đa khoa Quốc tế",
    degree: "",
    speciality: "Đa khoa",
    avatar: "/img/hospital/choray.jpg", // Placeholder
    address: "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM",
    phone: ["028 3838 3838"],
    email: ["contact@clinic.com"],
    socialContact: [
      { name: "facebook", icon: "facebook", link: "#" },
      { name: "website", icon: "web-1", link: "#" }
    ],
    traffic: { like: 150, search: 300, view: 200, visit: 450, post: 10 },
    statistic: { yearExp: 10, like: 1500, search: 3000, view: 2500, visit: 5000, post: 100, feedback: 80 },
    intro: {
      exp: "<p>Phòng khám Đa khoa Quốc tế cung cấp dịch vụ y tế chất lượng cao.</p>",
      degree: "",
      associationAward: ""
    },
    service: [
      {
        speciality: "Lâm sàng",
        services: [
          { name: "Khám tổng quát", price: 200000 },
          { name: "Khám chuyên khoa", price: 250000 }
        ]
      }
    ],
    rating: [],
    workplace: [],
    worktime: {
      weekday: ["07:00 - 20:00"],
      weekend: ["08:00 - 17:00"],
      holiday: ["08:00 - 12:00"]
    },
    gallery: [],
    facilities: [
      { facilitiesName: "Máy siêu âm 4D", address: "Tầng 1", phone: "" },
      { facilitiesName: "Phòng xét nghiệm chuẩn ISO", address: "Tầng 2", phone: "" }
    ],
    qa: []
  },
  {
    userId: "phar-001",
    userType: "pharmacy",
    name: "Nhà thuốc Long Châu",
    degree: "",
    speciality: "Dược phẩm",
    avatar: "/img/hospital/choray.jpg", // Placeholder
    address: "456 Đường CMT8, Quận 3, TP.HCM",
    phone: ["1800 6928"],
    email: ["contact@longchau.com"],
    socialContact: [{ name: "website", icon: "web-1", link: "https://nhathuoclongchau.com" }],
    traffic: { like: 500, search: 1000, view: 800, visit: 2000, post: 50 },
    statistic: { yearExp: 15, like: 5000, search: 10000, view: 9000, visit: 20000, post: 500, feedback: 200 },
    intro: {
      exp: "<p>Hệ thống nhà thuốc uy tín hàng đầu Việt Nam.</p>",
      degree: "",
      associationAward: ""
    },
    service: [],
    rating: [],
    workplace: [],
    worktime: {
      weekday: ["07:00 - 22:00"],
      weekend: ["07:00 - 22:00"],
      holiday: ["07:00 - 22:00"]
    },
    gallery: [],
    facilities: [],
    qa: []
  },
  {
    userId: "phst-001",
    userType: "pharmacist",
    name: "Dược sĩ Phạm Thị Hương",
    degree: "DS.ĐH",
    speciality: "Dược lâm sàng",
    avatar: "/img/doctor/doctor-2.jpg", // Placeholder
    address: "456 Đường CMT8, Quận 3, TP.HCM",
    phone: ["0909 123 456"],
    email: ["huong.pham@email.com"],
    socialContact: [],
    traffic: { like: 50, search: 100, view: 80, visit: 200, post: 5 },
    statistic: { yearExp: 5, like: 500, search: 800, view: 700, visit: 1500, post: 50, feedback: 10 },
    intro: {
      exp: "<p>Dược sĩ Phạm Thị Hương có 5 năm kinh nghiệm tư vấn thuốc.</p>",
      degree: "<ul><li>Cử nhân Đại học Dược Hà Nội</li></ul>",
      associationAward: ""
    },
    service: [],
    rating: [],
    workplace: [
      {
        userId: "phar-001",
        userType: "pharmacy",
        name: "Nhà thuốc Long Châu",
        degree: "",
        speciality: "Dược phẩm",
        avatar: "/img/hospital/choray.jpg",
        address: "456 Đường CMT8, Quận 3, TP.HCM",
        phone: ["1800 6928"],
        fax: [],
        traffic: { like: 0, search: 0, view: 0, visit: 0, post: 0 },
        statistic: { yearExp: 0, like: 0, search: 0, view: 0, visit: 0, post: 0, feedback: 0 }
      }
    ],
    worktime: {
      weekday: ["08:00 - 17:00"],
      weekend: [],
      holiday: []
    },
    gallery: [],
    facilities: [],
    qa: []
  },
  {
    userId: "user-001",
    userType: "user",
    name: "Nguyễn Văn A",
    degree: "",
    speciality: "",
    avatar: "/img/user/user-1.jpg", // Placeholder
    address: "789 Đường Lê Lợi, Quận 1, TP.HCM",
    phone: ["0912 345 678"],
    email: ["nguyenvana@gmail.com"],
    socialContact: [],
    traffic: { like: 0, search: 0, view: 0, visit: 0, post: 0 },
    statistic: { yearExp: 0, like: 0, search: 0, view: 0, visit: 0, post: 0, feedback: 0 },
    intro: { exp: "", degree: "", associationAward: "" },
    service: [],
    rating: [],
    workplace: [],
    worktime: { weekday: [], weekend: [], holiday: [] },
    gallery: [],
    facilities: [],
    qa: [],
    visitHistory: [
      {
        userId: "doc-001",
        userType: "doctor",
        name: "Nguyễn Thế Dũng",
        avatar: "/img/user/thedung.png",
        detail: {
          doctor: { userId: "doc-001", userType: "doctor", name: "Nguyễn Thế Dũng" },
          service: { name: "Khám chuyên khoa", price: 150000 },
          datetime: "2025-06-15 09:30"
        }
      }
    ]
  },
  {
    userId: "hos-005",
    userType: "hospital",
    name: "Bệnh viện Nhiệt đới TP.HCM",
    degree: "",
    speciality: "Nhi khoa",
    avatar: "/img/user/nd.png",
    address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
    phone: ["090 365 2829"],
    email: ["bvnd@hcm.vn"],
    fax: [],
    socialContact: [],
    traffic: { like: 7, search: 10, view: 6, visit: 12, post: 3 },
    statistic: { yearExp: 40, like: 631, search: 100, view: 97, visit: 1265, post: 34, feedback: 25 },
    intro: { exp: "Giới thiệu về bệnh viện...", degree: "Chứng nhận...", associationAward: "" },
    facilities: [
      { name: "Khoa Nhi", image: "/img/facility/fac-1.jpg" },
      { name: "Khoa Cấp Cứu", image: "/img/facility/fac-2.jpg" }
    ],
    service: [],
    rating: [],
    worktime: { weekday: ["07:00 - 17:00"], weekend: ["07:00 - 12:00"], holiday: [] },
    gallery: [],
    qa: []
  }
];
