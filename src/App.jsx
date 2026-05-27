
import React from 'react'
import InvoiceDashboard from './pages/InvoiceDashboard'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

function App() {
	return (
		<>
			<ChakraProvider value={defaultSystem}>
				<div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '10px 0' }}>
					<header className="no-print" style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #e5e7eb', marginBottom: '20px' }}>
					<h1 style={{ margin: 0, color: '#111827', fontSize: '2rem', fontWeight: 'bold' }}>
						🏬 Commercial B2B Invoice Generator System
					</h1>
					<p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
						Zustand Automated Complex Objects & Arrays Processing Lab
					</p>
					</header>
					
					<InvoiceDashboard />
				</div>
			</ChakraProvider>
		</>
	)
}

export default App