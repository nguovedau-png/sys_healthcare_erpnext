import { Box, Heading, Text, VStack, Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContent, AccordionContentText, AccordionIcon, ChevronDownIcon, ChevronUpIcon, Button, ButtonText, ScrollView } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

const FAQS = [
    { question: 'How does Connect work?', answer: 'Connect helps you find people based on shared interests. Choose a topic and start a video or audio call.' },
    { question: 'Is my data safe?', answer: 'Yes, we prioritize your privacy and security. Your calls are encrypted.' },
    { question: 'How do I report a user?', answer: 'You can report a user directly from the chat screen or their profile page.' },
];

export default function HelpScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Help & Support' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="xl" p="$4">
                        <Box>
                            <Heading size="xl" mb="$2" color="$violet500">How can we help?</Heading>
                            <Text color="$textLight500">Browse FAQs or contact our support team.</Text>
                        </Box>

                        <Heading size="md" mt="$4">Frequently Asked Questions</Heading>

                        <Accordion m="$0" width="100%" size="md" variant="unfilled" type="single" isCollapsible={true} isDisabled={false} >
                            {FAQS.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionHeader>
                                        <AccordionTrigger>
                                            {({ isExpanded }) => (
                                                <>
                                                    <AccordionTitleText>{faq.question}</AccordionTitleText>
                                                    {isExpanded ? (
                                                        <AccordionIcon as={ChevronUpIcon} ml="$3" />
                                                    ) : (
                                                        <AccordionIcon as={ChevronDownIcon} ml="$3" />
                                                    )}
                                                </>
                                            )}
                                        </AccordionTrigger>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <AccordionContentText>{faq.answer}</AccordionContentText>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <Box mt="$8" p="$4" bg="$violet50" borderRadius="$lg">
                            <Heading size="sm" mb="$2">Still need help?</Heading>
                            <Text size="sm" color="$textLight500" mb="$4">Our support team is available 24/7 to assist you.</Text>
                            <Button bg="$violet500">
                                <ButtonText>Contact Support</ButtonText>
                            </Button>
                        </Box>
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
