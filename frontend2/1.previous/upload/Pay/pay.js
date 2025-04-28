document.addEventListener("DOMContentLoaded", function () {
    const uploadForm = document.getElementById("upload-form");
    const proceedPaymentButton = document.getElementById("proceed-payment");
    const paymentSection = document.getElementById("payment-section");

    let uploadedSuccessfully = false;

    // Handle upload form submission
    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const fileInput = document.getElementById("file-upload");
        const dateInput = document.getElementById("submission-date");

        if (!fileInput.files.length) {
            alert("Please select a file before proceeding.");
            return;
        }

        if (!dateInput.value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            alert("Please enter a valid date in MM/DD/YYYY format.");
            return;
        }

        // Mark upload successful
        uploadedSuccessfully = true;

        // Show payment section after file upload
        paymentSection.classList.remove("hidden");
        paymentSection.style.display = "block";
        paymentSection.scrollIntoView({ behavior: "smooth" });
    });

    // Handle payment when "Proceed to Payment" is clicked
    proceedPaymentButton.addEventListener("click", () => {
        if (!uploadedSuccessfully) {
            alert("Please complete the upload form first.");
            return;
        }

        fetch('http://localhost:5001/api/orders/place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Assume token is saved after login
            },
            body: JSON.stringify({
                serviceId: 1,   // Example service ID (change dynamically if needed)
                providerId: 2,  // Example provider ID (change dynamically if needed)
                price: 500      // Example price in rupees
            })
        })
        .then(response => response.json())
        .then(data => {
            var options = {
                "key": "rzp_test_m5aHLAIsonEdcl", // Your Razorpay Test Key ID
                "amount": data.amount * 100, // Amount in paise
                "currency": "INR",
                "name": "Your Company Name",
                "description": "Payment for Uploaded Service",
                "order_id": data.orderId, // Order ID from backend
                "handler": function (response) {
                    // After successful payment, verify payment with backend
                    fetch('http://localhost:5001/api/orders/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    })
                    .then(res => res.json())
                    .then(verifyData => {
                        if (verifyData.success) {
                            alert("Payment successful and verified! Payment ID: " + response.razorpay_payment_id);
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    })
                    .catch(() => {
                        alert("Error verifying payment. Please try again.");
                    });
                },
                "prefill": {
                    "name": "Your Name",
                    "email": "youruser@email.com",
                    "contact": "9999999999"
                },
                "theme": {
                    "color": "#F37254"
                }
            };

            var rzp1 = new Razorpay(options);
            rzp1.open();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to initiate payment. Try again.");
        });
    });
});
