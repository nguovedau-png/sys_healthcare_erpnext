import { PrismaClient } from '../../../node_modules/.prisma/client-gamification-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding gamification-service...');

    // Badges
    const badgeCount = await prisma.badge.count();
    if (badgeCount === 0) {
        await prisma.badge.createMany({
            data: [
                { name: 'Early Bird', description: 'Đăng nhập sớm 7 ngày liên tiếp', icon: '🌅', awarded: 234 },
                { name: 'Health Champion', description: 'Hoàn thành 30 nhiệm vụ sức khỏe', icon: '🏆', awarded: 156 },
                { name: 'Social Butterfly', description: 'Chia sẻ 10 bài viết sức khỏe', icon: '🦋', awarded: 189 },
                { name: 'Marathon Runner', description: 'Hoàn thành thử thách chạy bộ 21 ngày', icon: '🏃', awarded: 72 },
                { name: 'Nutrition Expert', description: 'Ghi nhật ký dinh dưỡng 30 ngày liên tục', icon: '🥗', awarded: 45 },
            ],
        });
        console.log('Seeded Badges');
    }

    // Point Rules
    const ruleCount = await prisma.pointRule.count();
    if (ruleCount === 0) {
        await prisma.pointRule.createMany({
            data: [
                { action: 'Đăng nhập hàng ngày', points: 10 },
                { action: 'Hoàn thành khóa học', points: 100 },
                { action: 'Chia sẻ bài viết', points: 20 },
                { action: 'Tham gia thử thách', points: 50 },
                { action: 'Hoàn thành thử thách', points: 200 },
                { action: 'Đặt lịch khám', points: 30 },
                { action: 'Viết bình luận diễn đàn', points: 5 },
            ],
        });
        console.log('Seeded PointRules');
    }

    // Leaderboard Users
    const userPointCount = await prisma.userPoint.count();
    if (userPointCount === 0) {
        await prisma.userPoint.createMany({
            data: [
                { userId: 1, userName: 'Nguyễn Thị Anh', points: 124000, badges: 15, level: 'Diamond', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 2, userName: 'Phạm Văn Hùng', points: 112500, badges: 12, level: 'Platinum', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 3, userName: 'Lê Minh Tuấn', points: 98000, badges: 10, level: 'Gold', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 4, userName: 'Trần Thị Bích', points: 85200, badges: 8, level: 'Gold', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 5, userName: 'Hoàng Văn Nam', points: 71500, badges: 7, level: 'Silver', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 6, userName: 'Vũ Lan Anh', points: 63000, badges: 6, level: 'Silver', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 7, userName: 'Đỗ Quang Minh', points: 52400, badges: 5, level: 'Silver', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 8, userName: 'Ngô Thị Hoa', points: 48100, badges: 4, level: 'Bronze', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 9, userName: 'Đinh Trọng Khải', points: 39800, badges: 3, level: 'Bronze', avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
                { userId: 10, userName: 'Bùi Thanh Hà', points: 31200, badges: 2, level: 'Bronze', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
            ],
        });
        console.log('Seeded UserPoints (Leaderboard)');
    }

    // === CHALLENGES ===
    const challengeCount = await prisma.challenge.count();
    if (challengeCount === 0) {
        await prisma.challenge.createMany({
            data: [
                {
                    title: 'Bước chân Thần Tốc',
                    description: 'Tham gia giải chạy bộ ảo 21 ngày liên tiếp để xây dựng thói quen kardio bảo vệ tim mạch. Mỗi ngày cần đạt ít nhất 10.000 bước chân.',
                    type: 'running',
                    targetValue: 100000,
                    targetUnit: 'Bước',
                    rewardText: 'Voucher Khám Tim Mạch 500k',
                    rewardType: 'voucher',
                    durationDays: 21,
                    timeRemaining: '14 ngày còn lại',
                    color: 'orange',
                    totalJoined: 12500,
                    isActive: true,
                },
                {
                    title: 'Thử Thách Không Đường',
                    description: 'Nói không với đường tinh luyện trong vòng 7 ngày để thanh lọc cơ thể, đẩy lùi nguy cơ tiểu đường và cải thiện năng lượng mỗi ngày.',
                    type: 'nutrition',
                    targetValue: 7,
                    targetUnit: 'Ngày Liên Tiếp',
                    rewardText: 'Badge Kỷ niệm + 50 Xu Sức Khỏe',
                    rewardType: 'badge',
                    durationDays: 7,
                    timeRemaining: '5 ngày còn lại',
                    color: 'yellow',
                    totalJoined: 8400,
                    isActive: true,
                },
                {
                    title: '10 Phút Thiền Định',
                    description: 'Thực hành thiền và hít thở sâu mỗi sáng trước khi bắt đầu ngày mới nhằm giảm thiểu trầm cảm, lo âu và cải thiện sự tập trung.',
                    type: 'mental',
                    targetValue: 30,
                    targetUnit: 'Ngày Liên Tiếp',
                    rewardText: 'Khóa học Yoga Cơ bản (trị giá 299k)',
                    rewardType: 'voucher',
                    durationDays: 30,
                    timeRemaining: '30 ngày',
                    color: 'purple',
                    totalJoined: 4500,
                    isActive: true,
                },
                {
                    title: 'Uống Đủ Nước Mỗi Ngày',
                    description: 'Đảm bảo uống đủ 2 lít nước mỗi ngày trong 14 ngày liên tiếp để cải thiện da, tiêu hóa và chức năng thận.',
                    type: 'nutrition',
                    targetValue: 14,
                    targetUnit: 'Ngày Liên Tiếp',
                    rewardText: '100 Xu Sức Khỏe',
                    rewardType: 'coins',
                    durationDays: 14,
                    timeRemaining: '14 ngày',
                    color: 'green',
                    totalJoined: 6200,
                    isActive: true,
                },
            ],
        });
        console.log('Seeded Challenges');
    }

    console.log('Seeding gamification-service finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
