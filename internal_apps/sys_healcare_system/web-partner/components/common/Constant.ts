export const MOSTVIEW_NEWS = [
  {
    id: "1",
    title: "Bị chó Bully hơn 30 kg tấn công, cụ bà 87 tuổi phải cắt cụt 1/3 cánh tay",
    type: "article",
    thumbnail: "/img/news/news-1.jpg",
    author: {
      name: "Bệnh viện Chợ Rẫy",
      avatar: "/img/hospital/choray.jpg"
    },
    publishDate: "2023-07-20",
    desc: "16/3 khi sang nhà hàng xóm, bất ngờ cụ bà N.T.T, 87 tuổi, ở Ba Đình, Hà Nội bị chú chó Bully nặng hơn 30 kg lao vào tấn công",
    slug: "/news/1",
    view: 1500,
    comments: {
      length: 25
    }
  },
  {
    id: "2",
    title: "Nam thanh niên phải cắt cụt 4 ngón tay do máy dập bị lỗi",
    type: "article",
    thumbnail: "/img/news/news-2.jpg",
    author: {
      name: "Bệnh viện Việt Đức",
      avatar: "/img/hospital/vietduc.jpg"
    },
    publishDate: "2023-07-21",
    desc: "Sáng 22/3, Bệnh viện Hữu nghị Việt Đức cho biết bệnh nhân T.V.T, 21 tuổi, trú tại Thái Nguyên vào viện trong tình trạng dập nát các ngón 2,3,4,5 bàn tay trái",
    slug: "/news/2",
    view: 1200,
    comments: {
      length: 18
    }
  },
  {
    id: "3",
    title: "Phát hiện sớm ung thư phổi nhờ khám sức khỏe định kỳ",
    type: "article",
    thumbnail: "/img/news/news-3.jpg",
    author: {
      name: "Bệnh viện K",
      avatar: "/img/hospital/benhvienk.jpg"
    },
    publishDate: "2023-07-22",
    desc: "Trong đợt khám sức khỏe định kỳ, bác sĩ phát hiện khối u ác tính giai đoạn sớm ở phổi của bệnh nhân N.V.M (58 tuổi, Hà Nội)",
    slug: "/news/3",
    view: 980,
    comments: {
      length: 15
    }
  },
  {
    id: "4",
    title: "Cảnh báo nguy cơ đột quỵ ở người trẻ do thói quen xấu",
    type: "article",
    thumbnail: "/img/news/news-4.jpg",
    author: {
      name: "Bệnh viện Bạch Mai",
      avatar: "/img/hospital/bachmai.jpg"
    },
    publishDate: "2023-07-23",
    desc: "Các bác sĩ cảnh báo số ca đột quỵ ở người trẻ có xu hướng tăng do thói quen ăn uống không lành mạnh và lối sống ít vận động",
    slug: "/news/4",
    view: 850,
    comments: {
      length: 12
    }
  },
  {
    id: "5",
    title: "Kỹ thuật mới trong điều trị bệnh tim bẩm sinh ở trẻ em",
    type: "article",
    thumbnail: "/img/news/news-5.jpg",
    author: {
      name: "Bệnh viện Nhi Trung ương",
      avatar: "/img/hospital/nhitrunguong.jpg"
    },
    publishDate: "2023-07-24",
    desc: "Bệnh viện Nhi Trung ương vừa triển khai thành công kỹ thuật mới trong điều trị bệnh tim bẩm sinh phức tạp ở trẻ em",
    slug: "/news/5",
    view: 1100,
    comments: {
      length: 20
    }
  }
];

export const TOP_FORUM_POSTS = [
  {
    id: "1",
    title: "Cách phòng ngừa bệnh tim mạch",
    author: {
      userId: "1",
      name: "BS. Nguyễn Văn A",
      avatar: "/img/doctor/doctor-1.jpg"
    },
    link: "/forum/1",
    views: 1500,
    comments: 25,
    likes: 120,
    publishDate: "2023-07-20"
  },
  {
    id: "2",
    title: "Chế độ ăn cho người tiểu đường",
    author: {
      userId: "2",
      name: "BS. Trần Thị B",
      avatar: "/img/doctor/doctor-2.jpg"
    },
    link: "/forum/2",
    views: 1200,
    comments: 18,
    likes: 95,
    publishDate: "2023-07-21"
  },
  {
    id: "3",
    title: "Tác dụng của yoga đối với sức khỏe tinh thần",
    author: {
      userId: "3",
      name: "BS. Lê Văn C",
      avatar: "/img/doctor/doctor-3.jpg"
    },
    link: "/forum/3",
    views: 980,
    comments: 15,
    likes: 85,
    publishDate: "2023-07-22"
  },
  {
    id: "4",
    title: "Hướng dẫn chăm sóc trẻ sơ sinh đúng cách",
    author: {
      userId: "4",
      name: "BS. Phạm Thị D",
      avatar: "/img/doctor/doctor-4.jpg"
    },
    link: "/forum/4",
    views: 850,
    comments: 12,
    likes: 75,
    publishDate: "2023-07-23"
  },
  {
    id: "5",
    title: "Phòng ngừa các bệnh về xương khớp",
    author: {
      userId: "5",
      name: "BS. Hoàng Văn E",
      avatar: "/img/doctor/doctor-5.jpg"
    },
    link: "/forum/5",
    views: 1100,
    comments: 20,
    likes: 90,
    publishDate: "2023-07-24"
  }
];

export const NEWS_BY_CATEGORY = {
  result: true,
  statusCode: "200",
  message: "",
  sysMessage: "",
  totalItem: 5,
  data: [
    {
      categoriesName: "Covid-19",
      articles: [
        {
          id: "1",
          title: "Quảng Ninh hoàn tất truy vết, cách ly người tiếp xúc với ca nghi mắc COVID-19",
          type: "article",
          thumbnail: "/img/news/covid-1.jpg",
          author: {
            name: "Sở Y tế Quảng Ninh",
            avatar: "/img/hospital/quangninh.jpg"
          },
          publishDate: "2023-07-20",
          desc: "Quảng Ninh đã hoàn tất việc truy vết và cách ly các trường hợp tiếp xúc gần với ca nghi nhiễm COVID-19",
          slug: "/news/1",
          view: 1500,
          comments: {
            length: 25
          }
        },
        {
          id: "2",
          title: "Nghiên cứu mới về hiệu quả của vaccine COVID-19",
          type: "article",
          thumbnail: "/img/news/covid-2.jpg",
          author: {
            name: "Viện Pasteur TP.HCM",
            avatar: "/img/hospital/pasteur.jpg"
          },
          publishDate: "2023-07-21",
          desc: "Kết quả nghiên cứu cho thấy vaccine COVID-19 vẫn duy trì hiệu quả bảo vệ cao sau 6 tháng tiêm chủng",
          slug: "/news/2",
          view: 1200,
          comments: {
            length: 18
          }
        }
      ]
    },
    {
      categoriesName: "Tim mạch",
      articles: [
        {
          id: "3",
          title: "Phòng ngừa bệnh tim mạch ở người cao tuổi",
          type: "article",
          thumbnail: "/img/news/heart-1.jpg",
          author: {
            name: "BS. Nguyễn Văn A",
            avatar: "/img/doctor/doctor-1.jpg"
          },
          publishDate: "2023-07-21",
          desc: "Người cao tuổi cần đặc biệt chú ý đến việc phòng ngừa các bệnh về tim mạch",
          slug: "/news/3",
          view: 1200,
          comments: {
            length: 18
          }
        },
        {
          id: "4",
          title: "Chế độ ăn uống cho người bị cao huyết áp",
          type: "article",
          thumbnail: "/img/news/heart-2.jpg",
          author: {
            name: "BS. Trần Thị B",
            avatar: "/img/doctor/doctor-2.jpg"
          },
          publishDate: "2023-07-22",
          desc: "Những thực phẩm nên và không nên ăn đối với người bị cao huyết áp",
          slug: "/news/4",
          view: 980,
          comments: {
            length: 15
          }
        }
      ]
    },
    {
      categoriesName: "Nhi khoa",
      articles: [
        {
          id: "5",
          title: "Cách phòng ngừa bệnh cúm ở trẻ em",
          type: "article",
          thumbnail: "/img/news/pediatric-1.jpg",
          author: {
            name: "BS. Phạm Thị D",
            avatar: "/img/doctor/doctor-4.jpg"
          },
          publishDate: "2023-07-23",
          desc: "Các biện pháp phòng ngừa bệnh cúm hiệu quả cho trẻ em trong mùa dịch",
          slug: "/news/5",
          view: 850,
          comments: {
            length: 12
          }
        },
        {
          id: "6",
          title: "Dinh dưỡng cho trẻ trong giai đoạn phát triển",
          type: "article",
          thumbnail: "/img/news/pediatric-2.jpg",
          author: {
            name: "BS. Hoàng Văn E",
            avatar: "/img/doctor/doctor-5.jpg"
          },
          publishDate: "2023-07-24",
          desc: "Chế độ dinh dưỡng cân bằng giúp trẻ phát triển toàn diện về thể chất và trí tuệ",
          slug: "/news/6",
          view: 1100,
          comments: {
            length: 20
          }
        }
      ]
    },
    {
      categoriesName: "Da liễu",
      articles: [
        {
          id: "7",
          title: "Cách chăm sóc da trong mùa hanh khô",
          type: "article",
          thumbnail: "/img/news/dermatology-1.jpg",
          author: {
            name: "BS. Lê Văn C",
            avatar: "/img/doctor/doctor-3.jpg"
          },
          publishDate: "2023-07-25",
          desc: "Những tips chăm sóc da hiệu quả giúp da luôn khỏe mạnh trong thời tiết hanh khô",
          slug: "/news/7",
          view: 750,
          comments: {
            length: 10
          }
        }
      ]
    },
    {
      categoriesName: "Dinh dưỡng",
      articles: [
        {
          id: "8",
          title: "Chế độ ăn cho người tập thể thao",
          type: "article",
          thumbnail: "/img/news/nutrition-1.jpg",
          author: {
            name: "BS. Nguyễn Thị F",
            avatar: "/img/doctor/doctor-6.jpg"
          },
          publishDate: "2023-07-26",
          desc: "Hướng dẫn chế độ ăn uống khoa học cho người thường xuyên tập thể thao",
          slug: "/news/nutrition/1",
          view: 680,
          comments: {
            length: 8
          }
        }
      ]
    }
  ]
};

