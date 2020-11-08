const API_URL = 'http://localhost:4000';

// !Customer API
export async function listCustomerEntries() {
    const response = await fetch(`${API_URL}/customer`);
    const data = await response.json();
    return data;
}

export async function createCustomer(entry) {
    const response = await fetch(`${API_URL}/customer/save`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    return response.json();
} 

// !Product API
export async function listProductEntries() {
    const response = await fetch(`${API_URL}/product`);
    const data = await response.json();
    return data;
}

export async function createProduct(entry) {
    const response = await fetch(`${API_URL}/product/save`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
} 

// !Car API
export async function listCarEntries() {
    const response = await fetch(`${API_URL}/cars`);
    const data = await response.json();
    return data;
}

export async function createCar(entry) {
    const response = await fetch(`${API_URL}/cars/save`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
} 

// !Invoice API
export async function listInvoiceEntries() {
    const response = await fetch(`${API_URL}/invoice`);
    const data = await response.json();
    return data;
}

export async function createInvoice(entry) {
    const response = await fetch(`${API_URL}/invoice/save`, {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
} 

export async function listInvoiceBill(no) {
    let id = no;
    const response = await fetch(`${API_URL}/invoice/invoiceperhead/${id}`);
    const data = await response.json();
    return data;
}
