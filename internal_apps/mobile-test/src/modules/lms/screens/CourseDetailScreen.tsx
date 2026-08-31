import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Center, Icon, Image, Spinner, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, PlayCircle, Clock, CheckCircle2, Lock } from 'lucide-react-native';
import api from '../../../services/api';

const CourseDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { courseId } = route.params as { courseId: string };
    
    const [course, setCourse] = useState<any>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // Fetch course details
                const courseRes = await api.get(`/api/resource/LMS Course/${courseId}`);
                setCourse(courseRes.data.data);

                // Fetch lessons or chapters for this course
                // Assuming standard LMS structure or manually querying lessons
                const lessonRes = await api.get(`/api/resource/LMS Lesson?filters=[["course","=","${courseId}"]]&fields=["name","title","custom_duration"]`);
                setLessons(lessonRes.data.data || []);
            } catch (error) {
                console.log("Error fetching course details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    const handleLessonPress = (lessonId: string) => {
        navigation.navigate('LessonScreen' as never, { lessonId, courseId } as never);
    };

    if (loading) {
        return (
            <Center flex={1} bg="$backgroundDark950">
                <Spinner size="large" color="$primary500" />
            </Center>
        );
    }

    // Fallback data if API returns empty
    const displayCourse = course || { title: 'Premium Course', short_introduction: 'Detailed introductory context...', image: null };
    const displayLessons = lessons.length > 0 ? lessons : [
        { name: 'L-01', title: 'Getting Started', custom_duration: '10:00', isCompleted: true },
        { name: 'L-02', title: 'Core Concepts', custom_duration: '15:20', isCompleted: false },
        { name: 'L-03', title: 'Advanced Implementation', custom_duration: '25:00', isLocked: true },
    ];

    return (
        <Box flex={1} bg="$backgroundDark950">
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <Box position="relative" h={300}>
                    <Image
                        source={{ uri: displayCourse.image ? `http://10.0.2.2:8080${displayCourse.image}` : 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop' }}
                        alt="Course Banner"
                        w="$full"
                        h="$full"
                    />
                    <Box position="absolute" top={50} left={20}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Box p="$2" bg="rgba(0,0,0,0.5)" borderRadius="$full">
                                <Icon as={ChevronLeft} color="$white" size="xl" />
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    {/* Gradient Overlay representation */}
                    <Box position="absolute" bottom={0} w="$full" h={150} bg="$black" opacity={0.6} />
                    <VStack position="absolute" bottom={20} left={24} right={24} space="sm">
                        <Box bg="$primary500" alignSelf="flex-start" px="$3" py="$1" borderRadius="$full">
                            <Text color="$white" size="xs" fontWeight="$bold">Premium</Text>
                        </Box>
                        <Heading size="2xl" color="$white">{displayCourse.title}</Heading>
                    </VStack>
                </Box>

                <Box p="$6" borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl" bg="$backgroundDark950" mt={-20}>
                    <HStack space="xl" mb="$6">
                        <HStack space="sm" alignItems="center">
                            <Icon as={Clock} color="$primary400" size="sm" />
                            <Text color="$textDark300" fontWeight="$medium">4h 30m Total</Text>
                        </HStack>
                        <HStack space="sm" alignItems="center">
                            <Icon as={PlayCircle} color="$secondary400" size="sm" />
                            <Text color="$textDark300" fontWeight="$medium">{displayLessons.length} Lessons</Text>
                        </HStack>
                    </HStack>

                    <Heading size="lg" color="$white" mb="$2">About Course</Heading>
                    <Text color="$textDark400" size="md" lineHeight="$xl" mb="$8">
                        {displayCourse.short_introduction || displayCourse.description || 'This course walks you through everything you need to know from start to finish. Highly recommended for people looking to improve their knowledge base with premium industry standard practices.'}
                    </Text>

                    <HStack justifyContent="space-between" alignItems="center" mb="$4">
                        <Heading size="lg" color="$white">Syllabus</Heading>
                        <Text color="$primary400" fontWeight="$bold">25% Completed</Text>
                    </HStack>

                    <VStack space="md" mb="$24">
                        {displayLessons.map((lesson: any, index: number) => (
                            <TouchableOpacity 
                                key={lesson.name} 
                                disabled={lesson.isLocked}
                                onPress={() => handleLessonPress(lesson.name)}
                            >
                                <HStack 
                                    p="$4" 
                                    bg="rgba(30, 41, 59, 0.5)" 
                                    borderRadius="$2xl" 
                                    borderWidth={1} 
                                    borderColor={lesson.isCompleted ? "$primary500" : "$borderDark700"}
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <HStack space="md" alignItems="center" flex={1}>
                                        <Box 
                                            p="$3" 
                                            bg={lesson.isCompleted ? "$primary500" : "$backgroundDark800"} 
                                            borderRadius="$full"
                                        >
                                            {lesson.isLocked ? (
                                                <Icon as={Lock} color="$textDark400" size="sm" />
                                            ) : lesson.isCompleted ? (
                                                <Icon as={CheckCircle2} color="$white" size="sm" />
                                            ) : (
                                                <Icon as={PlayCircle} color="$primary400" size="sm" />
                                            )}
                                        </Box>
                                        <VStack flex={1}>
                                            <Text color={lesson.isLocked ? "$textDark500" : "$white"} fontWeight="$bold" size="md">
                                                {index + 1}. {lesson.title}
                                            </Text>
                                            <Text color="$textDark400" size="sm">{lesson.custom_duration || '10:00'}</Text>
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </TouchableOpacity>
                        ))}
                    </VStack>
                </Box>
            </ScrollView>
            
            <Box position="absolute" bottom={0} w="$full" p="$6" bg="$backgroundDark950" borderTopWidth={1} borderColor="$borderDark800">
                <Button size="xl" action="primary" borderRadius="$full">
                    <ButtonText fontWeight="$bold">Continue Learning</ButtonText>
                </Button>
            </Box>
        </Box>
    );
};

export default CourseDetailScreen;
