
import React from 'react'
import { useInvoiceStore } from '../../store/useInvoiceStore'
import { 
    Box, 
    Button, 
    Input, 
    Heading, 
    Text, 
    SimpleGrid, 
    VStack 
} from '@chakra-ui/react'

export default function StepShopDetails() {
    const { shopDetails, customerDetails, invoiceMeta, updateShop, updateCustomer, updateMeta, nextStep } = useInvoiceStore()

    return (
        <Box 
            maxW="850px" 
            mx="auto" 
            bg="white" 
            p={{ base: 6, md: 8 }} 
            borderRadius="xl" 
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.05)"
            border="1px solid"
            borderColor="gray.100"
        >
            {/* Header Section */}
            <Box mb={6} pb={4} borderBottom="1px solid" borderColor="gray.200">
                <Heading as="h3" size="md" color="gray.800" display="flex" alignItems="center" gap={2}>
                    <span>🏢</span> Step 1: Business Profile & Customer Details
                </Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                    Set up your commercial store credentials and buyer profiles seamlessly.
                </Text>
            </Box>

            <VStack spacing={6} align="stretch">
                {/* 📊 Section 1: Invoice Meta Details */}
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>Invoice No *</Text>
                        <Input 
                            type="text" 
                            value={invoiceMeta.invoiceNo} 
                            onChange={e => updateMeta({ invoiceNo: e.target.value })}
                            focusBorderColor="purple.500"
                            borderColor="gray.300"
                        />
                    </Box>
                    <Box>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>Date *</Text>
                        <Input 
                            type="date" 
                            value={invoiceMeta.date} 
                            onChange={e => updateMeta({ date: e.target.value })}
                            focusBorderColor="purple.500"
                            borderColor="gray.300"
                        />
                    </Box>
                </SimpleGrid>

                {/* 🏬 Section 2: Shop/Business Profile */}
                <Box pt={2}>
                    <Heading as="h4" size="xs" color="purple.600" textTransform="uppercase" letterSpacing="wider" mb={4}>
                        Your Shop Profile (Auto-Saved)
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>Business Name *</Text>
                            <Input placeholder="Dokan/Business Name" value={shopDetails.name} onChange={e => updateShop({ name: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>GSTIN/UIN Number *</Text>
                            <Input placeholder="GSTIN/UIN Number" value={shopDetails.gstin} onChange={e => updateShop({ gstin: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                        <Box style={{ gridColumn: 'span 2' }}>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>Shop Address *</Text>
                            <Input placeholder="Shop Address" value={shopDetails.address} onChange={e => updateShop({ address: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* 👤 Section 3: Buyer / Customer Details */}
                <Box pt={2}>
                    <Heading as="h4" size="xs" color="purple.600" textTransform="uppercase" letterSpacing="wider" mb={4}>
                        Buyer / Customer Details
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>Customer Name *</Text>
                            <Input placeholder="Customer Name" value={customerDetails.name} onChange={e => updateCustomer({ name: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>Customer GSTIN (Optional)</Text>
                            <Input placeholder="Customer GSTIN" value={customerDetails.gstin} onChange={e => updateCustomer({ gstin: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>Customer Address *</Text>
                            <Input placeholder="Customer Address" value={customerDetails.address} onChange={e => updateCustomer({ address: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                        <Box>
                            <Text fontSize="xs" fontWeight="medium" color="gray.600" mb={1}>State & State Code *</Text>
                            <Input placeholder="e.g. West Bengal - 19" value={customerDetails.stateCode} onChange={e => updateCustomer({ stateCode: e.target.value })} focusBorderColor="purple.500" />
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Action Footer */}
                <Box display="flex" justifyContent="flex-end" pt={4} borderTop="1px solid" borderColor="gray.100">
                    <Button 
                        onClick={nextStep} 
                        colorScheme="purple" 
                        size="md" 
                        px={8}
                        boxShadow="md"
                        _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                        transition="all 0.2s"
                        backgroundColor="purple.600"
                        color="white"
                    >
                        Continue to Items ➡️
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}