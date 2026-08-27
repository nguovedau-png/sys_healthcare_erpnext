import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Center, Icon, Image, Spinner } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BookOpen, PlayCircle, Star, Search } from 'lucide-react-native';
import api from '../../../services/api';

const LMSHomeScreen = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch courses from Frappe LMS
                // /api/method/lms.lms.api.get_courses usually returns a list of courses
                const response = await api.get('/api/resource/LMS Course?fields=["name","title","short_introduction","image","published"]');
                setCourses(response.data.data.filter((c: any) => c.published));
            } catch (error) {
                console.log("Error fetching courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const renderCourseCard = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CourseDetail' as never, { courseId: item.name } as never)}>
            <Box bg="rgba(30, 41, 59, 0.7)" borderWidth={1} borderColor="$borderDark700" borderRadius="$2xl" mb="$5" overflow="hidden">
                <Image
                    source={{ uri: item.image ? `http://10.0.2.2:8080${item.image}` : 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop' }}
                    alt={item.title}
                    h={180}
                    w="$full"
                />
                <Box p="$5">
                    <HStack justifyContent="space-between" alignItems="center" mb="$2">
                        <Box bg="$primary500" px="$3" py="$1" borderRadius="$full">
                            <Text color="$white" size="xs" fontWeight="$bold">Premium</Text>
                        </Box>
                        <HStack space="xs" alignItems="center">
                            <Icon as={Star} color="$warning400" size="sm" />
                            <Text color="$textDark300" size="sm">4.8</Text>
                        </HStack>
                    </HStack>
                    
                    <Heading size="lg" color="$white" mb="$2">{item.title}</Heading>
                    <Text color="$textDark400" size="sm" numberOfLines={2}>{item.short_introduction || 'Learn the foundational concepts and best practices in this comprehensive course.'}</Text>
                    
                    <HStack mt="$4" space="md" alignItems="center">
                        <HStack space="xs" alignItems="center">
                            <Icon as={BookOpen} color="$primary400" size="sm" />
                            <Text color="$textDark300" size="xs">12 Lessons</Text>
                        </HStack>
                        <HStack space="xs" alignItems="center">
                            <Icon as={PlayCircle} color="$secondary400" size="sm" />
                            <Text color="$textDark300" size="xs">4h 30m</Text>
                        </HStack>
                    </HStack>
                </Box>
            </Box>
        </TouchableOpacity>
    );

    return (
        <Box flex={1} bg="$backgroundDark950">
            <Box pt="$12" pb="$4" px="$6" bg="$backgroundDark900" borderBottomWidth={1} borderColor="$borderDark800">
                <HStack justifyContent="space-between" alignItems="center">
                    <VStack>
                        <Text color="$textDark400" size="sm">Explore Learning</Text>
                        <Heading size="2xl" color="$white">Discover Courses</Heading>
                    </VStack>
                    <Box p="$3" bg="$backgroundDark800" borderRadius="$full">
                        <Icon as={Search} color="$white" />
                    </Box>
                </HStack>
            </Box>

            {loading ? (
                <Center flex={1}>
                    <Spinner size="large" color="$primary500" />
                </Center>
            ) : (
                <FlatList
                    data={courses.length > 0 ? courses : [
                        { name: "C-001", title: "Introduction to Healthcare Tech", image: null },
                        { name: "C-002", title: "Advanced ERP Features", image: null }
                    ]}
                    renderItem={renderCourseCard}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ padding: 24 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Box>
    );
};

export default LMSHomeScreen;
