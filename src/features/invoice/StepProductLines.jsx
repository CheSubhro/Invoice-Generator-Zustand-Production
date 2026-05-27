
import React from 'react'
import { useInvoiceStore } from '../../store/useInvoiceStore'
import { 
    Box, 
    Button, 
    Input, 
    Heading, 
    Text, 
    Flex, 
    SimpleGrid, 
    Stack,
    IconButton
} from '@chakra-ui/react'

export default function StepProductLines() {
    const { items, cgstRate, sgstRate, discount, addItem, removeItem, updateItem, updateTaxSettings, nextStep, prevStep, getCalculations } = useInvoiceStore()
    const { subTotal, cgstAmount, sgstAmount, grandTotal } = getCalculations()

    return (
        <Box 
            maxW="950px" 
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
                    <span>📦</span> Step 2: Product / Service Line Items
                </Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                    Manage your items list, HSN codes, and live taxation parameters below.
                </Text>
            </Box>

            {/* 📋 Table Header (Desktop Only Visual Guide) */}
            <SimpleGrid 
                columns={12} 
                gap={3} 
                mb={3} 
                fontWeight="bold" 
                color="gray.600" 
                fontSize="sm"
                px={2}
                display={{ base: 'none', md: 'grid' }}
            >
                <Text style={{ gridColumn: 'span 5' }}>Description of Goods</Text>
                <Text style={{ gridColumn: 'span 2' }}>HSN/SAC</Text>
                <Text style={{ gridColumn: 'span 1.5' }}>Quantity</Text>
                <Text style={{ gridColumn: 'span 1.5' }}>Rate</Text>
                <Text style={{ gridColumn: 'span 1.5', textAlign: 'right' }}>Amount</Text>
                <Text style={{ gridColumn: 'span 0.5' }}></Text>
            </SimpleGrid>

            {/* 🔄 Dynamic Rows Block */}
            <Stack spacing={3} mb={4}>
                {items.map((item) => (
                    <SimpleGrid 
                        key={item.id} 
                        columns={{ base: 1, md: 12 }} 
                        gap={3} 
                        p={2} 
                        borderRadius="lg" 
                        _hover={{ bg: 'gray.50/50' }}
                        alignItems="center"
                    >
                        {/* Description */}
                        <Box style={{ gridColumn: 'span 5' }}>
                            <Text display={{ base: 'block', md: 'none' }} fontSize="xs" fontWeight="bold" mb={1} color="gray.500">Description</Text>
                            <Input placeholder="e.g. Jeans, Cotton Shirt" value={item.description} onChange={e => updateItem(item.id, { description: e.target.value })} focusBorderColor="purple.500" />
                        </Box>

                        {/* HSN */}
                        <Box style={{ gridColumn: 'span 2' }}>
                            <Text display={{ base: 'block', md: 'none' }} fontSize="xs" fontWeight="bold" mb={1} color="gray.500">HSN/SAC</Text>
                            <Input placeholder="HSN" value={item.hsnCode} onChange={e => updateItem(item.id, { hsnCode: e.target.value })} focusBorderColor="purple.500" />
                        </Box>

                        {/* Qty */}
                        <Box style={{ gridColumn: 'span 1.5' }}>
                            <Text display={{ base: 'block', md: 'none' }} fontSize="xs" fontWeight="bold" mb={1} color="gray.500">Quantity</Text>
                            <Input type="number" min="1" value={item.quantity} onChange={e => updateItem(item.id, { quantity: Number(e.target.value) })} focusBorderColor="purple.500" />
                        </Box>

                        {/* Rate */}
                        <Box style={{ gridColumn: 'span 1.5' }}>
                            <Text display={{ base: 'block', md: 'none' }} fontSize="xs" fontWeight="bold" mb={1} color="gray.500">Rate</Text>
                            <Input type="number" min="0" value={item.rate} onChange={e => updateItem(item.id, { rate: Number(e.target.value) })} focusBorderColor="purple.500" />
                        </Box>

                        {/* Individual Total Amount */}
                        <Box style={{ gridColumn: 'span 1.5' }} textAlign={{ base: 'left', md: 'right' }} py={{ base: 1, md: 0 }}>
                            <Text display={{ base: 'inline', md: 'none' }} fontSize="sm" fontWeight="bold" color="gray.500" mr={2}>Total:</Text>
                            <Text as="span" fontWeight="semibold" color="gray.700">
                                ₹{(item.quantity * item.rate).toFixed(2)}
                            </Text>
                        </Box>

                        {/* Delete Button */}
                        <Box style={{ gridColumn: 'span 0.5' }} textAlign="right">
                            <Button 
                                onClick={() => removeItem(item.id)} 
                                variant="ghost" 
                                color="red.500" 
                                size="sm"
                                _hover={{ bg: 'red.50', color: 'red.600' }}
                            >
                                ❌
                            </Button>
                        </Box>
                    </SimpleGrid>
                ))}
            </Stack>

            {/* Add Item Button */}
            <Button 
                onClick={addItem} 
                colorScheme="green" 
                size="sm" 
                variant="outline"
                borderWidth="2px"
                borderRadius="md"
                mt={2}
                backgroundColor="green.50"
                color="green.600"
                _hover={{ backgroundColor: 'green.100' }}
            >
                ➕ Add New Item
            </Button>

            {/* 💰 Sub-Calculations Summary Panel */}
            <Box 
                mt={8} 
                pt={5} 
                borderTop="2px dashed" 
                borderColor="gray.200" 
                display="flex" 
                flexDirection="column" 
                gap={4} 
                alignItems="flex-end"
            >
                <Flex justify="space-between" w={{ base: '100%', md: '350px' }} fontSize="sm">
                    <Text color="gray.600">Subtotal Raw:</Text>
                    <Text fontWeight="bold" color="gray.800">₹{subTotal.toFixed(2)}</Text>
                </Flex>
                
                {/* CGST Input field wrapper */}
                <Flex justify="space-between" w={{ base: '100%', md: '350px' }} align="center">
                    <Text fontSize="sm" color="gray.600">CGST (%)</Text>
                    <Flex align="center" gap={2}>
                        <Input type="number" size="sm" maxW="70px" value={cgstRate} onChange={e => updateTaxSettings({ cgstRate: Number(e.target.value) })} focusBorderColor="purple.500" />
                        <Text fontWeight="medium" minW="80px" textAlign="right">₹{cgstAmount.toFixed(2)}</Text>
                    </Flex>
                </Flex>

                {/* SGST Input field wrapper */}
                <Flex justify="space-between" w={{ base: '100%', md: '350px' }} align="center">
                    <Text fontSize="sm" color="gray.600">SGST (%)</Text>
                    <Flex align="center" gap={2}>
                        <Input type="number" size="sm" maxW="70px" value={sgstRate} onChange={e => updateTaxSettings({ sgstRate: Number(e.target.value) })} focusBorderColor="purple.500" />
                        <Text fontWeight="medium" minW="80px" textAlign="right">₹{sgstAmount.toFixed(2)}</Text>
                    </Flex>
                </Flex>

                {/* Discount input field wrapper */}
                <Flex justify="space-between" w={{ base: '100%', md: '350px' }} align="center">
                    <Text fontSize="sm" color="gray.600">Discount Cash Off</Text>
                    <Flex align="center" gap={2}>
                        <Input type="number" size="sm" maxW="90px" value={discount} onChange={e => updateTaxSettings({ discount: Number(e.target.value) })} focusBorderColor="purple.500" />
                        <Text fontWeight="medium" minW="80px" textAlign="right" color="red.500">-₹{discount}</Text>
                    </Flex>
                </Flex>

                {/* Grand Total Display */}
                <Flex 
                    justify="space-between" 
                    w={{ base: '100%', md: '350px' }} 
                    pt={3} 
                    borderTop="1px solid" 
                    borderColor="gray.200"
                    align="center"
                >
                    <Text fontSize="md" fontWeight="bold" color="gray.800">Grand Total:</Text>
                    <Text fontSize="xl" fontWeight="bold" color="purple.600">₹{grandTotal}.00</Text>
                </Flex>
            </Box>

            {/* Stepper Footer Controllers */}
            <Box display="flex" justifyContent="space-between" mt={8} pt={4} borderTop="1px solid" borderColor="gray.100">
                <Button onClick={prevStep} variant="outline" size="md" px={6}>
                    ⬅️ Back
                </Button>
                <Button 
                    onClick={nextStep} 
                    colorScheme="purple" 
                    size="md" 
                    px={8}
                    boxShadow="md"
                    backgroundColor="purple.600"
                    color="white"
                    _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                >
                    Preview Invoice 📜
                </Button>
            </Box>
        </Box>
    )
}