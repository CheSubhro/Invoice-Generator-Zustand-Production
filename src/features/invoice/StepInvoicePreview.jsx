

import React from 'react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import {
  Box,
  Flex,
  Text,
  Heading,
  Table,
  VStack,
  HStack,
  Spacer,
  Button,
  Container,
} from '@chakra-ui/react';

export default function StepInvoicePreview() {
    const {
        shopDetails,
        customerDetails,
        invoiceMeta,
        items,
        cgstRate,
        sgstRate,
        getCalculations,
        prevStep,
        resetInvoice,
    } = useInvoiceStore();
    
    const { subTotal, cgstAmount, sgstAmount, grandTotal } = getCalculations();

    const triggerPrint = () => {
        window.print();
    };

    return (
        <Container maxW="850px" py={8}>
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
                <Button variant="outline" onClick={prevStep}>
                ✏️ Edit Fields
                </Button>
                <Button colorScheme="blue" onClick={triggerPrint} fontWeight="bold">
                🖨️ Print / Save PDF
                </Button>
                <Button variant="ghost" colorScheme="red" onClick={resetInvoice} ml={{ md: 'auto' }}>
                Reset Form
                </Button>
            </Flex>

            {/* 📜 CORE COOL WAVES DYNAMIC PRINT SHEET */}
            <Box
                w="100%"
                minH="1060px"
                bg="#F0F8FF"
                p="50px"
                position="relative"
                fontFamily="'Inter', 'Helvetica Neue', sans-serif"
                color="#333"
                overflow="hidden"
                boxShadow="xl"
                id="invoice-print-sheet"
                _print={{ boxShadow: 'none', p: '20px', bg: '#F0F8FF !important', WebkitPrintColorAdjust: 'exact' }}
            >
                {/* ----------------- TOP HEADER SECTION ----------------- */}
                <Flex align="center" mb="8" position="relative" zIndex={2}>
                <VStack align="start" spacing={1}>
                    <Heading
                    as="h1"
                    fontSize="38px"
                    color="#2B7FBC"
                    fontFamily="'Brush Script MT', 'cursive', sans-serif"
                    fontWeight="normal"
                    fontStyle="italic"
                    >
                    {shopDetails.name || 'Your Shop Name'}
                    </Heading>
                    <Text fontSize="13px" fontWeight="500" color="#4A5568">
                    {shopDetails.address || 'Shop Address Go Here'}
                    </Text>
                    {shopDetails.gstin && (
                    <Text fontSize="13px" fontWeight="700" color="#2B7FBC">
                        GSTIN: {shopDetails.gstin}
                    </Text>
                    )}
                </VStack>
                <Spacer />
                {/* LOGO PLACEHOLDER */}
                <Flex
                    w="95px"
                    h="95px"
                    bg="#A0AEC0"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    color="white"
                    fontWeight="bold"
                    fontSize="18px"
                    letterSpacing="1px"
                >
                    LOGO
                </Flex>
                </Flex>

                {/* ----------------- BILL TO / SHIP TO / META DETAILS ----------------- */}
                <Flex mb="8" fontSize="13px" position="relative" zIndex={2}>
                {/* Bill To */}
                <VStack align="start" spacing={1} w="35%">
                    <Text fontWeight="bold" color="#2B7FBC" mb="1">Bill To</Text>
                    <Text fontWeight="600">{customerDetails.name || 'Customer Name'}</Text>
                    <Text color="#4A5568" whiteSpace="pre-line">
                    {customerDetails.address || 'Customer Address'}
                    </Text>
                    {customerDetails.gstin && (
                    <Text fontWeight="bold" color="gray.700">GSTIN: {customerDetails.gstin}</Text>
                    )}
                </VStack>

                {/* Ship To / State Code */}
                <VStack align="start" spacing={1} w="35%">
                    <Text fontWeight="bold" color="#2B7FBC" mb="1">Ship To</Text>
                    <Text fontWeight="600">{customerDetails.name || 'Customer Name'}</Text>
                    <Text color="#4A5568" whiteSpace="pre-line">
                    {customerDetails.address || 'Customer Address'}
                    </Text>
                    <Text fontSize="12px" color="gray.600">
                    State Code: <b>{customerDetails.stateCode || 'N/A'}</b>
                    </Text>
                </VStack>

                <Spacer />

                {/* Invoice Meta Numbers */}
                <Table.Root variant="unstyled" size="sm" w="25%">
                    <Table.Body>
                    <Table.Row>
                        <Table.Cell py={1} pl={0} fontWeight="bold" color="#2B7FBC" textAlign="right">Invoice #</Table.Cell>
                        <Table.Cell py={1} pr={0} fontWeight="600" textAlign="right">{invoiceMeta.invoiceNo}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell py={1} pl={0} fontWeight="bold" color="#2B7FBC" textAlign="right">Invoice Date</Table.Cell>
                        <Table.Cell py={1} pr={0} fontWeight="600" textAlign="right">{invoiceMeta.date}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table.Root>
                </Flex>

                {/* ----------------- ITEMS TABLE ----------------- */}
                <Box borderRadius="md" overflow="hidden" mb="4" zIndex={2} position="relative">
                <Table.Root variant="simple" size="sm" fontSize="13px">
                    <Table.Header bg="#2B7FBC">
                    <Table.Row>
                        <Table.ColumnHeader color="white" py="3" w="8%" textAlign="center" textTransform="none" fontSize="13px">Qty</Table.ColumnHeader>
                        <Table.ColumnHeader color="white" py="3" w="52%" textTransform="none" fontSize="13px">Description</Table.ColumnHeader>
                        <Table.ColumnHeader color="white" py="3" w="12%" textAlign="center" textTransform="none" fontSize="13px">HSN</Table.ColumnHeader>
                        <Table.ColumnHeader color="white" py="3" w="14%" textAlign="right" textTransform="none" fontSize="13px">Unit Price</Table.ColumnHeader>
                        <Table.ColumnHeader color="white" py="3" w="14%" textAlign="right" textTransform="none" fontSize="13px">Amount</Table.ColumnHeader>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body bg="transparent">
                    {items.map((item) => (
                        <Table.Row key={item.id} borderBottom="1px solid rgba(0,0,0,0.05)">
                        <Table.Cell py="3" textAlign="center" fontWeight="500">{item.quantity}</Table.Cell>
                        <Table.Cell py="3" fontWeight="500">{item.description || 'Unnamed Item'}</Table.Cell>
                        <Table.Cell py="3" textAlign="center" color="gray.600">{item.hsnCode || '-'}</Table.Cell>
                        <Table.Cell py="3" textAlign="right" fontWeight="500">{Number(item.rate).toFixed(2)}</Table.Cell>
                        <Table.Cell py="3" textAlign="right" fontWeight="500">
                            {(item.quantity * item.rate).toFixed(2)}
                        </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>
                </Box>

                {/* ----------------- CALCULATION TOTALS SECTION ----------------- */}
                <Box
                position="absolute"
                left="0"
                right="0"
                top="440px"
                bottom="0"
                bg="white"
                zIndex={1}
                borderRadius="3xl"
                clipPath="ellipse(120% 75% at 50% 78%)"
                />

                {/* এখানে ট্যাক্স আলাদা আলাদা লাইনে স্প্লিট করে হিসাব দেখানো হচ্ছে */}
                <Flex direction="column" align="end" pr="4" mt="4" position="relative" zIndex={2} fontSize="14px">
                <HStack spacing={12} py={1}>
                    <Text fontWeight="bold" color="#333">Subtotal</Text>
                    <Text fontWeight="500" w="100px" textAlign="right">₹{subTotal.toFixed(2)}</Text>
                </HStack>
                
                <HStack spacing={12} py={1}>
                    <Text fontWeight="bold" color="#333">CGST ({cgstRate.toFixed(1)}%)</Text>
                    <Text fontWeight="500" w="100px" textAlign="right">₹{cgstAmount.toFixed(2)}</Text>
                </HStack>

                <HStack spacing={12} py={1}>
                    <Text fontWeight="bold" color="#333">SGST ({sgstRate.toFixed(1)}%)</Text>
                    <Text fontWeight="500" w="100px" textAlign="right">₹{sgstAmount.toFixed(2)}</Text>
                </HStack>

                <HStack spacing={8} py={2} mt={1}>
                    <Text fontWeight="bold" color="#2B7FBC" fontSize="18px">Invoice Total</Text>
                    <Text fontWeight="bold" color="#333" fontSize="18px" w="120px" textAlign="right">
                    ₹{grandTotal}.00
                    </Text>
                </HStack>
                </Flex>

                {/* SIGNATURE & SEAL (NO CURVE - একদম সোজা এবং পরিষ্কার) */}
                <Flex justify="space-between" mt="10" px="4" position="relative" zIndex={2}>
                <Box textAlign="center">
                    <Box w="130px" h="80px" border="1px dashed #A0AEC0" mb={1} display="flex" alignItems="center" justifyContent="center" bg="gray.50" opacity={0.7}>
                    <Text fontSize="xs" color="gray.400">Shop Seal</Text>
                    </Box>
                </Box>
                <Box textAlign="right" pt={4}>
                    
                    <Text 
                    fontSize="14px" 
                    fontWeight="bold" 
                    color="gray.800" 
                    borderTop="1px solid #718096" 
                    pt={1.5} 
                    w="220px"
                    textAlign="center"
                    >
                    For {shopDetails.name || 'Ma Durga'}
                    </Text>
                </Box>
                </Flex>

                {/* ----------------- FOOTER TERMS & DECLARATION ----------------- */}
                <VStack align="start" spacing={4} mt="12" position="relative" zIndex={2} fontSize="11px" color="#4A5568" maxW="70%">
                <Box>
                    <Text fontWeight="bold" color="#2B7FBC" fontSize="12px" mb="1">Declaration & Terms</Text>
                    <Text fontStyle="italic">
                    We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. Payment is due within 15 days.
                    </Text>
                </Box>
                </VStack>

                {/* ----------------- BOTTOM COOL WAVES EFFECT ----------------- */}
                <Box position="absolute" bottom="-10px" left="-10px" right="-10px" h="220px" zIndex={1} pointerEvents="none">
                <svg viewBox="0 0 1440 320" width="105%" height="100%" preserveAspectRatio="none">
                    <path fill="#3ca0df" opacity="0.8" d="M0,160 C280,240 420,60 840,180 C1120,260 1260,280 1440,200 L1440,320 L0,320 Z" />
                </svg>
                </Box>

                <Box position="absolute" bottom="-20px" left="-10px" right="-10px" h="180px" zIndex={2} pointerEvents="none">
                <svg viewBox="0 0 1440 320" width="105%" height="100%" preserveAspectRatio="none">
                    <path fill="#1d70b8" opacity="0.9" d="M0,200 C320,120 640,280 960,160 C1180,80 1320,180 1440,140 L1440,320 L0,320 Z" />
                </svg>
                </Box>

                <Box position="absolute" bottom="-30px" left="-10px" right="-10px" h="140px" zIndex={3} pointerEvents="none">
                <svg viewBox="0 0 1440 320" width="105%" height="100%" preserveAspectRatio="none">
                    <path fill="#005ea5" d="M0,160 C480,280 720,80 1440,240 L1440,320 L0,320 Z" />
                </svg>
                </Box>
            </Box>

            {/* Print Settings Injection */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { size: A4; margin: 0; }
                    body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    #invoice-print-sheet { box-shadow: none !important; border: none !important; }
                }
                `
            }} />
        </Container>
    );
}
