
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useInvoiceStore = create(
    persist(
        (set, get) => ({
            // 📊 1. INITIAL SYSTEM STATE
            currentStep: 1,
            invoiceMeta: {
                invoiceNo: 'INV-' + Date.now().toString().slice(-6),
                date: new Date().toISOString().split('T')[0],
            },
            shopDetails: { name: '', address: '', gstin: '', contact: '' },
            customerDetails: { name: '', address: '', gstin: '', stateCode: '' },
            
            // Product list placeholder (By default 1 empty row will be present)
            items: [{ id: '1', description: '', hsnCode: '', quantity: 1, rate: 0 }],
            cgstRate: 9, // Default 9%
            sgstRate: 9, // Default 9%
            discount: 0,

            // ⚙️ 2. STEP CONTROL ACTIONS
            nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
            prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
            goToStep: (step) => set({ currentStep: step }),

            // ✍️ 3. PROFILE DATA MUTATION ACTIONS
            updateMeta: (fields) => set((state) => ({ invoiceMeta: { ...state.invoiceMeta, ...fields } })),
            updateShop: (fields) => set((state) => ({ shopDetails: { ...state.shopDetails, ...fields } })),
            updateCustomer: (fields) => set((state) => ({ customerDetails: { ...state.customerDetails, ...fields } })),
            updateTaxSettings: (fields) => set(fields),

            // 📦 4. DYNAMIC PRODUCT LIST ACTIONS (ROWS CONTROLLER)
            addItem: () => set((state) => ({
                items: [...state.items, { id: Date.now().toString(), description: '', hsnCode: '', quantity: 1, rate: 0 }]
            })),
            removeItem: (id) => set((state) => ({
                items: state.items.length > 1 ? state.items.filter(item => item.id !== id) : state.items
            })),
            updateItem: (id, fields) => set((state) => ({
                items: state.items.map(item => item.id === id ? { ...item, ...fields } : item)
            })),
            resetInvoice: () => set({
                currentStep: 1,
                invoiceMeta: { invoiceNo: 'INV-' + Date.now().toString().slice(-6), date: new Date().toISOString().split('T')[0] },
                customerDetails: { name: '', address: '', gstin: '', stateCode: '' },
                items: [{ id: '1', description: '', hsnCode: '', quantity: 1, rate: 0 }],
                discount: 0
            }),

            // 🧮 5. DERIVED MATHEMATICAL COMPUTE ENGINE
            getCalculations: () => {
                const { items, cgstRate, sgstRate, discount } = get()
                
                // Pure items raw amount calculation
                const subTotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
                
                const cgstAmount = subTotal * (cgstRate / 100)
                const sgstAmount = subTotal * (sgstRate / 100)
                const totalTax = cgstAmount + sgstAmount
                
                const grandTotal = (subTotal + totalTax) - discount
                
                return {
                    subTotal: Number(subTotal.toFixed(2)),
                    cgstAmount: Number(cgstAmount.toFixed(2)),
                    sgstAmount: Number(sgstAmount.toFixed(2)),
                    totalTax: Number(totalTax.toFixed(2)),
                    grandTotal: Math.round(grandTotal) // Tally style rounding off
                }
            }
        }),
        {
            name: 'commercial-shop-invoice-engine',
            partialize: (state) => ({
                shopDetails: state.shopDetails, // Shop profiling will always be saved in local cache memory
                cgstRate: state.cgstRate,
                sgstRate: state.sgstRate
            })
        }
    )
)