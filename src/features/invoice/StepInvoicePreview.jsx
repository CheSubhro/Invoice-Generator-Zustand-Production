
import React from 'react'
import { useInvoiceStore } from '../../store/useInvoiceStore'
import { 
    Box, 
    Button, 
    Flex, 
    Heading, 
    Text, 
    SimpleGrid, 
    Stack, 
    Table,
    Container
} from '@chakra-ui/react'

export default function StepInvoicePreview() {
    const { shopDetails, customerDetails, invoiceMeta, items, cgstRate, sgstRate, discount, getCalculations, prevStep, resetInvoice } = useInvoiceStore()
    const { subTotal, cgstAmount, sgstAmount, grandTotal } = getCalculations()

    const triggerPrint = () => {
        window.print()
    }

    return (
        <Container maxW="1000px" py={8}>
            {/* 🛠️ System Action Bar (Hidden on Print) */}
            <Flex 
                direction={{ base: 'column', md: 'row' }}
                gap={4} 
                bg="gray.50" 
                p={4} 
                borderRadius="lg" 
                mb={8}
                border="1px solid"
                borderColor="gray.200"
                _print={{ display: 'none' }}
                align="center"
            >
                <Button variant="outline" colorPalette="gray" onClick={prevStep}>
                    ✏️ Edit Fields
                </Button>
                <Button colorPalette="purple" onClick={triggerPrint} fontWeight="bold">
                    🖨️ Print / Save PDF
                </Button>
                <Button variant="ghost" colorPalette="red" onClick={resetInvoice} ml={{ md: 'auto' }}>
                    Reset Form
                </Button>
            </Flex>

            {/* 📜 CORE A4 PRINT SHEET */}
            <Box 
                bg="white" 
                p={10} 
                border="2px solid black" 
                fontFamily="'Courier New', Courier, monospace"
                color="black"
                id="invoice-print-sheet"
                boxShadow="xl"
                _print={{ boxShadow: 'none', border: 'none', p: 0 }}
            >
                {/* Title */}
                <Box textAlign="center" mb={6}>
                    <Heading size="lg" textTransform="uppercase" letterSpacing="2px" borderBottom="2px solid black" display="inline-block" pb={1}>
                        Tax Invoice
                    </Heading>
                </Box>
                
                {/* Upper Meta Section */}
                <SimpleGrid columns={2} border="1px solid black">
                    <Box p={4} borderRight="1px solid black">
                        <Text fontWeight="bold" fontSize="sm" mb={2}>Supplier / Shop Details:</Text>
                        <Text fontSize="md" fontWeight="bold" textTransform="uppercase">{shopDetails.name || 'Dokan Name'}</Text>
                        <Text fontSize="sm" mt={1}>{shopDetails.address || 'Address N/A'}</Text>
                        <Text fontSize="sm" fontWeight="bold" mt={2}>GSTIN: {shopDetails.gstin || 'N/A'}</Text>
                    </Box>
                    <Box p={4}>
                        <Stack gap={1} fontSize="sm">
                            <Flex justify="space-between">
                                <Text>Invoice No:</Text>
                                <Text fontWeight="bold">{invoiceMeta.invoiceNo}</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text>Dated:</Text>
                                <Text fontWeight="bold">{invoiceMeta.date}</Text>
                            </Flex>
                        </Stack>
                    </Box>
                </SimpleGrid>

                {/* Customer Section */}
                <SimpleGrid columns={2} border="1px solid black" borderTop="none" mb={6}>
                    <Box p={4} borderRight="1px solid black">
                        <Text fontWeight="bold" fontSize="sm" mb={2}>Buyer (Consignee) Details:</Text>
                        <Text fontSize="md" fontWeight="bold">{customerDetails.name || 'Customer Name'}</Text>
                        <Text fontSize="sm">{customerDetails.address || 'Address N/A'}</Text>
                        <Text fontSize="sm" fontWeight="bold" mt={2}>GSTIN: {customerDetails.gstin || 'N/A'}</Text>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="sm">State & Code: <b>{customerDetails.stateCode || 'N/A'}</b></Text>
                    </Box>
                </SimpleGrid>

                {/* Main Dynamic Table */}
                <Table.Root variant="outline" border="1px solid black">
                    <Table.Header bg="gray.100">
                        <Table.Row>
                            <Table.ColumnHeader borderRight="1px solid black" color="black" w="50px">Sl</Table.ColumnHeader>
                            <Table.ColumnHeader borderRight="1px solid black" color="black">Description</Table.ColumnHeader>
                            <Table.ColumnHeader borderRight="1px solid black" color="black" textAlign="center" w="100px">HSN</Table.ColumnHeader>
                            <Table.ColumnHeader borderRight="1px solid black" color="black" textAlign="center" w="80px">Qty</Table.ColumnHeader>
                            <Table.ColumnHeader borderRight="1px solid black" color="black" textAlign="right" w="120px">Rate</Table.ColumnHeader>
                            <Table.ColumnHeader color="black" textAlign="right" w="120px">Amount</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {items.map((item, index) => (
                            <Table.Row key={item.id} borderBottom="1px solid gray">
                                <Table.Cell borderRight="1px solid black" textAlign="center">{index + 1}</Table.Cell>
                                <Table.Cell borderRight="1px solid black"><b>{item.description}</b></Table.Cell>
                                <Table.Cell borderRight="1px solid black" textAlign="center">{item.hsnCode}</Table.Cell>
                                <Table.Cell borderRight="1px solid black" textAlign="center">{item.quantity}</Table.Cell>
                                <Table.Cell borderRight="1px solid black" textAlign="right">{item.rate.toFixed(2)}</Table.Cell>
                                <Table.Cell textAlign="right">{(item.quantity * item.rate).toFixed(2)}</Table.Cell>
                            </Table.Row>
                        ))}

                        {/* Calculation Footer Rows */}
                        <Table.Row borderTop="2px solid black">
                            <Table.Cell colSpan={4} rowSpan={4} verticalAlign="top" p={4} borderRight="1px solid black">
                                <Text fontSize="xs" fontStyle="italic">
                                    Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
                                </Text>
                            </Table.Cell>
                            <Table.Cell borderRight="1px solid black" textAlign="right" fontWeight="bold">Subtotal:</Table.Cell>
                            <Table.Cell textAlign="right">₹{subTotal.toFixed(2)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell borderRight="1px solid black" textAlign="right">CGST ({cgstRate}%):</Table.Cell>
                            <Table.Cell textAlign="right">₹{cgstAmount.toFixed(2)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell borderRight="1px solid black" textAlign="right">SGST ({sgstRate}%):</Table.Cell>
                            <Table.Cell textAlign="right">₹{sgstAmount.toFixed(2)}</Table.Cell>
                        </Table.Row>
                        <Table.Row bg="gray.100">
                            <Table.Cell borderRight="1px solid black" textAlign="right" fontWeight="bold" fontSize="lg">Total:</Table.Cell>
                            <Table.Cell textAlign="right" fontWeight="bold" fontSize="lg">₹{grandTotal}.00</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>

                {/* Final Footer with Signature */}
                <Flex justify="space-between" mt={12} align="flex-end">
                    <Box textAlign="center">
                        <Box w="150px" h="100px" border="1px dashed gray" mb={2} display="flex" align="center" justify="center">
                            <Text fontSize="xs" color="gray.400">Shop Seal</Text>
                        </Box>
                        <Text fontSize="sm">Rubber Stamp</Text>
                    </Box>
                    <Box textAlign="center" borderTop="1px solid black" w="250px" pt={2}>
                        <Text fontSize="sm">Authorized Signatory</Text>
                        <Text fontSize="md" fontWeight="bold">For {shopDetails.name || 'Your Shop'}</Text>
                    </Box>
                </Flex>
            </Box>

            {/* Print Settings Injection */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: auto; margin: 10mm; }
                    body { background: white !important; }
                }
            ` }} />
        </Container>
    )
}