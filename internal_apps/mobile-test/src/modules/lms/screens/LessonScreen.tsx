import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Center, Icon, Spinner } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Play } from 'lucide-react-native';
import api from '../../../services/api';

const LessonScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { lessonId } = route.params as { lessonId: string };
    
    const [lesson, setLesson] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessonDetails = async () => {
            try {
                // Fetch lesson from Frappe backend
                const lessonRes = await api.get(`/api/resource/LMS Lesson/${lessonId}`);
                setLesson(lessonRes.data.data);
            } catch (error) {
                console.log("Error fetching lesson details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLessonDetails();
    }, [lessonId]);

    if (loading) {
        return (
            <Center flex={1} bg="$backgroundDark950">
                <Spinner size="large" color="$primary500" />
            </Center>
        );
    }

    const displayLesson = lesson || {
        title: 'Introduction to Frappe LMS',
        body: 'This is the main body of the lesson. In a real environment, this might be HTML content rendered via a WebView or rich text parser.',
        youtube: 'https://youtube.com/watch?v=placeholder'
    };

    return (
        <Box flex={1} bg="$backgroundDark950">
            {/* Header / Video Player Area */}
            <Box w="$full" h={250} bg="$black" position="relative" justifyContent="center" alignItems="center">
                <Box position="absolute" top={50} left={20} zIndex={10}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Box p="$2" bg="rgba(255,255,255,0.2)" borderRadius="$full">
                            <Icon as={ChevronLeft} color="$white" size="xl" />
                        </Box>
                    </TouchableOpacity>
                </Box>
                
                {/* Mock Video Player */}
                <Box p="$4" bg="rgba(255,255,255,0.2)" borderRadius="$full">
                    <Icon as={Play} color="$white" size="3xl" />
                </Box>
            </Box>

            <ScrollView bounces={false}>
                <Box p="$6">
                    <Heading size="2xl" color="$white" mb="$4">{displayLesson.title}</Heading>
                    
                    <Box bg="$backgroundDark900" p="$4" borderRadius="$xl" mb="$6">
                        <HStack space="md" alignItems="center">
                            <Box w={40} h={40} bg="$primary500" borderRadius="$full" justifyContent="center" alignItems="center">
                                <Text color="$white" fontWeight="$bold">I</Text>
                            </Box>
                            <VStack>
                                <Text color="$white" fontWeight="$bold">Instructor Name</Text>
                                <Text color="$textDark400" size="sm">Senior Developer</Text>
                            </VStack>
                        </HStack>
                    </Box>

                    <Heading size="lg" color="$white" mb="$2">Lesson Content</Heading>
                    <Text color="$textDark300" size="md" lineHeight="$xl">
                        {displayLesson.body?.replace(/<[^>]+>/g, '') || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    </Text>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default LessonScreen;