// User type
export const USER_TYPE = {
  doctor: "bác sĩ",
  hospital: "bệnh viện",
  clinic: "phòng khám",
  pharmacy: "nhà thuốc",
  pharmacist: "dược sĩ",
  user: "người dùng"
}


// All users

export const USERS = [
  {
    userId: "doc-001",
    userType: "doctor",
    name: "Nguyễn Thế Dũng",
    degree: "BS.CKII. ",
    speciality: "Nội tổng hợp",
    avatar: "/img/user/thedung.png",
    address: "306 Nguyễn Sơn, Phường Phú Thọ Hòa, Quận Tân Phú, TP. HCM",
    phone: ["090 365 2829"],
    email: [],
    fax: [],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/phongkhamnhiviet",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 12,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 40,
      like: 631,
      search: 100,
      view: 97,
      visit: 1265,
      post: 34,
      feedback: 25
    },
    intro: {
      exp: `<p>BS Nguyễn Thế Dũng nguyên là Giám đốc Sở Y tế TP. HCM từ 2002 đến 2007. BS Nguyễn Thế Dũng đã tham gia, chủ trì một số công trình nghiên cứu khoa học phục vụ sức khỏe người dân, đã đăng trên các tạp chí trong và ngoài nước, đã chủ trì “Định hướng Quy hoạch phát triển ngành y tế TP. HCM ” trong lúc đương nhiệm Giám đốc Sở Y tế TP. HCM</p>
      <ul>
        <li><strong>9/1978 - 1979</strong> Bác sĩ điều trị tại Bệnh viện Chợ Quán thuộc Sở Y tế Thành phố</li>
        <li><strong>1979 - 9/1990</strong>Ông là Bác sĩ - Trưởng Khoa Nhiễm E Trung tâm Bệnh Nhiệt đới (Bệnh viện Chợ Quán). Ông được kết nạp vào Đảng Cộng sản Việt Nam ngày 02 tháng 12 năm 1983.</li>
        <li><strong>9/1190 - 1998</strong>Ông là Trưởng Phòng Kế hoạch Tổng hợp, Trung tâm Bệnh Nhiệt đới. </li>
        <li><strong>6/1998 - 1/2000</strong>Ông được bổ nhiệm giữ chức vụ Phó Giám đốc Trung tâm Bệnh Nhiệt đới.</li>
        <li><strong>1/2000 - 9/2002</strong>Ông được bổ nhiệm giữ chức vụ Phó Giám đốc Sở Y tế Thành phố, kiêm Bí thư Đảng ủy Sở Y tế (tháng 11 năm 2000).</li>
        <li><strong> 9/2002 - 2007</strong>Ông là Quyền Giám đốc, Giám đốc Sở Y tế kiêm Bí thư Đảng ủy Sở Y tế. Ủy viên Ban chấp hành Đảng bộ Thành phố (tháng 10 năm 2003) Nhiệm kỳ 2001 - 2005.</li>
      </ul>
      <p> Trong quá trình công tác, Ông được tặng thưởng: Thầy thuốc ưu tú; Huy chương tuổi trẻ dũng cảm vào năm 1987; Chiến sĩ thi đua cấp Thành phố; Nhiều bằng khen, giấy khen.</p>`
      ,
      degree: `<ul>
        <li>Bác sĩ chuyên khoa 2</li>
      </ul>`,
      associationAward: `<ul>
        <li><strong></strong>BS. Nguyễn Thế Dũng đã tham gia, chủ trì một số công trình nghiên cứu khoa học phục vụ sức khỏe người dân, đã đăng trên các tạp chí trong và ngoài nước</li>
        <li><strong></strong>Đã chủ trì “Định hướng Quy hoạch phát triển ngành y tế TP. HCM ” trong lúc đương nhiệm Giám đốc Sở Y tế TP. HCM</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Bệnh viện Nhiệt đới TP.HCM",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/nd.png",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25
        },
      },
      {

        userId: "hos-005",
        userType: "hospital",
        name: "Phòng khám Nội tổng hợp",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/pknoi.jpeg",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25
        },
      },
    ],
    worktime: {
      weekday: ["17:00 - 20:00", "17:00 - 20:00", "17:00 - 20:00", "17:00 - 20:00", "17:00 - 20:00"],
      weekend: ["17:00 - 20:00", "17:00 - 20:00"],
      holiday: ["17:00 - 20:00"]
    },
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Creatinin, máu",
        content: "Khi nào cần xét nghiệm định lượng creatinin máu?",
        reply: "Xét nghiệm định lượng creatinin máu thường được chỉ định để chẩn đoán suy giảm chức năng thận. Xét nghiệm này cần được thực hiện thường xuyên, định kỳ để nắm bắt được tình trạng cơ thể.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Cholesterol Total",
        content: "Sử dụng margarine thay thế cho bơ sẽ giúp cho cholesterol của tôi thấp hơn ?",
        reply: "Cả margarine và bơ đều có hàm lượng cao về chất béo, vì thế sử dụng cả hai loại này ở mức vừa phải. Với một chế độ ăn, yếu tố lớn nhất ảnh hưởng đến cholesterol máu là có bao nhiêu chất béo bảo hoà và chất béo trans (saturated fat and trans fat) (chất béo trans là một chất béo “xấu” có nhiều trong các loại bánh ngọt, chocolat, kẹo, bánh biscuit, cookies, cracker, bánh donuts, muffin, bánh trung thu, bánh croissant, thức ăn chiên bán trong tiệm như khoai Tây chiên (French fries) và gà chiên, và trong các loại margarine cứng) . Hạn chế thức ăn có hàm lượng chất béo bảo hoà và chất béo trans sẽ giúp cho LDL (xấu) cholesterol của bạn thấp hơn. Hầu hết dầu thực vật, margarin dạng lỏng và mềm chứa ít chất béo bảo hoà và chất béo trans hơn các loại bánh kẹo, bơ, mứt và thích hợp với chế độ ăn tốt cho tim. Khi chọn mua margarin, tốt nhất nên chọn loại trên nhãn hiệu có ghi “chất béo trans = 0 gam (0 gam trans fat)",
        vote: 7
      }
    ],
  },
  {
    userId: "doc-002",
    userType: "doctor",
    name: "Nguyễn Thu Hoài",
    degree: "BS.CKII. ",
    speciality: "Sản khoa",
    avatar: "/img/user/thuhoai.jpg",
    address: "458 Minh Khai, Vĩnh Tuy, Hà Nội",
    phone: ["090 365 2829"],
    email: [],
    fax: [],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/phongkhamnhiviet",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://phongkhamnhiviet.com",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 12,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 12,
      like: 295,
      search: 100,
      view: 97,
      visit: 1265,
      post: 42,
      feedback: 25,
    },
    intro: {
      exp: `<p>Bác sĩ Nguyễn Thu Hoài đã có 12 năm kinh nghiệm trong ngành Sản phụ khoa và đã công tác tại tất cả các vị trí ở khu vực phòng khám, phòng đẻ, phòng thủ thuật và khu điều trị.</p>
      <p>Là bác sĩ đầu tiên tại Việt Nam phẫu thuật thành công nội soi robot điều trị bệnh lý phụ khoa.</p>
      <p>Là bác sĩ đầu tiên tại Hà Nội thực hiện truyền ối thành công cho hơn 10 thai phụ có thai cạn ối.</p>
      <ul>
        <li><strong>2006 - 2012</strong>Bệnh viện Thanh Nhàn, Hà Nội</li>
      </ul>`,
      degree: `<ul>
        <li>Bác sĩ Nguyễn Thu Hoài tốt nghiệp Loại giỏi Chuyên ngành Bác sĩ Đa khoa - Đại học Y Hà Nội</li>
        <li>Chứng chỉ định hướng chuyên ngành Sản phụ khoa - Bệnh viện Phụ Sản Trung Ương</li>
        <li>Chứng chỉ Siêu âm ổ bụng - Trường đại học Y Hà Nội</li>
        <li>Chứng chỉ Phẫu thuật Nội soi cơ bản - Bệnh viện Việt Đức</li>
        <li>Chứng chỉ học về Hồi sức sơ sinh - Bệnh viện Nhi Trung Ương</li>
        <li>Chứng chỉ phẫu thuật nội soi nâng cao – Bệnh viện Phụ Sản Trung Ương</li>
        <li>Chứng chỉ tư vấn tiền sản, chọc ối  và sinh thiết gai rau – Bệnh viện Từ Dũ</li>
        <li>Chứng chỉ tham dự khóa đào tạo về laser điều trị truyền máu trong song thai – Bệnh viện Từ Dũ</li>
        <li>Chứng chỉ phẫu thuật nội soi ROBOT – Trung tâm Minimal Invasive  - Prince Edward Hospital – Hồng Kông</li>
        <li>Chứng chỉ phẫu thuật nội soi ROBOT -  Bệnh viện Yonsei – Hàn Quốc</li>
        <li>Chứng chỉ: Y học bào thai  - Module: Di truyền học – nền tảng của Y học bào thai – Bệnh viện Karolinska – Thụy Điển phối hợp Bệnh viện đại học Y dược thành phố Hồ Chí Minh</li>
        <li>Chứng chỉ: Siêu âm nâng cao phục vụ chẩn đoán tiền sản và can thiệp bào thai – – Bệnh viện Karolinska – Thụy Điển phối hợp Bệnh viện đại học Y dược thành phố Hồ Chí Minh</li>
      </ul>`,
      associationAward: `<ul>
        <li><strong></strong>Là bác sĩ đầu tiên tại Việt Nam phẫu thuật thành công nội soi robot điều trị bệnh lý phụ khoa</li>
        <li><strong></strong>Là bác sĩ đầu tiên tại Hà Nội thực hiện truyền ối thành công cho hơn 10 thai phụ có thai cạn ố</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Trung tâm Sức khỏe Phụ nữ",
        degree: "",
        speciality: "Sản khoa",
        avatar: "/img/user/common.jpg",
        address: "458 Minh Khai, Phường Vĩnh Tuy, Hà Nội",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
    ],
    worktime: {
      weekday: ["17:00 - 20:00", "16:00 - 21:00", "17:30 - 21:00", "16:00 - 20:00", "17:00 - 20:00"],
      weekend: ["18:00 - 20:00", "17:00 - 20:00"],
      holiday: ["17:00 - 20:00"]
    },
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
  },
  {
    userId: "doc-003",
    userType: "doctor",
    name: "Nghiêm Hoàng Lan Phương",
    degree: "THS.BS.CKI. ",
    speciality: "Nội khoa",
    avatar: "/img/user/lanphuong.jpg",
    address: "216 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội",
    phone: ["090 365 2829"],
    email: [],
    fax: [],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/phongkhamnhiviet",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://phongkhamnhiviet.com",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 14,
      post: 2,
    },
    statistic: { // Overall
      yearExp: 20,
      like: 127,
      search: 100,
      view: 97,
      visit: 472,
      post: 8,
      feedback: 25,
    },
    intro: {
      exp: `<p>Bác sĩ CKI Lan Phương có gần 20 năm kinh nghiệm trong nghề, được đào tạo chuyên môn bài bản trong và ngoài nước.</p>
      <p>Với bản lĩnh nghề nghiệp và niềm đam mê cống hiến vì sức khỏe cộng đồng, bác sĩ đã từng đảm nhiệm nhiều vị trí quan trọng như.</p>
      <ul>
        <li><strong>6/1987 – 12/1992</strong>Bệnh viện Thanh Nhàn, Hà Nội</li>
        <li><strong>1/1993 – 12/2003</strong>Bác sĩ Điều trị khoa Tim mạch- Bệnh viện Thanh Nhàn</li>
        <li><strong>1/2004 – 11/2007</strong>Bác sĩ Điều trị Khoa Tim mạch & Phó phòng kế hoạch tổng hợp – Bệnh viện Thanh Nhàn</li>
        <li><strong>12/2007 – 5/2009</strong>Bác sĩ điều trị khoa Tim mạch & Phó phòng phụ trách KHTH & Trưởng phòng – Bệnh viện Thanh Nhàn</li>
        <li><strong> 2012 – 2014</strong>Phó Giám đốc kiêm Trưởng khoa Khám bệnh – Bệnh viện Hòe Nhai</li>
      </ul>
      <p>Với bệnh nhân, bác sĩ Phương gây ấn tượng bởi sự thân thiện, dễ gần và tận tâm, biến mọi cuộc thăm khám, điều trị trở nên nhẹ nhàng, thoải mái.</p>`,
      degree: `<ul>
        <li>Bác sĩ chuyên khoa I</li>
       
      </ul>`,
      associationAward: `<ul>
        <li><strong></strong>Bên cạnh đó bác sĩ cũng nhiều năm đạt danh hiệu Chiến sỹ thi đua, Lao động tiên tiến.</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    worktime: {
      weekday: ["17:00 - 20:00", "16:00 - 21:00", "17:30 - 21:00", "16:00 - 20:00", "17:00 - 20:00"],
      weekend: ["18:00 - 20:00", "17:00 - 20:00"],
      holiday: ["17:00 - 20:00"]
    },
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
  },
  {
    userId: "doc-004",
    userType: "doctor",
    name: "Hoàng Lương",
    degree: "TS.BS.CKII. ",
    speciality: "Sản khoa",
    avatar: "/img/user/hoangluong.jpg",
    address: "216 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội",
    phone: ["090 365 2829"],
    email: [],
    fax: [],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/phongkhamnhiviet",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://phongkhamnhiviet.com",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 12,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 12,
      like: 295,
      search: 100,
      view: 97,
      visit: 1265,
      post: 0,
      feedback: 25,
    },
    intro: {
      exp: `<p>Bác sĩ CKI Lan Phương có gần 20 năm kinh nghiệm trong nghề, được đào tạo chuyên môn bài bản trong và ngoài nước.</p>
      <p>Với bản lĩnh nghề nghiệp và niềm đam mê cống hiến vì sức khỏe cộng đồng, bác sĩ đã từng đảm nhiệm nhiều vị trí quan trọng như.</p>
      <ul>
        <li><strong>6/1987 – 12/1992</strong>Bệnh viện Thanh Nhàn, Hà Nội</li>
        <li><strong>1/1993 – 12/2003</strong>Bác sĩ Điều trị khoa Tim mạch- Bệnh viện Thanh Nhàn</li>
        <li><strong>1/2004 – 11/2007</strong>Bác sĩ Điều trị Khoa Tim mạch & Phó phòng kế hoạch tổng hợp – Bệnh viện Thanh Nhàn</li>
        <li><strong>12/2007 – 5/2009</strong>Bác sĩ điều trị khoa Tim mạch & Phó phòng phụ trách KHTH & Trưởng phòng – Bệnh viện Thanh Nhàn</li>
      </ul>`,
      degree: `<ul>
        <li>Bác sĩ Nguyễn Thu Hoài tốt nghiệp Loại giỏi Chuyên ngành Bác sĩ Đa khoa - Đại học Y Hà Nội</li>
        <li>Chứng chỉ định hướng chuyên ngành Sản phụ khoa - Bệnh viện Phụ Sản Trung Ương</li>
        <li>Chứng chỉ Siêu âm ổ bụng - Trường đại học Y Hà Nội</li>
        <li>Chứng chỉ Phẫu thuật Nội soi cơ bản - Bệnh viện Việt Đức</li>
        <li>Chứng chỉ học về Hồi sức sơ sinh - Bệnh viện Nhi Trung Ương</li>
        <li>Chứng chỉ phẫu thuật nội soi nâng cao – Bệnh viện Phụ Sản Trung Ương</li>
        <li>Chứng chỉ tư vấn tiền sản, chọc ối  và sinh thiết gai rau – Bệnh viện Từ Dũ</li>
        <li>Chứng chỉ tham dự khóa đào tạo về laser điều trị truyền máu trong song thai – Bệnh viện Từ Dũ</li>
        <li>Chứng chỉ phẫu thuật nội soi ROBOT – Trung tâm Minimal Invasive  - Prince Edward Hospital – Hồng Kông</li>
        <li>Chứng chỉ phẫu thuật nội soi ROBOT -  Bệnh viện Yonsei – Hàn Quốc</li>
        <li>Chứng chỉ: Y học bào thai  - Module: Di truyền học – nền tảng của Y học bào thai – Bệnh viện Karolinska – Thụy Điển phối hợp Bệnh viện đại học Y dược thành phố Hồ Chí Minh</li>
        <li>Chứng chỉ: Siêu âm nâng cao phục vụ chẩn đoán tiền sản và can thiệp bào thai – – Bệnh viện Karolinska – Thụy Điển phối hợp Bệnh viện đại học Y dược thành phố Hồ Chí Minh</li>
      </ul>`,
      associationAward: `<ul>
        <li><strong>2004</strong>Tham gia hiệp hội Y khoa ABC</li>
        <li><strong>2006</strong>Giải thưởng Y khoa XYZ</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Trung tâm Sức khỏe Phụ nữ",
        degree: "",
        speciality: "Sản khoa",
        avatar: "/img/user/common.jpg",
        address: "458 Minh Khai, Phường Vĩnh Tuy, Hà Nội",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
    ],
    worktime: {
      weekday: ["17:00 - 20:00", "16:00 - 21:00", "17:30 - 21:00", "16:00 - 20:00", "17:00 - 20:00"],
      weekend: ["18:00 - 20:00", "17:00 - 20:00"],
      holiday: ["17:00 - 20:00"]
    },
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
  },

  {
    userId: "cli-001",
    userType: "clinic",
    name: "Phòng khám chuyên khoa Nhi-Nhi Việt",
    degree: "",
    speciality: "Nhi khoa",
    avatar: "/img/user/nhiviet.png",
    address: "61E dốc bệnh viện Nhi Trung Ương, 879 Đê La Thành, Đống Đa, Hà nội",
    phone: ["024 6273 4990", "0966 31 2233"],
    email: ["phongkhamnhiviet@gmail.com"],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/phongkhamnhiviet",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://phongkhamnhiviet.com",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 147,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 5,
      like: 1231,
      search: 100,
      view: 97,
      visit: "12k",
      post: 193,
      feedback: 25,
    },
    intro: {
      exp: `<p>Phòng khám chuyên khoa Nhi đầu tiên tại Hà Nội được đầu tư theo mô hình mô hình Phòng khám chuyên khoa với tiêu chí “Công nghệ hiện đại, chuyên môn cao, dịch vụ hoàn hảo”. Tuy mới thành lập vào tháng 4 năm 2013 nhưng Phòng khám chuyên khoa Nhi – Nhi Việt luôn tự hào bời chất lượng dịch vụ tốt, môi trường làm việc thân thiện, gần gũi với trẻ thơ.</p>
      <p>Bằng sự nỗ lực vượt bậc của toàn thể nhân viên của Phòng khám, đặc biệt là sự đóng góp to lớn của toàn thể các Bác sỹ, các y tá điều dưỡng cùng toàn thể CBNV, Phòng khám chuyên khoa Nhi – Nhi Việt đang không ngừng lao động quên mình, luôn luôn học hỏi cố gằng, vươn lên.</p>
      `,
      degree: "",
      associationAward: `<ul>
        <li><strong>2004</strong>Tham gia hiệp hội Y khoa ABC</li>
        <li><strong>2006</strong>Giải thưởng Y khoa XYZ</li>
      </ul>`
    },
    service: [
      {
        speciality: "Nội tổng hợp",
        services: [
          { name: "Khám bệnh", price: 70000 },
          { name: "Chẩn đoán bệnh", price: 50000 },
          { name: "Tái khám", price: 40000 },
        ]
      }, {
        speciality: "Nhi khoa",
        services: [
          { name: "Khám bệnh", price: 70000 },
          { name: "Chẩn đoán bệnh", price: 50000 },
          { name: "Tái khám", price: 40000 },
        ]
      }, {
        speciality: "Khác",
        services: [
          { name: "Xét nghiệm", price: 150000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Bệnh viện Nhiệt đới TP.HCM",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/nd.png",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
      {

        userId: "hos-005",
        userType: "hospital",
        name: "Phòng khám Nội tổng hợp",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/pknoi.jpeg",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
    ],
    worktime: [
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" }
    ],
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    indoorMap: [
      { label: "Tầng trệt", img: "/img/indoor/g.jpg" },
      { label: "Tầng 1", img: "/img/indoor/f1.jpg" },
      { label: "Tầng 2", img: "/img/indoor/f2.jpg" },
      { label: "Tầng 3", img: "/img/indoor/f3.jpg" },
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
    facilities: [],
  },
  {
    userId: "cli-002",
    userType: "clinic",
    name: "Phòng khám Quốc tế Victoria Healthcare",
    degree: "",
    speciality: "Đa khoa",
    avatar: "/img/user/victoria.jpg",
    address: "37-39 Lương Định Của, Phường Bình An, Quận 2, TP.HCM",
    phone: ["(028) 3910 4545"],
    email: ["customercare@victoriavn.com"],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/VictoriaHealthcareVietNam",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://victoriavn.com",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 12,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 40,
      like: 631,
      search: 100,
      view: 97,
      visit: 1265,
      post: 34,
      feedback: 25,
    },
    intro: {
      exp: `<p>Victoria Healthcare là hệ thống Phòng Khám Đa Khoa tiêu chuẩn Mỹ được thành lập</p>
      <p>Victoria Healthcare luôn hiểu rằng chăm sóc sức khỏe hiện đại phải là một sự kết hợp giữa việc chẩn đoán chính xác, điều trị an toàn với chăm sóc chu đáo, ân cần, kỹ lưỡng. Vì đây là dịch vụ chăm sóc con người nên các nhân viên y tế không chỉ có kinh nghiệm chuyên sâu mà còn được đào tạo để phục vụ bệnh nhân cùng gia đình họ bằng cả trái tim, đúng với phương châm “Tất cả vì bệnh nhân” của Victoria Healthcare.</p>
      <p>Dù tại bất kỳ phòng khám nào thuộc hệ thống Phòng khám Quốc tế Victoria Healthcare, quý khách luôn nhận được nụ cười, sự ân cần, nhiệt tâm và hướng dẫn tận tình của đội ngũ nhân viên, tập thể Y Bác sỹ. Cùng với phương pháp khám và điều trị dựa trên nền tảng “Y học chứng cứ”, các Bác sỹ sẽ giúp bệnh nhân cùng gia đình hiểu thấu đáo về nguyên nhân, nguồn gốc bệnh, cách phòng trừ và phương pháp chữa trị. Việc giúp cho bệnh nhân trở thành một bác sỹ của chính bản thân đã là chuẩn mực trong chăm sóc sức khỏe đẳng cấp Quốc tế, và điều này là cam kết của chúng tôi.</p>
      `,
      speciality: `<ul>
      <li>Đa khoa</li>
    </ul>`,
      degree: `<ul>
        <li><strong>1996</strong>Bác sĩ chuyên khoa 2</li>
      </ul>`,
      associationAward: `<ul>
        <li><strong>2004</strong>Tham gia hiệp hội Y khoa ABC</li>
        <li><strong>2006</strong>Giải thưởng Y khoa XYZ</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Bệnh viện Nhiệt đới TP.HCM",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/nd.png",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
      {

        userId: "hos-005",
        userType: "hospital",
        name: "Phòng khám Nội tổng hợp",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/pknoi.jpeg",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
    ],
    worktime: [
      {
        label: 'Thứ 2'
      }
    ],
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    indoorMap: [
      { label: "Tầng trệt", img: "/img/indoor/g.jpg" },
      { label: "Tầng 1", img: "/img/indoor/f1.jpg" },
      { label: "Tầng 2", img: "/img/indoor/f2.jpg" },
      { label: "Tầng 3", img: "/img/indoor/f3.jpg" },
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
    facilities: [
      {
        facilitiesName: "1",
        address: "37-39 Lương Định Của, P. Bình An, Quận 2",
        phone: "0904 748 808 - 0904 748 808",
      },
      {
        facilitiesName: "2",
        address: "20-20Bis-22 Đinh Tiên Hoàng, P. Đa Kao, Quận 1",
        phone: "0934 744 218",
      },
      {
        facilitiesName: "3",
        address: "135A Nguyễn Văn Trỗi, P.12, Q. Phú Nhuận",
        phone: "0334 456 874",
      },
      {
        facilitiesName: "4",
        address: "1056 Nguyễn Văn Linh, Sky Garden 1, Phú Mỹ Hưng, Quận 7",
        phone: "0524 336 234",
      },
    ]
  },
  {
    userId: "hos-001",
    userType: "hospital",
    name: "Bệnh viện Nhi đồng I",
    degree: "",
    speciality: "Nhi khoa",
    avatar: "/img/user/nhi-dong-1.png",
    address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
    phone: ["028 3927 1119"],
    email: ["bvnhidong@nhidong.org.vn"],
    socialContact: [
      {
        name: "facebook",
        icon: "facebook",
        link: "https://www.facebook.com/nhidong1.tphcm",
      },
      {
        name: "youtube",
        icon: "youtube",
        link: "",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        link: "",
      },
      {
        name: "website",
        icon: "web-1",
        link: "https://nhidong.org.vn",
      },
    ],
    traffic: { // Daily / Weekly / Monthly / ...
      like: 7,
      search: 10,
      view: 6,
      visit: 12,
      post: 3,
    },
    statistic: { // Overall
      yearExp: 40,
      like: 631,
      search: 100,
      view: 97,
      visit: 1265,
      post: 34,
      feedback: 25,
    },
    intro: {
      exp: `<p>Được xây dựng trên khu  đất địa chỉ số 2 đường Sư Vạn Hạnh, phía đông giáp đường Sư Vạn Hạnh, phía nam giáp đường Lý Thái Tổ, phía bắc giáp đường Trần Quốc Toản (nay là đường 3 tháng 2), phía tây giáp một cơ sở quân sự, diện tích chung là 15.473 m2, khởi công từ ngày 22 tháng 02 năm 1954 và đưa vào sử dụng với tên gọi là Bệnh viện Nhi Đồng vào cuối tháng 10 năm 1956, với cơ sở trang bị phục vụ cho 268 giường bệnh gồm: một khu khám ngoại trú, một toà nhà 3 tầng lầu (thuộc khu AB hiện tại) là khu nội trú, 2 toà nhà 2 tầng làm cư xá cho nữ tu sĩ và nữ y tá độc thân, 2 toà nhà 2 tầng lầu làm cư xá cho bác sĩ Giám đốc, các bác sĩ thường trú và nhân viên quản lý bệnh viện.</p>
      <p>Đến năm 1966, bệnh viện phát triển thêm một toà nhà 3 tầng lầu chia ra làm 6 trại bệnh với 162 giường (thuộc khu CD hiện tại) bổ sung vào khu điều trị nội trú. Một số cơ sở khác cũng được khởi công xây cất: nhà tiền chế làm phòng Vật lý trị liệu, khu vệ sinh công cộng và một toà nhà một tầng lầu nối khu nhà AB và khu nhà CD sử dụng cho khoa Bào chế dược, X quang và Xét nghiệm. Năm 1967, xây thêm một nhà giữ trẻ em lành mạnh. Đầu năm 1975, Quỹ Nhi đồng Liên Hiệp quốc viện trợ thiết lập một trung tâm tiếp nhận thiếu nhi bất túc, trang bị 27 giường, nâng tổng số giường bệnh lên 457 giường gồm 268 giường miễn phí, 162 giường thu phí và 27 giường thiếu nhi “bất túc”.</p>
      <p>Trước 30/04/1975, Bệnh viện Nhi Đồng là bệnh viện chuyên khoa Nhi duy nhất cho cả miền Nam điều trị cho bệnh nhi từ sơ sinh đến 12 tuổi về nội, ngoại khoa và các chuyên khoa khác của nhi. Bệnh viện còn là nơi giảng dạy cho sinh viên y khoa, học viên của trường Quản lý, thủ thư bệnh viện, cán sự y tế, cán sự điều dưỡng, Nữ hộ sinh, Tá viên y tế các ngành.</p>
      `,
      degree: "",
      associationAward: `<ul>
        <li><strong>2009</strong>Huân chương Độc lập hạng ba</li>
        <li><strong>2000</strong>Anh hùng Lao động thời kỳ đổi mới</li>
        <li><strong>1993</strong>Huân chương Lao động hạng nhất</li>
        <li><strong>1985</strong>Huân chương Lao động hạng hai</li>
        <li><strong>1983</strong>Huân chương Độc lập hạng ba</li>
        <li><strong>2000</strong>Huân chương Lao động hạng ba</li>
        <li><strong>2000</strong>Bệnh viện Bạn hữu trẻ em</li>
        <li><strong>2008</strong>Cờ truyền thống 50 năm Bệnh viện NĐ1</li>
      </ul>`
    },
    service: [
      {
        speciality: "Khám bệnh",
        services: [
          { name: "Khám chuyên khoa - lần đầu", price: 150000 },
          { name: "Khám chuyên khoa - tái khám", price: 100000 },
          { name: "Phí khám cấp cứu", price: 170000 },
        ]
      }, {
        speciality: "Xét nghiệm sinh hóa - miễn dịch",
        services: [
          { name: "Creatinin, máu", price: 85000 },
          { name: "BUN máu", price: 65000 },
          { name: "Cholesterol Total", price: 65000 },
          { name: "HDL- Cholesterol", price: 65000 },
        ]
      }, {
        speciality: "Chẩn đoán hình ảnh",
        services: [
          { name: "Chụp X-quang", price: 210000 },
          { name: "CT không tiêm thuốc tương phản", price: 1950000 },
          { name: "CT có tiêm thuốc tương phản", price: 2600000 },
          { name: "Siêu âm", price: 460000 },
          { name: "MRI không tiêm thuốc tương phản", price: 2700000 },
          { name: "MRI có tiêm thuốc tương phản", price: 3600000 },
        ]
      }
    ],
    rating: [
      {
        author: {
          avatar: "/img/user/user-7.jpg",
          name: "Nghiêm Hoàng Lan Phương"
        },
        publishDate: "20/02/2021",
        isAgreeRecommend: true,
        service: "Khám chuyên khoa - lần đầu",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }, {
        author: {
          avatar: "/img/user/user-8.jpg",
          name: "Nguyễn Hoàng Chung"
        },
        publishDate: "17/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholestero",
        content: "Phòng khám sạch sẽ, Bác sĩ thân thiện",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-9.jpg",
          name: "Trần Ngọc Triều"
        },
        publishDate: "13/01/2021",
        isAgreeRecommend: true,
        service: "CT không tiêm thuốc tương phản",
        content: "Bác sĩ rất tận tình giải thích, tác phong làm việc chuyên nghiệp, cảm ơn bác sĩ rất nhiều",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 0
      }, {
        author: {
          avatar: "/img/user/user-5.jpg",
          name: "Tô Thiện Công"
        },
        publishDate: "10/01/2021",
        isAgreeRecommend: true,
        service: "HDL- Cholesterol",
        content: "Bác sĩ thân thiện. Điều trị không đau. Giải thích đúng về quy trình hoàn chỉnh. Không mất nhiều thời gian chờ đợi. Tài liệu rất tốt và tất cả các biện pháp an toàn quan trọng đã được tuân thủ",
        reply: "Cảm ơn bạn rất nhiều",
        vote: 1
      }
    ],
    workplace: [
      {
        userId: "hos-005",
        userType: "hospital",
        name: "Bệnh viện Nhiệt đới TP.HCM",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/nd.png",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
          feedback: 25,
        },
      },
      {

        userId: "hos-005",
        userType: "hospital",
        name: "Phòng khám Nội tổng hợp",
        degree: "",
        speciality: "Nhi khoa",
        avatar: "/img/user/pknoi.jpeg",
        address: "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
        phone: ["090 365 2829"],
        fax: [],
        traffic: { // Daily / Weekly / Monthly / ...
          like: 7,
          search: 10,
          view: 6,
          visit: 12,
          post: 3,
        },
        statistic: { // Overall
          yearExp: 40,
          like: 631,
          search: 100,
          view: 97,
          visit: 1265,
          post: 34,
        },
      },
    ],
    worktime: [
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" },
      { start: "17:00", end: "20:00" }
    ],
    gallery: [
      { img: "/img/gallery/pic-1.jpg" },
      { img: "/img/gallery/pic-2.jpg" },
      { img: "/img/gallery/pic-3.jpg" },
      { img: "/img/gallery/pic-4.jpg" },
      { img: "/img/gallery/pic-5.jpg" },
      { img: "/img/gallery/pic-6.jpg" }
    ],
    indoorMap: [
      { label: "Tầng trệt", img: "/img/indoor/g.jpg" },
      { label: "Tầng 1", img: "/img/indoor/f1.jpg" },
      { label: "Tầng 2", img: "/img/indoor/f2.jpg" },
      { label: "Tầng 3", img: "/img/indoor/f3.jpg" },
    ],
    qa: [
      {
        author: {
          avatar: "/img/user/user-3.jpg",
          name: "Nguyễn Quỳnh",
        },
        publishDate: "13/02/2021",
        service: "Khám nhi",
        content: "Tôi bị hoa mắt, chóng mặt khi đột ngột đứng dậy là bị gì vậy Bác sĩ?",
        reply: "Huyết áp thấp đúng là nguyên nhân gây thiếu máu não nhưng thiếu máu não với đột quỵ là khác nhau. Đột quỵ não rất nặng nề và mất chức năng não bộ ngay lập tức. Thiếu máu não không gây triệu chứng đột ngột và nặng nề như vậy.",
        vote: 7
      }, {
        author: {
          avatar: "/img/user/user-1.jpg",
          name: "Bùi Thanh Thủy",
        },
        publishDate: "20/02/2021",
        service: "Khám nhi",
        content: "Trẻ bị đổ mồ hôi trộm ướt hết người, bé có bị thiếu vitamin D ko Bác sĩ?",
        reply: "Hiện tượng đổ mồ hôi là một biểu hiện của hoạt động điều hòa thân nhiệt nhằm cân bằng nhiệt độ cơ thể. Thông thường, chúng ta sẽ có đổ mô hôi do thời tiết bên ngoài nóng. Tuy nhiên, chúng ta vẫn có thể đổ mồ hôi ngay cả khi thời tiết mát mẻ. Ví dụ như khi bị sốt, căng thẳng, hoảng sợ, một số bệnh rối loạn nội tiết tố…Do vậy bản thân dấu chứng đổ mồ hôi chỉ là hiện tượng chứ không phải là bệnh gốc. \nỞ trẻ 6 tháng, các phản ứng sinh hóa thường mạnh vì trẻ đang phát triển. Điều này có thể dẫn đến thân nhiệt của trẻ cao và xuất hiện mồ hôi. Ngoài ra, những bệnh nhiễm siêu vi tiêu hóa cũng bắt đầu xuất hiện ở trẻ 4 tháng… Việc điều trị cần phải nhắm đến nguyên nhân và cần được thăm khám chi tiết. \nViệc tắm nắng không thể xem là phương pháp điều trị chứng mồ hôi khi mà nguyên nhân chưa rõ ràng. Theo tôi thì không cần phải có chế độ ăn đặt biệt cho trẻ. Tuy nhiên, bé cần được bác sĩ đánh giá để phát hiện nguyên nhân gây bệnh và có thể điều trị kịPhường",
        vote: 7
      }
    ],
    facilities: [],
  },
]


// Tabs collection by user type
export const TABS_BY_USER_TYPE = {
  doctor: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Câu hỏi"],
  hospital: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
  clinic: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
  user: ["Bảng tin", "Danh sách yêu thích", "Lịch sử khám bệnh", "Câu hỏi của bạn"],
}
export const TABS_BY_USER_TYPE_RES = {
  doctor: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Câu hỏi", "Nơi công tác"],
  hospital: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
  clinic: ["Giới thiệu", "Dịch vụ", "Đánh giá", "Giờ làm việc", "Hình ảnh", "Sơ đồ", "Câu hỏi"],
  user: ["Bảng tin", "Danh sách yêu thích", "Lịch sử khám bệnh", "Câu hỏi của bạn", "Lịch hẹn của bạn", "Lịch sử hoạt động"],
}


// Common filter
export const TYPE = [
  { value: "*", label: "Tất cả" },
  { value: "bv", label: "Bệnh viện" },
  { value: "pk", label: "Phòng khám" },
  { value: "bs", label: "Bác sĩ" },
  { value: "news", label: "Tin tức" },
  { value: "vid", label: "Video" },
];
export const DISTRICT = [
  { value: "*", label: "Tất cả" },
  { value: "hochiminh-1", label: "Quận 1" },
  { value: "hochiminh-2", label: "Quận 2" },
  { value: "hochiminh-3", label: "Quận 3" },
  { value: "hochiminh-4", label: "Quận 4" },
  { value: "hanoi-dongda", label: "Quận Đống Đa" },
  { value: "hanoi-hoankiem", label: "Quận Hoàn Kiếm" },
  { value: "hanoi-hoangmai", label: "Quận Hoàng Mai" },
  { value: "hanoi-haibatrung", label: "Quận Hai Bà Trưng" },
];
export const CITY = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hochiminh", label: "TP. HCM" },
];


// Advanced filter
export const WEEKDAY = [
  { value: "*", label: "Tất cả" },
  { value: "t2", label: "Thứ 2" },
  { value: "t3", label: "Thứ 3" },
  { value: "t4", label: "Thứ 4" },
  { value: "t5", label: "Thứ 5" },
  { value: "t6", label: "Thứ 6" },
  { value: "t7", label: "Thứ 7" },
  { value: "cn", label: "Chủ nhật" },
];
export const TIME = [
  { value: "*", label: "Tất cả" },
  { value: "time1", label: "08:30 - 11:00" },
  { value: "time2", label: "13:30 - 16:00" },
  { value: "time3", label: "17:30 - 20:00" },
];
export const PRICE = [
  { value: "*", label: "Tất cả" },
  { value: "price1", label: "50,000 - 100,000" },
  { value: "price2", label: "100,000 - 200,000" },
  { value: "price3", label: "200,000 - 300,000" },
];
export const RADIUS = [
  { value: "*", label: "Tất cả" },
  { value: "radius1", label: "0m - 100m" },
  { value: "radius2", label: "100m - 200m" },
  { value: "radius3", label: "200m - 300m" },
];

// Sample API
export const API_GET_HIGHLIGHT_NEWS = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 6,
  "data": [
    {
      "id": 1,
      "title": "Bị chó Bully hơn 30 kg tấn công, cụ bà 87 tuổi phải cắt cụt 1/3 cánh tay",
      "type": "article",
      "thumbnail": "/img/news/news-17.jpg",
      "author": {
        "name": "Bệnh viện Trung ương Quân đội 108",
        "avatar": "/img/user/108.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "16/3 khi sang nhà hàng xóm, bất ngờ cụ bà N.T.T, 87 tuổi, ở Ba Đình, Hà Nội bị chú chó Bully nặng hơn 30 kg lao vào tấn công",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "2",
      "title": "Nam thanh niên phải cắt cụt 4 ngón tay do máy dập bị lỗi",
      "type": "article",
      "thumbnail": "/img/news/news-18.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Sáng 22/3, Bệnh viện Hữu nghị Việt Đức cho biết bệnh nhân T.V.T, 21 tuổi, trú tại Thái Nguyên vào viện trong tình trạng dập nát các ngón 2,3,4,5 bàn tay trái, không thể bảo tồn. Tình trạng đáng tiếc xảy ra khi bệnh nhân đang vận hành máy dập.",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "4",
      "title": "Viêm họng hạt, làm sao điều trị dứt điểm?",
      "type": "video",
      "thumbnail": "/img/news/top-article-3.jpg",
      "author": {
        "name": "Bệnh viện Chợ Rẫy",
        "avatar": "/img/user/cho-ray.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Viêm họng hạt là một dạng của viêm họng mạn tính. Bệnh viêm họng mạn tính không phải là bệnh nan y, nhưng lại cần thời gian điều trị kéo dài, bệnh dễ tái phát",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "5",
      "title": "Mỹ lo ngại về 2 biến thể phát hiện tại bang California và thành phố New York",
      "type": "video",
      "thumbnail": "/img/news/news-20.jpg",
      "author": {
        "name": "Bệnh viện Nhân dân Gia Định",
        "avatar": "/img/user/gia-dinh.png"
      },
      "publishDate": "5 phút trước",
      "desc": "Biến thể bang California và biến thể được phát hiện tại thành phố New York là hai biến thể gây lo ngại ở nước Mỹ. Chúng có các điểm tương đồng với biến thể Nam Phi và Brazil.",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "6",
      "title": "Tìm lại ánh sáng cho người đàn ông bán vé số",
      "type": "article",
      "thumbnail": "/img/news/news-22.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "2 giờ trước",
      "desc": "Bệnh nhân nam 51 tuổi, sống độc thân, bán vé số, mắt trái mất đi ánh sáng từ lâu, mắt phải mờ từ từ, không đủ điều kiện kinh tế nên chịu đựng.",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "7",
      "title": "Người phụ nữ chạy xe máy bị dây diều cứa ngang cổ",
      "type": "article",
      "thumbnail": "/img/news/news-21.jpg",
      "author": {
        "name": "Bệnh viện Chợ Rẫy",
        "avatar": "/img/user/cho-ray.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Chị Ngân, 32 tuổi, chạy xe máy ngang Đại lộ Vòng Cung, quận 2, bị sợi dây diều rơi vướng ngang cổ, kéo khoảng 2m rồi ngã xuống đường.",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    }
  ]
}

export const API_GET_LATEST_NEWS = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 5,
  "data": [
    {
      "id": "1",
      "title": "Nhiễm trùng đường tiểu nhiều lần, bé trai nguy cơ suy thận",
      "type": "article",
      "thumbnail": "/img/news/latest-news.png",
      "author": {
        "name": "Bệnh viện Nhi đồng 2",
        "avatar": "/img/user/nhi-dong-2.png"
      },
      "publishDate": "5 phút trước",
      "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản)",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "2",
      "title": "Vaccine COVID-19 thứ 2 của Việt Nam được thử nghiệm trên người ra sao",
      "type": "article",
      "thumbnail": "/img/news/latest-news-1.png",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "3",
      "title": "Bị cua kẹp, tự đắp thuốc nam, người đàn ông bị biến chứng nguy kịch",
      "type": "article",
      "thumbnail": "/img/news/latest-news-2.png",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "4",
      "title": "Điều gì xảy ra khi bạn ăn một quả táo mỗi ngày?",
      "type": "video",
      "thumbnail": "/img/news/latest-news-3.png",
      "author": {
        "name": "Bệnh viện Nhân dân Gia Định",
        "avatar": "/img/user/gia-dinh.png"
      },
      "publishDate": "5 phút trước",
      "desc": "",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "5",
      "title": "10 loại thực phẩm và đồ uống hàng đầu giúp gan khỏe mạnh",
      "type": "article",
      "thumbnail": "/img/news/latest-news-4.png",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "",
      "slug": "/news/",
      "view": 1000,
      "comments": {
        "length": 20
      }
    }
  ]
}

export const API_GET_MOSTVIEW_NEWS = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 6,
  "data": [
    {
      "id": "1",
      "title": "Bị chó Bully hơn 30 kg tấn công, cụ bà 87 tuổi phải cắt cụt 1/3 cánh tay",
      "type": "article", "thumbnail": "/img/news/news-17.jpg",
      "author": {
        "name": "Bệnh viện Trung ương Quân đội 108",
        "avatar": "/img/user/108.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "16/3 khi sang nhà hàng xóm, bất ngờ cụ bà N.T.T, 87 tuổi, ở Ba Đình, Hà Nội bị chú chó Bully nặng hơn 30 kg lao vào tấn công",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "2",
      "title": "Nam thanh niên phải cắt cụt 4 ngón tay do máy dập bị lỗi",
      "type": "article", "thumbnail": "/img/news/news-18.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Sáng 22/3, Bệnh viện Hữu nghị Việt Đức cho biết bệnh nhân T.V.T, 21 tuổi, trú tại Thái Nguyên vào viện trong tình trạng dập nát các ngón 2,3,4,5 bàn tay trái, không thể bảo tồn. Tình trạng đáng tiếc xảy ra khi bệnh nhân đang vận hành máy dập.",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "3",
      "title": "Vắc xin COVID-19 của Johnson & Johnson được Mỹ chấp thuận, WHO khuyến cáo sử dụng",
      "type": "article", "thumbnail": "/img/news/news-19.jpg",
      "author": {
        "name": "Bệnh viện Hoàn Mỹ",
        "avatar": "/img/user/hoan-my.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Các chuyên gia của Tổ chức Y tế Thế giới (WHO) cho biết, vắc xin corona virus Johnson & Johnson an toàn để sử dụng cho những người trên 18 tuổi. Theo dõi lâm sàng trên các bệnh nhân đã được chủng ngừa loại vắc xin này cho thấy một số ít người bị chích có dấu hiệu đông máu.",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "4",
      "title": "Mỹ lo ngại về 2 biến thể phát hiện tại bang California và thành phố New York",
      "type": "video", "thumbnail": "/img/news/news-20.jpg",
      "author": {
        "name": "Bệnh viện Nhân dân Gia Định",
        "avatar": "/img/user/gia-dinh.png"
      },
      "publishDate": "5 phút trước",
      "desc": "Biến thể bang California và biến thể được phát hiện tại thành phố New York là hai biến thể gây lo ngại ở nước Mỹ. Chúng có các điểm tương đồng với biến thể Nam Phi và Brazil.",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "5",
      "title": "Quảng Bình: 3 học sinh nhập viện sau khi thổi kẹo bong bóng",
      "type": "article", "thumbnail": "/img/news/news-16.jpg",
      "author": {
        "name": "Bệnh viện Chợ Rẫy",
        "avatar": "/img/user/cho-ray.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Sau khi thổi kẹo bong bóng được mua ở một tiệm tạp hóa trước cổng trường, 3 học sinh đã bị ngộ độc phải nhập viện trong tình trạng khó thở, buồn nôn, chóng mặt…",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    },
    {
      "id": "6",
      "title": "Chủng virus SARS-CoV-2 mới phát hiện ở bang California đang “gây lo ngại”; các nước thận trọng khi cho tiêm lại vắc xin AstraZeneca",
      "type": "article", "thumbnail": "/img/news/news-15.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Trung tâm Kiểm soát và Phòng ngừa Dịch bệnh Mỹ (CDC) cho biết hai chủng virus SARS-CoV-2 vừa được phát hiện ở bang California đang là “biến thể gây lo ngại”.",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }
  ]
}

export const API_GET_INFOGRAPHIC_NEWS = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 4,
  "data": [
    {
      "id": "1",
      "title": "Rửa tay bằng xà phòng đúng cách để phòng bệnh, dịch",
      "thumbnail": "/img/news/infographic-1.jpg",
      "author": {
        "name": "Bệnh viện Nhân dân Gia Định",
        "avatar": "/img/user/gia-dinh.png"
      },
      "publishDate": "5 phút trước",
      "desc": "Thêm 17 người được tiêm thử nghiệm Nanocovax liều 25 mcg, sáng 22/12 tại Học viện Quân y. Sau khi tiêm vaccine, họ ở lại, sáng 22/12 tại Học viện Quân y...",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "2",
      "title": "Rửa tay bằng xà phòng đúng cách để phòng bệnh, dịch",
      "thumbnail": "/img/news/infographic-3.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Dùng thuốc kháng sinh đúng cách sẽ mang lại hiệu quả điều trị cao các bệnh lý nhiễm trùng do vi khuẩn gây ra. Ngược lại điều trị cao các bệnh lý nhiễm trùng...",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "3",
      "title": "50 Sự thật khó tin về tóc",
      "thumbnail": "/img/news/infographic-2.jpg",
      "author": {
        "name": "Bệnh viện Bình Dân",
        "avatar": "/img/user/binhdan.jpg"
      },
      "publishDate": "5 phút trước",
      "desc": "Mất kiểm soát cân nặng và không có thời gian tập gym là câu chuyện khiến ai cũng rơi vào tình trạng stress về giảm cân không có thời gian tập gym là câu...",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }, {
      "id": "4",
      "title": "Bộ Y tế hướng dẫn đeo khẩu trang đúng cách đề phòng virus Corona",
      "thumbnail": "/img/news/infographic-4.jpg",
      "author": {
        "name": "Bệnh viện Nhân dân Gia Định",
        "avatar": "/img/user/gia-dinh.png"
      },
      "publishDate": "5 phút trước",
      "desc": "Thuốc uống tránh thai là phương pháp kiểm soát sinh sản phổ biến nhất hiện nay với nhiều ưu điểm. Nhưng mỗi độ tuổi sẽ kiểm soát sinh sản phổ biến nhất...",
      "slug": "/news/", "view": 1000,
      "comments": {
        "length": 20
      }
    }
  ]
}

export const API_GET_NEWS_BY_CATEGORY = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 6,
  "data": [
    {
      "categoriesName": "Covid-19",
      "articles": [
        {
          "id": "1",
          "title": "Quảng Ninh hoàn tất truy vết, cách ly người tiếp xúc với ca nghi mắc COVID-19",
          "type": "article", "thumbnail": "/img/news/covid-19.png",
          "author": {
            "name": "Bệnh viện Nhi đồng 2",
            "avatar": "/img/user/nhi-dong-2.png"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "Chính phủ xem xét việc dừng chuyến bay từ các vùng có biến thể nCoV",
          "type": "article", "thumbnail": "/img/news/covid-19-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "CDC Hà Nội nói về nguy cơ lây nhiễm của ca dương tính sau khi rời khu cách ly",
          "type": "article", "thumbnail": "/img/news/covid-19-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }, {
      "categoriesName": "Y tế 24h",
      "articles": [
        {
          "id": "1",
          "title": "Hội nghị Nhi Khoa năm 2020 của Bệnh viện Nhi Đồng 1",
          "type": "article", "thumbnail": "/img/news/y-te-24h.png",
          "author": {
            "name": "Bệnh viện Nhi đồng 2",
            "avatar": "/img/user/nhi-dong-2.png"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "Hội thảo đánh giá hoạt động thông tin điện tử 2020",
          "type": "article", "thumbnail": "/img/news/y-te-24h-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "Người kiên trì kiến tạo hệ sinh thái y tế",
          "type": "article", "thumbnail": "/img/news/y-te-24h-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }, {
      "categoriesName": "Sống khỏe",
      "articles": [
        {
          "id": "1",
          "title": "Vai trò của các loại thực phẩm giúp tăng sức đề kháng phòng dịch bệnh",
          "type": "article", "thumbnail": "/img/news/song-khoe.png",
          "author": {
            "name": "Bệnh viện Nhi đồng 2",
            "avatar": "/img/user/nhi-dong-2.png"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "5 loại trà giúp giảm cân và có lợi cho sức khỏe",
          "type": "article", "thumbnail": "/img/news/song-khoe-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "7 cách giảm cân đơn giản và hiệu quả nhanh",
          "type": "article", "thumbnail": "/img/news/song-khoe-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }, {
      "categoriesName": "Vac-xin",
      "articles": [
        {
          "id": "1",
          "title": "Bệnh Whitmore là gì?",
          "type": "article", "thumbnail": "/img/news/vacxin.png",
          "author": {
            "name": "Bệnh viện Nhi đồng 2",
            "avatar": "/img/user/nhi-dong-2.png"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "Bệnh sởi và những nguy cơ tiềm ẩn",
          "type": "article", "thumbnail": "/img/news/vacxin-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "Tại sao kháng sinh không tiêu diệt được virus?",
          "type": "article", "thumbnail": "/img/news/vacxin-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }, {
      "categoriesName": "Mẹ và bé",
      "articles": [
        {
          "id": "1",
          "title": "Viêm phổi ở trẻ khi nhiễm lạnh",
          "type": "article", "thumbnail": "/img/news/me-va-be.png",
          "author": {
            "name": "Bệnh viện Nhi đồng 2",
            "avatar": "/img/user/nhi-dong-2.png"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "Chăm sóc răng miệng đúng cách cho trẻ nhỏ",
          "type": "article", "thumbnail": "/img/news/me-va-be-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "Chăm sóc trẻ như thế nào trong mùa dịch bệnh",
          "type": "article", "thumbnail": "/img/news/me-va-be-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }, {
      "categoriesName": "Sức khỏe giới tính",
      "articles": [
        {
          "id": "1",
          "title": "Tuổi 20, 30 và 40: Bạn nên lựa chọn thuốc tránh thai thế nào?",
          "type": "article", "thumbnail": "/img/news/suc-khoe-gioi-tinh.png",
          "author": {
            "name": "Bệnh viện Chợ Rẫy",
            "avatar": "/img/user/cho-ray.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "Mới 3 tháng tuổi, bệnh nhi bị nhiễm trùng tiểu nhiều lần và được các bác sỹ phát hiện hẹp đường dẫn nước tiểu bẩm sinh (hẹp khúc nối bể thận- niệu quản) và đã được phẫu thuật sữa chữa. Sau ca mổ, chức năng thận...",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "2",
          "title": "Tại sao đau bụng kinh: 6 nguyên nhân chị em cần cảnh giác!",
          "type": "article", "thumbnail": "/img/news/suc-khoe-gioi-tinh-1.png",
          "author": {
            "name": "Bệnh viện Bình Dân",
            "avatar": "/img/user/binhdan.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }, {
          "id": "3",
          "title": "Những điều cần lưu ý về bệnh herpes sinh dục",
          "type": "article", "thumbnail": "/img/news/suc-khoe-gioi-tinh-2.png",
          "author": {
            "name": "Bệnh viện 108",
            "avatar": "/img/user/108.jpg"
          },
          "publishDate": "5 phút trước",
          "desc": "",
          "slug": "/news/", "view": 1000,
          "comments": {
            "length": 20
          }
        }
      ]
    }
  ]
}

export const API_GET_NEWS_CATEGORY = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 7,
  "data": [
    {
      "id": "",
      "icon": "virus",
      "categoryItem": "COVID-19",
      "link": "/news/category"
    },
    {
      "icon": "love",
      "categoryItem": "Y tế 24h",
      "link": ""
    },
    {
      "icon": "healthcare",
      "categoryItem": "Sống khỏe",
      "link": ""
    },
    {
      "icon": "vaccine",
      "categoryItem": "Vac-xin",
      "link": ""
    },
    {
      "icon": "mother-with-baby-in-arms",
      "categoryItem": "Mẹ và bé",
      "link": ""
    },
    {
      "icon": "life-guard-tool",
      "categoryItem": "Kỹ năng sống",
      "link": ""
    },
    {
      "icon": "gender-symbols",
      "categoryItem": "Sức khỏe giới tính",
      "link": ""
    }
  ]
}

export const API_GET_COMMON_DISEASE = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 34,
  "data": [
    {
      "title": "Trẻ em",
      "link": "/"
    }, {
      "title": "Tuổi teen",
      "link": "/"
    }, {
      "title": "Phụ nữ",
      "link": "/"
    }, {
      "title": "Mẹ & con",
      "link": "/"
    }, {
      "title": "Nam giới",
      "link": "/"
    }, {
      "title": "Lão khoa",
      "link": "/"
    }, {
      "title": "Bệnh nghề nghiệp",
      "link": "/"
    }, {
      "title": "Cảm cúm",
      "link": "/"
    }, {
      "title": "Cấy ghép tạng",
      "link": "/"
    }, {
      "title": "Cơ - xương - khớp",
      "link": "/"
    }, {
      "title": "Chấn thương chỉnh hình",
      "link": "/"
    }, {
      "title": "Da - Tóc - Da liễu",
      "link": "/"
    }, {
      "title": "Di truyền",
      "link": "/"
    }, {
      "title": "Dị ứng - Mề đay",
      "link": "/"
    }, {
      "title": "Giải độc - Chống độc",
      "link": "/"
    }, {
      "title": "Hô hấp",
      "link": "/"
    }, {
      "title": "Huyết học",
      "link": "/"
    }, {
      "title": "Mắt",
      "link": "/"
    }, {
      "title": "Ngoại khoa",
      "link": "/"
    }, {
      "title": "Nội tiết - Tiểu đường",
      "link": "/"
    }, {
      "title": "Nội thần kinh",
      "link": "/"
    }, {
      "title": "Ngoại thần kinh",
      "link": "/"
    }, {
      "title": "Phổi",
      "link": "/"
    }, {
      "title": "Răng - Nha khoa",
      "link": "/"
    }, {
      "title": "Hàm - mặt",
      "link": "/"
    }, {
      "title": "Tai mũi họng",
      "link": "/"
    }, {
      "title": "Tâm lý - Tâm thần",
      "link": "/"
    }, {
      "title": "Thận",
      "link": "/"
    }, {
      "title": "Tiết niệu",
      "link": "/"
    }, {
      "title": "Tiêu hóa",
      "link": "/"
    }, {
      "title": "Tim mạch",
      "link": "/"
    }, {
      "title": "Tự miễn",
      "link": "/"
    }, {
      "title": "Truyền nhiễm",
      "link": "/"
    }, {
      "title": "Ung thư",
      "link": "/"
    }
  ]
}

export const API_GET_LIVESTREAM_EVENT = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 4,
  "data": [
    {
      "id": "1",
      "title": "Cách phòng tránh, xử lý chấn thương thể thao",
      "thumbnail": "/img/news/live-stream.jpg",
      "date": "CN, 30/01/2021 vào 9:30",
      "attendee": "503",
      "url": "/"
    }, {
      "id": "2",
      "title": "Tầm soát ung thư tiêu hóa có quá khó!?",
      "thumbnail": "/img/news/live-stream-1.jpg",
      "date": "T2, 01/02/2021 vào 9:30",
      "attendee": "539",
      "url": "/"
    }, {
      "id": "3",
      "title": "Những ca bệnh nội tiêu hóa bên lằn ranh sinh tử",
      "thumbnail": "/img/news/live-stream-2.jpg",
      "date": "CN, 30/01/2021 vào 9:30",
      "attendee": "503",
      "url": "/"
    },
    {
      "id": "4",
      "title": "Những ca bệnh nội tiêu hóa bên lằn ranh sinh tử",
      "thumbnail": "/img/news/live-stream-1.jpg",
      "date": "CN, 30/01/2021 vào 9:30",
      "attendee": "503",
      "url": "/"
    }
  ]
}

export const API_GET_TOP_FORUM = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 2,
  "data": [
    {
      "title": "Bị viêm xoang hành đến mất ngủ, có ai đồng cảnh ngộ không?",
      "link": "/forum/post",
      "author": {
        "userId": "user005",
        "name": "Nguyễn Mai Hương",
        "avatar": "/img/user/user-1.jpg",
      }
    }, {
      "title": "Lỡ lịch chích ngừa cho con, có nên cho con đi chích bù hay bỏ luôn?",
      "link": "/forum/post",
      "author": {
        "userId": "user006",
        "name": "Ngô Việt Hùng",
        "avatar": "/img/user/user-9.jpg",
      }
    }
  ]
}

export const API_GET_TOP_DOCTOR = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 4,
  "data": [
    {
      "userId": "doc-001",
      "userType": "doctor",
      "name": "Nguyễn Thế Dũng",
      "degree": "BS.CKII",
      "speciality": "Nội tổng hợp",
      "avatar": "/img/user/thedung.png",
      "address": "306 Nguyễn Sơn, Phường Phú Thọ Hòa, Quận Tân Phú, TP. HCM",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 631,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 34,
        "feedback": 27
      }
    },
    {
      "userId": "doc-002",
      "userType": "doctor",
      "name": "Nguyễn Thu Hoài",
      "degree": "BS.CKII",
      "speciality": "Sản khoa",
      "avatar": "/img/user/thuhoai.jpg",
      "address": "458 Minh Khai, Vĩnh Tuy, Hà Nội",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 492,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 27
      }
    },
    {
      "userId": "doc-003",
      "userType": "doctor",
      "name": "Nghiêm Hoàng Lan Phương",
      "degree": "THS.BS.CKII",
      "speciality": "Tim mạch",
      "avatar": "/img/user/lanphuong.jpg",
      "address": "216 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 218,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 83
      }
    },
    {
      "userId": "doc-004",
      "userType": "doctor",
      "name": "Hoàng Lương",
      "degree": "TS.BS.CKII",
      "speciality": "Nội tiết",
      "avatar": "/img/user/hoangluong.jpg",
      "address": "132 Phạm Phú Thứ, Phường 4, Quận 6, TP. HCM",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 209,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 42
      }
    }
  ]
}

export const API_GET_TOP_HOSPITAL = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 4,
  "data": [
    {
      "userId": "hos-001",
      "userType": "hospital",
      "name": "Bệnh viện Nhi đồng I",
      "degree": "",
      "speciality": "Nhi khoa",
      "avatar": "/img/user/nhi-dong-1.png",
      "address": "341 Sư Vạn Hạnh, Phường 10, Quận 10, TP. HCM",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 536,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 34,
        "feedback": 67
      }
    },
    {
      "userId": "hos-002",
      "userType": "hospital",
      "name": "Bệnh viện Trung ương Quân đội 108",
      "degree": "",
      "speciality": "Đa khoa",
      "avatar": "/img/user/108.jpg",
      "address": "Số 1 Trần Hưng Đạo, Quận Hai Bà Trưng, Hà Nội",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 492,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 583
      }
    },
    {
      "userId": "cli-001",
      "userType": "clinic",
      "name": "Phòng khám Nhi khoa Nhi Việt",
      "degree": "",
      "speciality": "Nhi khoa",
      "avatar": "/img/user/nhiviet.png",
      "address": "61E dốc bệnh viện Nhi Trung Ương, 879 Đê La Thành, Đống Đa, Hà Nội",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 182,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 240
      }
    },
    {
      "userId": "cli-002",
      "userType": "clinic",
      "name": "Phòng khám Quốc tế Victoria Healthcare",
      "degree": "",
      "speciality": "Đa khoa",
      "avatar": "/img/user/victoria.jpg",
      "address": "20-20 Bis-22 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP. HCM",
      "phone": ["090 365 2829"],
      "fax": [],
      "traffic": {
        "like": 7,
        "search": 10,
        "view": 6,
        "visit": 12,
        "post": 3,
        "feedback": 7
      },
      "statistic": {
        "yearExp": 40,
        "like": 209,
        "search": 100,
        "view": 97,
        "visit": 1265,
        "post": 55,
        "feedback": 83
      }
    }
  ]
}

export const API_GET_COVID = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 12,
  "data": [
    {
      "label": "Thế giới",
      "infected": 93628842,
      "dead": 2004690
    }, {
      "label": "Hoa Kỳ",
      "infected": 23848410,
      "dead": 397994
    }, {
      "label": "Ấn Độ",
      "infected": 10543659,
      "dead": 152130
    }, {
      "label": "Bra-xin",
      "infected": 3520531,
      "dead": 64495
    }, {
      "label": "Nga",
      "infected": 3506019,
      "dead": 397994
    }, {
      "label": "VQ Anh",
      "infected": 3316019,
      "dead": 87295
    }, {
      "label": "Pháp",
      "infected": 2872941,
      "dead": 69949
    }, {
      "label": "Thổ Nhĩ Kỳ",
      "infected": 2373115,
      "dead": 23664
    }, {
      "label": "Thổ Nhĩ Kỳ",
      "infected": 2373115,
      "dead": 23664
    }, {
      "label": "Ý",
      "infected": 2352423,
      "dead": 81325
    }, {
      "label": "Tây Ban Nha",
      "infected": 2252164,
      "dead": 53314
    }, {
      "label": "Đức",
      "infected": 2023802,
      "dead": 46537
    }
  ]
}

export const API_GET_LATEST_VIDEO = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 15,
  "data": [
    {
      "thumbnail": "/img/news/news-4.jpg",
      "title": "Điều kỳ diệu sau chuyến bay giải cứu bệnh nhân ung thư giai đoạn cuối",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-5.jpg",
      "title": "Hội chứng khiến người bệnh khó chịu với tiếng nhai thức ăn",
      "duration": "1:34",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/115.png",
        "name": "Bệnh viện Nhân dân 115"
      }
    },
    {
      "thumbnail": "/img/news/news-6.jpg",
      "title": "Tôi cảm thấy con vẫn sống sau khi hiến tạng cứu người",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-7.jpg",
      "title": "Những thay đổi trên khuôn mặt tiết lộ các vấn đề về sức khỏe",
      "duration": "4:02",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/hoan-my.jpg",
        "name": "Bệnh viện Hoàn Mỹ"
      }
    },
    {
      "thumbnail": "/img/news/news-8.jpg",
      "title": "Bí quyết ăn uống giúp sống thọ của người Nhật Bản",
      "duration": "4:15",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/gia-dinh.png",
        "name": "Bệnh viện Nhân dân Gia Định"
      }
    },
    {
      "thumbnail": "/img/news/news-9.jpg",
      "title": "Tư thế ngủ nguy hiểm",
      "duration": "3:26",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/viet-duc.jpg",
        "name": "Bệnh viện Việt Đức"
      }
    },
    {
      "thumbnail": "/img/news/news-14.png",
      "title": "Nhân một trường hợp tật bẩm sinh thoát vị não",
      "duration": "5:29",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/nhi-dong-1.png",
        "name": "Bệnh viện Nhi đồng I"
      }
    },
    {
      "thumbnail": "/img/news/news-11.jpg",
      "title": "Khắc phục hiện tượng đồng vận do liệt dây thần kinh số 7",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-12.jpg",
      "title": "Dấu hiệu cảnh báo bạn cần bổ sung vitamin C",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-13.jpg",
      "title": "Thực phẩm tốt cho phổi bạn nên ăn thường xuyên",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-8.jpg",
      "title": "Bí quyết ăn uống giúp sống thọ của người Nhật Bản",
      "duration": "4:15",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/gia-dinh.png",
        "name": "Bệnh viện Nhân dân Gia Định"
      }
    },
    {
      "thumbnail": "/img/news/news-9.jpg",
      "title": "Tư thế ngủ nguy hiểm",
      "duration": "3:26",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/viet-duc.jpg",
        "name": "Bệnh viện Việt Đức"
      }
    },
    {
      "thumbnail": "/img/news/news-14.png",
      "title": "Nhân một trường hợp tật bẩm sinh thoát vị não",
      "duration": "5:29",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/nhi-dong-1.png",
        "name": "Bệnh viện Nhi đồng I"
      }
    },
    {
      "thumbnail": "/img/news/news-11.jpg",
      "title": "Khắc phục hiện tượng đồng vận do liệt dây thần kinh số 7",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-12.jpg",
      "title": "Dấu hiệu cảnh báo bạn cần bổ sung vitamin C",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-13.jpg",
      "title": "Thực phẩm tốt cho phổi bạn nên ăn thường xuyên",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    }
  ]
}

export const API_GET_MOSTVIEW_VIDEO = {
  "result": true,
  "statusCode": "200",
  "message": "",
  "sysMessage": "",
  "totalItem": 15,
  "data": [
    {
      "thumbnail": "/img/news/news-5.jpg",
      "title": "Hội chứng khiến người bệnh khó chịu với tiếng nhai thức ăn",
      "duration": "1:34",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/115.png",
        "name": "Bệnh viện Nhân dân 115"
      }
    },
    {
      "thumbnail": "/img/news/news-6.jpg",
      "title": "Tôi cảm thấy con vẫn sống sau khi hiến tạng cứu người",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-7.jpg",
      "title": "Những thay đổi trên khuôn mặt tiết lộ các vấn đề về sức khỏe",
      "duration": "4:02",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/hoan-my.jpg",
        "name": "Bệnh viện Hoàn Mỹ"
      }
    },
    {
      "thumbnail": "/img/news/news-8.jpg",
      "title": "Bí quyết ăn uống giúp sống thọ của người Nhật Bản",
      "duration": "4:15",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/gia-dinh.png",
        "name": "Bệnh viện Nhân dân Gia Định"
      }
    },
    {
      "thumbnail": "/img/news/news-9.jpg",
      "title": "Tư thế ngủ nguy hiểm",
      "duration": "3:26",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/viet-duc.jpg",
        "name": "Bệnh viện Việt Đức"
      }
    },
    {
      "thumbnail": "/img/news/news-14.png",
      "title": "Nhân một trường hợp tật bẩm sinh thoát vị não",
      "duration": "5:29",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/nhi-dong-1.png",
        "name": "Bệnh viện Nhi đồng I"
      }
    },
    {
      "thumbnail": "/img/news/news-11.jpg",
      "title": "Khắc phục hiện tượng đồng vận do liệt dây thần kinh số 7",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-12.jpg",
      "title": "Dấu hiệu cảnh báo bạn cần bổ sung vitamin C",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-13.jpg",
      "title": "Thực phẩm tốt cho phổi bạn nên ăn thường xuyên",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-8.jpg",
      "title": "Bí quyết ăn uống giúp sống thọ của người Nhật Bản",
      "duration": "4:15",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/gia-dinh.png",
        "name": "Bệnh viện Nhân dân Gia Định"
      }
    },
    {
      "thumbnail": "/img/news/news-9.jpg",
      "title": "Tư thế ngủ nguy hiểm",
      "duration": "3:26",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/viet-duc.jpg",
        "name": "Bệnh viện Việt Đức"
      }
    },
    {
      "thumbnail": "/img/news/news-14.png",
      "title": "Nhân một trường hợp tật bẩm sinh thoát vị não",
      "duration": "5:29",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/nhi-dong-1.png",
        "name": "Bệnh viện Nhi đồng I"
      }
    },
    {
      "thumbnail": "/img/news/news-11.jpg",
      "title": "Khắc phục hiện tượng đồng vận do liệt dây thần kinh số 7",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-12.jpg",
      "title": "Dấu hiệu cảnh báo bạn cần bổ sung vitamin C",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    },
    {
      "thumbnail": "/img/news/news-13.jpg",
      "title": "Thực phẩm tốt cho phổi bạn nên ăn thường xuyên",
      "duration": "2:19",
      "publishDate": "5 phút trước",
      "link": "",
      "author": {
        "avatar": "/img/user/binhdan.jpg",
        "name": "Bệnh viện Bình Dân"
      }
    }
  ]
}

export const LATEST_VIDEOS = [
  {
    thumbnail: "/img/video/video-1.jpg",
    title: "Hướng dẫn phòng ngừa Covid-19",
    duration: "05:30",
    author: "BS. Nguyễn Văn A",
    publishDate: "2023-07-20"
  },
  {
    thumbnail: "/img/video/video-2.jpg",
    title: "Chế độ dinh dưỡng cho người cao tuổi",
    duration: "04:45",
    author: "BS. Trần Thị B",
    publishDate: "2023-07-21"
  },
  {
    thumbnail: "/img/video/video-3.jpg",
    title: "Tập luyện thể dục đúng cách",
    duration: "06:15",
    author: "BS. Lê Văn C",
    publishDate: "2023-07-22"
  },
  {
    thumbnail: "/img/video/video-4.jpg",
    title: "Cách chăm sóc trẻ sơ sinh",
    duration: "07:00",
    author: "BS. Phạm Thị D",
    publishDate: "2023-07-23"
  }
]