import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export function generateInvoice(order:any){

const doc = new jsPDF();


doc.setFontSize(20);

doc.text(
"Khushika Beauty & Fashion",
20,
20
);


doc.setFontSize(12);

doc.text(
`Order ID: ${order.orderId}`,
20,
35
);


doc.text(
`Customer: ${order.customerName}`,
20,
45
);


doc.text(
`Payment: ${order.paymentMethod}`,
20,
55
);



autoTable(doc,{

startY:70,

head:[
[
"Product",
"Qty",
"Price"
]
],


body:

order.items.map((item:any)=>[

item.name,

item.quantity,

`₹${item.price}`

])

});



const finalY =
(doc as any).lastAutoTable.finalY;


doc.text(
`Subtotal: ₹${order.subtotal}`,
20,
finalY + 15
);


doc.text(
`Shipping: ₹${order.shipping}`,
20,
finalY + 25
);


doc.text(
`Discount: ₹${order.discount}`,
20,
finalY + 35
);


doc.text(
`Total: ₹${order.total}`,
20,
finalY + 45
);



doc.save(
`invoice-${order.orderId}.pdf`
);


}