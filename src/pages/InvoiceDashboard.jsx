
import React from 'react'
import { useInvoiceStore } from '../store/useInvoiceStore'
import StepShopDetails from '../features/invoice/StepShopDetails'
import StepProductLines from '../features/invoice/StepProductLines'
import StepInvoicePreview from '../features/invoice/StepInvoicePreview'
import { Box, Flex, Text, Container } from '@chakra-ui/react'

export default function InvoiceDashboard() {
    const currentStep = useInvoiceStore((state) => state.currentStep)

    // Helper to calculate modern step styles dynamically
    const getStepStyles = (stepNum) => {
        const isActive = currentStep === stepNum
        return {
            fontWeight: isActive ? 'bold' : 'medium',
            color: isActive ? 'purple.600' : 'gray.500',
            bg: isActive ? 'purple.50' : 'transparent',
            px: 3,
            py: 1.5,
            borderRadius: 'md',
            transition: 'all 0.2s'
        }
    }

    return (
        <Container maxW="1000px" py={6}>
            {/* 🗺️ Step Indicators Tracker Header (Hidden when Printing) */}
            <Flex 
                className="no-print" 
                align="center" 
                justify="space-between" 
                mb={8} 
                bg="white" 
                p={3} 
                borderRadius="xl" 
                boxShadow="0 2px 10px rgba(0,0,0,0.04)"
                border="1px solid"
                borderColor="gray.100"
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 2, md: 0 }}
            >
                <Flex align="center" {...getStepStyles(1)}>
                    <Box 
                        w={6} 
                        h={6} 
                        borderRadius="full" 
                        bg={currentStep === 1 ? 'purple.600' : 'gray.200'} 
                        color={currentStep === 1 ? 'white' : 'gray.600'} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        fontSize="xs" 
                        mr={2}
                    >
                        1
                    </Box>
                    <Text fontSize="sm">Shop & Customer</Text>
                </Flex>

                <Text color="gray.300" display={{ base: 'none', md: 'block' }}>➔</Text>

                <Flex align="center" {...getStepStyles(2)}>
                    <Box 
                        w={6} 
                        h={6} 
                        borderRadius="full" 
                        bg={currentStep === 2 ? 'purple.600' : 'gray.200'} 
                        color={currentStep === 2 ? 'white' : 'gray.600'} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        fontSize="xs" 
                        mr={2}
                    >
                        2
                    </Box>
                    <Text fontSize="sm">Inventory Ledger Lines</Text>
                </Flex>

                <Text color="gray.300" display={{ base: 'none', md: 'block' }}>➔</Text>

                <Flex align="center" {...getStepStyles(3)}>
                    <Box 
                        w={6} 
                        h={6} 
                        borderRadius="full" 
                        bg={currentStep === 3 ? 'purple.600' : 'gray.200'} 
                        color={currentStep === 3 ? 'white' : 'gray.600'} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        fontSize="xs" 
                        mr={2}
                    >
                        3
                    </Box>
                    <Text fontSize="sm">Tally Invoice Blueprint</Text>
                </Flex>
            </Flex>

            {/* ⚙️ Dynamic Rendering Conditions Engine Block */}
            <Box>
                {currentStep === 1 && <StepShopDetails />}
                {currentStep === 2 && <StepProductLines />}
                {currentStep === 3 && <StepInvoicePreview />}
            </Box>
        </Container>
    )
}